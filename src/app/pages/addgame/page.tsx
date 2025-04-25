// Import necessary components and libraries
'use client';

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Button } from "@/components/ui/button";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { TagsInput } from "react-tag-input-component";  
import { ToastContainer, toast } from 'react-toastify';



import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
// Initialize Firebase

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Define your form schema
const formSchema = z.object({
  username: z.string().min(2).max(50),
  gamedesc: z.string().min(5).max(350),
  images: z.array(z.string().url()),
  video: z.string().url(),
  tags: z.array(z.string())
});

  export default function AddGame() {
    const [selected, setSelected] = useState(["Adventure"]); 
    const [hasVideo, setHasVideo] = useState(false); 

    const [imageUrls, setImageUrls] = useState<string[]>([]); // State to store the image URLs


    useEffect(() => {
      const tags = document.querySelectorAll('.rti--tag');
      tags.forEach(tag => {
          const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
          const element = tag as HTMLElement;
          element.style.backgroundColor = randomColor;
      });
  }),[selected]; // Empty dependency array ensures this effect runs only once after initial render

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        gamedesc: "",
        images: [], // Set default value for images field
        video:"",
        tags:[]
      },
    });
  
    async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
      const files = event.target.files; // Get the uploaded files
      const urls: string[] = [];
      let hasVideo = false;
    
      for (const file of files!) {
        const storageRef = ref(storage, `${form.getValues("username")}/${file.name}`);
        
        if (file.type.includes('video')) {
          hasVideo = true;
          setHasVideo(true);
          
          // Upload video file
          const snapshot = await uploadBytes(storageRef, file);
          const downloadUrl = await getDownloadURL(snapshot.ref);
          form.setValue("video", downloadUrl);
          
          console.log("Video Uploaded");
        } else {
          // Upload image file
          const snapshot = await uploadBytes(storageRef, file);
          const downloadUrl = await getDownloadURL(snapshot.ref);
          urls.push(downloadUrl);
        }
      }
    
      // Update state and form only for images
      setImageUrls(urls);
      form.setValue("images", urls);
    }
    
  
    async function onSubmit(values: z.infer<typeof formSchema>) {
      const notify = () => toast("Succesfully Uploaded");

        try {
            const db = getFirestore(app);
            const customDocumentId = values.username;

            const gameDocRef = doc(collection(db, 'games'), customDocumentId);

            await setDoc(gameDocRef, {
              username: values.username,
              gamedesc: values.gamedesc,
              images: values.images,
              video:values.video,
              hasVideo:hasVideo,
              tags: selected
            });
            // await addDoc(collection(db, "games"), {
            //   username: values.username,
            //   gamedesc: values.gamedesc,
            //   images: values.images,
            // });
            // toast.success("Images uploaded successfully!", {
            //   position: "top-right",
            //   autoClose: 3000, // Close the toast after 3 seconds
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            // });
            console.log("Data submitted successfully!");
           
            
            notify();
            // Optionally, you can reset the form after successful submission
            form.reset();
          } catch (error) {
            console.error("Error submitting data:", error);
          }
      console.log(values);
    }

  
  
    return (
      
      <div className="formContainer flex justify-center">
              {/* <ToastContainer className="absolute top-0 rounded-lg" /> */}

      <div className="lopsided">
      <ToastContainer />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Existing form fields */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Game Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter game name" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gamedesc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About the Game</FormLabel>
                <FormControl>
                  <Input style={{height:"105px"}}  placeholder="Enter game description" {...field} />
                </FormControl>
                <FormDescription>Tell what you felt exactly after completing the game.</FormDescription>


                <FormMessage />
              </FormItem>
            )}
          />
          {/* Image upload field for multiple files */}
          <div>
          <FormLabel>Upload Images of the game</FormLabel>
          <input type="file" accept="image/*" multiple onChange={handleUpload} />
          {/* Display uploaded images */}
          {imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Uploaded ${index}`} style={{ maxWidth: "100px", maxHeight: "100px", marginRight: "10px" }} />
          ))}</div>

<div>
<FormLabel>Upload Video if any</FormLabel>
                    <input type="file" accept="video/*" multiple onChange={handleUpload} />
                    </div>

<FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Relevant Tags</FormLabel>
                <FormControl>
                <div> 
    
      <div> 
      <TagsInput 
        value={selected} 
        onChange={setSelected} 
        name="tags"
        placeHolder="Add Maximum 5 tags"
      /> 
      </div> 
    </div> 
                </FormControl>
                <FormDescription>Help us understand what type of game is this</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      </div>
      </div>
    );
  }
  

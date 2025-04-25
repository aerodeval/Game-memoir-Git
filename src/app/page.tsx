'use client';

import Image from "next/image";
import { Suspense, useState } from 'react'
import dynamic from 'next/dynamic'
// useRouter
import { useRouter } from 'next/navigation'
import Link from "next/link";
import FirstPost from "./pages/posts/page";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import TopBar from "./ui/Navbar";
import { CarouselDemo } from "./ui/Carousel";

import { initializeApp } from "firebase/app";
import Games from "./games/page";
import Loading from "./ui/Loading";
import { User } from "lucide-react";
import UpcomingGames from "./ui/UpcomingGames";
 

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
export default function Home() {
  const router = useRouter()



  
  return (
<div className="   bg-svg-background">
  <div className="main-content">

      <TopBar/>


<div className="2xl:grid 2xl:grid-cols-3 grid-rows-1 gap-1 flex-col flex">

<div className="col-span-2 ">
      {/* <h1 className="greeting flex justify-center text-center">Welcome to Sydneys Memoir</h1> */}
      
      
      
      
            {/* <Suspense fallback= { <div><p>Loading weather...</p></div>}>
              <LazyPages></LazyPages>
            </Suspense>
<h1>hello</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan, velit non dictum molestie, velit mauris gravida ligula, eu tincidunt magna ligula eget libero. Ut at massa ultrices, pulvinar libero eget, scelerisque sem. Proin at tincidunt odio. Duis lobortis ultricies arcu, non finibus ligula tincidunt nec. Phasellus quis ipsum tincidunt, lobortis elit non, ultricies elit. Sed euismod auctor
</p>

<button onClick={handleClick} className="bg-black"> <p> Details</p></button> */}
<div className="sm:mb-3 mt-3 flex flex-col justify-center">

<CarouselDemo></CarouselDemo>

<UpcomingGames></UpcomingGames>
</div>




</div>
<div   className="col-start-3 justify-center items-center">


  {/* <div className="h-20 bg-black text-white flex">
    <div className=" pr-60"></div>
    <div>
    <h1>Resident evil 7</h1>
    <p> Just a game</p>
    </div>

  </div> */}
  <div className="m-4   lg:hidden">
  <span className="sm:text-4xl text-2xl font-bold ">Check out other games</span></div>
<Games></Games>
</div>
</div>
</div>
</div>

  );
}

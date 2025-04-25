'use client';
import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Wrap, WrapItem } from '@chakra-ui/react'
import { initializeApp } from 'firebase/app';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import Image from 'next/image';

interface GameData {
  username: string;
  gamedesc: string;
  images: string[]; // Array of image URLs
  // Add other properties as needed
}

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

function GameDetails({ params }:any) {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const formattedGameID = params.gamesID.replace(/%20/g, ' ');

  useEffect(() => {
    async function fetchGameData() {
      try {
        const db = getFirestore();
        const gameDocRef = doc(db, 'games',formattedGameID);
        console.log(gameDocRef);
        // Assuming 'games' is your collection name
        const gameDocSnapshot = await getDoc(gameDocRef);

        if (gameDocSnapshot.exists()) {
          setGameData(gameDocSnapshot.data() as GameData);
        } else {
          console.log('Game not found');
        }
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    }

    fetchGameData();
  }, [params.gamesID]); // Fetch data whenever the game ID changes

  return (
    <div >
      {gameData ? (
        <div className='flex flex-col gamedata-page'>
          <div className=' ml-10 mr-8 disp-game'>
          <h1 className='game-username'>{gameData.username}</h1>
          <p className='game-description-full'>{gameData.gamedesc}</p>
          </div>
          <div className=' m-5'>

          <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 450: 2, 900: 3}}
                gutterBreakpoints={{350: "12px", 750: "16px", 900: "24px"}}
            >
                <Masonry>
                {gameData.images.map((imageUrl, i) => (
                        <img
                          className="rounded-md "

                        src={imageUrl} alt={`Image ${i}`}
                            key={i}
                            height={200}
                            style={i%2===1 ?{objectFit:"cover",height:"600px",objectPosition: "50% 20%" }:{}}
                        />
                    ))}
                </Masonry>
            </ResponsiveMasonry>

         


{/* 
          <Wrap px="1rem" spacing={4} justify="center">
            {gameData.images.map((imageUrl, index) => (
              <WrapItem
              key={index}
              boxShadow="base"
              rounded="20px"
              overflow="hidden"
              bg="white"
              lineHeight="0"
              _hover={{ boxShadow: "dark-lg" }}>
              <img />
              </WrapItem>
            ))}
            </Wrap> */}
          </div>
          {/* Render other game details based on gameData */}
        </div>
      ) : (
        <p className='flex justify-center'>pls go back and come again sorry</p>
      )}
    </div>
  );
}

export default GameDetails;

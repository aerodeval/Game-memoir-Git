"use client";

import { useEffect, useState } from "react";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import Link from "next/link";

// Define an interface representing the structure of a game object
interface Game {
  username: string;
  gamedesc: string;
  images: string[];
  tags: string[];
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function GameSkeleton() {
    return (
      <div className="game-section flex animate-pulse">
        <div className="game-sec-img">
          {/* Image skeleton */}
          <div className="w-full h-[128px] bg-gray-800 rounded-lg" />
        </div>
        <div className="game-section-desc ml-5">
          {/* Title skeleton */}
          <div className="h-6 w-32 bg-gray-800 rounded-md mb-2" />
          
          {/* Tags skeleton */}
          <div className="tags flex gap-2">
            {[1, 2].map((tag) => (
              <div 
                key={tag}
                className="tag h-5 w-16 bg-gray-800 rounded-full"
              />
            ))}
          </div>
          
          {/* Description skeleton */}
          <div className="h-4 w-48 bg-gray-800 rounded-md mt-2" />
        </div>
      </div>
    );
  }

  useEffect(() => {
    async function fetchGames() {
      try {
        const db = getFirestore();
        const gamesCollectionRef = collection(db, "games");
        const gamesQuery = query(gamesCollectionRef);
        const snapshot = await getDocs(gamesQuery);

        const gamesData: Game[] = []; // Specify the type as Game[]
        snapshot.forEach((doc) => {
          gamesData.push(doc.data() as Game);
        });

        setGames(gamesData);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGames();
  }, []);

  return (
    <div className="md:max-h-[200vh]  md:overflow-y-scroll game-scrollsection">
      {/* <h1 className="greeting ml-10 flex justify-center">Other games played</h1> */}
      {isLoading ? (
        // Show multiple skeleton items while loading
        <>
          {[1, 2, 3, 4, 5].map((index) => (
            <GameSkeleton key={index} />
          ))}
        </>
      ) : games.length > 0 ? (
        <div className="h-full">{games.map((game, index) => (
          <div className="game-section flex" key={index}>
            <div className="game-sec-img">
              {" "}
              {game.images && game.images.length > 0 && (
                <img src={game.images[0]} alt={`First Image`} />
              )}
            </div>
            <div className="game-section-desc ml-5">
              <Link href={`/games/${game.username}`}>
                <h1 className="game-name">{game.username}</h1>
              </Link>

              {game.tags && game.tags.length > 0 && (
                <div className="tags">
                  {game.tags.map((tag, tagIndex) => (
                    <div
                      key={tagIndex}
                      style={{ backgroundColor: getRandomColor() }}
                      className="tag"
                    >
                      <p>{tag}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>) : (
        <div className="game-section-load justify-center items-center">
          <div>
            Populating game data. Please wait
          </div>
        </div>
      )}
    </div>
  );
}

import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel"
import { image, Link } from "@nextui-org/react";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import { useState, useEffect, Suspense } from "react";
import Loading from "./Loading";

interface Game {
  video: string | undefined;
  hasVideo: boolean;
  username: string;
  gamedesc: string;
  images: string[];
  tags: string[];
}

export function CarouselDemo() {
    const [games, setGames] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    useEffect(() => {
        async function fetchGames() {
            try {
                const db = getFirestore();
                const gamesCollectionRef = collection(db, "games");
                const gamesQuery = query(gamesCollectionRef);
                const snapshot = await getDocs(gamesQuery);

                const gamesData: Game[] = [];
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

    if (isLoading) {
        return (
            <div className="w-full min-h-[400px] flex items-center justify-center">
                <Loading />
            </div>
        );
    }

    return (
        <Carousel className="crousel w-full">
            <CarouselContent>
                {games.length > 0 ? (
                    [...games]
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 5)
                        .map((game, index) => (
                            <CarouselItem key={index}>
                                <div className="relative cimg-container">
                                    {game.hasVideo == true ? (
                                        <video 
                                            className="c-vid" 
                                            src={game.video} 
                                            autoPlay 
                                            loop
                                            muted
                                            poster={game.images[0]}
                                            onClick={(e) => {
                                                const video = e.target as HTMLVideoElement;
                                                video.muted = !video.muted;
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        ></video>
                                    ) : (
                                        <img className="cimg" src={game.images[0]} alt={`Game ${index}`} />
                                    )}
                                    <div className="sm:p-12 pl-5  absolute bottom-5 w-3/4">
                                        <span className=" sm:text-4xl text-2xl font-semibold">{game.username}</span>
                                        {game.tags && game.tags.length > 0 && (
                                            <div className="tags">
                                                {game.tags.map((tag: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, tagIndex: React.Key | null | undefined) => (
                                                    <div
                                                        key={tagIndex}
                                                        style={{ backgroundColor: getRandomColor() }}
                                                        className="tag"
                                                    >
                                                        <p>
                                                            {tag}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <p className="text-1xl font-semibold hidden sm:block">{game.gamedesc}</p>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))
                ) : (
                    <Loading />
                )}
            </CarouselContent>
        </Carousel>
    );
}

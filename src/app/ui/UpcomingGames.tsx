import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface Game {
  id: number;
  name: string;
  cover: {
    id: number;
    url: string;
  };
  first_release_date: number;
  hypes: number;
  screenshots: Array<{
    id: number;
    url: string;
  }>;
}

function GameSkeleton() {
    return (
        <div className="flex items-center p-4 border-b border-gray-800">
            {/* Game Cover Skeleton */}
            <div className="mr-4">
                <div className="w-24 h-24 bg-gray-800 animate-pulse rounded-lg" />
            </div>
            
            {/* Game Content Skeleton */}
            <div className="flex-grow">
                <div className="flex justify-between items-center mb-3">
                    {/* Title Skeleton */}
                    <div className="h-6 w-48 bg-gray-800 animate-pulse rounded-md" />
                    {/* Date Skeleton */}
                    <div className="h-4 w-24 bg-gray-800 animate-pulse rounded-md" />
                </div>
                <div className="flex items-center gap-2">
                    {/* Stats Skeletons */}
                    <div className="h-4 w-20 bg-gray-800 animate-pulse rounded-md" />
                    <div className="h-4 w-32 bg-gray-800 animate-pulse rounded-md" />
                </div>
            </div>
        </div>
    );
}

export default function UpcomingGames() {
    const [games, setGames] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchGames() {
            try {
                setIsLoading(true);
                const response = await fetch('/api/games');
                if (!response.ok) {
                    throw new Error('Failed to fetch games');
                }
                const data = await response.json();
                setGames(data);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to fetch games';
                setError(errorMessage);
                toast.error(errorMessage);
            } finally {
                setIsLoading(false);
            }
        }

        fetchGames();
    }, []);

    if (isLoading) {
        return (
            <div className="commentBox bg-[#04060E] rounded-[10px] min-h-[128px] m-[5vw]">
                {[1, 2, 3, 4, 5].map((index) => (
                    <GameSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="commentBox bg-[#04060E] rounded-[10px] min-h-[128px] m-[5vw] flex items-center justify-center">
                <p className="text-red-500">Failed to load upcoming games</p>
            </div>
        );
    }

    return (

        <div className='mt-12'> 
<div className="sm:ml-12 m-4">
<h1 className="sm:text-4xl text-2xl font-bold">Upcoming Games</h1></div>
<div className="commentBox bg-[#04060E] rounded-[10px] min-h-[128px] m-[3vw]">
            
            {games.map((game) => (
                <div 
                    key={game.id} 
                    className="flex items-center p-4 border-b border-gray-800 last:border-b-0 hover:bg-gray-900 transition-colors"
                >
                    <div className="mr-4">
                        <img 
                            src={game.cover?.url.replace('t_thumb', 't_logo_med')}
                            alt={game.name}
                            className="w-24 h-24 object-cover rounded-lg"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder-game.jpg';
                            }}
                        />
                    </div>
                    
                    <div className="flex-grow">
                        <div className="flex  flex-col   md:flex-row justify-between  mb-1">
                            <h4 className="text-white font-semibold text-sm xl:text-xl line-clamp-1">{game.name}</h4>
                            <span className="text-xs text-gray-500">

                               Release Date: {new Date(game.first_release_date * 1000).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-blue-400">
                                {game.hypes} hypes
                            </span>
                        
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </div>
      
    );
}
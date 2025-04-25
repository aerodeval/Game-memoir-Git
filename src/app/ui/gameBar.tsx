// import { useEffect, useState } from "react";
// import { getFirestore, collection, query, getDocs } from "firebase/firestore";
// import Link from "next/link";

// // Define an interface representing the structure of a game object
// interface Game {
//   username: string;
//   gamedesc: string;
//   images: string[];
// }

// export default function Games() {
//   const [games, setGames] = useState<Game[]>([]); // Specify the type as Game[]

//   useEffect(() => {
//     async function fetchGames() {
//       try {
//         const db = getFirestore();
//         const gamesCollectionRef = collection(db, "games");
//         const gamesQuery = query(gamesCollectionRef);
//         const snapshot = await getDocs(gamesQuery);

//         const gamesData: Game[] = []; // Specify the type as Game[]
//         snapshot.forEach((doc) => {
//           gamesData.push(doc.data() as Game);
//         });

//         setGames(gamesData);
//       } catch (error) {
//         console.error("Error fetching games:", error);
//       }
//     }

//     fetchGames();
//   }, []);

//   return (
// <div>
//   <h1>Games</h1>
//   {games.map((game, index) => (
//     <div className="game-section" key={index}>

//       <div className="w-40">  {game.images && game.images.length > 0 && (
//         <img src={game.images[0]} alt={`First Image`} />
//       )}</div>   
//       <div className="game-section-desc">
//       <Link href={`/games/${game.username}`}>

//             <h1>{game.username}</h1>
// </Link>
    
//       <p>{game.gamedesc}</p>
//       </div>
//     </div>
//   ))}
// </div>

//   );
// }

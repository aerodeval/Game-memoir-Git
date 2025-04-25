import { NextResponse } from 'next/server';

export async function GET() {
  const query = `
    fields name,cover.url,hypes,first_release_date,screenshots.url,websites.game.url;
    where hypes > 0 & first_release_date > ${Math.floor(Date.now() / 1000)};
    sort hypes desc;
    limit 5;
  `;

  try {
    const response = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Client-ID': process.env.NEXT_PUBLIC_IGDB_CLIENT_ID!,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_IGDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: query,
    });

    if (!response.ok) {
      throw new Error(`IGDB API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json(
      { error: 'Failed to fetch games' },
      { status: 500 }
    );
  }
} 
export interface Game {
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
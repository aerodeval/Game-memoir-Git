const IGDB_API_URL = 'https://api.igdb.com/v4';

interface IGDBConfig {
  clientId: string;
  accessToken: string;
}

export class IGDBService {
  private config: IGDBConfig;

  constructor(config: IGDBConfig) {
    this.config = config;
  }

  private getHeaders() {
    return {
      'Client-ID': this.config.clientId,
      'Authorization': `Bearer ${this.config.accessToken}`,
      'Content-Type': 'application/json'
    };
  }

  async getUpcomingGames(limit: number = 5) {
    const query = `
      fields name,cover.url,hypes,first_release_date,screenshots.url,websites.game.url;
      where hypes > 0 & first_release_date > ${Math.floor(Date.now() / 1000)};
      sort hypes desc;
      limit ${limit};
    `;

    try {
      const response = await fetch(`${IGDB_API_URL}/games`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: query
      });

      if (!response.ok) {
        throw new Error(`IGDB API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching games:', error);
      throw error;
    }
  }
} 
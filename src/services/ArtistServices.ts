import { Artist } from 'interfaces';
import SpotifyWebApi from 'spotify-web-api-node';

export default class ArtistServices {
  public static getSimplifiedArtists(
    newTrackArtists: SpotifyApi.ArtistObjectSimplified[]
  ): Artist[] {
    return newTrackArtists.map((newTrackArtist) => {
      return {
        id: newTrackArtist.id,
        genres: [] as string[]
      };
    });
  }

  public static updateArtistsArray(
    artistsArray: Artist[],
    newArtists: Artist[]
  ): Artist[] {
    newArtists.forEach((artist) => {
      if (!artistsArray.some((arrayArtist) => arrayArtist.id === artist.id)) {
        artistsArray.push(artist);
      }
    });

    return artistsArray;
  }

  private static async getArtistWithGenres(
    artist: Artist,
    spotifyWebApi: SpotifyWebApi
  ): Promise<Artist> {
    const { genres } = (await spotifyWebApi.getArtist(artist.id)).body;

    return { id: artist.id, genres };
  }

  public static async getArtistsWithGenres(
    artists: Artist[],
    setProgress: (value: React.SetStateAction<number>) => void,
    accessToken: string
  ): Promise<Artist[]> {
    const artistsWithGenres = artists;

    const spotifyWebApi = new SpotifyWebApi({ accessToken });

    for (let i = 0; i < artists.length; i++) {
      setProgress((i / artists.length) * 100);
      artistsWithGenres[i] = await this.getArtistWithGenres(
        artists[i],
        spotifyWebApi
      );
    }

    setProgress(100);

    return artistsWithGenres;
  }
}

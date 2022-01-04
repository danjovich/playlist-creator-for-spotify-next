import SpotifyWebApi from 'spotify-web-api-node';
import { Artist, Track } from 'interfaces';
import ArtistServices from './ArtistServices';

export default class TrackServices {
  private static spotifyWebApi = new SpotifyWebApi();

  public static async getSavedTracks(
    accessToken: string,
    setProgress: (value: React.SetStateAction<number>) => void
  ): Promise<[Track[], Artist[]]> {
    this.spotifyWebApi.setAccessToken(accessToken);

    let total = 50;
    let tracks: Track[] = [];
    let artists: Artist[] = [];

    for (let i = 0; i < total; i += 50) {
      setProgress((i / total) * 100);

      const response = await this.spotifyWebApi.getMySavedTracks({
        limit: 50,
        offset: i
      });

      i === 0 && (total = response.body.total);

      const nextTracks = response.body.items.map((item) => {
        // eslint-disable-next-line camelcase
        const { added_at } = item;
        const { artists: newTrackArtists, id } = item.track;

        const artistsSimplified =
          ArtistServices.getSimplifiedArtists(newTrackArtists);

        artists = ArtistServices.updateArtistsArray(artists, artistsSimplified);

        return { artists: artistsSimplified, id, addedAt: new Date(added_at) };
      });

      tracks = [...nextTracks, ...tracks];
    }

    setProgress(100);

    return [tracks, artists];
  }

  public static updateTracksArtists(
    tracks: Track[],
    artists: Artist[]
  ): Track[] {
    return tracks.map((track) => {
      const updatedArtists = track.artists.map((artist) => {
        const updatedArtist = artists.find(
          (newArtist) => newArtist.id === artist.id
        );

        return updatedArtist ?? artist;
      });

      return { ...track, artists: updatedArtists };
    });
  }

  public static filterByGenre(tracks: Track[], genre: string) {
    return tracks.filter((track) =>
      track.artists.some((artist) => artist.genres.includes(genre))
    );
  }

  public static async createPlaylist(
    accessToken: string,
    tracks: Track[],
    name: string
  ): Promise<void> {
    this.spotifyWebApi.setAccessToken(accessToken);

    const response = await this.spotifyWebApi.createPlaylist(
      name.replace(/^\w|\s\w/g, (c) => c.toUpperCase()),
      { public: false }
    );

    const { id } = response.body;

    const sortedTracks = this.sortByDate(tracks);

    const formattedTracksArray = sortedTracks.map(
      (track) => `spotify:track:${track.id}`
    );

    for (let i = 0; i < formattedTracksArray.length; i += 100) {
      const slicedArray = formattedTracksArray.slice(i, i + 100);
      await this.spotifyWebApi.addTracksToPlaylist(id, slicedArray);
    }
  }

  public static sortByDate(tracks: Track[]): Track[] {
    return tracks.sort(
      (trackA, trackB) => trackB.addedAt.getTime() - trackA.addedAt.getTime()
    );
  }
}

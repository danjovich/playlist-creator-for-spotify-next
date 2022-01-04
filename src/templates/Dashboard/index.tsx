/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Button, TextField } from '@mui/material';

import useAuth from 'hooks/useAuth';
import ArtistServices from 'services/ArtistServices';
import TrackServices from 'services/TrackServices';
import { Track } from 'interfaces';

import TopBar from 'components/TopBar';
import ProfileButton from 'components/ProfileButton';
import LinearProgressWithLabel from 'components/LinearProgressWithLabel';
import { parseCookies } from 'nookies';

const Dashboard: React.FC = () => {
  const { accessToken } = useAuth();

  const [savedTracks, setSavedTracks] = useState<Track[]>([]);
  const [tracksProgress, setTracksProgress] = useState(0);
  const [genresProgress, setGenresProgress] = useState(0);
  const [genre, setGenre] = useState('');

  useEffect(() => {
    const getSavedTracks = async () => {
      const [tracks, artists] = await TrackServices.getSavedTracks(
        accessToken,
        setTracksProgress
      );

      const artistsWithGenres = await ArtistServices.getArtistsWithGenres(
        artists,
        setGenresProgress,
        accessToken
      );

      const tracksWithGenres = TrackServices.updateTracksArtists(
        tracks,
        artistsWithGenres
      );

      setSavedTracks(tracksWithGenres);
    };

    if (accessToken) {
      getSavedTracks();
    }
  }, [accessToken]);

  const createPlaylist = async () => {
    const filteredTracks = TrackServices.filterByGenre(savedTracks, genre);
    await TrackServices.createPlaylist(accessToken, filteredTracks, genre);
  };

  const changeGenre = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setGenre(e.target.value);
  };

  return (
    <>
      <TopBar rightButton={<ProfileButton />} />
      <LinearProgressWithLabel value={tracksProgress} />
      <LinearProgressWithLabel value={genresProgress} />
      <TextField
        id="outlined-basic"
        label="Genre"
        variant="outlined"
        onChange={changeGenre}
      />
      <Button onClick={createPlaylist}>Create Playlist</Button>
    </>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'spotify-playlist-creator:accessToken': token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};

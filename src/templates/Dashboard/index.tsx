/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, TextField, Autocomplete } from '@mui/material';

import useAuth from 'hooks/useAuth';
import ArtistServices from 'services/ArtistServices';
import TrackServices from 'services/TrackServices';
import { Track } from 'interfaces';

import TopBar from 'components/TopBar';
import ProfileButton from 'components/ProfileButton';
import LinearProgressWithLabel from 'components/LinearProgressWithLabel';
import RadioGroupWithLabel from './components/RadioGroupWithLabel/RadioGroupWithLabel';

const steps = ['Load your songs library', 'Choose a genre', 'Choose the details', 'Create the playlist!'];

const Dashboard: React.FC = () => {
  const { accessToken } = useAuth();

  const [savedTracks, setSavedTracks] = useState<Track[]>([]);
  const [genres, setGenres] = useState<string[]>([]);

  const [tracksProgress, setTracksProgress] = useState(0);
  const [genresProgress, setGenresProgress] = useState(0);

  const [genre, setGenre] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [collaborative, setCollaborative] = useState(true);
  const [isPublic, setIsPublic] = useState(true);

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  useEffect(() => {
    const getSavedTracks = async () => {
      const [tracks, artists] = await TrackServices.getSavedTracks(
        accessToken,
        setTracksProgress
      );

      const [artistsWithGenres, returnedGenres] =
        await ArtistServices.getArtistsWithGenresAndGenresArray(
          artists,
          setGenresProgress,
          accessToken
        );

      setGenres(returnedGenres);

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
    await TrackServices.createPlaylist(accessToken, filteredTracks, {
      name,
      description,
      collaborative,
      isPublic
    });
  };

  const onChangeGenre = (e: React.SyntheticEvent<Element, Event>) => {
    setGenre((e.target as HTMLElement).innerText);
  };

  const onChangeCollaborative = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setCollaborative(value === 'collaborative');
  };

  const onChangePublic = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setIsPublic(value === 'public');
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  return (
    <>
      <TopBar rightButton={<ProfileButton />} />
      <LinearProgressWithLabel value={tracksProgress} />
      <LinearProgressWithLabel value={genresProgress} />
      <Autocomplete
        options={genres}
        onChange={onChangeGenre}
        renderInput={(params) => (
          <TextField {...params} label="Genre" variant="outlined" />
        )}
      />
      <TextField
        label="Name"
        variant="outlined"
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Description"
        variant="outlined"
        onChange={(e) => setDescription(e.target.value)}
      />
      <RadioGroupWithLabel
        onChange={onChangeCollaborative}
        label="Collaborative?"
        fields={['Collaborative', 'Not Collaborative']}
      />
      <RadioGroupWithLabel
        onChange={onChangePublic}
        label="Public or private?"
        fields={['Public', 'Private']}
      />
      <Button onClick={createPlaylist}>Create Playlist</Button>
    </>
  );
};

export default Dashboard;

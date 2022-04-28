/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Stepper,
  StepLabel,
  Step,
  Typography,
  Box
} from '@mui/material';

import useAuth from 'hooks/useAuth';
import ArtistServices from 'services/ArtistServices';
import TrackServices from 'services/TrackServices';
import { Track } from 'interfaces';

import TopBar from 'components/TopBar';
import ProfileButton from 'components/ProfileButton';
import StepComponent from './components/StepComponent';
import LoadSongsAndGenres from './components/LoadSongsAndGenres';
import ChooseAGenre from './components/ChooseAGenre';
import ChooseTheDetails from './components/ChooseTheDetails';

const steps = [
  'Load your songs library',
  'Choose a genre',
  'Choose the details',
  'Create the playlist!'
];

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

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <TopBar rightButton={<ProfileButton />} />
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <StepComponent
          content={
            (activeStep === 0 && (
              <LoadSongsAndGenres
                genresProgress={genresProgress}
                tracksProgress={tracksProgress}
              />
            )) ||
            (activeStep === 1 && (
              <ChooseAGenre genres={genres} setGenre={setGenre} />
            )) ||
            (activeStep === 2 && (
              <ChooseTheDetails
                setCollaborative={setCollaborative}
                setDescription={setDescription}
                setIsPublic={setIsPublic}
                setName={setName}
              />
            )) || <Button onClick={createPlaylist}>Create Playlist</Button>
          }
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          steps={steps}
          nextDisabled={
            (activeStep === 0 && genresProgress < 100) ||
            (activeStep === 1 && (genre === '' || !genre)) ||
            (activeStep === 2 && (name === '' || !name))
          }
        />
      )}
    </>
  );
};

export default Dashboard;

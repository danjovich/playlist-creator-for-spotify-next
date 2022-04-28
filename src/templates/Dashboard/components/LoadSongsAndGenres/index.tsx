import { Box } from '@mui/material';
import LinearProgressWithLabel from 'components/LinearProgressWithLabel';
import React from 'react';

interface Props {
  tracksProgress: number;
  genresProgress: number;
}

const LoadSongsAndGenres: React.FC<Props> = ({
  tracksProgress,
  genresProgress
}) => {
  return (
    <>
      {tracksProgress < 100 ? (
        <Box>
          <p>
            The playlist creation will take some steps. <br />
            First, we need to load your saved tracks:
          </p>
          <LinearProgressWithLabel value={tracksProgress} />
          <p>(this should take from 20 to 30 seconds)</p>
        </Box>
      ) : (
        <Box>
          <p>Now, we must get the genres of the tracks:</p>
          <LinearProgressWithLabel value={genresProgress} />
          <p>(this should take less than 10 seconds)</p>
        </Box>
      )}
    </>
  );
};

export default LoadSongsAndGenres;

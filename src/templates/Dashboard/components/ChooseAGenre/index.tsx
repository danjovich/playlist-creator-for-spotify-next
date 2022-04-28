import { Autocomplete, TextField, Typography } from '@mui/material';
import React from 'react';

interface Props {
  genres: string[];
  setGenre: (value: React.SetStateAction<string>) => void;
}

const ChooseAGenre: React.FC<Props> = ({ genres, setGenre }) => {
  const onChangeGenre = (e: React.SyntheticEvent<Element, Event>) => {
    setGenre((e.target as HTMLElement).innerText);
  };

  return (
    <>
      <Typography>
        Choose a genre based on the genres found on your library:
      </Typography>
      <Autocomplete
        options={genres}
        onChange={onChangeGenre}
        renderInput={(params) => (
          <TextField {...params} label="Genre" variant="outlined" />
        )}
      />
    </>
  );
};

export default ChooseAGenre;

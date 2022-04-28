import { TextField, Typography } from '@mui/material';
import React from 'react';
import RadioGroupWithLabel from '../RadioGroupWithLabel/RadioGroupWithLabel';

interface Props {
  setCollaborative: (value: React.SetStateAction<boolean>) => void;
  setIsPublic: (value: React.SetStateAction<boolean>) => void;
  setName: (value: React.SetStateAction<string>) => void;
  setDescription: (value: React.SetStateAction<string>) => void;
}

const ChooseTheDetails: React.FC<Props> = ({
  setCollaborative,
  setIsPublic,
  setName,
  setDescription
}) => {
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
  return (
    <>
      <Typography>Choose the details of your playlist:</Typography>
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
    </>
  );
};

export default ChooseTheDetails;

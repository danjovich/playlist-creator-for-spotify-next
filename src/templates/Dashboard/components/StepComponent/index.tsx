import { Box, Button } from '@mui/material';
import React from 'react';

interface Props {
  content: React.ReactElement;
  activeStep: number;
  setActiveStep: (value: React.SetStateAction<number>) => void;
  steps: string[];
  nextDisabled: boolean;
}

const StepComponent: React.FC<Props> = ({
  content,
  activeStep,
  setActiveStep,
  steps,
  nextDisabled
}) => {
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <>
      {content}
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleNext} disabled={nextDisabled}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </>
  );
};

export default StepComponent;

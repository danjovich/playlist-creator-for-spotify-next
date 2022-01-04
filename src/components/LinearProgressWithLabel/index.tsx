import React from 'react';
import { LinearProgress, LinearProgressProps, Typography } from '@mui/material';
import * as S from './styles';

const LinearProgressWithLabel: React.FC<LinearProgressProps> = ({
  value,
  ...props
}) => {
  return (
    <S.Container>
      <S.LinearProgressContainer>
        <LinearProgress variant="determinate" {...{ ...props, value }} />
      </S.LinearProgressContainer>
      <S.LabelContainer>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          value ?? 0
        )}%`}</Typography>
      </S.LabelContainer>
    </S.Container>
  );
};

export default LinearProgressWithLabel;

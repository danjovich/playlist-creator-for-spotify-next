import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material';

interface RadioGroupWithLabelProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  label: string;
  fields: string[];
}

const RadioGroupWithLabel: React.FC<RadioGroupWithLabelProps> = ({
  onChange,
  label,
  fields
}) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup onChange={onChange}>
        {fields.map((field) => (
          <FormControlLabel
            key={field}
            value={field.toLowerCase()}
            control={<Radio />}
            label={field}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGroupWithLabel;

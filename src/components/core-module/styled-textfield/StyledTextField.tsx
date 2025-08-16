import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { theme } from '../../../theme';

const sharedTextFieldSx = {
  maxWidth: '124px',
  height: '36px',
  '& .MuiOutlinedInput-root': {
    height: '36px',
    '& fieldset': {
      borderColor: theme?.palette?.customColors?.lightBlue?.[7],
    },
    '&:hover fieldset': {
      borderColor: theme?.palette?.customColors?.lightBlue?.[7],
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '8.5px 14px',
  },
  '& .MuiFormHelperText-root': {
    fontSize: '10px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '8px',
    },
  },
};

const StyledTextField: React.FC<TextFieldProps> = (props) => {
  return <TextField {...props} sx={{ ...sharedTextFieldSx, ...props.sx }} />;
};

export default StyledTextField; 
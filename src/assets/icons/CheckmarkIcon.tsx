import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

const CheckmarkIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <circle cx="6" cy="6" r="6" fill="currentColor"/>
      <path d="M3.75 6.375L5.25 7.875L8.625 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
};

export default CheckmarkIcon; 
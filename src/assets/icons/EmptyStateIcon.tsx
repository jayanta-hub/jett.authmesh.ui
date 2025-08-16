import React from 'react';
import {SvgIconProps } from '@mui/material';

const EmptyStateIcon: React.FC<SvgIconProps> = () => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.75 17.25H17.25M6.25 5.33333H7.16667M6.25 9H7.16667M6.25 12.6667H7.16667M10.8333 5.33333H11.75M10.8333 9H11.75M10.8333 12.6667H11.75M2.58333 17.25V2.58333C2.58333 2.0971 2.77649 1.63079 3.1203 1.28697C3.46412 0.943154 3.93044 0.75 4.41667 0.75H13.5833C14.0696 0.75 14.5359 0.943154 14.8797 1.28697C15.2235 1.63079 15.4167 2.0971 15.4167 2.58333V17.25" stroke="#0083FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    
  );
};

export default EmptyStateIcon; 
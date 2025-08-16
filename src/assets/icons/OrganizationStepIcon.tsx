import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

const OrganizationStepIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 14 16">
      <path 
        d="M9.025 0.5C10.285 0.5 10.915 0.5 11.3965 0.755C11.8235 0.982601 12.1676 1.33934 12.3798 1.77425C12.625 2.273 12.625 2.92625 12.625 4.2335V11.7665C12.625 13.0737 12.625 13.727 12.3798 14.2265C12.1676 14.6614 11.8235 15.0181 11.3965 15.2457C10.915 15.5 10.285 15.5 9.025 15.5H4.975C3.715 15.5 3.085 15.5 2.6035 15.245C2.1765 15.0174 1.83236 14.6607 1.62025 14.2257C1.375 13.727 1.375 13.0737 1.375 11.7665V4.2335C1.375 2.92625 1.375 2.273 1.62025 1.7735C1.83248 1.33887 2.17661 0.982406 2.6035 0.755C3.085 0.5 3.715 0.5 4.975 0.5H9.025Z" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
      <path 
        d="M5.125 14.75V10.625C5.125 10.2272 5.28304 9.84564 5.56434 9.56434C5.84564 9.28304 6.22717 9.125 6.625 9.125H7.375C7.77282 9.125 8.15435 9.28304 8.43566 9.56434C8.71696 9.84564 8.875 10.2272 8.875 10.625V14.75M5.5 3.5H4M5.5 6.5H4M10 3.5H8.5M10 6.5H8.5" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
    </SvgIcon>
  );
};

export default OrganizationStepIcon; 
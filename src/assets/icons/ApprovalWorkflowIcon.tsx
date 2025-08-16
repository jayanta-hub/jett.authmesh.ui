import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

const ApprovalWorkflowIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 18 18">
      <path 
        d="M15.75 7.5V14.625C15.75 14.9234 15.6315 15.2095 15.4205 15.4205C15.2095 15.6315 14.9234 15.75 14.625 15.75H3.375C3.07663 15.75 2.79048 15.6315 2.5795 15.4205C2.36853 15.2095 2.25 14.9234 2.25 14.625V3.375C2.25 3.07663 2.36853 2.79048 2.5795 2.5795C2.79048 2.36853 3.07663 2.25 3.375 2.25H11.25" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
      <path 
        d="M6 7.5L9.75 10.5L15.375 2.625" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
    </SvgIcon>
  );
};

export default ApprovalWorkflowIcon; 
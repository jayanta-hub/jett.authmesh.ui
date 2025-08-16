import React from 'react';
import { Radio, RadioProps, styled } from '@mui/material';
import { theme } from '../../../theme';

const BpIcon = styled('span')(() => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow: `inset 0 0 0 1.5px ${theme?.palette?.customColors?.grey?.[8]}`,
  backgroundColor: theme?.palette?.customColors?.white?.[0],
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme?.palette?.customColors?.white?.[0],
    ...theme.applyStyles?.('dark', {
      backgroundColor: '#30404d',
    }),
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: 'rgba(206,217,224,.5)',
    ...theme.applyStyles?.('dark', {
      background: 'rgba(57,75,89,.5)',
    }),
  },
  ...theme.applyStyles?.('dark', {
    boxShadow: `inset 0 0 0 1px ${theme?.palette?.customColors?.grey?.[8]}`,
    backgroundColor: '#394b59',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))',
  }),
}));

const BpCheckedIcon = styled(BpIcon)({
  boxShadow: 'none',
  backgroundColor: theme?.palette?.customColors?.blue?.[22],
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&::before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: theme?.palette?.customColors?.blue?.[22],
  },
});

const StyledRadio: React.FC<RadioProps> = (props) => (
  <Radio
    disableRipple
    color="default"
    checkedIcon={<BpCheckedIcon />}
    icon={<BpIcon />}
    sx={{
      '&.MuiRadio-root': {
        pb: 0,
        pt: 0
      },
    }}
    {...props}
  />
);

export default StyledRadio; 
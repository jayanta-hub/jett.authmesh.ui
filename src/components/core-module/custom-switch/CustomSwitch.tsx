import { styled, Switch } from '@mui/material';

const CustomSwitch = styled(Switch)(({ theme }) => ({
    width: '22.11px',
    height: '12.28px',
    padding: 0,
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: '10px',
        height: '10px',
        color: theme?.palette?.customColors?.grey[8],
    },

    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: '1.14px',
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(9.83px)',
            color: theme.palette.customColors.white[0],
            '& .MuiSwitch-thumb': {
                color: theme.palette.customColors.white[0],
            },
            '& + .MuiSwitch-track': {
                backgroundColor: theme?.palette?.customColors?.blue[22],
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 1,
            },
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.customColors.white[23],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
        },
        '&.Mui-disabled': {
            color: `${theme.palette.customColors.grey[12]} !important`,
            '& + .MuiSwitch-track': {
                backgroundColor: `${theme.palette.customColors.grey[16]} !important`,
                opacity: 1,
            },
            '& .MuiSwitch-thumb': {
                backgroundColor: `${theme.palette.customColors.white[0]} !important`,
            },
        }
    },
    '& .MuiSwitch-track': {
        borderRadius: '12.28px',
        backgroundColor: theme.palette.customColors.white[0],
        opacity: 1,
        border: `1px solid ${theme?.palette?.customColors?.grey[8]}`,
        transition: 'background-color 500ms',
    },

}));

export default CustomSwitch;
import { styled, Switch } from '@mui/material';

const CustomSwitchBlue = styled(Switch)(({ theme }) => ({
    width: 24,
    height: 13,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 10,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    "& .MuiSwitch-switchBase": {
        padding: 1.2,
        "&.Mui-checked": {
            transform: "translateX(10px)",
            color: theme.palette.customColors.white[0],
            "& + .MuiSwitch-track": {
                backgroundColor: theme.palette.customColors.blue[10],
                opacity: 1,
                border: 0,
            },

        },
        "&.Mui-disabled": {
            color: "white", // Default disabled thumb color
            "& + .MuiSwitch-track": {
                backgroundColor: theme.palette.customColors.grey[16], // Default disabled track
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 10,
        height: 10,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
        ...theme.applyStyles('dark', {
            backgroundColor: 'rgba(255,255,255,.35)',
        }),
    },
}));

export default CustomSwitchBlue
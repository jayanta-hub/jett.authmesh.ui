import { DateCalendar } from '@mui/x-date-pickers';
import { styled } from '@mui/material';

export const CustomCalendar = styled(DateCalendar)(({ theme }) => ({
    '& .MuiPickersCalendarHeader-root': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        padding: '4px 10px',
    },
    '& .MuiPickersCalendarHeader-labelContainer': {
        position: 'absolute',
        left: '51%',
        transform: 'translateX(-50%)',
        fontWeight: 500,
    },
    '& .MuiPickersArrowSwitcher-root': {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: "0px 6px"
    },
    '& .Mui-selected': {
        backgroundColor: `${theme.palette.customColors.blue[10]} !important`,
        color: theme.palette.customColors.white[0],
    },
    '& .MuiPickersCalendarHeader-switchViewButton': {
        padding: 0,
        marginBottom: "4px"
    },
    '& .MuiDayCalendar-header': {
        position: 'relative',
        paddingTop: '8px',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '30px',
            right: '30px',
            height: '0.6px',
            backgroundColor: theme.palette.customColors.grey[17],
        }
    },
}));

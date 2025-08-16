import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { theme } from '../../../theme'


const AllowDenyToggle = ({
  value,
  onChange,
  options,
  disabled = false,
}: AllowDenyToggleProps) => {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_e, newValue) => {
        if (newValue !== null) {
          onChange(newValue);
        }
      }}
      disabled={disabled}
      sx={{
        borderRadius: '6px',
        overflow: 'hidden',
        border: `1px solid ${theme.palette.customColors?.grey?.[10]}`,
        '& .MuiToggleButton-root': {
          textTransform: 'none',
          borderRadius: '6px',
          m: "2px",
          px: 2,
          py: 0.5,
          fontWeight: 500,
          minWidth: '60px',
          '&.Mui-disabled': {
            border: "none",
            color: theme.palette.customColors?.white?.[21],
            backgroundColor: theme.palette.customColors?.white?.[21],
          },
          '&.Mui-selected': {
            border: "none",
            backgroundColor: disabled? theme.palette.customColors?.white?.[21]:theme.palette.customColors?.lightBlue?.[3],
            color: disabled? theme.palette.customColors?.lightWhite?.[7]: theme.palette.customColors?.black?.[1],
            fontSize: '10px',
            fontFamily: "Poppins",
            '&:hover': {
              backgroundColor: theme.palette.customColors?.lightBlue?.[3],
            },
          },
          '&:not(.Mui-selected)': {
            border: 'none',
            color: theme.palette.customColors?.lightWhite?.[7],
            fontSize: '10px',
            fontFamily: "Poppins",
          },
        },
      }}
    >
      {options.map((opt) => (
        <ToggleButton key={opt.value} value={opt.value}>
          {opt.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default AllowDenyToggle;

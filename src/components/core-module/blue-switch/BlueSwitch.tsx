import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import {theme as customTheme} from "../../../theme"

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 22.11,
  height: 12.28,
  padding: 0,
  marginRight: "5px",
  display: "flex",
  "& .MuiSwitch-switchBase": {
    padding: 1.2,
    "&.Mui-checked": {
      transform: "translateX(10px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#0087FA",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled": {
        color: theme.palette.action.disabled, // Default disabled thumb color
        "& + .MuiSwitch-track": {
          backgroundColor: theme.palette.action.disabledBackground, // Default disabled track
        },
      },
    },
    "&.Mui-disabled": {
      color: "white", // Default disabled thumb color
      "& + .MuiSwitch-track": {
        backgroundColor: "#616161", // Default disabled track
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 8.6,
    height: 8.6,
    boxShadow: "0 0 2px rgba(0, 0, 0, 0.3)",
    backgroundColor: "#fff",
  },
  "& .MuiSwitch-track": {
    borderRadius: 12.28 / 2,
    backgroundColor: customTheme?.palette?.customColors?.grey?.[18],
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 200,
    }),
  },
}));

const BlueSwitch = (props: SwitchProps) => {
  return <StyledSwitch {...props} />;
};

export default BlueSwitch;
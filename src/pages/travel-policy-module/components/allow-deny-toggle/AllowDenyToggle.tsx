import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { theme } from "../../../../theme";
import { AllowDenyToggleProps } from "../../../../utility/types/travel-policy/TravelPolicy";

const AllowDenyToggle = ({ value, onChange, disabled = false, travelPolicyType }: AllowDenyToggleProps) => {
    return (
        <ToggleButtonGroup
            value={value}
            exclusive
            onChange={(_event, newValue) => {
                if (newValue !== null) {
                    onChange(newValue);
                }
            }}
            disabled={disabled ?? false}
            sx={{
                borderRadius: '6px',
                overflow: 'hidden',
                border: `1px solid ${theme.palette.customColors.grey[10]}`,
                '& .MuiToggleButton-root': {
                    textTransform: 'none',
                    borderRadius: '6px',
                    m: "4px",
                    px: 2,
                    py: 0.5,
                    fontWeight: 500,
                    '&:Disabled': {
                        '&.Mui-disabled': {
                            border: "none",
                            color: theme.palette.customColors.white[22],
                            backgroundColor: theme.palette.customColors.white[21],
                        },
                    },
                    '&.Mui-selected': {
                        backgroundColor: travelPolicyType === "view" ? theme.palette.customColors.white[0] : theme.palette.customColors.lightBlue[3],
                        color: theme.palette.customColors.black[1],
                        fontSize: '10px',
                        fontFamily: "poppins",
                        border: `2px solid #F5F5F5`,
                        '&:hover': {
                            backgroundColor: travelPolicyType === "view" ? theme.palette.customColors.white[0] : theme.palette.customColors.lightBlue[3],
                        },
                    },
                    '&:not(.Mui-selected)': {
                        border: 'none',
                        textTransform: 'none',
                        color: theme.palette.customColors.grey[18],
                        fontSize: '10px',
                        fontFamily: "poppins"
                    },
                },
            }}
        >
            <ToggleButton
                value="ALLOW"
            >
                Allow
            </ToggleButton>
            <ToggleButton
                value="DENY"
            >
                Deny
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default AllowDenyToggle;

import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from 'react';
import TextTransition, { presets } from "react-text-transition/lib";
const TEXTS = [
    "Flight",
    "Hotels",
    "Visas",
    "Holidays",
    "Train Travel",
    "Buses",
    "Taxis",
    "Hostels",
    "Travel Insurance",
    "Medical Insurance",
    "Cruise Travel"
];
/**
* RotatingText Component
* This component displays a rotating list of travel-related keywords
* (e.g., "Flight", "Hotels", "Visas") with animated transitions using `react-text-transition`.
* 
* The currently displayed word changes every 2 seconds.
* Long text items dynamically apply a different CSS class to adjust height/layout.
*/
const RotatingText: React.FC = () => {
    const [indexs, setIndexs] = useState(0);
    const theme = useTheme();
    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndexs((prevIndex) => (prevIndex + 1) % TEXTS.length);
        }, 2000);
        return () => clearInterval(intervalId);
    }, []);
    const isLongText = TEXTS[indexs]?.length > 20;
    return (
        <Box sx={{ flex: 3, marginLeft: { sm: "2rem", md: "4.7rem" } }} className="mt-[8rem]">
            <Box
                className="rounded-lg p-4 -mt-5 w-[90%]  flex flex-col" >
                <Box className="flex flex-col mb-4">
                    <Typography fontWeight="600" fontFamily="Poppins" color={theme.palette.customColors?.black[3]} sx={{ whiteSpace: "nowrap", fontSize: { sm: "20px", md: "35px" }, marginLeft: "0rem", display: "flex", gap: "10px" }}>
                        Book your

                        <Box
                            sx={{
                                minHeight: { sm: "24px", md: "48px" },
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <TextTransition springConfig={presets.wobbly}
                                className={isLongText ? "text-transition-dynamic" : "text-transition-fixed"}
                            >
                                <Typography
                                    sx={{ fontSize: { sm: "20px", md: "35px" } }}
                                    fontWeight="600"
                                    fontFamily="Poppins"
                                    color={theme.palette.customColors?.blue[10]}
                                >
                                    {TEXTS[indexs]}
                                </Typography>
                            </TextTransition>
                        </Box>
                    </Typography>
                    <Typography fontWeight="400" fontFamily="Poppins" color={theme.palette.customColors?.lightGray[15]} sx={{ marginLeft: "0rem", fontSize: { sm: "10px", md: "12px" } }}>We are here to make your corporate travel experience seamless,
                        <br />
                        comfortable, and memorable. </Typography>
                </Box>
            </Box>
        </Box>

    );
};
export default RotatingText
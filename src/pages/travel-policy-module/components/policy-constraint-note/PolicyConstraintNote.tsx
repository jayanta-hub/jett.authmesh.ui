import { Box, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { theme } from '../../../../theme'
import noteIcon from '../../../../assets/images/noteIcon.svg';

const PolicyConstraintNote: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {
    const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box sx={{ backgroundColor: theme.palette.customColors?.pink[4], padding: 0.5, borderRadius: "4px", display: "flex", gap: 0.5, mb: 1, width: isMobileView ? "70%" : "28%" }}>
            <Box
                component="img"
                src={noteIcon}
                sx={{
                    height: isMobileView ? "10px" : "14px",
                    width: isMobileView ? "10px" : "14px",
                    objectFit: "contain",
                }}
            />
            {children}
        </Box>
    )
}

export default PolicyConstraintNote
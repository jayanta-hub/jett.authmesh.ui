import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Breadcrumbs, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import Container from '../../components/core-module/container/Container';
import { theme } from '../../theme';
import PricingPolicyListing from './pricing-policy-listing/PricingPolicyListing';

const PricingPolicy: React.FC = () => {
    const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Container>
            <Box sx={{
                maxWidth: '1080px', mx: 'auto',
                px: { xs: "1.5rem", md: "0" }
            }}>
                <Box sx={{
                    display: "flex", alignItems: "center", justifyContent: "space-between", mt: '16px',
                }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />} sx={{
                        ".MuiBreadcrumbs-separator": {
                            margin: 0,
                        }
                    }}>
                        <Typography sx={{
                            color: 'text.secondary', fontWeight: 400,
                            fontSize: isMobileView ? "10px" : "12px",
                            fontStyle: 'Poppins'
                        }}>Hub</Typography>
                        <Typography sx={{
                            color: 'text.secondary', fontWeight: 400,
                            fontSize: isMobileView ? "10px" : "12px",
                            fontStyle: 'Poppins'
                        }}>Settings</Typography>
                        <Typography sx={{
                            color: 'text.primary', fontWeight: 400,
                            fontSize: isMobileView ? "10px" : "12px",
                            fontStyle: 'Poppins'
                        }}>Pricing policy</Typography>
                    </Breadcrumbs>
                </Box>
                {!isMobileView && <Typography sx={{
                    color: 'text.primary', fontWeight: 600,
                    fontSize: isMobileView ? "16px" : "30px",
                    fontStyle: 'Poppins', mt: '18px', mb: '30px'
                }}>Pricing Policy</Typography>}
                <PricingPolicyListing />
            </Box>
        </Container>
    )
}

export default PricingPolicy;
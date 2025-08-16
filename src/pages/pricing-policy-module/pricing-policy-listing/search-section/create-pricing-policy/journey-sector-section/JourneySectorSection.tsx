import { Box, Typography, useMediaQuery } from "@mui/material";
import MultiSelectDropdown from "../../../../../../components/core-module/multi-select-dropdown/MultiSelectDropdown";
import { theme } from "../../../../../../theme";
import { JourneySectorSectionProps } from "../../../../../../utility/types/create-pricing-policy/CreatePricingPolicy";
import * as styles from "./JourneySectorSection.module.css";

const JourneySectorSection: React.FC<JourneySectorSectionProps> = ({ selectedJourneyTypes, allJourneyTypes, setSelectedJourneyTypes, allSections, selectedSections, setSelectedSections }) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <div className="journey-sector-section">
            <Box sx={{ mb: isMobile ? 4 : 18 }}>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '320px 1fr',
                    alignItems: isMobile ? undefined : 'center',
                    gap: isMobile ? 0 : 2
                }}>
                    <Box>
                        <Typography  variant="h5" gutterBottom className={(styles as unknown as { sectionTitle: string }).sectionTitle}>
                            Journey Type
                        </Typography>
                        <Typography variant="body1" gutterBottom sx={{ mb: 2, whiteSpace: { md: 'nowrap' } }} className={(styles as unknown as { sectionDescription: string }).sectionDescription}>
                            Sets the Journey Type(s) on which this Pricing Policy will be applicable
                        </Typography>
                    </Box>
                    <Box sx={{ minWidth: isMobile ? '100%' : '260px', maxWidth: isMobile ? '100%' : '260px', justifySelf: isMobile ? 'start' : 'end' }}>
                        <MultiSelectDropdown
                            label="Journey Type"
                            options={allJourneyTypes}
                            selectedValues={selectedJourneyTypes}
                            onChange={setSelectedJourneyTypes}
                            placeholder="Search Journey Type(s)"
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={{ mb: 4, mt: isMobile ? "10rem" : 0 }}>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '320px 1fr',
                    alignItems: isMobile ? undefined : 'center',
                    gap: isMobile ? 0 : 2
                }}>
                    <Box>
                        <Typography variant="h5" gutterBottom className={(styles as unknown as { sectionTitle: string }).sectionTitle}>
                            Sector
                        </Typography>
                        <Typography variant="body1" gutterBottom sx={{ mb: 2, whiteSpace: { md: 'nowrap' } }} className={(styles as unknown as { sectionDescription: string }).sectionDescription}>
                            Sets the Sector(s) on which this Pricing Policy will be applicable
                        </Typography>
                    </Box>
                    <Box sx={{ minWidth: isMobile ? '100%' : '260px', maxWidth: isMobile ? '100%' : '260px', justifySelf: isMobile ? 'start' : 'end',marginTop:"4px" }}>
                        <MultiSelectDropdown
                            label="Sector"
                            options={allSections}
                            selectedValues={selectedSections}
                            onChange={setSelectedSections}
                            placeholder="Select Sector(s)"
                        />
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default JourneySectorSection;
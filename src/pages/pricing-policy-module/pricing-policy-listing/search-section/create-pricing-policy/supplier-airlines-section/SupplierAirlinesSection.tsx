import { Box, Typography, useMediaQuery } from "@mui/material";
import MultiSelectDropdown from "../../../../../../components/core-module/multi-select-dropdown/MultiSelectDropdown";
import { theme } from "../../../../../../theme";
import * as styles from "./SupplierAirlinesSection.module.css";

const SupplierAirlinesSection = ({ selectedSuppliers, allSuppliers, setSelectedSuppliers, selectedAirlines, allAirlines, setSelectedAirlines }) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <div className="supplier-airlines-section">
            <Box sx={{ mb: isMobile ? 4 : 18 }}>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '320px 1fr',
                    alignItems: isMobile ? undefined : 'center',
                    gap: isMobile ? 0 : 2
                }}>
                    <Box>
                        <Typography variant="h5" gutterBottom className={(styles as unknown as { sectionTitle: string }).sectionTitle}>
                            Supplier
                        </Typography>
                        <Typography variant="body1" gutterBottom sx={{ mb: 2, whiteSpace: { md: 'nowrap' } }} className={(styles as unknown as { sectionDescription: string }).sectionDescription}>
                            Sets the Supplier(s) on which this Pricing Policy will be applicable
                        </Typography>
                    </Box>
                    <Box sx={{ minWidth: isMobile ? '100%' : '260px', maxWidth: isMobile ? '100%' : '260px', justifySelf: isMobile ? 'start' : 'end' }}>
                        <MultiSelectDropdown
                            label="Supplier"
                            options={allSuppliers}
                            selectedValues={selectedSuppliers}
                            onChange={setSelectedSuppliers}
                            placeholder="Select Supplier(s)"
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
                            Airlines
                        </Typography>
                        <Typography variant="body1" gutterBottom sx={{ mb: 2, whiteSpace: { md: 'nowrap' } }} className={(styles as unknown as { sectionDescription: string }).sectionDescription}>
                            Sets the Sector(s) on which this Pricing Policy will be applicable
                        </Typography>
                    </Box>
                    <Box sx={{ minWidth: isMobile ? '100%' : '260px', maxWidth: isMobile ? '100%' : '260px', justifySelf: isMobile ? 'start' : 'end', marginTop: "4px" }}>
                        <MultiSelectDropdown
                            label="Airlines"
                            options={allAirlines}
                            selectedValues={selectedAirlines}
                            onChange={setSelectedAirlines}
                            placeholder="Select Airline(s)"
                        />
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default SupplierAirlinesSection;
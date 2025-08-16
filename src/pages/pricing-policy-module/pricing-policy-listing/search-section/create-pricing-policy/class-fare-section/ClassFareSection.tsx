import { Box, TextField, Typography, useMediaQuery } from "@mui/material";
import MultiSelectDropdown from "../../../../../../components/core-module/multi-select-dropdown/MultiSelectDropdown";
import { theme } from "../../../../../../theme";
import { ClassFareSectionProps } from "../../../../../../utility/types/create-pricing-policy/CreatePricingPolicy";
import * as styles from "./ClassFareSection.module.css";

interface ClassFareSectionExtendedProps extends ClassFareSectionProps {
    fareTypeError?: string;
    fareTypeTouched?: boolean;
    onFareTypeBlur?: () => void;
}

const ClassFareSection: React.FC<ClassFareSectionExtendedProps> = ({ selectedClasses, allClasses, setSelectedClasses, fareType, setFareType, fareTypeError, fareTypeTouched, onFareTypeBlur }) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <div className="class-fare-section">
            <Box sx={{ mb: isMobile ? 4 : 18 }}>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '320px 1fr',
                    alignItems: isMobile ? undefined : 'center',
                    gap: isMobile ? 0 : 2
                }}>
                    <Box>
                        <Typography variant="h5" gutterBottom className={(styles as unknown as { sectionTitle: string }).sectionTitle}>
                            Class
                        </Typography>
                        <Typography variant="body1" gutterBottom sx={{ mb: 2, whiteSpace: { md: 'nowrap' } }} className={(styles as unknown as { sectionDescription: string }).sectionDescription}>
                            Sets the Class(es) on which this Pricing Policy will be applicable
                        </Typography>
                    </Box>
                    <Box sx={{ minWidth: isMobile ? '100%' : '260px', maxWidth: isMobile ? '100%' : '260px', justifySelf: isMobile ? 'start' : 'end' }}>
                        <MultiSelectDropdown
                            label="Class"
                            options={allClasses}
                            selectedValues={selectedClasses}
                            onChange={setSelectedClasses}
                            placeholder="Select Class(es)"
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
                            Fare Type
                        </Typography>
                        <Typography variant="body1" gutterBottom sx={{ mb: 2, whiteSpace: { md: 'nowrap' } }} className={(styles as unknown as { sectionDescription: string }).sectionDescription}>
                            Sets the Fare Type(s) on which this Pricing Policy will be applicable
                        </Typography>
                    </Box>
                    <Box sx={{
                        minWidth: isMobile ? '100%' : '260px',
                        maxWidth: isMobile ? '100%' : '260px',
                        justifySelf: isMobile ? 'start' : 'end',
                        marginTop: "4px"
                    }}>
                        <Typography className={(styles as unknown as { fareTypeTitle: string }).fareTypeTitle}>Fare Type</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Enter CSV value(s)"
                            value={fareType}
                            onChange={e => {
                                const upperValue = e.target.value.toUpperCase().replace(/[^A-Z,]/g, '');
                                setFareType(upperValue);
                            }}
                            onBlur={onFareTypeBlur}
                            error={Boolean(fareTypeTouched && fareTypeError)}
                            helperText={fareTypeTouched && fareTypeError}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    height: '40px',
                                    '& input::placeholder': {
                                        color: theme?.palette?.customColors?.grey[10],
                                        opacity: 1,
                                        fontSize: '12px',
                                        fontWeight: 400
                                    },
                                },
                                '& .MuiInputLabel-outlined': {
                                    transform: 'translate(14px, 9px) scale(1)',
                                    '&.MuiInputLabel-shrink': {
                                        transform: 'translate(14px, -6px) scale(0.75)'
                                    }
                                }
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default ClassFareSection;
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { StepConnector, StepIcon, StepIconProps } from '@mui/material';
import OrganizationDeatils from './organization-details/OrganizationDetails';
import FinanceManager from './finance-details/FinanceManager';
import TravelManagerDetails from './travel-manager-details/TravelManagerDetails';

const CustomConnector = styled('div')`
  height: 2px;
  background-color: #1976d2;
  width: 100%;
`;
function CustomStepIcon(props: JSX.IntrinsicAttributes & StepIconProps) {
    const { className } = props;

    return (
        <StepIcon
            {...props}
            className={className}
            sx={{
                fontSize: 30,
            }}
        />
    );
}
export default function AddOrganization() {
    const [activeStep, setActiveStep] = React.useState(0);
    const { t } = useTranslation();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const steps = [
        {
            label: t('organization_details'),
            description: `Enter the basic settings for your ad campaign.`,
        },
        {
            label: t('traveler_manager_details'),
            description: 'Provide ad group details.',
        },
        {
            label: t('finance_manager_details'),
            description: `Enter ad details to capture customers' attention.`,
        },
    ];

    const renderStepper = (
        <Box
            className={`w-full max-w-[400px] bg-[#ebfafe] box-border ${isSmallScreen
                ? 'p-2 mb-2 h-auto rounded-none'
                : 'p-4 mb-0 h-[70vh] rounded-lg'
                }`}
        >
            <Typography>
                <ErrorOutlineIcon sx={{ marginRight: 1 }} />
                {t('get_started_organisation')}
            </Typography>
            <Stepper
                activeStep={activeStep}
                orientation={isSmallScreen ? 'horizontal' : 'vertical'}
                connector={
                    isSmallScreen ? (
                        <CustomConnector />
                    ) : (
                        <StepConnector
                            sx={{
                                '& .MuiStepConnector-line': {
                                    borderColor: 'blue',
                                },
                            }}
                        />
                    )
                }
            >
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            StepIconComponent={CustomStepIcon}
                            sx={{
                                ...(isSmallScreen && {
                                    position: 'relative',
                                    '& .MuiStepIcon-root': {
                                        marginBottom: '8px',
                                    },
                                    '& .MuiStepLabel-label': {
                                        position: 'absolute',
                                        top: '40px',
                                        textAlign: 'center',
                                        width: '100%',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                    },
                                }),
                            }}
                        >
                            {step.label}
                        </StepLabel>
                        {!isSmallScreen && index !== steps.length - 1 && (
                            <StepContent
                                sx={{
                                    '&.MuiStepContent-root': {
                                        borderLeft: '1px solid blue',
                                    },
                                }}
                            >
                                <Typography>{step.description}</Typography>
                            </StepContent>
                        )}
                    </Step>
                ))}
            </Stepper>
        </Box>
    );

    return (
        <Box className={`flex ${isSmallScreen ? 'flex-col pt-[170px] p-2' : 'flex-row p-6'} w-full max-w-[1200px] mx-auto box-border`}>
            {isSmallScreen && (
                <Box
                    className="fixed top-[35px] left-0 w-full z-[1000] bg-[#ebfafe] shadow-[0px_4px_6px_rgba(0,0,0,0.1)] p-2 pt-[20px] h-[160px]"
                >
                    {renderStepper}
                </Box>
            )}

            {/* Content Container */}
            <Box
                className={`w-full mt-${isSmallScreen ? '40' : '2'} min-h-[500px] max-w-[800px] mx-auto flex flex-col ${!isSmallScreen ? 'justify-between' : ''} box-border`}
            >
                <Box>
                    {activeStep !== steps.length && (
                        <Typography sx={{ color: '#3987f7' }}>
                            Step {activeStep + 1} of {steps.length}
                        </Typography>
                    )}
                    {activeStep === 0 && (
                        <OrganizationDeatils activeStep={activeStep} setActiveStep={setActiveStep} />
                    )}
                    {activeStep === 1 && (
                        <TravelManagerDetails activeStep={activeStep} setActiveStep={setActiveStep} />
                    )}
                    {activeStep === 2 && (
                        <FinanceManager activeStep={activeStep} setActiveStep={setActiveStep} />
                    )}
                    {activeStep === steps.length && (
                        <Paper square elevation={0} sx={{ p: 3 }}>
                            <Typography>{t('all_steps_completed')}</Typography>
                        </Paper>
                    )}

                </Box>
            </Box>

            {/* Stepper */}
            <Box
                className={`w-full max-w-[400px] box-border ${!isSmallScreen ? 'pl-6' : ''}`}
            >
                {!isSmallScreen && renderStepper}
                <Box
                    className="bg-[#ebfafe] p-2 rounded-[8px] shadow-none flex justify-between mt-2"
                >
                    <Typography>{t('next')}</Typography>
                    <Typography>{t('add_user')}</Typography>
                </Box>
            </Box>
        </Box>
    );
}

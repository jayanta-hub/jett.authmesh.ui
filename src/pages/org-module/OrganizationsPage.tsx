import {
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import AdditionalSettingsIcon from '../../assets/icons/AdditionalSettingsIcon';
import ApprovalWorkflowIcon from '../../assets/icons/ApprovalWorkflowIcon';
import BudgetIcon from '../../assets/icons/BudgetIcon';
import CheckmarkIcon from '../../assets/icons/CheckmarkIcon';
import CreateMarketIcon from '../../assets/icons/CreateMarketIcon';
import EmailIcon from '../../assets/icons/EmailIcon';
import EmptyStateIcon from '../../assets/icons/EmptyStateIcon';
import FinanceLegalIcon from '../../assets/icons/FinanceLegalIcon';
import OffersIcon from '../../assets/icons/OffersIcon';
import OrganizationHeaderIcon from '../../assets/icons/OrganizationHeaderIcon';
import OrganizationIcon from '../../assets/icons/OrganizationIcon';
import OrganizationStepIcon from '../../assets/icons/OrganizationStepIcon';
import PaymentIcon from '../../assets/icons/PaymentIcon';
import PhoneIcon from '../../assets/icons/PhoneIcon';
import PricingPolicyIcon from '../../assets/icons/PricingPolicyIcon';
import RepresentativesIcon from '../../assets/icons/RepresentativesIcon';
import TagsIcon from '../../assets/icons/TagsIcon';
import TravelPolicyIcon from '../../assets/icons/TravelPolicyIcon';
import UsersIcon from '../../assets/icons/UsersIcon';
import VouchersIcon from '../../assets/icons/VouchersIcon';
import CircularProgressWithLabel from '../../components/core-module/circular-progress/CircularProgressWithLabel';
import CustomDrawer from '../../components/core-module/custom-drawer/CustomDrawer';
import CustomSwitch from '../../components/core-module/custom-switch/CustomSwitch';
import { useFetchOrganizationsMutation, useUpdateOrganizationStatusMutation } from '../../store/musafirOrganizationApi';
import { theme } from '../../theme';
import {
  AdditionalSettingsForm,
  FinanceLegalForm,
  OrganizationDetailsForm,
  RepresentativesForm,
  UsersForm
} from './org-setup-forms';

import {
  ApprovalWorkflowForm,
  BudgetForm,
  AdditionalSettingsForm as EntityAdditionalSettingsForm,
  EntityDetailsForm,
  FinanceLegalForm as EntityFinanceLegalForm,
  RepresentativesForm as EntityRepresentativesForm,
  UsersForm as EntityUsersForm,
  OffersForm,
  PaymentMethodsForm,
  PricingPolicyForm,
  TagsForm,
  TravelPolicyForm,
  VouchersForm
} from './entity-setup-forms';
import TravelPolicy from '../travel-policy-module/TravelPolicy';


interface SetupStep {
  id: string;
  name: string;
  icon: React.ReactNode;
  completed: boolean;
}

interface Entity {
  id: string;
  name: string;
  progress: number;
  totalSteps: number;
  steps: SetupStep[];
  isActive: boolean;
  isSetupComplete: boolean;
}

interface Market {
  id: string;
  name: string;
  entities: Entity[];
  isExpanded: boolean;
  activeEntities: number;
  totalEntities: number;
}

const StyledAccordion = styled(Accordion)(() => ({
  '&.MuiAccordion-root': {
    boxShadow: 'none',
    border: '1px solid #D9D9D9',
    borderRadius: '8px',
    marginBottom: '16px',
    '&:before': {
      display: 'none',
    },
  },
  '&.Mui-expanded': {
    margin: '16px 0',
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(() => ({
  '&.MuiAccordionSummary-root': {
    backgroundColor: theme.palette.customColors?.white[17] || '#F8F8F8',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: theme.palette.customColors?.white[20] || '#f0f0f0',
    },
  },
  '& .MuiAccordionSummary-content': {
    margin: '12px 0',
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    marginRight: '16px',
  },
}));

const EntityCard = styled(Card)(() => ({
  marginBottom: '16px',
  borderRadius: '12px',
  boxShadow: 'none',
  border: 'none',
}));

const ProgressBar = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '5px',
  flexWrap: 'wrap',
  padding: '8px 0',
  justifyContent: 'flex-start',
  width: '100%',
}));


const StepItem = styled(Button)<{ completed?: boolean; selected?: boolean }>(({ selected, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 16px',
  borderRadius: '6px',
  fontSize: '10px',
  fontWeight: 500,
  height: '36px',
  backgroundColor: theme.palette.customColors?.white[0] || '#FFFFFF',
  color: theme.palette.customColors?.black[1] || '#000000',
  border: selected
    ? `1px solid ${theme.palette.customColors?.blue[22] || '#0083FF'}`
    : `1px solid #DADADA`,
  position: 'relative',
  minWidth: 'fit-content',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.customColors?.blue[24] || '#D9EDFF',
  },
  '& svg': {
    fontSize: '16px',
    color: theme.palette.customColors?.black[1] || '#000000',
  },
  '&::before': selected ? {
    content: '""',
    position: 'absolute',
    top: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } : {},
  [theme.breakpoints.down('sm')]: {
    padding: '8px',
  },
  [theme.breakpoints.up('sm')]: {
    padding: '8px 16px',
  },
}));

const OrganizationsPage: React.FC = () => {
  // Mock data for fallback when API fails
  const mockOrganizationsData = {
    Response: [
      {
        OrganizationId: "org-001",
        OrganizationName: "Sample Organization",
        IsActiveStatus: true,
        SetupProcess: {
          OrganizationDetails: true,
          Finance: true,
          Representatives: true,
          Users: true,
          AdditionalSettings: false
        },
        EntityList: [
          {
            MarketId: "market-001",
            MarketCode: "US",
            MarketName: "United States",
            CountOfActiveEntity: 3,
            CountOfTotalEntity: 5,
            Entities: [
              {
                OrgEntityId: "entity-001",
                EntityName: "Tech Solutions Inc",
                IsActiveStatus: true,
                SetupProcess: {
                  EntityDetails: true,
                  Finance: true,
                  Representatives: true,
                  Users: true,
                  PricingPolicy: true,
                  AdditionalSettings: false
                }
              },
              {
                OrgEntityId: "entity-002",
                EntityName: "Global Services Ltd",
                IsActiveStatus: true,
                SetupProcess: {
                  EntityDetails: true,
                  Finance: false,
                  Representatives: true,
                  Users: false,
                  PricingPolicy: false,
                  AdditionalSettings: false
                }
              },
              {
                OrgEntityId: "entity-003",
                EntityName: "Innovation Corp",
                IsActiveStatus: false,
                SetupProcess: {
                  EntityDetails: true,
                  Finance: true,
                  Representatives: false,
                  Users: true,
                  PricingPolicy: true,
                  AdditionalSettings: true
                }
              }
            ]
          },
          {
            MarketId: "market-002",
            MarketCode: "EU",
            MarketName: "Europe",
            CountOfActiveEntity: 2,
            CountOfTotalEntity: 2,
            Entities: [
              {
                OrgEntityId: "entity-004",
                EntityName: "EuroTech Solutions",
                IsActiveStatus: true,
                SetupProcess: {
                  EntityDetails: true,
                  Finance: true,
                  Representatives: true,
                  Users: true,
                  PricingPolicy: true,
                  AdditionalSettings: true
                }
              },
              {
                OrgEntityId: "entity-005",
                EntityName: "Continental Services",
                IsActiveStatus: true,
                SetupProcess: {
                  EntityDetails: true,
                  Finance: true,
                  Representatives: false,
                  Users: true,
                  PricingPolicy: false,
                  AdditionalSettings: false
                }
              }
            ]
          }
        ]
      }
    ]
  };

  const transformApiDataToMarkets = (apiData: any, orgIndex: number = 0): Market[] => {
    if (!apiData?.Response?.[orgIndex]?.EntityList) return [];

    const selectedOrganization = apiData.Response[orgIndex];

    return selectedOrganization.EntityList.map((marketData: any) => ({
      id: marketData.MarketCode?.toLowerCase() || marketData.MarketId?.toLowerCase(),
      name: `${marketData.MarketName} Market`,
      isExpanded: false,
      activeEntities: marketData.CountOfActiveEntity || 0,
      totalEntities: marketData.CountOfTotalEntity || 0,
      entities: marketData.Entities?.map((entityData: any) => {
        const setupProcess = entityData.SetupProcess || {};
        const completedSteps = Object.values(setupProcess).filter(Boolean).length;
        const totalSteps = Object.keys(setupProcess).length;
        const isSetupComplete = totalSteps > 0 && completedSteps === totalSteps;

        return {
          id: entityData.OrgEntityId,
          name: entityData.EntityName,
          progress: completedSteps,
          totalSteps: totalSteps,
          isActive: entityData.IsActiveStatus,
          isSetupComplete: isSetupComplete,
          steps: [
            { id: 'entity-details', name: 'Entity Details', icon: <OrganizationStepIcon />, completed: setupProcess.EntityDetails },
            { id: 'finance-legal', name: 'Finance & Legal', icon: <FinanceLegalIcon />, completed: setupProcess.Finance },
            { id: 'representatives', name: 'Representatives', icon: <RepresentativesIcon />, completed: setupProcess.Representatives },
            { id: 'users', name: 'Users', icon: <UsersIcon />, completed: setupProcess.Users },
            { id: 'payment-methods', name: 'Payment Methods', icon: <PaymentIcon />, completed: false },
            { id: 'travel-policy', name: 'Travel Policy', icon: <TravelPolicyIcon />, completed: false },
            { id: 'tags', name: 'Tags', icon: <TagsIcon />, completed: false },
            { id: 'pricing-policy', name: 'Pricing Policy', icon: <PricingPolicyIcon />, completed: setupProcess.PricingPolicy },
            { id: 'approval-workflow', name: 'Approval Workflow', icon: <ApprovalWorkflowIcon />, completed: false },
            { id: 'budget', name: 'Budget', icon: <BudgetIcon />, completed: false },
            { id: 'offers', name: 'Offers', icon: <OffersIcon />, completed: false },
            { id: 'vouchers', name: 'Vouchers', icon: <VouchersIcon />, completed: false },
            { id: 'additional-settings', name: 'Additional Settings', icon: <AdditionalSettingsIcon />, completed: setupProcess.AdditionalSettings },
          ],
        };
      }) || [],
    })) || [];
  };

  const [markets, setMarkets] = useState<Market[]>([]);
  const [selectedOrganizationIndex, setSelectedOrganizationIndex] = useState<number>(0);
  const [isOrganizationExpanded, setIsOrganizationExpanded] = useState<boolean>(true);
  
  // Drawer state management
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedStep, setSelectedStep] = useState<string>('');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Entity drawer state management
  const [isEntityDrawerOpen, setIsEntityDrawerOpen] = useState<boolean>(false);
  const [selectedEntityStep, setSelectedEntityStep] = useState<string>('');
  const [currentEntityStepIndex, setCurrentEntityStepIndex] = useState<number>(0);
  const [selectedEntityId, setSelectedEntityId] = useState<string>('');

  // API hooks
  const [fetchOrganizations, { data: organizationsData, isLoading, error }] = useFetchOrganizationsMutation();
  const [updateOrganizationStatus, { isLoading: isStatusUpdating }] = useUpdateOrganizationStatusMutation();



  // Fetch organizations on component mount
  const fetchOrganizationsData = () => {
    const requestPayload = {
      Context: {
        UserAgent: "Mozilla/5.0",
        TrackingId: "de2ade5e6a0b4c75b44ab079f4f0b0cb",
        TransactionId: "3ddf1ed3414146e684c236b69a477b7d",
        IpAddress: "192.168.1.1",
        CountryCode: "US"
      }
    };

    fetchOrganizations({ patch: requestPayload });
  };

  useEffect(() => {
    fetchOrganizationsData();
  }, [fetchOrganizations]);



  // Process API data
  useEffect(() => {
    if (organizationsData) {
      const transformedMarkets = transformApiDataToMarkets(organizationsData, selectedOrganizationIndex);
      setMarkets(transformedMarkets);
    } else if (error) {
      console.error('Organizations API Error:', error);
      // dev purpose  
      // const transformedMarkets = transformApiDataToMarkets(mockOrganizationsData, selectedOrganizationIndex);
      // setMarkets(transformedMarkets);
    }
  }, [organizationsData, error, isLoading, selectedOrganizationIndex]);

  const organizations = organizationsData?.Response || [];
  const currentOrganization = organizations[selectedOrganizationIndex];

  const organizationSetupProcess = currentOrganization?.SetupProcess || {};
  const organizationSelectedSteps = Object.keys(organizationSetupProcess).filter(
    key => organizationSetupProcess[key as keyof typeof organizationSetupProcess] === true
  );

  const organizationSetupComplete = Object.keys(organizationSetupProcess).length > 0 &&
    Object.values(organizationSetupProcess).every(value => value === true);

  const entitySetupProcesses: Record<string, string[]> = {};
  currentOrganization?.EntityList?.forEach(market => {
    market.Entities?.forEach(entity => {
      const entitySetupProcess = entity.SetupProcess || {};
      entitySetupProcesses[entity.OrgEntityId] = Object.keys(entitySetupProcess).filter(
        key => entitySetupProcess[key as keyof typeof entitySetupProcess] === true
      );
    });
  });

  const handleMarketToggle = (marketId: string) => {
    setMarkets(prev =>
      prev.map(market =>
        market.id === marketId
          ? { ...market, isExpanded: !market.isExpanded }
          : market
      )
    );
  };

  const handleOrganizationStatusUpdate = async (status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED') => {
    try {
      const requestPayload = {
        Context: {
          UserAgent: "Mozilla/5.0",
          TrackingId: "ac38544e-5f95-4c79-bb84-c284e7e3d6a7",
          TransactionId: "ac38544e-5f95-4c79-bb84-c284e7e3d6a7",
          CountryCode: "IN",
          IpAddress: "127.0.0.1"
        },
        Request: {
          Status: status
        }
      };

      const response = await updateOrganizationStatus({ patch: requestPayload });
      const statusCode = response?.data?.Context?.StatusCode;
      if (statusCode === 1003) {
        fetchOrganizationsData();
      } else {
        const errorMessage = response?.data?.Context?.Message || 'Failed to update organization status';
        console.error(errorMessage);
      }


    } catch (error) {
      console.error('Failed to update organization status:', error);
    }
  };

  const handleOrganizationStatusToggle = async (isActive: boolean) => {
    const status = isActive ? 'ACTIVE' : 'INACTIVE';
    await handleOrganizationStatusUpdate(status);
  };

  const handleEntityToggle = (marketId: string, entityId: string) => {
    setMarkets(prev =>
      prev.map(market =>
        market.id === marketId
          ? {
            ...market,
            entities: market.entities.map(entity =>
              entity.id === entityId
                ? { ...entity, isActive: !entity.isActive }
                : entity
            ),
          }
          : market
      )
    );
  };

  const handleContinueSetup = (marketId: string, entityId: string) => {
    // Find the entity and its setup steps
    const market = markets.find(m => m.id === marketId);
    const entity = market?.entities.find(e => e.id === entityId);
    
    if (entity) {
      // Find the first incomplete step
      const firstIncompleteStep = entity.steps.find(step => !step.completed);
      
      if (firstIncompleteStep) {
        // Set the drawer to open at the first incomplete step
        setSelectedEntityStep(firstIncompleteStep.id);
        
        // Find the index of this step in the steps array
        const stepIndex = entity.steps.findIndex(step => step.id === firstIncompleteStep.id);
        setCurrentEntityStepIndex(stepIndex);
        
        setSelectedEntityId(entityId);
        setIsEntityDrawerOpen(true);
      } else {
        // If all steps are complete, open at the first step
        setSelectedEntityStep('entity-details');
        setCurrentEntityStepIndex(0);
        setSelectedEntityId(entityId);
        setIsEntityDrawerOpen(true);
      }
    }
  };

  const handleOrganizationContinueSetup = () => {
    // Find the first incomplete organization step
    const organizationSteps = [
      { id: 'OrganizationDetails', name: 'Organization Details', completed: organizationSetupProcess.OrganizationDetails },
      { id: 'Finance', name: 'Finance & Legal', completed: organizationSetupProcess.Finance },
      { id: 'Representatives', name: 'Representatives', completed: organizationSetupProcess.Representatives },
      { id: 'Users', name: 'Users', completed: organizationSetupProcess.Users },
      { id: 'AdditionalSettings', name: 'Additional Settings', completed: organizationSetupProcess.AdditionalSettings },
    ];

    const firstIncompleteStep = organizationSteps.find(step => !step.completed);
    
    if (firstIncompleteStep) {
      // Set the drawer to open at the first incomplete step
      setSelectedStep(firstIncompleteStep.id);
      
      // Find the index of this step in the steps array
      const stepIndex = organizationSteps.findIndex(step => step.id === firstIncompleteStep.id);
      setCurrentStepIndex(stepIndex);
      
      setIsDrawerOpen(true);
    } else {
      // If all steps are complete, open at the first step
      setSelectedStep('OrganizationDetails');
      setCurrentStepIndex(0);
      setIsDrawerOpen(true);
    }
  };

  const handleAddEntity = (marketId: string) => {
    setSelectedEntityStep('entity-details');
    setCurrentEntityStepIndex(0);
    setSelectedEntityId('new-entity');
    setIsEntityDrawerOpen(true);
  };

  const handleAddNewEntityFromSettings = () => {
    setSelectedEntityStep('entity-details');
    setCurrentEntityStepIndex(0);
    setSelectedEntityId('new-entity');
    setIsEntityDrawerOpen(true);
  };

  const handleAddMarket = () => {
  };

  const handleStepClick = (stepId: string) => {
    setSelectedStep(stepId);
    setCurrentStepIndex(0);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedStep('');
    setCurrentStepIndex(0);
  };

  const handleEntityDrawerClose = () => {
    setIsEntityDrawerOpen(false);
    setSelectedEntityStep('');
    setCurrentEntityStepIndex(0);
    setSelectedEntityId('');
  };

  const handleNextStep = () => {
    const organizationSteps = [
      'OrganizationDetails',
      'Finance',
      'Representatives',
      'Users',
      'AdditionalSettings'
    ];
    
    const currentIndex = organizationSteps.indexOf(selectedStep);
    if (currentIndex < organizationSteps.length - 1) {
      const nextStep = organizationSteps[currentIndex + 1];
      setSelectedStep(nextStep);
      setCurrentStepIndex(currentIndex + 1);
    } else {
      handleDrawerClose();
    }
  };

  const handleBackStep = () => {
    const organizationSteps = [
      'OrganizationDetails',
      'Finance',
      'Representatives',
      'Users',
      'AdditionalSettings'
    ];
    
    const currentIndex = organizationSteps.indexOf(selectedStep);
    if (currentIndex > 0) {
      const prevStep = organizationSteps[currentIndex - 1];
      setSelectedStep(prevStep);
      setCurrentStepIndex(currentIndex - 1);
    }
  };

  const handleEntityNextStep = () => {
    const entitySteps = [
      'entity-details', 'finance-legal', 'representatives', 'users', 'payment-methods',
      'travel-policy', 'tags', 'pricing-policy', 'approval-workflow', 'budget',
      'offers', 'vouchers', 'additional-settings'
    ];

    const currentIndex = entitySteps.indexOf(selectedEntityStep);
    if (currentIndex < entitySteps.length - 1) {
      const nextStep = entitySteps[currentIndex + 1];
      setSelectedEntityStep(nextStep);
      setCurrentEntityStepIndex(currentIndex + 1);
    }
  };

  const handleEntityBackStep = () => {
    const entitySteps = [
      'entity-details', 'finance-legal', 'representatives', 'users', 'payment-methods',
      'travel-policy', 'tags', 'pricing-policy', 'approval-workflow', 'budget',
      'offers', 'vouchers', 'additional-settings'
    ];

    const currentIndex = entitySteps.indexOf(selectedEntityStep);
    if (currentIndex > 0) {
      const prevStep = entitySteps[currentIndex - 1];
      setSelectedEntityStep(prevStep);
      setCurrentEntityStepIndex(currentIndex - 1);
    }
  };

  const handleEntityStepClick = (entityId: string, stepId: string) => {
    setSelectedEntityId(entityId);
    setSelectedEntityStep(stepId);

    const stepIndexMap: { [key: string]: number } = {
      'entity-details': 0,
      'finance-legal': 1,
      'representatives': 2,
      'users': 3,
      'payment-methods': 4,
      'travel-policy': 5,
      'tags': 6,
      'pricing-policy': 7,
      'approval-workflow': 8,
      'budget': 9,
      'offers': 10,
      'vouchers': 11,
      'additional-settings': 12,
    };

    setCurrentEntityStepIndex(stepIndexMap[stepId] || 0);
    setIsEntityDrawerOpen(true);
  };

  const handleOrganizationToggle = () => {
    setIsOrganizationExpanded(!isOrganizationExpanded);
  };

  return (
    <Box className="min-h-screen bg-white">
      {/* Header */}
      <Box className="bg-white">
        <Box sx={{ width: { xs: '100%', lg: '1080px' }, mx: 'auto', px: { xs: '20px', lg: 'unset' }, pt: 8, pb: 2 }}>
          <Box className="flex items-center justify-between mb-2">
            <Box className="flex items-center gap-3">
            <OrganizationHeaderIcon sx={{ color: theme.palette.customColors?.blue[22] || '#0083FF' }} />
            <Typography variant="h4" className="font-semibold text-gray-900" sx={{
              fontSize: '26px',
              fontWeight: 600,
              color: theme.palette.customColors?.black[1] || '#000000'
            }}>
              Organizations
            </Typography>
            </Box>
          </Box>
          <Typography variant="body1" sx={{
            fontSize: '12px',
            fontWeight: 400,
            color: theme.palette.customColors?.grey[8]
          }}>
            Set up or manage organizations seamlessly and scale your business with confidence.
          </Typography>
        </Box>
        <Divider sx={{ width: { xs: '100%', lg: '1080px' }, margin: '0 auto' }} />
      </Box>

      {/* Main Content */}
      <Box sx={{ width: { xs: '100%', lg: '1080px' }, mx: 'auto', px: { xs: '20px', lg: '80px' }, pb: 8, pt: 4 }}>
        {/* Main Content */}
        <Box>
          {/* No Organizations Found State */}
          {!isLoading && organizations.length === 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px',
                padding: '32px 16px'
              }}
            >
              <EmptyStateIcon
                sx={{
                  color: theme.palette.customColors?.blue[22] || '#0083FF',
                  fontSize: '48px',
                  marginBottom: '16px'
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: theme.palette.customColors?.black[1] || '#000000',
                  marginBottom: '8px',
                  textAlign: 'center'
                }}
              >
                No Organizations Found
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '14px',
                  fontWeight: 400,
                  color: theme.palette.customColors?.grey[8] || '#666666',
                  textAlign: 'center'
                }}
              >
                {error ? 'Failed to load organizations. Please try again later.' : 'No organizations have been created yet.'}
              </Typography>
            </Box>
          )}

          {/* Loading State */}
          {isLoading && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px',
                padding: '32px 16px'
              }}
            >
              <CircularProgress
                size={48}
                thickness={4}
                sx={{
                  color: theme.palette.customColors?.blue[22] || '#0083FF',
                  marginBottom: '16px'
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontSize: '14px',
                  fontWeight: 400,
                  color: theme.palette.customColors?.grey[8] || '#666666',
                  textAlign: 'center'
                }}
              >
                Loading organizations...
              </Typography>
            </Box>
          )}

          {/* Organizations Content - Only show when there are organizations and not loading */}
          {!isLoading && organizations.length > 0 && (
            <>
              {/* Parent Accordion */}
          <StyledAccordion expanded={isOrganizationExpanded} onChange={handleOrganizationToggle} className="mb-8">
            <StyledAccordionSummary
                   expandIcon={<ExpandMoreIcon sx={{ color: '#000000' }} />}
              sx={{
                flexDirection: 'row-reverse',
                backgroundColor: '#FFFFFF !important'
              }}
            >
              <Box className="flex items-center justify-between w-full pr-4">
                <Box className="flex items-center gap-3">
                  <OrganizationIcon sx={{ color: theme.palette.customColors?.blue[22] }} />
                  <Typography variant="h6" className="font-semibold"
                    sx={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: theme.palette.customColors?.black[1] || '#000000'
                    }}
                  >
                    {currentOrganization?.Name || 'Organization'}
                  </Typography>
                </Box>
              </Box>
            </StyledAccordionSummary>
            <AccordionDetails className="pt-4 pb-0 mb-0">
              <Box
                sx={{
                  backgroundColor: organizationSetupComplete
                    ? '#FFFFFF'
                    : theme.palette.customColors?.white[17] || '#F8F8F8',
                  borderRadius: '10px',
                  padding: '20px',
                  marginBottom: '16px'
                }}
              >
                {/* Main Layout */}
                <Box className="flex items-start gap-3">
                  {/* Progress Indicator Box */}
                  <Box className="flex-shrink-0">
                    <CircularProgressWithLabel
                      value={organizationSelectedSteps.length}
                      total={Object.keys(organizationSetupProcess).length}
                      size={40}
                      thickness={4}
                          width="58px !important"
                          height="58px !important"
                          labelFontSize='16px !important'
                          labelFontWeight="700 !important"
                    />
                  </Box>

                  {/* Content Box */}
                  <Box className="flex-1">
                    <Box className="flex items-start justify-between mb-4 flex-wrap gap-2">
                      <Box className="flex flex-col">
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: theme.palette.customColors?.veryDarkGray[1] || '#131313',
                                mt: "1rem"
                          }}
                        >
                          {organizationSetupComplete ? 'Your Organization setup is complete' : 'Complete your Organization Details'}
                        </Typography>
                      </Box>

                      {/* Action Buttons */}
                      <Box className="flex items-center" sx={{ justifyContent: { xs: "space-between", sm: "unset" }, flexGrow: { xs: 1, sm: 0 } }}>
                        <Box className="flex items-center gap-2">
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: '10px',
                              color: theme.palette.customColors?.black[1] || '#000000',
                              fontWeight: 400,
                            }}
                          >
                            Active
                          </Typography>
                          <CustomSwitch
                            checked={currentOrganization?.IsActiveStatus || false}
                            onChange={(event) => handleOrganizationStatusToggle(event.target.checked)}
                            disabled={isStatusUpdating}
                            status={currentOrganization?.IsActiveStatus ? 'ACTIVE' : 'INACTIVE'}
                          />
                        </Box>
                        <Button
                          variant="contained"
                              onClick={() => handleOrganizationContinueSetup()}
                          sx={{
                            backgroundColor: organizationSetupComplete
                              ? '#B6EDB6'
                              : theme.palette.customColors?.blue[22] || '#0083FF',
                            fontSize: '10px',
                            textTransform: 'none',
                            borderRadius: '4px',
                            padding: '7px 10px',
                            height: '30px',
                            color: organizationSetupComplete ? '#000000' : '#FFFFFF',
                            '&:hover': {
                              backgroundColor: organizationSetupComplete
                                ? '#A5DCA5'
                                : theme.palette.customColors?.blue[22] || '#0083FF',
                              color: organizationSetupComplete
                                ? '#000000'
                                : '#FFFFFF'
                            }
                          }}
                        >
                          {organizationSetupComplete ? 'View' : 'Continue Setup'}
                        </Button>
                      </Box>
                    </Box>

                    {/* Progress Steps Row */}
                    <ProgressBar>
                      {[
                        { id: 'OrganizationDetails', name: 'Organization', icon: <OrganizationStepIcon />, completed: organizationSetupProcess.OrganizationDetails },
                        { id: 'Finance', name: 'Finance & Legal', icon: <FinanceLegalIcon />, completed: organizationSetupProcess.Finance },
                        { id: 'Representatives', name: 'Representatives', icon: <RepresentativesIcon />, completed: organizationSetupProcess.Representatives },
                        { id: 'Users', name: 'Users', icon: <UsersIcon />, completed: organizationSetupProcess.Users },
                        { id: 'AdditionalSettings', name: 'Additional Settings', icon: <AdditionalSettingsIcon />, completed: organizationSetupProcess.AdditionalSettings },
                          ].map((step) => (
                        <StepItem
                              key={step.id}
                          completed={step.completed}
                          selected={organizationSelectedSteps.includes(step.id)}
                          onClick={() => handleStepClick(step.id)}
                        >
                          {step.icon}
                          {step.name}
                          {organizationSelectedSteps.includes(step.id) && (
                            <CheckmarkIcon
                              sx={{
                                position: 'absolute',
                                top: '-6px',
                                left: '55%',
                                transform: 'translateX(-50%)',
                                fontSize: '22px !important',
                                color: '#0083FF !important',
                                zIndex: 1
                              }}
                            />
                          )}
                        </StepItem>
                      ))}
                    </ProgressBar>
                  </Box>
                </Box>
              </Box>

              {/* Business Entities Section */}
              <Typography variant="h5" className="font-semibold mb-4 text-gray-900 mt-8" sx={{
                fontSize: '18px',
                fontWeight: 600,
                mb: '20px'
              }}>
                Business Entities
              </Typography>

              {markets.map((market) => (
                <StyledAccordion
                  key={market.id}
                  expanded={market.isExpanded}
                  onChange={() => handleMarketToggle(market.id)}
                  className="mb-4"
                >
                                             <StyledAccordionSummary expandIcon={market.isExpanded ? <ExpandMoreIcon sx={{ color: '#000000', transform: 'rotate(360deg)' }} /> : <ExpandMoreIcon sx={{ color: '#000000', transform: 'rotate(270deg)' }} />} sx={{
                        flexDirection: 'row-reverse', p: "0px 10px 0 16px !important", margin: 0,
                        minHeight: '48px !important',
                        '&.Mui-expanded': {
                          margin: 0,
                          minHeight: '48px !important',
                          borderRadius: '8px 8px 0 0',
                          borderBottom: '1px solid #DADADA'
                        },
                        '& .MuiAccordionSummary-content': {
                          margin: '12px 0 !important'
                        },
                        '& .MuiAccordionSummary-content.Mui-expanded': {
                          margin: '12px 0 !important'
                        },
                        '&:hover': { backgroundColor: '#F0F0F0' }
                      }}>
                    <Box className="flex items-center justify-between w-full">
                      <Box className="flex items-center gap-3">
                        <Typography sx={{ fontSize: { xs: "12px", md: "16px" }, fontWeight: 600 }} className="font-medium">
                          {market.name}
                        </Typography>
                        <Chip
                          label={market.totalEntities === 0 ? 'No Entity Available' : `${market.activeEntities}/${market.totalEntities} Active`}
                          size="small"
                          sx={{
                            backgroundColor: theme.palette.customColors?.white[16] || '#E7E7E7',
                            fontSize: '10px',
                            height: '24px',
                            borderRadius: '4px',
                            '& .MuiChip-label': {
                              padding: '5px 15px',
                            },
                          }}
                        />
                      </Box>
                      <Button
                        variant="text"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddEntity(market.id);
                            }}
                        sx={{
                          color: theme.palette.customColors?.blue[22] || '#0083FF',
                          fontSize: '10px',
                          textTransform: 'none',
                          gap: '4px',
                          '&:hover': {
                            backgroundColor: theme.palette.customColors?.blue[24] || '#D9EDFF',
                            color: theme.palette.customColors?.blue[22] || '#0083FF'
                          },
                          whiteSpace: 'nowrap',
                          ml: '10px'
                        }}
                      >
                        + Add Entity
                      </Button>
                    </Box>
                  </StyledAccordionSummary>
                  <AccordionDetails sx={{ p: "16px !important" }}>
                    {market.entities.length > 0 ? (
                      market.entities.map((entity) => (
                            <>
                        <EntityCard key={entity.id}>
                          <CardContent sx={{ p: '0 !important' }}>
                            <Box className="flex items-center justify-between mb-4">
                              <Box className="flex items-center gap-3">
                                <OrganizationIcon sx={{ color: theme.palette.customColors?.blue[22] || '#0083FF', width: 45, height: 35 }} />
                                <Typography sx={{
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  marginBottom: '4px'
                                }}>
                                  {entity.name}
                                </Typography>
                              </Box>
                            </Box>

                            <Box
                              className="p-4"
                              sx={{
                                backgroundColor: entity.isSetupComplete
                                  ? '#FFFFFF'
                                  : theme.palette.customColors?.white[17] || '#F8F8F8',
                                borderRadius: '10px',
                                mb: '0 !important'
                              }}
                            >
                              <Box className="flex items-center justify-between mb-4 flex-wrap gap-2">
                                <Box className="flex items-center gap-3">
                                  <CircularProgressWithLabel
                                    value={entity.progress}
                                    total={entity.totalSteps}
                                    size={40}
                                    thickness={4}
                                          width="38px !important"
                                          height="38px !important"
                                          labelFontSize='10px !important'
                                          labelFontWeight="700 !important"
                                  />
                                  <Typography variant="body1"
                                    sx={{
                                      fontSize: '12px',
                                      fontWeight: 600,
                                      marginBottom: '4px'
                                    }}>
                                    {entity.isSetupComplete
                                      ? 'Your entity setup is complete'
                                      : 'Complete your Entity Details'
                                    }
                                  </Typography>
                                </Box>
                                <Box className="flex items-center" sx={{ justifyContent: { xs: "space-between", sm: "unset" }, flexGrow: { xs: 1, sm: 0 } }}>
                                  <Box className="flex items-center gap-2">
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        fontSize: '10px',
                                        color: entity.isActive
                                          ? theme.palette.customColors?.black[1] || '#000000'
                                          : theme.palette.customColors?.grey[8] || '#666666',
                                        fontWeight: 400,
                                      }}
                                    >
                                      {entity.isActive ? 'Active' : 'Inactive'}
                                    </Typography>
                                    <CustomSwitch
                                      checked={entity.isActive}
                                      onChange={() => handleEntityToggle(market.id, entity.id)}
                                      status={entity.isActive ? 'ACTIVE' : 'INACTIVE'}
                                    />
                                  </Box>
                                  <Button
                                    variant="contained"
                                    sx={{
                                      backgroundColor: entity.isSetupComplete
                                        ? '#B6EDB6'
                                        : theme.palette.customColors?.blue[22] || '#0083FF',
                                      fontSize: '10px',
                                      textTransform: 'none',
                                      borderRadius: '4px',
                                      padding: '7px 10px',
                                      height: '30px',
                                      color: entity.isSetupComplete ? '#000000' : '#FFFFFF',
                                      '&:hover': {
                                        backgroundColor: entity.isSetupComplete
                                          ? '#A5DCA5'
                                          : theme.palette.customColors?.blue[22] || '#0083FF',
                                        color: entity.isSetupComplete
                                          ? '#000000'
                                          : '#FFFFFF'
                                      }
                                    }}
                                    onClick={() => handleContinueSetup(market.id, entity.id)}
                                  >
                                    {entity.isSetupComplete ? 'View' : 'Continue Setup'}
                                  </Button>
                                </Box>
                              </Box>

                              <ProgressBar>
                                {entity.steps.map((step) => (
                                  <StepItem
                                    key={step.id}
                                    completed={step.completed}
                                    selected={step.completed}
                                    onClick={() => handleEntityStepClick(entity.id, step.id)}
                                  >
                                    {step.icon}
                                    {step.name}
                                    {step.completed && (
                                      <CheckmarkIcon
                                        sx={{
                                          position: 'absolute',
                                          top: '-6px',
                                          left: '55%',
                                          transform: 'translateX(-50%)',
                                          fontSize: '22px !important',
                                          color: '#0083FF !important',
                                          zIndex: 1
                                        }}
                                      />
                                    )}
                                  </StepItem>
                                ))}
                              </ProgressBar>
                            </Box>
                          </CardContent>
                        </EntityCard>
                    {/* Contact Support and Quick Help Section - Only show when there are entities */}
                      <Box className="flex items-start gap-4 mt-4">
                        <Card className="rounded-xl" sx={{ boxShadow: 'none' }}>
                          <CardContent sx={{ p: "16px 0 !important" }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontSize: '12px',
                                fontWeight: 600,
                                mb: 1,
                                color: theme.palette.customColors?.black[1] || '#000000'
                              }}
                            >
                              Contact Support
                            </Typography>
                            <Box className="space-y-3 flex flex-wrap flex-row" sx={{ gap: { xs: "10px", sm: "20px" } }}>
                                  <Box className="flex items-center gap-2">
                                    <EmailIcon sx={{ color: '#BBC2C8' }} />
                                    <Typography sx={{ fontSize: "10px" }} className="text-black-600">
                                  adminalphabet@gmail.com
                                </Typography>
                              </Box>
                                  <Box className="flex items-center gap-2 m-0 mt-0" sx={{ mt: "0 !important" }}>
                                    <PhoneIcon sx={{ color: '#BBC2C8' }} />
                                    <Typography sx={{ fontSize: "10px" }} className="text-black-600">
                                  +91 9800900098
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>

                        <Divider orientation="vertical" flexItem sx={{ borderColor: '#DADADA' }} />

                        <Card className="rounded-xl" sx={{ boxShadow: 'none' }}>
                          <CardContent sx={{ p: "16px 0 !important" }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontSize: '12px',
                                fontWeight: 600,
                                    mb: '11px',
                                color: theme.palette.customColors?.black[1] || '#000000'
                              }}
                            >
                              Quick Help?
                            </Typography>
                            <Box className="flex flex-wrap items-center gap-2">
                                  <Typography sx={{ fontSize: "10px" }} className="text-black-600">
                                Entity Setup Checklist
                              </Typography>
                              <Box className="w-px h-[10px] bg-gray-300"></Box>
                                  <Typography sx={{ fontSize: "10px" }} className="text-black-600">
                                Getting Started Guide
                              </Typography>
                              <Box className="w-px h-[10px] bg-gray-300"></Box>
                                  <Typography sx={{ fontSize: "10px" }} className="text-black-600">
                                Common Issues
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Box>
                          <Divider sx={{ borderColor: '#DADADA', mb:4, mt:3 }} />
                            </>
                          ))
                        ) : (
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minHeight: '200px',
                              padding: '32px 16px'
                            }}
                          >
                            <EmptyStateIcon
                              sx={{
                                color: theme.palette.customColors?.blue[22] || '#0083FF',
                                fontSize: '48px',
                                marginBottom: '16px'
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: '12px',
                                fontWeight: 500,
                                color: theme.palette.customColors?.black[1] || '#000000',
                                marginBottom: '24px',
                                marginTop: '10px',
                                textAlign: 'center'
                              }}
                            >
                              No Entity in this Market yet
                            </Typography>
                            <Button
                              variant="outlined"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddEntity(market.id);
                              }}
                              sx={{
                                border: `1px solid ${theme.palette.customColors?.blue[22] || '#0083FF'}`,
                                color: theme.palette.customColors?.blue[22] || '#0083FF',
                                backgroundColor: '#FFFFFF',
                                fontSize: '12px',
                                textTransform: 'none',
                                borderRadius: '8px',
                                padding: '8px 16px',
                                '&:hover': {
                                  backgroundColor: theme.palette.customColors?.blue[24] || '#D9EDFF',
                                  border: `1px solid ${theme.palette.customColors?.blue[22] || '#0083FF'}`,
                                  color: theme.palette.customColors?.blue[22] || '#0083FF'
                                }
                              }}
                            >
                              + Add First Entity
                            </Button>
                          </Box>
                    )}
                  </AccordionDetails>
                </StyledAccordion>
              ))}
            </AccordionDetails>
            {/* Create New Market Section */}
            <Box className="text-center pb-2">
              <Box className="inline-flex flex-col items-center p-8 bg-white rounded-xl">
                <CreateMarketIcon
                  sx={{
                    color: theme.palette.customColors?.grey[8] || '#666666',
                    fontSize: '48px',
                    marginBottom: '16px'
                  }}
                />
                <Typography variant="h6"
                  sx={{
                    fontSize: '12px',
                    fontWeight: 500,
                    mb: 3,
                    mt: 1
                  }}>
                  Create a new Market
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleAddMarket}
                  sx={{
                    backgroundColor: '#FFFFFF',
                    border: `1px solid ${theme.palette.customColors?.blue[22] || '#0083FF'}`,
                    color: theme.palette.customColors?.blue[22] || '#0083FF',
                    fontSize: '12px',
                    textTransform: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    height: '36px',
                    '&:hover': {
                      backgroundColor: '#FFFFFF',
                      border: `1px solid ${theme.palette.customColors?.blue[22] || '#0083FF'}`,
                      color: theme.palette.customColors?.blue[22] || '#0083FF'
                    }
                  }}
                >
                  + Add a new Market
                </Button>
              </Box>
            </Box>
          </StyledAccordion>
            </>
          )}


        </Box>
      </Box>

      {/* Organization Setup Drawer */}
      <CustomDrawer
        isOpen={isDrawerOpen}
        anchor="right"
        onClose={handleDrawerClose}
      >
        {selectedStep === 'OrganizationDetails' && (
          <OrganizationDetailsForm
            onClose={handleDrawerClose}
            onNext={handleNextStep}
          />
        )}
        {selectedStep === 'Finance' && (
          <FinanceLegalForm
            onClose={handleDrawerClose}
            onNext={handleNextStep}
            onBack={handleBackStep}
          />
        )}
        {selectedStep === 'Representatives' && (
          <RepresentativesForm
            onClose={handleDrawerClose}
            onNext={handleNextStep}
            onBack={handleBackStep}
          />
        )}
        {selectedStep === 'Users' && (
          <UsersForm
            onClose={handleDrawerClose}
            onNext={handleNextStep}
            onBack={handleBackStep}
          />
        )}

        {selectedStep === 'AdditionalSettings' && (
          <AdditionalSettingsForm
            onClose={handleDrawerClose}
            onNext={handleNextStep}
            onBack={handleBackStep}
          />
        )}
      </CustomDrawer>

      {/* Entity Setup Drawer */}
      <CustomDrawer
        isOpen={isEntityDrawerOpen}
        anchor="right"
        onClose={handleEntityDrawerClose}
      >
        {selectedEntityStep === 'entity-details' && (
          <EntityDetailsForm
            onClose={handleEntityDrawerClose}
            onNext={handleEntityNextStep}
          />
        )}
        {selectedEntityStep === 'finance-legal' && (
          <EntityFinanceLegalForm
            onClose={handleEntityDrawerClose}
            onNext={handleEntityNextStep}
            onBack={handleEntityBackStep}
          />
        )}
        {selectedEntityStep === 'representatives' && (
          <EntityRepresentativesForm
            onClose={handleEntityDrawerClose}
            onNext={handleEntityNextStep}
            onBack={handleEntityBackStep}
          />
        )}
        {selectedEntityStep === 'users' && (
          <EntityUsersForm
            onClose={handleEntityDrawerClose}
            onNext={handleEntityNextStep}
            onBack={handleEntityBackStep}
          />
        )}
        {selectedEntityStep === 'payment-methods' && (
          <PaymentMethodsForm
            onClose={handleEntityDrawerClose}
            onNext={handleEntityNextStep}
            onBack={handleEntityBackStep}
          />
        )}
        {selectedEntityStep === 'travel-policy' && (
          // <TravelPolicy/>
          <TravelPolicyForm
            onClose={handleEntityDrawerClose}
            onNext={handleEntityNextStep}
            onBack={handleEntityBackStep}
          />
        )}
        {selectedEntityStep === 'tags' && (
          <TagsForm
            onClose={handleEntityDrawerClose}
            onNext={handleEntityNextStep}
            onBack={handleEntityBackStep}
          />
        )}
        {selectedEntityStep === 'pricing-policy' && (
          <PricingPolicyForm
            onClose={handleEntityDrawerClose}
            onNext={handleEntityNextStep}
            onBack={handleEntityBackStep}
          />
        )}
        {selectedEntityStep === 'approval-workflow' && (
          <ApprovalWorkflowForm
            onClose={handleEntityDrawerClose}
            onNext={handleEntityNextStep}
            onBack={handleEntityBackStep}
          />
        )}
        {selectedEntityStep === 'budget' && (
          <BudgetForm
            onClose={handleEntityDrawerClose}
            onNext={handleEntityNextStep}
            onBack={handleEntityBackStep}
          />
        )}
        {selectedEntityStep === 'offers' && (
          <OffersForm
            onClose={handleEntityDrawerClose}
            onNext={handleEntityNextStep}
            onBack={handleEntityBackStep}
          />
        )}
        {selectedEntityStep === 'vouchers' && (
          <VouchersForm
            onClose={handleEntityDrawerClose}
            onNext={handleEntityNextStep}
            onBack={handleEntityBackStep}
          />
        )}
        {selectedEntityStep === 'additional-settings' && (
          <EntityAdditionalSettingsForm
            onClose={handleEntityDrawerClose}
            onNext={handleEntityNextStep}
            onBack={handleEntityBackStep}
            onAddNewEntity={handleAddNewEntityFromSettings}
          />
        )}
      </CustomDrawer>
    </Box>
  );
};

export default OrganizationsPage; 
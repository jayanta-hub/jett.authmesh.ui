import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  IconButton,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  SelectChangeEvent,
  FormControlLabel,
  Checkbox,
  Chip,
} from '@mui/material';
import { Close as CloseIcon, ArrowBack as ArrowBackIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { theme } from '../../../theme';
import CustomSwitch from '../../../components/core-module/custom-switch/CustomSwitch';
import MultiSelectDropdown from '../../../components/core-module/multi-select-dropdown/MultiSelectDropdown';
import FileUploadIcon from '../../../assets/icons/FileUploadIcon';
import CheckboxUncheckedIcon from '../../../assets/icons/CheckboxUncheckedIcon';
import CheckboxCheckedIcon from '../../../assets/icons/CheckboxCheckedIcon';
import { Close as CloseIconSmall } from '@mui/icons-material';
import { SketchPicker } from 'react-color';
import EditorComponent from '../../../components/core-module/editor/editorComponent';
import CustomModal from '../../../components/core-module/custom-modal/CustomModal';
import OrganizationSetupCompleteIcon from '../../../assets/icons/OrganizationSetupCompleteIcon';

interface AdditionalSettingsFormProps {
  onClose: () => void;
  onNext: () => void;
  onBack?: () => void;
  onAddNewEntity?: () => void;
}

const AdditionalSettingsForm: React.FC<AdditionalSettingsFormProps> = ({
  onClose,
  onNext,
  onBack,
  onAddNewEntity,
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [loginMethod, setLoginMethod] = useState<string>('username_password');
  const [selectedAirlines, setSelectedAirlines] = useState<{ id: string, name: string }[]>([]);
  const [logoUploadTab, setLogoUploadTab] = useState<'upload' | 'url'>('upload');
  const [uploadedLogoFiles, setUploadedLogoFiles] = useState<File[]>([]);
  const [isLogoDragOver, setIsLogoDragOver] = useState(false);
  const [isLogoUploading, setIsLogoUploading] = useState(false);
  const [logoUploadProgress, setLogoUploadProgress] = useState(0);
  const [uploadingLogoFile, setUploadingLogoFile] = useState<File | null>(null);
  const logoFileInputRef = React.useRef<HTMLInputElement>(null);
  const [displayPrimaryColorPicker, setDisplayPrimaryColorPicker] = useState(false);
  const [displaySecondaryColorPicker, setDisplaySecondaryColorPicker] = useState(false);
  const [primaryColor, setPrimaryColor] = useState({
    r: '139',
    g: '92',
    b: '246',
    a: '1',
  });
  const [secondaryColor, setSecondaryColor] = useState({
    r: '75',
    g: '85',
    b: '99',
    a: '1',
  });

  const [flightInfoEditorContent, setFlightInfoEditorContent] = useState('');
  const [hotelInfoEditorContent, setHotelInfoEditorContent] = useState('');
  const [visaInfoEditorContent, setVisaInfoEditorContent] = useState('');
  const [flightInfoBannerEnabled, setFlightInfoBannerEnabled] = useState(false);
  const [hotelInfoBannerEnabled, setHotelInfoBannerEnabled] = useState(false);
  const [visaInfoBannerEnabled, setVisaInfoBannerEnabled] = useState(false);
  const [travelIntents, setTravelIntents] = useState<string[]>(['']);
  const [travelIntentMandatory, setTravelIntentMandatory] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSaveProgressModal, setShowSaveProgressModal] = useState(false);

  // Communication Settings state
  const [whatsappNotificationsEnabled, setWhatsappNotificationsEnabled] = useState(true);
  const [changeSenderAddressEnabled, setChangeSenderAddressEnabled] = useState(true);
  const [senderEmailAddress, setSenderEmailAddress] = useState('tanyasingh56@gmail.com');
  const [ccEmailEnabled, setCcEmailEnabled] = useState(true);
  const [bccEmailEnabled, setBccEmailEnabled] = useState(true);
  const [ccEmailAddresses] = useState([
    'tanyasingh56@gmail.com',
    'kiranjha6@gmail.com',
    'mynameisabc123@gmail.com',
    'kumarg342@gmail.com',
    'john.doe@company.com',
    'jane.smith@company.com',
    'mike.wilson@company.com',
    'sarah.jones@company.com',
    'david.brown@company.com',
    'lisa.garcia@company.com',
    'robert.taylor@company.com',
    'emily.davis@company.com',
    'james.miller@company.com',
    'amanda.white@company.com',
    'chris.anderson@company.com',
    'jessica.thomas@company.com',
    'michael.jackson@company.com'
  ]);
  const [bccEmailAddresses] = useState([
    'tanyasingh56@gmail.com',
    'kiranjha6@gmail.com',
    'mynameisabc123@gmail.com',
    'kumarg342@gmail.com',
    'john.doe@company.com',
    'jane.smith@company.com',
    'mike.wilson@company.com',
    'sarah.jones@company.com',
    'david.brown@company.com',
    'lisa.garcia@company.com',
    'robert.taylor@company.com',
    'emily.davis@company.com',
    'james.miller@company.com',
    'amanda.white@company.com',
    'chris.anderson@company.com',
    'jessica.thomas@company.com',
    'michael.jackson@company.com'
  ]);
  const [showAllCcEmails, setShowAllCcEmails] = useState(false);
  const [showAllBccEmails, setShowAllBccEmails] = useState(false);

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleLoginMethodChange = (event: SelectChangeEvent<string>) => {
    setLoginMethod(event.target.value);
  };

  const handleAirlinesChange = (airlines: { id: string, name: string }[]) => {
    setSelectedAirlines(airlines);
  };

  // Helper to check if a file is a valid logo file
  const isValidLogoFile = (file: File) => {
    const validTypes = [
      'image/svg+xml',
      'image/png',
      'image/jpeg',
      'image/jpg',
    ];
    const isValidType = validTypes.includes(file.type);
    const isValidSize = file.size <= 5 * 1024 * 1024;
    return isValidType && isValidSize;
  };

  // Helper to simulate logo upload for a single file
  const simulateLogoUpload = (file: File) => {
    setUploadingLogoFile(file);
    setIsLogoUploading(true);
    setLogoUploadProgress(0);

    const interval = setInterval(() => {
      setLogoUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLogoUploading(false);
          setUploadingLogoFile(null);
          setUploadedLogoFiles(prevFiles => [...prevFiles, file]);
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleLogoFileSelect = (files: FileList | null) => {
    if (!files) return;

    const validFiles = Array.from(files).filter(isValidLogoFile);

    validFiles.forEach((file, index) => {
      setTimeout(() => {
        simulateLogoUpload(file);
      }, index * 2500);
    });
  };

  const handleRemoveLogoFile = (index: number) => {
    setUploadedLogoFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleLogoDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsLogoDragOver(true);
  };

  const handleLogoDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsLogoDragOver(false);
  };

  const handleLogoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsLogoDragOver(false);
    const files = e.dataTransfer.files;
    handleLogoFileSelect(files);
  };

  const handleLogoClick = () => {
    logoFileInputRef.current?.click();
  };

  const handleLogoFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleLogoFileSelect(e.target.files);
    if (e.target) {
      e.target.value = '';
    }
  };

  const handlePrimaryColorClick = () => {
    setDisplayPrimaryColorPicker(!displayPrimaryColorPicker);
    setDisplaySecondaryColorPicker(false);
  };

  const handleSecondaryColorClick = () => {
    setDisplaySecondaryColorPicker(!displaySecondaryColorPicker);
    setDisplayPrimaryColorPicker(false);
  };

  const handlePrimaryColorClose = () => {
    setDisplayPrimaryColorPicker(false);
  };

  const handleSecondaryColorClose = () => {
    setDisplaySecondaryColorPicker(false);
  };

  const handlePrimaryColorChange = (color: { rgb: { r: string; g: string; b: string; a: string } }) => {
    setPrimaryColor(color.rgb);
  };

  const handleSecondaryColorChange = (color: { rgb: { r: string; g: string; b: string; a: string } }) => {
    setSecondaryColor(color.rgb);
  };

  const handleAddTravelIntent = () => {
    setTravelIntents([...travelIntents, '']);
  };

  const handleRemoveTravelIntent = (index: number) => {
    if (travelIntents.length > 1) {
      setTravelIntents(travelIntents.filter((_, i) => i !== index));
    }
  };

  const handleTravelIntentChange = (index: number, value: string) => {
    const newTravelIntents = [...travelIntents];
    newTravelIntents[index] = value;
    setTravelIntents(newTravelIntents);
  };

  const handleCompleteSetup = () => {
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    onClose();
  };

  const handleAddAnotherEntity = () => {
    setShowSuccessModal(false);
    onClose();
    // This will trigger the parent to open entity setup again
  };

  const handleStartBooking = () => {
    setShowSuccessModal(false);
    onClose();
    // This will close the modal and allow user to start booking
  };

  const handleSaveProgress = () => {
    setShowSaveProgressModal(true);
  };

  const handleCloseSaveProgressModal = () => {
    setShowSaveProgressModal(false);
    onClose();
  };

  const handleAddAnotherEntityFromSave = () => {
    setShowSaveProgressModal(false);
    onClose();
    // Call the parent function to open entity details form
    if (onAddNewEntity) {
      onAddNewEntity();
    }
  };

  const handleShowAllCcEmails = () => {
    setShowAllCcEmails(!showAllCcEmails);
  };

  const handleShowAllBccEmails = () => {
    setShowAllBccEmails(!showAllBccEmails);
  };

  const tool_Use = {
    basic: [
      ['bold', 'italic', 'underline', 'strike', { script: 'sub' }, { script: 'super' }, 'link'],
    ],
    standard: [
      ['bold', 'italic', 'underline', 'strike', { script: 'sub' }, { script: 'super' }, 'link', { align: 'justify' }, { align: 'center' }, { align: '' }, { align: 'right' }],
    ],
    advanced: [
      ['undo', 'redo'],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'image', 'video'],
      ['table'],
      ['blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': ['', 'center', 'right', 'justify'] }],
      ['clean']
    ]
  };

  const airlinesOptions = [
    { id: '1', name: 'Emirates' },
    { id: '2', name: 'Etihad Airways' },
    { id: '3', name: 'Qatar Airways' },
    { id: '4', name: 'Saudia' },
    { id: '5', name: 'Turkish Airlines' },
    { id: '6', name: 'Lufthansa' },
    { id: '7', name: 'British Airways' },
    { id: '8', name: 'Air France' },
    { id: '9', name: 'KLM' },
    { id: '10', name: 'Swiss International Air Lines' }
  ];

  // Add Icon SVG Component
  const AddIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 15H11V11H15V9H11V5H9V9H5V11H9V15ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="#0083FF"/>
    </svg>
  );

  return (
    <Box sx={{ width: { xs: '100vw', md: '70vw' }, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{
        p: '15px 40px',
        borderBottom: '1px solid #E0E0E0',
      }}>
        {/* Top Row - Back and Close Icons */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
          <IconButton onClick={onBack || onClose} size="small">
            <ArrowBackIcon />
          </IconButton>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Title Row - Title and Progress */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: '22px',
              fontWeight: 600,
              color: theme.palette.customColors?.black[1]
            }}
          >
            Additional Settings
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.customColors?.black[1],
              backgroundColor: '#D9EDFF',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '10px',
              fontWeight: 600
            }}
          >
            8/8
          </Typography>
        </Box>
      </Box>

      {/* Form Content */}
      <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>

        {/* Admin Settings Accordion */}
        <Accordion
          expanded={expanded === 'admin'}
          onChange={handleAccordionChange('admin')}
          sx={{
            mb: 2,
            boxShadow: 'none',
            border: '1px solid #EBEBEB',
            borderRadius: '8px !important',
            '&:before': { display: 'none' }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: '#0083FF' }} />}
            sx={{
              backgroundColor: expanded === 'admin' ? '#F8F8F8' : '#FFFFFF',
              borderRadius: '8px',
              margin: 0,
              minHeight: '48px !important',
              '&.Mui-expanded': {
                margin: 0,
                minHeight: '48px !important',                
                borderRadius: '8px 8px 0 0',
                borderBottom: '1px solid #DADADA',
              },
              '& .MuiAccordionSummary-content': {
                margin: '12px 0 !important'
              },
              '& .MuiAccordionSummary-content.Mui-expanded': {
                margin: '12px 0 !important'
              },
              '&:hover': { backgroundColor: '#F0F0F0' }
            }}
          >
            <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>
              Admin Settings
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {/* Accounting code */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Accounting code
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, fontSize: 12, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                      Sets the Accounting Code for this Entity
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "23%" }}>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                      Accounting code
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Enter accounting code"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          height: '36px',
                          '& fieldset': {
                            borderColor: '#D0D0D0',
                            borderWidth: '1px',
                          },
                          '&:hover fieldset': {
                            borderColor: theme.palette.customColors?.blue[22],
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: theme.palette.customColors?.blue[22],
                          },
                        },
                        '& .MuiInputBase-input': {
                          fontSize: '12px',
                          fontWeight: 400,
                          padding: '8px 12px',
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Grid>

              {/* Hide TMC Fee on SRP */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Hide TMC Fee on SRP
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, fontSize: 12, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                      Enabling this will restrict TMC charges from being added on the search results page
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "23%", textAlign: "right" }}>
                    <CustomSwitch sx={{ mr: '-13px' }} />
                  </Box>
                </Box>
              </Grid>

              {/* Payment Gateway Fee to be charged */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Payment Gateway Fee to be charged
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, fontSize: 12, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                      Enabling this will apply the payment gateway for the entity
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "23%", textAlign: "right" }}>
                    <CustomSwitch sx={{ mr: '-13px' }} />
                  </Box>
                </Box>
              </Grid>

              {/* Enable Reserve Option on Checkout */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Enable Reserve Option on Checkout
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, fontSize: 12, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                      Enabling this will make the reserve option available on the checkout page
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "23%", textAlign: "right" }}>
                    <CustomSwitch sx={{ mr: '-13px' }} />
                  </Box>
                </Box>
              </Grid>

              {/* Disable Low Cost Carrier(s) */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Disable Low Cost Carrier(s)
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, fontSize: 12, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                      Enabling this will disable the selected LCCs for this entity
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "23%", textAlign: "right" }}>
                    <CustomSwitch defaultChecked sx={{ mr: '-13px' }} />
                  </Box>
                </Box>
              </Grid>

              {/* Airlines Selection - Conditional */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box></Box>
                  <Box sx={{ flexBasis: "35%" }}>
                    <MultiSelectDropdown
                      label="Airlines"
                      options={airlinesOptions}
                      selectedValues={selectedAirlines}
                      onChange={handleAirlinesChange}
                      placeholder="Search Airlines"
                      width="100%"
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Approval Workflow Settings Accordion */}
        <Accordion
          expanded={expanded === 'approval'}
          onChange={handleAccordionChange('approval')}
          sx={{
            mb: 2,
            boxShadow: 'none',
            border: '1px solid #EBEBEB',
            borderRadius: '8px !important',
            '&:before': { display: 'none' }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: '#0083FF' }} />}
            sx={{
              backgroundColor: expanded === 'approval' ? '#F8F8F8' : '#FFFFFF',
              borderRadius: '8px',
              margin: 0,
              minHeight: '48px !important',
              '&.Mui-expanded': {
                margin: 0,
                minHeight: '48px !important',
                borderRadius: '8px 8px 0 0',
                borderBottom: '1px solid #DADADA',
              },
              '& .MuiAccordionSummary-content': {
                margin: '12px 0 !important'
              },
              '& .MuiAccordionSummary-content.Mui-expanded': {
                margin: '12px 0 !important'
              },
              '&:hover': { backgroundColor: '#F0F0F0' }
            }}
          >
            <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>
              Approval Workflow Settings
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 3 }}>
            <Grid container spacing={3}>
                             {/* Flight Settings Section */}
               <Grid item xs={12}>
                 <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1], mb: 2 }}>
                   Flight Settings
                 </Typography>
               </Grid>

               {/* Enable Approval Response Timeout */}
               <Grid item xs={12}>
                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: "1rem" }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Enable Approval Response Timeout
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, fontSize: 10, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                      Enabling this will set a timeout for every individual approval response
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "23%", textAlign: "right" }}>
                    <CustomSwitch defaultChecked sx={{ mr: '-13px' }} />
                  </Box>
                </Box>
              </Grid>

                             {/* Set Expiration Period for Response */}
               <Grid item xs={12}>
                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: "2rem" }}>
                   <Box>
                     <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                       Set Expiration Period for Response
                     </Typography>
                   </Box>
                   <Box sx={{ flexBasis: "23%", display: 'flex', gap: 1 }}>                   
                     <Box>                       
                       <TextField
                         fullWidth
                         variant="standard"
                         sx={{
                           '& .MuiOutlinedInput-root': {
                             height: '36px',
                             '& fieldset': {
                               borderColor: '#D0D0D0',
                               borderWidth: '1px',
                             },
                             '&:hover fieldset': {
                               borderColor: theme.palette.customColors?.blue[22],
                             },
                             '&.Mui-focused fieldset': {
                               borderColor: theme.palette.customColors?.blue[22],
                             },
                           },
                           '& .MuiInputBase-input': {
                             fontSize: '10px',
                             fontWeight: 400,
                             padding: '8px 12px',
                           },
                         }}
                       />
                     </Box>
                     <Box display="flex" alignItems="flex-end" justifyContent="center">
                    <Typography variant="body2" sx={{fontSize: 10, fontWeight: 500,}}>
                         Days
                       </Typography>
                     </Box>
                     <Box>
                      
                       <TextField
                         fullWidth
                         variant="standard"
                         sx={{
                           '& .MuiOutlinedInput-root': {
                             height: '36px',
                             '& fieldset': {
                               borderColor: '#D0D0D0',
                               borderWidth: '1px',
                             },
                             '&:hover fieldset': {
                               borderColor: theme.palette.customColors?.blue[22],
                             },
                             '&.Mui-focused fieldset': {
                               borderColor: theme.palette.customColors?.blue[22],
                             },
                           },
                           '& .MuiInputBase-input': {
                             fontSize: '10px',
                             fontWeight: 400,
                             padding: '8px 12px',
                           },
                         }}
                       />
                     </Box> 
                     <Box display="flex" alignItems="flex-end" justifyContent="center">
                     <Typography variant="body2" sx={{fontSize: 10, fontWeight: 500,}}>
                         Hrs
        </Typography>
                     </Box>
                     
                   </Box>
                 </Box>
               </Grid>

              {/* Override Response Timeout with Flight Fare Expiration Time */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: "1rem" }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Override Response Timeout with Flight Fare Expiration Time
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, fontSize: 10, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                      Enabling this will override the above set timeout duration with the flight fare expiration time
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "23%", textAlign: "right" }}>
                    <CustomSwitch defaultChecked sx={{ mr: '-13px' }} />
                  </Box>
                </Box>
              </Grid>

              {/* Bypass Approval workflow for slight Flight Fare change */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: "1rem" }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Bypass Approval workflow for slight Flight Fare change
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, fontSize: 10, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                      Enabling this allows bookings without approval when minor fare changes affect policy compliance
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "23%", textAlign: "right" }}>
                    <CustomSwitch defaultChecked sx={{ mr: '-13px' }} />
                  </Box>
                </Box>
              </Grid>

              {/* Amount above the Original Fare */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: "2rem" }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Amount above the Original Fare
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "11.5%" }}>
                  <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, }}>
                    Amount
                  </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="0"
                      InputProps={{
                        endAdornment: <Typography sx={{ fontSize: '10px', color: '#666' }}>$</Typography>,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          height: '36px',
                          '& fieldset': {
                            borderColor: '#D0D0D0',
                            borderWidth: '1px',
                          },
                          '&:hover fieldset': {
                            borderColor: theme.palette.customColors?.blue[22],
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: theme.palette.customColors?.blue[22],
                          },
                        },
                        '& .MuiInputBase-input': {
                            fontSize: '10px',
                        },

                        '& .MuiInput-underline:before': {
                            borderBottom: `1px solid ${theme?.palette?.customColors?.lightBlue[5]}`,
                        },
                      }}

                    className="sm:w-auto rounded-lg"
                    />
                  </Box>
                </Box>
              </Grid>

              {/* Percentage above the Original Fare */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: "2rem" }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Percentage above the Original Fare
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "23%", display: 'flex', gap: 1 }}>
                    <Box>
                  <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, }}>
                    Percentage
                  </Typography>
                 
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="0"
                      InputProps={{
                        endAdornment: <Typography sx={{ fontSize: '10px', color: '#666' }}>%</Typography>,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          height: '36px',
                          '& fieldset': {
                            borderColor: '#D0D0D0',
                            borderWidth: '1px',
                          },
                          '&:hover fieldset': {
                            borderColor: theme.palette.customColors?.blue[22],
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: theme.palette.customColors?.blue[22],
                          },
                        },
                        '& .MuiInputBase-input': {
                          fontSize: '10px',
                          fontWeight: 400,
                          padding: '8px 12px',
                        },
                      }}
                    /> </Box>
                    <Box>
                     <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, }}>
                    Amount (Up to)
                  </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="0"
                      InputProps={{
                        endAdornment: <Typography sx={{ fontSize: '10px', color: '#666' }}>$</Typography>,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          height: '36px',
                          '& fieldset': {
                            borderColor: '#D0D0D0',
                            borderWidth: '1px',
                          },
                          '&:hover fieldset': {
                            borderColor: theme.palette.customColors?.blue[22],
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: theme.palette.customColors?.blue[22],
                          },
                        },
                        '& .MuiInputBase-input': {
                          fontSize: '10px',
                          fontWeight: 400,
                          padding: '8px 12px',
                        },
                      }}  
                    />
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* Mandatory Reason required for Out-of-Policy Trips */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: "1rem" }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Mandatory Reason required for Out-of-Policy Trips
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, fontSize: 10, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                      Enabling this will require a reason to be provided on the review page while making an out-of-policy booking
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "23%", textAlign: "right" }}>
                    <CustomSwitch defaultChecked sx={{ mr: '-13px' }} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

                 {/* Travel Policy Settings Accordion */}
         <Accordion
           expanded={expanded === 'travel-policy'}
           onChange={handleAccordionChange('travel-policy')}
           sx={{
             mb: 2,
             boxShadow: 'none',
             border: '1px solid #EBEBEB',
             borderRadius: '8px !important',
             '&:before': { display: 'none' }
           }}
         >
           <AccordionSummary
             expandIcon={<ExpandMoreIcon sx={{ color: '#0083FF' }} />}
             sx={{
               backgroundColor: expanded === 'travel-policy' ? '#F8F8F8' : '#FFFFFF',
               borderRadius: '8px',
               margin: 0,
               minHeight: '48px !important',
               '&.Mui-expanded': {
                 margin: 0,
                 minHeight: '48px !important',
                 borderRadius: '8px 8px 0 0',
                 borderBottom: '1px solid #DADADA', 
               },
               '& .MuiAccordionSummary-content': {
                 margin: '12px 0 !important'
               },
               '& .MuiAccordionSummary-content.Mui-expanded': {
                 margin: '12px 0 !important'
               },
               '&:hover': { backgroundColor: '#F0F0F0' }
             }}
           >
             <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>
               Travel Policy Settings
             </Typography>
           </AccordionSummary>
           <AccordionDetails sx={{ p: 3 }}>
             <Grid container spacing={3}>
                               {/* Travel Intent Mandatory for Booking */}
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{flexBasis: '60%'}}>
                      <Typography variant="body2" sx={{ mb: '5px', fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                        Travel Intent Mandatory for Booking
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2, fontSize: 12, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                        Enabling this will require selecting a travel intent from the custom intents created here at the time of booking
                      </Typography>
                    </Box>
                    <Box sx={{ flexBasis: "23%", textAlign: "right" }}>
                      <CustomSwitch 
                        checked={travelIntentMandatory}
                        onChange={(e) => setTravelIntentMandatory(e.target.checked)}
                        sx={{ mr: '-8px' }} 
                      />
                    </Box>
                  </Box>
                </Grid>

                {/* Travel Intent Input Fields */}
                {travelIntents.map((intent, index) => (
                  <Grid item xs={12} key={`travel-intent-${intent}`}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 1 }}>
                      <Box sx={{ flexBasis: "23%" }}>
                        <TextField
                          fullWidth
                          variant="outlined"
                          placeholder="Enter travel intent"
                          value={intent}
                          onChange={(e) => handleTravelIntentChange(index, e.target.value)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              height: '36px',
                              '& fieldset': {
                                borderColor: '#D0D0D0',
                                borderWidth: '1px',
                              },
                              '&:hover fieldset': {
                                borderColor: theme.palette.customColors?.blue[22],
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: theme.palette.customColors?.blue[22],
                              },
                            },
                            '& .MuiInputBase-input': {
                              fontSize: '12px',
                              fontWeight: 400,
                              padding: '8px 12px',
                            },
                          }}
                        />
                      </Box>
                                             {index !== travelIntents.length - 1  && (
                         <IconButton
                           onClick={() => handleRemoveTravelIntent(index)}
                           sx={{
                             width: '36px',
                             height: '36px',
                             backgroundColor: 'transparent',
                             color: '#666',
                             '&:hover': {
                               backgroundColor: '#f5f5f5',
                             }
                           }}
                         >
                           <CloseIcon sx={{ fontSize: '20px' }} />
                         </IconButton>
                       )}
                       {index === travelIntents.length - 1 && (
                         <IconButton
                           onClick={handleAddTravelIntent}
                           sx={{
                             width: '36px',
                             height: '36px',
                             backgroundColor: 'transparent',
                             color: theme.palette.customColors?.blue[22],
                             '&:hover': {
                               backgroundColor: '#f5f5f5',
                             }
                           }}
                         >
                           <AddIcon />
                         </IconButton>
                       )}
                    </Box>
                  </Grid>
                ))}
             </Grid>
           </AccordionDetails>
         </Accordion>

        {/* Communication Settings Accordion */}
        <Accordion
          expanded={expanded === 'communication'}
          onChange={handleAccordionChange('communication')}
          sx={{
            mb: 2,
            boxShadow: 'none',
            border: '1px solid #EBEBEB',
            borderRadius: '8px !important',
            '&:before': { display: 'none' }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: '#0083FF' }} />}
            sx={{
              backgroundColor: expanded === 'communication' ? '#F8F8F8' : '#FFFFFF',
              borderRadius: '8px',
              margin: 0,
              minHeight: '48px !important',
              '&.Mui-expanded': {
                margin: 0,
                minHeight: '48px !important',
                borderRadius: '8px 8px 0 0',
                borderBottom: '1px solid #DADADA',
              },
              '& .MuiAccordionSummary-content': {
                margin: '12px 0 !important'
              },
              '& .MuiAccordionSummary-content.Mui-expanded': {
                margin: '12px 0 !important'
              },
              '&:hover': { backgroundColor: '#F0F0F0' }
            }}
          >
            <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>
              Communication
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 3 }}>
            <Grid container spacing={3}>
               {/* Email Settings Section */}
               <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1], }}>
                Whats app Notifications
                </Typography>
              </Grid>
              {/* WhatsApp Notifications Section */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: "1rem"   }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Enable Approval Request Notifications on Whatsapp
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "23%", textAlign: "right" }}>
                    <CustomSwitch 
                      checked={whatsappNotificationsEnabled}
                      onChange={(e) => setWhatsappNotificationsEnabled(e.target.checked)}
                      sx={{ mr: '-13px' }} 
                    />
                  </Box>
                </Box>
              </Grid>

              {/* Email Settings Section */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1], }}>
                  Email Settings
                </Typography>
              </Grid>

              {/* Change Sender's Address for all mails */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml:'1rem' }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Change Sender's Address for all mails
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "23%", textAlign: "right", display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
                    <CustomSwitch 
                      checked={changeSenderAddressEnabled}
                      onChange={(e) => setChangeSenderAddressEnabled(e.target.checked)}
                      sx={{ mr: '-13px' }} 
                    />
                  </Box>
                </Box>
                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexWrap: 'wrap', gap: 1, justifyContent: 'flex-end' }}>
                <Chip
                      label={senderEmailAddress}
                      sx={{
                        backgroundColor: '#FFF7E0',
                        fontSize: '10px',
                        fontWeight: 400,
                        height: '24px',
                        border: '1px solid #FFBF00',
                        '& .MuiChip-label': {
                          px: 1,
                        }
                      }}
                    />
                  </Box>
              </Grid>

              {/* Configure CC Email addresses for all travelers mails */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', ml:'1rem' }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Configure CC Email addresses for all travelers mails
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "23%", textAlign: "right" }}>
                    <CustomSwitch 
                      checked={ccEmailEnabled}
                      onChange={(e) => setCcEmailEnabled(e.target.checked)}
                      sx={{ mr: '-13px' }} 
                    />
                  </Box>
                </Box>
                {ccEmailEnabled && (
                  <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexWrap: 'wrap', gap: 1, justifyContent: 'flex-end' }}>
                    {(showAllCcEmails ? ccEmailAddresses : ccEmailAddresses.slice(0, 4)).map((email, index) => (
                      <Chip
                        key={index}
                        label={email}
                        sx={{
                          backgroundColor: '#FFF7E0',
                          fontSize: '10px',
                          fontWeight: 400,
                          height: '24px',
                          border: '1px solid #FFBF00',
                          '& .MuiChip-label': {
                            px: 1,
                          }
                        }}
                      />
                    ))}
                    {!showAllCcEmails && ccEmailAddresses.length > 4 && (
                      <Typography
                        variant="body2"
                        onClick={handleShowAllCcEmails}
                        sx={{
                          fontSize: '10px',
                          fontWeight: 400,
                          color: theme.palette.customColors?.blue[22],
                          cursor: 'pointer',
                          alignSelf: 'flex-end',
                          ml: 1
                        }}
                      >
                        +{ccEmailAddresses.length - 4} more
                      </Typography>
                    )}
                    {showAllCcEmails && (
                      <Typography
                        variant="body2"
                        onClick={handleShowAllCcEmails}
                        sx={{
                          fontSize: '12px',
                          fontWeight: 400,
                          color: theme.palette.customColors?.blue[22],
                          cursor: 'pointer',
                          alignSelf: 'flex-end',
                          ml: 1
                        }}
                      >
                        Show less
                      </Typography>
                    )}
                  </Box>
                )}
              </Grid>

              {/* Configure BCC Email addresses for all travellers mails */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', ml:'1rem' }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Configure BCC Email addresses for all travellers mails
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "23%", textAlign: "right" }}>
                    <CustomSwitch 
                      checked={bccEmailEnabled}
                      onChange={(e) => setBccEmailEnabled(e.target.checked)}
                      sx={{ mr: '-13px' }} 
                    />
                  </Box>
                </Box>
                {bccEmailEnabled && (
                  <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexWrap: 'wrap', gap: 1, justifyContent: 'flex-end' }}>
                    {(showAllBccEmails ? bccEmailAddresses : bccEmailAddresses.slice(0, 4)).map((email, index) => (
                      <Chip
                        key={index}
                        label={email}
                        sx={{
                          backgroundColor: '#FFF7E0',
                          fontSize: '10px',
                          fontWeight: 400,
                          height: '24px',
                          border: '1px solid #FFBF00',
                          '& .MuiChip-label': {
                            px: 1,
                          }
                        }}
                      />
                    ))}
                    {!showAllBccEmails && bccEmailAddresses.length > 4 && (
                      <Typography
                        variant="body2"
                        onClick={handleShowAllBccEmails}
                        sx={{
                          fontSize: '10px',
                          fontWeight: 400,
                          color: theme.palette.customColors?.blue[22],
                          cursor: 'pointer',
                          alignSelf: 'flex-end',
                          ml: 1
                        }}
                      >
                        +{bccEmailAddresses.length - 4} more
                      </Typography>
                    )}
                    {showAllBccEmails && (
                      <Typography
                        variant="body2"
                        onClick={handleShowAllBccEmails}
                        sx={{
                          fontSize: '12px',
                          fontWeight: 400,
                          color: theme.palette.customColors?.blue[22],
                          cursor: 'pointer',
                          alignSelf: 'flex-end',
                          ml: 1
                        }}
                      >
                        Show less
                      </Typography>
                    )}
                  </Box>
                )}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Flight Settings Accordion - Placeholder */}
        <Accordion
          expanded={expanded === 'flight'}
          onChange={handleAccordionChange('flight')}
          sx={{
            mb: 2,
            boxShadow: 'none',
            border: '1px solid #EBEBEB',
            borderRadius: '8px !important',
            '&:before': { display: 'none' }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: '#0083FF' }} />}
            sx={{
              backgroundColor: expanded === 'flight' ? '#F8F8F8' : '#FFFFFF',
              borderRadius: '8px',
              margin: 0,
              minHeight: '48px !important',
              '&.Mui-expanded': {
                margin: 0,
                minHeight: '48px !important',
                borderRadius: '8px 8px 0 0',
                borderBottom: '1px solid #DADADA',
              },
              '& .MuiAccordionSummary-content': {
                margin: '12px 0 !important'
              },
              '& .MuiAccordionSummary-content.Mui-expanded': {
                margin: '12px 0 !important'
              },
              '&:hover': { backgroundColor: '#F0F0F0' }
            }}
          >
            <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>
              Flight Settings
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {/* Fare Control Section */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                  Fare Control
                </Typography>
              </Grid>

              {/* Show only Corporate Fares for Amadeus */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: "1rem" }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Show only Corporate Fares for Amadeus
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, fontSize: 10, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                      Enabling this will show only Corporate Fares on Amadeus
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "23%", textAlign: "right" }}>
                    <CustomSwitch defaultChecked sx={{ mr: '-13px' }} />
                  </Box>
                </Box>
              </Grid>

              {/* Add Corporate Unifare Code (GDS) */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: "1rem" }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Add Corporate Unifare Code (GDS)
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, fontSize: 10, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                      Corporate Unifare Code for GDS can be added
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "23%" }}>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                      Corporate Unifare Code
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Enter corporate unifare code"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          height: '36px',
                          '& fieldset': {
                            borderColor: '#D0D0D0',
                            borderWidth: '1px',
                          },
                          '&:hover fieldset': {
                            borderColor: theme.palette.customColors?.blue[22],
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: theme.palette.customColors?.blue[22],
                          },
                        },
                        '& .MuiInputBase-input': {
                          fontSize: '12px',
                          fontWeight: 400,
                          padding: '8px 12px',
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Grid>

              {/* Add Corporate Deal Codes (Airline based) */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', ml: "1rem" }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Add Corporate Deal Codes (Airline based)
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, fontSize: 10, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                      Airline based Corporate Deal Codes can be added
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "35%" }}>
                    <MultiSelectDropdown
                      label="Airlines"
                      options={airlinesOptions}
                      selectedValues={selectedAirlines}
                      onChange={handleAirlinesChange}
                      placeholder="Search Airlines"
                      width="100%"
                    />
                  </Box>
                </Box>
              </Grid>

              {/* Search Configurations Section */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2, fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                  Search Configurations
                </Typography>
              </Grid>

              {/* Configure Airline exclusions in Search */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', ml: "1rem" }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Configure Airline exclusions in Search
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, fontSize: 10, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                      Airlines to be excluded from the search can be added
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "35%" }}>
                    <MultiSelectDropdown
                      label="Airlines"
                      options={airlinesOptions}
                      selectedValues={selectedAirlines}
                      onChange={handleAirlinesChange}
                      placeholder="Search Airlines"
                      width="100%"
                    />
                  </Box>
                </Box>
              </Grid>

              {/* Disable Nearby Airports option in Search */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: "1rem" }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Disable Nearby Airports option in Search
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, fontSize: 10, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                      Airlines to be excluded from the search can be added
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "23%", textAlign: "right" }}>
                    <CustomSwitch sx={{ mr: '-13px' }} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

       

        {/* Security Settings Accordion */}
                    <Accordion
                      expanded={expanded === 'security'}
                      onChange={handleAccordionChange('security')}
                      sx={{
                        mb: 2,
                        boxShadow: 'none',
                        border: '1px solid #EBEBEB',
                        borderRadius: '8px !important',
                        '&:before': { display: 'none' }
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: '#0083FF' }} />}
                        sx={{
                          backgroundColor: expanded === 'security' ? '#F8F8F8' : '#FFFFFF',
                          borderRadius: '8px',
                          margin: 0,
                          minHeight: '48px !important',
                          '&.Mui-expanded': {
                            margin: 0,
                            minHeight: '48px !important',
                            borderRadius: '8px 8px 0 0',
                            borderBottom: '1px solid #DADADA',
                          },
                          '& .MuiAccordionSummary-content': {
                            margin: '12px 0 !important'
                          },
                          '& .MuiAccordionSummary-content.Mui-expanded': {
                            margin: '12px 0 !important'
                          },
                          '&:hover': { backgroundColor: '#F0F0F0' }
                        }}
                      >
                        <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>
                          Security Settings
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ p: 3 }}>
                        <Grid container spacing={3}>
                          {/* Set Preferred Login/Signup Flow */}
                          <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Box>
                                <Typography variant="body2" sx={{ mb: '5px', fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                                  Set Preferred Login/Signup Flow
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 2, fontSize: 12, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                                  Configures the default login and signup process for your entity
                                </Typography>
                              </Box>
                              <Box sx={{ flexBasis: "30%" }}>
                                <FormControl fullWidth>
                                  <Select
                                    value={loginMethod}
                                    onChange={handleLoginMethodChange}
                                    sx={{
                                      height: '36px',
                                      '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#D0D0D0',
                                        borderWidth: '1px',
                                      },
                                      '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: theme.palette.customColors?.blue[22],
                                      },
                                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: theme.palette.customColors?.blue[22],
                                      },
                                      '& .MuiSelect-select': {
                                        height: '36px',
                                        padding: '8px 12px',
                                        fontSize: '12px',
                                        fontWeight: 400,
                                        display: 'flex',
                                        alignItems: 'center',
                                      },
                                    }}
                                  >
                                    <MenuItem value="username_password" sx={{ fontSize: '12px', fontWeight: 400 }}>Username/Password based Login</MenuItem>
                                    <MenuItem value="saml" sx={{ fontSize: '12px', fontWeight: 400 }}>SAML based Login</MenuItem>
                                    <MenuItem value="sso" sx={{ fontSize: '12px', fontWeight: 400 }}>Single Sign-On(SSO)</MenuItem>
                                  </Select>
                                </FormControl>
                              </Box>
                            </Box>
                          </Grid>

                          {/* Conditional Fields based on Login Method */}
                          {loginMethod === 'username_password' && (
                            <Grid item xs={12}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: "1rem" }}>
                                <Box sx={{flexBasis: '35%'}}>
                                  <Typography variant="body2" sx={{ mb: 1, fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                                    Use OTP-based Multi-Factor Authentication for login security
                                  </Typography>
                                </Box>
                                <Box sx={{ flexBasis: "23%", textAlign: "right" }}>
                                  <CustomSwitch defaultChecked sx={{ mr: '-13px' }} />
                                </Box>
                              </Box>
                            </Grid>
                          )}

                          {loginMethod === 'sso' && (
                            <Grid item xs={12}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: "1rem" }}>
                                <Box>
                                  <Typography variant="body2" sx={{ mb: 1, fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                                    Supported SSO Types
                                  </Typography>
                                </Box>
                                <Box sx={{ flexBasis: "23%" }}>
                                  <FormControl fullWidth>
                                    <Select
                                      defaultValue=""
                                      sx={{
                                        height: '36px',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                          borderColor: '#D0D0D0',
                                          borderWidth: '1px',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                          borderColor: theme.palette.customColors?.blue[22],
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                          borderColor: theme.palette.customColors?.blue[22],
                                        },
                                        '& .MuiSelect-select': {
                                          height: '36px',
                                          padding: '8px 12px',
                                          fontSize: '12px',
                                          fontWeight: 400,
                                          display: 'flex',
                                          alignItems: 'center',
                                        },
                                      }}
                                    >
                                      <MenuItem value="google" sx={{ fontSize: '12px', fontWeight: 400 }}>Google</MenuItem>
                                      <MenuItem value="azure" sx={{ fontSize: '12px', fontWeight: 400 }}>Azure AD</MenuItem>
                                      <MenuItem value="okta" sx={{ fontSize: '12px', fontWeight: 400 }}>Okta</MenuItem>
                                      <MenuItem value="onelogin" sx={{ fontSize: '12px', fontWeight: 400 }}>OneLogin</MenuItem>
                                      <MenuItem value="ping" sx={{ fontSize: '12px', fontWeight: 400 }}>Ping Identity</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Box>
                              </Box>
                            </Grid>
                          )}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>

                 {/* Third-Party Add-Ons Accordion */}
         <Accordion
           expanded={expanded === 'third-party'}
           onChange={handleAccordionChange('third-party')}
           sx={{
             mb: 2,
             boxShadow: 'none',
             border: '1px solid #EBEBEB',
             borderRadius: '8px !important',
             '&:before': { display: 'none' }
           }}
         >
           <AccordionSummary
             expandIcon={<ExpandMoreIcon sx={{ color: '#0083FF' }} />}
             sx={{
               backgroundColor: expanded === 'third-party' ? '#F8F8F8' : '#FFFFFF',
               borderRadius: '8px',
               margin: 0,
               minHeight: '48px !important',
               '&.Mui-expanded': {
                margin: 0,
                minHeight: '48px !important',
                borderRadius: '8px 8px 0 0',
                borderBottom: '1px solid #DADADA',
               },
               '& .MuiAccordionSummary-content': {
                 margin: '12px 0 !important'
               },
               '& .MuiAccordionSummary-content.Mui-expanded': {
                 margin: '12px 0 !important'
               },
               '&:hover': { backgroundColor: '#F0F0F0' }
             }}            
           >
             <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>
               Third-Party Add-Ons
             </Typography>
           </AccordionSummary>
           <AccordionDetails sx={{ p: 3 }}>
             <Grid container spacing={3}>
               {/* Google Analytics Section */}
               <Grid item xs={12}>
                 <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1], mb: 2 }}>
                   Google Analytics
                 </Typography>
               </Grid>
               
               {/* GA Tracking Code */}
               <Grid item xs={12} sx={{pt:'10px !important'}}>
                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: "1rem" }}>
                   <Box>
                     <Typography variant="body2" sx={{ mb: '5px', fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                       GA Tracking Code
                     </Typography>
                   </Box>
                   <Box sx={{ flexBasis: "23%" }}>
                     <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                       Enter Code
                     </Typography>
                     <TextField
                       fullWidth
                       variant="outlined"
                       placeholder="Enter GA tracking code"
                       sx={{
                         '& .MuiOutlinedInput-root': {
                           height: '36px',
                           '& fieldset': {
                             borderColor: '#D0D0D0',
                             borderWidth: '1px',
                           },
                           '&:hover fieldset': {
                             borderColor: theme.palette.customColors?.blue[22],
                           },
                           '&.Mui-focused fieldset': {
                             borderColor: theme.palette.customColors?.blue[22],
                           },
                         },
                         '& .MuiInputBase-input': {
                           fontSize: '12px',
                           fontWeight: 400,
                           padding: '8px 12px',
                         },
                       }}
                     />
                   </Box>
                 </Box>
               </Grid>

               {/* Ancillaries Section */}
               <Grid item xs={12} sx={{pt:'10px !important'}}>
                 <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1], mb: 2, mt: 3 }}>
                   Ancillaries
                 </Typography>
               </Grid>
               
               {/* TripAdd Bundle ID */}
               <Grid item xs={12} sx={{pt:'10px !important'}}>
                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: "1rem" }}>
                   <Box>
                     <Typography variant="body2" sx={{ mb: '5px', fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                       TripAdd Bundle ID
                     </Typography>
                   </Box>
                   <Box sx={{ flexBasis: "23%" }}>
                     <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                       Enter IDs (CSV Format)
                     </Typography>
                     <TextField
                       fullWidth
                       variant="outlined"
                       placeholder="Enter bundle IDs separated by commas"
                       sx={{
                         '& .MuiOutlinedInput-root': {
                           height: '36px',
                           '& fieldset': {
                             borderColor: '#D0D0D0',
                             borderWidth: '1px',
                           },
                           '&:hover fieldset': {
                             borderColor: theme.palette.customColors?.blue[22],
                           },
                           '&.Mui-focused fieldset': {
                             borderColor: theme.palette.customColors?.blue[22],
                           },
                         },
                         '& .MuiInputBase-input': {
                           fontSize: '12px',
                           fontWeight: 400,
                           padding: '8px 12px',
                         },
                       }}
                     />
                   </Box>
                 </Box>
               </Grid>
             </Grid>
           </AccordionDetails>
         </Accordion>

      </Box>

      {/* Footer Actions */}
      <Box sx={{
        p: '15px 40px',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 2
      }}>
        <Button
          variant="outlined"
          onClick={handleSaveProgress}
          sx={{
            fontSize: '14px',
            textTransform: 'none',
            borderColor: theme.palette.customColors?.blue[22],
            color: theme.palette.customColors?.blue[22],
            '&:hover': {
              borderColor: theme.palette.customColors?.blue[22],
              backgroundColor: theme.palette.customColors?.blue[24],
            }
          }}
        >
          Save Progress
        </Button>
        <Button
          variant="contained"
          onClick={handleCompleteSetup}
          sx={{
            fontSize: '14px',
            textTransform: 'none',
            backgroundColor: theme.palette.customColors?.blue[22],
            '&:hover': {
              backgroundColor: theme.palette.customColors?.blue[22],
            }
          }}
        >
          Complete Setup
        </Button>
      </Box>

      {/* Success Modal */}
      <CustomModal
        open={showSuccessModal}
        onClose={handleCloseSuccessModal}
        width="600px"
        showCloseButton={true}
        closeOnOverlayClick={true}
      >
        <Box sx={{ textAlign: 'center', pt: '18px', pb: '8px' }}>
          {/* Entity Icon */}
          <Box sx={{ mb: '1rem' }}>
            <OrganizationSetupCompleteIcon sx={{ width: 34, height: 30 }} />
          </Box>

          {/* Heading */}
          <Typography
            variant="h5"
            sx={{
              fontSize: '18px',
              fontWeight: 500,
              color: '#000000',
              mb: 2,
            }}
          >
            Great! Your Entity Setup is complete
            <br />
            You're now ready to start booking
          </Typography>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="text"
              onClick={handleAddAnotherEntity}
              sx={{
                fontSize: '16px',
                textTransform: 'none',
                color: '#666666',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#333333',
                }
              }}
            >
              Add Another Entity
            </Button>
            <Button
              variant="text"
              onClick={handleStartBooking}
              sx={{
                fontSize: '16px',
                textTransform: 'none',
                color: '#0083FF',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#0066CC',
                }
              }}
            >
              Start Booking
            </Button>
          </Box>
        </Box>
      </CustomModal>

      {/* Save Progress Modal */}
      <CustomModal
        open={showSaveProgressModal}
        onClose={handleCloseSaveProgressModal}
        width="600px"
        showCloseButton={true}
        closeOnOverlayClick={true}
      >
        <Box sx={{ textAlign: 'center', pt: '18px', pb: '8px' }}>
          {/* Success Icon */}
          <Box sx={{ mb: '1rem', display: 'flex', justifyContent: 'center' }}>
            <svg width="38" height="30" viewBox="0 0 38 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.2077 18.4167L26.666 9L24.291 6.625L17.2077 13.7083L13.666 10.1667L11.3327 12.5L17.2077 18.4167ZM0.666016 30V26.6667H37.3327V30H0.666016ZM5.66602 25C4.74935 25 3.96463 24.6736 3.31185 24.0208C2.65907 23.3681 2.33268 22.5833 2.33268 21.6667V3.33333C2.33268 2.41667 2.65907 1.63194 3.31185 0.979167C3.96463 0.326389 4.74935 0 5.66602 0H32.3327C33.2494 0 34.0341 0.326389 34.6869 0.979167C35.3396 1.63194 35.666 2.41667 35.666 3.33333V21.6667C35.666 22.5833 35.3396 23.3681 34.6869 24.0208C34.0341 24.6736 33.2494 25 32.3327 25H5.66602ZM5.66602 21.6667H32.3327V3.33333H5.66602V21.6667Z" fill="#0087FA"/>
            </svg>
          </Box>

          {/* Heading */}
          <Typography
            variant="h5"
            sx={{
              fontSize: '18px',
              fontWeight: 500,
              color: '#000000',
              mb: 2,
            }}
          >
            Your Progress has been saved
          </Typography>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="text"
              onClick={handleCloseSaveProgressModal}
              sx={{
                fontSize: '16px',
                textTransform: 'none',
                color: '#666666',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#333333',
                }
              }}
            >
              Close
            </Button>
            <Button
              variant="text"
              onClick={handleAddAnotherEntityFromSave}
              sx={{
                fontSize: '16px',
                textTransform: 'none',
                color: '#0083FF',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#0066CC',
                }
              }}
            >
              Add Another Entity
            </Button>
          </Box>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default AdditionalSettingsForm; 
import { ArrowBack as ArrowBackIcon, Close as CloseIcon, Close as CloseIconSmall, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import CheckboxCheckedIcon from '../../../assets/icons/CheckboxCheckedIcon';
import CheckboxUncheckedIcon from '../../../assets/icons/CheckboxUncheckedIcon';
import FileUploadIcon from '../../../assets/icons/FileUploadIcon';
import OrganizationSetupCompleteIcon from '../../../assets/icons/OrganizationSetupCompleteIcon';
import CustomModal from '../../../components/core-module/custom-modal/CustomModal';
import CustomSwitch from '../../../components/core-module/custom-switch/CustomSwitch';
import EditorComponent from '../../../components/core-module/editor/editorComponent';
import MultiSelectDropdown from '../../../components/core-module/multi-select-dropdown/MultiSelectDropdown';
import { theme } from '../../../theme';

interface AdditionalSettingsFormProps {
  onClose: () => void;
  onBack?: () => void;
}

const AdditionalSettingsForm: React.FC<AdditionalSettingsFormProps> = ({
  onClose,
  onBack,
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSaveProgressModal, setShowSaveProgressModal] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState<string>('');

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleLoginMethodChange = (event: SelectChangeEvent<string>) => {
    setLoginMethod(event.target.value);
  };

  const handleAirlinesChange = (airlines: { id: string, name: string }[]) => {
    setSelectedAirlines(airlines);
  };

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

  const handleCompleteSetup = () => {
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    onClose();
  };

  const [showMarketSelectionInSuccess, setShowMarketSelectionInSuccess] = useState(false);
  const [showMarketSelectionInSave, setShowMarketSelectionInSave] = useState(false);

  const handleAddNewEntity = () => {
    setShowMarketSelectionInSuccess(true);
  };

  const handleSaveProgress = () => {
    setShowSaveProgressModal(true);
  };

  const handleCloseSaveProgressModal = () => {
    setShowSaveProgressModal(false);
    setShowMarketSelectionInSave(false);
  };

  const handleAddNewEntityFromSave = () => {
    setShowMarketSelectionInSave(true);
  };

  const handleMarketSelect = (market: string) => {
    setSelectedMarket(market);
    setShowMarketSelectionInSuccess(false);
    setShowMarketSelectionInSave(false);
    onClose();
    // Here you can add logic to navigate to entity setup with the selected market
  };

  const handleAddNewMarket = () => {
    setShowMarketSelectionInSuccess(false);
    setShowMarketSelectionInSave(false);
    onClose();
    // Here you can add logic to navigate to market creation
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
            5/5
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
                      Sets the Accounting Code for this Organization
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
                      Enabling this will apply the payment gateway for the organization
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
                      Enabling this will disable the selected LCCs for this organization
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

        {/* White-Label Settings Accordion */}
        <Accordion
          expanded={expanded === 'whitelabel'}
          onChange={handleAccordionChange('whitelabel')}
          sx={{
            mb: 2,
            boxShadow: 'none',
            border: '1px solid #EBEBEB',
            borderRadius: '8px',
            '&:before': { display: 'none' }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: '#0083FF' }} />}
            sx={{
              backgroundColor: expanded === 'whitelabel' ? '#F8F8F8' : '#FFFFFF',
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
              White-Label Settings
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {/* Organization Logo */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Organization Logo
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, fontSize: 12, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                      Sets the Logo for your Organization
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "35%" }}>

                    {/* Tab Switch */}
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Box
                        onClick={() => setLogoUploadTab('upload')}
                        sx={{
                          flex: 1,
                          py: 1,
                          px: 2,
                          textAlign: 'center',
                          cursor: 'pointer',
                          backgroundColor: logoUploadTab === 'upload' ? '#D9EDFF' : '#EBEBEB',
                          color: logoUploadTab === 'upload' ? theme.palette.customColors?.black[1] : theme.palette.customColors?.grey[8],
                          borderTopLeftRadius: '4px',
                          borderBottomLeftRadius: '4px',
                          border: '1px solid #BFCBD9',
                          fontSize: '12px',
                          fontWeight: 400,
                          '&:hover': {
                            backgroundColor: logoUploadTab === 'upload' ? '#D9EDFF' : '#E0E0E0',
                          }
                        }}
                      >
                        Upload Image
                      </Box>
                      <Box
                        onClick={() => setLogoUploadTab('url')}
                        sx={{
                          flex: 1,
                          py: 1,
                          px: 2,
                          textAlign: 'center',
                          cursor: 'pointer',
                          backgroundColor: logoUploadTab === 'url' ? '#D9EDFF' : '#EBEBEB',
                          color: logoUploadTab === 'url' ? theme.palette.customColors?.black[1] : theme.palette.customColors?.grey[8],
                          borderTopRightRadius: '4px',
                          borderBottomRightRadius: '4px',
                          border: '1px solid #BFCBD9',
                          borderLeft: 'none',
                          fontSize: '12px',
                          fontWeight: 400,
                          '&:hover': {
                            backgroundColor: logoUploadTab === 'url' ? '#D9EDFF' : '#E0E0E0',
                          }
                        }}
                      >
                        Enter URL
                      </Box>
                    </Box>

                    {/* Upload Image Tab Content */}
                    {logoUploadTab === 'upload' && (
                      <Box>
                        {/* Selected Files Display */}
                        {uploadedLogoFiles.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            {uploadedLogoFiles.map((file, index) => (
                              <Box
                                key={file.name}
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  mb: 1,
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontSize: '12px',
                                    fontWeight: 400,
                                    color: theme.palette.customColors?.black[1],
                                    flex: 1,
                                    mr: 1
                                  }}
                                >
                                  {file.name}
                                </Typography>
                                <IconButton
                                  size="small"
                                  onClick={() => handleRemoveLogoFile(index)}
                                  sx={{
                                    p: 0.5,
                                  }}
                                >
                                  <CloseIconSmall sx={{ fontSize: 16, color: '#666' }} />
                                </IconButton>
                              </Box>
                            ))}
                          </Box>
                        )}

                        {/* Upload Progress */}
                        {isLogoUploading && uploadingLogoFile && (
                          <Box sx={{ mb: 2 }}>
                            {/* File Uploading Label */}
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: '8px',
                                color: '#999999',
                                mb: 1,
                                fontWeight: 400
                              }}
                            >
                              File Uploading
                            </Typography>

                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                mb: 1,
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: '12px',
                                  fontWeight: 400,
                                  color: theme.palette.customColors?.black[1],
                                  flex: 1,
                                  mr: 1
                                }}
                              >
                                {uploadingLogoFile.name}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() => {
                                  setIsLogoUploading(false);
                                  setUploadingLogoFile(null);
                                  setLogoUploadProgress(0);
                                }}
                                sx={{
                                  p: 0.5,
                                }}
                              >
                                <CloseIconSmall sx={{ fontSize: 16, color: '#666' }} />
                              </IconButton>
                            </Box>
                            <Box
                              sx={{
                                width: '100%',
                                height: '4px',
                                backgroundColor: '#E0E0E0',
                                borderRadius: '2px',
                                overflow: 'hidden'
                              }}
                            >
                              <Box
                                sx={{
                                  width: `${logoUploadProgress}%`,
                                  height: '100%',
                                  backgroundColor: '#FFD700', 
                                  transition: 'width 0.2s ease',
                                  borderRadius: '2px'
                                }}
                              />
                            </Box>
                          </Box>
                        )}

                        {/* File Upload Area */}
                        <Box
                          onClick={handleLogoClick}
                          onDragOver={handleLogoDragOver}
                          onDragLeave={handleLogoDragLeave}
                          onDrop={handleLogoDrop}
                          sx={{
                            border: isLogoDragOver ? '2px solid' : '1px solid',
                            borderColor: isLogoDragOver ? theme.palette.customColors?.blue[22] : '#D0D0D0',
                            borderRadius: '4px',
                            backgroundColor: isLogoDragOver ? theme.palette.customColors?.blue[24] : '#FFFFFF',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 12px',
                            height: '36px',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              borderColor: theme.palette.customColors?.blue[22],
                            },
                            '&:focus-within': {
                              borderColor: theme.palette.customColors?.blue[22],
                              borderWidth: '2px',
                            }
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#999999',
                              fontSize: '11px',
                              fontWeight: 400,
                              flex: 1
                            }}
                          >
                            Drop items here or Browse Files
                          </Typography>
                          <FileUploadIcon sx={{ fontSize: 16 }} />
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: '8px',
                            fontWeight: 400,
                            textAlign: 'right',
                            mt: '4px',
                            ml: '4px'
                          }}
                        >
                          File Supported: SVG/PNG/JPG, up to 5 MB
                        </Typography>
                        {/* Hidden file input */}
                        <input
                          ref={logoFileInputRef}
                          type="file"
                          multiple
                          accept=".svg,.png,.jpg,.jpeg"
                          onChange={handleLogoFileInputChange}
                          style={{ display: 'none' }}
                        />
                      </Box>
                    )}

                    {/* Enter URL Tab Content */}
                    {logoUploadTab === 'url' && (
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter logo URL"
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
                    )}
                  </Box>
                </Box>
              </Grid>

              {/* Domain Name */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Domain Name
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, fontSize: 12, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                      Sets the domain name for your Organization
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "35%" }}>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                      Domain Name
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                      <TextField
                        fullWidth
                        variant="outlined"
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
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '12px',
                          fontWeight: 400,
                          color: theme.palette.customColors?.blue[22],
                          cursor: 'pointer',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        Verify
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* Theme */}
              <Grid item xs={12} sx={{ mb: '1rem' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Theme
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, fontSize: 12, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                      Sets the theme for your Organization
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "50%" }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      {/* Theme 1 - Light Blue */}
                      <Box sx={{
                        width: '120px',
                        height: '80px',
                        border: '2px solid #D0D0D0',
                        borderRadius: '8px',
                        p: 1,
                        backgroundColor: '#F8FBFF',
                        cursor: 'pointer',
                        '&:hover': {
                          borderColor: theme.palette.customColors?.blue[22],
                        }
                      }}>
                        <Box sx={{ height: '8px', backgroundColor: '#4A90E2', borderRadius: '4px', mb: 1 }}></Box>
                        <Box sx={{ height: '6px', backgroundColor: '#E0E0E0', borderRadius: '2px', mb: 0.5 }}></Box>
                        <Box sx={{ height: '6px', backgroundColor: '#E0E0E0', borderRadius: '2px', mb: 0.5 }}></Box>
                        <Box sx={{ height: '6px', backgroundColor: '#E0E0E0', borderRadius: '2px', mb: 0.5 }}></Box>
                        <Box sx={{ height: '6px', backgroundColor: '#E0E0E0', borderRadius: '2px', mb: 0.5 }}></Box>
                        <Box sx={{ height: '12px', backgroundColor: '#4A90E2', borderRadius: '4px' }}></Box>
                      </Box>

                      {/* Theme 2 - Dark Blue/Purple */}
                      <Box sx={{
                        width: '120px',
                        height: '80px',
                        border: '2px solid #D0D0D0',
                        borderRadius: '8px',
                        p: 1,
                        backgroundColor: '#F8FBFF',
                        cursor: 'pointer',
                        '&:hover': {
                          borderColor: theme.palette.customColors?.blue[22],
                        }
                      }}>
                        <Box sx={{ height: '8px', backgroundColor: '#6B46C1', borderRadius: '4px', mb: 1 }}></Box>
                        <Box sx={{ height: '6px', backgroundColor: '#E0E0E0', borderRadius: '2px', mb: 0.5 }}></Box>
                        <Box sx={{ height: '6px', backgroundColor: '#E0E0E0', borderRadius: '2px', mb: 0.5 }}></Box>
                        <Box sx={{ height: '6px', backgroundColor: '#E0E0E0', borderRadius: '2px', mb: 0.5 }}></Box>
                        <Box sx={{ height: '6px', backgroundColor: '#E0E0E0', borderRadius: '2px', mb: 0.5 }}></Box>
                        <Box sx={{ height: '12px', backgroundColor: '#6B46C1', borderRadius: '4px' }}></Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mt: 0.5 }}>
                          <Box sx={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }}></Box>
                          <Box sx={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#60A5FA' }}></Box>
                          <Box sx={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }}></Box>
                          <Box sx={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EC4899' }}></Box>
                          <Box sx={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8B5CF6' }}></Box>
                        </Box>
                      </Box>

                      {/* Theme 3 - Similar to Theme 2 */}
                      <Box sx={{
                        width: '120px',
                        height: '80px',
                        border: '2px solid #D0D0D0',
                        borderRadius: '8px',
                        p: 1,
                        backgroundColor: '#F8FBFF',
                        cursor: 'pointer',
                        '&:hover': {
                          borderColor: theme.palette.customColors?.blue[22],
                        }
                      }}>
                        <Box sx={{ height: '8px', backgroundColor: '#6B46C1', borderRadius: '4px', mb: 1 }}></Box>
                        <Box sx={{ height: '6px', backgroundColor: '#E0E0E0', borderRadius: '2px', mb: 0.5 }}></Box>
                        <Box sx={{ height: '6px', backgroundColor: '#E0E0E0', borderRadius: '2px', mb: 0.5 }}></Box>
                        <Box sx={{ height: '6px', backgroundColor: '#E0E0E0', borderRadius: '2px', mb: 0.5 }}></Box>
                        <Box sx={{ height: '6px', backgroundColor: '#E0E0E0', borderRadius: '2px', mb: 0.5 }}></Box>
                        <Box sx={{ height: '12px', backgroundColor: '#6B46C1', borderRadius: '4px' }}></Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mt: 0.5 }}>
                          <Box sx={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }}></Box>
                          <Box sx={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#60A5FA' }}></Box>
                          <Box sx={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }}></Box>
                          <Box sx={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EC4899' }}></Box>
                          <Box sx={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8B5CF6' }}></Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* Color-Palette */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Color-Palette
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, fontSize: 12, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                      Sets the Primary and Secondary color for your theme
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              {/* primary color */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: "1rem" }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Primary Color
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "23%", textAlign: "right", display: 'flex', justifyContent: "flex-end", position: 'relative' }}>
                    <Box
                      onClick={handlePrimaryColorClick}
                      sx={{
                        width: '24px',
                        height: '24px',
                        backgroundColor: `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, ${primaryColor.a})`,
                        borderRadius: '4px',
                        border: '1px solid #6D6D6D',
                        cursor: 'pointer',
                        position: 'relative'
                      }}
                    >
                      <svg
                        width="6"
                        height="4"
                        viewBox="0 0 6 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          position: 'absolute',
                          bottom: '2px',
                          right: '2px',
                          background: '#6D6D6D',
                          borderRadius: '0 0 1px 0',
                          boxShadow: '0px 0px 0 2px #6D6D6D',
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.499826 -7.08063e-05C0.400946 -4.98168e-05 0.304292 0.0292876 0.222083 0.0842326C0.139874 0.139178 0.0758006 0.217263 0.0379641 0.308618C0.000127045 0.399972 -0.00977542 0.500494 0.00950979 0.597475C0.0287945 0.694457 0.0763996 0.783543 0.146308 0.853473L2.64644 3.3536C2.7402 3.44734 2.86737 3.5 2.99995 3.5C3.13254 3.5 3.2597 3.44734 3.35347 3.3536L5.8536 0.853472C5.92351 0.783543 5.97111 0.694456 5.9904 0.597475C6.00968 0.500493 5.99978 0.399972 5.96194 0.308617C5.92411 0.217263 5.86003 0.139177 5.77782 0.0842321C5.69561 0.0292871 5.59896 -5.02713e-05 5.50008 -7.12435e-05L0.499826 -7.08063e-05Z"
                          fill="white"
                        />
                      </svg>
                    </Box>
                    {displayPrimaryColorPicker && (
                      <Box sx={{ position: 'absolute', zIndex: 2, top: '-80px', left: '-80px', right: 0 }}>
                        <Box
                          sx={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                          }}
                          onClick={handlePrimaryColorClose}
                        />
                        <SketchPicker
                          color={primaryColor}
                          onChange={handlePrimaryColorChange}
                          presetColors={[]}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Grid>
              {/* secondary color */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: "1rem" }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Secondary Color
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: "23%", textAlign: "right", display: 'flex', justifyContent: "flex-end", position: 'relative' }}>
                    <Box
                      onClick={handleSecondaryColorClick}
                      sx={{
                        width: '24px',
                        height: '24px',
                        backgroundColor: `rgba(${secondaryColor.r}, ${secondaryColor.g}, ${secondaryColor.b}, ${secondaryColor.a})`,
                        borderRadius: '4px',
                        border: '1px solid #6D6D6D',
                        cursor: 'pointer',
                        position: 'relative'
                      }}
                    >
                      <svg
                        width="6"
                        height="4"
                        viewBox="0 0 6 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          position: 'absolute',
                          bottom: '2px',
                          right: '2px',
                          background: '#6D6D6D',
                          borderRadius: '0 0 1px 0',
                          boxShadow: '0px 0px 0 2px #6D6D6D',
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.499826 -7.08063e-05C0.400946 -4.98168e-05 0.304292 0.0292876 0.222083 0.0842326C0.139874 0.139178 0.0758006 0.217263 0.0379641 0.308618C0.000127045 0.399972 -0.00977542 0.500494 0.00950979 0.597475C0.0287945 0.694457 0.0763996 0.783543 0.146308 0.853473L2.64644 3.3536C2.7402 3.44734 2.86737 3.5 2.99995 3.5C3.13254 3.5 3.2597 3.44734 3.35347 3.3536L5.8536 0.853472C5.92351 0.783543 5.97111 0.694456 5.9904 0.597475C6.00968 0.500493 5.99978 0.399972 5.96194 0.308617C5.92411 0.217263 5.86003 0.139177 5.77782 0.0842321C5.69561 0.0292871 5.59896 -5.02713e-05 5.50008 -7.12435e-05L0.499826 -7.08063e-05Z"
                          fill="white"
                        />
                      </svg>
                    </Box>
                    {displaySecondaryColorPicker && (
                      <Box sx={{ position: 'absolute', zIndex: 2, top: '-80px', left: '-80px', right: 0 }}>
                        <Box
                          sx={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                          }}
                          onClick={handleSecondaryColorClose}
                        />
                        <SketchPicker
                          color={secondaryColor}
                          onChange={handleSecondaryColorChange}
                          presetColors={[]}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Grid>

              {/* Announcements Section */}
              <Grid item xs={12} sx={{ mt: '2rem' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Announcements
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, fontSize: 12, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                      Set product-specific announcements for your employees
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Flight Information Section */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 2 }}>
                    <Box>
                      <Typography variant="body2" sx={{ mb: '5px', fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                        Flight Information
                      </Typography>
                    </Box>
                    <Box>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={flightInfoBannerEnabled}
                            onChange={(e) => setFlightInfoBannerEnabled(e.target.checked)}
                            icon={<CheckboxUncheckedIcon />}
                            checkedIcon={<CheckboxCheckedIcon />}
                            sx={{
                              padding: 0,
                              '&:hover': {
                                backgroundColor: 'transparent',
                              },
                            }}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ ml: '5px', fontSize: 12, fontWeight: 400, }}>
                            Enable Banner Display
                          </Typography>
                        }
                        sx={{
                          marginRight: 0,
                          '& .MuiFormControlLabel-root': {
                            marginRight: 0,
                          },
                        }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <EditorComponent
                      value={flightInfoEditorContent}
                      onContentChange={setFlightInfoEditorContent}
                      placeholder="Add Description"
                      height="150px"
                      minHeight="120px"
                      maxHeight="300px"
                      toolbarOptions={tool_Use.standard}
                    />
                  </Box>
                </Box>
              </Grid>

              {/* Hotel Information Section */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 2 }}>
                    <Box>
                      <Typography variant="body2" sx={{ mb: '5px', fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                        Hotel Information
                      </Typography>
                    </Box>
                    <Box>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={hotelInfoBannerEnabled}
                            onChange={(e) => setHotelInfoBannerEnabled(e.target.checked)}
                            icon={<CheckboxUncheckedIcon />}
                            checkedIcon={<CheckboxCheckedIcon />}
                            sx={{
                              padding: 0,
                              '&:hover': {
                                backgroundColor: 'transparent',
                              },
                            }}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ ml: '5px', fontSize: 12, fontWeight: 400, }}>
                            Enable Banner Display
                          </Typography>
                        }
                        sx={{
                          marginRight: 0,
                          '& .MuiFormControlLabel-root': {
                            marginRight: 0,
                          },
                        }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <EditorComponent
                      value={hotelInfoEditorContent}
                      onContentChange={setHotelInfoEditorContent}
                      placeholder="Add Description"
                      height="150px"
                      minHeight="120px"
                      maxHeight="300px"
                      toolbarOptions={tool_Use.standard}
                    />
                  </Box>
                </Box>
              </Grid>

              {/* Visa Information Section */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 2 }}>
                    <Box>
                      <Typography variant="body2" sx={{ mb: '5px', fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                        Visa Information
                      </Typography>
                    </Box>
                    <Box>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={visaInfoBannerEnabled}
                            onChange={(e) => setVisaInfoBannerEnabled(e.target.checked)}
                            icon={<CheckboxUncheckedIcon />}
                            checkedIcon={<CheckboxCheckedIcon />}
                            sx={{
                              padding: 0,
                              '&:hover': {
                                backgroundColor: 'transparent',
                              },
                            }}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ ml: '5px', fontSize: 12, fontWeight: 400, }}>
                            Enable Banner Display
                          </Typography>
                        }
                        sx={{
                          marginRight: 0,
                          '& .MuiFormControlLabel-root': {
                            marginRight: 0,
                          },
                        }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <EditorComponent
                      value={visaInfoEditorContent}
                      onContentChange={setVisaInfoEditorContent}
                      placeholder="Add Description"
                      height="150px"
                      minHeight="120px"
                      maxHeight="300px"
                      toolbarOptions={tool_Use.standard}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Flight Settings Accordion */}
        <Accordion
          expanded={expanded === 'flight'}
          onChange={handleAccordionChange('flight')}
          sx={{
            mb: 2,
            boxShadow: 'none',
            border: '1px solid #EBEBEB',
            borderRadius: '8px',
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
            borderRadius: '8px',
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
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Set Preferred Login/Signup Flow
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, fontSize: 12, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                      Configures the default login and signup process for your organization
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
          {/* Organization Icon */}
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
            Great! Your Organization Setup is complete
            <br />
            Kindly proceed with an Entity setup to start booking
          </Typography>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="text"
              onClick={handleCloseSuccessModal}
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
              Skip For Now
            </Button>
            <Button
              variant="text"
              onClick={handleAddNewEntity}
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
              Add a New Entity
            </Button>
          </Box>

          {/* Market Selection Section - Only visible after clicking Add New Entity */}
          {showMarketSelectionInSuccess && (
            <Box sx={{ mt: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#000000',
                  mb: 2,
                }}
              >
                Select a Market
              </Typography>

              {/* Market Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                <Button
                  variant={selectedMarket === 'India' ? 'contained' : 'outlined'}
                  onClick={() => handleMarketSelect('India')}
                  sx={{
                    fontSize: '10px',
                    textTransform: 'none',
                    color: '#000000',
                    backgroundColor: selectedMarket === 'India' ? '#D9EDFF' : 'transparent',
                    borderColor: selectedMarket === 'India' ? '#0083FF' : '#D0D0D0',
                    '&:hover': {
                      backgroundColor: selectedMarket === 'India' ? '#0066CC' : '#F5F5F5',
                      borderColor: selectedMarket === 'India' ? '#0066CC' : '#0083FF',
                    }
                  }}
                >
                  India
                </Button>
                <Button
                  variant={selectedMarket === 'UAE' ? 'contained' : 'outlined'}
                  onClick={() => handleMarketSelect('UAE')}
                  sx={{
                    fontSize: '10px',
                    textTransform: 'none',
                    color: '#000000',
                    backgroundColor: selectedMarket === 'UAE' ? '#D9EDFF' : 'transparent',
                    borderColor: selectedMarket === 'UAE' ? '#0083FF' : '#D0D0D0',
                    '&:hover': {
                      backgroundColor: selectedMarket === 'UAE' ? '#0066CC' : '#F5F5F5',
                      borderColor: selectedMarket === 'UAE' ? '#0066CC' : '#0083FF',
                    }
                  }}
                >
                  UAE
                </Button>
                <Button
                  variant={selectedMarket === 'KSA' ? 'contained' : 'outlined'}
                  onClick={() => handleMarketSelect('KSA')}
                  sx={{
                    fontSize: '10px',
                    textTransform: 'none',
                    color: '#000000',
                    backgroundColor: selectedMarket === 'KSA' ? '#D9EDFF' : 'transparent',
                    borderColor: selectedMarket === 'KSA' ? '#0083FF' : '#D0D0D0',
                    '&:hover': {
                      backgroundColor: selectedMarket === 'KSA' ? '#0066CC' : '#F5F5F5',
                      borderColor: selectedMarket === 'KSA' ? '#0066CC' : '#0083FF',
                    }
                  }}
                >
                  KSA
                </Button>
                {/* Add New Market Button */}
              <Button
                variant="text"
                onClick={handleAddNewMarket}
                sx={{
                  fontSize: '12px',
                  textTransform: 'none',
                  color: '#0083FF',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#0066CC',
                  }
                }}
              >
                Add a new Market
              </Button>
              </Box>              
            </Box>
          )}
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
            <br />
            Kindly proceed with an Entity setup to start booking
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
              Skip For Now
            </Button>
            <Button
              variant="text"
              onClick={handleAddNewEntityFromSave}
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
              Add New Entity
            </Button>
          </Box>

          {/* Market Selection Section - Only visible after clicking Add New Entity */}
          {showMarketSelectionInSave && (
            <Box sx={{ mt: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#000000',
                  mb: 2,
                }}
              >
                Select a Market
              </Typography>

              {/* Market Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                <Button
                  variant={selectedMarket === 'India' ? 'contained' : 'outlined'}
                  onClick={() => handleMarketSelect('India')}
                  sx={{
                    fontSize: '10px',
                    textTransform: 'none',
                    color: '#000000',
                    backgroundColor: selectedMarket === 'India' ? '#D9EDFF' : 'transparent',
                    borderColor: selectedMarket === 'India' ? '#0083FF' : '#D0D0D0',
                    '&:hover': {
                      backgroundColor: selectedMarket === 'India' ? '#0066CC' : '#F5F5F5',
                      borderColor: selectedMarket === 'India' ? '#0066CC' : '#0083FF',
                    }
                  }}
                >
                  India
                </Button>
                <Button
                  variant={selectedMarket === 'UAE' ? 'contained' : 'outlined'}
                  onClick={() => handleMarketSelect('UAE')}
                  sx={{
                    fontSize: '10px',
                    textTransform: 'none',
                    color: '#000000',
                    backgroundColor: selectedMarket === 'UAE' ? '#D9EDFF' : 'transparent',
                    borderColor: selectedMarket === 'UAE' ? '#0083FF' : '#D0D0D0',
                    '&:hover': {
                      backgroundColor: selectedMarket === 'UAE' ? '#0066CC' : '#F5F5F5',
                      borderColor: selectedMarket === 'UAE' ? '#0066CC' : '#0083FF',
                    }
                  }}
                >
                  UAE
                </Button>
                <Button
                  variant={selectedMarket === 'KSA' ? 'contained' : 'outlined'}
                  onClick={() => handleMarketSelect('KSA')}
                  sx={{
                    fontSize: '10px',
                    textTransform: 'none',
                    color: '#000000',
                    backgroundColor: selectedMarket === 'KSA' ? '#D9EDFF' : 'transparent',
                    borderColor: selectedMarket === 'KSA' ? '#0083FF' : '#D0D0D0',
                    '&:hover': {
                      backgroundColor: selectedMarket === 'KSA' ? '#0066CC' : '#F5F5F5',
                      borderColor: selectedMarket === 'KSA' ? '#0066CC' : '#0083FF',
                    }
                  }}
                >
                  KSA
                </Button>   
                {/* Add New Market Button */}
              <Button
                variant="text"
                onClick={handleAddNewMarket}
                sx={{
                  fontSize: '12px',
                  textTransform: 'none',
                  color: '#0083FF',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#0066CC',
                  }
                }}
              >
                Add a new Market
              </Button>
              </Box>           
            </Box>
          )}
        </Box>
      </CustomModal>


    </Box>
  );
};

export default AdditionalSettingsForm; 
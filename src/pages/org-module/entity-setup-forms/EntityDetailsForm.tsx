import React, { useState, useRef } from 'react';
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
  SelectChangeEvent,
} from '@mui/material';
import { Close as CloseIcon, ArrowBack as ArrowBackIcon, Close as CloseIconSmall } from '@mui/icons-material';
import { theme } from '../../../theme';
import FileUploadIcon from '../../../assets/icons/FileUploadIcon';

interface EntityDetailsFormProps {
  onClose: () => void;
  onNext: () => void;
  onBack?: () => void;
}

const EntityDetailsForm: React.FC<EntityDetailsFormProps> = ({
  onClose,
  onNext,
  onBack,
}) => {
  const [legalName, setLegalName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [country, setCountry] = useState('UAE');
  const [numberOfEmployees, setNumberOfEmployees] = useState('');
  const [currency, setCurrency] = useState('');
  const [industryType, setIndustryType] = useState('');
  
  const [legalAddress, setLegalAddress] = useState({
    address: '',
    city: '',
    pincode: '',
    state: '',
    country: '',
    latitude: '',
    longitude: ''
  });
  
  const [billingAddress, setBillingAddress] = useState({
    address: '',
    city: '',
    pincode: '',
    state: '',
    country: '',
    latitude: '',
    longitude: ''
  });
  
  const [officeLocations, setOfficeLocations] = useState([
    {
      id: 1,
    address: '',
    city: '',
    pincode: '',
    state: '',
    country: '',
    latitude: '',
    longitude: ''
    }
  ]);

  const [logoUploadTab, setLogoUploadTab] = useState<'upload' | 'url'>('upload');
  const [uploadedLogoFiles, setUploadedLogoFiles] = useState<File[]>([]);
  const [isLogoDragOver, setIsLogoDragOver] = useState(false);
  const [isLogoUploading, setIsLogoUploading] = useState(false);
  const [logoUploadProgress, setLogoUploadProgress] = useState(0);
  const [uploadingLogoFile, setUploadingLogoFile] = useState<File | null>(null);
  const logoFileInputRef = useRef<HTMLInputElement>(null);

  const handleLegalAddressChange = (field: string, value: string) => {
    setLegalAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleBillingAddressChange = (field: string, value: string) => {
    setBillingAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleOfficeLocationChange = (id: number, field: string, value: string) => {
    setOfficeLocations(prev =>
      prev.map(location =>
        location.id === id ? { ...location, [field]: value } : location
      )
    );
  };

  const addOfficeLocation = () => {
    const newId = Math.max(...officeLocations.map(loc => loc.id)) + 1;
    setOfficeLocations(prev => [
      ...prev,
      {
        id: newId,
        address: '',
        city: '',
        pincode: '',
        state: '',
        country: '',
        latitude: '',
        longitude: ''
      }
    ]);
  };

  const removeOfficeLocation = (id: number) => {
    if (officeLocations.length > 1) {
      setOfficeLocations(prev => prev.filter(location => location.id !== id));
    }
  };

  const resetAllFormValues = () => {
    setLegalName('');
    setDisplayName('');
    setCountry('UAE');
    setNumberOfEmployees('');
    setCurrency('');
    setIndustryType('');

    setLegalAddress({
      address: '',
      city: '',
      pincode: '',
      state: '',
      country: '',
      latitude: '',
      longitude: ''
    });

    setBillingAddress({
      address: '',
      city: '',
      pincode: '',
      state: '',
      country: '',
      latitude: '',
      longitude: ''
    });

    setOfficeLocations([
      {
        id: 1,
        address: '',
        city: '',
        pincode: '',
        state: '',
        country: '',
        latitude: '',
        longitude: ''
      }
    ]);

    setLogoUploadTab('upload');
    setUploadedLogoFiles([]);
    setIsLogoDragOver(false);
    setIsLogoUploading(false);
    setLogoUploadProgress(0);
    setUploadingLogoFile(null);
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

  const copyLegalToBilling = () => {
    setBillingAddress(legalAddress);
  };

  return (
    <Box sx={{ width: { xs: '100vw', md: '70vw' }, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ 
        p: '24px 41px 24px 24px',
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Title Row - Inherit and Reset all button */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              size="small"
              sx={{
                fontSize: '12px',
                textTransform: 'none',
                borderColor: theme.palette.customColors?.blue[22],
                color: theme.palette.customColors?.blue[22],
                height: '28px',
                '&:hover': {
                  borderColor: theme.palette.customColors?.blue[22],
                  backgroundColor: theme.palette.customColors?.blue[24],
                }
              }}
            >
              Inherit from Organization Details
            </Button>
          </Box>
            <Typography 
              variant="body2" 
            onClick={resetAllFormValues}
              sx={{ 
                fontSize: '12px',
                fontWeight: 400,
              color: '#FA0004',
                cursor: 'pointer'
              }}
            >
              Reset All
            </Typography>
        </Box>
        
        {/* Title Row - Title and Progress */}
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontSize: '22px',
                fontWeight: 600, 
                color: theme.palette.customColors?.black[1] 
              }}
            >
              Entity Details
            </Typography>
          </Box>
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
            1/13
          </Typography>
        </Box>

      </Box>

      {/* Form Content */}
      <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
        <Grid container spacing={3}>

          {/* Legal Name */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                  Legal name*
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, fontSize: 12, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                  The officially registered name of your Entity
                </Typography>
              </Box>
              <Box sx={{ flexBasis: "23%" }}>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                  Legal name
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={legalName}
                  onChange={(e) => setLegalName(e.target.value)}
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
                      fontSize: '14px',
                      fontWeight: 400,
                      padding: '8px 12px',
                    },
                  }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Display Name */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                  Display name*
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, fontSize: 12, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                  The display name of your Entity
                </Typography>
              </Box>
              <Box sx={{ flexBasis: "23%" }}>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                  Display name
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
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
                      fontSize: '14px',
                      fontWeight: 400,
                      padding: '8px 12px',
                    },
                  }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Country */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                  Country*
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, fontSize: 12, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                  The country where this entity is registered
                </Typography>
              </Box>
              <Box sx={{ flexBasis: "23%" }}>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                  Country
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={country}
                    onChange={(e: SelectChangeEvent) => setCountry(e.target.value)}
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
                        fontSize: '14px',
                        fontWeight: 400,
                        display: 'flex',
                        alignItems: 'center',
                      },
                    }}
                  >
                    <MenuItem value="UAE" sx={{ fontSize: '14px', fontWeight: 400 }}>UAE</MenuItem>
                    <MenuItem value="India" sx={{ fontSize: '14px', fontWeight: 400 }}>India</MenuItem>
                    <MenuItem value="USA" sx={{ fontSize: '14px', fontWeight: 400 }}>USA</MenuItem>
                    <MenuItem value="UK" sx={{ fontSize: '14px', fontWeight: 400 }}>UK</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Grid>

          {/* Number of Employees */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                  Number of Employees
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, fontSize: 12, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                  Number of employees of your Entity
                </Typography>
              </Box>
              <Box sx={{ flexBasis: "23%" }}>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                  Number of Employees
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={numberOfEmployees}
                  onChange={(e) => setNumberOfEmployees(e.target.value)}
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
                      fontSize: '14px',
                      fontWeight: 400,
                      padding: '8px 12px',
                    },
                  }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Currency */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                  Currency
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, fontSize: 12, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                  The official currency of your Entity
                </Typography>
              </Box>
              <Box sx={{ flexBasis: "23%" }}>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                  Currency
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={currency}
                    onChange={(e: SelectChangeEvent) => setCurrency(e.target.value)}
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
                        fontSize: '14px',
                        fontWeight: 400,
                        display: 'flex',
                        alignItems: 'center',
                      },
                    }}
                  >
                    <MenuItem value="AED" sx={{ fontSize: '14px', fontWeight: 400 }}>AED</MenuItem>
                    <MenuItem value="USD" sx={{ fontSize: '14px', fontWeight: 400 }}>USD</MenuItem>
                    <MenuItem value="INR" sx={{ fontSize: '14px', fontWeight: 400 }}>INR</MenuItem>
                    <MenuItem value="EUR" sx={{ fontSize: '14px', fontWeight: 400 }}>EUR</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Grid>

          {/* Industry Type */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                  Industry type
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, fontSize: 12, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                  Defines your entities industry category
                </Typography>
              </Box>
              <Box sx={{ flexBasis: "23%" }}>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                  Industry type
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={industryType}
                    onChange={(e: SelectChangeEvent) => setIndustryType(e.target.value)}
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
                        fontSize: '14px',
                        fontWeight: 400,
                        display: 'flex',
                        alignItems: 'center',
                      },
                    }}
                  >
                    <MenuItem value="technology" sx={{ fontSize: '14px', fontWeight: 400 }}>Technology</MenuItem>
                    <MenuItem value="finance" sx={{ fontSize: '14px', fontWeight: 400 }}>Finance</MenuItem>
                    <MenuItem value="healthcare" sx={{ fontSize: '14px', fontWeight: 400 }}>Healthcare</MenuItem>
                    <MenuItem value="retail" sx={{ fontSize: '14px', fontWeight: 400 }}>Retail</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Grid>

          {/* Entity Logo Section */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                  Entity Logo
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, fontSize: 12, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                  Set a logo for your Entity
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
                            key={`logo-file-${file.name}`}
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
                      File Supported: PDF/ JPG, up to 5 MB
                    </Typography>
                    {/* Hidden file input */}
                    <input
                      ref={logoFileInputRef}
                      type="file"
                      multiple
                      accept=".svg,.png,.jpg,.jpeg,.pdf"
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

          {/* Addresses Section */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600, color: theme.palette.customColors?.black[1], mb: 2 }}>
              Addresses
            </Typography>
          </Grid>

          {/* Legal Address */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                  Legal Address
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, fontSize: 12, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                  The officially registered address of your Entity
                </Typography>
              </Box>
              <Box sx={{ flexBasis: "35%" }}>
                <Typography variant="body2" sx={{ mb: 1, fontSize: 10, fontWeight: 400, color: '#999999' }}>
                  Address
                </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={legalAddress.address}
                      onChange={(e) => handleLegalAddressChange('address', e.target.value)}
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
                      fontSize: '14px',
                          fontWeight: 400,
                          padding: '8px 12px',
                        },
                      }}
                    />
              </Box>
            </Box>
                  </Grid>

          {/* City and State - Side by Side */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box sx={{ display: 'flex', gap: 2, width: '47%' }}>
              {/* City */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                  City
                </Typography>
                    <FormControl fullWidth>
                      <Select
                        value={legalAddress.city}
                        onChange={(e: SelectChangeEvent) => handleLegalAddressChange('city', e.target.value)}
                        displayEmpty
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
                        fontSize: '14px',
                            fontWeight: 400,
                            display: 'flex',
                            alignItems: 'center',
                          },
                        }}
                      >
                    <MenuItem value="Dubai" sx={{ fontSize: '14px', fontWeight: 400 }}>Dubai</MenuItem>
                    <MenuItem value="Abu Dhabi" sx={{ fontSize: '14px', fontWeight: 400 }}>Abu Dhabi</MenuItem>
                    <MenuItem value="Sharjah" sx={{ fontSize: '14px', fontWeight: 400 }}>Sharjah</MenuItem>
                      </Select>
                    </FormControl>
              </Box>

              {/* State */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                  State
                </Typography>
                    <FormControl fullWidth>
                      <Select
                        value={legalAddress.state}
                        onChange={(e: SelectChangeEvent) => handleLegalAddressChange('state', e.target.value)}
                        displayEmpty
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
                        fontSize: '14px',
                            fontWeight: 400,
                            display: 'flex',
                            alignItems: 'center',
                          },
                        }}
                      >
                    <MenuItem value="Dubai" sx={{ fontSize: '14px', fontWeight: 400 }}>Dubai</MenuItem>
                    <MenuItem value="Abu Dhabi" sx={{ fontSize: '14px', fontWeight: 400 }}>Abu Dhabi</MenuItem>
                      </Select>
                    </FormControl>
              </Box>
            </Box>
                  </Grid>

          {/* Country and Pincode - Side by Side */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box sx={{ display: 'flex', gap: 2, width: '47%' }}>
              {/* Country */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                  Country
                </Typography>
                    <FormControl fullWidth>
                      <Select
                        value={legalAddress.country}
                        onChange={(e: SelectChangeEvent) => handleLegalAddressChange('country', e.target.value)}
                        displayEmpty
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
                        fontSize: '14px',
                            fontWeight: 400,
                            display: 'flex',
                            alignItems: 'center',
                          },
                        }}
                      >
                    <MenuItem value="UAE" sx={{ fontSize: '14px', fontWeight: 400 }}>UAE</MenuItem>
                    <MenuItem value="India" sx={{ fontSize: '14px', fontWeight: 400 }}>India</MenuItem>
                      </Select>
                    </FormControl>
              </Box>

              {/* Pincode */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                  Pincode
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={legalAddress.pincode}
                  onChange={(e) => handleLegalAddressChange('pincode', e.target.value)}
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
                      fontSize: '14px',
                      fontWeight: 400,
                      padding: '8px 12px',
                    },
                  }}
                />
              </Box>
            </Box>
                  </Grid>

          {/* Latitude and Longitude - Side by Side */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box sx={{ display: 'flex', gap: 2, width: '47%' }}>
              {/* Latitude */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                  Latitude
                </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={legalAddress.latitude}
                      onChange={(e) => handleLegalAddressChange('latitude', e.target.value)}
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
                      fontSize: '14px',
                          fontWeight: 400,
                          padding: '8px 12px',
                        },
                      }}
                    />
              </Box>

              {/* Longitude */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                  Longitude
                </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={legalAddress.longitude}
                      onChange={(e) => handleLegalAddressChange('longitude', e.target.value)}
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
                      fontSize: '14px',
                          fontWeight: 400,
                          padding: '8px 12px',
                        },
                      }}
                    />
              </Box>
            </Box>
          </Grid>

          {/* Billing Address Section */}
          <Grid item xs={12} sx={{ pt: "36px !important" }}>
            <Box display='flex' justifyContent='space-between' alignItems='flex-start'>
              <Box display='flex' flexDirection='column'>
                <Typography variant="body2" sx={{ mb: 1, fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                  Billing address
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 400, color: theme.palette.customColors?.grey[8], }}>
                  The billing address of your Entity
                </Typography>
              </Box>
              <Button
                variant="text"
                  onClick={copyLegalToBilling}
                  sx={{ 
                    color: theme.palette.customColors?.blue[22], 
                  textTransform: 'none',
                  p: 0,
                  mb: 2,
                  '&:hover': {
                    backgroundColor: 'transparent',
                    textDecoration: 'underline',
                  }
                  }}
                >
                  Same as above
              </Button>
            </Box>
          </Grid>

          {/* Billing Address */}
          <Grid item xs={12} sx={{ pt: '0 !important' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
              </Box>
              <Box sx={{ flexBasis: "35%" }}>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                  Address
                </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={billingAddress.address}
                      onChange={(e) => handleBillingAddressChange('address', e.target.value)}
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
                      fontSize: '14px',
                          fontWeight: 400,
                          padding: '8px 12px',
                        },
                      }}
                    />
              </Box>
            </Box>
                  </Grid>

          {/* Billing City and State - Side by Side */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box sx={{ display: 'flex', gap: 2, width: '47%' }}>
              {/* Billing City */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                  City
                </Typography>
                    <FormControl fullWidth>
                      <Select
                        value={billingAddress.city}
                        onChange={(e: SelectChangeEvent) => handleBillingAddressChange('city', e.target.value)}
                        displayEmpty
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
                        fontSize: '14px',
                            fontWeight: 400,
                            display: 'flex',
                            alignItems: 'center',
                          },
                        }}
                      >
                    <MenuItem value="Dubai" sx={{ fontSize: '14px', fontWeight: 400 }}>Dubai</MenuItem>
                    <MenuItem value="Abu Dhabi" sx={{ fontSize: '14px', fontWeight: 400 }}>Abu Dhabi</MenuItem>
                    <MenuItem value="Sharjah" sx={{ fontSize: '14px', fontWeight: 400 }}>Sharjah</MenuItem>
                      </Select>
                    </FormControl>
              </Box>

              {/* Billing State */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                  State
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={billingAddress.state}
                    onChange={(e: SelectChangeEvent) => handleBillingAddressChange('state', e.target.value)}
                    displayEmpty
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
                        fontSize: '14px',
                        fontWeight: 400,
                        display: 'flex',
                        alignItems: 'center',
                      },
                    }}
                  >
                    <MenuItem value="Dubai" sx={{ fontSize: '14px', fontWeight: 400 }}>Dubai</MenuItem>
                    <MenuItem value="Abu Dhabi" sx={{ fontSize: '14px', fontWeight: 400 }}>Abu Dhabi</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
                  </Grid>

          {/* Billing Country and Pincode - Side by Side */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box sx={{ display: 'flex', gap: 2, width: '47%' }}>
              {/* Billing Country */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                  Country
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={billingAddress.country}
                    onChange={(e: SelectChangeEvent) => handleBillingAddressChange('country', e.target.value)}
                    displayEmpty
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
                        fontSize: '14px',
                        fontWeight: 400,
                        display: 'flex',
                        alignItems: 'center',
                      },
                    }}
                  >
                    <MenuItem value="UAE" sx={{ fontSize: '14px', fontWeight: 400 }}>UAE</MenuItem>
                    <MenuItem value="India" sx={{ fontSize: '14px', fontWeight: 400 }}>India</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Billing Pincode */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                  Pincode
                </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={billingAddress.pincode}
                      onChange={(e) => handleBillingAddressChange('pincode', e.target.value)}
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
                      fontSize: '14px',
                          fontWeight: 400,
                          padding: '8px 12px',
                        },
                      }}
                    />
              </Box>
            </Box>
                  </Grid>

          {/* Billing Latitude and Longitude - Side by Side */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box sx={{ display: 'flex', gap: 2, width: '47%' }}>
              {/* Billing Latitude */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                  Latitude
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={billingAddress.latitude}
                  onChange={(e) => handleBillingAddressChange('latitude', e.target.value)}
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
                      fontSize: '14px',
                      fontWeight: 400,
                      padding: '8px 12px',
                    },
                  }}
                />
              </Box>

              {/* Billing Longitude */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                  Longitude
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={billingAddress.longitude}
                  onChange={(e) => handleBillingAddressChange('longitude', e.target.value)}
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
                      fontSize: '14px',
                      fontWeight: 400,
                      padding: '8px 12px',
                    },
                  }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Office Locations Section */}
          {officeLocations.map((location, index) => (
            <React.Fragment key={location.id}>
              {/* Office Location Section Header */}
              <Grid item xs={12} sx={{ pt: index === 0 ? "36px !important" : "24px !important" }}>
                <Box display='flex' justifyContent='space-between' alignItems='flex-start'>
                  <Box display='flex' flexDirection='column'>
                    <Typography variant="body2" sx={{ mb: 1, fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                      Office Location {index + 1}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 400, color: theme.palette.customColors?.grey[8], }}>
                      An Office's address of your Entity
                    </Typography>
                  </Box>
                  {index !== 0 && (
                    <Typography
                      variant="body2"
                      onClick={() => removeOfficeLocation(location.id)}
                      sx={{
                        fontSize: '14px',
                        fontWeight: 400,
                        color: '#FA0004',
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </Typography>
                  )}
                </Box>
              </Grid>

              {/* Office Location Address */}
              <Grid item xs={12} sx={{ pt: '0 !important' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                  </Box>
                  <Box sx={{ flexBasis: "35%" }}>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                      Address
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={location.address}
                      onChange={(e) => handleOfficeLocationChange(location.id, 'address', e.target.value)}
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
                          fontSize: '14px',
                          fontWeight: 400,
                          padding: '8px 12px',
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Grid>

              {/* Office Location City and State - Side by Side */}
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box sx={{ display: 'flex', gap: 2, width: '47%' }}>
                  {/* Office Location City */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                      City
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        value={location.city}
                        onChange={(e: SelectChangeEvent) => handleOfficeLocationChange(location.id, 'city', e.target.value)}
                        displayEmpty
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
                            fontSize: '14px',
                            fontWeight: 400,
                            display: 'flex',
                            alignItems: 'center',
                          },
                        }}
                      >
                        <MenuItem value="Dubai" sx={{ fontSize: '14px', fontWeight: 400 }}>Dubai</MenuItem>
                        <MenuItem value="Abu Dhabi" sx={{ fontSize: '14px', fontWeight: 400 }}>Abu Dhabi</MenuItem>
                        <MenuItem value="Sharjah" sx={{ fontSize: '14px', fontWeight: 400 }}>Sharjah</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Office Location State */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                      State
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        value={location.state}
                        onChange={(e: SelectChangeEvent) => handleOfficeLocationChange(location.id, 'state', e.target.value)}
                        displayEmpty
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
                            fontSize: '14px',
                            fontWeight: 400,
                            display: 'flex',
                            alignItems: 'center',
                          },
                        }}
                      >
                        <MenuItem value="Dubai" sx={{ fontSize: '14px', fontWeight: 400 }}>Dubai</MenuItem>
                        <MenuItem value="Abu Dhabi" sx={{ fontSize: '14px', fontWeight: 400 }}>Abu Dhabi</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                  </Grid>

              {/* Office Location Country and Pincode - Side by Side */}
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box sx={{ display: 'flex', gap: 2, width: '47%' }}>
                  {/* Office Location Country */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                      Country
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        value={location.country}
                        onChange={(e: SelectChangeEvent) => handleOfficeLocationChange(location.id, 'country', e.target.value)}
                        displayEmpty
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
                            fontSize: '14px',
                            fontWeight: 400,
                            display: 'flex',
                            alignItems: 'center',
                          },
                        }}
                      >
                        <MenuItem value="UAE" sx={{ fontSize: '14px', fontWeight: 400 }}>UAE</MenuItem>
                        <MenuItem value="India" sx={{ fontSize: '14px', fontWeight: 400 }}>India</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Office Location Pincode */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                      Pincode
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={location.pincode}
                      onChange={(e) => handleOfficeLocationChange(location.id, 'pincode', e.target.value)}
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
                          fontSize: '14px',
                          fontWeight: 400,
                          padding: '8px 12px',
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Grid>

              {/* Office Location Latitude and Longitude - Side by Side */}
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box sx={{ display: 'flex', gap: 2, width: '47%' }}>
                  {/* Office Location Latitude */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                      Latitude
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={location.latitude}
                      onChange={(e) => handleOfficeLocationChange(location.id, 'latitude', e.target.value)}
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
                          fontSize: '14px',
                          fontWeight: 400,
                          padding: '8px 12px',
                        },
                      }}
                    />
                  </Box>

                  {/* Office Location Longitude */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                      Longitude
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={location.longitude}
                      onChange={(e) => handleOfficeLocationChange(location.id, 'longitude', e.target.value)}
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
                          fontSize: '14px',
                          fontWeight: 400,
                          padding: '8px 12px',
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            </React.Fragment>
          ))}

          {/* Add Another Location Button - Only shown at the bottom */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="text"
              onClick={addOfficeLocation}
              sx={{
                color: theme.palette.customColors?.blue[22],
                textTransform: 'none',
                p: 0,
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                }
              }}
            >
              + Add another Location
            </Button>
          </Grid>
        </Grid>
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
          onClick={onClose}
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
          onClick={onNext}
          sx={{
            fontSize: '14px',
            textTransform: 'none',
            backgroundColor: theme.palette.customColors?.blue[22],
            '&:hover': {
              backgroundColor: theme.palette.customColors?.blue[22],
            }
          }}
        >
          Save & Next
        </Button>
      </Box>
    </Box>
  );
};

export default EntityDetailsForm;
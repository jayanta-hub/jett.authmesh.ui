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
} from '@mui/material';
import { Close as CloseIcon, ArrowBack as ArrowBackIcon, CalendarTodayOutlined, Close as CloseIconSmall } from '@mui/icons-material';
import FileUploadIcon from '../../../assets/icons/FileUploadIcon';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PickerValue } from '@mui/x-date-pickers/internals';
import dayjs from 'dayjs';
import { theme } from '../../../theme';
import DropdownClosedIcon from '../../../assets/icons/DropdownClosedIcon';
import DropdownOpenIcon from '../../../assets/icons/DropdownOpenIcon';

// Separate component for dropdown icon
interface DropdownIconProps {
  isOpen: boolean;
}

interface FinanceLegalFormProps {
  onClose: () => void;
  onNext: () => void;
  onBack?: () => void;
}
const DropdownIcon: React.FC<DropdownIconProps> = ({ isOpen }) => {
  return isOpen ? <DropdownOpenIcon /> : <DropdownClosedIcon />;
};
const FinanceLegalForm: React.FC<FinanceLegalFormProps> = ({
  onClose,
  onNext,
  onBack,
}) => {
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
  const [financialYearStartDate, setFinancialYearStartDate] = useState<dayjs.Dayjs | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDropdownOpen = (fieldName: string) => {
    setOpenDropdowns(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleDropdownClose = (fieldName: string) => {
    setOpenDropdowns(prev => ({ ...prev, [fieldName]: false }));
  };

  const handleDateChange = (date: PickerValue) => {
    setFinancialYearStartDate(date as dayjs.Dayjs);
  };

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      const validFiles = Array.from(files).filter(file => {
        const isValidType = file.type === 'application/pdf' || file.type.startsWith('image/');
        const isValidSize = file.size <= 5 * 1024 * 1024;
        return isValidType && isValidSize;
      });

      if (validFiles.length > 0) {
        validFiles.forEach((file, index) => {
          setTimeout(() => {
            setUploadingFile(file);
            setIsUploading(true);
            setUploadProgress(0);

            const interval = setInterval(() => {
              setUploadProgress(prev => {
                if (prev >= 100) {
                  clearInterval(interval);
                  setIsUploading(false);
                  setUploadingFile(null);
                  setUploadedFiles(prevFiles => [...prevFiles, file]);
                  return 0;
                }
                return prev + 10;
              });
            }, 200);
          }, index * 2500);
        });
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
    if (e.target) {
      e.target.value = '';
    }
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
            Financial & Legal Details
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
            2/5
          </Typography>
        </Box>
      </Box>

      {/* Form Content */}
      <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
        <Grid container spacing={3}>
          {/* Financial Year Start Date */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                  Financial Year Start Date
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, fontSize: 12, color: theme.palette.customColors?.grey[8] }}>
                  Select the month and date when your Organization's financial year begins
                </Typography>
              </Box>
              <Box sx={{ flexBasis: "33%" }}>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                  Start Date
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format="MMM DD, YYYY"
                    localeText={{
                      fieldYearPlaceholder: () => 'YYYY',
                      fieldMonthPlaceholder: () => 'MMM',
                      fieldDayPlaceholder: () => 'DD',
                    }}
                    value={financialYearStartDate}
                    onChange={handleDateChange}
                    openPickerIcon={<CalendarTodayOutlined />}
                    slots={{ openPickerIcon: CalendarTodayOutlined } as unknown}
                    slotProps={{
                      textField: {
                        size: 'small',
                        fullWidth: true,
                        InputLabelProps: {
                          shrink: true,
                        },
                        sx: {
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
                            height: '36px',
                            padding: '8px 12px',
                            fontSize: '14px',
                          },
                        },
                      },
                      popper: {
                        sx: {
                          maxHeight: '310px',
                          '& .MuiPickersCalendarHeader-root': {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            position: 'relative',
                            padding: '4px 10px',
                          },
                          '& .MuiPickersCalendarHeader-labelContainer': {
                            position: 'absolute',
                            left: '51%',
                            transform: 'translateX(-50%)',
                            fontWeight: 500,
                          },
                          '& .MuiPickersArrowSwitcher-root': {
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '0px 6px',
                          },
                          '& .Mui-selected': {
                            backgroundColor: `${theme.palette.customColors.blue[10]} !important`,
                            color: theme.palette.customColors.white[0],
                          },
                          '& .MuiPickersCalendarHeader-switchViewButton': {
                            padding: 0,
                            marginBottom: "4px",
                          },
                          '& .MuiDayCalendar-header': {
                            position: 'relative',
                            paddingTop: '8px',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: '30px',
                              right: '30px',
                              height: '0.6px',
                              backgroundColor: theme.palette.customColors.grey[17],
                            },
                          },
                        },
                      },
                    }}
                    sx={{
                      width: '100%',
                      '& .MuiPickersInputBase-sectionsContainer': {
                        width: "unset !important"
                      }
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
          </Grid>

          {/* Tax Registration Number Type */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                  Tax Registration Number type
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, fontSize: 12, color: theme.palette.customColors?.grey[8] }}>
                  The tax registration type of your Organization
                </Typography>
              </Box>
              <Box sx={{ flexBasis: "33%" }}>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                  TRN type
                </Typography>
                <FormControl fullWidth>
                  <Select
                    onOpen={() => handleDropdownOpen('trnType')}
                    onClose={() => handleDropdownClose('trnType')}
                    displayEmpty
                    IconComponent={() => <DropdownIcon isOpen={openDropdowns.trnType} />}
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
                        display: 'flex',
                        alignItems: 'center',
                      },
                    }}
                  >
                    <MenuItem value="" disabled>TRN type</MenuItem>
                    <MenuItem value="vat">VAT</MenuItem>
                    <MenuItem value="gst">GST</MenuItem>
                    <MenuItem value="tax-id">Tax ID</MenuItem>
                    <MenuItem value="business-number">Business Number</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Grid>

          {/* TRN */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ ml: '1rem' }}>
                <Typography variant="body2" sx={{ mb: 1, fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                  TRN
                </Typography>
              </Box>
              <Box sx={{ flexBasis: "15%" }}>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                  TRN
                </Typography>
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
                      height: '36px',
                      padding: '8px 12px',
                      fontSize: '14px',
                    },
                  }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Registration Number */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ ml: '1rem' }}>
                <Typography variant="body2" sx={{ mb: 1, fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                  Registration number
                </Typography>
              </Box>
              <Box sx={{ flexBasis: "15%" }}>
                <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                  Registration number
                </Typography>
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
                      height: '36px',
                      padding: '8px 12px',
                      fontSize: '14px',
                    },
                  }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Supporting Documents */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ ml: '1rem' }}>
                <Typography variant="body2" sx={{ mb: 1, fontSize: 12, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                  Supporting documents
                </Typography>
              </Box>
              <Box sx={{ flexBasis: "28%" }}>
                {/* Selected Files Display */}
                {uploadedFiles.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    {uploadedFiles.map((file, index) => (
                      <Box
                        key={`supporting-document-${file.name}`}
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
                          onClick={() => handleRemoveFile(index)}
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
                {isUploading && uploadingFile && (
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
                        {uploadingFile.name}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setIsUploading(false);
                          setUploadingFile(null);
                          setUploadProgress(0);
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
                          width: `${uploadProgress}%`,
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
                  onClick={handleClick}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  sx={{
                    border: isDragOver ? '2px solid' : '1px solid',
                    borderColor: isDragOver ? theme.palette.customColors?.blue[22] : '#D0D0D0',
                    borderRadius: '4px',
                    backgroundColor: isDragOver ? theme.palette.customColors?.blue[24] : '#FFFFFF',
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
                  File Supported: PDF/JPG, up to 5 MB
                </Typography>
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileInputChange}
                  style={{ display: 'none' }}
                />
              </Box>
            </Box>
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
            textTransform: 'none',
            borderColor: theme.palette.customColors?.blue[22],
            color: theme.palette.customColors?.blue[22],
            '&:hover': {
              borderColor: theme.palette.customColors?.blue[22],
              backgroundColor: theme.palette.customColors?.blue[24],
            }
          }}
        >
          Skip
        </Button>
        <Button
          variant="contained"
          onClick={onNext}
          sx={{
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

export default FinanceLegalForm; 
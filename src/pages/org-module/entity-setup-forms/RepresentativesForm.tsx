import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  IconButton,
  Avatar,
  Divider,
  Grid,
} from '@mui/material';
import { Close as CloseIcon, ArrowBack as ArrowBackIcon, Add as AddIcon } from '@mui/icons-material';
import { theme } from '../../../theme';
import DropdownClosedIcon from '../../../assets/icons/DropdownClosedIcon';
import DropdownOpenIcon from '../../../assets/icons/DropdownOpenIcon';

// Separate component for dropdown icon
interface DropdownIconProps {
  isOpen: boolean;
}

const DropdownIcon: React.FC<DropdownIconProps> = ({ isOpen }) => {
  return isOpen ? <DropdownOpenIcon /> : <DropdownClosedIcon />;
};

interface RepresentativesFormProps {
  onClose: () => void;
  onNext: () => void;
  onBack?: () => void;
}

const RepresentativesForm: React.FC<RepresentativesFormProps> = ({
  onClose,
  onNext,
  onBack,
}) => {
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
  const [selectedValues, setSelectedValues] = useState<{ [key: string]: string }>({
    businessDevelopmentManager: 'tokita',
    relationshipManager: '',
    financeConsultant: '',
    financeManager: '',
    travelManager: ''
  });

  const [selectedFieldTypes, setSelectedFieldTypes] = useState<{ [key: string]: string }>({
    businessDevelopmentManager: 'Business Development Manager',
    relationshipManager: 'Relationship Manager',
    financeConsultant: 'Finance Consultant',
    financeManager: 'Finance Manager',
    travelManager: 'Travel Manager'
  });

  const handleDropdownOpen = (fieldName: string) => {
    setOpenDropdowns(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleDropdownClose = (fieldName: string) => {
    setOpenDropdowns(prev => ({ ...prev, [fieldName]: false }));
  };

  const handleValueChange = (fieldName: string, value: string) => {
    setSelectedValues(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleFieldTypeChange = (fieldName: string, value: string) => {
    setSelectedFieldTypes(prev => ({ ...prev, [fieldName]: value }));
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
          <IconButton onClick={onBack || onClose} size="small" sx={{ p: '0px !important' }}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton onClick={onClose} size="small" >
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
            Representatives
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
            3/5
          </Typography>
        </Box>
      </Box>

      {/* Form Content */}
      <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
        {/* TMC's Representatives Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: '5px', fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
            TMC's Representatives
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, fontSize: 12, color: theme.palette.customColors?.grey[8] }}>
            Set the TMC Representatives
          </Typography>

          <Grid container spacing={6}>

            {/* Business Development Manager */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ flexBasis: "35%", ml: '1rem' }}>
                  <FormControl fullWidth>
                    <Select
                      value={selectedFieldTypes.businessDevelopmentManager}
                      onChange={(e) => handleFieldTypeChange('businessDevelopmentManager', e.target.value)}
                      onOpen={() => handleDropdownOpen('fieldType_businessDevelopmentManager')}
                      onClose={() => handleDropdownClose('fieldType_businessDevelopmentManager')}
                      displayEmpty
                      IconComponent={() => <DropdownIcon isOpen={openDropdowns.fieldType_businessDevelopmentManager} />}
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
                          display: 'flex',
                          alignItems: 'center',
                        },
                      }}
                    >
                      <MenuItem value="Business Development Manager">Business Development Manager</MenuItem>
                      <MenuItem value="Relationship Manager">Relationship Manager</MenuItem>
                      <MenuItem value="Finance Consultant">Finance Consultant</MenuItem>
                      <MenuItem value="Finance Manager">Finance Manager</MenuItem>
                      <MenuItem value="Travel Manager">Travel Manager</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ flexBasis: "30%" }}>
                  <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                    Business Development Manager
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={selectedValues.businessDevelopmentManager}
                      onChange={(e) => handleValueChange('businessDevelopmentManager', e.target.value)}
                      onOpen={() => handleDropdownOpen('businessDevelopmentManager')}
                      onClose={() => handleDropdownClose('businessDevelopmentManager')}
                      displayEmpty
                      IconComponent={() => <DropdownIcon isOpen={openDropdowns.businessDevelopmentManager} />}
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
                          display: 'flex',
                          alignItems: 'center',
                        },
                      }}
                    >
                      <MenuItem value="tokita">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: '12px' }}>TY</Avatar>
                          <Typography sx={{ fontSize: '12px' }}>Tokita Yama</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="riya">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: '12px' }}>RS</Avatar>
                          <Typography sx={{ fontSize: '12px' }}>Riya Sharma</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="jack">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: '12px' }}>JJ</Avatar>
                          <Typography sx={{ fontSize: '12px' }}>Jack Jones</Typography>
                        </Box>
                      </MenuItem>
                      <Divider />
                      <MenuItem value="create" sx={{ color: theme.palette.customColors?.blue[22] }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AddIcon sx={{ fontSize: 16 }} />
                          <Typography sx={{ fontSize: '12px' }}>Create New User</Typography>
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Grid>

            {/* Relationship Manager */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ flexBasis: "35%", ml: '1rem' }}>
                  <FormControl fullWidth>
                    <Select
                      value={selectedFieldTypes.relationshipManager}
                      onChange={(e) => handleFieldTypeChange('relationshipManager', e.target.value)}
                      onOpen={() => handleDropdownOpen('fieldType_relationshipManager')}
                      onClose={() => handleDropdownClose('fieldType_relationshipManager')}
                      displayEmpty
                      IconComponent={() => <DropdownIcon isOpen={openDropdowns.fieldType_relationshipManager} />}
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
                          display: 'flex',
                          alignItems: 'center',
                        },
                      }}
                    >
                      <MenuItem value="Business Development Manager">Business Development Manager</MenuItem>
                      <MenuItem value="Relationship Manager">Relationship Manager</MenuItem>
                      <MenuItem value="Finance Consultant">Finance Consultant</MenuItem>
                      <MenuItem value="Finance Manager">Finance Manager</MenuItem>
                      <MenuItem value="Travel Manager">Travel Manager</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ flexBasis: "30%" }}>
                  <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                    Relationship Manager
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={selectedValues.relationshipManager}
                      onChange={(e) => handleValueChange('relationshipManager', e.target.value)}
                      onOpen={() => handleDropdownOpen('relationshipManager')}
                      onClose={() => handleDropdownClose('relationshipManager')}
                      displayEmpty
                      IconComponent={() => <DropdownIcon isOpen={openDropdowns.relationshipManager} />}
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
                      <MenuItem value="tokita">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: '12px' }}>TY</Avatar>
                          <Typography sx={{ fontSize: '12px' }}>Tokita Yama</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="riya">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: '12px' }}>RS</Avatar>
                          <Typography sx={{ fontSize: '12px' }}>Riya Sharma</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="jack">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: '12px' }}>JJ</Avatar>
                          <Typography sx={{ fontSize: '12px' }}>Jack Jones</Typography>
                        </Box>
                      </MenuItem>
                      <Divider />
                      <MenuItem value="create" sx={{ color: theme.palette.customColors?.blue[22] }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AddIcon sx={{ fontSize: 16 }} />
                          <Typography sx={{ fontSize: '12px' }}>Create New User</Typography>
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Grid>

            {/* Finance Consultant */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ flexBasis: "35%", ml: '1rem' }}>
                  <FormControl fullWidth>
                    <Select
                      value={selectedFieldTypes.financeConsultant}
                      onChange={(e) => handleFieldTypeChange('financeConsultant', e.target.value)}
                      onOpen={() => handleDropdownOpen('fieldType_financeConsultant')}
                      onClose={() => handleDropdownClose('fieldType_financeConsultant')}
                      displayEmpty
                      IconComponent={() => <DropdownIcon isOpen={openDropdowns.fieldType_financeConsultant} />}
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
                          display: 'flex',
                          alignItems: 'center',
                        },
                      }}
                    >
                      <MenuItem value="Business Development Manager">Business Development Manager</MenuItem>
                      <MenuItem value="Relationship Manager">Relationship Manager</MenuItem>
                      <MenuItem value="Finance Consultant">Finance Consultant</MenuItem>
                      <MenuItem value="Finance Manager">Finance Manager</MenuItem>
                      <MenuItem value="Travel Manager">Travel Manager</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ flexBasis: "30%" }}>
                  <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                    Finance Consultant
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={selectedValues.financeConsultant}
                      onChange={(e) => handleValueChange('financeConsultant', e.target.value)}
                      onOpen={() => handleDropdownOpen('financeConsultant')}
                      onClose={() => handleDropdownClose('financeConsultant')}
                      displayEmpty
                      IconComponent={() => <DropdownIcon isOpen={openDropdowns.financeConsultant} />}
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
                          display: 'flex',
                          alignItems: 'center',
                        },
                      }}
                    >
                      <MenuItem value="tokita">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: '12px' }}>TY</Avatar>
                          <Typography sx={{ fontSize: '12px' }}>Tokita Yama</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="riya">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: '12px' }}>RS</Avatar>
                          <Typography sx={{ fontSize: '12px' }}>Riya Sharma</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="jack">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: '12px' }}>JJ</Avatar>
                          <Typography sx={{ fontSize: '12px' }}>Jack Jones</Typography>
                        </Box>
                      </MenuItem>
                      <Divider />
                      <MenuItem value="create" sx={{ color: theme.palette.customColors?.blue[22] }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AddIcon sx={{ fontSize: 16 }} />
                          <Typography sx={{ fontSize: '12px' }}>Create New User</Typography>
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* My Representatives Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: '5px', fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
            My Representatives
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, fontSize: 12, color: theme.palette.customColors?.grey[8] }}>
            Set Representatives for this Organization
          </Typography>

          <Grid container spacing={10}>
            {/* Finance Manager */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ flexBasis: "35%", ml: '1rem' }}>
                  <FormControl fullWidth>
                    <Select
                      value={selectedFieldTypes.financeManager}
                      onChange={(e) => handleFieldTypeChange('financeManager', e.target.value)}
                      onOpen={() => handleDropdownOpen('fieldType_financeManager')}
                      onClose={() => handleDropdownClose('fieldType_financeManager')}
                      displayEmpty
                      IconComponent={() => <DropdownIcon isOpen={openDropdowns.fieldType_financeManager} />}
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
                          display: 'flex',
                          alignItems: 'center',
                        },
                      }}
                    >
                      <MenuItem value="Business Development Manager">Business Development Manager</MenuItem>
                      <MenuItem value="Relationship Manager">Relationship Manager</MenuItem>
                      <MenuItem value="Finance Consultant">Finance Consultant</MenuItem>
                      <MenuItem value="Finance Manager">Finance Manager</MenuItem>
                      <MenuItem value="Travel Manager">Travel Manager</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ flexBasis: "30%" }}>
                  <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                    Finance Manager
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={selectedValues.financeManager}
                      onChange={(e) => handleValueChange('financeManager', e.target.value)}
                      onOpen={() => handleDropdownOpen('financeManager')}
                      onClose={() => handleDropdownClose('financeManager')}
                      displayEmpty
                      IconComponent={() => <DropdownIcon isOpen={openDropdowns.financeManager} />}
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
                          display: 'flex',
                          alignItems: 'center',
                        },
                      }}
                    >
                      <MenuItem value="tokita">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: '12px' }}>TY</Avatar>
                          <Typography sx={{ fontSize: '12px' }}>Tokita Yama</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="riya">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: '12px' }}>RS</Avatar>
                          <Typography sx={{ fontSize: '12px' }}>Riya Sharma</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="jack">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: '12px' }}>JJ</Avatar>
                          <Typography sx={{ fontSize: '12px' }}>Jack Jones</Typography>
                        </Box>
                      </MenuItem>
                      <Divider />
                      <MenuItem value="create" sx={{ color: theme.palette.customColors?.blue[22] }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AddIcon sx={{ fontSize: 16 }} />
                          <Typography sx={{ fontSize: '12px' }}>Create New User</Typography>
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Grid>

            {/* Travel Manager */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ flexBasis: "35%", ml: '1rem' }}>
                  <FormControl fullWidth>
                    <Select
                      value={selectedFieldTypes.travelManager}
                      onChange={(e) => handleFieldTypeChange('travelManager', e.target.value)}
                      onOpen={() => handleDropdownOpen('fieldType_travelManager')}
                      onClose={() => handleDropdownClose('fieldType_travelManager')}
                      displayEmpty
                      IconComponent={() => <DropdownIcon isOpen={openDropdowns.fieldType_travelManager} />}
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
                          display: 'flex',
                          alignItems: 'center',
                        },
                      }}
                    >
                      <MenuItem value="Business Development Manager">Business Development Manager</MenuItem>
                      <MenuItem value="Relationship Manager">Relationship Manager</MenuItem>
                      <MenuItem value="Finance Consultant">Finance Consultant</MenuItem>
                      <MenuItem value="Finance Manager">Finance Manager</MenuItem>
                      <MenuItem value="Travel Manager">Travel Manager</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ flexBasis: "30%" }}>
                  <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                    Travel Manager
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={selectedValues.travelManager}
                      onChange={(e) => handleValueChange('travelManager', e.target.value)}
                      onOpen={() => handleDropdownOpen('travelManager')}
                      onClose={() => handleDropdownClose('travelManager')}
                      displayEmpty
                      IconComponent={() => <DropdownIcon isOpen={openDropdowns.travelManager} />}
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
                          display: 'flex',
                          alignItems: 'center',
                        },
                      }}
                    >
                      <MenuItem value="tokita">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: '12px' }}>TY</Avatar>
                          <Typography sx={{ fontSize: '12px' }}>Tokita Yama</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="riya">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: '12px' }}>RS</Avatar>
                          <Typography sx={{ fontSize: '12px' }}>Riya Sharma</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="jack">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: '12px' }}>JJ</Avatar>
                          <Typography sx={{ fontSize: '12px' }}>Jack Jones</Typography>
                        </Box>
                      </MenuItem>
                      <Divider />
                      <MenuItem value="create" sx={{ color: theme.palette.customColors?.blue[22] }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AddIcon sx={{ fontSize: 16 }} />
                          <Typography sx={{ fontSize: '12px' }}>Create New User</Typography>
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
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

export default RepresentativesForm; 
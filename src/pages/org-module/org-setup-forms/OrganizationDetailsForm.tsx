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
  FormHelperText,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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

interface OrganizationDetailsFormProps {
  onClose: () => void;
  onNext: () => void;
}

interface FormValues {
  legalName: string;
  displayName: string;
  country: string;
  numberOfEmployees: string;
  industryType: string;
  legalAddress: string;
  city: string;
  state: string;
  countryAddress: string;
  zipcode: string;
  latitude: string;
  longitude: string;
  billingAddress: string;
  billingCity: string;
  billingPincode: string;
  billingState: string;
  billingCountry: string;
  billingLatitude: string;
  billingLongitude: string;
}

const validationSchema = Yup.object({
  legalName: Yup.string().required('Legal name is required'),
  displayName: Yup.string().required('Display name is required'),
  country: Yup.string().required('Country is required'),
  numberOfEmployees: Yup.string(),
  industryType: Yup.string(),
  legalAddress: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  countryAddress: Yup.string(),
  zipcode: Yup.string(),
  latitude: Yup.string(),
  longitude: Yup.string(),
  billingAddress: Yup.string(),
  billingCity: Yup.string(),
  billingPincode: Yup.string(),
  billingState: Yup.string(),
  billingCountry: Yup.string(),
  billingLatitude: Yup.string(),
  billingLongitude: Yup.string(),
});

const OrganizationDetailsForm: React.FC<OrganizationDetailsFormProps> = ({
  onClose,
  onNext,
}) => {
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});

  const handleDropdownOpen = (fieldName: string) => {
    setOpenDropdowns(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleDropdownClose = (fieldName: string) => {
    setOpenDropdowns(prev => ({ ...prev, [fieldName]: false }));
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      legalName: '',
      displayName: '',
      country: '',
      numberOfEmployees: '',
      industryType: '',
      legalAddress: '',
      city: '',
      state: '',
      countryAddress: '',
      zipcode: '',
      latitude: '',
      longitude: '',
      billingAddress: '',
      billingCity: '',
      billingPincode: '',
      billingState: '',
      billingCountry: '',
      billingLatitude: '',
      billingLongitude: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onNext();
    },
  });

  const handleSameAsAbove = () => {
    formik.setValues({
      ...formik.values,
      billingAddress: formik.values.legalAddress,
      billingCity: formik.values.city,
      billingPincode: formik.values.zipcode,
      billingState: formik.values.state,
      billingCountry: formik.values.countryAddress,
      billingLatitude: formik.values.latitude,
      billingLongitude: formik.values.longitude,
    });
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
          justifyContent: 'flex-end',
          alignItems: 'center',
          mb: 2
        }}>
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
            Organization Details
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
            1/5
          </Typography>
        </Box>
      </Box>

      {/* Form Content */}
      <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>

            {/* Legal Name */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                    Legal name*
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, fontSize: 12, color: theme.palette.customColors?.grey[8] }}>
                    The officially registered name of your Organization
                  </Typography>
                </Box>
                <Box sx={{ flexBasis: "23%" }}>
                  <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                    Legal name
                  </Typography>
                  <TextField
                    fullWidth
                    id="legalName"
                    name="legalName"
                    value={formik.values.legalName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.legalName && Boolean(formik.errors.legalName)}
                    helperText={formik.touched.legalName && formik.errors.legalName}
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

            {/* Display Name */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                    Display name*
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, fontSize: 12, color: theme.palette.customColors?.grey[8] }}>
                    The display name of your Organization
                  </Typography>
                </Box>
                <Box sx={{ flexBasis: "23%" }}>
                  <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                    Display name
                  </Typography>
                  <TextField
                    fullWidth
                    id="displayName"
                    name="displayName"
                    value={formik.values.displayName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.displayName && Boolean(formik.errors.displayName)}
                    helperText={formik.touched.displayName && formik.errors.displayName}
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

            {/* Country */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                    Country*
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, fontSize: 12, color: theme.palette.customColors?.grey[8] }}>
                    The country where this Organization is registered
                  </Typography>
                </Box>
                <Box sx={{ flexBasis: "23%" }}>
                  <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                    Country
                  </Typography>
                  <FormControl
                    fullWidth
                    error={formik.touched.country && Boolean(formik.errors.country)}
                  >
                    <Select
                      id="country"
                      name="country"
                      value={formik.values.country}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      onOpen={() => handleDropdownOpen('country')}
                      onClose={() => handleDropdownClose('country')}
                      displayEmpty
                      IconComponent={() => <DropdownIcon isOpen={openDropdowns.country} />}
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
                      <MenuItem value="us">United States</MenuItem>
                      <MenuItem value="uk">United Kingdom</MenuItem>
                      <MenuItem value="in">India</MenuItem>
                      <MenuItem value="ae">United Arab Emirates</MenuItem>
                      <MenuItem value="sa">Saudi Arabia</MenuItem>
                    </Select>
                    {formik.touched.country && formik.errors.country && (
                      <FormHelperText error>{formik.errors.country}</FormHelperText>
                    )}
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
                  <Typography variant="body2" sx={{ mb: 2, fontSize: 12, color: theme.palette.customColors?.grey[8] }}>
                    Number of employees of your Organization
                  </Typography>
                </Box>
                <Box sx={{ flexBasis: "23%" }}>
                  <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                    Number of Employees
                  </Typography>
                  <TextField
                    fullWidth
                    id="numberOfEmployees"
                    name="numberOfEmployees"
                    type="number"
                    value={formik.values.numberOfEmployees}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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

            {/* Industry Type */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                    Industry type
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, fontSize: 12, color: theme.palette.customColors?.grey[8] }}>
                    Defines your organization's industry category
                  </Typography>
                </Box>
                <Box sx={{ flexBasis: "23%" }}>
                  <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                    Industry type
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      id="industryType"
                      name="industryType"
                      value={formik.values.industryType}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      onOpen={() => handleDropdownOpen('industryType')}
                      onClose={() => handleDropdownClose('industryType')}
                      displayEmpty
                      IconComponent={() => <DropdownIcon isOpen={openDropdowns.industryType} />}
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
                      <MenuItem value="technology">Technology</MenuItem>
                      <MenuItem value="finance">Finance</MenuItem>
                      <MenuItem value="healthcare">Healthcare</MenuItem>
                      <MenuItem value="manufacturing">Manufacturing</MenuItem>
                      <MenuItem value="retail">Retail</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Grid>

            {/* Addresses Section */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 500, color: theme.palette.customColors?.black[1], mt: 2 }}>
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
                  <Typography variant="body2" sx={{ mb: 2, fontSize: 12, color: theme.palette.customColors?.grey[8] }}>
                    The officially registered address of your Organization
                  </Typography>
                </Box>
                <Box sx={{ flexBasis: "35%" }}>
                  <Typography variant="body2" sx={{ mb: 1, fontSize: 10, fontWeight: 400, color: '#999999' }}>
                    Address
                  </Typography>
                  <TextField
                    fullWidth
                    id="legalAddress"
                    name="legalAddress"
                    value={formik.values.legalAddress}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                      id="city"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      onOpen={() => handleDropdownOpen('city')}
                      onClose={() => handleDropdownClose('city')}
                      displayEmpty
                      IconComponent={() => <DropdownIcon isOpen={openDropdowns.city} />}
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
                      <MenuItem value="new-york">New York</MenuItem>
                      <MenuItem value="london">London</MenuItem>
                      <MenuItem value="mumbai">Mumbai</MenuItem>
                      <MenuItem value="dubai">Dubai</MenuItem>
                      <MenuItem value="riyadh">Riyadh</MenuItem>
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
                      id="state"
                      name="state"
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      onOpen={() => handleDropdownOpen('state')}
                      onClose={() => handleDropdownClose('state')}
                      displayEmpty
                      IconComponent={() => <DropdownIcon isOpen={openDropdowns.state} />}
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
                      <MenuItem value="california">California</MenuItem>
                      <MenuItem value="texas">Texas</MenuItem>
                      <MenuItem value="florida">Florida</MenuItem>
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
                      id="countryAddress"
                      name="countryAddress"
                      value={formik.values.countryAddress}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      onOpen={() => handleDropdownOpen('countryAddress')}
                      onClose={() => handleDropdownClose('countryAddress')}
                      displayEmpty
                      IconComponent={() => <DropdownIcon isOpen={openDropdowns.countryAddress} />}
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
                      <MenuItem value="us">United States</MenuItem>
                      <MenuItem value="uk">United Kingdom</MenuItem>
                      <MenuItem value="in">India</MenuItem>
                      <MenuItem value="ae">United Arab Emirates</MenuItem>
                      <MenuItem value="sa">Saudi Arabia</MenuItem>
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
                    id="zipcode"
                    name="zipcode"
                    value={formik.values.zipcode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                    id="latitude"
                    name="latitude"
                    type="number"
                    value={formik.values.latitude}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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

                {/* Longitude */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                    Longitude
                  </Typography>
                  <TextField
                    fullWidth
                    id="longitude"
                    name="longitude"
                    type="number"
                    value={formik.values.longitude}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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

            {/* Billing Address Section */}
            <Grid item xs={12} sx={{ pt: "36px !important" }}>
              <Box display='flex' justifyContent='space-between' alignItems='flex-start'>
                <Box display='flex' flexDirection='column'>
                  <Typography variant="body2" sx={{ mb: 1, fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                    Billing address
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 400, color: theme.palette.customColors?.grey[8], }}>
                    The billing address of your Organization
                  </Typography>

                </Box>
                <Button
                  variant="text"
                  onClick={handleSameAsAbove}
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
                    id="billingAddress"
                    name="billingAddress"
                    value={formik.values.billingAddress}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                      id="billingCity"
                      name="billingCity"
                      value={formik.values.billingCity}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      onOpen={() => handleDropdownOpen('billingCity')}
                      onClose={() => handleDropdownClose('billingCity')}
                      displayEmpty
                      IconComponent={() => <DropdownIcon isOpen={openDropdowns.billingCity} />}
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
                      <MenuItem value="new-york">New York</MenuItem>
                      <MenuItem value="london">London</MenuItem>
                      <MenuItem value="mumbai">Mumbai</MenuItem>
                      <MenuItem value="dubai">Dubai</MenuItem>
                      <MenuItem value="riyadh">Riyadh</MenuItem>
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
                      id="billingState"
                      name="billingState"
                      value={formik.values.billingState}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      onOpen={() => handleDropdownOpen('billingState')}
                      onClose={() => handleDropdownClose('billingState')}
                      displayEmpty
                      IconComponent={() => <DropdownIcon isOpen={openDropdowns.billingState} />}
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
                      <MenuItem value="california">California</MenuItem>
                      <MenuItem value="texas">Texas</MenuItem>
                      <MenuItem value="florida">Florida</MenuItem>
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
                      id="billingCountry"
                      name="billingCountry"
                      value={formik.values.billingCountry}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      onOpen={() => handleDropdownOpen('billingCountry')}
                      onClose={() => handleDropdownClose('billingCountry')}
                      displayEmpty
                      IconComponent={() => <DropdownIcon isOpen={openDropdowns.billingCountry} />}
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
                      <MenuItem value="us">United States</MenuItem>
                      <MenuItem value="uk">United Kingdom</MenuItem>
                      <MenuItem value="in">India</MenuItem>
                      <MenuItem value="ae">United Arab Emirates</MenuItem>
                      <MenuItem value="sa">Saudi Arabia</MenuItem>
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
                    id="billingPincode"
                    name="billingPincode"
                    value={formik.values.billingPincode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                    id="billingLatitude"
                    name="billingLatitude"
                    type="number"
                    value={formik.values.billingLatitude}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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

                {/* Billing Longitude */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                    Longitude
                  </Typography>
                  <TextField
                    fullWidth
                    id="billingLongitude"
                    name="billingLongitude"
                    type="number"
                    value={formik.values.billingLongitude}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
          </Grid>
        </form>
      </Box>

      {/* Footer Actions */}
      <Box sx={{
        p: '15px 40px',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 2
      }}>
        <Button
          variant="contained"
          onClick={() => formik.handleSubmit()}
          disabled={!formik.isValid || formik.isSubmitting}
          sx={{
            textTransform: 'none',
            backgroundColor: theme.palette.customColors?.blue[22],
            '&:hover': {
              backgroundColor: theme.palette.customColors?.blue[22],
            },
            '&:disabled': {
              backgroundColor: '#E0E0E0',
              color: '#9E9E9E',
            }
          }}
        >
          Save & Next
        </Button>
      </Box>
    </Box>
  );
};

export default OrganizationDetailsForm; 
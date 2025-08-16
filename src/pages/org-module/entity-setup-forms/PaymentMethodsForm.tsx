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
  SelectChangeEvent,
} from '@mui/material';
import { Close as CloseIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { theme } from '../../../theme';
import CustomSwitch from '../../../components/core-module/custom-switch/CustomSwitch';

interface PaymentMethodsFormProps {
  onClose: () => void;
  onNext: () => void;
  onBack?: () => void;
}

const PaymentMethodsForm: React.FC<PaymentMethodsFormProps> = ({
  onClose,
  onNext,
  onBack,
}) => {
  const [creditCardEnabled, setCreditCardEnabled] = useState(false);
  const [prepayWalletEnabled, setPrepayWalletEnabled] = useState(false);
  const [postPayEnabled, setPostPayEnabled] = useState(false);
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [shareableWithEmployees, setShareableWithEmployees] = useState(false);
  const [applicability, setApplicability] = useState('All Employees');

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
            Payment Methods
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
            5/8
          </Typography>
        </Box>
      </Box>

      {/* Form Content */}
      <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
        <Grid container spacing={3}>
          
          {/* Credit Card Section */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="body2" sx={{ fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                Credit Card
              </Typography>
              <CustomSwitch
                checked={creditCardEnabled}
                onChange={(e) => setCreditCardEnabled(e.target.checked)}
                sx={{ mr: '-13px' }}
              />
            </Box>

            {/* Credit Card Details - Only show when enabled */}
            {creditCardEnabled && (
              <Box sx={{ ml: 2, mb: 3 }}>
                {/* Cardholder Name */}
                <Grid item xs={12} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ flexBasis: "55%" }}>
                      <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400,}}>
                        Cardholder Name
                      </Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        placeholder="Add Cardholder Name"
                        size="small"
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

                {/* Card Number */}
                <Grid item xs={12} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ flexBasis: "55%" }}>
                      <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400,}}>
                        Card Number
                      </Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="Add Card Number"
                        size="small"
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

                {/* Expiration Date and Security Code - Side by Side */}
                <Grid item xs={12} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ flexBasis: "55%" }}>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400,}}>
                            Expiration Date
                          </Typography>
                          <TextField
                            fullWidth
                            variant="outlined"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                            placeholder="Add Expiration Date"
                            size="small"
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
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, }}>
                            Security Code
                          </Typography>
                          <TextField
                            fullWidth
                            variant="outlined"
                            value={securityCode}
                            onChange={(e) => setSecurityCode(e.target.value)}
                            placeholder="Add Security Code"
                            size="small"
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
                    </Box>
                  </Box>
                </Grid>

                {/* Shareable with Employees */}
                <Grid item xs={12} sx={{ mb: 2, mt:"2rem" }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml:"1rem" }}>
                    <Box>
                      <Typography variant="body2" sx={{ mb: 1, fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                        Shareable with Employees
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: 12, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                        Sets the shareability of this Card for the Entity's employees
                      </Typography>
                    </Box>
                    <CustomSwitch
                      checked={shareableWithEmployees}
                      onChange={(e) => setShareableWithEmployees(e.target.checked)}
                      sx={{ mr: '-13px' }}
                    />
                  </Box>
                </Grid>

                {/* Applicability */}
                <Grid item xs={12} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml:"2rem" }}>
                    <Box>
                      <Typography variant="body2" sx={{ mb: 1, fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                        Applicability*
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: 12, fontWeight: 400, color: theme.palette.customColors?.grey[8] }}>
                        Sets the User Segment who can use this card
                      </Typography>
                    </Box>
                    <Box sx={{ flexBasis: "35%" }}>
                      <Typography variant="body2" sx={{ mb: '5px', fontSize: 10, fontWeight: 400, color: '#999999' }}>
                        Applicability
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          value={applicability}
                          onChange={(e: SelectChangeEvent) => setApplicability(e.target.value)}
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
                          <MenuItem value="All Employees" sx={{ fontSize: '14px', fontWeight: 400 }}>All Employees</MenuItem>
                          <MenuItem value="Managers Only" sx={{ fontSize: '14px', fontWeight: 400 }}>Managers Only</MenuItem>
                          <MenuItem value="Specific Departments" sx={{ fontSize: '14px', fontWeight: 400 }}>Specific Departments</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>

                {/* Add Another Card */}
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="text"
                    sx={{
                      color: theme.palette.customColors?.blue[22],
                      textTransform: 'none',
                      fontSize: '14px',
                      fontWeight: 400,
                      p: 0,
                      '&:hover': {
                        backgroundColor: 'transparent',
                        textDecoration: 'underline',
                      }
                    }}
                  >
                    + Add Another Card
                  </Button>
                </Grid>
              </Box>
            )}
          </Grid>

          {/* Pre-pay (Wallet) Section */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="body2" sx={{ fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                Pre-pay (Wallet)
              </Typography>
              <CustomSwitch
                checked={prepayWalletEnabled}
                onChange={(e) => setPrepayWalletEnabled(e.target.checked)}
                sx={{ mr: '-13px' }}
              />
            </Box>
          </Grid>

          {/* Post Pay Section */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="body2" sx={{ fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>
                Post Pay
        </Typography>
              <CustomSwitch
                checked={postPayEnabled}
                onChange={(e) => setPostPayEnabled(e.target.checked)}
                sx={{ mr: '-13px' }}
              />
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
          Skip
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

export default PaymentMethodsForm; 
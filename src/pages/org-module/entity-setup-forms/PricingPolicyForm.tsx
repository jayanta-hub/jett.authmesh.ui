import React from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon, ArrowBack as ArrowBackIcon, Info as InfoIcon } from '@mui/icons-material';
import CustomAddIcon from '../../../assets/icons/CustomAddIcon';
import { theme } from '../../../theme';

interface PricingPolicyFormProps {
  onClose: () => void;
  onNext: () => void;
  onBack?: () => void;
}

const PricingPolicyForm: React.FC<PricingPolicyFormProps> = ({
  onClose,
  onNext,
  onBack,
}) => {
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
            Pricing Policy
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
            8/13
          </Typography>
        </Box>
      </Box>

      {/* Form Content */}
      <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
        {/* Informational Banner */}
        <Box sx={{
          backgroundColor: '#FFF8E1',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }}>
          <InfoIcon sx={{
            color: theme.palette.customColors?.blue[22] || '#0083FF',
            fontSize: '20px',
            mt: '2px'
          }} />
          <Typography
            variant="body2"
            sx={{
              fontSize: '14px',
              fontWeight: 400,
              color: theme.palette.customColors?.black[1] || '#000000',
              lineHeight: '20px'
            }}
          >
            Pricing Policy for this Entity is governed by its Market's default Pricing Policy. Create{' '}
            <Typography
              component="span"
              sx={{
                color: theme.palette.customColors?.blue[22] || '#0083FF',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
              onClick={() => {
                // Handle "New Policy" link click
                console.log('Create new pricing policy');
              }}
            >
              New Policy
            </Typography>
            {' '}to override specific policies
          </Typography>
        </Box>

        {/* New Pricing Policy Button */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1
        }}>
          <Button
            variant="contained"
            startIcon={<CustomAddIcon />}
            onClick={() => {
              // Handle new pricing policy creation
              console.log('Create new pricing policy');
            }}
            sx={{
              backgroundColor: theme.palette.customColors?.blue[22] || '#0083FF',
              color: '#FFFFFF',
              fontSize: '14px',
              textTransform: 'none',
              borderRadius: '8px',
              padding: '0px 15px',
              height: '40px',
              '&:hover': {
                backgroundColor: theme.palette.customColors?.blue[22] || '#0083FF',
              }
            }}
          >
            New Pricing Policy
          </Button>
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
            fontSize: '14px',
            textTransform: 'none',
            borderColor: theme.palette.customColors?.blue[22] || '#0083FF',
            color: theme.palette.customColors?.blue[22] || '#0083FF',
            '&:hover': {
              borderColor: theme.palette.customColors?.blue[22] || '#0083FF',
              backgroundColor: theme.palette.customColors?.blue[24] || '#D9EDFF',
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
            backgroundColor: theme.palette.customColors?.blue[22] || '#0083FF',
            '&:hover': {
              backgroundColor: theme.palette.customColors?.blue[22] || '#0083FF',
            }
          }}
        >
          Save & Next
        </Button>
      </Box>
    </Box>
  );
};

export default PricingPolicyForm; 
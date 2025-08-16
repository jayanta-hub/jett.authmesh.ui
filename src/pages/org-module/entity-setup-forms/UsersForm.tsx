import React from 'react';
import {
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { theme } from '../../../theme';

interface UsersFormProps {
  onClose: () => void;
  onNext: () => void;
  onBack?: () => void;
}

const UsersForm: React.FC<UsersFormProps> = ({
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
            Users
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
            4/13
          </Typography>
        </Box>
      </Box>

      {/* Form Content */}
      <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
        <Typography variant="body1" sx={{ color: theme.palette.customColors?.grey[8] }}>
          Users form content will be added here...
        </Typography>
      </Box>

      {/* Footer Actions */}
      <Box sx={{
        p: '15px 40px',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 2
      }}>
        <Typography variant="body2" sx={{ color: theme.palette.customColors?.grey[8] }}>
          Footer actions will be added here...
        </Typography>
      </Box>
    </Box>
  );
};

export default UsersForm; 
import React from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Divider,
} from '@mui/material';
import { Close as CloseIcon, ArrowBack as ArrowBackIcon, Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
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
        p: 3,
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
              color: theme.palette.customColors?.grey[8],
              backgroundColor: '#D9EDFF',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px'
            }}
          >
            4/5
          </Typography>
        </Box>
      </Box>

      {/* Form Content */}
      <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
        <Typography variant="body2" sx={{ mb: 3, color: theme.palette.customColors?.grey[8] }}>
          Manage users for your organization.
        </Typography>

        {/* Add User Button */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            mb: 3,
            backgroundColor: theme.palette.customColors?.blue[22],
            '&:hover': {
              backgroundColor: theme.palette.customColors?.blue[22],
            }
          }}
        >
          Add New User
        </Button>

        {/* Users List */}
        <List sx={{ width: '100%' }}>
          {/* User 1 */}
          <ListItem alignItems="center" sx={{ px: 0 }}>
            <ListItemAvatar>
              <Avatar sx={{ width: 48, height: 48 }}>JD</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="John Doe"
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    john.doe@company.com
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Chip label="Admin" size="small" color="primary" />
                    <Chip label="Active" size="small" color="success" />
                  </Box>
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" size="small">
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <Divider variant="inset" component="li" />

          {/* User 2 */}
          <ListItem alignItems="center" sx={{ px: 0 }}>
            <ListItemAvatar>
              <Avatar sx={{ width: 48, height: 48 }}>JS</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Jane Smith"
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    jane.smith@company.com
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Chip label="Manager" size="small" color="secondary" />
                    <Chip label="Active" size="small" color="success" />
                  </Box>
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" size="small">
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <Divider variant="inset" component="li" />

          {/* User 3 */}
          <ListItem alignItems="center" sx={{ px: 0 }}>
            <ListItemAvatar>
              <Avatar sx={{ width: 48, height: 48 }}>MJ</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Mike Johnson"
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    mike.johnson@company.com
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Chip label="User" size="small" color="default" />
                    <Chip label="Inactive" size="small" color="error" />
                  </Box>
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" size="small">
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <Divider variant="inset" component="li" />

          {/* User 4 */}
          <ListItem alignItems="center" sx={{ px: 0 }}>
            <ListItemAvatar>
              <Avatar sx={{ width: 48, height: 48 }}>SW</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Sarah Wilson"
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    sarah.wilson@company.com
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Chip label="User" size="small" color="default" />
                    <Chip label="Active" size="small" color="success" />
                  </Box>
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" size="small">
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Box>

      {/* Footer Actions */}
      <Box sx={{
        p: 3,
        borderTop: '1px solid #E0E0E0',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 2
      }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
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

export default UsersForm; 
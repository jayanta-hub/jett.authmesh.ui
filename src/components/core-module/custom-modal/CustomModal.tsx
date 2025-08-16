import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string | number;
  maxWidth?: string | number;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  children,
  width = '400px',
  maxWidth = '90%',
  showCloseButton = true,
  closeOnOverlayClick = true,
}) => {
  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
      onClick={handleOverlayClick}
    >
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '32px',
          width: width,
          maxWidth: maxWidth,
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {showCloseButton && (
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              color: '#000000',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
        {children}
      </Box>
    </Box>
  );
};

export default CustomModal; 
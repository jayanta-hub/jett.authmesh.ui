import { Box, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import Container from '../../components/core-module/container/Container';
import { theme } from '../../theme';
import CreateApprovalWorkflow from './level/CreateApprovalWorkflow';
import Listing from './listing/Listing';

export default function ApprovalWorkflow() {
  const [isLevelDrawerOpen, setIsLevelDrawerOpen] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container>
      <Box sx={{ maxWidth: isMobileView ? '100%' : 1080, m: 'auto', px: { xs: "1.5rem", md: "0" } }}>
        <Listing setIsCreated={setIsCreated} isCreated={isCreated} setIsLevelDrawerOpen={setIsLevelDrawerOpen} setIsEditMode={setIsEditMode} />
        <CreateApprovalWorkflow setIsCreated={setIsCreated} setIsLevelDrawerOpen={setIsLevelDrawerOpen} isLevelDrawerOpen={isLevelDrawerOpen} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
      </Box>
    </Container>
  )
}

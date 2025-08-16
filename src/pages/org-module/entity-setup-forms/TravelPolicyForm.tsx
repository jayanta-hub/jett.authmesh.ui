import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Close as CloseIcon, ArrowBack as ArrowBackIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import CustomAddIcon from '../../../assets/icons/CustomAddIcon';
import { theme } from '../../../theme';
import CustomSwitch from '../../../components/core-module/custom-switch/CustomSwitch';
import { useFetchTravelPolicyListMutation, usePolicyStatusUpdateMutation } from '../../../store/musafirTravelPolicyApi';
import { TravelPolicyProps } from '../../../utility/types/travel-policy/TravelPolicy';

interface TravelPolicyFormProps {
  onClose: () => void;
  onNext: () => void;
  onBack?: () => void;
}

const TravelPolicyForm: React.FC<TravelPolicyFormProps> = ({
  onClose,
  onNext,
  onBack,
}) => {
  const [policyList, setPolicyList] = useState<TravelPolicyProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API hooks
  const [fetchTravelPolicyList] = useFetchTravelPolicyListMutation();
  const [updatePolicyStatus] = usePolicyStatusUpdateMutation();

  // Dummy data for fallback
  const dummyPolicies: TravelPolicyProps[] = [
    {
      TravelPolicyId: "policy-001",
      Name: "Info Tech policy for All Employees",
      UserSegmentId: "*",
      UserSegmentName: "All Employees",
      InPolicy: true,
      HideOutOfPolicy: false,
      BookOutOfPolicyOption: "ALLOW",
      ApprovalWorkflowId: "",
      ApprovalWorkflowName: "",
      IsDefault: true,
      PolicyConstraints: [
        {
          PolicyConstraintId: "constraint-001",
          PolicyConstraintName: "Budget Constraint",
          Name: "Budget Constraint",
          Rules: []
        }
      ],
      CreatedBy: "admin",
      CreatedDate: "2024-01-01",
      ModifiedBy: "admin",
      ModifiedDate: "2024-01-01",
      Status: "ACTIVE"
    },
    {
      TravelPolicyId: "policy-002",
      Name: "Executive Travel Policy",
      UserSegmentId: "exec-001",
      UserSegmentName: "Executives",
      InPolicy: true,
      HideOutOfPolicy: true,
      BookOutOfPolicyOption: "DENY",
      ApprovalWorkflowId: "workflow-001",
      ApprovalWorkflowName: "ExecutiveApproval",
      IsDefault: false,
      PolicyConstraints: [
        {
          PolicyConstraintId: "constraint-002",
          PolicyConstraintName: "Class of Travel",
          Name: "Class of Travel",
          Rules: []
        }
      ],
      CreatedBy: "admin",
      CreatedDate: "2024-01-02",
      ModifiedBy: "admin",
      ModifiedDate: "2024-01-02",
      Status: "ACTIVE"
    }
  ];

  const fetchTravelPolicies = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const payload = {
        pageNumber: 1,
        pageSize: 10,
        searchText: "",
      };
      
      const response = await fetchTravelPolicyList(payload);
      
      if (response?.data?.Context?.StatusCode === 2101) {
        setPolicyList(response.data?.Response?.Data || []);
      } else if (response?.error?.data?.Context?.StatusCode === 2103) {
        setPolicyList([]);
        setError('No policies found');
      } else {
        // If API fails, use dummy data
        setPolicyList(dummyPolicies);
        setError('Using sample data');
      }
    } catch {
      // If API fails, use dummy data
      setPolicyList(dummyPolicies);
      setError('Using sample data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (policyIds: string[], newStatus: 'ACTIVE' | 'INACTIVE') => {
    try {
      await updatePolicyStatus({
        TravelPolicyIds: policyIds,
        Status: newStatus
      });
      // Refresh the list
      fetchTravelPolicies();
    } catch (error) {
      console.error('Failed to update policy status:', error);
    }
  };

  useEffect(() => {
    fetchTravelPolicies();
  }, []);

  const removeBracketedText = (text: string) => {
    return text.replace(/\[.*?\]/g, '').trim();
  };

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
            Travel Policy
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
            6/13
          </Typography>
        </Box>
      </Box>

      {/* Form Content */}
      <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
        {/* New Policy Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<CustomAddIcon />}
            onClick={() => {
              // Handle new policy creation
              console.log('Create new policy');
            }}
            sx={{
              backgroundColor: theme.palette.customColors?.blue[22],
              color: '#FFFFFF',
              fontSize: '14px',
              textTransform: 'none',
              borderRadius: '6px',
              padding: '8px 15px',
              '&:hover': {
                backgroundColor: theme.palette.customColors?.blue[22],
              }
            }}
            size="small"
          >
            New Policy
          </Button>
        </Box>

        {/* Loading State */}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
            <CircularProgress size={24} />
            <Typography variant="body2" sx={{ ml: 2, color: theme.palette.customColors?.grey[8] }}>
              Loading policies...
            </Typography>
          </Box>
        )}

        {/* Policy List */}
        {!isLoading && policyList.length > 0 && (
          <Box>
            {policyList.map((policy) => (
              <Box
                key={policy?.TravelPolicyId}
                sx={{
                  position: 'relative',
                  mb: 2,
                  border: `1px solid ${theme.palette.customColors?.lightGray?.[12] || '#E0E0E0'}`,
                  borderRadius: "15px",
                  backgroundColor: policy?.IsDefault ? theme.palette.customColors?.blue?.[11] || '#F8FBFF' : theme.palette.customColors?.white?.[0] || '#FFFFFF',
                  py: "0.5rem",
                  px: { xs: '0.5rem', md: "1.2rem" },
                }}
              >
                {/* Default Ribbon */}
                {policy?.IsDefault && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: 0,
                      borderTop: { xs: `35px solid ${theme.palette.customColors?.yellow?.[11] || '#FFD700'}`, md: `55px solid ${theme.palette.customColors?.yellow?.[11] || '#FFD700'}` },
                      borderRight: { xs: '40px solid transparent', md: '55px solid transparent' },
                      zIndex: 2,
                      borderRadius: "15px 0",
                      filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3))',
                    }}
                  >
                    <Typography
                      sx={{
                        position: 'absolute',
                        top: { xs: -26, md: -43 },
                        left: 1,
                        transform: 'rotate(-45deg)',
                        fontSize: { xs: '6px', md: "10px" },
                        fontWeight: '400',
                        color: theme.palette.customColors?.black?.[1] || '#000000',
                        textAlign: 'center',
                      }}
                    >
                      Default
                    </Typography>
                  </Box>
                )}

                {/* Policy Header */}
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  ml: "25px",
                  justifyContent: "space-between",
                  mt: "5px"
                }}>
                  <Typography fontWeight={600} fontSize="18px">
                    {policy?.Name}
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{
                      color: theme.palette.customColors?.grey?.[8] || '#666666',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.04)',
                      }
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                {/* Policy Details */}
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    ml: "25px",
                    pb: "0.5rem",
                    mt: "0.5rem"
                  }}>
                    <Typography variant="body2" sx={{ color: theme.palette.customColors?.lightGray?.[15] || '#666666', fontSize: "12px" }} mt={1}>
                      Applicable for <span style={{ fontWeight: "500", color: theme.palette.customColors?.black?.[1] || '#000000', fontSize: "12px" }}>
                        {policy?.UserSegmentId === "*" ? "All Employees" : policy?.UserSegmentName}
                      </span>
                    </Typography>
                    
                    <Typography variant="body2" sx={{ color: theme.palette.customColors?.lightGray?.[15] || '#666666', fontSize: "12px" }} mt={1}>
                      Based on <span style={{ fontWeight: "500", color: theme.palette.customColors?.black?.[1] || '#000000', fontSize: "12px" }}>
                        {policy?.PolicyConstraints?.map(constraint => removeBracketedText(constraint?.Name ?? ""))?.join(', ') || 'Everything'}
                      </span>
                    </Typography>
                    
                    {policy?.ApprovalWorkflowName ? (
                      <Typography variant="body2" sx={{ color: theme.palette.customColors?.lightGray?.[15] || '#666666', fontSize: "12px" }} mt={1}>
                        Related with approval process <span style={{ fontWeight: "500", color: theme.palette.customColors?.black?.[1] || '#000000' }}>
                          {policy?.ApprovalWorkflowName?.replace(/([A-Z][a-z0-9]*)(?=[A-Z])/g, '$1 ')}
                        </span>
                      </Typography>
                    ) : (
                      <Typography variant="body2" sx={{ color: theme.palette.customColors?.lightGray?.[15] || '#666666', fontSize: "12px" }} mt={1}>
                        <span style={{ fontWeight: "500", color: theme.palette.customColors?.black?.[1] || '#000000' }}>No approval process</span> selected
                      </Typography>
                    )}
                  </Box>

                  {/* Policy Status */}
                  <Box sx={{ display: "flex", alignItems: "flex-end", mr: "1rem", pb: "0.5rem", mt: "0.8rem" }}>
                    <Typography sx={{
                      fontSize: "10px",
                      p: 0,
                      m: 0
                    }}>
                      {(policy?.Status === "ACTIVE") ? "Active" : "Inactive"}
                    </Typography>
                    <CustomSwitch 
                      disabled={policy?.IsDefault}
                      onClick={() => {
                        handleStatusChange([policy?.TravelPolicyId], policy?.Status === "ACTIVE" ? "INACTIVE" : "ACTIVE");
                      }}
                      checked={policy?.Status === "ACTIVE"} 
                      sx={{ ml: '5px' }} 
                      size='small' 
                    />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* No Policies Found */}
        {!isLoading && policyList.length === 0 && (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            py: 8 
          }}>
            <Typography variant="body2" sx={{ color: theme.palette.customColors?.grey?.[8] || '#666666', textAlign: 'center' }}>
              No travel policies found
            </Typography>
          </Box>
        )}
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

export default TravelPolicyForm; 
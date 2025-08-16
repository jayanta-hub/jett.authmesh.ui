import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, IconButton, InputAdornment, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useMediaQuery } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import Activate from '../../../../assets/icons/Activate.svg';
import ActivateBlueIcon from '../../../../assets/icons/ActivateBlueIcon.svg';
import ArchieveIcon from '../../../../assets/images/ArchieveIcon.svg';
import ArchieveIconActive from '../../../../assets/images/ArchieveIconActive.svg';
import DeactivateIcon from '../../../../assets/images/DeactivateIcon.svg';
import DeactivateIconActive from '../../../../assets/images/DeactivateIconActive.svg';
import EditIconActive from '../../../../assets/images/EditIconActive.svg';
import EditIcon from '../../../../assets/images/EditIconGrey.svg';
import FilterIcon from '../../../../assets/images/filterIcon.svg';
import SearchIcon from '../../../../assets/images/SearchIcon.svg';
import CustomDrawer from '../../../../components/core-module/custom-drawer/CustomDrawer';
import { useGetPricingPolicyByIdMutation } from '../../../../store/musafirPricingPolicyApi';
import { theme } from "../../../../theme";
import { SearchSectionProps } from '../../../../utility/types/policy-listing/PolicyListing';
import { onConflictProps } from '../../../../utility/types/pricing-policy/PricingPolicy';
import showAlertDialog from '../../../../utility/widgets/AlertDialog';
import CreatePricingPolicy from './create-pricing-policy/CreatePricingPolicy';

const SearchSection: React.FC<SearchSectionProps> = ({
  selectedRows = [],
  onDeactivate,
  onArchive,
  onActivate,
  searchText = "",
  onSearchChange,
  onPolicyCreated,
  triggerEdit,
  onTriggerEditReset,
  menuEditPolicyId,
  isEditMode,
  setIsEditMode,
  selectedPolicyId,
  setSelectedPolicyId,
  createStep,
  setCreateStep,
  openCreate,
  setOpenCreate,
  setPolicyCreated
}) => {
  const [filter, setFilter] = useState<string>("");
  const isMobileView = useMediaQuery(theme?.breakpoints?.down("sm"));
  const [conflictInfo, setConflictInfo] = useState<null | onConflictProps>(null);
  const [getPolicyById] = useGetPricingPolicyByIdMutation();
  const [conflictPolicyDetailsList, setConflictPolicyDetailsList] = useState([]);
  const [conflictPoliciesLoading, setConflictPoliciesLoading] = useState(false);
  const [selectedPolicyIds, setSelectedPolicyIds] = useState<string[]>([]);
  const hasSelectedRows = selectedRows.length > 0;
  const allSelectedRowsActive = hasSelectedRows && selectedRows?.every(row => row.status === 'Active');
  const allSelectedRowsInactive = hasSelectedRows && selectedRows?.every(row => row.status === 'Inactive');
  const anySelectedRows = hasSelectedRows;
  const isMixedSelection = hasSelectedRows && !(allSelectedRowsActive || allSelectedRowsInactive);

  const getButtonStyle = (enabled: boolean) => ({
    bgcolor: enabled ? theme?.palette?.customColors?.white?.[0] : theme?.palette?.customColors?.grey?.[10],
    color: enabled ? theme?.palette?.customColors?.blue?.[10] : theme?.palette?.customColors?.grey?.[13],
    border: enabled ? `1px solid ${theme?.palette?.customColors?.blue?.[10]}` : `1px solid ${theme?.palette?.customColors?.grey?.[10]}`,
    boxShadow: 'none',
    textTransform: 'none' as const,
    '&:hover': {
      boxShadow: 'none'
    }
  });

  const resetCreateState = () => {
    setOpenCreate(false);
    setCreateStep(1);
    setIsEditMode(false);
    setSelectedPolicyId('');
    setConflictInfo(null);
  };

  const handleFormCancel = async () => {
    const confirmed = await showAlertDialog(
      'Alert',
      'Are you sure you want to cancel? All unsaved changes will be discarded.'
    );
    if (confirmed) resetCreateState();
  };

  const handleDrawerClose = () => {
    setOpenCreate(false);
    setCreateStep(1);
    setIsEditMode(false);
    setSelectedPolicyId('');
    setConflictInfo(null);
  };

  const handleEditClick = () => {
    if (selectedRows.length === 1) {
      setIsEditMode(true);
      setSelectedPolicyId(selectedRows[0]?.id);
      setSelectedPolicyIds([]);
      setCreateStep(1);
    } else if (selectedRows.length > 1) {
      setIsEditMode(false);
      setSelectedPolicyId('');
      setSelectedPolicyIds(selectedRows.map(row => row?.id));
      setCreateStep(4);
    }
    setOpenCreate(true);
  };

  useEffect(() => {
    if (triggerEdit) {
      if (menuEditPolicyId) {
        setIsEditMode(true);
        setSelectedPolicyId(menuEditPolicyId);
        setCreateStep(1);
        setOpenCreate(true);
      } else if (selectedRows.length === 1) {
        setIsEditMode(true);
        setSelectedPolicyId(selectedRows[0].id);
        setCreateStep(1);
        setOpenCreate(true);
      }
      setTimeout(() => {
        if (onTriggerEditReset) {
          onTriggerEditReset();
        }
      }, 100);
    }
  }, [triggerEdit, selectedRows, menuEditPolicyId, onTriggerEditReset]);

  const firstPolicy = conflictPolicyDetailsList[0];
  const additionalCount = conflictPolicyDetailsList.length - 1;
  let conflictMessage = 'existing policies';

  const hasValidFirstPolicy = firstPolicy?.PricingPolicyName && firstPolicy?.PricingPolicyId;

  if (hasValidFirstPolicy) {
    const base = `${firstPolicy.PricingPolicyName} (${firstPolicy.PricingPolicyId})`;

    conflictMessage = conflictPolicyDetailsList.length > 1
      ? `${base} and ${additionalCount} other policies`
      : base;
  }

  return (
    <Box >
      {isMobileView && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0, }}>
          <Box>
            <Typography sx={{
              color: 'text.primary', fontWeight: 600,
              fontSize: isMobileView ? "16px" : "30px",
              fontStyle: 'Poppins', mt: '18px', mb: '15px'
            }}>Pricing Policy</Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: theme?.palette?.customColors?.blue?.[10],
                textTransform: "none",
                fontSize: isMobileView ? "12px" : "14px",
                fontFamily: "Poppins, sans-serif"
              }}
              onClick={() => {
                setIsEditMode(false);
                setSelectedPolicyId('');
                setCreateStep(1);
                setOpenCreate(true);
              }}
              startIcon={<AddCircleOutlineIcon />}
            >
              New Policy
            </Button>
          </Box>
        </Box>
      )}
      <Box sx={{
        display: 'flex',
        flexDirection: isMobileView ? 'column' : 'row',
        gap: 2,
        mb: 2,
        alignItems: isMobileView ? 'stretch' : 'center',
        justifyContent: 'space-between',
      }}>
        <TextField
          placeholder="Search Pricing Policies or Search by Date of Creation by From: (Date) To: (Date)"
          size="small"
          value={searchText}
          onChange={(e) => onSearchChange?.(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <img src={SearchIcon} alt="Search" style={{ width: 13, height: 13 }} />
                </InputAdornment>
              ),
            }
          }}
          sx={{
            flex: 1, maxWidth: 578,
            '& .MuiInputBase-input::placeholder': {
              color: theme?.palette?.customColors?.grey?.[12],
              opacity: 1,
              fontSize: '12px'
            },
            '& .MuiOutlinedInput-root': {
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme?.palette?.customColors?.white[24],
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme?.palette?.customColors?.white[24],
                borderWidth: "1px",
              },
            },
          }}
        />
        {!isMobileView && <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: theme?.palette?.customColors?.blue?.[10],
            textTransform: "none",
            fontSize: isMobileView ? "12px" : "14px",
            fontFamily: "Poppins, sans-serif",
            width: "130px"
          }}
          onClick={() => {
            setIsEditMode(false);
            setSelectedPolicyId('');
            setCreateStep(1);
            setOpenCreate(true);
          }}
          startIcon={<AddCircleOutlineIcon />}
        >
          New Policy
        </Button>}
      </Box>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', marginTop: "1.2rem" }}>
        {isMobileView ? (
          <IconButton
            size="small"
            sx={{
              border: '1px solid rgba(0, 0, 0, 0.12)',
              borderRadius: 1,
              padding: '4px',
              width: 36,
              height: 36,
            }}
          >
            <img src={FilterIcon} alt="Filter" style={{ width: 18, height: 18 }} />
          </IconButton>
        ) : (
          <Select
            value={filter}
            onChange={(e) => setFilter(e?.target?.value)}
            displayEmpty
            size="small"
            IconComponent={KeyboardArrowDownIcon}
            startAdornment={
              <InputAdornment position="start">
                <img src={FilterIcon} alt="Filter" style={{ width: 18, height: 18, marginRight: 4 }} />
              </InputAdornment>
            }
            sx={{
              width: 120,
              mb: 2,
              '.MuiSelect-select': {
                color: theme?.palette?.customColors?.grey?.[12],
                fontSize: '12px'
              },
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.12)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.24)',
              },
              '& .MuiSelect-icon': {
                color: theme?.palette?.customColors?.grey?.[8],
                fontSize: '20px',
              }
            }}
          >
            <MenuItem value="" disabled>
              <span style={{ color: 'text.secondary' }}>Filters</span>
            </MenuItem>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>)}
        {!isMobileView && (
          <Box sx={{ flex: 1 }} />
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: !isMobileView ? '0.625rem' : '4px',
            mb: !isMobileView ? 2 : 0,
          }}
        >
          <Button
            variant="contained"
            size="small"
            disabled={!anySelectedRows || isMixedSelection}
            onClick={handleEditClick}
            sx={{
              ...getButtonStyle(anySelectedRows && !isMixedSelection),
              '&.Mui-disabled': {
                color: theme?.palette?.customColors?.grey?.[13],
              },
              minWidth: { xs: '30px', sm: '62px' },
              padding: '0px',
              height: { xs: '32px', sm: '36px' },
              gap: '0.4rem',
            }}
          >
            <img src={!anySelectedRows || isMixedSelection ? EditIcon : EditIconActive} alt="Edit" style={{ width: 16, height: 16 }} />
            {!isMobileView && (<Typography
              sx={{
                fontSize: '12px',
                textTransform: 'none',
                fontWeight: '400',
                color: (!anySelectedRows || isMixedSelection) ? theme?.palette?.customColors?.grey[13] : theme?.palette?.customColors?.lightBlue[2],
              }}
            >
              Edit
            </Typography>)}
          </Button>
          <Button
            variant="contained"
            size="small"
            disabled={!hasSelectedRows || !allSelectedRowsInactive || isMixedSelection}
            onClick={onActivate}
            sx={{
              ...getButtonStyle(hasSelectedRows && allSelectedRowsInactive && !isMixedSelection),
              '&.Mui-disabled': {
                color: theme?.palette?.customColors?.grey?.[13],
              },
              minWidth: { xs: '78px', sm: '87px' },
              padding: '0px',
              height: { xs: '32px', sm: '36px' },
              gap: '0.4rem',
            }}
          >
            <img src={(!hasSelectedRows || !allSelectedRowsInactive || isMixedSelection) ? Activate : ActivateBlueIcon} alt="Edit" style={{ width: isMobileView ? 12 : 16, height: isMobileView ? 12 : 16 }} />
            <Typography
              sx={{
                fontSize: '12px',
                textTransform: 'none',
                fontWeight: '400',
                color: (!hasSelectedRows || !allSelectedRowsInactive || isMixedSelection) ? theme?.palette?.customColors?.grey[13] : theme?.palette?.customColors?.lightBlue[2],
              }}
            >
              Activate
            </Typography>
          </Button>
          <Button
            variant="contained"
            size="small"
            disabled={!hasSelectedRows || !allSelectedRowsActive || isMixedSelection}
            onClick={onDeactivate}
            sx={{
              ...getButtonStyle(hasSelectedRows && allSelectedRowsActive && !isMixedSelection),
              '&.Mui-disabled': {
                color: theme?.palette?.customColors?.grey?.[13],
              },
              minWidth: { xs: '90px', sm: '102px' },
              padding: '0px',
              height: { xs: '32px', sm: '36px' },
              gap: '0.4rem',
            }}
          >
            <img src={(!hasSelectedRows || !allSelectedRowsActive || isMixedSelection) ? DeactivateIcon : DeactivateIconActive} alt="Deactivate" style={{ width: isMobileView ? 12 : 16, height: isMobileView ? 12 : 16 }} />
            <Typography
              sx={{
                fontSize: '12px',
                textTransform: 'none',
                fontWeight: '400',
                color: (!hasSelectedRows || !allSelectedRowsActive || isMixedSelection) ? theme?.palette?.customColors?.grey[13] : theme?.palette?.customColors?.lightBlue[2],
              }}
            >
              Deactivate
            </Typography>
          </Button>
          <Button
            variant="contained"
            size="small"
            disabled={!anySelectedRows}
            onClick={onArchive}
            sx={{
              ...getButtonStyle(anySelectedRows),
              '&.Mui-disabled': {
                color: theme?.palette?.customColors?.grey?.[13],
              },
              minWidth: { xs: '78px', sm: 'fit-content' },
              padding: '8px',
              height: { xs: '32px', sm: '36px' },
              gap: '0.4rem',
            }}
          >
            <img src={!anySelectedRows ? ArchieveIcon : ArchieveIconActive} alt="Archive" style={{ width: isMobileView ? 12 : 16, height: isMobileView ? 12 : 16 }} />
            <Typography
              sx={{
                fontSize: '12px',
                textTransform: 'none',
                fontWeight: '400',
                color: (!anySelectedRows) ? theme?.palette?.customColors?.grey[13] : theme?.palette?.customColors?.lightBlue[2],
              }}
            >
              Archive
            </Typography>
          </Button>
        </Box>
      </Box>
      <CustomDrawer isOpen={openCreate} anchor="right">
        <Box sx={{ width: isMobileView ? "100vw" : '82vw', margin: "auto", marginTop: { xs: 2.5, sm: 5 }, px: { xs: 0.5, sm: 4 }, maxWidth: '1000px' }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pr: 2.5, height: 24, minHeight: 24 }}>
            {!conflictInfo && <Box sx={{ width: 40, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 1.5 }}>
              {createStep > 1 && (
                <IconButton onClick={() => setCreateStep(createStep - 1)} sx={{ height: 40, width: 40, color: theme?.palette?.customColors?.black[8] }}>
                  <ArrowBackIcon />
                </IconButton>
              )}
            </Box>}
            <Box sx={{ flex: 1 }} />
            <ClearIcon onClick={handleFormCancel} sx={{ cursor: "pointer", color: theme?.palette?.customColors?.black?.[0], width: 20, height: 20, }} />
          </Box>
          {conflictInfo ? (
            <Box sx={{ mt: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: theme?.palette?.customColors?.pink?.[5], color: theme?.palette?.customColors?.grey?.[8], border: '1px solid #FFEEBA', borderRadius: '10px', p: 2, mb: 3, justifyContent: 'center', textAlign: 'center' }}>
                <Box sx={{ maxWidth: '423px', mx: 'auto' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Error
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    The pricing policy conflicts with {conflictMessage}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Please edit or archive them to edit/create this PP.
                  </Typography>
                </Box>
              </Box>
              {conflictPoliciesLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 120 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <TableContainer component={Paper} sx={{ mb: 2 }} elevation={0}>
                  <Table
                    sx={{
                      tableLayout: 'fixed',
                      height: '100%',
                      '& .MuiTableHead-root': {
                        backgroundColor: theme?.palette?.customColors?.blue?.[11],
                        '& .MuiTableRow-root': {
                          height: '40px'
                        },
                        '& .MuiTableCell-root': {
                          backgroundColor: theme?.palette?.customColors?.blue?.[11],
                          '&:first-of-type': { borderTopLeftRadius: '8px' },
                          '&:last-child': { borderTopRightRadius: '8px' }
                        }
                      },
                      '& .MuiTableBody-root': {
                        '& .MuiTableCell-root': {
                          backgroundColor: 'inherit',
                          fontSize: '10px',
                          fontWeight: 400
                        },
                        '& .MuiTableRow-root': {
                          height: '40px',
                          '&.selected': {
                            backgroundColor: theme?.palette?.customColors?.pink?.[4],
                            '& .MuiTableCell-root': {
                              backgroundColor: 'inherit'
                            }
                          }
                        },
                        '& .MuiTableRow-root:last-child': {
                          '& .MuiTableCell-root': {
                            '&:first-of-type': { borderBottomLeftRadius: '8px' },
                            '&:last-child': { borderBottomRightRadius: '8px' }
                          }
                        }
                      },
                      '& .MuiTableBody-root .MuiTableRow-root:hover': {
                        '& .MuiTableCell-root': {
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'light' ? theme?.palette?.customColors?.blue?.[17] : theme.palette.action.hover
                        }
                      }
                    }}
                    stickyHeader
                    aria-label="dynamic table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ textAlign: 'center', fontSize: '10px', fontWeight: 500 }}>Pricing Policy Name</TableCell>
                        <TableCell sx={{ textAlign: 'center', fontSize: '10px', fontWeight: 500 }}>Pricing Policy ID</TableCell>
                        <TableCell sx={{ textAlign: 'center', fontSize: '10px', fontWeight: 500 }}>Link</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {conflictPolicyDetailsList.map((policy, index) => (
                        <TableRow key={policy?.PricingPolicyId || ''}>
                          <TableCell sx={{ borderRight: `1px solid ${theme?.palette?.customColors?.grey?.[10]}`, textAlign: 'center' }}>{policy?.PricingPolicyName || ''}</TableCell>
                          <TableCell sx={{ borderRight: `1px solid ${theme?.palette?.customColors?.grey?.[10]}`, textAlign: 'center' }}>{policy?.PricingPolicyId || ''}</TableCell>
                          <TableCell sx={{ borderRight: `1px solid ${theme?.palette?.customColors?.grey?.[10]}`, textAlign: 'center' }}>
                            <Button
                              sx={{
                                textTransform: 'none', fontSize: '10px', border: 'none',
                                '&:hover': {
                                  border: 'none'
                                }
                              }}
                              variant="outlined"
                              onClick={() => {
                                setIsEditMode(true);
                                setSelectedPolicyId(policy?.PricingPolicyId || '');
                                setCreateStep(1);
                                setOpenCreate(true);
                                setConflictInfo(null);
                              }}
                            >
                              Link {index + 1}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          ) : (
            <CreatePricingPolicy
              setPolicyCreated={setPolicyCreated}
              onClose={handleDrawerClose}
              onCancel={handleFormCancel}
              bulkEditPolicyIds={selectedPolicyIds}
              onPolicyCreated={onPolicyCreated}
              step={createStep}
              setStep={setCreateStep}
              isEditMode={isEditMode}
              selectedPolicyId={selectedPolicyId}
              isBulkEdit={!isEditMode && selectedRows.length > 1}
              onConflict={async info => {
                setConflictInfo(info);
                setConflictPoliciesLoading(true);
                if (Array.isArray(info?.existingPolicy?.PricingPolicyId) && info.existingPolicy.PricingPolicyId.length > 0) {
                  const results = await Promise.all(
                    info.existingPolicy.PricingPolicyId.map(async (id) => {
                      const { data } = await getPolicyById({
                        Context: {
                          UserAgent: "Mozilla/5.0",
                          TrackingId: "conflict-fetch-id",
                          TransactionId: "conflict-fetch-id",
                          CountryCode: "IN",
                          IpAddress: "127.0.0.1"
                        },
                        Request: { PricingPolicyId: id }
                      });
                      return data?.Response || null;
                    })
                  );
                  setConflictPolicyDetailsList(results.filter(Boolean));
                } else {
                  setConflictPolicyDetailsList([]);
                }
                setConflictPoliciesLoading(false);
                setOpenCreate(true);
              }}
            />
          )}
        </Box>
      </CustomDrawer>
    </Box>
  );
}

export default SearchSection;
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Pagination,
  Popper,
  Switch,
  Typography,
  styled,
  useMediaQuery
} from '@mui/material';
import { format } from 'date-fns';
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import EditSquareIcon from '../../../assets/icons/EditSquareIcon.svg';
import DeleteIcon from '../../../assets/icons/delete.svg';
import LoadingScreen from '../../../components/core-module/loading-screen/LoadingScreen';
import { useDeleteWorkflowListByIdMutation, useFetchWorkflowListByIdMutation, useFetchWorkflowListMutation, useToggleWorkflowStatusApiMutation, useStatusUpdateWorkflowMutation } from '../../../store/musafirAprrovalWorkFlow';
import { theme } from '../../../theme';
import { formatApproverTypes } from '../../../utility/helper';
import NoDataFound from '../../../components/core-module/nodata-found/NoDataFound';
import NoDataFoundImage from '../../../assets/images/NoDataImage.svg';
import showAlertDialog from '../../../utility/widgets/AlertDialog';
import AWFCheckedIcon from '../../../assets/icons/AWFCheckedIcon.svg';
import AWFUncheckedIcon from '../../../assets/icons/AWFUncheckedIcon.svg';

interface Workflow {
  WorkflowId: string;
  Name: string;
  Status: string;
  IsDisabled: boolean;
  CreatedByName: string;
  CreatedAt: string;
  ModifiedByName: string;
  ModifiedAt: string;
  ApproverTypes?: string[];
  LevelCount?: number;
  setIsEditMode: (isEditMode: boolean) => void;
}

interface ApprovalWorkflowProps {
  setIsLevelDrawerOpen: (isOpen: boolean) => void;
  setIsCreated: (isCreated: boolean) => void;
  isCreated: boolean;
  setIsEditMode: (isEditMode: boolean) => void;
}

const ITEMS_PER_PAGE = 10;

const CustomSwitch = styled(({ ...props }) => <Switch {...props}
  icon={
    <img
      src={AWFUncheckedIcon}
      alt="unchecked"
      style={{ width: 47.11, height: 20.28 }}
    />
  }
  checkedIcon={
    <img
      src={AWFCheckedIcon}
      alt="checked"
      style={{ width: 47.11, height: 20.28 }}
    />
  }
/>)(
  ({ theme }) => ({
    padding: 0,
    width: '29px',
    height: '16px',
    overflow: "inherit",
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: '10px',
      height: '10px',
      color: 'transparent',
    },
    '& .MuiSwitch-switchBase': {
      padding: 0,
      // margin: '1.14px',
      transitionDuration: '300ms',
      transform: 'none !important',
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: theme?.palette?.customColors?.blue[10],
        border: `6px solid ${theme?.palette?.customColors?.white[0]}`,
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme?.palette?.customColors?.white[23],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        backgroundColor: theme?.palette?.customColors?.grey[16],
        opacity: 0.7,
        border: 'none'
      },
    },
    '& .MuiSwitch-track': {
      borderRadius: '12.28px',
      backgroundColor: 'transparent !important',
    },
  }));

const Listing: React.FC<ApprovalWorkflowProps> = ({
  setIsLevelDrawerOpen,
  setIsCreated,
  isCreated,
  setIsEditMode,
}) => {
  const [page, setPage] = useState(1);
  const [fetchWorkflows, { isLoading }] = useFetchWorkflowListMutation();
  const { workflowListData } = useSelector((state: any) => state.approvalWorkFlowSlice);
  const [statusState, setStatusState] = useState<Record<string, boolean>>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>("");
  const [selectedWorkflowName, setSelectedWorkflowName] = useState<string | null>(null);
  const [enableConfirmationOpen, setEnableConfirmationOpen] = useState(false);
  const [getByIdWorkflow] = useFetchWorkflowListByIdMutation();
  const { t } = useTranslation();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const [toggleWorkflowStatus, { isLoading: statusLoading }] = useToggleWorkflowStatusApiMutation()
  const [statusUpdateWorkflow] = useStatusUpdateWorkflowMutation();
  const [archiveConfirmationOpen, setArchiveConfirmationOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, workflowId: string, workflowName: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedWorkflowId(workflowId);
    setSelectedWorkflowName(workflowName);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = async (workflowId: string) => {
    try {
      const requestBody = {
        "Context": {
          "UserAgent": "Mozilla/5.0",
          "TrackingId": "de2ade5e6a0b4c75b44ab079f4f0b0cb",
          "TransactionId": "de2ade5e6a0b4c75b44ab079f4f0b0cb",
          "IpAddress": "192.168.1.1",
          "CountryCode": "IN"
        },
        "Request": {
          "WorkflowId": workflowId
        }
      };

      const response = await getByIdWorkflow(requestBody).unwrap();
      setIsLevelDrawerOpen(true);
      setIsEditMode(true);
      return response;
    } catch (error) {
      console.error('Failed to fetch workflow:', error);
      throw error;
    }
  }

  const handleEnableCancel = () => {
    setEnableConfirmationOpen(false);
  };
  const handleArchiveClick = () => {
    setArchiveConfirmationOpen(true);
    handleMenuClose();
  };

  const handleArchiveConfirm = async () => {
    if (!selectedWorkflowId) return;
    try {
      const payload = {
        Context: {
          UserAgent: "Mozilla/5.0",
          TrackingId: "de2ade5e6a0b4c75b44ab079f4f0b0cb",
          TransactionId: "de2ade5e6a0b4c75b44ab079f4f0b0cb",
          IpAddress: "192.168.1.1",
          CountryCode: "IN"
        },
        Request: {
          WorkFlowIds: [selectedWorkflowId],
          Status: "ARCHIVED"
        }
      };
      const response = await statusUpdateWorkflow(payload).unwrap();
      const currentCount = (workflowListData?.Response?.Data ?? []).length;
      if (currentCount === 1 && page > 1) {
        setPage(page - 1);
      } else {
        await fetchData();
      }

      setArchiveConfirmationOpen(false);
      setSelectedWorkflowId("");
      setSelectedWorkflowName("");
      if ((response as any)?.Context?.StatusCode === 4101) {
        enqueueSnackbar((response as any)?.Context?.Message || t('workflow_archived_successfully'), {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        });
      } else {
        enqueueSnackbar((response as any)?.Context?.Message || t('failed_to_archive_workflow'), {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        });
      }
    } catch (error: unknown) {
      setArchiveConfirmationOpen(false);
      enqueueSnackbar(
        (error as any)?.data?.Context?.Message || (error as any)?.error || t('failed_to_archive_workflow'),
        {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        }
      );
    }
  };
  const handleArchiveCancel = () => {
    setArchiveConfirmationOpen(false);
  };

  const handleStatusUpdate = async (workflowId: string, status: 'ACTIVE' | 'INACTIVE') => {
    const payload = {
      Context: {
        UserAgent: "Mozilla/5.0",
        TrackingId: "de2ade5e6a0b4c75b44ab079f4f0b0cb",
        TransactionId: "de2ade5e6a0b4c75b44ab079f4f0b0cb",
        IpAddress: "192.168.1.1",
        CountryCode: "IN"
      },
      Request: {
        WorkFlowIds: [workflowId],
        Status: status
      }
    };
    try {
      const response = await statusUpdateWorkflow(payload).unwrap();
      await fetchData();
      if ((response as any)?.Context?.StatusCode === 4101) {
        enqueueSnackbar((response as any)?.Context?.Message || t('workflow_updated_successfully'), {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        });
      } else {
        enqueueSnackbar((response as any)?.Context?.Message || t('failed_to_update_status'), {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        });
      }
    } catch (error: unknown) {
      enqueueSnackbar(
        (error as any)?.data?.Context?.Message || (error as any)?.error || t('failed_to_update_status'),
        {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        }
      );
    }
  };
  const open = Boolean(anchorEl)

  useEffect(() => {
    if (workflowListData?.Response?.Data?.length) {
      const initialStatusState = workflowListData.Response.Data.reduce((acc: Record<string, boolean>, workflow: Workflow) => {
        acc[workflow.WorkflowId] = !workflow?.IsDisabled;
        return acc;
      }, {});
      setStatusState(initialStatusState);
    }
  }, [workflowListData]);

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fetchData = async () => {
    try {
      const requestBody = {
        Context: {
          UserAgent: "Mozilla/5.0",
          TrackingId: "de2ade5e6a0b4c75b44ab079f4f0b0cb",
          TransactionId: "3ddf1ed3414146e684c236b69a477b7d",
          IpAddress: "192.168.1.1",
          CountryCode: "US"
        },
        Request: {
          Pagination: {
            PageNumber: isCreated ? 1 : page,
            PageSize: ITEMS_PER_PAGE
          },
          SearchText: "",
          Type: "All"
        }
      };
      await fetchWorkflows(requestBody).unwrap();
    } catch (err) {
      enqueueSnackbar(
        typeof err === "string"
          ? err
          : err?.data?.Context?.Message ||
          err?.error ||
          t('something_went_wrong'),
        {
          variant: "error", autoHideDuration: 3000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          }
        }
      );
    }
  }
  useEffect(() => {
    fetchData();
    setIsCreated(false);
    if (isCreated) {
      setPage(1);
    }
  }, [page, isCreated]);


  const handleToggleWorkflowStatus = async (workflowId: string, currentStatus: boolean) => {
    const requestBody = {
      "Context": {
        "UserAgent": "Mozilla/5.0",
        "TrackingId": "de2ade5e6a0b4c75b44ab079f4f0b0cb",
        "TransactionId": "de2ade5e6a0b4c75b44ab079f4f0b0cb",
        "IpAddress": "192.168.1.1",
        "CountryCode": "IN"
      },
      "Request": {
        "WorkflowId": workflowId,
        "IsEnable": !currentStatus
      }
    }
    try {
      const response = await toggleWorkflowStatus(requestBody).unwrap();
      await fetchData();
      const typedResponse = response as { Context?: { StatusCode?: number; Message?: string } };
      if (typedResponse?.Context?.StatusCode == 4101) {
        enqueueSnackbar(typedResponse?.Context?.Message || t('workflow_updated_successfully'), {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        });
      }
      else {
        enqueueSnackbar(typedResponse?.Context?.Message || t('failed_to_update_status'), {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        });
      }
    } catch (error: any) {
      console.error('Failed to toggle workflow status:', error);
      enqueueSnackbar(
        error?.data?.Context?.Message || error?.error || t('failed_to_update_status'),
        {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        }
      );
    }
  };

  const getWorkflowStatus = (workflow: Workflow) => {
    if ('Status' in workflow && workflow.Status) {
      return workflow.Status.toUpperCase();
    }
    return workflow.IsDisabled ? 'INACTIVE' : 'ACTIVE';
  };

  if (isLoading && !workflowListData?.Response?.Data?.length) {
    return (
      <Box sx={{ p: 4, maxWidth: 1280, m: 'auto', textAlign: 'center' }}>
        <Typography variant="h6">Loading workflows...</Typography>
      </Box>
    );
  }

  const workflows = workflowListData?.Response?.Data ?? [];
  const totalPages = Math.ceil(workflowListData?.Response?.Pagination?.Total / ITEMS_PER_PAGE);
  return (
    <Box>
      <LoadingScreen isLoading={isLoading || statusLoading} />
      <Box sx={{ maxWidth: isMobileView ? '90%' : 1080, m: 'auto' }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: '16px' }}>
          <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />} sx={{
            ".MuiBreadcrumbs-separator": {
              margin: 0,
            }
          }}>
            <Typography sx={{
              color: 'text.secondary', fontWeight: 400,
              fontSize: isMobileView ? "10px" : "12px",
              fontStyle: 'Poppins'
            }}>{t('hub')}</Typography>
            <Typography sx={{
              color: 'text.secondary', fontWeight: 400,
              fontSize: isMobileView ? "10px" : "12px",
              fontStyle: 'Poppins'
            }}>{t('settings')}</Typography>
            <Typography sx={{
              color: 'text.primary', fontWeight: 400,
              fontSize: isMobileView ? "10px" : "12px",
              fontStyle: 'Poppins'
            }}>{t('approval_workflow')}</Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", mt: isMobileView ? '30px' : '60px', mb: isMobileView ? "25px" : "50px" }}>
          <Typography variant="h5" sx={{ fontWeight: "600", fontSize: isMobileView ? "16px" : "30px", fontFamily: "Poppins, sans-serif", color: theme?.palette?.customColors?.black[1]}}>
            {t('approval_workflow')}
          </Typography>
          {workflows.length > 0 && <Button variant="contained" size="small" sx={{ backgroundColor: "#0087FA", textTransform: "none", fontSize: isMobileView ? "12px" : "14px", fontFamily: "Poppins, sans-serif" }} startIcon={<AddCircleOutlineIcon />} onClick={() => {
            setIsLevelDrawerOpen(true)
          }}
          >
            {t("new_process")}
          </Button>}
        </Box>
        <Box sx={{
          margin: "auto",
          mt: 1,
        }}>
          <Grid2 container spacing={2} sx={{ mt: 2, zIndex: 1, }}>
            {workflowListData?.Response?.Data.map((workflow: Workflow) => (
              <Grid2 size={{ xs: 12 }} key={workflow.WorkflowId}>
                <Card elevation={2} sx={{ boxShadow: 'none', border: '1px solid #EBEBEB', borderRadius: '15px', overflow: 'visible' }}>
                  <CardContent sx={{ padding: "0 !important", paddingBottom: 0, minHeight: "9.3rem" }}>
                    <Box display="flex" justifyContent="space-between" sx={{
                      ml: "25px", paddingTop:"6px"
                    }}>
                      <Box sx={{ display: 'flex', minWidth: 0, maxWidth: '100%', flexDirection: 'column' }}>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            whiteSpace: "normal",
                            wordBreak: 'break-word',
                            fontSize: isMobileView ? "14px" : "18px",
                            pt: 1,
                            color: theme?.palette?.customColors?.black[1]
                          }}
                        >
                          {workflow?.Name}
                        </Typography>
                        {
                          workflow?.ModifiedByName ? (
                            <Box sx={{ mt: "1rem" }}>
                              <Typography
                                variant="body2"
                                sx={{ color: "gray", fontSize: isMobileView ? "10px" : "12px" }}
                                mt={1}
                              >
                                {t('modified_by')}{" "}
                                <span style={{ fontWeight: 700, fontSize: isMobileView ? "10px" : "12px" }}>
                                  {workflow?.ModifiedByName}
                                </span>{" "}
                                on{" "}
                                <span style={{ fontWeight: 700, fontSize: isMobileView ? "10px" : "12px" }}>
                                  {format(new Date(workflow?.ModifiedAt), "MMM dd, yyyy")}
                                </span>{" "}
                                at{" "}
                                <span style={{ fontWeight: 700, fontSize: isMobileView ? "10px" : "12px" }}>
                                  {format(new Date(workflow?.ModifiedAt), "HH:mm")}
                                </span>
                              </Typography>
                              <Typography variant="body2" sx={{ color: "gray", fontSize: isMobileView ? "10px" : "12px" }} mt={1}>
                                {t('based_on')} <span style={{ fontWeight: "600", fontSize: isMobileView ? "10px" : "12px" }}>{formatApproverTypes(workflow?.ApproverTypes ?? [])}</span>
                              </Typography>
                            </Box>
                          ) : (
                            <Box sx={{ mt: "1rem" }}>
                              {workflow?.CreatedByName && <Typography
                                variant="body2"
                                sx={{ color: "gray", fontSize: isMobileView ? "10px" : "12px", fontWeight: "400" }}
                                mt={1}
                              >
                                {t('created_by')}{" "}
                                <span style={{ fontWeight: 700, fontSize: isMobileView ? "10px" : "12px", color: "#6D6D6D" }}>
                                  {workflow?.CreatedByName}
                                </span>{" "}
                                on{" "}
                                <span style={{ fontWeight: 700, fontSize: isMobileView ? "10px" : "12px", color: "#6D6D6D" }}>
                                  {format(new Date(workflow?.CreatedAt), "MMM dd, yyyy")}
                                </span>{" "}
                                at{" "}
                                <span style={{ fontWeight: 700, fontSize: isMobileView ? "10px" : "12px", color: "#6D6D6D" }}>
                                  {format(new Date(workflow?.CreatedAt), "HH:mm")}
                                </span>
                              </Typography>}

                              <Typography variant="body2" sx={{ color: "gray", fontSize: isMobileView ? "10px" : "12px" }} mt={1}>
                                {t('based_on')} <span style={{ fontWeight: "700", fontSize: isMobileView ? "10px" : "12px", color: "#6D6D6D" }}>{formatApproverTypes(workflow?.ApproverTypes ?? [])}</span>
                              </Typography>
                            </Box>
                          )
                        }

                      </Box>
                      <Box>
                        <IconButton onClick={(e) => handleMenuOpen(e, workflow?.WorkflowId, workflow?.Name)} aria-label="settings" >
                          <MoreVertIcon />
                        </IconButton>

                        <Popper
                          open={open}
                          anchorEl={anchorEl}
                          role={undefined}
                          placement="bottom-start"
                          transition
                          disablePortal
                          modifiers={[
                            {
                              name: 'offset',
                              options: {
                                offset: [125, 0],
                              },
                            },
                          ]}
                        >
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              style={{
                                transformOrigin: 'left top',
                              }}
                            ><Box
                              sx={{
                                backgroundColor: theme?.palette?.customColors?.white[0],
                                borderRadius: '4px',
                                border: `1px solid ${theme?.palette?.customColors?.lightWhite[2]}`,
                                zIndex: 1500,
                                marginRight: isMobileView ? 1 : 0

                              }}
                            >
                                <ClickAwayListener onClickAway={handleMenuClose}>
                                  <MenuList
                                    sx={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      justifyContent: 'space-around',
                                      padding: '10px',
                                    }}
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                  >
                                    <MenuItem sx={{ display: 'flex', color: '#535353', fontSize: '12px' }} onClick={() => {
                                      handleMenuClose();
                                      handleEdit(selectedWorkflowId);
                                    }}
                                    >
                                      <img src={EditSquareIcon} alt='EditSquare' />&nbsp;Edit
                                    </MenuItem>
                                    <MenuItem
                                      onPointerDown={(e) => e.stopPropagation()}
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: '#535353',
                                        fontSize: '12px',
                                      }} onClick={() => {
                                        handleArchiveClick();
                                      }}
                                    >
                                      <img src={DeleteIcon} alt='DeleteIcon' />&nbsp;{t('archive')}
                                    </MenuItem>
                                  </MenuList>
                                </ClickAwayListener></Box>
                            </Grow>
                          )}
                        </Popper>
                      </Box>

                    </Box>
                    <Box display="flex" justifyContent="space-between" mt={1} sx={{ ml: "25px", }}>
                      <Typography variant="body2" sx={{ color: "gray", fontSize: isMobileView ? "10px" : "12px", fontWeight: "400" }}>
                        {t('contains')} <span style={{ fontWeight: "700", fontSize: isMobileView ? "10px" : "12px", color: "#6D6D6D" }}>{workflow?.LevelCount} Levels</span>
                      </Typography>
                      <Box display="flex" alignItems="center" gap="6px" sx={{ mr: isMobileView ? "0.5rem" : "1rem" }}>
                        {(() => {
                          const status = getWorkflowStatus(workflow);
                          return (
                            <>
                              <Typography variant="body2" sx={{ color: theme?.palette?.customColors?.black[1], fontSize: "12px", fontWeight: "400", mt:status === 'INACTIVE'? "4px": "2px" }}>
                                {status === 'ARCHIVED' ? t('archived') : (status === 'ACTIVE' ? t('active') : t('inactive'))}
                              </Typography>
                              <CustomSwitch
                                checked={status === 'ACTIVE'}
                                onChange={async () => {
                                  const newStatus = status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
                                  const userConfirmed = await showAlertDialog(
                                    'Alert',
                                    `Are you sure you want to ${newStatus === 'ACTIVE' ? 'Activate' : 'Deactivate'}?`
                                  );
                                  if (userConfirmed) {
                                    handleStatusUpdate(workflow.WorkflowId, newStatus);
                                  }
                                }}
                                slotProps={{ input: { 'aria-label': 'workflow status toggle' } }}
                                disabled={status === 'ARCHIVED'}
                              />
                            </>
                          );
                        })()}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
          <Dialog
            open={enableConfirmationOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            disableScrollLock
          >
            <DialogTitle id="alert-dialog-title">
              Alert
            </DialogTitle>
            <DialogContent>
              <Typography>
                This Approval Process will get deactivated. Do you wish to continue?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEnableCancel} color="primary" sx={{ textTransform: 'none' }}>
                No
              </Button>
              <Button
                onClick={() => {
                  handleToggleWorkflowStatus(selectedWorkflowId, statusState[selectedWorkflowId]);
                  setEnableConfirmationOpen(false);
                }}
                color="error"
                autoFocus
                sx={{ textTransform: 'none' }}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={archiveConfirmationOpen}
            aria-labelledby="archive-dialog-title"
            aria-describedby="archive-dialog-description"
            disableScrollLock
          >
            <DialogTitle id="archive-dialog-title">
              Confirm Archive
            </DialogTitle>
            <DialogContent>
              <Typography
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: isMobileView ? '180px' : '100rem',
                }}
              >
                Are you sure you want to archive the workflow "{selectedWorkflowName}"? This action cannot be undone.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleArchiveCancel} color="primary" sx={{ textTransform: 'none' }}>
                Cancel
              </Button>
              <Button onClick={handleArchiveConfirm} color="error" autoFocus sx={{ textTransform: 'none' }}>
                Archive
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
        {workflows.length > 0 && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              color="primary"
              sx={{
                '& .MuiPaginationItem-root': { margin: '0 4px', color: theme?.palette?.customColors?.grey?.[25] },
                '& .Mui-selected': {
                  backgroundColor: `${theme?.palette?.customColors?.blue?.[10]} !important`,
                  color: theme?.palette?.customColors?.white?.[0],
                  '&:hover': { backgroundColor: theme?.palette?.customColors?.red?.[11] },
                },
                '& .MuiPaginationItem-previousNext:not(.Mui-disabled)': {
                  color: theme?.palette?.customColors?.blue?.[10], //color for active arrows
                },
              }}
            />
          </Box>
        )}
        {!isLoading && workflows.length === 0 && (
          <Box textAlign="center" mt={4}>
            <NoDataFound imageSrc={NoDataFoundImage} description='Oops! Nothing to see here' />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsLevelDrawerOpen(true)}
              sx={{ mt: 2, backgroundColor: "#0087FA", textTransform: "none", fontSize: isMobileView ? "12px" : "14px", fontFamily: "Poppins, sans-serif" }}
              startIcon={<AddCircleOutlineIcon />}
            >
              New Process
            </Button>
          </Box>
        )}
      </Box >
    </Box>
  );
};

export default Listing;
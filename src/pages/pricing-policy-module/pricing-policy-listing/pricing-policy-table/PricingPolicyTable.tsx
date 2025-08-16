import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, ClickAwayListener, Grow, IconButton, ListItemIcon, ListItemText, MenuItem, MenuList, Popper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import Activate from '../../../../assets/icons/Activate.svg';
import Archieve from '../../../../assets/icons/archieve.svg';
import Deactivate from '../../../../assets/icons/deactivate.svg';
import EditSquare from '../../../../assets/icons/EditSquareIcon.svg';
import view from '../../../../assets/icons/view.svg';
import { CustomTable } from "../../../../components/core-module/table/Table";
import { useExportPricingPolicyMutation, useGetPricingPolicyByIdMutation, useStatusUpdatePricingPolicyMutation } from "../../../../store/musafirPricingPolicyApi";
import { theme } from "../../../../theme";
import { customEnqueueSnackbar } from "../../../../utility/helper";
import { PolicyListingProps, PricingPolicyTableProps } from "../../../../utility/types/policy-listing/PolicyListing";
import { Column } from '../../../../utility/types/pricing-policy/PricingPolicy';
import { TableProps } from '../../../../utility/types/table/Table';
import showAlertDialog from '../../../../utility/widgets/AlertDialog';
import ViewPricingPolicyDrawer from '../ViewPricingPolicyDrawer';
import { getColumnWidth } from "./PricingPolicyColumnWidth";

const PricingPolicyTable: React.FC<PricingPolicyTableProps> = ({
  data,
  columns,
  searchText,
  onRowClick,
  onRowCheckboxChange,
  onPageChange,
  onMenuEdit,
  isSortable = true,
  rowsPerPage = 10,
  totalCount = 0,
  currentPage = 1,
  onStatusChange,
  setIsEditMode,
  setSelectedPolicyId,
  setCreateStep,
  setOpenCreate
}): JSX.Element => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<PolicyListingProps | null>(null);
  const [statusUpdatePricingPolicy] = useStatusUpdatePricingPolicyMutation();
  const [PricingPolicyExport] = useExportPricingPolicyMutation();
  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  const [getPolicyById, { data: viewData, isLoading: isViewLoading }] = useGetPricingPolicyByIdMutation();
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, row: PolicyListingProps) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };
  const handleEdit = () => {
    if (selectedRow && onMenuEdit) {
      onMenuEdit(selectedRow);
    }
    handleMenuClose();
  };
  const handleView = async () => {
    if (selectedRow) {
      setOpenViewDrawer(true);
      await getPolicyById({
        Context: {
          UserAgent: "Mozilla/5.0",
          TrackingId: "de2ade5e6a0b4c75b44ab079f4f0b0cb",
          TransactionId: "3ddf1ed3414146e684c236b69a477b7d",
          IpAddress: "192.168.1.1",
          CountryCode: "US"
        },
        Request: { PricingPolicyId: selectedRow.id }
      });
    }
    handleMenuClose();
  };
  const handleActivate = async () => {
    if (!selectedRow) return;
    const userConfirmed = await showAlertDialog("Alert", `Are you sure you want to Activate?`);
    if (!userConfirmed) {
      return;
    }
    const payload = {
      Context: {
        UserAgent: "Mozilla/5.0",
        TrackingId: "ac38544e-5f95-4c79-bb84-c284e7e3d6a7",
        TransactionId: "ac38544e-5f95-4c79-bb84-c284e7e3d6a7",
        CountryCode: "IN",
        IpAddress: "127.0.0.1"
      },
      Request: {
        PricingPolicyIds: [selectedRow.id],
        Status: 'ACTIVE'
      }
    };
    try {
      await statusUpdatePricingPolicy(payload).unwrap().then((response) => {
        if (response?.Context?.StatusCode === 1002) {
          customEnqueueSnackbar(response?.Context?.Message ? response?.Context?.Message : "Status updated successfully", 'success');
        }
      })
      if (onStatusChange) onStatusChange();
    } catch (error) {
      customEnqueueSnackbar(error?.data?.Context?.Message ? error?.data?.Context?.Message : t('something_went_wrong'), 'error');
      console.error('Failed to update status', error);
    }
    handleMenuClose();
  };
  const handleDeactivate = async () => {
    if (!selectedRow) return;
    const userConfirmed = await showAlertDialog("Alert", `Are you sure you want to Deactivate?`);
    if (!userConfirmed) {
      return;
    }
    const payload = {
      Context: {
        UserAgent: "Mozilla/5.0",
        TrackingId: "ac38544e-5f95-4c79-bb84-c284e7e3d6a7",
        TransactionId: "ac38544e-5f95-4c79-bb84-c284e7e3d6a7",
        CountryCode: "IN",
        IpAddress: "127.0.0.1"
      },
      Request: {
        PricingPolicyIds: [selectedRow.id],
        Status: 'INACTIVE'
      }
    };
    try {
      await statusUpdatePricingPolicy(payload).unwrap().then((response) => {
        if (response?.Context?.StatusCode === 1002) {
          customEnqueueSnackbar(response?.Context?.Message ? response?.Context?.Message : "Status updated successfully", 'success');
        }
      })
      if (onStatusChange) onStatusChange();
    } catch (error) {
      customEnqueueSnackbar(error?.data?.Context?.Message ? error?.data?.Context?.Message : t('something_went_wrong'), 'error');
      console.error('Failed to update status', error);
    }
    handleMenuClose();
  };
  const handleArchive = async () => {
    if (!selectedRow) return;
    const userConfirmed = await showAlertDialog("Alert", `Are you sure you want to Archive?`);
    if (!userConfirmed) {
      return;
    }
    const payload = {
      Context: {
        UserAgent: "Mozilla/5.0",
        TrackingId: "ac38544e-5f95-4c79-bb84-c284e7e3d6a7",
        TransactionId: "ac38544e-5f95-4c79-bb84-c284e7e3d6a7",
        CountryCode: "IN",
        IpAddress: "127.0.0.1"
      },
      Request: {
        PricingPolicyIds: [selectedRow.id],
        Status: 'ARCHIVED'
      }
    };
    try {
      await statusUpdatePricingPolicy(payload).unwrap().then((response) => {
        if (response?.Context?.StatusCode === 1002) {
          customEnqueueSnackbar(response?.Context?.Message ? response?.Context?.Message : "Status updated successfully", 'success');
        }
      })
      if (onStatusChange) onStatusChange();
    } catch (error) {
      customEnqueueSnackbar(error?.data?.Context?.Message ? error?.data?.Context?.Message : t('something_went_wrong'), 'error');
    }
    handleMenuClose();
  };

  const renderActions = (row: PolicyListingProps) => {
    const isActive = row.status === 'Active';
    const isExpired = row.status === 'EXPIRED';
    return (
      <>
        <IconButton
          onClick={(e) => handleMenuOpen(e, row)}
          size="small"
        >
          <MoreVertIcon />
        </IconButton>
        <Popper
          open={Boolean(anchorEl) && selectedRow?.id === row?.id}
          anchorEl={anchorEl}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          sx={{ zIndex: '1000 !important' }}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: 'left top',
              }}
            ><Box
              sx={{
                borderRadius: '4px',
                backgroundColor: theme?.palette?.customColors?.white[0],
                boxShadow: `0px 4px 16px ${theme?.palette?.customColors?.lightWhite[14]}`,
                border: `1px solid ${theme?.palette?.customColors?.white[18]}`,
                zIndex: 2500,
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
                    // autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                  >
                    <MenuItem onClick={handleView}>
                      <ListItemIcon>
                        <img src={view} alt="View" width={18} height={18} />
                      </ListItemIcon>
                      <ListItemText sx={{ color: theme?.palette?.customColors?.grey[9], textAlign: 'left' }}>View</ListItemText>
                    </MenuItem>
                    {!isExpired && (
                      <>
                        <MenuItem onClick={handleEdit}>
                          <ListItemIcon>
                            <img src={EditSquare} alt="View" width={18} height={18} />
                          </ListItemIcon>
                          <ListItemText sx={{ color: theme?.palette?.customColors?.grey[9], textAlign: 'left' }}>Edit</ListItemText>
                        </MenuItem>
                        {isActive ? (
                          <MenuItem onClick={handleDeactivate}>
                            <ListItemIcon>
                              <img src={Deactivate} alt="View" width={18} height={18} />
                            </ListItemIcon>
                            <ListItemText sx={{ color: theme?.palette?.customColors?.grey[9], textAlign: 'left' }}>Deactivate</ListItemText>
                          </MenuItem>
                        ) : (
                          <MenuItem onClick={handleActivate}>
                            <ListItemIcon>
                              <img src={Activate} alt="View" width={18} height={18} />
                            </ListItemIcon>
                            <ListItemText sx={{ color: theme?.palette?.customColors?.grey[9], textAlign: 'left' }}>Activate</ListItemText>
                          </MenuItem>
                        )}
                      </>
                    )}
                    <MenuItem onClick={handleArchive}>
                      <ListItemIcon>
                        <img src={Archieve} alt="View" width={18} height={18} />
                      </ListItemIcon>
                      <ListItemText sx={{ color: theme?.palette?.customColors?.grey[9], textAlign: 'left' }}>Archive</ListItemText>
                    </MenuItem></MenuList></ClickAwayListener></Box>
            </Grow>
          )}
        </Popper>
      </>
    );
  };
  const exportcolumns: Column[] = [
    {
      id: 'PricingPolicyName',
      label: 'Policy Name',
    },
    {
      id: 'PricingPolicyId',
      label: 'ID',
    },
    {
      id: 'dateOfCreation',
      label: 'Date of Creation',

    },
    {
      id: 'CreatedByName',
      label: 'Created By',
    },
    {
      id: 'updatedBy',
      label: 'Updated By',
    },
    {
      id: 'JourneyTypes',
      label: 'Journey Type',
    },
    {
      id: 'Sectors',
      label: 'Sector'
    },
    {
      id: 'Suppliers',
      label: 'Supplier'
    },
    {
      id: 'Airlines',
      label: 'Airline'
    },
    {
      id: 'Classes',
      label: 'Class'
    },
    {
      id: 'FareTypes',
      label: 'Fare Type',
    },
    {
      id: 'Status',
      label: 'Status',
    },
  ];

  const formatExportData = (data) => {
    return data.map((row) => ({
      PricingPolicyName: row.PricingPolicyName || '',
      PricingPolicyId: row.PricingPolicyId || '',
      dateOfCreation: row.Tracking?.CreatedDateTime || '',
      CreatedByName: row.Tracking?.CreatedByName || '',
      updatedBy: row.Tracking?.ModifiedByName || '',
      JourneyTypes: row.Components?.JourneyTypes?.join(', ') || '',
      Sectors: row.Components?.Sectors?.join(', ') || '',
      Suppliers: row.Components?.Suppliers?.join(', ') || '',
      Airlines: row.Components?.Airlines?.join(', ') || '',
      Classes: row.Components?.Classes?.join(', ') || '',
      FareTypes: row.Components?.FareTypes || '',
      Status: row.Components?.Status || '',
    }));
  };

  async function downloadCouponsAsCsv() {
    const rawData = await pricingPolicyExportApi();
    if (!rawData?.length || !exportcolumns?.length) return;
    const data = formatExportData(rawData);

    if (!data?.length || !exportcolumns?.length) return;

    const headers = exportcolumns.map(col => col.label);
    const rows = data.map(row => {
      return (exportcolumns.map(col => {
        let value = row[col.id];
        if (col.format) {
          try {
            value = col.format(value);
          } catch {
            value = '';
          }
        }
        const escaped = String(value ?? '')
          .replace(/"/g, '""')
          .replace(/\n/g, ' ');
        return `"${escaped}"`;
      }))
    }
    );

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).replace(/ /g, '-');
    const formattedTime = now.toTimeString().slice(0, 8).replace(/:/g, '-');
    const fileName = `Pricing Policies (${formattedDate}--${formattedTime}).csv`;
    a.href = url;
    a.download = fileName;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }

  const pricingPolicyExportApi = async () => {
    try {
      const payload = {
        "Context": {
          "UserAgent": "string",
          "TrackingId": "c03f123e-a00f-11ed-b00c-0242ac120002",
          "TransactionId": "c03f123e-a00f-11ed-b00c-0242ac120002",
          "CountryCode": "string",
          "IpAddress": "string"
        },
        "Request": {
          "OrganizationId": "",
          "OrganizationEntityId": "",
          SearchText: searchText
        }
      }
      const response = await PricingPolicyExport(payload).unwrap();
      const data = response?.Response?.Data || [];
      return data;
    } catch (error) {
      console.error("Error", error);
    }
  }

  const tableProps: TableProps = {
    data,
    columns,
    onRowClick,
    onRowCheckboxChange,
    onPageChange,
    getColumnWidth,
    onExport: downloadCouponsAsCsv,
    isExportEnabled: true,
    actions: renderActions,
    isSortable,
    rowsPerPage,
    totalCount,
    currentPage
  }
  return (
    <>
      {(!data && searchText.length === 0 || data.length === 0 && searchText.length === 0) ? (
        <Box sx={{
          background: '#FFFCF5',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          padding: '16px 24px',
          margin: '16px 0',
        }}>
          <InfoOutlinedIcon sx={{ color: '#4B5C6B', fontSize: 20, mr: 1 }} />
          <span style={{ fontSize: 14, color: '#222', fontWeight: 400 }}>
            Pricing Policy for this Organization is governed by its Market's default Pricing Policy. Create
            <Button
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: '#1976d2',
                cursor: 'pointer',
                textDecoration: 'underline',
                font: 'inherit',
                textTransform: 'none',
              }}
              onClick={() => {
                setIsEditMode(false);
                setSelectedPolicyId('');
                setCreateStep(1);
                setOpenCreate(true);
              }}
            >
              "New Policy"
            </Button> to override specific policies
          </span>
        </Box>
      ) : (
        <>
          {
            data.length > 0 ? <CustomTable {...tableProps} /> : (<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: '10%' }}><Typography sx={{ fontSize: 24, color: "gray" }}>No data Found</Typography></Box>)
          }
        </>
      )}
      {openViewDrawer && (
        <ViewPricingPolicyDrawer
          open={openViewDrawer}
          policy={viewData?.Response}
          loading={isViewLoading}
          onClose={() => setOpenViewDrawer(false)}
        />
      )}
    </>
  );
};

export default PricingPolicyTable;
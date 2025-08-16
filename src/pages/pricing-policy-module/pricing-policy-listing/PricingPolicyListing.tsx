import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Divider, Drawer, IconButton, styled, Switch, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import LoadingScreen from "../../../components/core-module/loading-screen/LoadingScreen";
import { useFetchAirlineMutation, useFetchCabinClassMutation, useFetchMetaDataQuery } from '../../../store/musafirFlightLookupApi';
import { useFetchPricingPolicyListMutation, useFetchSupplierDataQuery, useStatusUpdatePricingPolicyMutation } from "../../../store/musafirPricingPolicyApi";
import { theme } from '../../../theme';
import { customEnqueueSnackbar } from "../../../utility/helper";
import useDebounce from "../../../utility/hooks/useDebounce";
import { PageState } from "../../../utility/types/common/Common";
import { MultiSelectionCellProps, PolicyListingProps, SelectionModalProps } from "../../../utility/types/policy-listing/PolicyListing";
import { CustomSwitchProps, PolicyDetails } from '../../../utility/types/pricing-policy/PricingPolicy';
import { TableColumn } from "../../../utility/types/table/Table";
import showAlertDialog from '../../../utility/widgets/AlertDialog';
import PolicyTable from "./pricing-policy-table/PricingPolicyTable";
import SearchSection from "./search-section/SearchSection";

const CustomSwitch = styled(({ ...props }: CustomSwitchProps) => <Switch {...props} />)(
    ({ theme, row }) => {
        return ({
            width: '22.11px',
            height: '12.28px',
            padding: 0,
            '& .MuiSwitch-thumb': {
                boxSizing: 'border-box',
                width: '10px',
                height: '10px',
                color: row?.Status != 'EXPIRED' ? theme?.palette?.customColors?.grey[8] : theme?.palette?.customColors?.white[23],
            },
            '& .MuiSwitch-switchBase': {
                padding: 0,
                margin: '1.14px',
                transitionDuration: '300ms',
                '&.Mui-checked': {
                    transform: 'translateX(9.83px)',
                    color: theme?.palette?.customColors?.white[0],
                    '& .MuiSwitch-thumb': {
                        color: theme?.palette?.customColors?.white[0],
                    },
                    '& + .MuiSwitch-track': {
                        backgroundColor: theme?.palette?.customColors?.blue[10],
                        opacity: 1,
                        border: 0,
                    },
                    '&.Mui-disabled + .MuiSwitch-track': {
                        opacity: 1,
                    },
                },
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
                backgroundColor: row?.Status != 'EXPIRED' ? theme?.palette?.customColors?.white[0] : theme?.palette?.customColors?.grey[16],
                opacity: row?.Status != 'EXPIRED' ? 1 : 0.7,
                border: row?.Status != 'EXPIRED' ? `1px solid ${theme?.palette?.customColors?.grey[8]}` : 'none',
                transition: 'background-color 500ms',
            },
        })
    });

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return dateString;
    }
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });
};
const SelectionModal = ({ open, onClose, title, items }: SelectionModalProps) => {
    const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                zIndex: (theme) => theme.zIndex.modal + 2,
                '& .MuiDrawer-paper': {
                    width: '100%',
                    maxWidth: "600px",
                    mx: 'auto',
                    zIndex: (theme) => theme.zIndex.modal + 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh'
                }
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", pr: isMobileView ? 5 : 4, pt: isMobileView ? 2 : 4 }}>
                    <CloseIcon onClick={onClose} sx={{ width: 20, height: 20, color: theme?.palette?.customColors?.black?.[1] }} />
                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexShrink: 0,
                    height: { sm: 60, md: 78 },
                    position: 'relative',
                    px: 6,
                    py: 1
                }}>
                    <Typography variant="h6" sx={{
                        fontSize: 18,
                        fontWeight: 600,
                        mt: { sm: 0, md: 3 }
                    }}>
                        {title}
                    </Typography>
                </Box>
            </Box>
            <Divider sx={{ width: isMobileView ? '76%' : '86%', mr: 'auto', ml: 6, borderColor: theme?.palette?.customColors?.lightBlue?.[5] }} />
            {isMobileView && (
                <Box sx={{
                    pl: 6,
                    py: 2,
                    flexShrink: 0,
                    display: 'flex',
                    justifyContent: 'flex-start'
                }}>
                    <Typography variant="body2" color="text.secondary">
                        Number of {title?.toLowerCase()}: {items?.length}
                    </Typography>
                </Box>
            )}
            <Box sx={{
                flex: 1,
                overflow: 'auto',
                px: 7,
                py: 2,
            }}>
                <Box component="ul" sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(3, 1fr)',
                    },
                    gap: 2,
                    listStyle: 'none',
                    p: 0,
                    m: 0,
                    alignItems: 'center',
                }}>
                    {items?.map((item) => (
                        <Box
                            key={item}
                            component="li"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: 14,
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <Box component="span" sx={{
                                mr: 1,
                                color: 'text.primary'
                            }}>
                                •
                            </Box>
                            {item}
                        </Box>
                    ))}
                </Box>
            </Box>
            {!isMobileView && (
                <>  <Divider sx={{ width: isMobileView ? '76%' : '86%', mr: 'auto', ml: 6, borderColor: theme?.palette?.customColors?.lightBlue?.[5] }} />
                    <Box sx={{
                        px: 4.5,
                        py: 2,
                        flexShrink: 0,
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                        <Typography variant="body2" color="text.secondary">
                            Number of {title?.toLowerCase()}: {items?.length}
                        </Typography>
                    </Box></>
            )}
        </Drawer>
    );
}

const MultiSelectionCell = ({ value, selections, fieldName, isMobileView }: MultiSelectionCellProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const displaySelections = selections ?? [value];
    if (!displaySelections || displaySelections?.length === 0) {
        return <Typography sx={{ fontSize: '10px', fontWeight: 400 }}>{value}</Typography>;
    }
    if (
        displaySelections?.length === 1 ||
        (displaySelections?.length === 1 && displaySelections[0] === 'All')
    ) {
        return (
            <Typography
                sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '100%',
                    fontSize: '10px',
                    fontWeight: 400,
                }}
            >
                {displaySelections[0]}
            </Typography>
        );
    }
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', px: '6px', minWidth: 0 }}>
                <Typography
                    sx={{
                        fontSize: '10px',
                        fontWeight: 400,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {`${displaySelections?.length} Selections`}
                </Typography>
                <IconButton
                    size="small"
                    sx={{ px: 0 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsModalOpen(true);
                    }}
                >
                    <InfoOutlinedIcon sx={{ fontSize: 10, color: theme?.palette?.customColors?.blue?.[18] }} />
                </IconButton>
            </Box>
            <SelectionModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={fieldName}
                items={displaySelections}
                isMobileView={isMobileView}
            />
        </>
    );
};

const PricingPolicyListing: React.FC = (): JSX.Element => {
    const { t } = useTranslation();
    const [fetchPricingPolicyList] = useFetchPricingPolicyListMutation();
    const [statusUpdatePricingPolicy] = useStatusUpdatePricingPolicyMutation();
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedPolicyId, setSelectedPolicyId] = useState<string>('');
    const [createStep, setCreateStep] = useState(1);
    const [openCreate, setOpenCreate] = useState<boolean>(false);
    const [page, setPage] = useState<PageState>({
        PageNumber: 1,
        PageSize: 10,
        Total: 0
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [isTableLoading, setIsTableLoading] = useState(false);
    const debouncedSearchText = useDebounce(searchText, 500);
    const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
    const [triggerEdit, setTriggerEdit] = useState(false);
    const [menuEditPolicyId, setMenuEditPolicyId] = useState<string>('');
    const [policies, setPolicies] = useState<PolicyListingProps[]>([]);
    const [policyCreated, setPolicyCreated] = useState(false);
    const [fetchAirline, { isLoading: isAirlinesLoading }] = useFetchAirlineMutation();
    const [fetchCabinClass, { isLoading: isCabinClassLoading }] = useFetchCabinClassMutation();
    const { isLoading: isMetaDataLoading } = useFetchMetaDataQuery();
    const { isLoading: isSuppliersLoading } = useFetchSupplierDataQuery();
    const isMappingDataLoading = isAirlinesLoading || isCabinClassLoading || isMetaDataLoading || isSuppliersLoading;
    React.useEffect(() => {
        fetchAirline({
            Context: {
                UserAgent: "string",
                TrackingId: "string",
                TransactionId: "string",
                IpAddress: "string",
                CountryCode: "string",
            },
            Request: {
                SearchText: "",
                Language: "en",
            },
        });
        fetchCabinClass({
            Context: {
                UserAgent: "string",
                TrackingId: "string",
                TransactionId: "string",
                IpAddress: "string",
                CountryCode: "string",
            },
            Request: {
                Language: "en",
            },
        });
    }, []);
    useEffect(() => {
        setIsTableLoading(true);
    }, [searchText])

    const transformApiResponseToTableFormat = (apiData: PolicyDetails[]) => {
        return apiData.map(item => {
            const components = item.Components;
            const tracking = item.Tracking;
            const journeyTypes = components.JourneyTypes || [];
            const sectors = components.Sectors || [];
            const suppliers = components.Suppliers || [];
            const airlines = components.Airlines || [];
            const classes = components.Classes || [];
            const formatSelections = (values: string[]) => {
                if (!values || values?.length === 0) {
                    return 'All';
                }
                if (values?.length === 1) {
                    return values[0];
                }
                return values.join(', ');
            };
            const getSelections = (values: string[]) => {
                return values && values?.length > 0 ? values : [];
            };
            return {
                id: item.PricingPolicyId || '',
                policyName: item.PricingPolicyName || '',
                dateOfCreation: tracking.CreatedDateTime || '',
                createdBy: tracking.CreatedByName || '',
                updatedBy: tracking.ModifiedByName || '-',
                journeyType: formatSelections(journeyTypes),
                sector: formatSelections(sectors),
                supplier: formatSelections(suppliers),
                airline: formatSelections(airlines),
                class: formatSelections(classes),
                fareType: components.FareTypes || 'All',
                status: components.Status || 'Active',
                isSelected: false,
                sectorSelections: getSelections(sectors),
                airlineSelections: getSelections(airlines),
                supplierSelections: getSelections(suppliers),
                journeyTypeSelections: getSelections(journeyTypes),
                classSelections: getSelections(classes),
                PricingPolicyId: item.PricingPolicyId,
                PricingPolicyName: item.PricingPolicyName,
                Components: components,
                Tracking: tracking
            };
        });
    };

    const fetchPricingPolicyData = async (pageNumber: number = 1, pageSize: number = 10, search: string = "") => {
        const context = {
            UserAgent: "Mozilla/5.0",
            TrackingId: "c03f123e-a00f-11ed-b00c-0242ac120002",
            TransactionId: "c03f123e-a00f-11ed-b00c-0242ac120002",
            CountryCode: "string",
            IpAddress: "string"
        }
        const request = {
            Pagination: {
                PageNumber: pageNumber,
                PageSize: pageSize
            },
            SearchText: search
        };
        const payload = {
            Context: context,
            Request: request
        };
        try {
            setIsTableLoading(true);
            const response = await fetchPricingPolicyList(payload).unwrap();
            if (response?.Context?.StatusCode === 1001) {
                const transformedData = transformApiResponseToTableFormat(response.Response.Data);
                setPolicies(transformedData);
                setPage({
                    PageNumber: pageNumber,
                    PageSize: pageSize,
                    Total: response.Response.Pagination.Total
                });
            } else {
                setPolicies([]);
                setPage({
                    PageNumber: pageNumber,
                    PageSize: pageSize,
                    Total: 0
                });
            }
        } catch (error) {
            console.error("Error fetching pricing policy data:", error);
            setPolicies([]);
            setPage({
                PageNumber: pageNumber,
                PageSize: pageSize,
                Total: 0
            });
        } finally {
            setIsTableLoading(false);
        }
    };

    useEffect(() => {
        if (!isMappingDataLoading) {
            fetchPricingPolicyData(currentPage, page?.PageSize, searchText);
        }
    }, [isMappingDataLoading]);

    useEffect(() => {
        setCurrentPage(1);
        if (!debouncedSearchText || debouncedSearchText?.length < 2) {
            if (debouncedSearchText === '' && !isMappingDataLoading) {
                fetchPricingPolicyData(1, page?.PageSize, debouncedSearchText);
                return;
            } else {
                return;
            }
        }
        if (!isMappingDataLoading) {
            fetchPricingPolicyData(1, page?.PageSize, debouncedSearchText);
        }
    }, [debouncedSearchText, page?.PageSize, isMappingDataLoading, policyCreated === true]);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        fetchPricingPolicyData(pageNumber, page?.PageSize, searchText);
    };

    // future use
    // Show error state if API call fails
    // if (error) {
    //     return (
    //         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
    //             <Typography color="error">
    //                 Error loading pricing policies. Please try again.
    //             </Typography>
    //         </Box>
    //     );
    // }

    const handleToggleStatus = async (id: string | undefined) => {
        if (!id) return;
        const policy = policies.find(p => p.id === id);
        if (!policy) return;
        let newStatus = 'ACTIVE';
        if (policy.status === 'Active') newStatus = 'INACTIVE';
        else if (policy.status === 'Inactive') newStatus = 'ACTIVE';
        else return;
        const userConfirmed = await showAlertDialog("Alert", `Are you sure you want to ${newStatus === 'ACTIVE' ? 'Activate' : 'Deactivate'}?`);
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
                PricingPolicyIds: [id],
                Status: newStatus
            }
        };
        try {
            await statusUpdatePricingPolicy(payload).unwrap().then((response) => {
                if (response?.Context?.StatusCode === 1002) {
                    customEnqueueSnackbar(response?.Context?.Message ? response?.Context?.Message : "Status updated successfully", 'success');
                }
            })
            fetchPricingPolicyData(currentPage, page?.PageSize, searchText);
        } catch (error) {
            customEnqueueSnackbar(error?.data?.Context?.Message ? error?.data?.Context?.Message : t('something_went_wrong'), 'error');
            fetchPricingPolicyData(currentPage, page?.PageSize, searchText);
            console.error('Failed to update status', error);
        }
    };

    const handleRowCheckboxChange = (row: PolicyListingProps, type: "all" | "single") => {
        setPolicies(prev => {
            if (type === "all") {
                const shouldSelectAll = prev?.some(policy => !policy?.isSelected);
                return prev?.map(policy => ({
                    ...policy,
                    isSelected: shouldSelectAll
                }));
            } else {
                return prev?.map(policy => ({
                    ...policy,
                    isSelected: policy?.id === row.id ? !policy?.isSelected : policy?.isSelected
                }));
            }
        });
    };
    const handleMenuEdit = (policy: PolicyListingProps) => {
        setTriggerEdit(true);
        setMenuEditPolicyId(policy.id);
    };

    const handleTriggerEditReset = () => {
        setTriggerEdit(false);
        setMenuEditPolicyId('');
    };

    const handleDeactivate = async () => {
        const selectedPolicies = policies.filter(policy => policy.isSelected);
        const userConfirmed = await showAlertDialog("Alert", `Are you sure you want to Deactivate?`);
        if (!userConfirmed) {
            return;
        }
        if (selectedPolicies?.length === 0) return;
        const ids = selectedPolicies.map(p => p.id);
        const payload = {
            Context: {
                UserAgent: "Mozilla/5.0",
                TrackingId: "ac38544e-5f95-4c79-bb84-c284e7e3d6a7",
                TransactionId: "ac38544e-5f95-4c79-bb84-c284e7e3d6a7",
                CountryCode: "IN",
                IpAddress: "127.0.0.1"
            },
            Request: {
                PricingPolicyIds: ids,
                Status: 'INACTIVE'
            }
        };
        try {
            await statusUpdatePricingPolicy(payload).unwrap().then((response) => {
                if (response?.Context?.StatusCode === 1002) {
                    customEnqueueSnackbar(response?.Context?.Message ? response?.Context?.Message : "Status updated successfully", 'success');
                }
            })
            fetchPricingPolicyData(currentPage, page?.PageSize, searchText);
        } catch (error) {
            customEnqueueSnackbar(error?.data?.Context?.Message ? error?.data?.Context?.Message : t('something_went_wrong'), 'error');
            fetchPricingPolicyData(currentPage, page?.PageSize, searchText);
            console.error('Failed to update status', error);
        }
    };

    const handleActivate = async () => {
        const selectedPolicies = policies.filter(policy => policy.isSelected);
        const userConfirmed = await showAlertDialog("Alert", `Are you sure you want to Activate?`);
        if (!userConfirmed) {
            return;
        }
        if (selectedPolicies?.length === 0) return;
        const ids = selectedPolicies.map(p => p.id);
        const payload = {
            Context: {
                UserAgent: "Mozilla/5.0",
                TrackingId: "ac38544e-5f95-4c79-bb84-c284e7e3d6a7",
                TransactionId: "ac38544e-5f95-4c79-bb84-c284e7e3d6a7",
                CountryCode: "IN",
                IpAddress: "127.0.0.1"
            },
            Request: {
                PricingPolicyIds: ids,
                Status: 'ACTIVE'
            }
        };
        try {
            await statusUpdatePricingPolicy(payload).unwrap().then((response) => {
                if (response?.Context?.StatusCode === 1002) {
                    customEnqueueSnackbar(response?.Context?.Message ? response?.Context?.Message : "Status updated successfully", 'success');
                }
            })
            fetchPricingPolicyData(currentPage, page?.PageSize, searchText);
        } catch (error) {
            customEnqueueSnackbar(error?.data?.Context?.Message ? error?.data?.Context?.Message : t('something_went_wrong'), 'error');
            fetchPricingPolicyData(currentPage, page?.PageSize, searchText);
            console.error('Failed to update status', error);
        }
    };

    const handleArchive = async () => {
        const selectedPolicies = policies.filter(policy => policy.isSelected);
        const userConfirmed = await showAlertDialog("Alert", `Are you sure you want to Archive?`);
        if (!userConfirmed) {
            return;
        }
        if (selectedPolicies?.length === 0) return;
        const ids = selectedPolicies.map(p => p.id);
        const payload = {
            Context: {
                UserAgent: "Mozilla/5.0",
                TrackingId: "ac38544e-5f95-4c79-bb84-c284e7e3d6a7",
                TransactionId: "ac38544e-5f95-4c79-bb84-c284e7e3d6a7",
                CountryCode: "IN",
                IpAddress: "127.0.0.1"
            },
            Request: {
                PricingPolicyIds: ids,
                Status: 'ARCHIVED'
            }
        };
        try {
            await statusUpdatePricingPolicy(payload).unwrap().then((response) => {
                if (response?.Context?.StatusCode === 1002) {
                    customEnqueueSnackbar(response?.Context?.Message ? response?.Context?.Message : "Status updated successfully", 'success');
                }
            })
            fetchPricingPolicyData(currentPage, page?.PageSize, searchText);
        } catch (error) {
            customEnqueueSnackbar(error?.data?.Context?.Message ? error?.data?.Context?.Message : t('something_went_wrong'), 'error');
            fetchPricingPolicyData(currentPage, page?.PageSize, searchText);
            console.error('Failed to update status', error);
        }
    };

    const columns: TableColumn[] = [
        {
            id: 'policyName',
            label: 'Policy Name',
        },
        {
            id: 'id',
            label: 'ID',
        },
        {
            id: 'dateOfCreation',
            label: 'Date of Creation',
            format: (value) => formatDate(value)
        },
        {
            id: 'createdBy',
            label: 'Created By',
        },
        {
            id: 'updatedBy',
            label: 'Updated By',
        },
        {
            id: 'journeyType',
            label: 'Journey Type',
            format: (value, row) => (
                <JourneyTypeCell
                    value={String(value)}
                    selections={row?.journeyTypeSelections}
                    isMobileView={isMobileView}
                    fieldName="Journey Types"
                />
            )
        },
        {
            id: 'sector',
            label: 'Sector',
            format: (value, row) => (
                <SectorCell
                    value={String(value)}
                    selections={row?.sectorSelections}
                    fieldName="Sectors"
                />
            )
        },
        {
            id: 'supplier',
            label: 'Supplier',
            format: (value, row) => (
                <SupplierCell
                    value={String(value)}
                    selections={row?.supplierSelections}
                    fieldName="Suppliers"
                />
            )
        },
        {
            id: 'airline',
            label: 'Airline',
            format: (value, row) => (
                <AirlineCell
                    value={String(value)}
                    selections={row?.airlineSelections}
                    fieldName="Airlines"
                />
            )
        },
        {
            id: 'class',
            label: 'Class',
            format: (value, row) => (
                <ClassCell
                    value={String(value)}
                    selections={row?.classSelections}
                    fieldName="Classes"
                />
            )
        },
        {
            id: 'fareType',
            label: 'Fare Type',
        },
        {
            id: 'status',
            label: 'Status',
            align: 'center',
            format: (_, row) => (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    minHeight: '40px'
                }}>
                    <CustomSwitch
                        checked={row?.status === 'Active'}
                        row={row}
                        onChange={() => handleToggleStatus(row?.id ? String(row?.id) : undefined)}
                        size="small"
                    />
                </Box>
            )
        },
        {
            id: 'actions',
            label: '',
            align: 'center',
            width: 70
        }
    ];
    interface JourneyTypeCellProps {
        value: string | number;
        selections: string[];
        isMobileView?: boolean;
        fieldName: string;
    }
    interface SectorCellProps {
        value: string | number;
        selections: string[];
        fieldName: string;
    }

    const JourneyTypeCell = ({ value, selections, isMobileView }: JourneyTypeCellProps) => (
        <MultiSelectionCell
            value={String(value)}
            selections={selections}
            isMobileView={isMobileView}
            fieldName="Journey Types"
        />
    );

    const SectorCell = ({ value, selections }: SectorCellProps) => (
        <MultiSelectionCell
            value={String(value)}
            selections={selections}
            fieldName="Sectors"
        />
    );

    const SupplierCell = ({ value, selections }: SectorCellProps) => (
        <MultiSelectionCell
            value={String(value)}
            selections={selections}
            fieldName="Suppliers"
        />
    );

    const AirlineCell = ({ value, selections }: SectorCellProps) => (
        <MultiSelectionCell
            value={String(value)}
            selections={selections}
            fieldName="Airlines"
        />
    );

    const ClassCell = ({ value, selections }: SectorCellProps) => (
        <MultiSelectionCell
            value={String(value)}
            selections={selections}
            fieldName="Classes"
        />
    );

    return (
        <Box sx={{
            width: '100%',
        }}>
            <SearchSection
                selectedRows={policies.filter(policy => policy?.isSelected)}
                onDeactivate={handleDeactivate}
                onArchive={handleArchive}
                onActivate={handleActivate}
                searchText={searchText}
                onSearchChange={setSearchText}
                onPolicyCreated={() => fetchPricingPolicyData(currentPage, page?.PageSize, searchText)}
                triggerEdit={triggerEdit}
                onTriggerEditReset={handleTriggerEditReset}
                menuEditPolicyId={menuEditPolicyId}
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
                selectedPolicyId={selectedPolicyId}
                setSelectedPolicyId={setSelectedPolicyId}
                createStep={createStep}
                setCreateStep={setCreateStep}
                openCreate={openCreate}
                setOpenCreate={setOpenCreate}
                setPolicyCreated={setPolicyCreated}
            />
            {
                isTableLoading && searchText?.length === 0 ? (
                    <LoadingScreen isLoading={true} />
                ) : (
                    <Box sx={{ mt: 2, position: 'relative', ml: isMobileView ? undefined : '-1px' }}>
                        <PolicyTable
                            data={policies}
                            columns={columns}
                            onRowCheckboxChange={handleRowCheckboxChange}
                            onPageChange={handlePageChange}
                            isSortable={true}
                            rowsPerPage={page?.PageSize}
                            totalCount={page?.Total}
                            currentPage={currentPage}
                            onStatusChange={() => fetchPricingPolicyData(currentPage, page?.PageSize, searchText)}
                            onMenuEdit={handleMenuEdit}
                            searchText={searchText}
                            setIsEditMode={setIsEditMode}
                            setSelectedPolicyId={setSelectedPolicyId}
                            setCreateStep={setCreateStep}
                            setOpenCreate={setOpenCreate}
                        />
                    </Box>
                )
            }
        </Box>
    );
};

export default PricingPolicyListing;
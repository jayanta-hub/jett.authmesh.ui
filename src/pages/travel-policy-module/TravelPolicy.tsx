import { ExpandMore } from '@mui/icons-material';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SmartToyIcon from '@mui/icons-material/SmartToyOutlined';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Autocomplete, Box,
    Button, Checkbox,
    CircularProgress,
    ClickAwayListener,
    FormControlLabel, FormGroup, Grow, IconButton, InputAdornment, ListItemIcon, ListItemText,
    MenuItem, MenuList,
    Paper,
    Popper,
    Select,
    Tab, Tabs, TextField,
    Theme,
    Typography, useMediaQuery
} from "@mui/material";
import Divider from '@mui/material/Divider';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddIcon from '../../assets/icons/AddIconLevel.svg';
import defaultPolicyIcon from '../../assets/images/defaultPolicyIcon.svg';
import deleteIcon from '../../assets/images/deleteIcon.svg';
import deleteIconTable from '../../assets/images/deleteIconTable.png';
import duplicateIcon from '../../assets/images/duplicateIcon.svg';
import editIcon from '../../assets/images/edit.png';
import EditIconBlue from '../../assets/images/EditIconBlue.png';
import noresult from "../../assets/images/noresult_found.svg";
import Container from '../../components/core-module/container/Container';
import CustomDrawer from "../../components/core-module/custom-drawer/CustomDrawer";
import CustomPagination from '../../components/core-module/custom-pagination/CustomPagination';
import CustomSwitchBlue from '../../components/core-module/custom-switch-blue/CustomSwitchBlue';
import CustomSwitch from '../../components/core-module/custom-switch/CustomSwitch';
import LoadingScreen from '../../components/core-module/loading-screen/LoadingScreen';
import NoDataFound from '../../components/core-module/nodata-found/NoDataFound';
import { useFetchWorkflowListMutation } from '../../store/musafirAprrovalWorkFlow';
import { useCreateDuplicatePolicyMutation, useCreateTravelPolicyMutation, useEditTravelPolicyMutation, useFetchGroupsMutation, useFetchTravelPolicyListMutation, useGetAllUserSegmentsMutation, useGetrulesbyconstraintidMutation, useGetTravelPolicyByIdMutation, usePolicyStatusUpdateMutation, useSetAsDefaultPolicyMutation } from '../../store/musafirTravelPolicyApi';
import { useLazyGetApproversSearchAutoCompleteGraphQuery } from '../../store/slice/ApproversSearchApigqlSlice';
import { useLazyGetPolicyConstraintSearchQuery } from '../../store/slice/PolicyConstraintSearchSlice';
import { theme } from "../../theme";
import { customEnqueueSnackbar, removeBracketedText } from '../../utility/helper';
import { PageState } from '../../utility/types/common/Common';
import { ApplicabilityOptions, BucketPolicyGroupDto, ErrorResponse, PolicyConstraint, TravelPolicyProps, Workflow } from '../../utility/types/travel-policy/TravelPolicy';
import showAlertDialog from '../../utility/widgets/AlertDialog';
import CreateApprovalWorkflow from '../approval-workflow-module/level/CreateApprovalWorkflow';
import AllowDenyToggle from './components/allow-deny-toggle/AllowDenyToggle';
import ConditionsList from './components/conditions-list/ConditionsList';
import PolicyConstraintNote from './components/policy-constraint-note/PolicyConstraintNote';
import { BpCheckedIcon, BpDisableIcon, BpIcon } from './components/VirtualizedListbox';
import DynamicForm from './dynamic-form-builder/DynamicForm';
import { a11yProps, validationSchema } from './utils/travelPolicyUtils';
import CustomBreadcrumbs from './components/custom-breadcrumbs/CustomBreadcrumbs';
import { breadcrumbData } from './utils/breadcrumbsUtils';

const CustomDropdownIcon = (props) => (
    <KeyboardArrowDownIcon
        {...props}
        className={`custom-arrow ${props.className}`}
        sx={{ fontSize: '20px' }}
    />
);
const TravelPolicy: React.FC = (): JSX.Element => {
    const { t } = useTranslation();
    const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
    const [getTravelPolicyById] = useGetTravelPolicyByIdMutation();
    const [editTravelPolicy, { isLoading: isEditAPILoading }] = useEditTravelPolicyMutation();
    const [getApprovers, { data }] = useLazyGetApproversSearchAutoCompleteGraphQuery();
    const [getPolicyConstraints, { data: policyConstraintsData }] = useLazyGetPolicyConstraintSearchQuery();
    const [createTravelPolicy, { isLoading: isCreateAPILoading }] = useCreateTravelPolicyMutation();
    const [fetchGroups] = useFetchGroupsMutation();
    const [updatePolicyStatus] = usePolicyStatusUpdateMutation();
    const [fetchTravelPolicyList, { isLoading: isTraveListAPILoading }] = useFetchTravelPolicyListMutation()
    const [fetchWorkflows] = useFetchWorkflowListMutation();
    const [getAllUserSegments] = useGetAllUserSegmentsMutation();
    const [getrulesbyconstraintid, { isLoading: isGetrulesbyconstraintidLoading }] = useGetrulesbyconstraintidMutation();
    const [setAsDefaultPolicy] = useSetAsDefaultPolicyMutation();
    const [createDuplicatePolicy] = useCreateDuplicatePolicyMutation();
    const [toggle, setToggle] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // Further Use
    const [setModalViewModal] = useState(false);
    const [page, setPage] = useState<PageState>({
        PageNumber: 1,
        PageSize: 10,
        Total: 1
    });
    const [currentPage, setCurrentPage] = useState(page?.PageNumber ?? 1);
    const [value, setValue] = useState(0);
    const [travelPolicyType, setTravelPolicyType] = useState<string>("");
    const [isApplicabilityOpen, setIsApplicabilityOpen] = useState<boolean>(false);
    const [isDefaultPolicy, setIsDefaultPolicy] = useState<boolean | undefined>(false);
    const [step, setStep] = useState<number>(1);
    const [searchText, setSearchText] = useState('');
    const setConditionRef = useRef<HTMLInputElement>(null);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
    const [policyList, setPolicyList] = useState<TravelPolicyProps[]>([]);
    const [expandedSections, setExpandedSections] = useState<string[]>([]);
    const isRTL = localStorage.getItem("isRtl") === "true"
    const [policyConstraints, setPolicyConstraints] = useState<BucketPolicyGroupDto[]>([]);
    const [isLevelDrawerOpen, setIsLevelDrawerOpen] = useState(false);
    const [isCreated, setIsCreated] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [workflowOptions, setWorkflowOptions] = useState<Workflow[]>([]);
    const [applicabilityOptions, setApplicabilityOptions] = useState<ApplicabilityOptions[]>();
    const [policyConstraintRules, setPolicyConstraintRules] = useState<any>([])
    const [editFormData, setEditFormData] = useState<{ [key: string]: any }>({})
    const [menuOpen, setMenuOpen] = useState<{ [key: string]: string }>({});
    const [isEditPolicy, setIsEditPolicy] = useState(false);
    const [editData, setEditData] = useState<TravelPolicyProps>({
        TravelPolicyId: '',
        Name: '',
        UserSegmentId: '',
        UserSegmentName: '',
        InPolicy: false,
        HideOutOfPolicy: false,
        BookOutOfPolicyOption: 'DENY',
        ApprovalWorkflowId: '',
        ApprovalWorkflowName: '',
        IsDefault: false,
        IsDisabled: false,
        PolicyConstraints: [],
        CreatedBy: '',
        CreatedDate: '',
        ModifiedBy: '',
        ModifiedDate: '',
        CreatedByName: undefined,
        Constraints: undefined,
        OrgEntityId: undefined,
        Products: undefined,
        PolicyRevalidation: {
            SearchResultPage: true,
            ApprovalPage: false,
            PaymentPage: false,
            ReviewPage: false,
        },
    });
    const [selectOpen, setSelectOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState<'bottom' | 'top'>('bottom');

    // Add effect to recalculate menu position on window resize
    useEffect(() => {
        const handleResize = () => {
            if (selectOpen) {
                const selectElement = document.querySelector('[name="selectedApprovalWorkflow"]');
                if (selectElement) {
                    const rect = selectElement.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    const spaceBelow = viewportHeight - rect.bottom;
                    const menuHeight = 180;
                    const newPosition = spaceBelow >= menuHeight ? 'bottom' : 'top';
                    setMenuPosition(newPosition);
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [selectOpen]);
    const approvalWorkflowObject = editData?.ApprovalWorkflowId
        ? workflowOptions?.find(workflow => workflow?.WorkflowId === editData?.ApprovalWorkflowId)
        : undefined;
    /**
     * Fetches travel policies based on the search text, and sets the
     * policy list and pagination state. Also scrolls to the top of the page.
     *
     * @param {string} [searchText=""] - The search text to filter policies by
     * @returns {Promise<void>}
     */
    const formik = useFormik({
        initialValues: {
            travelPolicyName: isEditPolicy && editData?.Name ? editData.Name : '',
            selectedUserSegment: {
                Id: isEditPolicy && editData?.UserSegmentId ? editData.UserSegmentId : '',
                Name: isEditPolicy && editData?.UserSegmentId === '*'
                    ? 'All Employees'
                    : editData?.UserSegmentName ?? '',
            },
            outOfPolicyConditions: false,
            revalidationStages: {
                SearchResultPage: isEditPolicy ? editData?.PolicyRevalidation?.SearchResultPage ?? true : true,
                ApprovalPage: isEditPolicy ? editData?.PolicyRevalidation?.ApprovalPage ?? false : false,
                PaymentPage: isEditPolicy ? editData?.PolicyRevalidation?.PaymentPage ?? false : false,
                ReviewPage: isEditPolicy ? editData?.PolicyRevalidation?.ReviewPage ?? false : false,
            } as { [key: string]: boolean },
            selectedConditions: '',
            bookingAbility: isEditPolicy ? editData?.BookOutOfPolicyOption ?? 'DENY' : 'DENY',
            HideOutOfPolicy: isEditPolicy ? editData?.HideOutOfPolicy ?? false : false,
            setOutOfPolicy: isEditPolicy ? !editData?.InPolicy : false,
            selectedApprovalWorkflow: isEditPolicy ? approvalWorkflowObject ?? null : null,
            policyConstants: isEditPolicy && editData?.Constraints ? editData.Constraints as PolicyConstraint[] : [] as PolicyConstraint[],
            IsDefault: isEditPolicy ? editData?.IsDefault ?? false : false,
        },
        validationSchema: travelPolicyType === 'edit' ? validationSchema[validationSchema?.length - 1] : validationSchema[step - 1],
        onSubmit: async (values) => {
            if (isEditPolicy) {
                await editPolicyApi(editData?.TravelPolicyId, values)
            } else {
                await createNewPolicy(values)
            }
        },
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: false,
        enableReinitialize: true
    });
    const isDisabled = (formik.values?.IsDefault || !formik.values.setOutOfPolicy) === true ? false : (formik.values.HideOutOfPolicy || formik.values.bookingAbility !== "ALLOW");
    const fetchTravelPolicies = async (searchText = ""): Promise<void> => {
        const payload = {
            pageNumber: currentPage,
            pageSize: 10,
            searchText,
        };
        try {
            const response = await fetchTravelPolicyList(payload)
            if (response?.data?.Context?.StatusCode === 2101) {
                setPolicyList(response.data?.Response?.Data);
                setPage(response.data?.Response?.Pagination);
                window.scrollTo({
                    top: 10,
                    behavior: "smooth",
                });
            }
            if (response?.error?.data?.Context?.StatusCode === 2103) {
                setPolicyList([]);
                customEnqueueSnackbar((response as ErrorResponse)?.error?.data?.Context.Message ?? t("something_went_wrong"), 'error');
            }

        } catch (e) {
            customEnqueueSnackbar((e as ErrorResponse)?.error?.data?.Context.Message ?? t("something_went_wrong"), 'error');

        }
    };

    const createNewPolicy = async (values: typeof formik.values) => {
        const payload = {
            "Name": values?.travelPolicyName,
            "UserSegmentId": values?.selectedUserSegment.Id,
            "InPolicy": !values?.setOutOfPolicy,
            "PolicyRevalidation": values?.revalidationStages,
            "HideOutOfPolicy": values?.HideOutOfPolicy,
            "BookAbilityForOutOfPolicy": values?.bookingAbility,
            "ApprovalWorkflowId": values?.selectedApprovalWorkflow?.WorkflowId,
            "Constraints": values?.policyConstants,
            "OrgEntityId": "*",
            "IsDefault": false,
            "Products": [
                "*"
            ]
        }
        try {
            const response = await createTravelPolicy(payload)
            if (response?.data?.Context?.StatusCode === 1001) {
                fetchTravelPolicies();
                customEnqueueSnackbar(response?.data?.Context?.Message ?? t("success"), 'success');
                formik.resetForm()
                setIsApplicabilityOpen(false);
                setCurrentPage(1)
                setStep(1)
            } else {
                customEnqueueSnackbar((response as ErrorResponse)?.error?.data?.Context.Message ?? t("something_went_wrong"), 'error');

            }

        } catch (error) {
            customEnqueueSnackbar((error as ErrorResponse)?.error?.data?.Context.Message ?? t("something_went_wrong"), 'error');
        }
    }

    const getPolicyById = async (id: string) => {
        const payload = {
            TravelPolicyId: id
        }
        const response = await getTravelPolicyById(payload)
        if (response?.data?.Context?.StatusCode === 2101) {
            setEditData(response?.data?.Response)
            setIsApplicabilityOpen(true)
            setIsEditPolicy(true)
        } else {
            customEnqueueSnackbar((response.error as ErrorResponse)?.error?.data?.Context.Message ?? t("something_went_wrong"), 'error');
        }

    }

    const editPolicyApi = async (id: string, values: typeof formik.values) => {
        const payload = {
            "id": id,
            "Name": values?.travelPolicyName,
            "UserSegmentId": values?.selectedUserSegment.Id,
            "InPolicy": !values?.setOutOfPolicy,
            "PolicyRevalidation": values?.revalidationStages,
            "HideOutOfPolicy": values?.HideOutOfPolicy,
            "BookAbilityForOutOfPolicy": values?.bookingAbility,
            "ApprovalWorkflowId": values?.selectedApprovalWorkflow?.WorkflowId,
            "Constraints": values?.policyConstants,
            "OrgEntityId": "*",
            "IsDefault": values?.IsDefault,
            "Products": [
                "*"
            ]
        }
        try {
            const response = await editTravelPolicy(payload)
            if (response?.data?.StatusCode === 1002) {
                setEditData({} as TravelPolicyProps);
                formik.resetForm();
                fetchTravelPolicies();
                customEnqueueSnackbar(response?.data?.Message ?? t("success"));
                setCurrentPage(1)
                setStep(1)
                setIsApplicabilityOpen((prev) => !prev)
                formik.setFieldValue("selectedUserSegment", { "Id": "", "Name": "" })
            } else {
                customEnqueueSnackbar((response as ErrorResponse)?.error?.data?.Message ?? t("something_went_wrong"), 'error');
            }
        } catch (error) {
            customEnqueueSnackbar((error as ErrorResponse)?.error?.data?.Context.Message ?? t("something_went_wrong"), 'error');
        }

    }

    const getSearchTerm = (index: number): string => {
        const searchTerms = ["", "flights", "hotels", "visa", "holidays", "cabs"];
        return searchTerms[index];
    };

    /**
     * Handles the tab change and fetches the relevant travel policies
     * @param {React.SyntheticEvent} event - The event that triggered the tab change
     * @param {number} tabIndex - The index of the tab that has been changed to
     */
    const handleTabChange = (event: React.SyntheticEvent, tabIndex: number): void => {
        setValue(tabIndex);
        const searchQuery = getSearchTerm(tabIndex);
        fetchTravelPolicies(searchQuery);
    };

    useEffect(() => {
        const searchQuery = getSearchTerm(value);
        fetchTravelPolicies(searchQuery);
    }, [currentPage]);

    const fetchApprovalWorkflow = async (searchKey: string = "") => {
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
                        PageNumber: 1,
                        PageSize: 100,
                    },
                    SearchText: searchKey,
                    Type: "All"
                }
            };
            const data = await fetchWorkflows(requestBody)
            setWorkflowOptions(data?.data?.Response?.Data)
            if (isCreated && data?.data?.Response?.Data?.length > 0) {
                formik.setFieldValue('selectedApprovalWorkflow', data?.data?.Response?.Data[0]);
            }

        } catch (error) {
            customEnqueueSnackbar((error as ErrorResponse)?.error?.data?.Context.Message ?? t("something_went_wrong"), 'error');
        }
    };

    useEffect(() => {
        fetchApprovalWorkflow()
        if (isCreated) {
            const timer = setTimeout(() => {
                setIsCreated(false);
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [isCreated])

    useEffect(() => {
        const fetchGroupsList = async (): Promise<void> => {
            const payload = {
                pageNumber: currentPage,
                pageSize: 10,
                searchText,
            };
            await fetchGroups(payload);
        };

        const getAllUserSegmentsMethod = async (): Promise<void> => {
            const response = await getAllUserSegments({})
            if (response?.data?.Response) {
                setApplicabilityOptions(response?.data?.Response);
            }

        };
        fetchGroupsList();
        getAllUserSegmentsMethod();
        handlePolicyContraintSearch('');

    }, []);

    useEffect(() => {
        if (data) {
            const newOptions: any[] = [];
            if (data?.AutoCompleteApproversSearch?.Response?.Profiles && data?.AutoCompleteApproversSearch?.Response?.Profiles.length > 0) {
                data?.AutoCompleteApproversSearch?.Response?.Profiles?.forEach((profile: { [key: string]: string }) => {
                    newOptions.push({
                        label: `${profile.FirstName} ${profile.MiddleName ?? ""} ${profile.LastName}`,
                        type: 'Profile',
                        ...profile,
                    });
                });
            }
        }
    }, [data]);

    useEffect(() => {
        if (policyConstraintsData) {
            if (policyConstraintsData?.AutoCompletePolicyConstraintSearch?.Response?.Buckets && policyConstraintsData?.AutoCompletePolicyConstraintSearch?.Response?.Buckets.length > 0) {
                setPolicyConstraints(policyConstraintsData?.AutoCompletePolicyConstraintSearch?.Response?.Buckets);
            }
        }
    }, [policyConstraintsData]);


    /**
     * Handles changes to the expanded state of the travel policy sections (e.g. "Book", "Fly", etc.)
     * by updating the expandedSections state array.
     *
     * @param {React.SyntheticEvent} _event - The change event
     * @param {string} sectionId - The section to update the expanded state of
     */
    const handleAccordionChange = (_event: React.SyntheticEvent, sectionId: string): void => {
        setExpandedSections((prevSections) =>
            prevSections?.includes(sectionId)
                ? prevSections.filter((id) => id !== sectionId)
                : [...prevSections, sectionId]
        );
    };

    const handleUpdateFormikValues = (fieldName: string, value: boolean) => {
        formik.setFieldValue(fieldName, value);
    };

    /**
     * Handles the click event on a policy item, setting the anchor element
     * and updating the state to indicate if the clicked policy is the default policy.
     *
     * @param {React.MouseEvent<HTMLElement>} event - The click event that triggered the function.
     * @param {boolean | undefined} isDefaultPolicy - Indicates if the clicked policy is the default policy.
     */

    const handlePolicyClick = (
        event: React.MouseEvent<HTMLElement>,
        isDefaultPolicy: boolean | undefined,
    ): void => {
        setAnchorEl(event.currentTarget);
        setIsDefaultPolicy(isDefaultPolicy);
    };

    const handleClose = (policyIndex: number) => {
        setAnchorEl(null);
        setMenuOpen(p => ({ ...p, [policyIndex]: !p[policyIndex] }))
    };
    const handlePolicyType = async (menuType: string, policyId: any = null, policy?: TravelPolicyProps) => {

        if (menuType === "default") {
            const userConfirmed = policy?.UserSegmentName?.toLowerCase() === "all employees" ? true : await showAlertDialog("Alert", 'Applicability for Default Policy should be for "All Employees" Do you wish to continue?');
            const userConfirmedPolicy = userConfirmed ? policy?.InPolicy ? true : await showAlertDialog("Alert", 'Policy constraints for Default Policy should be "In-Policy" Do you wish to continue?') : false;
            if (!userConfirmed || !userConfirmedPolicy) {
                return
            }
            try {
                const response = await setAsDefaultPolicy(policyId)
                if (response?.data?.Context?.StatusCode === 1131) {
                    customEnqueueSnackbar(response?.data?.Context?.Message ?? t("success"));
                    fetchTravelPolicies();
                } else {
                    customEnqueueSnackbar((response as ErrorResponse)?.error?.data?.Context.Message ?? t("something_went_wrong"), 'error');

                }

            } catch (error) {
                customEnqueueSnackbar((error as ErrorResponse)?.error?.data?.Context.Message ?? t("something_went_wrong"), 'error');

            }

        }

        setTravelPolicyType(menuType);
        if (menuType === "delete") {
            handleStatusChange([policyId], "ARCHIVED");
            setIsApplicabilityOpen(false)
        }

        if (menuType === "edit") {
            getPolicyById(policyId)
            fetchApprovalWorkflow()
        }

        if (menuType === "view") {
            getPolicyById(policyId)
        }

        if (menuType === "duplicate") {
            try {
                const response = await createDuplicatePolicy(policyId)
                if (response?.data?.Context?.StatusCode === 1004) {
                    customEnqueueSnackbar(response?.data?.Context?.Message ?? t("success"));
                    fetchTravelPolicies();
                } else {
                    customEnqueueSnackbar((response as ErrorResponse)?.error?.data?.Context.Message ?? t("something_went_wrong"), 'error');
                }

            } catch (error) {
                customEnqueueSnackbar((error as ErrorResponse)?.error?.data?.Context.Message ?? t("something_went_wrong"), 'error');

            }

        }
    }
    const travelPolicyHeader = () => {
        return (
            <>
                {travelPolicyType !== 'view' && !isEditPolicy && (
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: step === 1 ? "flex-end" : "space-between" }}>
                        {step > 1 && <IconButton sx={{ p: 0 }} onClick={() => setStep((prev) => prev - 1)} >
                            <ArrowBackIcon />
                        </IconButton>}
                        <ClearIcon onClick={handleCancel} sx={{ cursor: "pointer" }} />
                    </Box>
                )}
                <TextField
                    name="travelPolicyName"
                    type="text"
                    variant="standard"
                    placeholder="Travel Policy Name"
                    value={formik.values.travelPolicyName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.travelPolicyName && Boolean(formik.errors.travelPolicyName)}
                    helperText={formik.touched.travelPolicyName && formik.errors.travelPolicyName}
                    sx={{
                        mt: isMobileView ? "8px" : "38px",
                        width: { xs: "unset", md: "50%" },
                        fontSize: '22px',
                        fontWeight: 600,
                        textAlign: 'left',
                        '& .MuiInputBase-input': {
                            textAlign: 'left',
                        },
                        '& input': {
                            caretColor: theme.palette.customColors?.blue[10],
                        },
                        "& .MuiOutlinedInput-root": {
                            "&.Mui-focused": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: theme.palette.customColors?.lightGray[12],
                                },
                            },
                            "& .MuiInputBase-input": {
                                color: theme.palette.customColors?.grey[15],
                            },
                        },
                        '& .MuiInput-underline': {
                            '&:before': {
                                borderBottom: 'none',
                            },
                            '&:after': {
                                borderBottom: `2px solid ${theme.palette.customColors?.lightBlue[2]}`,
                            },
                            '&:hover:not(.Mui-focused):before': {
                                borderBottom: 'none',
                            },
                        },

                    }}
                    slotProps={{
                        input: {
                            style: {
                                fontSize: '22px',
                                fontWeight: 600,
                                textAlign: 'left',
                            },
                        }
                    }}
                />
                {(formik.values?.setOutOfPolicy === true && step === 3) &&
                    <PolicyConstraintNote>
                        <Typography sx={{ fontSize: isMobileView ? "8px" : "10px", color: theme.palette.customColors?.black[1], fontWeight: "400" }} >This Policy sets <span>Out-of-Policy</span> conditions</Typography>
                    </PolicyConstraintNote>
                }
                <Divider sx={{ color: theme.palette.customColors?.lightGray[12], mt: isMobileView ? "16px" : "22px", mb: isMobileView ? "16px" : "40px" }} />
            </>
        )
    }
    const handlePageChange = (_event: React.ChangeEvent<any>, value: number) => {
        setCurrentPage(value);
    };

    const handleCancel = async () => {
        const userConfirmed = await showAlertDialog("Alert",
            "Your changes will not be saved. Do you wish to continue?");
        if (!userConfirmed) {
            return
        }
        setIsApplicabilityOpen((prev) => !prev)
        setStep(1);
        formik.resetForm();
        if (travelPolicyType === "edit") {
            setEditData({} as TravelPolicyProps)
            formik.setFieldValue("selectedUserSegment", { "Id": "", "Name": "" })
        }
        if (travelPolicyType !== "view") {
            setExpandedSections([])
        }
    }

    const handleSearch = useCallback(
        (text: string) => {
            if (text.trim() !== '' && text.length > 2) {
                getApprovers({ text });
            }
            if (data) {
                const newOptions: object[] = [];
                if (data?.AutoCompleteApproversSearch?.Response?.Profiles && data?.AutoCompleteApproversSearch?.Response?.Profiles.length > 0) {
                    data?.AutoCompleteApproversSearch?.Response?.Profiles?.forEach((profile: { [key: string]: string }) => {
                        newOptions.push({
                            label: `${profile.FirstName} ${profile.MiddleName ?? ""} ${profile.LastName}`,
                            type: 'Profile',
                            ...profile,
                        });
                    });
                }
            }
        },
        [searchText, getApprovers]
    );

    const handleInputChange = (_event: React.SyntheticEvent<Element, Event>, value: string) => {
        setSearchText(value);
        handleSearch(searchText);
    };

    const handlePolicyContraintSearch = useCallback(
        async (text: string) => {
            setSearchText(text);
            // Only make API call if text is empty or has more than 2 characters
            if (text === '' || text.length > 2) {
                try {
                    await getPolicyConstraints({ text });

                } catch (error) {
                    customEnqueueSnackbar((error as ErrorResponse)?.error?.data?.Context.Message ?? t("something_went_wrong"), 'error');
                }
            }

            // Update expanded sections based on search text
            if (text.length > 0 && policyConstraints?.length > 0) {
                const matchingSections = policyConstraints
                    .filter(group =>
                        group.Name.toLowerCase().includes(text.toLowerCase()) ||
                        group.PolicyConstraints?.some(constraint =>
                            constraint.Name.toLowerCase().includes(text.toLowerCase())
                        )
                    )
                    .map(group => group.Name);
                setExpandedSections(matchingSections);
            } else {
                setExpandedSections([]);
            }
        },
        [getPolicyConstraints, policyConstraints]
    );

    const handlePolicyContraintInputChange = (_event: React.SyntheticEvent<Element, Event>, value: string) => {
        handlePolicyContraintSearch(value);
    };
    const handleDynamicFormSubmit = (data: unknown) => {
        const existing = formik.values.policyConstants || [];
        const updated = existing.some(item => item.PolicyConstraintId === data.PolicyConstraintId)
            ? existing.map(item =>
                item.PolicyConstraintId === data.PolicyConstraintId ? data : item
            )
            : [...existing, data];
        formik.setFieldValue('policyConstants', updated);
        setIsFormOpen(false);
        setEditFormData({});
    };

    const handleDynamicFormClose = () => {
        setIsFormOpen((prev) => !prev);
        setEditFormData({});
    }
    const viewPolicy = (): JSX.Element => {
        return (
            <Box sx={{ width: isMobileView ? "100vw" : "70vw", margin: "auto", marginTop: 0.5, px: 4, pb: 4, pt: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                    <ClearIcon onClick={() => {
                        setEditData({} as TravelPolicyProps)
                        formik.resetForm()
                        formik.setFieldValue("selectedUserSegment", { "Id": "", "Name": "" })
                        setIsApplicabilityOpen((prev) => !prev)
                    }} sx={{ cursor: "pointer" }} />
                </Box>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "2rem"
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start"
                    }}>

                        <Typography sx={{
                            fontWeight: "600",
                            fontSize: "20px",
                        }}>{editData?.Name}</Typography>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: 1
                    }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                            onClick={() => {
                                setIsEditPolicy(true)
                                handlePolicyType("edit", editData?.TravelPolicyId)
                            }}
                        >
                            <Box
                                component="img"
                                src={EditIconBlue}
                                sx={{
                                    height: "12px",
                                    width: "12px",
                                    cursor: "pointer",
                                    mr: 1,
                                }}
                            />
                            <Typography sx={{
                                fontWeight: "400",
                                fontSize: "14px",
                                cursor: "pointer"
                            }} color={theme.palette.customColors?.blue[10]}>Edit</Typography>
                        </Box>
                        {formik.values?.IsDefault === false && (
                            <>
                                <Typography sx={{ color: theme.palette.customColors?.lightGray[12] }}>|</Typography>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                                    onClick={() => {
                                        handlePolicyType("delete", editData?.TravelPolicyId)
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={deleteIconTable}
                                        sx={{
                                            height: "12.5px",
                                            width: "12.5px",
                                            cursor: "pointer",
                                            mr: 1,
                                        }}
                                    />
                                    <Typography sx={{
                                        fontWeight: "400",
                                        fontSize: "14px",
                                        cursor: "pointer",
                                    }} color={theme.palette.customColors?.grey[8]}>Delete</Typography>
                                </Box>
                            </>
                        )}
                    </Box>

                </Box>
                <Divider sx={{ color: theme.palette.customColors?.lightGray[12], mt: "2rem", mb: 2 }} />
                {/*Applicability*/}
                <Box sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    flexDirection: isMobileView ? "column" : "row",
                    gap: 1
                }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                        width: isMobileView ? "100%" : "70%"
                    }}>
                        <Typography sx={{
                            fontSize: isMobileView ? "12px" : "14px",
                            fontWeight: "500"
                        }} >Applicability</Typography>
                        <Typography sx={{
                            fontSize: isMobileView ? "10px" : "12px",
                            color: theme.palette.customColors?.grey[8],
                            fontWeight: "400",
                            mt: 1
                        }} >Set(s) the users on which this Travel Policy will apply</Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-start"
                    }}>
                        <Typography sx={{
                            fontSize: isMobileView ? "10px" : "14px",
                            color: theme.palette.customColors?.lightWhite[7],
                            fontWeight: 500,
                        }} >{editData?.UserSegmentId === '*' ? 'Team DT Warriors' : editData?.UserSegmentName}</Typography>

                    </Box>
                </Box>
                {/*Policy constraints*/}
                <Box sx={{
                    my: 4
                }}>
                    {policyContain()}
                </Box>
                {/*Policy Revalidation*/}
                <Box sx={{
                    my: 4
                }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <Typography sx={{
                            fontSize: isMobileView ? "12px" : "14px",
                            fontWeight: "500"
                        }} >Policy Revalidation</Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        flexDirection: isMobileView ? "column" : "row"
                    }}>
                        <Typography sx={{
                            fontSize: isMobileView ? "10px" : "12px",
                            color: theme.palette.customColors?.grey[8],
                            fontWeight: "400",
                            mt: 1
                        }} >Set(s) the stages at which the policy needs to be revalidated</Typography>
                        <FormGroup sx={{
                            mt: isMobileView ? "8px" : 0,
                            '& .MuiFormControlLabel-root': {
                                marginBottom: -0.5,
                                marginTop: -1
                            },
                        }}>
                            <FormControlLabel disabled labelPlacement={isMobileView ? "end" : "start"} control={<Checkbox icon={<BpIcon sx={{ fontSize: '16px' }} />}
                                checkedIcon={<BpDisableIcon sx={{ fontSize: '16px' }} />} checked={editData?.PolicyRevalidation?.SearchResultPage} size="small" />} label="Search Result Page"
                                sx={{
                                    '& .MuiFormControlLabel-label': {
                                        fontSize: '10px',
                                        fontWeight: "400",
                                        color: theme.palette.customColors?.grey[8]

                                    },
                                }} />
                            <FormControlLabel disabled labelPlacement={isMobileView ? "end" : "start"} control={<Checkbox icon={<BpIcon sx={{ fontSize: '16px' }} />}
                                checkedIcon={<BpDisableIcon sx={{ fontSize: '16px' }} />} checked={editData?.PolicyRevalidation?.ReviewPage} size="small" />} label="Review Page" sx={{
                                    '& .MuiFormControlLabel-label': {
                                        fontSize: '10px',
                                        fontWeight: "400",
                                        color: theme.palette.customColors?.grey[8]

                                    },
                                }} />
                            <FormControlLabel disabled labelPlacement={isMobileView ? "end" : "start"} control={<Checkbox icon={<BpIcon sx={{ fontSize: '16px' }} />}
                                checkedIcon={<BpDisableIcon sx={{ fontSize: '16px' }} />} checked={editData?.PolicyRevalidation?.ApprovalPage} size="small" />} label="Approval Page" sx={{
                                    '& .MuiFormControlLabel-label': {
                                        fontSize: '10px',
                                        fontWeight: "400",
                                        color: theme.palette.customColors?.grey[8]
                                    },
                                }} />
                            <FormControlLabel disabled labelPlacement={isMobileView ? "end" : "start"} control={<Checkbox icon={<BpIcon sx={{ fontSize: '16px' }} />}
                                checkedIcon={<BpDisableIcon sx={{ fontSize: '16px' }} />} checked={editData?.PolicyRevalidation?.PaymentPage} size="small" />} label="Payment Page" sx={{
                                    '& .MuiFormControlLabel-label': {
                                        fontSize: '10px',
                                        fontWeight: "400",
                                        color: theme.palette.customColors?.grey[8]
                                    },
                                }} />
                        </FormGroup>
                    </Box>

                </Box>
                {/*Hide Out of Policy Options*/}
                <Box sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    flexDirection: isMobileView ? "column" : "row",
                    gap: 1

                }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        flexDirection: "column"
                    }}>
                        <Typography sx={{
                            fontSize: isMobileView ? "12px" : "14px",
                            fontWeight: "500"
                        }} >Hides Out of Policy Options</Typography>
                        <Typography sx={{
                            fontSize: isMobileView ? "10px" : "12px",
                            color: theme.palette.customColors?.grey[8],
                            fontWeight: "400",
                            mt: 1
                        }} >Hides Out of Policy options from Search Result Page when  turned ON</Typography>

                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                    }}>
                        <FormControlLabel
                            control={<CustomSwitchBlue sx={{ ml: '5px', }}
                                disabled={!formik.values.setOutOfPolicy}
                                size='small'
                                checked={Boolean(formik.values.HideOutOfPolicy)}
                            />} label=""
                            onChange={() => {
                                if (!formik.values.setOutOfPolicy) {
                                    formik.setFieldValue('bookingAbility', 'DENY', false);
                                    formik.setFieldValue('selectedApprovalWorkflow', null, false);
                                }
                                handleUpdateFormikValues('HideOutOfPolicy', !formik.values.HideOutOfPolicy)
                            }}
                            sx={{ fontSize: "10px", mr: 0, marginTop: '5px' }}

                        />
                    </Box>
                </Box>
                {/*Booking Ability for Out of Policy Options*/}
                <Box sx={{
                    my: 4,
                    display: "flex",
                    flexDirection: isMobileView ? "column" : "row",
                    justifyContent: "space-between",
                }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        flexDirection: "column"
                    }}>
                        <Typography sx={{
                            fontSize: isMobileView ? "12px" : "14px",
                            fontWeight: "500"
                        }} >Booking Ability for Out of Policy Options</Typography>
                        <Typography sx={{
                            fontSize: isMobileView ? "10px" : "12px",
                            color: theme.palette.customColors?.grey[8],
                            fontWeight: "400",
                            mt: 1
                        }} >Configures whether or not Out-of-Policy opitons can be booked</Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        mt: isMobileView ? 1 : 0
                    }}>
                        <AllowDenyToggle value={editData?.BookOutOfPolicyOption}
                            onChange={() => { }}
                            disabled={Boolean(editData?.HideOutOfPolicy)}
                            travelPolicyType={travelPolicyType}
                        />

                    </Box>

                </Box>
                {/*Approval Workflow*/}
                <Box sx={{
                    my: 4,
                    display: "flex",
                    flexDirection: isMobileView ? "column" : "row",
                    justifyContent: "space-between",

                }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        flexDirection: "column"
                    }}>
                        <Typography sx={{
                            fontSize: isMobileView ? "12px" : "14px",
                            fontWeight: "500"
                        }} >Approval Workflow</Typography>
                        <Typography sx={{
                            fontSize: isMobileView ? "10px" : "12px",
                            color: theme.palette.customColors?.grey[8],
                            fontWeight: "400",
                            mt: 1
                        }} >Sets Approval workflow for the selected default policy type</Typography>

                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        mt: isMobileView ? 1 : 0
                    }}>
                        <Typography sx={{
                            fontSize: isMobileView ? "10px" : "12px",
                            fontWeight: 500
                        }} >{editData?.ApprovalWorkflowName ? editData?.ApprovalWorkflowName : "No Approval Process Selected"}</Typography>
                    </Box>
                </Box>
            </Box>
        )
    }
    const editPolicy = (): JSX.Element => {
        return (
            <Box sx={{ width: { xs: '100vw', md: '70vw' }, margin: "auto", marginTop: 0.5, px: 4, pb: 4, pt: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                    <ClearIcon sx={{ cursor: "pointer" }} onClick={() => { setIsApplicabilityOpen((prev) => !prev); setEditData({} as TravelPolicyProps); formik.resetForm(); formik.setFieldValue("selectedUserSegment", { "Id": "", "Name": "" }) }} />
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <TextField
                        name="travelPolicyName"
                        type="text"
                        variant="standard"
                        placeholder="Travel Policy Name"
                        value={formik.values.travelPolicyName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.travelPolicyName && Boolean(formik.errors.travelPolicyName)}
                        helperText={formik.touched.travelPolicyName && formik.errors.travelPolicyName}
                        sx={{
                            width: "50%",
                            fontSize: '20px',
                            fontWeight: 600,
                            textAlign: 'left',
                            '& .MuiInputBase-input': {
                                textAlign: 'left',
                            },
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused": {
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: theme.palette.customColors?.lightGray[12],
                                    },
                                    "& .MuiInputBase-input": {
                                        color: theme.palette.customColors?.black[1],
                                    },
                                },
                                "& .MuiInputBase-input": {
                                    color: theme.palette.customColors?.grey[15],
                                },
                            },
                            '& .MuiInput-underline': {
                                '&:before': {
                                    borderBottom: 'none',
                                },
                                '&:after': {
                                    borderBottom: `2px solid ${theme.palette.customColors?.lightBlue[2]}`,
                                },
                                '&:hover:not(.Mui-focused):before': {
                                    borderBottom: 'none',
                                },
                            },

                        }}
                        slotProps={{
                            input: {
                                style: {
                                    fontSize: '22px',
                                    fontWeight: 600,
                                    textAlign: 'left',
                                },
                            }
                        }}
                    />
                    {formik.values?.IsDefault === true &&
                        <PolicyConstraintNote >
                            <Typography sx={{ fontSize: isMobileView ? "8px" : "10px", color: theme.palette.customColors?.black[1], fontWeight: "400" }} >Only Approval workflow can be edited</Typography>
                        </PolicyConstraintNote>
                    }
                    {formik.values?.setOutOfPolicy === true &&
                        <PolicyConstraintNote >
                            <Typography sx={{ fontSize: isMobileView ? "8px" : "10px", color: theme.palette.customColors?.black[1], fontWeight: "400" }} >This Policy sets Out-of-Policy conditions</Typography>
                        </PolicyConstraintNote>
                    }
                </Box>
                <Divider sx={{ color: theme.palette.customColors?.lightGray[12], mt: isMobileView ? "1rem" : "2rem", mb: isMobileView ? 1 : 2 }} />
                {/*Applicability*/}
                <Box sx={{ marginTop: isMobileView ? "20px" : "49px" }}>
                    {applicability()}
                </Box>
                {/*Policy constraints*/}
                <Box sx={{
                    my: 4
                }}>
                    {policyContain()}
                </Box>
                {/*Policy Revalidation*/}
                <Box sx={{
                    my: 4
                }}>
                    {policyRevalidation()}
                </Box>
                {/*Approval Workflow*/}
                <Box sx={{
                    my: 4,
                }}>
                    <Box sx={{
                        width: isMobileView ? "100%" : '67%',
                        backgroundColor: theme.palette.customColors?.white[0],
                        position: "fixed",
                        bottom: 0,
                        right: 0,
                        paddingBottom: 2,
                        paddingTop: 0.2,
                        paddingLeft: 2,
                        paddingRight: 2,
                        display: "flex",
                        justifyContent: "flex-end",
                        marginRight: isMobileView ? "12px" : "29px"
                    }}>
                        <Button
                            variant='outlined'
                            sx={{
                                color: theme.palette.customColors?.blue[10],
                                textTransform: "none",
                                borderColor: theme.palette.customColors?.lightBlue[2]
                            }}
                            size="medium"
                            onClick={() => { handleCancel() }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant='contained'
                            sx={{
                                backgroundColor: theme.palette.customColors?.blue[10],
                                textTransform: "none",
                                ml: 1
                            }}
                            size="medium"
                            loading={isEditAPILoading}
                            onClick={async () => {
                                const errors = await formik.validateForm();
                                if (Object.keys(errors).length === 0) {
                                    formik.handleSubmit();
                                } else {
                                    formik.setTouched({
                                        selectedApprovalWorkflow: {
                                            WorkflowId: true,
                                            Name: true
                                        },
                                    });
                                }

                            }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Box>
        )
    }
    const applicability = (): JSX.Element => {
        return (
            <>
                <Box sx={{ display: 'flex', flexDirection: isMobileView ? 'column' : 'row', justifyContent: 'space-between', width: "100%" }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start"
                    }}>
                        <Typography sx={{
                            fontSize: isMobileView ? "12px" : "14px",
                            fontWeight: "500",
                            color: theme.palette.customColors?.black[1],
                        }} >Applicability*</Typography>
                        <Typography sx={{
                            fontSize: isMobileView ? "10px" : "12px",
                            color: theme.palette.customColors?.grey[8],
                            fontWeight: "400",
                            mt: 1
                        }} >Set the users on which this Travel Policy will apply</Typography>

                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-end",
                        mt: 1,
                        flexWrap: "wrap",
                        flex: 1
                    }}>
                        <Autocomplete
                            disabled={travelPolicyType === 'edit' && editData.IsDefault === true}
                            disablePortal
                            options={applicabilityOptions ?? []}
                            sx={{ width: { xs: '100%', md: '50%' } }}
                            value={formik.values.selectedUserSegment}
                            getOptionLabel={(option) => option.Name}
                            onChange={(_event, value) => formik.setFieldValue('selectedUserSegment', value)}
                            onInputChange={handleInputChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    name="selectedUserSegment"
                                    size="small"
                                    disabled={travelPolicyType === 'edit' && editData.IsDefault === true}
                                    error={formik.touched.selectedUserSegment && Boolean(formik.errors.selectedUserSegment)}
                                    helperText={formik.touched.selectedUserSegment && typeof formik.errors.selectedUserSegment === 'string' ? formik.errors.selectedUserSegment : undefined}
                                    onBlur={formik.handleBlur}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            height: 36,
                                            borderRadius: 2, // or '10px' if you prefer
                                        },
                                    }}
                                />
                            )}
                            renderOption={(props, option) => {
                                const { key, ...optionProps } = props;
                                return (
                                    <Typography key={key} {...optionProps} sx={{
                                        m: "5px 12px 5px 10px",
                                        borderRadius: "4px",
                                        fontSize: isMobileView ? "10px" : "12px",
                                        '&:hover': {
                                            background: `${theme.palette.customColors?.blue[11]} !important`
                                        }
                                    }}>
                                        {option?.Name}
                                    </Typography>
                                );
                            }}

                            filterOptions={(options, state) => {
                                const inputValue = state.inputValue.toLowerCase();

                                return options.filter(option => {
                                    const isNameMatch = option.Name.toLowerCase().includes(inputValue);
                                    return Boolean(isNameMatch);
                                });
                            }}

                            slots={{
                                paper: ({ children }) => (
                                    <Paper>
                                        {children}
                                        <Button
                                            color="primary"
                                            fullWidth
                                            sx={{ fontSize: '12px', fontWeight: 400, justifyContent: 'flex-start', pl: 2, textTransform: 'none', color: theme.palette.customColors?.lightBlue[2], borderTop: `2px solid ${theme.palette.customColors?.lightGray[12]}`, borderRadius: "0" }}
                                            onMouseDown={() => setModalViewModal((prev) => !prev)}
                                            onClick={() => setModalViewModal((prev) => !prev)}
                                        >
                                            <span style={{ fontSize: "16px", fontWeight: "500", marginRight: "3px" }}>+</span>
                                            Create New
                                        </Button>
                                    </Paper>
                                ),
                            }}

                            slotProps={{
                                clearIndicator: { style: { visibility: formik.values.selectedUserSegment?.Id !== "" ? 'visible' : 'hidden' } },
                            }}
                        />

                    </Box>
                </Box>
                {!isEditPolicy && (
                    <Box sx={{
                        width: isMobileView ? "100%" : '67%',
                        backgroundColor: theme.palette.customColors?.white[0],
                        position: "fixed",
                        bottom: 0,
                        right: 0,
                        paddingBottom: 2,
                        paddingTop: 0.2,
                        paddingLeft: 2,
                        paddingRight: 2,
                        display: "flex",
                        justifyContent: "flex-end",
                        marginRight: "1rem"
                    }}>
                        <Button
                            variant='outlined'
                            sx={{
                                color: theme.palette.customColors?.blue[10],
                                textTransform: "none",
                                borderColor: theme.palette.customColors?.lightBlue[2]
                            }}
                            size="medium"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant='contained'
                            sx={{
                                backgroundColor: theme.palette.customColors?.blue[10],
                                textTransform: "none",
                                ml: 1
                            }}
                            size="medium"
                            onClick={async () => {
                                const errors = await formik.validateForm();
                                if (Object.keys(errors).length === 0) {
                                    setStep((prev) => prev + 1);
                                } else {
                                    formik.setTouched({
                                        travelPolicyName: true,
                                        selectedUserSegment: {
                                            Id: true,
                                            Name: true,
                                        },
                                    });
                                }
                            }}
                        >
                            Continue
                        </Button>
                    </Box>
                )}
            </>
        )
    }
    const groupCheckBox = (revalidationOptions): JSX.Element => {
        return (
            <FormGroup sx={{
                '& .MuiFormControlLabel-root': {
                    marginBottom: -0.5, // adjust this value to control vertical gap
                    marginTop: -1,
                    ml: '-11px',
                    flexDirection: { xs: 'row', md: 'row-reverse' }
                },
            }}>

                <FormControlLabel
                    key={'SearchResultPage'}
                    disabled={true}
                    labelPlacement="start"
                    control={
                        <Checkbox
                            icon={<BpIcon sx={{ fontSize: '16px' }} />}
                            checkedIcon={<BpDisableIcon sx={{ fontSize: '16px' }} />}
                            name="revalidationStages"
                            value={'SearchResultPage'}
                            checked={formik.values.revalidationStages['SearchResultPage']}
                            onChange={(e) => {
                                const checked = e.target.checked;
                                const currentStages = formik.values.revalidationStages;
                                formik.setFieldValue('revalidationStages', { ...currentStages, ['SearchResultPage']: checked }, false);
                            }}
                            onBlur={formik.handleBlur}
                            size="small"
                        />
                    }
                    label={'Search Result Page'}
                    sx={{
                        '& .MuiFormControlLabel-label': {
                            fontSize: '10px',
                            fontWeight: '300',
                            color: theme.palette.customColors?.black[1],
                        },
                    }}
                />

                {revalidationOptions.map((option) => (
                    <FormControlLabel
                        key={option}
                        disabled={formik.values?.IsDefault}
                        labelPlacement="start"
                        control={
                            <Checkbox
                                icon={<BpIcon sx={{ fontSize: '16px' }} />}
                                checkedIcon={<BpCheckedIcon sx={{ fontSize: '16px' }} />}
                                name="revalidationStages"
                                value={option}
                                checked={formik.values.revalidationStages[option]}
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    const currentStages = formik.values.revalidationStages;
                                    formik.setFieldValue('revalidationStages', { ...currentStages, [option]: checked }, false);
                                    if (option === "ApprovalPage" && !checked) {
                                        formik.setFieldValue('selectedApprovalWorkflow', null, false)
                                    }
                                }}
                                onBlur={formik.handleBlur}
                                size="small"
                            />
                        }
                        label={option.replace(/([A-Z])/g, ' $1').trim()}
                        sx={{
                            '& .MuiFormControlLabel-label': {
                                fontSize: '10px',
                                fontWeight: '400',
                                fontFamily: 'Poppins',
                                color: formik.values.revalidationStages[option] ? 'theme.palette.customColors?.black[1]' : theme.palette.customColors?.grey[8]
                            },
                        }}
                    />
                ))}
                {formik.touched.revalidationStages && formik.errors.revalidationStages && Object.keys(formik.errors.revalidationStages).length > 0 && (
                    <Typography sx={{ color: 'red', fontSize: '0.7rem', mt: 1 }}>
                        {Object.keys(formik.errors.revalidationStages).map((key, index) => (
                            <div key={index}>{formik.errors.revalidationStages?.[key]}</div>
                        ))}
                    </Typography>
                )}
            </FormGroup>)
    }
    const policyContain = (): JSX.Element => {
        return (
            <>
                <Box>
                    <Box sx={{ display: 'flex', flexDirection: isMobileView ? "column" : "row", justifyContent: "space-between" }}>
                        <Box sx={{ display: 'flex', flexDirection: "column", alignitems: "flex-start" }}>
                            <Typography sx={{
                                fontSize: isMobileView ? "12px" : "14px",
                                fontWeight: "500",
                                color: theme.palette.customColors?.black[1]
                            }} >Policy constraints*</Typography>
                            <Typography sx={{
                                mt: 1,
                                fontSize: isMobileView ? "10px" : "12px",
                                color: theme.palette.customColors?.grey[8],
                                fontWeight: "400"
                            }} >{t("set_out_of_policy")}</Typography>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: { xs: "flex-start", md: "flex-end" },
                            width: "60%",
                            flexWrap: "wrap",
                            mt: isMobileView ? 1 : 0
                        }}>
                            <FormGroup
                                sx={{
                                    '& .MuiFormControlLabel-root': {
                                        my: 0,
                                        mx: 0
                                    },
                                }}
                            >
                                {(travelPolicyType === "view" || formik.values?.IsDefault) && <Typography sx={{
                                    fontSize: isMobileView ? "12px" : "14px",
                                    color: theme.palette.customColors?.lightWhite[7],
                                    fontWeight: 500
                                }}>{!formik.values.setOutOfPolicy ? "In-Policy" : "Out-of-Policy"}</Typography>}
                                {(travelPolicyType !== "view" && formik.values?.IsDefault === false) && <FormControlLabel
                                    disabled={formik.values?.IsDefault}
                                    labelPlacement="start"
                                    control={
                                        <CustomSwitchBlue
                                            sx={{ ml: '5px' }}
                                            name="setOutOfPolicy"
                                            checked={travelPolicyType === "view" ? formik.values?.InPolicy : formik.values.setOutOfPolicy}
                                            onChange={(e) => {
                                                formik.setFieldValue('setOutOfPolicy', e.target.checked, false)
                                                if (!e.target.checked) {
                                                    formik.setFieldValue('HideOutOfPolicy', false, false)
                                                    formik.setFieldValue('bookingAbility', "DENY", false)
                                                    formik.setFieldValue('selectedApprovalWorkflow', {
                                                        WorkflowId: "",
                                                        Name: ""
                                                    }, false)
                                                }
                                                if (e.target.checked && formik.values?.bookingAbility === "DENY") {
                                                    formik.setFieldValue('selectedApprovalWorkflow', {
                                                        WorkflowId: "",
                                                        Name: ""
                                                    }, false)
                                                }
                                            }}
                                            size="small"
                                            disabled={travelPolicyType === "view" || formik.values?.IsDefault === true}
                                        />
                                    }
                                    label="Sets Out-of-Policy"
                                    sx={{
                                        alignItems: 'center',
                                        '& .MuiFormControlLabel-label': {
                                            fontSize: '12px',
                                            fontWeight: 400,
                                            color: 'theme.palette.customColors?.black[1]',
                                        },
                                    }}
                                />}
                                {formik.touched.setOutOfPolicy && formik.errors.setOutOfPolicy && (
                                    <Typography sx={{ color: 'red', fontSize: '0.7rem', mt: 1 }}>
                                        {formik.errors.setOutOfPolicy}
                                    </Typography>
                                )}
                            </FormGroup>
                        </Box>
                    </Box>
                    {travelPolicyType !== 'view' && !isEditPolicy && <Box sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        mt: '1rem',
                        px: { xs: 0, md: 2 }
                    }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                        }}>
                            <Typography sx={{
                                fontSize: isMobileView ? "12px" : "14px",
                                fontWeight: "500",
                                mb: "4px"
                            }} >Set Conditions*</Typography>

                            <Typography sx={{
                                fontSize: isMobileView ? "10px" : "12px",
                                color: theme.palette.customColors?.grey[8],
                                fontWeight: "400"
                            }} >Set the conditions for your Travel Policy to make it applicable in certain scenarios only</Typography>
                        </Box>
                    </Box>}

                    {
                        formik.values?.policyConstants.length > 0 && formik.values.policyConstants.map((item, index) => {
                            return (
                                <ConditionsList
                                    key={item?.PolicyConstraintName ?? index}
                                    title={item?.PolicyConstraintName ?? ""}
                                    details={item} index={index}
                                    onClose={(index: number) => {
                                        const updatedPolicyConstants = formik.values.policyConstants.filter((_, idx) => idx !== index);
                                        formik.setFieldValue('policyConstants', updatedPolicyConstants, false);
                                        setEditFormData({})
                                    }}
                                    onEdit={async (PolicyConstraintId: string) => {
                                        try {
                                            const response = await getrulesbyconstraintid(PolicyConstraintId)
                                            if (response?.data?.Context?.StatusCode === 1001) {
                                                setPolicyConstraintRules(response?.data?.Response)
                                                const isPolicyContraintExist = formik.values?.policyConstants.find((policy) => policy.PolicyConstraintId === PolicyConstraintId) ?? {};
                                                setEditFormData(isPolicyContraintExist)
                                                setIsFormOpen((prev) => !prev)
                                            }
                                            if (response?.error?.data?.Context?.StatusCode === 1005) {
                                                customEnqueueSnackbar((response as ErrorResponse)?.error?.data?.Context.Message ?? t("something_went_wrong"), 'error');
                                            }
                                        } catch (e) {
                                            customEnqueueSnackbar((e as ErrorResponse)?.error?.data?.Context.Message ?? t("something_went_wrong"), 'error');

                                        }
                                    }}
                                    travelPolicyType={travelPolicyType}
                                    editData={editData}
                                />)
                        })
                    }
                    {/*Policy constraints*/}
                    {(travelPolicyType !== 'view' && formik.values?.IsDefault !== true) &&
                        <Box sx={{
                            my: 4,
                            px: { xs: 0, md: 2 }
                        }}>
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                                <Typography sx={{
                                    fontSize: "10px",
                                    fontWeight: "400",
                                    color: theme.palette.customColors?.grey[19]
                                }} >Set Condition</Typography>
                            </Box>
                            <Box sx={{
                            }}>
                                <Autocomplete
                                    disablePortal
                                    options={filteredPolicyConstraints}
                                    noOptionsText="Not Found"
                                    slotProps={{
                                        paper: {
                                            sx: {
                                                margin: '0 !important',
                                                padding: '0 !important',
                                                '& .MuiAutocomplete-listbox': {
                                                    padding: '0 !important',
                                                }
                                            }
                                        }
                                    }}
                                    sx={{
                                        width: { xs: '100%', md: 260 },
                                        '& .MuiAutocomplete-root': {
                                            '& .MuiAutocomplete-popper': {
                                                margin: '0 !important',
                                                '& .MuiPaper-root': {
                                                    margin: '0 !important',
                                                    padding: '0 !important',
                                                },
                                                '& .MuiAutocomplete-listbox': {
                                                    padding: '0 !important',
                                                }
                                            }
                                        },
                                        '& .MuiAutocomplete-listbox': {
                                            padding: '0 !important',
                                        },
                                        '& .MuiAutocomplete-paper': {
                                            padding: '0 !important',
                                            margin: '0 !important',
                                        },
                                        '& .MuiAutocomplete-popper': {
                                            '& .MuiPaper-root': {
                                                padding: '0 !important',
                                            }
                                        },
                                        '& .MuiAutocomplete-popper .MuiAutocomplete-paper': {
                                            padding: '0 !important',
                                        },
                                        '& .MuiAutocomplete-popper .MuiAutocomplete-listbox': {
                                            padding: '0 !important',
                                        }
                                    }}
                                    getOptionLabel={(option) => option?.Name}
                                    onChange={(_event, value) => {
                                        formik.setFieldValue('selectedConditions', value, false)
                                    }}
                                    onInputChange={handlePolicyContraintInputChange}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            name="selectedConditions"
                                            size="small"
                                            variant="standard"
                                            placeholder='Add Here'
                                            error={formik.touched.selectedConditions && !isFormOpen && Boolean(formik.errors.policyConstants)}
                                            helperText={formik.touched.selectedConditions && !isFormOpen && typeof formik.errors.policyConstants === 'string' ? formik.errors.policyConstants : undefined}
                                            inputRef={setConditionRef}
                                            onBlur={formik.handleBlur}
                                            sx={{
                                                '& input': {
                                                    caretColor: theme.palette.customColors?.blue[10],
                                                },
                                                '& .MuiAutocomplete-listbox': {
                                                    padding: 0
                                                },
                                                '& .MuiAutocomplete-paper': {
                                                    margin: 0,
                                                    padding: 0,
                                                },
                                                '& .MuiAutocomplete-popper': {
                                                    '& .MuiPaper-root': {
                                                        margin: 0,
                                                        padding: 0,
                                                    }
                                                },
                                                '& .MuiAutocomplete-popper .MuiAutocomplete-paper': {
                                                    margin: '0 !important',
                                                    padding: '0 !important',
                                                },
                                                '& .MuiAutocomplete-popper .MuiAutocomplete-listbox': {
                                                    padding: '0 !important',
                                                    margin: '0 !important',
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    height: 36,
                                                    borderRadius: 2,
                                                },
                                            }}

                                            slotProps={{
                                                input: {
                                                    ...params.InputProps,
                                                    endAdornment: (isGetrulesbyconstraintidLoading ?
                                                        <>
                                                            <InputAdornment position="end">
                                                                <CircularProgress size={20} />
                                                            </InputAdornment>
                                                            {params.InputProps.startAdornment}
                                                        </>
                                                        :
                                                        <>
                                                            {params.InputProps.startAdornment}
                                                        </>
                                                    ),
                                                },
                                            }}


                                        />
                                    )}
                                    renderOption={(_, option: BucketPolicyGroupDto) => {
                                        const hasSubOptions = option.PolicyConstraints && option.PolicyConstraints.length > 0;
                                        const isExpanded = expandedSections.includes(option.Name);
                                        return (
                                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', p: 0, m: 0 }} className='custom-scrollbar'>
                                                <Accordion
                                                    expanded={isExpanded}
                                                    onChange={(e) => handleAccordionChange(e, option.Name)}
                                                    sx={{ boxShadow: 'none', width: '100%', p: 0 }}
                                                >
                                                    <AccordionSummary
                                                        expandIcon={hasSubOptions ? <ExpandMore /> : null}
                                                        sx={{
                                                            backgroundColor: hasSubOptions ? theme.palette.customColors?.white[19] : 'transparent',
                                                            '& .MuiAccordionSummary-content': {
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                            },
                                                            minHeight: 30,
                                                            maxHeight: 30,
                                                            mb: "2px",
                                                            '&.Mui-expanded': {
                                                                minHeight: 30,
                                                                maxHeight: 30,
                                                                backdground: theme.palette.customColors?.lightGray[10],
                                                                mb: "2px"
                                                            }
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontSize: "12px",
                                                                fontWeight: "600",
                                                            }}
                                                        >
                                                            {option.Name}
                                                        </Typography>
                                                    </AccordionSummary>
                                                    {(hasSubOptions && isExpanded) && (
                                                        <AccordionDetails>
                                                            <Box>
                                                                {option.PolicyConstraints.map((subOption) => (
                                                                    <Typography
                                                                        key={subOption.Name}
                                                                        sx={{
                                                                            fontSize: "12px",
                                                                            fontWeight: 400,
                                                                            padding: '4px',
                                                                            borderRadius: "4px",
                                                                            cursor: 'pointer',
                                                                            '&:hover': {
                                                                                background: `${theme.palette.customColors?.blue[11]} !important`
                                                                            }
                                                                        }}
                                                                        onClick={async () => {
                                                                            if (setConditionRef.current) {
                                                                                setConditionRef.current.focus()
                                                                            }
                                                                            try {
                                                                                const response = await getrulesbyconstraintid(subOption.Id)
                                                                                if (response?.data?.Context?.StatusCode === 1001) {
                                                                                    formik.setFieldValue('selectedConditions', { label: subOption.Name }, false)
                                                                                    setPolicyConstraintRules(response?.data?.Response)
                                                                                    setIsFormOpen((prev) => !prev)
                                                                                }
                                                                                if (response?.error?.data?.Context?.StatusCode === 1005) {
                                                                                    customEnqueueSnackbar((response as ErrorResponse)?.error?.data?.Context.Message ?? t("something_went_wrong"), 'error');
                                                                                }


                                                                            } catch (e) {
                                                                                customEnqueueSnackbar((e as ErrorResponse)?.error?.data?.Context.Message ?? t("something_went_wrong"), 'error');

                                                                            }


                                                                        }}
                                                                    >
                                                                        {subOption.Name}
                                                                    </Typography>
                                                                ))}
                                                            </Box>
                                                        </AccordionDetails>
                                                    )}
                                                </Accordion>
                                            </Box>
                                        );
                                    }}
                                    filterOptions={(options, state) => {
                                        const inputValue = state.inputValue.toLowerCase();

                                        return options.filter(option => {
                                            const isBucketMatch = option.Name.toLowerCase().includes(inputValue);
                                            const isConstraintMatch = option.PolicyConstraints?.some(subOption => subOption.Name.toLowerCase().includes(inputValue));
                                            return isBucketMatch || isConstraintMatch;
                                        });
                                    }}
                                />
                            </Box>
                        </Box>}
                </Box >
                {travelPolicyType !== 'view' && !isEditPolicy && <Box sx={{
                    width: isMobileView ? "100%" : '67%',
                    backgroundColor: theme.palette.customColors?.white[0],
                    position: "fixed",
                    bottom: 0,
                    right: 0,
                    paddingBottom: 2,
                    paddingTop: 0.2,
                    paddingLeft: 2,
                    paddingRight: 2,
                    display: "flex",
                    justifyContent: "flex-end",
                    marginRight: "1rem"
                }}>
                    <Button
                        variant='outlined'
                        sx={{
                            color: theme.palette.customColors?.blue[10],
                            textTransform: "none",
                            borderColor: theme.palette.customColors?.lightBlue[2]
                        }}
                        size="medium"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        sx={{
                            backgroundColor: theme.palette.customColors?.blue[10],
                            textTransform: "none",
                            ml: 1
                        }}
                        size="medium"
                        onClick={async () => {
                            const errors = await formik.validateForm();
                            if (Object.keys(errors).length === 0) {
                                if (travelPolicyType !== "view") {
                                    setExpandedSections([])
                                }
                                setStep((prev) => prev + 1);
                            } else {
                                formik.setTouched({
                                    outOfPolicyConditions: true,
                                    selectedConditions: true,
                                });
                            }
                        }}
                    >
                        Continue
                    </Button>
                </Box>}
            </>
        )
    }
    const handleOpen = () => {
        // Calculate available space and set menu position
        setTimeout(() => {
            const selectElement = document.querySelector('[name="selectedApprovalWorkflow"]');
            if (selectElement) {
                const rect = selectElement.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const spaceBelow = viewportHeight - rect.bottom;
                const menuHeight = 180; // maxHeight from MenuListProps
                const newPosition = spaceBelow >= menuHeight ? 'bottom' : 'top';
                setMenuPosition(newPosition);
            }
        }, 0);
        setSelectOpen(true);
    }
    const handleSelectClose = () => {
        setSelectOpen(false);
        setMenuPosition('bottom'); // Reset to default position
    }
    const renderApprovalWorkflowValue = (
        selected: string,
        theme: Theme,
        workflowOptions: Workflow[]
    ) => {
        const placeholder = (
            <span style={{ color: theme?.palette?.customColors?.lightGray[20] }}>
                Select Approval
            </span>
        );
        if (!selected) return placeholder;

        const selectedWorkflow = workflowOptions?.find(wf => wf.WorkflowId === selected);
        return selectedWorkflow?.Name || placeholder;
    };
    const policyRevalidation = () => {
        const revalidationOptions = ["ReviewPage", "ApprovalPage", "PaymentPage"];
        return (
            <>
                <Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "space-between",

                    }}>
                        <Typography sx={{
                            fontSize: isMobileView ? "12px" : "14px",
                            fontWeight: "500",
                            color: theme.palette.customColors?.black[1]
                        }} >Policy Revalidation</Typography>

                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: '10px',
                    }}>
                        <Box sx={{
                            width: { xs: "100%", md: "50%" },
                            flexWrap: "wrap",
                            mt: 1
                        }}>
                            <Typography sx={{
                                fontSize: isMobileView ? "10px" : "12px",
                                color: theme.palette.customColors?.grey[8],
                                fontWeight: "400"
                            }} >Set(s) the stages at which the policy needs to be revalidated</Typography>
                        </Box>
                        {groupCheckBox(revalidationOptions)}
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        mt: '1rem',
                        flexDirection: { xs: "column", md: "row" },
                        gap: '10px'
                    }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                        }}>
                            <Typography sx={{
                                fontSize: isMobileView ? "12px" : "14px",
                                fontWeight: "500",
                                color: theme.palette.customColors?.black[1]
                            }} >Hides Out of Policy Options</Typography>

                            <Typography sx={{
                                fontSize: isMobileView ? "10px" : "12px",
                                color: theme.palette.customColors?.grey[8],
                                fontWeight: "400",
                                mt: 1
                            }} >Hides Out of Policy options from Search Result Page when turned ON</Typography>
                        </Box>

                        <FormControlLabel
                            control={<CustomSwitchBlue sx={{ ml: '5px', }}
                                disabled={!formik.values.setOutOfPolicy}
                                size='small'
                                checked={Boolean(formik.values.HideOutOfPolicy)}
                            />} label=""
                            onChange={() => {
                                if (formik.values.setOutOfPolicy) {
                                    formik.setFieldValue('bookingAbility', 'DENY', false);
                                    formik.setFieldValue('selectedApprovalWorkflow', null, false);
                                }
                                handleUpdateFormikValues('HideOutOfPolicy', !formik.values.HideOutOfPolicy)
                            }}
                            sx={{ fontSize: "10px", mr: 0, marginTop: '5px' }}

                        />
                    </Box>
                    <Box sx={{
                        my: 4
                    }}>
                        <Box sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            mt: '1rem',
                            flexDirection: { xs: "column", md: "row" },
                            gap: '10px'
                        }}>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                justifyContent: "space-between",
                            }}>
                                <Typography sx={{
                                    fontSize: isMobileView ? "12px" : "14px",
                                    fontWeight: "500",
                                    color: theme.palette.customColors?.black[1]
                                }} >Booking Ability for Out of Policy Options</Typography>

                                <Typography sx={{
                                    fontSize: isMobileView ? "10px" : "12px",
                                    color: theme.palette.customColors?.grey[8],
                                    fontWeight: "400",
                                    mt: 1
                                }} >Configures whether or not Out of Policy opitons can be booked</Typography>
                            </Box>
                            <AllowDenyToggle value={formik.values.bookingAbility}
                                onChange={(value) => {
                                    if (value === 'DENY') {
                                        formik.setFieldValue('selectedApprovalWorkflow', null, false);
                                        formik.touched.selectedApprovalWorkflow = true
                                    }
                                    if (value === 'ALLOW') {
                                        formik.validateForm()
                                    }
                                    formik.setFieldValue('bookingAbility', value, false)
                                }}
                                disabled={Boolean(formik.values.HideOutOfPolicy || !formik.values.setOutOfPolicy)} />
                        </Box>
                    </Box>
                    <Box sx={{
                        my: 4
                    }}>
                        <Box sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            mt: '1rem',
                            flexDirection: { xs: "column", md: "row" },
                            gap: '10px',
                        }}>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                justifyContent: "space-between",
                            }}>
                                <Typography sx={{
                                    fontSize: isMobileView ? "12px" : "14px",
                                    fontWeight: "500"
                                }} >Approval Workflow</Typography>

                                <Typography sx={{
                                    fontSize: isMobileView ? "10px" : "12px",
                                    color: theme.palette.customColors?.grey[8],
                                    fontWeight: "400",
                                    mt: 1
                                }} >Set Approval workflow for the selected default policy type</Typography>
                            </Box>

                            <Box sx={{ width: { xs: "100%", md: "unset" } }}>
                                <Typography sx={{ fontWeight: 400, fontSize: "10px", color: theme?.palette?.customColors?.lightWhite[7], my: 0.4, mb: "4px" }}>Select Approval Process</Typography>
                                <Box >
                                    <Select
                                        open={selectOpen}
                                        onOpen={handleOpen}
                                        onClose={handleSelectClose}
                                        IconComponent={CustomDropdownIcon}
                                        disabled={Boolean(isDisabled)}
                                        name='selectedApprovalWorkflow'
                                        displayEmpty
                                        onBlur={formik.handleBlur}
                                        renderValue={(selected) => renderApprovalWorkflowValue(selected?.WorkflowId, theme, workflowOptions)}
                                        value={formik.values.selectedApprovalWorkflow}
                                        onChange={(value) => {
                                            const selectedWorkflow = workflowOptions?.find(wf => wf.WorkflowId === value.target.value);
                                            formik.setFieldValue('selectedApprovalWorkflow', selectedWorkflow ? { WorkflowId: selectedWorkflow?.WorkflowId, Name: selectedWorkflow?.Name } : null, false)
                                        }}
                                        sx={{
                                            height: "36px",
                                            width: { xs: "100%", md: "260px" },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: theme?.palette?.customColors?.black[1],
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: theme?.palette?.customColors?.blue[10],
                                            },
                                            '& .MuiSelect-select': {
                                                color: theme?.palette?.customColors?.black[1],
                                                fontWeight: 400,
                                                fontSize: '12px',
                                                paddingRight: '0px 6px',
                                            },
                                        }}
                                        MenuProps={{
                                            anchorOrigin: {
                                                vertical: menuPosition,
                                                horizontal: 'left',
                                            },
                                            transformOrigin: {
                                                vertical: menuPosition === 'bottom' ? 'top' : 'bottom',
                                                horizontal: 'left',
                                            },
                                            PaperProps: {
                                                sx: {
                                                    width: '260px',
                                                    padding: 0,
                                                },
                                            },
                                            MenuListProps: {
                                                disablePadding: true,
                                                sx: {
                                                    maxHeight: '180px',
                                                    overflowY: 'auto',
                                                    position: 'relative',
                                                    '&::-webkit-scrollbar': {
                                                        width: '4px',
                                                    },
                                                    '&::-webkit-scrollbar-track': {
                                                        backgroundColor: 'transparent',
                                                    },
                                                    '&::-webkit-scrollbar-thumb': {
                                                        backgroundColor: theme?.palette?.customColors?.lightGray[20],
                                                        borderRadius: '4px',
                                                        height: "53px"
                                                    },
                                                },
                                            },
                                            slotProps: {
                                                paper: {
                                                    style: {
                                                        maxHeight: '180px',
                                                    },
                                                },
                                            },
                                            keepMounted: false,
                                            disablePortal: false,
                                            autoFocus: false,
                                            disableScrollLock: true,
                                        }}
                                    >
                                        {workflowOptions?.map((group, index) => (
                                            <MenuItem
                                                sx={{
                                                    color: theme?.palette?.customColors?.black[1],
                                                    fontSize: "12px",
                                                    marginLeft: "12px",
                                                    borderRadius: "4px",
                                                    '&:hover': {
                                                        backgroundColor: theme?.palette?.customColors?.blue[11],
                                                    },
                                                    width: "230px",
                                                    overflow: "hidden",
                                                    whiteSpace: "normal",
                                                    wordWrap: "break-word",
                                                    lineHeight: "1.2",
                                                    minHeight: "auto",
                                                    padding: "8px 12px",
                                                }}
                                                value={group?.WorkflowId}
                                                key={index + group?.WorkflowId}
                                            >
                                                {group?.Name}
                                            </MenuItem>
                                        ))}
                                        <Box
                                            sx={{
                                                cursor: "pointer",
                                                position: 'sticky',
                                                bottom: 0,
                                                borderTop: `2px solid ${theme?.palette?.customColors?.lightGray[12]}`,
                                                backgroundColor: theme?.palette?.customColors?.white[0],
                                                zIndex: 2,
                                                pl: "27px",
                                                py: 0.8,
                                                color: theme?.palette?.customColors?.blue[10],
                                                alignItems: 'center',
                                                fontSize: "12px",
                                                display: "flex",
                                                flexDirection: "row",
                                                gap: 0.5,
                                            }}
                                            onMouseDown={() => {
                                                handleSelectClose();
                                                setIsLevelDrawerOpen(true)
                                            }}
                                            onClick={() => setIsLevelDrawerOpen(true)}
                                        >
                                            <Box
                                                component='img'
                                                src={AddIcon}
                                                alt='AddIcon'
                                                sx={{
                                                    height: '12px',
                                                    width: "12px",
                                                    objectFit: "contain"
                                                }}
                                            />
                                            <Typography> Create New</Typography>
                                        </Box>
                                    </Select>
                                    {formik.touched.selectedApprovalWorkflow && formik.errors.selectedApprovalWorkflow && (
                                        <Typography sx={{ fontSize: "10px", color: theme?.palette?.error?.main, mt: "4px" }}>
                                            {formik.errors.selectedApprovalWorkflow as string}
                                        </Typography>
                                    )}
                                </Box>
                                <CreateApprovalWorkflow setIsCreated={setIsCreated} setIsLevelDrawerOpen={setIsLevelDrawerOpen} isLevelDrawerOpen={isLevelDrawerOpen} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
                {!isEditPolicy && <Box sx={{
                    width: isMobileView ? "100%" : '67%',
                    backgroundColor: theme.palette.customColors?.white[0],
                    position: "fixed",
                    bottom: 0,
                    right: 0,
                    paddingBottom: 2,
                    paddingTop: 0.2,
                    paddingLeft: 2,
                    paddingRight: 2,
                    display: "flex",
                    justifyContent: "flex-end",
                    marginRight: isMobileView ? "12px" : "29px"
                }}>
                    <Button
                        variant='outlined'
                        sx={{
                            color: theme.palette.customColors?.blue[10],
                            textTransform: "none",
                            borderColor: theme.palette.customColors?.lightBlue[2]
                        }}
                        size="medium"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        sx={{
                            backgroundColor: theme.palette.customColors?.blue[10],
                            textTransform: "none",
                            ml: 1
                        }}
                        size="medium"
                        onClick={async () => {
                            // First, set all fields as touched to show validation errors
                            const touchedFields = Object.keys(formik.values).reduce((acc, key) => {
                                acc[key] = true;
                                return acc;
                            }, {} as any);
                            formik.setTouched(touchedFields);
                            // Then validate the form
                            const errors = await formik.validateForm();
                            if (Object.keys(errors).length === 0) {
                                formik.handleSubmit();
                            }
                        }}
                    >
                        Save
                    </Button>
                </Box>}
            </>
        )
    }

    const createPolicy = (): JSX.Element => {
        return (
            <Box sx={{ width: { xs: '100vw', md: '70vw' }, margin: "auto", marginTop: isMobileView ? "10px" : "39px", px: 4, mb: "40px" }}>
                {travelPolicyHeader()}
                {step == 1 && applicability()}
                {step == 2 && policyContain()}
                {step == 3 && policyRevalidation()}
                {/*future use  */}
                {/* <CustomDrawer isOpen={modalViewModal} anchor="right">
                    <Box sx={{ width: 450, margin: "auto", marginTop: 5, px: 4 }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <ArrowBackIcon onClick={() => setModalViewModal((prev) => !prev)} />
                            <ClearIcon onClick={() => setModalViewModal((prev) => !prev)} />
                        </Box>
                        <Typography variant="h6" >Hellooooooooooooo</Typography>
                    </Box>
                </CustomDrawer> */}
            </Box>
        )
    }
    const modalView = (): JSX.Element => {
        return (
            <>
                {
                    travelPolicyType === "view" && viewPolicy()
                }
                {
                    travelPolicyType === "create" && createPolicy()
                }
                {
                    travelPolicyType === "edit" && editPolicy()
                }

            </>
        )
    }

    const handleStatusChange = async (id: string[], state: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED') => {
        let statusMessage;
        switch (state) {
            case 'INACTIVE':
                statusMessage = 'deactivate';
                break;
            case 'ACTIVE':
                statusMessage = 'activate';
                break;
            case 'ARCHIVED':
                statusMessage = 'archive';
                break;
        }
        const userConfirmed = state ? await showAlertDialog("Alert", `This Travel Policy will get ${statusMessage}. Do you wish to continue?`) : true;
        if (!userConfirmed) { return }
        const payload = {
            Context: {
                "UserAgent": "Mozilla/5.0",
                "TrackingId": "ac38544e-5f95-4c79-bb84-c284e7e3d6a7",
                "TransactionId": "ac38544e-5f95-4c79-bb84-c284e7e3d6a7",
                "CountryCode": "IN",
                "IpAddress": "127.0.0.1"
            },
            Request: { TravelPolicyIds: id, Status: state }
        };
        try {
            const response = await updatePolicyStatus(payload)
            if (response?.data?.Context?.StatusCode === 4101 && state !== 'ARCHIVED') {
                const updatedPolicies = policyList.map(policy =>
                    id.includes(policy.TravelPolicyId)
                        ? { ...policy, Status: state }
                        : policy
                );
                setPolicyList(updatedPolicies);
                customEnqueueSnackbar(response?.data?.Context?.Message ?? t("success"), 'success');
            } else if (response?.data?.Context?.StatusCode === 4101 && state === 'ARCHIVED') {
                if (policyList?.length === 1 && currentPage > 1) {
                    setCurrentPage((prv) => prv - 1)
                }
                fetchTravelPolicies();
                customEnqueueSnackbar(response?.data?.Context?.Message ?? t("success"), 'success');
            } else {
                customEnqueueSnackbar((response as ErrorResponse)?.data?.Context?.Message ?? t("something_went_wrong"), 'error');
            }

        } catch (e) {
            customEnqueueSnackbar((e as ErrorResponse)?.error?.data?.Context?.Message ?? t("something_went_wrong"), 'error');
        }
    }

    // Add memoized filtered options

    const filteredPolicyConstraints = useMemo(() => {
        if (!policyConstraints) return [];

        return policyConstraints
            .map(group => ({
                ...group,
                PolicyConstraints: group.PolicyConstraints.filter(
                    constraint => !formik.values.policyConstants
                        ?.map(e => e.PolicyConstraintId)
                        ?.includes(constraint.Id)
                )
            }))
            .filter(group => group.PolicyConstraints.length > 0);
    }, [policyConstraints, formik.values.policyConstants]);

    return (
        <Container>
            <LoadingScreen isLoading={isTraveListAPILoading || isCreateAPILoading} />
            <Box sx={{ width: isMobileView ? '90%' : 1080, m: 'auto', mt: isMobileView ? "35px" : 0 }}>
                <Box sx={{ display: "flex", alignItems: isMobileView ? "flex-start" : "center", justifyContent: isMobileView ? "flex-start" : "space-between", flexDirection: isMobileView ? "column" : "row" }}>
                    <CustomBreadcrumbs breadcrumbData={breadcrumbData} />
                    <Box sx={{ display: "flex", alignItems: isMobileView ? "flex-start" : "flex-end", flexDirection: "column", flexWrap: "wrap", mt: isMobileView ? "24px" : 0 }}>
                        <Box sx={{ display: "flex", alignItems: "center", width: "55%", justifyContent: "space-between" }}>
                            <SmartToyIcon sx={{ width: "20px", height: "20px" }} />
                            <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>{t("ai_assistance")}</Typography>
                            <CustomSwitch checked={toggle} onChange={() => setToggle(!toggle)} size='small' />
                        </Box>
                        <Box sx={{ width: isMobileView ? "100%" : "55%" }}>
                            <Typography sx={{ fontWeight: 300, fontSize: "10px", mt: 1 }}>
                                {t("lets_create_tp")}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    margin: "auto",
                    mt: 1,
                }}>
                    {/* Header with New Policy Button */}
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", mt: isMobileView ? '22px' : '43px' }}>
                        <Typography variant="h5" sx={{ fontWeight: "600", fontSize: isMobileView ? "16px" : "30px", fontFamily: "Poppins, sans-serif" }}>
                            {t('travel_policy')}
                        </Typography>
                        <Button variant="contained" size="small" sx={{ backgroundColor: theme.palette.customColors?.blue[22], textTransform: "none", fontSize: isMobileView ? "12px" : "14px", fontFamily: "Poppins, sans-serif", fontweight: 600 }} startIcon={<AddCircleOutlineIcon sx={{ width: "24px", height: "24px" }} />} onClick={() => {
                            handlePolicyType("create");
                            setIsEditPolicy(false);
                            setIsApplicabilityOpen((prev) => !prev)
                            formik.resetForm();
                        }}
                        >
                            {t("new_policy")}
                        </Button>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} sx={{ mt: isMobileView ? '20px' : '30px' }} >
                        <Tabs
                            value={value}
                            onChange={handleTabChange}
                            variant='scrollable'
                            scrollButtons="auto"
                            aria-label="icon position tabs example"
                            slotProps={{
                                indicator: {
                                    sx: { display: 'none', },
                                },
                            }}

                            sx={{
                                width: '100%',
                                height: "100%",
                                display: 'flex',
                                alignItems: 'center',
                                background: theme.palette.customColors?.white[20],
                                borderRadius: '10px',
                                px: isMobileView ? '5px' : '30px',
                                '& .MuiTabs-flexContainer': {
                                    justifyContent: 'flex-start',
                                    height: "100%"
                                },
                                '& .MuiTab-root': {
                                    flex: 'unset',
                                    textAlign: 'center',
                                    minWidth: 0,
                                    fontSize: isMobileView ? '12px' : '14px',
                                    textTransform: 'none',
                                    fontWeight: '500',
                                    fontFamily: 'Poppins, sans-serif',
                                    color: theme.palette.customColors?.grey[8],
                                    height: "100%",
                                    mx: '10px',
                                    px: '2px'


                                },
                                "& .Mui-selected": {
                                    color: "black !important",
                                },
                            }}
                        >
                            <Tab
                                iconPosition={isMobileView ? "top" : "start"}
                                label={t('all')}
                                {...a11yProps(0)}
                                disableRipple
                                sx={{
                                    fontWeight: 500,
                                    p: 0,
                                    borderTop: value === 0 ? '2px solid orange' : 'none',

                                }}
                            />
                            <Tab
                                iconPosition={isMobileView ? "top" : "start"}
                                label={t('flight')}
                                {...a11yProps(0)}
                                disableRipple
                                sx={{
                                    fontWeight: 500,
                                    p: 0,
                                    borderTop: value === 1 ? '2px solid orange' : 'none',
                                }}
                            />
                            <Tab
                                iconPosition={isMobileView ? "top" : "start"}
                                label={t('hotel')}
                                {...a11yProps(1)}
                                disableRipple
                                sx={{
                                    fontWeight: 500,
                                    p: 0,
                                    borderTop: value === 2 ? '2px solid orange' : 'none',
                                }}
                            />
                            <Tab
                                iconPosition={isMobileView ? "top" : "start"}
                                label={t('visa')}
                                {...a11yProps(2)}
                                disableRipple
                                sx={{
                                    fontWeight: 500,
                                    p: 0,
                                    borderTop: value === 3 ? '2px solid orange' : 'none',
                                }}
                            />
                            <Tab
                                iconPosition={isMobileView ? "top" : "start"}
                                label={t('holidays')}
                                {...a11yProps(3)}
                                disableRipple
                                sx={{
                                    fontWeight: 500,
                                    p: 0,
                                    borderTop: value === 4 ? '2px solid orange' : 'none',
                                }}
                            />
                            <Tab
                                iconPosition={isMobileView ? "top" : "start"}
                                label={t('cabs')}
                                {...a11yProps(4)}
                                disableRipple
                                sx={{
                                    fontWeight: 500,
                                    p: 0,
                                    borderTop: value === 5 ? '2px solid orange' : 'none',
                                    height: "100%"
                                }}
                            />
                        </Tabs>
                    </Box>
                    {/* Policies List Card*/}

                    {policyList?.map((policy, policyIndex) => (
                        <Box key={policy?.TravelPolicyId}
                            sx={{
                                position: 'relative',
                                mb: 1,
                                border: `1px solid ${theme.palette.customColors?.lightGray[12]}`,
                                borderRadius: "15px",
                                marginTop: "1rem",
                                backgroundColor: policy?.IsDefault ? theme.palette.customColors?.blue[11] : theme.palette.customColors?.white[0],
                                py: "0.5rem",
                                px: { xs: '0.5rem', md: "1.2rem" },
                            }}
                            onDoubleClick={() => {
                                handlePolicyType("view", policy?.TravelPolicyId)
                            }}
                        >
                            {policy?.IsDefault && <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    height: 0,
                                    borderTop: { xs: `35px solid ${theme.palette.customColors?.yellow[11]}`, md: `55px solid ${theme.palette.customColors?.yellow[11]}` },
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
                                        transform: `rotate(${isRTL ? 45 : -45}deg)`,
                                        fontSize: { xs: '6px', md: "10px" },
                                        fontWeight: '400',
                                        color: theme.palette.customColors?.black[1],
                                        textAlign: 'center',
                                    }}
                                >
                                    {t("default")}
                                </Typography>
                            </Box>}
                            <Box sx={{
                                display: "flex", alignItems: "center",
                                ml: isMobileView ? "10px" : "25px",
                                justifyContent: "space-between",
                                mt: isMobileView ? "2.5px" : "5px",
                            }}>
                                <Typography fontWeight={600} fontSize={isMobileView ? "12px" : "18px"} sx={{
                                    wordBreak: "break-all"
                                }}>{policy?.Name}</Typography>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <IconButton
                                        aria-label="more"
                                        id="long-button"
                                        aria-controls={open ? 'long-menu' : undefined}
                                        aria-expanded={open ? 'true' : undefined}
                                        aria-haspopup="true"
                                        onClick={(event) => {
                                            handlePolicyClick(event, policy?.IsDefault);
                                            setMenuOpen(p => ({ ...p, [policyIndex]: !p[policyIndex] }))
                                        }}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <Box sx={{
                                    display: "flex", flexDirection: "column", justifyContent: "space-between",
                                    ml: isMobileView ? "10px" : "25px",
                                    pb: "0.5rem",
                                    mt: isMobileView ? 0 : "0.5rem",
                                }}>
                                    <Typography variant="body2" sx={{ color: theme.palette.customColors?.lightGray[15], fontSize: isMobileView ? "8px" : "12px" }} >
                                        {t("applicable_for")} <span style={{ fontWeight: "600", color: theme.palette.customColors?.black[1], fontSize: isMobileView ? "8px" : "12px" }}>{policy?.UserSegmentId === "*" ? "All Employees" : policy?.UserSegmentName}</span>
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: theme.palette.customColors?.lightGray[15], fontSize: isMobileView ? "8px" : "12px" }} mt={1}>
                                        {t("based_on")} &nbsp;
                                        <span style={{ fontWeight: "600", color: theme.palette.customColors?.black[1], fontSize: isMobileView ? "8px" : "12px" }}>
                                            {policy?.PolicyConstraints.map(constraint => removeBracketedText(constraint?.Name ?? ""))?.join(', ')}
                                        </span>
                                    </Typography>
                                    {policy?.ApprovalWorkflowName ? <Typography variant="body2" sx={{ color: theme.palette.customColors?.lightGray[15], fontSize: isMobileView ? "8px" : "12px", wordBreak: "break-all" }} mt={1}>
                                        {t("related_with_approval_process")}  <span style={{ fontWeight: "600", color: theme.palette.customColors?.black[1], }}> {policy?.ApprovalWorkflowName}</span>
                                    </Typography> : <Typography variant="body2" sx={{ color: theme.palette.customColors?.lightGray[15], fontSize: isMobileView ? "8px" : "12px" }} mt={1}>
                                        <span style={{ fontWeight: "600", color: theme.palette.customColors?.black[1] }}> {t("no_approval_process")} </span> {t("selected")}
                                    </Typography>}
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "flex-end", mr: "1rem", pb: "0.5rem", mt: isMobileView ? "0.4rem" : "0.8rem" }}>
                                    <Typography sx={{
                                        fontSize: "10px",
                                        p: 0,
                                        m: 0
                                    }}>
                                        {(policy?.Status === "ACTIVE") ? t("active") : t("inactive")}
                                    </Typography>
                                    <CustomSwitch disabled={policy?.IsDefault}
                                        onClick={
                                            () => {
                                                handleStatusChange([policy.TravelPolicyId], policy.Status === "ACTIVE" ? "INACTIVE" : "ACTIVE");
                                            }
                                        }
                                        checked={policy?.Status === "ACTIVE"} sx={{ ml: '5px', }} size='small' />
                                </Box>
                            </Box>
                            <Popper key={policy?.TravelPolicyId}
                                open={Boolean(menuOpen[policyIndex])}
                                anchorEl={anchorEl}
                                role={undefined}
                                placement="bottom-start"
                                transition
                                disablePortal
                                modifiers={[
                                    {
                                        name: 'offset',
                                        options: {
                                            offset: [125, 0], // x, y offset
                                        },
                                    },
                                ]}
                                sx={{
                                    zIndex: 1
                                }}

                            >
                                {({ TransitionProps }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin: 'left-top',
                                        }}
                                    ><Box
                                        sx={{
                                            backgroundColor: theme.palette.customColors?.white[0],
                                            borderRadius: '4px',
                                            border: `1px solid ${theme.palette.customColors?.lightWhite[2]}`,
                                            zIndex: 1500,
                                            marginLeft: "20px"
                                        }}
                                    >
                                            <ClickAwayListener onClickAway={() => handleClose(policyIndex)}>
                                                <MenuList
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'space-around',
                                                        padding: '10px',
                                                    }}
                                                    autoFocusItem={Boolean(menuOpen[policyIndex])}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                >
                                                    <MenuItem onClick={() => {
                                                        setIsEditPolicy(true)
                                                        handlePolicyType("edit", policy?.TravelPolicyId)
                                                        handleClose(policyIndex)
                                                    }}
                                                        sx={{
                                                            '& .MuiListItemIcon-root': {
                                                                minWidth: "20px",
                                                                marginRight: '3px',
                                                            },
                                                        }}
                                                    >
                                                        <ListItemIcon sx={{ minWidth: "15px" }}>
                                                            <img src={editIcon} alt="Edit" width="13px" height="13px" />
                                                        </ListItemIcon>
                                                        <ListItemText sx={{ color: theme?.palette?.customColors?.lightGray[9] }}>{t("edit")}</ListItemText>
                                                    </MenuItem>
                                                    {!isDefaultPolicy && <MenuItem onClick={() => {
                                                        handlePolicyType("delete", policy?.TravelPolicyId)
                                                        handleClose(policyIndex)
                                                    }}
                                                        sx={{
                                                            '& .MuiListItemIcon-root': {
                                                                minWidth: "20px",
                                                                marginRight: '3px',
                                                            },
                                                        }}>
                                                        <ListItemIcon>
                                                            <img src={deleteIcon} alt="delete" width="15px" height="15px" />
                                                        </ListItemIcon>
                                                        <ListItemText sx={{ color: theme?.palette?.customColors?.lightGray[9] }}>{t("archive")}</ListItemText>
                                                    </MenuItem>}
                                                    <MenuItem onClick={() => {
                                                        handlePolicyType("duplicate", policy?.TravelPolicyId)
                                                        handleClose(policyIndex)
                                                    }}
                                                        sx={{
                                                            '& .MuiListItemIcon-root': {
                                                                minWidth: "20px",
                                                                marginRight: '3px',
                                                            },
                                                        }}>
                                                        <ListItemIcon>
                                                            <img src={duplicateIcon} alt="duplicate" width="15px" height="15px" />
                                                        </ListItemIcon>
                                                        <ListItemText sx={{ color: theme?.palette?.customColors?.lightGray[9] }}>{t("duplicate")}</ListItemText>
                                                    </MenuItem>
                                                    {!isDefaultPolicy && (
                                                        <MenuItem
                                                            disabled={Boolean(policy?.Status === "INACTIVE")}
                                                            onClick={() => {
                                                                handlePolicyType("default", policy?.TravelPolicyId, policy);
                                                                handleClose(policyIndex);
                                                            }}
                                                            sx={{
                                                                '& .MuiListItemIcon-root': {
                                                                    minWidth: "20px",
                                                                    marginRight: '3px',
                                                                },
                                                            }}                              >
                                                            <ListItemIcon>
                                                                <img src={defaultPolicyIcon} alt="duplicate" width="15px" height="15px" />
                                                            </ListItemIcon>
                                                            <ListItemText sx={{ color: theme?.palette?.customColors?.lightGray[9] }}>{t("set_as_default_policy")}</ListItemText>
                                                        </MenuItem>)}</MenuList>
                                            </ClickAwayListener>
                                        </Box>

                                    </Grow>)}
                            </Popper>
                        </Box>
                    ))}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "18px 0px" }}>
                    {policyList?.length > 0 && (
                        <CustomPagination page={page} currentPage={currentPage} handlePageChange={handlePageChange} />
                    )}
                </Box>
                <CustomDrawer
                    isOpen={isFormOpen}
                    anchor={isMobileView ? "bottom" : "right"}
                    sx={{
                        ...(isMobileView && {
                            '& .MuiDrawer-paper': {
                                borderTopLeftRadius: '12px',
                                borderTopRightRadius: '12px',
                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                                border: 'none',
                                maxHeight: '90%'
                            },
                        }),
                    }}
                >
                    <Box sx={{
                        width: isMobileView ? "100%" : '50vw',
                        mx: isMobileView ? "0" : "40px",
                        height: isMobileView ? "100%" : "90vh",
                        p: isMobileView ? 3 : 0,
                        pt: isMobileView ? 4 : 0,
                        overflow: isMobileView ? "auto" : "visible",
                    }}>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            mt: isMobileView ? "0" : "39px",
                        }}>
                            <ClearIcon
                                onClick={handleDynamicFormClose}
                                sx={{
                                    cursor: "pointer",
                                    color: theme.palette.customColors?.lightGray[9],
                                    '&:hover': {
                                        color: theme.palette.customColors?.black[1],
                                    },
                                }}
                            />
                        </Box>
                        <DynamicForm
                            jsonData={policyConstraintRules}
                            onSubmit={handleDynamicFormSubmit} onClose={handleDynamicFormClose} editInitValues={editFormData} />
                    </Box>
                </CustomDrawer>
                {(policyList?.length === 0 || !policyList) && <NoDataFound imageSrc={noresult}
                    message={isTraveListAPILoading ? "Please wait while we are Fetching..." : "No results found"} />}
                <CustomDrawer
                    isOpen={isApplicabilityOpen}
                    anchor={"right"} >
                    {modalView()}
                </CustomDrawer>
            </Box>
        </Container >
    )
}
export default TravelPolicy

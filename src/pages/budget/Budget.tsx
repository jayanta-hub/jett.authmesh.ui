import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Breadcrumbs, Button, CircularProgress, ClickAwayListener, Grow, IconButton, Menu, MenuItem, MenuList, Paper, Popper, Typography, useMediaQuery } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Edit from "../../assets/images/edit.png";
import Reports from "../../assets/images/reports.svg";
import setting from "../../assets/images/settings.svg";
import Container from '../../components/core-module/container/Container';
import CustomDrawer from '../../components/core-module/custom-drawer/CustomDrawer';
import TagsTabSelector from '../../components/core-module/tag-tab-selector/TagsTabSelector';
import { PriceInput } from "../../components/index";
import { useEditBudgetMutation, useFetchBudgetMutation, useFetchIntentsMutation, useFetchProductMutation } from '../../store/MusafirBudgetsApi';
import { useFetchWorkflowListMutation } from '../../store/musafirAprrovalWorkFlow';
import { useFetchParentTagsMutation, useGetTagByIdMutation, } from '../../store/musafirTagsApi';
import { theme } from '../../theme';
import { capitalizeFirstLetter, customEnqueueSnackbar, priceConversion } from '../../utility/helper';
import { BudgetEdit, BudgetSettings } from "./budget-components/index";
import showAlertDialog from '../../utility/widgets/AlertDialog';
import { editTagType, BudgetFormValues } from '../../utility/types/budget/budget';

const Budget: React.FC = () => {
    const isMobileView = useMediaQuery(theme?.breakpoints?.down("md"));
    const [fetchProduct] = useFetchProductMutation()
    const [fetchIntents] = useFetchIntentsMutation()
    const [fetchParentTags] = useFetchParentTagsMutation()
    const [fetchWorkflows,] = useFetchWorkflowListMutation();
    const [editBudget] = useEditBudgetMutation()
    const [value, setValue] = useState(0)
    const [modalOpen, setModalOpen] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { t } = useTranslation();
    const [content, setContent] = useState('')
    const [fetchBudget] = useFetchBudgetMutation()
    const [selectedTag, setSelectedTag] = useState('')
    const [loading, setLoading] = useState(false);
    const [editTagData, setEditTagData] = useState<editTagType | undefined>(undefined);
    const [getTagById] = useGetTagByIdMutation()
    const [data, setData] = useState<BudgetFormValues>()
    const [product, setProduct] = useState<any>([])
    const [intent, setIntent] = useState<any>([])
    const [workFlows, setWorkFlows] = useState([])
    const [parent, setParent] = useState([])
    const [cancel, setCancel] = useState(false)
    const [refresh, setRefresh] = useState(false);
    const Tabs = [
        'budget', "activity_history"
    ]
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleModalClose = async () => {
        const userConfirmed = await showAlertDialog("Alert",
            "Your changes will not be saved. Do you wish to continue?");
        if (!userConfirmed) {
            return
        }
        setCancel(true)
        setModalOpen(false)
        fetchBudgets()
    }
    const handleModalOpen = () => {
        setModalOpen(true)
        setContent('settings')
    }
    const open = Boolean(anchorEl)
    const [formInitialValues, setFormInitialValues] = useState<BudgetFormValues>({
        Id: "",
        BudgetAmount: null,
        BudgetDuration: "",
        CurrencyCode: "",
        AllowOverBudgetBooking: false,
        ShareBudget: false,
        ApprovalWorkflow: {
            Enabled: false,
            ApprovalWorkflowId: "",
        },
        TagBudgets: [],
        ProductBudgets: [],
        IntentBudgets: [],
        BudgetRevalidation: {
            SearchResultPage: false,
            ReviewPage: false,
            ApprovalPage: false,
            PaymentPage: false,
        },
    });
    const [latestFormState, setLatestFormState] = useState<BudgetFormValues | null>(null);
    const fetchBudgets = async () => {
        setLoading(true)
        const payload = {
            "Context": {
                "UserAgent": "Mozilla/5.0",
                "TrackingId": "de2ade5e6a0b4c75b44ab079f4f0b0cb",
                "TransactionId": "3ddf1ed3414146e684c236b69a477b7d",
                "IpAddress": "192.168.1.1",
                "CountryCode": "US"
            },
            "Request": {
                "OrgEntityId": "67b48c57cfa9a8dc32b38dff"
            }
        }
        const productIntentPayload = {
            "Context": {
                "UserAgent": "Mozilla/5.0",
                "TrackingId": "de2ade5e6a0b4c75b44ab079f4f0b0cb",
                "TransactionId": "3ddf1ed3414146e684c236b69a477b7d",
                "IpAddress": "192.168.1.1",
                "CountryCode": "US"
            },
            "Request": {
                "OrgEntityId": "67b48c57cfa9a8dc32b38dff"
            }
        }
        const parentPayload = {
            "Context": {
                "UserAgent": "Mozilla/5.0",
                "TrackingId": "de2ade5e6a0b4c75b44ab079f4f0b0cb",
                "TransactionId": "3ddf1ed3414146e684c236b69a477b7d",
                "IpAddress": "192.168.1.1",
                "CountryCode": "IN"
            },
            "Request": {
                "Type": "All"
            }
        }
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
                SearchText: '',
                Type: "All"
            }
        };
        try {
            const [
                budgetResult,
                productResult,
                intentResult,
                parentTagResult,
                workflowResult
            ] = await Promise.allSettled([
                fetchBudget({ patch: payload }).unwrap(),
                fetchProduct({ patch: productIntentPayload }).unwrap(),
                fetchIntents({ patch: productIntentPayload }).unwrap(),
                fetchParentTags({ patch: parentPayload }),
                fetchWorkflows(requestBody).unwrap()
            ]);
            if (budgetResult.status === "fulfilled") {
                setData(budgetResult?.value?.Response);
            } else {
                console.error("Budget API failed:", budgetResult.reason);
            }

            if (productResult.status === "fulfilled") {
                setProduct(productResult?.value?.Response);
            } else {
                console.error("Product API failed:", productResult.reason);
            }

            if (intentResult.status === "fulfilled") {
                setIntent(intentResult?.value?.Response);
            } else {
                console.error("Intent API failed:", intentResult.reason);
            }

            if (parentTagResult.status === "fulfilled") {
                setParent(parentTagResult?.value?.data?.Response);
            } else {
                console.error("Parent Tags API failed:", parentTagResult.reason);
            }

            if (workflowResult.status === "fulfilled") {
                setWorkFlows(workflowResult?.value?.Response?.Data);
            } else {
                console.error("Workflows API failed:", workflowResult.reason);
            }
            setLoading(false);
        } catch (error) {
            console.error("Unexpected error:", error);
            const errorMessage = error?.data?.Context?.Message || 'An error occurred';
            customEnqueueSnackbar(errorMessage ?? "Error occured", 'error');
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBudgets()
        // fetchBudgetsLocal()
    }, [])

    useEffect(() => {
        const callFetch = async () => {
            try {
                await fetchBudgets();
            } catch (err) {
                console.error("Error fetching budgets:", err);
            }
        };
        callFetch();
    }, [refresh]);

    useEffect(() => {
        const handleEditClick = async (tagId: string) => {
            const payload = {
                "Context": {
                    "UserAgent": "Mozilla/5.0",
                    "TrackingId": "ac38544e-5f95-4c79-bb84-c284e7e3d6a7",
                    "TransactionId": "ac38544e-5f95-4c79-bb84-c284e7e3d6a7",
                    "CountryCode": "IN",
                    "IpAddress": "127.0.0.1"
                },
                "Request": {
                    "TagId": tagId
                }
            }
            try {
                const response = await getTagById({ patch: payload }).unwrap();
                if (response?.Context?.StatusCode == 2101) {
                    setEditTagData(response?.Response?.Values);
                } else {
                    const errorMessage = response?.Context?.Message || 'An error occurred';
                    customEnqueueSnackbar(errorMessage ?? "Error occured", 'error');
                }
            } catch (error) {
                console.error("Tag fetch error occurred");
                const errorMessage = error?.data?.Context?.Message || 'An error occurred';
                customEnqueueSnackbar(errorMessage ?? "Error occured", 'error');
            }
        }
        if (selectedTag) {
            handleEditClick(selectedTag)
        } else if (selectedTag === '') {
            setEditTagData(undefined)
        }
    }, [selectedTag])

    useEffect(() => {
        if (!data) return;
        if (cancel === true) {
            const baseValues: BudgetFormValues = {
                Id: data?.Id ?? "",
                CurrencyCode: data?.CurrencyCode ?? "",
                BudgetAmount: data?.BudgetAmount ?? null,
                BudgetDuration: data?.BudgetDuration ?? "",
                AllowOverBudgetBooking: data?.AllowOverBudgetBooking ?? false,
                ShareBudget: data?.ShareBudget ?? false,
                ApprovalWorkflow: {
                    Enabled: data?.ApprovalWorkflow?.Enabled ?? false,
                    ApprovalWorkflowId: data?.ApprovalWorkflow?.ApprovalWorkflowId ?? "",
                },
                ProductBudgets: data?.ProductBudgets ?? [],
                IntentBudgets: data?.IntentBudgets?.map((intent: any) => ({
                    TravelIntentId: intent?.TravelIntentId ?? "",
                    BudgetAmount: intent?.BudgetAmount ?? 0,
                    TravelIntentName: intent?.TravelIntentName ?? "",
                })) ?? [],
                BudgetRevalidation: {
                    SearchResultPage: data?.BudgetRevalidation?.SearchResultPage ?? false,
                    ReviewPage: data?.BudgetRevalidation?.ReviewPage ?? false,
                    ApprovalPage: data?.BudgetRevalidation?.ApprovalPage ?? false,
                    PaymentPage: data?.BudgetRevalidation?.PaymentPage ?? false,
                },
                TagBudgets: data?.TagBudgets ?? [],
            };
            setFormInitialValues(baseValues);
        }
        else {
            const baseValues: BudgetFormValues = latestFormState || {
                Id: data?.Id ?? "",
                CurrencyCode: data?.CurrencyCode ?? "",
                BudgetAmount: data?.BudgetAmount ?? null,
                BudgetDuration: data?.BudgetDuration ?? "",
                AllowOverBudgetBooking: data?.AllowOverBudgetBooking ?? false,
                ShareBudget: data?.ShareBudget ?? false,
                ApprovalWorkflow: {
                    Enabled: data?.ApprovalWorkflow?.Enabled ?? false,
                    ApprovalWorkflowId: data?.ApprovalWorkflow?.ApprovalWorkflowId ?? "",
                },
                ProductBudgets: data?.ProductBudgets ?? [],
                IntentBudgets: data?.IntentBudgets?.map((intent: any) => ({
                    TravelIntentId: intent?.TravelIntentId ?? "",
                    BudgetAmount: intent?.BudgetAmount ?? 0,
                    TravelIntentName: intent?.TravelIntentName ?? "",
                })) ?? [],
                BudgetRevalidation: {
                    SearchResultPage: data?.BudgetRevalidation?.SearchResultPage ?? false,
                    ReviewPage: data?.BudgetRevalidation?.ReviewPage ?? false,
                    ApprovalPage: data?.BudgetRevalidation?.ApprovalPage ?? false,
                    PaymentPage: data?.BudgetRevalidation?.PaymentPage ?? false,
                },
                TagBudgets: data?.TagBudgets ?? [],
            };

            let newTagBudgets: TagBudget[] = [];

            if (selectedTag === "") {
                newTagBudgets = [];
            } else if (selectedTag && editTagData?.length > 0) {
                newTagBudgets = editTagData.map((item) => {
                    const matchingBudget = latestFormState?.TagBudgets?.find(
                        (budgetItem) =>
                            budgetItem?.ValueId === item?.Id &&
                            budgetItem?.TagId === selectedTag
                    );
                    return {
                        TagId: selectedTag ?? "",
                        ValueId: item?.Id ?? "",
                        ValueName: item?.Name ?? "",
                        BudgetAmount: matchingBudget?.BudgetAmount ?? 0,
                    };
                });
            } else {
                newTagBudgets = latestFormState?.TagBudgets || data?.TagBudgets || [];
            }

            const mergedValues: BudgetFormValues = {
                ...baseValues,
                TagBudgets: newTagBudgets,
            };

            setFormInitialValues(mergedValues);
        }
    }, [data, editTagData, selectedTag, latestFormState, cancel]);

    const budgetEdit = async (formData) => {
        const payload = {
            "Context": {
                "UserAgent": "Mozilla/5.0",
                "TrackingId": "de2ade5e6a0b4c75b44ab079f4f0b0cb",
                "TransactionId": "3ddf1ed3414146e684c236b69a477b7d",
                "IpAddress": "192.168.1.1",
                "CountryCode": "US"
            },
            "Request": formData
        }
        try {
            const response = await editBudget({ patch: payload }).unwrap();
            if (response) {
                customEnqueueSnackbar(response?.Context?.Message || response?.Message || 'Success', 'success');
                fetchBudgets()
                setModalOpen(false)
            } else {
                const errorMessage = response?.Context?.Message || 'An error occurred';
                customEnqueueSnackbar(errorMessage ?? "Error occured", 'error');
            }
        } catch (error) {
            console.error("Budget edit error occurred");
            const errorMessage = error?.data?.Context?.Message || 'An error occurred';
            customEnqueueSnackbar(errorMessage ?? "Error occured", 'error');
        }
    }

    const modalView = (): JSX.Element => {
        return (
            <>
                {
                    content === "settings" && (<BudgetSettings initialValues={formInitialValues} handleClose={handleClose} handleModalClose={handleModalClose} budgetEdit={budgetEdit} />)
                }
                {
                    content === "edit" && (
                        <BudgetEdit
                            name={data?.Name ?? ''}
                            initialValues={formInitialValues}
                            handleModalClose={handleModalClose}
                            setSelectedTag={setSelectedTag}
                            editTagData={editTagData}
                            setEditTagData={setEditTagData}
                            productList={product}
                            intentList={intent}
                            parent={parent}
                            workFlows={workFlows}
                            selectedTag={selectedTag}
                            budgetEdit={budgetEdit}
                            setLatestFormState={setLatestFormState}
                            setRefresh={setRefresh}
                            refresh={refresh}
                        />
                    )
                }
            </>
        )
    }
    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    width: '100%',
                    paddingTop: { xs: 0, sm: "8px" },
                    paddingBottom: { xs: 0, sm: "8px" },
                    paddingLeft: { xs: 0, sm: "64px" },
                    paddingRight: { xs: 0, sm: "64px" },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-between",
                        width: "100%",
                        gap: "8px",
                        marginTop: { xs: "18px", sm: "11px",md:"0px" },
                        marginLeft: { xs: "14px", sm: 0 },
                        padding: { sm: 0 },
                    }}
                >
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />} sx={{
                        ".MuiBreadcrumbs-separator": {
                            margin: 0,
                        }
                    }}>
                        <Typography sx={{
                            color: 'text.secondary',
                            fontWeight: 400,
                            fontSize: isMobileView ? "10px" : "12px",
                            fontStyle: 'Poppins'
                        }}>{t('hub')}</Typography>
                        <Typography sx={{
                            color: 'text.secondary', fontWeight: 400,
                            fontSize: isMobileView ? "10px" : "12px",
                            fontStyle: 'Poppins'
                        }}> {t("Finance & Analytics")}</Typography>
                        <Typography sx={{
                            color: 'text.primary', fontWeight: 400,
                            fontSize: isMobileView ? "10px" : "12px",
                            fontStyle: 'Poppins'
                        }}>{t('budget')}</Typography>
                    </Breadcrumbs>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: '36px',
                        marginBottom: { sm: '8px', md: "8px", xs: "0px" },
                        paddingTop: '4px',
                        paddingBottom: { sm: '4px', md: "4px", xs: "0px" },
                        paddingLeft: { xs: "31px", sm: "0px", md: "0px" },
                        paddingRight: { xs: "26px", sm: "0px", md: "0px" },
                    }}
                >
                    <Typography sx={{ fontWeight: 600, fontSize: { sm: "30px", md: "30px", xs: "16px" }, fontfamily: "poppins", color: theme?.palette?.customColors?.black[1], paddingTop: { xs: "16px", sm: "0px", md: "0px" } }}>
                        {t("budget")}
                    </Typography>
                    <Button
                        onClick={handleModalOpen}
                        variant="contained"
                        startIcon={<img
                            src={setting}
                            alt="settings"
                            style={{
                                width: "20px",
                                height: "20px"
                            }}
                        />}
                        sx={{
                            backgroundColor: theme?.palette?.customColors?.lightBlue[2],
                            textTransform: "none",
                            flexWrap: "nowrap",
                            lineHeight: "100%",
                            fontSize: "14px",
                            fontWeight: 600,
                            height: "40px",
                            borderRadius: "6px"
                        }}
                    >
                        {isMobileView ? t("view_setting") : t("budget_setting")}
                    </Button>
                </Box>
                <TagsTabSelector setValue={setValue} value={value} tabs={Tabs} />
                {value === 0 && <>
                    <Box
                        sx={{
                            display: "flex",
                            marginTop: "36px",
                            paddingLeft: { xs: "30px", sm: "0px", md: "0px" },
                        }}
                    >
                        <Typography sx={{ fontWeight: 600, fontSize: "22px" }}>
                            {t("entity_level_budget")}
                        </Typography>
                    </Box>
                    {loading && <Box
                        sx={{
                            minHeight: "200px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <CircularProgress color="primary" />
                    </Box>
                    }
                    {!loading && data && data?.BudgetAmount !== 0 &&
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                border: `1px solid ${theme?.palette?.customColors?.lightGray[12]}`,
                                mt: 2,
                                borderRadius: '12px',
                                height: { xs: '65px', md: '85px' },
                                mx: { xs: 3, md: 0 },
                                p: 2,
                                paddingLeft: "30px"
                            }}
                        >
                            <Box>
                                <Typography sx={{ fontWeight: 500, fontSize: "16px", color: theme?.palette?.customColors?.black[1] }}>
                                    {data?.Name}
                                </Typography>
                                <Typography sx={{ marginTop: "3px", fontSize: "12px", color: theme?.palette?.customColors?.lightGray[15], fontWeight: 400 }}>
                                    Budget: {data?.CurrencyCode} {priceConversion(data?.BudgetAmount)}
                                    <Box component="span" sx={{ mx: 2 }}>|</Box>
                                    {capitalizeFirstLetter(data?.BudgetDuration)}
                                </Typography>
                            </Box>
                            <IconButton onClick={handleClick}>
                                <MoreVertOutlinedIcon />
                            </IconButton>
                            <Popper
                                open={open}
                                anchorEl={anchorEl}
                                role={undefined}
                                placement="bottom-start"
                                transition
                                disablePortal
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener
                                                onClickAway={handleClose}
                                            >
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={Boolean(anchorEl)}
                                                    onClose={() => setAnchorEl(null)}
                                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                                    sx={{ ml: "1%" }}
                                                >
                                                    <MenuList
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'space-around',
                                                            padding: '8px 0px 8px 0px',
                                                            width: "120px",

                                                        }}
                                                        autoFocusItem={open}
                                                        id="composition-menu"
                                                        aria-labelledby="composition-button"
                                                    >
                                                        <MenuItem
                                                            sx={{ display: 'flex', color: theme?.palette?.customColors?.grey[9], fontSize: '12px', gap: 0.3 }}
                                                            onClick={() => {
                                                                setAnchorEl(null);
                                                                setContent('edit')
                                                                setModalOpen(true)
                                                            }}
                                                        >
                                                            <Box
                                                                component="img"
                                                                src={Edit}
                                                                alt="edit"
                                                                sx={{
                                                                    width: "15px",
                                                                    height: "15px",
                                                                    objectFit: "contain",
                                                                    color: theme?.palette?.customColors?.grey[9],
                                                                }}
                                                            />
                                                            <Typography sx={{ marginLeft: '7px', fontSize: "12px", fontWeight: 400, color: theme?.palette?.customColors?.grey[9] }}>Edit</Typography>
                                                        </MenuItem>
                                                        <MenuItem
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                color: theme?.palette?.customColors?.grey[9],
                                                                fontSize: '12px',
                                                                gap: 0.3
                                                            }}>
                                                            <Box
                                                                component="img"
                                                                src={Reports}
                                                                alt="reports"
                                                                sx={{
                                                                    width: "15px",
                                                                    height: "15px",
                                                                    objectFit: "contain",
                                                                    color: theme?.palette?.customColors?.grey[9],
                                                                }}
                                                            />
                                                            <Typography sx={{ marginLeft: '7px', fontSize: "12px", fontWeight: 400, color: theme?.palette?.customColors?.grey[9] }}>{t("Reports")}</Typography>
                                                        </MenuItem>
                                                    </MenuList>
                                                </Menu>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </Box>
                    }
                    {!loading && formInitialValues?.Id && formInitialValues?.BudgetAmount == 0 && <Formik
                        initialValues={formInitialValues}
                        onSubmit={(values) => {
                            setLatestFormState({
                                ...formInitialValues,
                                BudgetAmount: values?.BudgetAmount,
                            });
                            budgetEdit({ ...formInitialValues, BudgetAmount: values?.BudgetAmount });
                        }}
                    >
                        {({ values, setFieldValue }) => (
                            <Form>
                                <Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            marginTop: "16px",
                                            justifyContent: "space-between",
                                            paddingLeft: { xs: "30px", md: "0px", sm: "0px" },
                                            paddingRight: { xs: "30px", md: "0px", sm: "0px" },
                                            flexDirection: { xs: "column", md: "row", sm: "row" },
                                            gap: { xs: "15px", md: "0px", sm: "0px" }
                                        }}
                                    >
                                        <Box>
                                            <Typography sx={{ fontWeight: 400, fontSize: "12px", color: theme?.palette?.customColors?.lightGray[15] }}>
                                                {t("entity_name")}
                                            </Typography>
                                            <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
                                                {data?.Name || formInitialValues?.Name}
                                            </Typography>
                                        </Box>
                                        <PriceInput
                                            name="BudgetAmount"
                                            header={`add_amount_(${formInitialValues?.BudgetDuration})`}
                                            currency={formInitialValues?.CurrencyCode}
                                            value={values?.BudgetAmount}
                                            onChange={(val) => setFieldValue('BudgetAmount', val)}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            marginTop: "40px",
                                            paddingLeft: { xs: "12px", md: "0px", sm: "0px" },
                                            paddingRight: { xs: "30px", md: "0px", sm: "0px" }
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                gap: "8px",
                                                width: { xs: "60%", md: "20%", sm: "20%" },
                                            }}
                                        >
                                            <Button
                                                variant='outlined'
                                                sx={{
                                                    width: "100%",
                                                    textTransform: "none",
                                                    color: theme?.palette?.customColors?.blue[10],
                                                    border: `1px solid ${theme?.palette?.customColors?.blue[10]}`,
                                                }}
                                                onClick={() => setFieldValue('BudgetAmount', '')}
                                            >
                                                {t('cancel')}
                                            </Button>
                                            <Button
                                                variant='contained'
                                                type="submit"
                                                sx={{
                                                    width: "100%",
                                                    textTransform: "none",
                                                    backgroundColor: theme?.palette?.customColors?.blue[10]
                                                }}
                                            >
                                                {t('save')}
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Form>
                        )}
                    </Formik>}
                </>}
                {value === 1 &&
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "16px",
                            height: "20vh"
                        }}
                    >
                        Coming soon
                    </Box>}
                <CustomDrawer isOpen={modalOpen} anchor={"right"} >
                    {modalView()}
                </CustomDrawer>
            </Box >
        </Container >
    )
}

export default Budget


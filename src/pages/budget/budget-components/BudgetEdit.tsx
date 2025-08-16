import AddIcon from '../../../assets/icons/AddIconLevel.svg';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Divider, InputLabel, MenuItem, Select, styled, Typography, useMediaQuery, Switch, SelectChangeEvent } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AllowDenyToggle, PriceInput, TypographyWrapper } from '../../../components/index';
import { RootState } from '../../../store/store';
import { theme } from '../../../theme';
import { capitalizeFirstLetter, priceConversion } from "../../../utility/helper";
import CreateApprovalWorkflow from '../../approval-workflow-module/level/CreateApprovalWorkflow';
import deleteIcon from '../../../assets/icons/BudgetDelete.svg';
import showAlertDialog from '../../../utility/widgets/AlertDialog';
import * as Yup from 'yup';
import BudgetUncheckedIcon from '../../../assets/icons/BudgetUncheckedIcon.svg';
import CheckedIcon from '../../../assets/icons/CheckedIcon.svg'
import { Theme } from '@emotion/react/dist/emotion-react.cjs';
import { TagBudgetItemProps, ProductBudgetItemProps, IntentBudgetItemProps, BudgetEditProps, Workflow, IntentBudget, ProductBudget, TagBudget, Parent } from '../../../utility/types/budget/budget'

const CustomDropdownIcon = (props) => (
    <KeyboardArrowDownIcon
        {...props}
        className={`custom-arrow ${props.className}`}
        sx={{ fontSize: '20px' }}
    />
);

const validationSchema = Yup.object().shape({
    ApprovalWorkflow: Yup.object().shape({
        Enabled: Yup.boolean(),
        ApprovalWorkflowId: Yup.string().when('Enabled', {
            is: true,
            then: (schema) => schema.required('Approval workflow is required'),
            otherwise: (schema) => schema.notRequired(),
        }),
    }),
});

const CustomSwitchBlue = styled(({ ...props }) => <Switch {...props}
    icon={
        <img
            src={BudgetUncheckedIcon}
            alt="unchecked"
            style={{ width: 22.11, height: 12.28 }}
        />
    }
    checkedIcon={
        <img
            src={CheckedIcon}
            alt="checked"
            style={{ width: 22.11, height: 12.28 }}
        />
    }
/>)(
    ({ theme }) => ({
        padding: 0,
        width: '20px',
        height: '13.5px',
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: '10px',
            height: '10px',
            color: 'transparent',
        },
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: '1.14px',
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
const CustomSwitch = ({ checked, onChange, disabled = false }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, justifyContent: "flex-end" }}>
            <Typography
                sx={{
                    fontSize: '10px',
                    fontWeight: "400",
                    color: checked
                        ? theme?.palette?.customColors?.grey[8]
                        : theme?.palette?.customColors?.black[1]
                }}>Disable</Typography>
            <CustomSwitchBlue checked={checked} onChange={onChange} disabled={disabled} />
            <Typography
                sx={{
                    fontSize: '10px',
                    fontWeight: "400",
                    color: checked
                        ? theme?.palette?.customColors?.black[1]
                        : theme?.palette?.customColors?.grey[8]
                }}>Enable</Typography>
        </Box>
    );
};

const TagBudgetItem: React.FC<TagBudgetItemProps> = ({
    item,
    index,
    currencyCode,
    switchStates,
    setSwitchStates,
    setFieldValue,
}) => {
    const switchKey = `TagBudgets[${index}]`;
    const isEnabled = switchStates?.[switchKey] ?? (item?.BudgetAmount !== 0 && item?.BudgetAmount !== null);

    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setSwitchStates((prev) => ({
            ...prev,
            [switchKey]: isChecked,
        }));
        if (!isChecked) {
            setFieldValue(`TagBudgets[${index}].BudgetAmount`, 0);
        }
    };

    const handlePriceChange = (val: number) => {
        setFieldValue(`TagBudgets[${index}].BudgetAmount`, val);
    };

    return (
        <Box
            key={item?.ValueId || index}
            sx={{
                border: `0.5px solid ${theme?.palette?.customColors?.lightBlue[7]}`,
                padding: 2,
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { xs: "column", md: "row", sm: "row" },
            }}
        >
            <Box
                sx={{
                    marginTop: 0,
                    width: "100%",
                    marginBottom: { xs: "10px", sm: 0, md: 0 },
                }}
            >
                <TypographyWrapper
                    header={item?.ValueName}
                    subHeader={
                        item?.BudgetAmount
                            ? `Budget: ${currencyCode} ${priceConversion(Number(item?.BudgetAmount))}`
                            : "Budget: Not Applicable"
                    }
                />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CustomSwitch checked={isEnabled} onChange={handleSwitchChange} />
                <Box sx={{ marginTop: 1 }}>
                    <PriceInput
                        header="add_amount"
                        name={`TagBudgets[${index}].BudgetAmount`}
                        value={item?.BudgetAmount}
                        onChange={handlePriceChange}
                        currency={currencyCode}
                        disabled={!isEnabled}
                    />
                </Box>
            </Box>
        </Box>
    );
};

const ProductBudgetItem: React.FC<ProductBudgetItemProps> = ({
    item,
    index,
    currencyCode,
    switchStates,
    setSwitchStates,
    setFieldValue,
    values,
    deleteIcon,
    showAlertDialog,
    setProduct,
}) => {
    const switchKey = `ProductBudgets[${index}]`;
    const isEnabled = switchStates?.[switchKey] ?? (item?.BudgetAmount !== 0 && item?.BudgetAmount !== null);
    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setSwitchStates((prev) => ({
            ...prev,
            [switchKey]: isChecked,
        }));
        if (!isChecked) {
            setFieldValue(`ProductBudgets[${index}].BudgetAmount`, 0);
        }
    };

    const handleDelete = async () => {
        const userConfirmed = await showAlertDialog("Alert", "Are you sure you want to Remove?");
        if (!userConfirmed) return;
        const productToReAdd = values?.ProductBudgets?.find((p) => p?.ProductType === item?.ProductType);
        if (!productToReAdd) return;
        setProduct((prev) => [
            ...prev,
            {
                ProductId: item?.ProductType,
                ProductName: item?.ProductType,
            },
        ]);
        const updated = values?.ProductBudgets?.filter(
            (p) => p?.ProductType !== item?.ProductType
        );
        setFieldValue('ProductBudgets', updated);
    };

    return (
        <Box
            key={item?.ProductType}
            sx={{
                border: `0.5px solid ${theme?.palette?.customColors?.lightBlue[7]}`,
                padding: 2,
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { xs: "column", md: "row", sm: "row" },
            }}
        >
            <Box sx={{ width: "100%", marginBottom: { xs: "10px", sm: 0, md: 0 } }}>
                <TypographyWrapper
                    header={capitalizeFirstLetter(item?.ProductType)}
                    subHeader={
                        item?.BudgetAmount
                            ? `Budget: ${currencyCode} ${priceConversion(Number(item?.BudgetAmount))}`
                            : "Budget: Not Applicable"
                    }
                />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <CustomSwitch checked={isEnabled} onChange={handleSwitchChange} />
                    <Box
                        component="img"
                        src={deleteIcon}
                        alt="dlt"
                        sx={{
                            width: "12px",
                            height: "12px",
                            objectFit: "contain",
                            cursor: "pointer",
                        }}
                        onClick={handleDelete}
                    />
                </Box>
                <Box sx={{ marginTop: 1 }}>
                    <PriceInput
                        header="add_amount"
                        name={`ProductBudgets[${index}].BudgetAmount`}
                        value={item?.BudgetAmount}
                        onChange={(val) => setFieldValue(`ProductBudgets[${index}].BudgetAmount`, val)}
                        currency={currencyCode}
                        disabled={!isEnabled}
                    />
                </Box>
            </Box>
        </Box>
    );
};

const IntentBudgetItem: React.FC<IntentBudgetItemProps> = ({
    item,
    index,
    currencyCode,
    switchStates,
    setSwitchStates,
    setFieldValue,
    values,
    deleteIcon,
    showAlertDialog,
    setTravel,
}) => {
    const switchKey = `IntentBudgets[${index}]`;
    const isEnabled = switchStates?.[switchKey] ?? (item?.BudgetAmount !== 0 && item?.BudgetAmount !== null);

    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setSwitchStates((prev) => ({
            ...prev,
            [switchKey]: isChecked,
        }));
        if (!isChecked) {
            setFieldValue(`IntentBudgets[${index}].BudgetAmount`, 0);
        }
    };

    const handleDelete = async () => {
        const userConfirmed = await showAlertDialog("Alert", "Are you sure?");
        if (!userConfirmed) return;

        const intentToReAdd = values?.IntentBudgets?.find(
            (p) => p?.TravelIntentName === item?.TravelIntentName
        );
        if (!intentToReAdd) return;

        setTravel((prev) => [
            ...prev,
            {
                TravelIntentId: item?.TravelIntentId,
                TravelIntentName: item?.TravelIntentName,
            },
        ]);

        const updated = values?.IntentBudgets?.filter(
            (p) => p?.TravelIntentName !== item?.TravelIntentName
        );

        setFieldValue("IntentBudgets", updated);
    };

    return (
        <Box
            key={item.TravelIntentId}
            sx={{
                border: `0.5px solid ${theme?.palette?.customColors?.lightBlue[7]}`,
                padding: 2,
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { xs: "column", md: "row", sm: "row" },
            }}
        >
            <Box sx={{ marginTop: 0, width: "100%", marginBottom: { xs: "10px", sm: 0, md: 0 } }}>
                <TypographyWrapper
                    header={item?.TravelIntentName}
                    subHeader={
                        item?.BudgetAmount
                            ? `Budget: ${currencyCode} ${priceConversion(Number(item?.BudgetAmount))}`
                            : "Budget: Not Applicable"
                    }
                />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <CustomSwitch checked={isEnabled} onChange={handleSwitchChange} />
                    <Box
                        component="img"
                        src={deleteIcon}
                        alt="dlt"
                        sx={{
                            width: "12px",
                            height: "12px",
                            objectFit: "contain",
                            cursor: "pointer",
                        }}
                        onClick={handleDelete}
                    />
                </Box>

                <Box sx={{ marginTop: 1 }}>
                    <PriceInput
                        header="add_amount"
                        name={`IntentBudgets[${index}].BudgetAmount`}
                        value={item?.BudgetAmount}
                        onChange={(val) => setFieldValue(`IntentBudgets[${index}].BudgetAmount`, val)}
                        currency={currencyCode}
                        disabled={!isEnabled}
                    />
                </Box>
            </Box>
        </Box>
    );
};

const BudgetEdit: React.FC<BudgetEditProps> = ({ name, initialValues, handleModalClose, setSelectedTag, productList, intentList, parent, workFlows, selectedTag, budgetEdit, setLatestFormState, setRefresh, refresh }) => {
    const editLoading = useSelector((state: RootState) => state.budgetSlice.editLoading);
    const isMobile = useMediaQuery(theme?.breakpoints?.down("sm"));
    const [isLevelDrawerOpen, setIsLevelDrawerOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [switchStates, setSwitchStates] = useState({});
    const [isCreated,setIsCreated] = useState(false);
    const [allow, setAllow] = useState(initialValues?.ApprovalWorkflow?.Enabled || false);
    const { t } = useTranslation()
    const [approvalWorkflowCreated, setApprovalWorkflowCreated] = useState('')
    const [product, setProduct] = useState(() => {
        const usedProductTypes = initialValues?.ProductBudgets?.map((item) =>
            item?.ProductType.toLowerCase()
        ) || [];
        return productList?.filter((p) => !usedProductTypes?.includes(p?.ProductName?.toLowerCase()));
    });

    const [travel, setTravel] = useState(() => {
        const usedTravelTypes = initialValues?.IntentBudgets?.map((item) =>
            item?.TravelIntentId
        ) || [];
        return intentList?.filter((p) => !usedTravelTypes?.includes(p?.TravelIntentId));
    })
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const formikRef = useRef();

    useEffect(() => {
        setLatestFormState(formikRef.current?.values);
    }, [formikRef.current?.values]);

    const handleSetApprovalWorkflowCreated = (workflowId: string) => {
        setApprovalWorkflowCreated(workflowId);
        if (formikRef.current) {
            formikRef.current.setFieldValue("ApprovalWorkflow.ApprovalWorkflowId", workflowId, true);
        }
    };

    return (
        <Box sx={{ width: isMobile ? "100vw" : "70vw", px: 4, py: 4 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    cursor: "pointer"
                }}
            >
                <CloseOutlinedIcon onClick={() => { handleModalClose() }} />
            </Box>
            <Formik
                innerRef={formikRef}
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={(values) => {
                    const finalData = {
                        Id: values?.Id || "",
                        BudgetAmount: parseFloat(values?.BudgetAmount) || 0,
                        BudgetDuration: values?.BudgetDuration,
                        AllowOverBudgetBooking: values?.AllowOverBudgetBooking,
                        ShareBudget: values?.ShareBudget,
                        ApprovalWorkflow: {
                            Enabled: values?.ApprovalWorkflow?.Enabled || false,
                            ApprovalWorkflowId: allow === false ? "" : values?.ApprovalWorkflow?.ApprovalWorkflowId || ""
                        },
                        TagBudgets: values?.TagBudgets?.map(tag => ({
                            TagId: tag?.TagId,
                            ValueId: tag?.ValueId,
                            BudgetAmount: parseFloat(tag?.BudgetAmount) || 0
                        })) || [],
                        ProductBudgets: values?.ProductBudgets?.map(product => ({
                            ProductType: product?.ProductType,
                            BudgetAmount: parseFloat(product?.BudgetAmount) || 0
                        })) || [],
                        IntentBudgets: values?.IntentBudgets?.map(intent => ({
                            TravelIntentId: intent?.TravelIntentId,
                            BudgetAmount: parseFloat(intent?.BudgetAmount) || 0
                        })) || [],
                        BudgetRevalidation: {
                            SearchResultPage: values?.BudgetRevalidation?.SearchResultPage || false,
                            ReviewPage: values?.BudgetRevalidation?.ReviewPage || false,
                            ApprovalPage: values?.BudgetRevalidation?.ApprovalPage || false,
                            PaymentPage: values?.BudgetRevalidation?.PaymentPage || false,
                        }
                    };
                    budgetEdit(finalData)
                }}
            >
                {({ values, setFieldValue, touched, errors }) => {
                    let approvalWorkflowValue = "";
                    if (allow !== false) {
                        approvalWorkflowValue = approvalWorkflowCreated || values?.ApprovalWorkflow?.ApprovalWorkflowId || "";
                    }
                    const renderApprovalWorkflowValue = (
                        selected: string,
                        theme: Theme,
                        workFlows: Workflow[]
                    ) => {
                        const placeholder = (
                            <span style={{ color: theme?.palette?.customColors?.lightGray[20] }}>
                                Select Approval
                            </span>
                        );

                        if (!selected) return placeholder;

                        const selectedWorkflow = workFlows?.find(wf => wf.WorkflowId === selected);
                        return selectedWorkflow?.Name || placeholder;
                    };

                    const handleApprovalWorkflowChange = (
                        e: SelectChangeEvent,
                        allow: boolean,
                        approvalWorkflowCreated: string,
                        setFieldValue: (field: string, value: string) => void
                    ) => {
                        const value = allow === false ? "" : approvalWorkflowCreated || e.target.value;
                        setFieldValue("ApprovalWorkflow.ApprovalWorkflowId", value);
                    };

                    const handleIntentChange = (e: React.ChangeEvent<{ value: unknown }>) => {
                        const selectedId = e.target.value;
                        const selectedTravel = travel?.find((item) => item?.TravelIntentId === selectedId);

                        if (!selectedTravel) return;

                        setTravel((prev) => prev?.filter((item) => item?.TravelIntentId !== selectedId));

                        const updatedIntentBudgets = [
                            ...(values?.IntentBudgets || []),
                            {
                                TravelIntentId: selectedTravel?.TravelIntentId,
                                TravelIntentName: selectedTravel?.TravelIntentName,
                                BudgetAmount: '',
                            },
                        ];

                        setFieldValue('IntentBudgets', updatedIntentBudgets);
                    };
                    return (
                        <Form>
                            <Typography sx={{ fontSize: "22px", fontWeight: 600, }}>{name}</Typography>
                            <Divider sx={{ my: 3 }} />
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: { xs: "column", md: "row", sm: "row" }
                                }}
                            >
                                <Box sx={{
                                    marginTop: { sm: "14px", md: "14px", xs: "8px" },
                                    width: "100%",
                                    marginBottom: { xs: "12px", sm: "0px", md: "0px" }
                                }}>
                                    <TypographyWrapper header={"budget_amount"} subHeader={"maximum_amount"} />
                                </Box>
                                <PriceInput
                                    name="BudgetAmount"
                                    header="add_amount"
                                    value={values?.BudgetAmount}
                                    onChange={(val) => setFieldValue('BudgetAmount', val)}
                                    currency={values?.CurrencyCode}
                                />
                            </Box>
                            {values?.AllowOverBudgetBooking === false && (
                                <Box sx={{ backgroundColor: theme?.palette?.customColors.pink[4], padding: "3px 0px", width: { xs: "100%", md: "74%" }, mt: 3 }}>
                                    <Typography sx={{ fontSize: "14px", fontWeight: "500", color: theme?.palette?.customColors.black[1] }}>You can use the approval workflow if the system allows bookings that go over budget.</Typography>
                                </Box>
                            )}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: { xs: "column", md: "row", sm: "row" },
                                    marginTop: { xs: "32px", sm: "40px", md: "40px" }
                                }}
                            >
                                <TypographyWrapper header={"approval_workflow"} subHeader={"Sets Approval workflow for the Budget"} />
                                <Box sx={{ height: "36px", marginTop: { xs: "10px", sm: "0px", md: "0px" } }}>
                                    <AllowDenyToggle
                                        value={values?.ApprovalWorkflow?.Enabled}
                                        onChange={(newValue) => {
                                            if (newValue === false) {
                                                setFieldValue("ApprovalWorkflow.ApprovalWorkflowId", "");
                                                setApprovalWorkflowCreated("");
                                            }
                                            setFieldValue('ApprovalWorkflow.Enabled', newValue);
                                            setAllow(newValue);
                                        }}
                                        options={[
                                            { label: 'Yes', value: true },
                                            { label: 'No', value: false }
                                        ]}
                                        disabled={values?.AllowOverBudgetBooking === false}
                                    />
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    marginTop: { xs: "20px", sm: "16px", md: "16px" }
                                }}
                            >
                                <Box sx={{ width: isMobile ? "100%" : "260px" }}>
                                    <Typography sx={{ fontWeight: 400, fontSize: "10px", color: theme?.palette?.customColors?.lightWhite[7], my: 0.4, mb: "4px" }}>Select Approval Process</Typography>
                                    <Box>
                                        <Select
                                            open={open}
                                            onOpen={handleOpen}
                                            onClose={handleClose}
                                            IconComponent={CustomDropdownIcon}
                                            disabled={allow === false}
                                            displayEmpty
                                            name="ApprovalWorkflow.ApprovalWorkflowId"
                                            renderValue={(selected) => renderApprovalWorkflowValue(selected, theme, workFlows)}
                                            value={approvalWorkflowValue}
                                           onChange={(e) =>
                                                handleApprovalWorkflowChange(e, allow, approvalWorkflowCreated, setFieldValue)
                                            }
                                                                                    sx={{
                                                height: "36px",
                                                width: { xs: "100%", md: "260px" },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: allow === false ? undefined : theme?.palette?.customColors?.black[1],
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
                                            }}
                                        >
                                            {workFlows?.map((group, index) => (
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
                                                value="button"
                                                onMouseDown={() => {
                                                    handleClose();
                                                    setIsLevelDrawerOpen(true);
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
                                        {touched?.ApprovalWorkflow?.ApprovalWorkflowId && errors?.ApprovalWorkflow?.ApprovalWorkflowId && (
                                            <Typography sx={{ fontSize: "10px", color: theme?.palette?.error?.main, mt: "4px" }}>
                                                {errors?.ApprovalWorkflow?.ApprovalWorkflowId}
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                            <CreateApprovalWorkflow setIsCreated={setIsCreated} setApprovalWorkflowCreated={handleSetApprovalWorkflowCreated} refresh={refresh} setRefresh={setRefresh} setIsLevelDrawerOpen={setIsLevelDrawerOpen} isLevelDrawerOpen={isLevelDrawerOpen} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: { xs: "8px", sm: "40px", md: "40px" },
                                    width: "100%",
                                    flexDirection: { xs: "column", sm: "row", md: "row" },
                                }}
                            >
                                <Box
                                    sx={{
                                        marginTop: "14px",
                                        width: "100%"
                                    }}
                                >
                                    <TypographyWrapper header={"Tag Level Budget"} subHeader={"Select a tag to apply Budget"} />
                                </Box>
                                <Box sx={{
                                    marginTop: { xs: "10px", sm: "0px", md: "0px" }
                                }}>
                                    <InputLabel id="tag-select-label" sx={{ fontSize: "10px", fontWeight: 400, fontfamily: "poppins", color: theme?.palette?.customColors?.lightWhite[7], my: 0.4 }}>Select</InputLabel>
                                    <Select
                                        displayEmpty
                                        IconComponent={CustomDropdownIcon}
                                        value={selectedTag ?? values?.TagBudgets?.[0]?.TagId}
                                        renderValue={(selected) => {
                                            const placeholder = (
                                                <span style={{ color: theme?.palette?.customColors?.lightGray[20] }}>
                                                    Select Tag
                                                </span>
                                            );
                                            if (!selected) return placeholder;

                                            const selectedTagObj = parent?.find(tag => tag.TagId === selected);
                                            return selectedTagObj?.TagName || placeholder;
                                        }}
                                        sx={{
                                            height: "36px",
                                            width: { xs: "100%", md: "260px" },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: theme?.palette?.customColors.black[1],
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: theme?.palette?.customColors?.blue[10],
                                            },
                                            '& .MuiSelect-select': {
                                                color: theme?.palette?.customColors?.black[1],
                                                fontWeight: 400,
                                                fontSize: '12px',
                                            },
                                        }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    padding: "0px 6px",
                                                    maxHeight: "185px",
                                                    overflowY: 'auto',
                                                    width: "260px",
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
                                        }}
                                        onChange={(e) => {
                                            const newSelectedTagId = e.target.value;
                                            setSelectedTag(newSelectedTagId);

                                            if (newSelectedTagId == "") {
                                                setSelectedTag("")
                                            }
                                        }}
                                    >
                                        <MenuItem
                                            value=""
                                            sx={{
                                                fontSize: "12px",
                                                color: theme?.palette?.customColors?.lightGray[20]
                                            }}
                                        >
                                            No Tag
                                        </MenuItem>
                                        {parent?.map((parentList) => (
                                            <MenuItem
                                                key={parentList?.TagId}
                                                value={parentList?.TagId}
                                                sx={{
                                                    whiteSpace: "normal",
                                                    wordBreak: "break-word",
                                                    maxWidth: "100%",
                                                    lineHeight: 1.4,
                                                    paddingY: 1,
                                                    fontSize: "12px",
                                                    color: theme?.palette?.customColors?.black[1],
                                                    '&:hover': {
                                                        backgroundColor: theme?.palette?.customColors?.blue[11],
                                                    }
                                                }}
                                            >
                                                {parentList?.TagName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Box>
                            </Box>
                            <Box sx={{ mt: { xs: 1, sm: 2, md: 2 }, display: "flex", flexDirection: "column", gap: 2 }}>
                                {values?.TagBudgets?.map((item: TagBudget, index: number) => (
                                    <TagBudgetItem
                                        key={item?.ValueId || index}
                                        item={item}
                                        index={index}
                                        currencyCode={values?.CurrencyCode}
                                        switchStates={switchStates}
                                        setSwitchStates={setSwitchStates}
                                        setFieldValue={setFieldValue}
                                    />
                                ))}
                            </Box>
                            <Typography sx={{ mt: 4, fontSize: { xs: "12px", sm: "14px" }, fontWeight: "500", }}>Product Budget</Typography>
                            <Box sx={{ mt: { xs: 0, sm: 2, md: 2 }, display: "flex", flexDirection: "column", gap: 2, }}>
                                {values?.ProductBudgets?.map((item: ProductBudget, index: number) => (
                                    <ProductBudgetItem
                                        key={item?.ProductType}
                                        item={item}
                                        index={index}
                                        currencyCode={values?.CurrencyCode}
                                        switchStates={switchStates}
                                        setSwitchStates={setSwitchStates}
                                        setFieldValue={setFieldValue}
                                        values={values}
                                        deleteIcon={deleteIcon}
                                        showAlertDialog={showAlertDialog}
                                        setProduct={setProduct}
                                    />
                                ))}

                            </Box>
                            {product?.length !== 0 && <Box sx={{ mt: 3, width: "100%" }}>
                                <InputLabel id="tag-select-label" sx={{ fontSize: "12px", fontWeight: 400, fontfamily: "poppins", color: theme?.palette?.customColors?.lightWhite[7], my: 0.4, mb: "4.2px" }}>Add new product budget</InputLabel>
                                <Select
                                    IconComponent={CustomDropdownIcon}
                                    sx={{
                                        width: { xs: "100%", md: "235px" },
                                        height: '30px',
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: theme?.palette?.customColors?.black[1],
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: theme?.palette?.customColors?.blue[10],
                                        }, '& .MuiSelect-select': {
                                            color: theme?.palette?.customColors?.black[1],
                                            fontWeight: 400,
                                            fontSize: '12px',
                                        },
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                padding: "0px 6px",
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
                                    }}
                                    displayEmpty
                                    defaultValue=""
                                    renderValue={() => 'Add'}
                                    onChange={(e) => {
                                        const selectedId = e.target.value;
                                        const selectedProduct = product.find((item) => item?.ProductId === selectedId);
                                        if (!selectedProduct) return;
                                        setProduct((prev) => prev.filter((item) => item?.ProductId !== selectedId));
                                        setFieldValue('ProductBudgets', [
                                            ...(values?.ProductBudgets || []),
                                            {
                                                ProductType: selectedProduct?.ProductName,
                                                BudgetAmount: "",
                                            },
                                        ]);
                                    }}
                                >
                                    {product?.map((product) => (
                                        <MenuItem
                                            key={product?.ProductId}
                                            sx={{
                                                fontSize: "12px",
                                                '&:hover': {
                                                    backgroundColor: theme?.palette?.customColors?.blue[11],
                                                },
                                                paddingY: 1,
                                            }}
                                            value={product?.ProductId}>
                                            {capitalizeFirstLetter(product?.ProductName)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>}
                            <Typography sx={{ mt: 4, fontSize: { xs: "12px", sm: "14px" }, fontWeight: 500 }}>Travel Intent Budget</Typography>
                            <Box sx={{ mt: { xs: 2, sm: 2, md: 2 }, display: "flex", flexDirection: "column", gap: 2, }}>
                                {values?.IntentBudgets?.map((item: IntentBudget, index: number) => (
                                    <IntentBudgetItem
                                        key={item.TravelIntentId}
                                        item={item}
                                        index={index}
                                        currencyCode={values?.CurrencyCode}
                                        switchStates={switchStates}
                                        setSwitchStates={setSwitchStates}
                                        setFieldValue={setFieldValue}
                                        values={values}
                                        deleteIcon={deleteIcon}
                                        showAlertDialog={showAlertDialog}
                                        setTravel={setTravel}
                                    />
                                ))}
                            </Box>
                            {travel?.length !== 0 && <Box sx={{ mt: 3, width: "100%" }}>
                                <InputLabel id="tag-select-label" sx={{ fontSize: "12px", fontWeight: 400, fontfamily: "poppins", color: theme?.palette?.customColors?.lightWhite[7], my: 0.4, mb: "4.2px" }}>Add new travel intent budget</InputLabel>
                                <Select
                                    IconComponent={CustomDropdownIcon}
                                    sx={{
                                        width: { xs: "100%", md: "235px" },
                                        height: '30px',
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: theme?.palette?.customColors?.black[1],
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: theme?.palette?.customColors?.blue[10],
                                        }, '& .MuiSelect-select': {
                                            color: theme?.palette?.customColors?.black[1],
                                            fontWeight: 400,
                                            fontSize: '12px',
                                        },
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                padding: "0px 6px",
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
                                    }}
                                    displayEmpty
                                    defaultValue=""
                                    renderValue={() => 'Add'}
                                    onChange={handleIntentChange}
                                >
                                    {travel?.map((travel) => (
                                        <MenuItem
                                            key={travel?.TravelIntentId}
                                            sx={{
                                                fontSize: "12px",
                                                '&:hover': {
                                                    backgroundColor: theme?.palette?.customColors?.blue[11],
                                                },
                                                paddingY: 1,
                                            }}
                                            value={travel?.TravelIntentId}>
                                            {capitalizeFirstLetter(travel?.TravelIntentName)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    marginTop: "32px"
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: "8px",
                                        width: { xs: "60%", md: "20%", sm: "35%" },
                                    }}
                                >
                                    <Button onClick={() => { handleModalClose() }} variant='outlined' sx={{ width: "100%", textTransform: "none", color: theme?.palette?.customColors?.blue[10], border: `1px solid ${theme.palette.customColors.blue[10]}` }}>
                                        {t('cancel')}
                                    </Button>
                                    <Button loading={editLoading}
                                        loadingPosition="start" variant='contained' type="submit" sx={{ width: "100%", textTransform: "none", backgroundColor: theme?.palette?.customColors?.blue[10] }}>
                                        {t('save')}
                                    </Button>
                                </Box>
                            </Box>
                        </Form>
                    )
                }}
            </Formik>
        </Box >
    )
}

export default BudgetEdit


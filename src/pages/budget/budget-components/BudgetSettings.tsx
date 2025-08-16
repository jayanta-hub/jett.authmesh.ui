import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Checkbox, Divider, MenuItem, Select, styled, Typography, useMediaQuery } from '@mui/material';
import { Form, Formik } from 'formik';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import { AllowDenyToggle, TypographyWrapper } from '../../../components/index';
import { RootState } from '../../../store/store';
import { theme } from '../../../theme';

const BudgetSettings: React.FC<budgetSetting> = ({ initialValues, handleModalClose, budgetEdit }) => {
    const editLoading = useSelector((state: RootState) => state.budgetSlice.editLoading);
    const isMobile = useMediaQuery(theme?.breakpoints?.down("sm"));
    const modules = [
        { Key: 'SearchResultPage', Value: 'Search Result Page' },
        { Key: 'ReviewPage', Value: 'Review Page' },
        { Key: 'ApprovalPage', Value: 'Approval Page' },
        { Key: 'PaymentPage', Value: 'Payment Page' },
    ];
    const BpIcon = styled('span')(({ theme }) => ({
        borderRadius: 3,
        width: 14,
        height: 14,
        boxShadow: `inset 0 0 0 1px ${theme?.palette?.customColors?.grey?.[8]}, inset 0 -1px 0 ${theme?.palette?.customColors?.grey?.[8]}`,
        backgroundColor: theme?.palette?.customColors?.white?.[0],
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        ...theme.applyStyles('dark', {
            boxShadow: '0 0 0 1px rgb(16 22 26 / 40%)',
            backgroundColor: theme?.palette?.customColors?.grey?.[22],
            backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))',
        }),
    }));

    const BpCheckedIcon = styled(BpIcon)({
        backgroundColor: theme?.palette?.customColors?.blue?.[10],
        boxShadow: `inset 0 0 0 1px ${theme?.palette?.customColors?.blue?.[10]}, inset 0 -1px 0 ${theme?.palette?.customColors?.blue?.[10]}`,
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&::before': {
            display: 'block',
            width: 14,
            height: 14,
            backgroundImage:
                "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
                " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
                "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: theme?.palette?.customColors?.blue?.[10],
        },
        'input:disabled ~ &': {
            backgroundColor: theme?.palette?.customColors?.grey?.[8],
            boxShadow: `inset 0 0 0 1px ${theme?.palette?.customColors?.grey?.[8]}, inset 0 -1px 0 ${theme?.palette?.customColors?.grey?.[8]}`,
        },
    });
    return (
        <Box sx={{ width: isMobile ? '100vw' : "70vw", px: 4.5, py: 4 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    cursor: "pointer"
                }}
            >
                <CloseOutlinedIcon onClick={() => handleModalClose()} />
            </Box>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    budgetEdit({
                        ...values,
                        ApprovalWorkflow: {
                            Enabled: values?.AllowOverBudgetBooking === false ? false : values?.ApprovalWorkflow?.Enabled ?? false,
                            ApprovalWorkflowId: values?.AllowOverBudgetBooking === false ? "" : values?.ApprovalWorkflow?.ApprovalWorkflowId ?? "",
                        },
                    })
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                mt: { xs: 4, sm: 6, md: 6 }
                            }}
                        >
                            <Typography sx={{ fontSize: '22px', fontWeight: 600 }}>
                                Budget Settings
                            </Typography>
                            <Divider sx={{ my: 3, color: theme?.palette?.customColors?.lightGray[12], borderBottomWidth: '1.5px' }} />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexDirection: { xs: "column", md: "row", sm: "row" }
                                }}
                            >
                                <TypographyWrapper header={'Budget duration'} subHeader={'Configures budget duration, this duration is applicable at levels (Annual budget definition will be picked from Organization page)'} />
                                <Select
                                    sx={{
                                        width: { xs: '100%', md: '23%' },
                                        height: '36px',
                                        mt: { xs: 2, md: 0 },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: theme?.palette?.customColors?.black[1]
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
                                    IconComponent={ExpandMoreIcon}
                                    value={values?.BudgetDuration}
                                    onChange={(e) => setFieldValue('BudgetDuration', e.target.value)}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                '& .MuiMenuItem-root:hover': {
                                                    backgroundColor: theme?.palette?.customColors?.blue[11],
                                                },
                                            },
                                        },
                                    }}
                                >
                                    <MenuItem sx={{ fontSize: '12px' }} value="MONTHLY">Monthly</MenuItem>
                                    <MenuItem sx={{ fontSize: '12px' }} value="QUARTERLY">Quarterly</MenuItem>
                                    <MenuItem sx={{ fontSize: '12px' }} value="YEARLY">Yearly</MenuItem>
                                </Select>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: '40px',
                                    flexDirection: { xs: "column", md: "row", sm: "row" }
                                }}
                            >
                                <TypographyWrapper header={' Booking Ability If budget exceeds'} subHeader={'Configures whether or not bookings can be made once budget exceeds'} />
                                <Box sx={{ height: "36px", mt: { xs: 2, md: 0, sm: 0 } }}>
                                    <AllowDenyToggle
                                        value={values?.AllowOverBudgetBooking}
                                        onChange={(newValue) => {
                                            setFieldValue('AllowOverBudgetBooking', newValue);
                                            setFieldValue('ShareBudget', newValue);
                                        }}
                                        options={[
                                            { label: 'Allow', value: true },
                                            { label: 'Deny', value: false }
                                        ]}
                                    />
                                </Box>
                            </Box>

                            {/* This code can be used for future Use or future change -  Kaliraj */}
                            {/* <Box className="flex justify-between mt-10 flex-col md:flex-row">
                                <TypographyWrapper header={'Share Budget'} subHeader={'Child budgets can draw from a parent budget. When a child budget is depleted, the parent budget provides more funds to complete the booking. This reduces the total remaining parent budget.'} />
                                <Box sx={{ height: "36px",mt:{xs:2, md:0,sm:0} }}>
                                    <AllowDenyToggle
                                        value={values?.ShareBudget}
                                        onChange={(newValue) => {
                                            setFieldValue('ShareBudget', newValue);
                                            // setAllow(newValue);
                                        }}
                                        options={[
                                            { label: 'Allow', value: true },
                                            { label: 'Deny', value: false }
                                        ]}
                                    />
                                </Box>
                            </Box> */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'space-between',
                                    marginTop: '40px',
                                    flexDirection: { xs: "column", md: "row", sm: "row" },
                                }}
                            >
                                <TypographyWrapper header="Budget Revalidation" subHeader="Sets the stages at which the budget needs to be revalidated" />
                                <Box sx={{ minWidth: "7.5rem", mt: 2 }}>
                                    {modules?.map((module: any) => {
                                        const isSearchResultPage = module.Key === 'SearchResultPage';
                                        let colorValue;

                                        if (module.Key === 'SearchResultPage') {
                                            colorValue = theme?.palette?.customColors?.grey[8];
                                        } else if (values?.BudgetRevalidation?.[module.Key]) {
                                            colorValue = theme?.palette?.customColors?.black[1];
                                        } else {
                                            colorValue = theme?.palette?.customColors?.grey[8];
                                        }
                                        return (
                                            <Box
                                                key={module.Key}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    marginTop: { xs: "8px", md: "4px", sm: "4px" },
                                                    flexDirection: { xs: "row-reverse", md: "row", sm: "row" },
                                                    justifyContent: { xs: "flex-end", md: "space-between", sm: "space-between" },
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: '10px',
                                                        color: colorValue,
                                                        marginRight: '5px',
                                                        marginLeft: { xs: "5px", md: "0px", sm: "0px" },
                                                    }}
                                                >
                                                    {module?.Value}
                                                </Typography>
                                                <Checkbox
                                                    sx={{
                                                        p: 0,
                                                        m: 0,
                                                        color: theme?.palette?.customColors?.grey[8],
                                                        '&.Mui-checked': {
                                                            color: theme?.palette?.customColors?.blue[10],
                                                        },
                                                        '&.Mui-checked.Mui-disabled': {
                                                            color: theme?.palette?.customColors?.grey[8],
                                                        },
                                                        '& svg': {
                                                            fontSize: '16px',
                                                        },
                                                    }}
                                                    checkedIcon={<BpCheckedIcon
                                                        sx={{
                                                            fontSize: '16px',
                                                            color: isSearchResultPage
                                                                ? theme.palette.customColors.grey[8]
                                                                : theme.palette.customColors.blue[10],
                                                        }}
                                                    />}
                                                    icon={<BpIcon sx={{ fontSize: '16px' }} />}
                                                    checked={isSearchResultPage ? true : values?.BudgetRevalidation[module?.Key]}
                                                    disabled={isSearchResultPage}
                                                    onChange={(e) => {
                                                        setFieldValue(`BudgetRevalidation.${module?.Key}`, e.target.checked);
                                                    }}
                                                />
                                            </Box>
                                        );
                                    }
                                    )}
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    marginTop: "40px"
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: "8px",
                                        width: { xs: "50%", md: "20%", sm: "35%" }
                                    }}
                                >
                                    <Button onClick={() => { handleModalClose() }} variant='outlined' sx={{ width: "100%", textTransform: "none", color: theme?.palette?.customColors?.blue[10], border: `1px solid ${theme.palette.customColors.blue[10]}` }} >
                                        {t('cancel')}
                                    </Button>
                                    <Button loading={editLoading}
                                        loadingPosition="start" variant='contained' sx={{ width: "100%", textTransform: "none", backgroundColor: theme?.palette?.customColors?.blue[10] }} type="submit" >
                                        {t('save')}
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box >
    )
}

export default BudgetSettings
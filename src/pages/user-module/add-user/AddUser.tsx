import React, { useEffect } from 'react';
import { TextField, Select, MenuItem, InputLabel, Box, Button, Typography, Paper, FormControl, FormHelperText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid2';
import i18n from 'i18next';
import { enqueueSnackbar } from 'notistack';
import { useAddUserMutation } from '../../../store/musafirUserApi';
import LoadingScreen from '../../../components/core-module/loading-screen/LoadingScreen';
import { addUserprops } from '../../../utility/types/user/add-user/AddUser';
import useSearch from '../../../utility/hooks/useSearch';

const AddUser: React.FC<addUserprops> = ({ onAddSuccess }) => {
    const { t } = useTranslation();
    const [adduser, { isLoading }] = useAddUserMutation();
    const { formResetKey } = useSearch();


    const validationSchema = Yup.object({
        title: Yup.string().required(t('val_title_required')),
        firstName: Yup.string()
            .required(t('val_first_name_required'))
            .matches(
                /^[A-Za-z]+$/,
                t('val_no_numbers')
            ),
        middleName: Yup.string()
            .nullable()
            .matches(
                /^[A-Za-z]*$/,
                t('val_no_numbers')
            ),
        lastName: Yup.string()
            .nullable()
            .matches(
                /^[A-Za-z]*$/,
                t('val_no_numbers')
            ),
        email: Yup.string()
            .required(t('val_email_required'))
            .email(t('invalid_email'))
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                t('invalid_email')
            ),
        phoneNumber: Yup.string()
            .test(
                "no-spaces",
                t("val_no_spaces"),
                (value) => !/\s/.test(value ?? "")
            )
            .matches(/^\d+$/, t('val_phone_numeric'))
            .min(5, t('val_phone_number_limit')),
    });
    // Formik hook setup
    const { values, errors, touched, handleSubmit, handleChange, handleBlur, validateForm, resetForm } = useFormik({
        initialValues: {
            title: '',
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            employeeId: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const payload = {
                title: values.title,
                firstName: values.firstName,
                middleName: values.middleName,
                lastName: values.lastName,
                email: values.email,
                phoneNumber: values.phoneNumber,
                employeeId: values.employeeId
            }
            try {
                const response = await adduser({ patch: payload }).unwrap();

                if (response?.status?.statusCode == 'SC00001') {
                    enqueueSnackbar(response?.status?.statusDescription, {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        }
                    })
                    onAddSuccess();
                    resetForm();
                } else {
                    enqueueSnackbar(response?.status?.statusDescription, {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        },
                    });
                }


            } catch (error: any) {
                enqueueSnackbar(t('something_Wrong'), {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });
            }
        }
    });

    useEffect(() => {
        validateForm();
    }, [i18n.language]);

    useEffect(() => {
        //future refrence
        // resetForm(); 
        if (formResetKey) {
            resetForm();
        }
    }, [formResetKey, resetForm]);

    return (<>
        <LoadingScreen isLoading={isLoading} />
        <Typography
            variant="h6"
            component="span"
            align="center"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: { xs: '100%', sm: '50%', md: '30%' }, // changed xs from 60
                backgroundColor: '#ceebff',
                padding: '8px',
                fontFamily: 'Poppins',
                wordBreak: 'break-word',
                textAlign: 'center',
            }}
        >
            {t('user_details')}
        </Typography>

        <Paper sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} rowSpacing={2} >
                    <Grid size={{ sm: 12, md: 1.7, xs: 12 }}>
                        <InputLabel>{t('title')} <span style={{ color: 'red' }}>*</span>
                        </InputLabel>
                        <FormControl fullWidth variant="outlined" error={touched?.title && Boolean(errors?.title)} >
                            <Select fullWidth variant="outlined" size="small" name="title" value={values.title} onChange={handleChange} onBlur={handleBlur}>
                                <MenuItem value="Mr.">Mr.</MenuItem>
                                <MenuItem value="Ms.">Ms.</MenuItem>
                                <MenuItem value="Mrs.">Mrs.</MenuItem>
                                <MenuItem value="Master.">Master.</MenuItem>
                            </Select>

                            {touched?.title && errors?.title && (
                                <FormHelperText sx={{ marginLeft: '1px' }}>{errors?.title}</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>

                    <Grid size={{ sm: 12, md: 2.3, xs: 12 }}>
                        <InputLabel >{<>{t('first_name')} <span style={{ color: 'red' }}>*</span></>}</InputLabel>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.firstName && Boolean(errors.firstName)}
                            helperText={touched.firstName && errors.firstName}
                        />
                    </Grid>

                    <Grid size={{ sm: 12, md: 4, xs: 12 }}>
                        <InputLabel >{<>{t('middle_name')} </>}</InputLabel>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            name="middleName"
                            value={values.middleName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.middleName && Boolean(errors.middleName)}
                            helperText={touched.middleName && errors.middleName}
                        />
                    </Grid>

                    <Grid size={{ sm: 12, md: 4, xs: 12 }}>
                        <InputLabel >{<>{t('last_name')} </>}</InputLabel>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.lastName && Boolean(errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                        />
                    </Grid>

                    <Grid size={{ sm: 12, md: 4, xs: 12 }}>
                        <InputLabel >{<>{t('email')} <span style={{ color: 'red' }}>*</span></>}</InputLabel>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}

                        />
                    </Grid>

                    <Grid size={{ sm: 12, md: 4, xs: 12 }}>
                        <InputLabel >{<>{t('phone_number')} </>}</InputLabel>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            name="phoneNumber"
                            value={values.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                            helperText={touched.phoneNumber && errors.phoneNumber}

                        />
                    </Grid>

                    <Grid size={{ sm: 12, md: 4, xs: 12 }}>
                        <InputLabel >{<>{t('employee_id')} </>}</InputLabel>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            name="employeeId"
                            value={values.employeeId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.employeeId && Boolean(errors.employeeId)}
                            helperText={touched.employeeId && errors.employeeId}
                        />
                    </Grid>

                </Grid>
                <Box className="flex justify-end p-4 px-4">
                    <Button type="submit" variant="outlined" style={{ textTransform: 'none' }}>
                        {t('submit')}
                    </Button>
                    {/* For Future use */}
                    {/* <Button
                        type="button"
                        variant="outlined"
                        onClick={() => resetForm()}
                    >
                        Clear
                    </Button> */}
                    {/* For Future use */}
                </Box>
            </form>
        </Paper>
        {/* For Future use */}
        {/* <Typography variant="h6" component="span" sx={{ display: 'block', padding: 2, fontSize: '18px' }}>
            Passenger Details
        </Typography> */}

        {/* <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Grid2 container spacing={2} rowSpacing={4}>
                <Grid2 sx={{ xs: 12, sm: 4, md: 3 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Date of Birth"
                    />
                </Grid2>

                <Grid2 sx={{ xs: 12, sm: 4, md: 3 }}>
                    <Select fullWidth variant="outlined" label="Title">
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </Grid2>

                <Grid2 sx={{ xs: 12, sm: 4, md: 3 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Passport Number"
                    />
                </Grid2>

                <Grid2 sx={{ xs: 12, sm: 4, md: 3 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Expiry Date"
                    />
                </Grid2>

                <Grid2 sx={{ xs: 12, sm: 4, md: 3 }}>
                    <Select fullWidth variant="outlined" label="Issuing country">
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </Grid2>

                <Grid2 sx={{ xs: 12, sm: 4, md: 3 }}>
                    <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                        + Attach your passport copy
                    </Typography>
                </Grid2>

                <Grid2 sx={{ xs: 12, display: 'flex', justifyContent: "flex-end" }}>
                    <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                        + Add more documents
                    </Typography>
                </Grid2>
            </Grid2>
        </Paper> */}

        {/* <Typography variant="h6" component="span" sx={{ display: 'block', padding: 2, fontSize: '18px' }}>
            Frequent Flier Details
        </Typography> */}

        {/* <Paper elevation={3} sx={{ p: 4 }}>
            <Grid2 container spacing={2}>
                <Grid2 sx={{ xs: 12, sm: 4, md: 3 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Airline"
                        
                    />
                </Grid2>
            </Grid2>
        </Paper> */}
        {/* For Future use */}
    </>
    )
        ;
};

export default AddUser;

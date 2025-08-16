import { Box, Button, InputLabel, Paper, Typography, Select, MenuItem, TextField, FormControl, FormHelperText } from "@mui/material"
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import useSearch from "../../../utility/hooks/useSearch";
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid2';
import i18n from 'i18next';
import { enqueueSnackbar } from "notistack";
import { useUpdateUsersMutation } from "../../../store/musafirUserApi";
import LoadingScreen from "../../../components/core-module/loading-screen/LoadingScreen";
import { UpdateUserProps } from "../../../utility/types/user/update-user/Updateuser";


/**
 * A reusable React component to update user details.
 * @param {object} data The user data to be updated.
 * @param {object} filteredData The filtered user data to be updated.
 * @param {function} onUpdateSuccess The callback to be called when the update is successful.
 * @returns {ReactElement} A React element containing the form to update user details.
 */
const UpdateUser: React.FC<UpdateUserProps> = ({ data, filteredData, onUpdateSuccess }): JSX.Element => {

  const [updateUsers, { isLoading }] = useUpdateUsersMutation();
  const { t } = useTranslation();
  const { edit, setEdit } = useSearch();
  const [hasChanges, setHasChanges] = useState<boolean>(false);

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


  const { values, errors, touched, handleSubmit, handleChange, handleBlur, setFormikState, validateForm } = useFormik({
    initialValues: {
      title: filteredData?.title ?? data?.title ?? '',
      firstName: filteredData?.firstName ?? data?.firstName ?? '',
      middleName: filteredData?.middleName ?? data?.middleName ?? '',
      lastName: filteredData?.lastName ?? data?.lastName ?? '',
      email: filteredData?.email ?? data?.email ?? '',
      phoneNumber: filteredData?.phoneNumber ?? data?.phoneNumber ?? '',
      employeeId: filteredData?.employeeId ?? data?.employeeId ?? '',
    },
    validationSchema: validationSchema,
    /**
     * Submits the updated user data to the server.
     * 
     * Constructs a payload with the updated user information,
     * then attempts to update the user using the `updateUsers` mutation.
     * On a successful update, a success notification is displayed,
     * the edit mode is disabled, and the `onUpdateSuccess` callback is invoked.
     * If the update fails, an error notification is shown.
     * In case of an exception during the API call, a generic error message is displayed.
     * 
     * @param {object} values The form values containing updated user information.
     */
    onSubmit: async (values) => {
      const payload = {
        userId: data?.userId,
        title: values?.title,
        firstName: values?.firstName,
        middleName: values?.middleName,
        lastName: values?.lastName,
        email: values?.email,
        phoneNumber: values?.phoneNumber,
        employeeId: values?.employeeId,
      };
      try {
        const response = await updateUsers({ patch: payload }).unwrap();
        if (response?.status?.statusCode == "SC00001") {
          enqueueSnackbar(response?.status?.statusDescription, {
            variant: 'success',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right',
            },
          });
          setEdit(false);
          onUpdateSuccess();
        } else {
          enqueueSnackbar(response?.status?.statusDescription, {
            variant: 'error',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right',
            },
          });
        }
      } catch (error) {
        enqueueSnackbar(t('something_Wrong'), {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        });
      }
    },
  });

  useEffect(() => {
    setFormikState({
      values: {
        title: data?.title ?? '',
        firstName: data?.firstName ?? '',
        middleName: data?.middleName ?? '',
        lastName: data?.lastName ?? '',
        email: data?.email ?? '',
        phoneNumber: data?.phoneNumber ?? '',
        employeeId: data?.employeeId ?? '',
      },
      errors: {},
      touched: {},
      isSubmitting: false,
      isValidating: false,
      submitCount: 0
    })
  }, [data])

  useEffect(() => {
    validateForm();
  }, [i18n.language]);

  useEffect(() => {
    setHasChanges(JSON.stringify(values) !== JSON.stringify({
      title: data?.title,
      firstName: data?.firstName,
      middleName: data?.middleName,
      lastName: data?.lastName,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      employeeId: data?.employeeId,
    }));

  }, [values, data]);
  useEffect(() => {
    setHasChanges(false);
  }, [edit])

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <Typography
        variant="h6"
        component="span"
        align="center"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: { xs: '60%', sm: '50%', md: '30%' },
          backgroundColor: '#ceebff',
          padding: '4px',
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
            <Grid size={{ xs: 12, sm: 12, md: 1.7 }}>
              <InputLabel>{t('title')} <span style={{ color: 'red' }}>*</span>  </InputLabel>
              <FormControl fullWidth variant="outlined" error={touched?.title && Boolean(errors?.title)}>
                <Select
                  name="title"
                  size="small"
                  disabled={!edit}
                  fullWidth
                  value={values?.title || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
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
            <Grid size={{ xs: 12, sm: 12, md: 2.3 }}>
              <InputLabel >{<>{t('first_name')} <span style={{ color: 'red' }}>*</span></>}</InputLabel>
              <TextField
                disabled={!edit}
                fullWidth
                size="small"
                variant="outlined"
                name="firstName"
                value={values?.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched?.firstName && Boolean(errors?.firstName)}
                helperText={touched?.firstName && errors?.firstName}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <InputLabel >{t('middle_name')}</InputLabel>
              <TextField
                disabled={!edit}
                fullWidth
                size="small"
                variant="outlined"
                name="middleName"
                value={values?.middleName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched?.middleName && Boolean(errors?.middleName)}
                helperText={touched?.middleName && errors?.middleName}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <InputLabel >{t('last_name')}</InputLabel>
              <TextField
                fullWidth
                size="small"
                disabled={!edit}
                variant="outlined"
                name="lastName"
                value={values?.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched?.lastName && Boolean(errors?.lastName)}
                helperText={touched?.lastName && errors?.lastName}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <InputLabel >{<>{t('email')} <span style={{ color: 'red' }}>*</span></>}</InputLabel>
              <TextField
                fullWidth
                size="small"
                disabled={!edit}
                variant="outlined"
                name="email"
                value={values?.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched?.email && Boolean(errors?.email)}
                helperText={touched?.email && errors?.email}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <InputLabel >{t('phone_number')}</InputLabel>
              <TextField
                fullWidth
                size="small"
                disabled={!edit}
                variant="outlined"
                name="phoneNumber"
                value={values?.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched?.phoneNumber && Boolean(errors?.phoneNumber)}
                helperText={touched?.phoneNumber && errors?.phoneNumber}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <InputLabel >{t('employee_id')}</InputLabel>
              <TextField
                fullWidth
                size="small"
                disabled={!edit}
                variant="outlined"
                name="employeeId"
                value={values?.employeeId}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched?.employeeId && Boolean(errors?.employeeId)}
                helperText={touched?.employeeId && errors?.employeeId}
              />
            </Grid>
          </Grid>
          {edit && (<Box className="flex justify-end p-4">
            <Button disabled={!hasChanges} type="submit" variant="outlined" sx={{ textTransform: 'none' }}>
              {t('update')}
            </Button>
          </Box>)}
        </form>
      </Paper>
    </>

  )
}

export default UpdateUser

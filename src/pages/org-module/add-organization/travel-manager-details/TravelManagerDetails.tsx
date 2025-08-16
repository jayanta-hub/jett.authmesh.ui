import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import "./TravelManagerDetails.css";
import Grid from "@mui/material/Grid2";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { enqueueSnackbar } from 'notistack';
import i18n from "i18next";
import { usePostTravelMangerDetailsMutation } from "../../../../store/musafirOrgApi";
import LoadingScreen from "../../../../components/core-module/loading-screen/LoadingScreen";
import { FormValues, FormField, TravelManagerProps } from "../../../../utility/types/organization/travelManager";
import { use } from "i18next";
import { useSelector, useDispatch } from "react-redux";
import { setTravelManagerData } from "../../../../store/slice/OrgSlice";
import { RootState } from "../../../../store/store";

const validationSchema = (t: TFunction) =>
  Yup.object({
    name: Yup.string()
      .test(
        "no-spaces-start-end",
        t("val_no_spaces_start_end"),
        (value) => value?.trim() === value
      )
      .matches(
        /^[a-zA-Z\s]*$/,
        t("val_no_numbers") 
      )
      .required(t("val_name_required")),
    email: Yup.string()
      .test(
        "no-spaces",
        t("val_no_spaces"),
        (value) => !/\s/.test(value ?? "")
      )
      .test(
        "valid-domain",
        t("val_invalid_email"),
        (value) => {
          if (!value) return true; 
          const domainPattern = /^[^@]+@[^@]+\.[^@]{2,}$/; 
          return domainPattern.test(value);
        }
      )
      .email(t("val_invalid_email"))
      .required(t("val_email_required")),
    phoneNumber: Yup.string()
      .test(
        "no-spaces",
        t("val_no_spaces"),
        (value) => !/\s/.test(value ?? "")
      )
      .matches(/^\d+$/, t("val_phone_numeric"))
      .required(t("val_phone_required")),
    address: Yup.string()
      .test(
        "no-spaces-start-end",
        t("val_no_spaces_start_end"),
        (value) => value?.trim() === value
      )

      .required(t("val_address_required")),
  });

/**
 * A React functional component that renders the travel manager details form.
 * The form includes fields for name, email, phone number, job title, address,
 * and an option to receive email copies. Validation is performed using Yup
 * and formik. The component supports multiple languages using the i18n 
 * translation library.
 * 
 * @param {Object} Props - The component props.
 * @param {number} Props.activeStep - The current active step in the multi-step form.
 * @param {Function} Props.setActiveStep - Function to update the active step.
 * 
 * @returns {JSX.Element} The rendered component.
 */
const TravelManagerDetails: React.FC<TravelManagerProps> = ({ activeStep, setActiveStep }): JSX.Element => {

  const { t } = useTranslation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { addOrgData: { entityId } } = useSelector((state: RootState) => state.orgSlice);
  const [postOrg, { isLoading }] = usePostTravelMangerDetailsMutation();
  const travelManagerData = useSelector((state: any) => state.orgSlice?.travelManagerData);
  const dispatch = useDispatch();
  const { values, errors, handleSubmit,
    validateForm, handleChange,
    handleBlur, touched } = useFormik<FormValues>({
      initialValues: {
        name: travelManagerData?.name ? travelManagerData.name : "",
        email: travelManagerData?.email ? travelManagerData.email : "",
        phoneNumber: travelManagerData?.phoneNumber ? travelManagerData.phoneNumber : "",
        jobTitle: travelManagerData?.jobTitle ? travelManagerData.jobTitle : "",
        address: travelManagerData?.address ? travelManagerData.address : "",
        receiveEmails: travelManagerData?.receiveEmailCopy ? travelManagerData.receiveEmailCopy == true ? "Yes" : "No" : "",
      },
      validationSchema: validationSchema(t),
      onSubmit: (values: FormValues) => {
        const submitTravelManagerDetails = async () => { 
          const payload = {
            entityId: entityId,
            name: values.name,
            email: values.email,
            phoneNumber: values.phoneNumber,
            jobTitle: values.jobTitle,
            address: values.address,
            receiveEmailCopy: values.receiveEmails == "Yes" ? true : false
          };

          try {
            const response = await postOrg(payload).unwrap(); 
            if (response?.status?.statusCode === "SC00001") {
              enqueueSnackbar(response?.status?.statusDesc || 'Travel manager details added successfully.', {
                variant: 'success',
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'right',
                },
              });
              dispatch(setTravelManagerData(payload));
              setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
            } else if (response?.status?.statusCode === "SC00003") {
              enqueueSnackbar(response?.status?.statusDesc || 'Email already exists.', {
                variant: 'error',
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'right',
                },
              });
            }
            else {
              enqueueSnackbar(response?.status?.statusDesc || t('something_Wrong'), {
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
        };

        submitTravelManagerDetails(); 
      }
    });

  useEffect(() => {
    validateForm();
  }, [i18n.language]);

  const handleBack = () => setActiveStep((prevActiveStep: number) => prevActiveStep - 1);

  const formFields: FormField[] = [
    { id: "name", label: t("name"), placeholder: t("name"), required: true, type: "text" },
    { id: "email", label: t("email"), placeholder: t("email"), required: true, type: "text" },
    { id: "phoneNumber", label: t("phone_no"), placeholder: t("phone_no"), required: true, type: "text" },
    { id: "jobTitle", label: t("job_title"), placeholder: t("job_title"), type: "text" },
    { id: "address", label: t("address"), placeholder: t("address"), required: true, type: "text" },
    {
      id: "receiveEmails",
      label: t("recive_copy"),
      type: "select",
      options: [
        { id: 1, value: true, label: "Yes" },
        { id: 2, value: false, label: "No" },
      ],
    },
  ];

  return (
    <Box>
      <LoadingScreen isLoading={isLoading} />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
        }}>
        {t("create_your_organization")}
      </Typography >

      <Typography
        sx={{
          marginTop: { xs: 1, sm: 2 },

        }}
      >
        Lorem lpsum has been the industry's standard dummy
        text ever since 1500s.Lorem lpsum has been the <br />
        industry's standard dummy text ever since 1500s. Lorem lpsum has been.
      </Typography>

      <Typography
        variant="h6"
        gutterBottom
        align="left"
        className={`heading ${isSmallScreen ? "heading-small-screen" : "heading-large-screen"}`}
      >
        {t("travel_manager_details")}
      </Typography>
      <Box className="form-container">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {formFields.map((field) => (
              <Grid key={field.id} size={{ xs: 12, sm: 4, md: 6 }}>
                <label htmlFor={field.id} className="label">
                  <span className="name-text">{field.label}</span>
                  {field.required && <span className="asterisk">*</span>}
                </label>
                {field.type === "text" ? (
                  <TextField
                    fullWidth
                    id={field.id}
                    name={field.id}
                    placeholder={field.placeholder}
                    value={values[field.id]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched[field.id] && Boolean(errors[field.id])}
                    helperText={touched[field.id] && (errors[field.id] as string)}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <FormControl fullWidth variant="outlined">
                    <Select
                      id={field.id}
                      name={field.id}
                      value={values[field.id]}
                      onChange={handleChange}
                      IconComponent={(props) => (
                        <Box
                          {...props}
                        >
                          <ExpandMoreIcon sx={{ color: "#3987f7" }} />
                        </Box>
                      )}
                      size="small"
                    >
                      {field.options?.map((option) => (
                        <MenuItem key={option.id} value={String(option.value)}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Grid>
            ))}
            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
              <Box className="flex justify-between mt-2">
                <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                  {t("back")}
                </Button>
                <Button className="button-submit" variant="outlined" type="submit">
                  {t("Save_and_Continue")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>

  );
};

export default TravelManagerDetails;
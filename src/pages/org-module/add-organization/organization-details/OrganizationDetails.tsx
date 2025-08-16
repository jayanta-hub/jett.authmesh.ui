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
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Grid from "@mui/material/Grid2";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import './OrganizationDetails.css';
import { FormField, FormValues, OrganizationDetailsProps } from "../../../../utility/types/organization/organizationDetails";
import { useFetchCountryMutation, useFetchIndustryMutation } from "../../../../store/musafirLookupApi";
import { enqueueSnackbar } from 'notistack';
import { usePostOrgMutation } from "../../../../store/musafirOrgApi";
import LoadingScreen from "../../../../components/core-module/loading-screen/LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import { setOrganizationData } from "../../../../store/slice/OrgSlice";

const validationSchema = (t: TFunction) =>
  Yup.object({
    organizationName: Yup.string().test(
      "no-spaces-start-end",
      t("val_no_spaces_start_end"),
      (value) => value?.trim() === value
    ).required(t("val_organizationName_required")),
    legalName: Yup.string().test(
      "no-spaces-start-end",
      t("val_no_spaces_start_end"),
      (value) => value?.trim() === value
    ).required(t("val_legalName_Required")),
    country: Yup.string().required(t("val_Country_Required")),
    address: Yup.string().required(t("val_Address_Required")),
    numberOfEmployee: Yup.string(),
    industryType: Yup.string().required(t("val_Industry_Required")),
    vatNumber: Yup.string(),
  });

/**
 * A React functional component that renders the organization details form.
 * The form includes fields for organization name, legal name, country, address,
 * number of employees, industry type, and VAT number. Validation is performed
 * using Yup and formik. The component supports multiple languages using the
 * i18n translation library.
 * 
 * @param {Object} Props - The component props.
 * @param {number} Props.activeStep - The current active step in the multi-step form.
 * @param {Function} Props.setActiveStep - Function to update the active step.
 * 
 * @returns {JSX.Element} The rendered component.
 */
const OrganizationDetails: React.FC<OrganizationDetailsProps> = ({ activeStep, setActiveStep }): JSX.Element => {

  const { t } = useTranslation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [fetchCountry] = useFetchCountryMutation();
  const [fetchIndustry] = useFetchIndustryMutation();
  const [postOrg, { isLoading }] = usePostOrgMutation();
  const [countryOptions, setCountryOptions] = useState<{ value: string; label: string }[]>([]);
  const [industryOptions, setIndustryOptions] = useState<{ value: string; label: string }[]>([]);
  const organizationData = useSelector((state: any) => state.orgSlice?.organizationState);
  const dispatch = useDispatch();
  /**
   * Fetches the countries from the backend and updates the country options in the form.
   * @returns {Promise<void>}
   */
  const getCountry = async (): Promise<void> => {
    const payload = {
      pagination: {
        isRequired: true,
        pageNumber: 1,
        pageSize: 100
      }
    }
    try {
      const response = await fetchCountry(payload).unwrap();
      if (response?.status?.statusCode == "SC00001") {
        const options = response?.countries?.
          map((country: { countryId: number; countryName: string }) => {
            return {
              value: country.countryId.toString(),
              label: country.countryName
            }
          });

        setCountryOptions([{ value: "", label: t("Select_Country") }, ...options]);

      } else {
        enqueueSnackbar(response?.status?.statusDescription || 'Country not found.', {
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

  useEffect(() => {
    getCountry();
  }, [])

  /**
   * Fetches the list of industries from the server and updates the state with industry options.
   * The function sends a request with pagination parameters and processes the server response.
   * If the response indicates success, it maps the industry data into options format and updates
   * the state with these options. If the response indicates an error or an error occurs during
   * the fetch, an error message is displayed using the enqueueSnackbar function.
   */
  const getIndustry = async () => {
    const payload = {
      pagination: {
        isRequired: true,
        pageNumber: 1,
        pageSize: 100
      }
    }
    try {
      const response = await fetchIndustry(payload).unwrap();
      if (response?.status?.statusCode == "SC00001") {
        const options = response?.industryTypes?.
          map((industry: { industryTypeId: number; industryTypeName: string }) => {
            return {
              value: industry.industryTypeId.toString(),
              label: industry.industryTypeName
            }

          });

        setIndustryOptions([{ value: "", label: t("industry_type") }, ...options]);



      } else {
        enqueueSnackbar(response?.status?.statusDescription || 'Industry not found.', {
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

  useEffect(() => {
    getIndustry();
  }, [])




  const { values, errors, handleSubmit,
    validateForm, handleChange,
    handleBlur, touched } = useFormik<FormValues>({
      initialValues: {
        organizationName: organizationData?.entityName ? organizationData.entityName : '',
        legalName: organizationData?.legalName ? organizationData.legalName : '',
        country: organizationData?.countryId ? organizationData.countryId : '',
        address: organizationData?.address ? organizationData.address : '',
        numberOfEmployee: organizationData?.numberOfEmployees ? organizationData.numberOfEmployees : '',
        industryType: organizationData?.industryTypeId ? organizationData.industryTypeId : '',
        vatNumber: organizationData?.vatNumber ? organizationData.vatNumber : '',
      },
      validationSchema: validationSchema(t),
      onSubmit: (values: FormValues) => {
        const submitOrg = async () => { 
          const payload = {
            organizationId: 0,
            tmcId: 0,
            entityName: values.organizationName,
            legalName: values.legalName,
            countryId: values.country,
            address: values.address,
            vatNumber: values.vatNumber,
            industryTypeId: values.industryType,
            numberOfEmployees: values.numberOfEmployee,
            marketId: 1
          };

          try {
            const response = await postOrg(payload).unwrap(); 
            if (response?.status?.statusCode === "SC00001") {
              enqueueSnackbar(response?.status?.statusDesc || 'Organization added successfully.', {
                variant: 'success',
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'right',
                },
              });
              dispatch(setOrganizationData(payload))
              setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
            } else {
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
        submitOrg(); 
      }

    });
  useEffect(() => {
    validateForm();
    setCountryOptions([{ value: "", label: t("Select_Country") }, ...countryOptions.filter(((item) => item?.value !== ""))]);

    setIndustryOptions([{ value: "", label: t("industry_type") }, ...industryOptions.filter(((item) => item?.value !== ""))]);
  }, [i18n.language]);

  const formFields: FormField[] = [
    { id: "organizationName", label: t("Organization_Name"), placeholder: t("Organization_Name"), required: true, type: "text" },
    { id: "legalName", label: t("legal_name"), placeholder: t("legal_name"), required: true, type: "text" },
    {
      id: "country",
      label: t("country"),
      type: "select",
      required: true,
      options: countryOptions
    },
    {
      id: "numberOfEmployee",
      label: t("number_of_employees"),
      type: "select",
      options: [
        { value: "", label: t("Select_NumberofEmploye") },
        { value: "1-20", label: "1-20" },
        { value: "21-50", label: "21-50" },
        { value: "51-200", label: "51-200" },
        { value: "201-500", label: "201-500" },
        { value: "501-1000", label: "501-1000" },
        { value: "1001-5000", label: "1001-5000" },
        { value: "5001-10000", label: "5001-10000" },
        { value: "10000+", label: "10000+" },

      ],
    },
    { id: "address", label: t("address"), placeholder: t("address"), required: true, type: "text" },
    {
      id: "industryType",
      label: t("industry_type"),
      type: "select",
      required: true,
      options: industryOptions
    },
    { id: "vatNumber", label: t("vat_number"), placeholder: t("vat_number"), type: "text" }

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
        {t("Organization_details")}
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
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={touched[field.id] && Boolean(errors[field.id])}
                  >
                    <Select
                      id={field.id}
                      name={field.id}
                      value={values[field.id]}
                      onChange={handleChange}
                      onBlur={handleBlur}

                      IconComponent={(props) => (
                        <Box
                          {...props}
                        >
                          <ExpandMoreIcon sx={{ color: "#3987f7" }} />
                        </Box>
                      )}
                      size="small"
                    >
                      {field?.options?.map((option) => (
                        <MenuItem key={option?.value} value={option?.value}
                          disabled={!option?.value}>

                          {option?.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched[field.id] && errors[field.id] && (
                      <Typography variant="caption" color="error" sx={{ marginLeft: "10px" }}>
                        {errors[field.id] as string}
                      </Typography>
                    )}
                  </FormControl>
                )}
              </Grid>
            ))}
          </Grid>
          <Box className="flex justify-end mt-2">
            <Button className="button-submit" variant="outlined" type="submit">
              {t("Save_and_Continue")}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default OrganizationDetails;
import { CalendarTodayOutlined } from '@mui/icons-material';
import {
    Autocomplete,
    Box, Button, Checkbox, Chip, Divider, FormControl,
    FormControlLabel, FormGroup, FormHelperText, IconButton, InputAdornment,
    InputLabel, MenuItem, Popover, Radio, RadioGroup, Select,
    TextField, Typography, useMediaQuery
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import moment, { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetchAirlineMutation } from '../../../store/musafirFlightLookupApi';
import { useLazyGetAutoCompleteGraphQuery } from '../../../store/slice/AirportAutoCompletegqlSlice';
import { theme } from "../../../theme";
import { customEnqueueSnackbar, formatAirportDropdownData, formatDropdownData } from '../../../utility/helper';
import { useCurrencyDetails } from '../../../utility/hooks/useCurrencyDetails';
import {
    DynamicFormProps,
    FieldConfig
} from '../../../utility/types/dynamic-form/DynamicForm';
import { ErrorResponse } from '../../../utility/types/travel-policy/TravelPolicy';
import { CustomCalendar } from './components/CustomCalendar';
import { BpCheckedIcon, BpIcon, ListboxComponent } from '../components/VirtualizedListbox';
import { DayGroupKeys, DaysMapping, formattedLabel } from './utils/constants';
import { generateFormFields } from './utils/formFieldGenerator';
import { formatLabel, getFieldKey, removeApiVersion, removeEmptyMatchValue, shouldRenderField, toPascalCaseWithSuffix } from './utils/helpers';
// Create Validation Schema
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { createValidationSchema } from './utils/validationSchema';

const DynamicForm: React.FC<DynamicFormProps> = ({ jsonData, onSubmit, onClose, editInitValues }) => {
    const { t } = useTranslation();
    const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
    const [fetchAirline, { data: airlineData, isLoading: isAirlineLoading }] = useFetchAirlineMutation();
    const [trigger, { data: airportsData, isLoading: isAirportsLoading }] = useLazyGetAutoCompleteGraphQuery();
    const currency = useCurrencyDetails()
    const [matchTypes, setMatchTypes] = useState<{ [key: string]: string }>({});
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [activeFieldName, setActiveFieldName] = useState<string | null>(null);
    const [tempSelections, setTempSelections] = useState<{ [key: string]: Set<string> }>({});
    const [autocompleteOpenStates, setAutocompleteOpenStates] = useState<{ [key: string]: boolean }>({});
    const [selectedAirports, setSelectedAirports] = useState<[string]>([]);
    const fields = generateFormFields(jsonData);

    // Deduplicate fields
    // Only keep the first occurrence of each unique field, regardless of parentFieldName
    const uniqueFields = fields.filter(
        (field, index, self) =>
            index === self.findIndex(f => getFieldKey(f) === getFieldKey(field))
    );

    const initialValues: { [key: string]: unknown } = {};
    uniqueFields?.forEach((field) => {
        // Check if this is a days-related field or checkbox multiple field
        const isDaysField = [
            'bookingday', 'arrivaldays', 'departuredays', 'traveldays', 'days'
        ]?.some(k => field?.matchTypeField?.name?.toLowerCase()?.includes(k?.toLowerCase()));

        const isCheckboxMultiple = field.valueField.type?.toLowerCase() === "checkbox" && field.valueField.selectionMode?.toLowerCase() === "multiple";

        if (isDaysField || isCheckboxMultiple) {
            // For days fields and checkbox multiple fields, always initialize as array for checkbox handling
            initialValues[field?.matchTypeField?.name] = [];
        } else {
            initialValues[field?.matchTypeField?.name] = field?.matchTypeField?.Visibility?.toLowerCase() === 'hidden' ? field?.matchTypeField?.options?.[0]?.value : field?.matchTypeField?.selectionMode?.toLowerCase() === "multiple" ? [] : '';
        }

        // For autocomplete fields with multiple selection, initialize as array
        if (field?.valueField?.type?.toLowerCase() === 'autocomplete' || field?.valueField?.selectionMode?.toLowerCase() === 'multiple') {
            initialValues[field?.valueField?.name] = [];
        } else {
            initialValues[field?.valueField?.name] = field?.valueField?.RuleName?.includes("Time")
                ? dayjs().format("hh:mm")
                : '';
        }

    });
    useEffect(() => {
        if (Object.keys(editInitValues ?? {}).length > 0) {
            const reverseFormattedDataArray = (editInitValues: Record<string, unknown>, fields: FieldConfig[]): { [key: string]: string } => {
                const formValues: { [key: string]: string } = {};
                fields?.forEach((field, index) => {
                    const rule = (editInitValues as Record<string, unknown>)?.Rules?.[index];
                    const ruleOption = rule?.RuleOptions?.[0];
                    formValues[field?.matchTypeField?.name] = (Array.isArray(rule?.RuleOptions) && rule?.RuleOptions?.length > 1) ? rule?.RuleOptions?.map((i: { [key: string]: string }) => i?.MatchType)?.[0] : ruleOption?.MatchType ?? '';
                    formValues[field?.valueField?.name] = field?.valueField.selectionMode?.toLowerCase() === "multiple" ? rule?.RuleOptions?.map((i: { [key: string]: string }) => i?.MatchValue) : ruleOption?.MatchValue ?? '';
                });
                return formValues;
            };
            const reversedValues = reverseFormattedDataArray(editInitValues, uniqueFields)
            formik.setValues(reversedValues);

            // Find the first field with a URL to determine API type
            const fieldWithUrl = uniqueFields.find(field => field?.valueField?.url);
            if (fieldWithUrl) {
                const fieldApi = fieldWithUrl.valueField.url;
                const isAirline = fieldApi?.includes("airline");
                const isGraphql = fieldApi?.includes("grapghql");
                if (isAirline) {
                    fetchAirline({
                        patch: {
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
                            }
                        },
                        endpoint: removeApiVersion(fieldApi)
                    })
                }
                if (isGraphql) {
                    setSelectedAirports((pre) => [...new Set(pre, reversedValues?.AirportsValue)]);
                    try {
                        const response = trigger({
                            text: "",
                            TextSearch: reversedValues?.AirportsValue,
                            endpoint: removeApiVersion(fieldApi)
                        })
                        formatAirportDropdownData(response?.Response?.Airport);
                    } catch (error) {
                        customEnqueueSnackbar((error as ErrorResponse)?.error?.data?.Context.Message ?? t("something_went_wrong"), 'error');
                    }
                }
            }
        }
    }, []);
    // Formik hook
    const formik = useFormik({
        initialValues,
        validationSchema: createValidationSchema(uniqueFields, matchTypes, initialValues), // Use uniqueFields here
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: false,
        onSubmit: (values, { setSubmitting }) => {
            // Transform form values into the desired format
            const formattedData = {
                PolicyConstraintId: jsonData?.ConstraintId,
                PolicyConstraintName: jsonData?.ConstraintName,
                Rules: removeEmptyMatchValue(uniqueFields?.map((field, index) => {
                    let ruleOptions = [];
                    const matchTypeValue = values[field?.matchTypeField?.name];
                    const valueTypeValue = values[field?.valueField?.name];
                    // Check if this is a days-related field or any checkbox multiple field
                    if (Array.isArray(field?.matchTypeField?.options) && !Array.isArray(valueTypeValue)) {
                        ruleOptions = [{ MatchType: field?.matchTypeField?.options?.length > 1 ? field?.matchTypeField?.options?.filter((i: { [key: string]: string }) => i?.value === matchTypeValue)?.[0]?.value : field?.matchTypeField?.options?.[0]?.value, MatchValue: valueTypeValue }];
                    } else if (Array.isArray(valueTypeValue)) {
                        ruleOptions = (valueTypeValue).map((item) => ({ MatchType: field?.matchTypeField?.options?.length > 1 ? field?.matchTypeField?.options?.filter((i: { [key: string]: string }) => i?.value === matchTypeValue)?.[0]?.value : field?.matchTypeField?.options?.[0]?.value, MatchValue: item }));
                    } else {
                        ruleOptions = [{ MatchType: field?.matchTypeField?.options?.[0]?.value, MatchValue: valueTypeValue }];
                    }
                    return {
                        RuleDisplayOrder: index,
                        RuleDisplayName: field?.ruleDisplayName,
                        RuleOperator: "NOT_APPLICABLE",
                        RuleOptions: ruleOptions,
                        RuleId: field?.ruleId
                    };
                })),
            };
            onSubmit(formattedData);
            setSubmitting(false);
        },
    });
    const handleMatchTypeChange = (fieldName: string, value: string) => {
        if ([
            'bookingday', 'arrivaldays', 'departuredays', 'traveldays', 'days'
        ]?.some(k => fieldName?.toLowerCase()?.includes(k?.toLowerCase()))) {
            const currentValue = Array.isArray(formik.values[fieldName]) ? formik.values[fieldName] as string[] : [];
            let newValue: string[] = [...currentValue];
            const upperValue = value?.toUpperCase();
            const isGroup = DayGroupKeys?.includes(upperValue);
            if (isGroup) {
                const isSelected = currentValue?.includes(upperValue);
                if (isSelected) {
                    newValue = currentValue?.filter(day => !DaysMapping[upperValue as keyof typeof DaysMapping]?.includes(day));
                } else {
                    newValue = [...DaysMapping[upperValue as keyof typeof DaysMapping]];
                }
            } else {
                const isSelected = currentValue?.includes(upperValue);

                if (isSelected) {
                    newValue = currentValue?.filter(day => day !== upperValue);
                } else {
                    newValue?.push(upperValue);
                }

                newValue = newValue?.filter(day => !DayGroupKeys?.includes(day));
                DayGroupKeys?.forEach(groupKey => {
                    const groupDays = DaysMapping[groupKey as keyof typeof DaysMapping]?.filter(day => day !== groupKey);
                    const isExactMatch =
                        newValue?.length === groupDays?.length &&
                        groupDays?.every(day => newValue?.includes(day));

                    if (isExactMatch) {
                        newValue?.push(groupKey); // Add the group label
                    }
                });
            }
            formik.setFieldValue(fieldName, newValue);
        } else {
            setMatchTypes((prev) => ({ ...prev, [fieldName]: value }));
        }
    }

    // Update validation schema when matchTypes change
    useEffect(() => {
        const newValidationSchema = createValidationSchema(uniqueFields, matchTypes, formik.values);
        formik.setFormikState((state) => ({
            ...state,
            validationSchema: newValidationSchema,
        }));
        // Re-validate the form with the new schema
        formik.validateForm();
    }, [matchTypes, formik.values]);

    // Handle DateCalendar open/close
    const handleOpenDateCalendar = (event: React.MouseEvent<HTMLElement>, fieldName: string) => {
        setAnchorEl(event.currentTarget);
        setActiveFieldName(fieldName);
    };

    const handleCloseDateCalendar = () => {
        setAnchorEl(null);
        setActiveFieldName(null);
    };

    const handleDateChange = (newValue: Moment | null) => {
        if (activeFieldName) {
            const formattedDate = newValue ? newValue.format('DD/MM/YY') : '';
            formik.setFieldValue(activeFieldName, formattedDate);
            if (activeFieldName === 'StartDateValue') {
                formik.setFieldValue('EndDateValue', '');
            }
        }
        handleCloseDateCalendar();
    };

    const getMaxLength = (field: FieldConfig) => {
        for (const validation of field?.valueField?.validations ?? []) {
            if (validation.type === 'maxLength') {
                return validation.value;
            }
        }
        return null;
    };
    const open = Boolean(anchorEl);
    const formattedAirlineData = airlineData?.Response ? formatDropdownData(airlineData?.Response as unknown) : [];
    const formattedAirportsData = airportsData?.AutoCompleteGraph?.Response ? formatAirportDropdownData(airportsData?.AutoCompleteGraph?.Response?.Airport) : [];
    const renderRuleField = (field: FieldConfig) => {
        const isVisible = field.matchTypeField.Visibility === "VISIBLE";
        switch (field?.matchTypeField?.type?.toLowerCase()) {
            case 'select':
                return (
                    isVisible && <Box sx={{ flex: 1 }}>
                        {!formattedLabel?.includes(formatLabel(field?.matchTypeField?.label)) && <Typography sx={{ fontSize: 10, fontWeight: 400, py: '5px', color: theme.palette.customColors?.black[1] }}>
                            {formatLabel(field?.matchTypeField?.label)}
                        </Typography>}
                        <FormControl fullWidth sx={{ ...field.matchTypeField.styles?.select, maxWidth: "100%" }} size="small">
                            <InputLabel sx={{ fontSize: 12, fontWeight: 400 }} shrink={false}>{formik.values[field?.matchTypeField?.name] ? '' : field?.matchTypeField?.placeholder || "Select"}</InputLabel>
                            <Select
                                name={field?.matchTypeField?.name}
                                value={typeof formik.values[field?.matchTypeField?.name] === 'string' ? [formik.values[field?.matchTypeField?.name]] : formik.values[field?.matchTypeField?.name]}
                                onChange={(e) => {
                                    const fieldName = field?.matchTypeField?.name;
                                    const newValue = e.target.value;
                                    if (field?.matchTypeField?.selectionMode?.toLowerCase() !== 'single') {
                                        if (typeof newValue === 'string') {
                                            formik.setFieldValue(fieldName, newValue);
                                            handleMatchTypeChange(fieldName, newValue);
                                        } else if (Array.isArray(newValue) && newValue.every((v) => typeof v === 'string')) {
                                            formik.setFieldValue(fieldName, newValue);
                                            // For multi-select, pass the array as string[]
                                            handleMatchTypeChange(fieldName, newValue as string[]);
                                        }
                                    } else {
                                        if (typeof newValue === 'string') {
                                            formik.handleChange(e);
                                            handleMatchTypeChange(fieldName, newValue);
                                        }
                                    }
                                }}
                                error={!!formik.touched[field?.matchTypeField?.name] && !!formik.errors[field?.matchTypeField?.name]}
                                onBlur={formik.handleBlur}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            '& .MuiMenuItem-root': {
                                                m: "0 10px",
                                                borderRadius: '4px',
                                                fontSize: 12,
                                            },
                                            '& .MuiMenuItem-root:hover': {
                                                backgroundColor: theme.palette.customColors?.blue[11],
                                            },
                                        },
                                    },
                                }}
                                sx={{ fontSize: 12 }}
                                multiple={field?.matchTypeField?.selectionMode?.toLowerCase() !== 'single'}
                            >
                                {field?.matchTypeField?.options?.map((option) => (
                                    <MenuItem key={option?.value} value={option?.value}>
                                        {formatLabel(option?.label)}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched[field?.matchTypeField?.name] && formik.errors[field?.matchTypeField?.name] && (
                                <Typography sx={{ ...field?.matchTypeField?.styles?.error, fontSize: 8, mt: '4px' }}>
                                    {formik.errors[field?.matchTypeField?.name] as string}
                                </Typography>
                            )}
                        </FormControl>
                    </Box>
                );
            default:
                return (
                    <></>
                );
        }

    }
    const renderValueField = (field: FieldConfig) => {
        const fieldApi = field?.valueField?.url;
        const isGraphql = fieldApi?.includes("grapghql");
        const autocompleteDropdownValue = isGraphql ? formattedAirportsData : formattedAirlineData;
        let isCurrencySubrule = "";
        let isSubrule = "";
        switch (field.valueField.type?.toLowerCase()) {
            case 'select':
                return (
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        {!formattedLabel?.includes(formatLabel(field.matchTypeField.label)) && <Typography sx={{ fontSize: 10, fontWeight: 400, py: '5px', color: theme.palette.customColors?.black[1] }}>
                            {field.valueField.label}
                        </Typography>}
                        <FormControl fullWidth sx={field.valueField.styles?.select} size="small">
                            <InputLabel sx={{ fontSize: 12, fontWeight: 400 }} shrink={false}>{formik.values[field.valueField.name] ? '' : field?.matchTypeField?.placeholder || "Select"}</InputLabel>
                            <Select
                                name={field.valueField.name}
                                value={formik.values[field.valueField.name] ?? ''}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    handleMatchTypeChange(field.valueField.name, e.target?.value);
                                }}
                                onBlur={formik.handleBlur}
                                renderValue={(selected) => {
                                    if (selected?.length === 0) {
                                        return <em>Placeholder</em>;
                                    }

                                    return selected?.join(', ');
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            '& .MuiMenuItem-root': {
                                                m: "0 10px",
                                                borderRadius: '4px',
                                                fontSize: 12,
                                            },
                                            '& .MuiMenuItem-root:hover': {
                                                backgroundColor: theme.palette.customColors?.blue[11],
                                            },

                                        },
                                    },
                                }}
                                sx={{ fontSize: 12 }}
                            >
                                {field.valueField.options?.map((option) => (
                                    <MenuItem sx={{
                                        '&.Mui-focusVisible': {
                                            backgroundColor: 'transparent',
                                        },
                                    }}

                                        key={option.value} value={option.value}>
                                        {option.label.split('_').join(' ')}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched[field.valueField.name] && formik.errors[field.valueField.name] && (
                                <Typography sx={field.valueField.styles?.error}>
                                    {formik.errors[field.valueField.name] as string}
                                </Typography>
                            )}
                        </FormControl>
                    </Box>
                );
            case 'date':
                return (
                    <Box sx={{ flex: 1 }} id={field.valueField.name}>
                        <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                            {!formattedLabel?.includes(formatLabel(field.matchTypeField.label)) && <Typography sx={{ fontSize: 10, fontWeight: 400, py: '5px', color: theme.palette.customColors?.black[1] }}>
                                {field.valueField.label}
                            </Typography>}
                            <Typography sx={{ fontSize: 8, fontWeight: 400, py: '5px', }}>
                                {getMaxLength(field) !== null && typeof formik.values[field.valueField.name] === 'string' ? `${(formik.values[field.valueField.name] as string).length} / ${getMaxLength(field)}` : ''}
                            </Typography>
                        </Box>
                        <TextField
                            name={field.valueField.name}
                            value={formik.values[field.valueField.name] ?? ''}
                            onChange={(e) => {
                                const maxLength = getMaxLength(field);
                                if (maxLength !== null && e.target.value?.length > Number(maxLength)) {
                                    formik.setFieldValue(field.valueField.name, e.target.value.slice(0, Number(maxLength)));
                                } else {
                                    formik.handleChange(e);
                                }
                                // Trigger validation after field change
                                setTimeout(() => formik.validateField(field.valueField.name), 0);
                            }}
                            fullWidth
                            onBlur={formik.handleBlur}
                            placeholder={field.valueField.placeholder}
                            type="text"
                            error={formik.touched[field.valueField.name] && Boolean(formik.errors[field.valueField.name])}
                            helperText={
                                formik.touched[field.valueField.name] && formik.errors[field.valueField.name]
                                    ? formik.errors[field.valueField.name] as string
                                    : field.matchTypeField.options?.find((val) => val.value === matchTypes[field.matchTypeField.name])?.hint ?? ""
                            }
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-input': {
                                    fontSize: 12
                                },
                                '& .MuiFormHelperText-root': {
                                    ml: 0,
                                    fontSize: 8
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    fontSize: '12px',
                                    fontWeight: 400,
                                    opacity: 0.6
                                }
                            }}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton disabled={formik.values[field.matchTypeField.name] === "MATCHES_REGEX"}
                                                onClick={(e) => handleOpenDateCalendar(e, field.valueField.name)}
                                                size="small"
                                            >
                                                <CalendarTodayOutlined fontSize="small" />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                    </Box>
                );
            case 'time':
                return (
                    <Box sx={{ flex: 1 }} id={field.valueField.name}>
                        <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                            <Typography sx={{ fontSize: 10, fontWeight: 400, py: '5px', color: theme.palette.customColors?.black[1] }}>
                                {field.valueField.label}
                            </Typography>
                            <Typography sx={{ fontSize: 8, fontWeight: 400, py: '5px', }}>
                                {getMaxLength(field) !== null && typeof formik.values[field.valueField.name] === 'string' ? `${(formik.values[field.valueField.name] as string).length} / ${getMaxLength(field)}` : ''}
                            </Typography>
                        </Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                name={field.valueField.name}
                                value={typeof formik.values[field.valueField.name] === 'string' ? dayjs(formik.values[field.valueField.name], 'HH:mm') : dayjs('', 'HH:mm')}
                                views={['hours', 'minutes']}
                                format="HH:mm"
                                onChange={async (newValue) => {
                                    if (newValue?.isValid()) {
                                        await formik.setFieldValue(field.valueField.name, newValue.format('HH:mm'));
                                        await formik.setFieldTouched(field.valueField.name, true);
                                        await formik.validateForm();
                                    }
                                }}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        size: 'small',
                                    },
                                }}

                                ampm={false}
                            />
                            {formik.touched[field.valueField.name] && formik.errors[field.valueField.name] && (
                                <Typography sx={{ color: "red", fontSize: 8, mt: "4px" }}>
                                    {formik.errors[field.valueField.name] as string}
                                </Typography>
                            )}
                        </LocalizationProvider>
                    </Box>

                );
            case 'radio':
                if (field.matchTypeField?.selectionMode?.toLowerCase() === 'single') {
                    return (
                        <FormControl component="fieldset"
                            error={Boolean(formik.touched[field.valueField.name] && formik.errors[field.valueField.name])}

                        >
                            {!formattedLabel?.includes(formatLabel(field.matchTypeField.label)) && <Typography sx={{ fontSize: 10, fontWeight: 400, py: '5px', color: theme.palette.customColors?.black[1] }}>
                                {field.valueField.label}
                            </Typography>}
                            <RadioGroup
                                row
                                name={field.valueField.name}
                                value={formik.values[field.valueField.name]}
                                onChange={(e) => {
                                    const previousValue = formik.values[field.valueField.name];
                                    // Clear sub-rules of the previously selected option BEFORE updating the form value
                                    if (previousValue && previousValue !== e.target.value) {
                                        const normalize = (str: string) => (str ?? '').replace(/\s+/g, '_').toUpperCase();
                                        const normalizedPreviousValue = normalize(previousValue as string);
                                        const previousSubruleFields = uniqueFields.filter(
                                            (subField) => {
                                                if (!subField.parentFieldName) return false;
                                                if (!subField.parentFieldName.startsWith(field.valueField.name + '_')) return false;

                                                // Get everything after the first underscore
                                                const underscoreIndex = subField.parentFieldName.indexOf('_');
                                                if (underscoreIndex === -1) return false;

                                                const inputValueNamesRaw = subField.parentFieldName.substring(underscoreIndex + 1);
                                                const inputValueNames = inputValueNamesRaw.split('|');
                                                const isMatch = inputValueNames.some(inputValueName =>
                                                    normalize(inputValueName) === normalizedPreviousValue
                                                );

                                                return isMatch;
                                            }
                                        );
                                        previousSubruleFields.forEach(subField => {
                                            formik.setFieldValue(subField.matchTypeField.name, '');
                                            if (subField.valueField.options.length > 0) {
                                                subField.valueField.options.forEach(item => {
                                                    formik.setFieldValue(toPascalCaseWithSuffix(item.value), '');
                                                });
                                            }
                                            formik.setFieldValue(subField.valueField.name, '');
                                        });
                                    }

                                    // Update the form value after clearing previous sub-rules
                                    formik.handleChange(e);
                                    handleMatchTypeChange(field.valueField.name, e.target.value);
                                }}
                                onBlur={formik.handleBlur}

                            >
                                {field.valueField.options?.map((option, index) => (
                                    <FormControlLabel
                                        key={index}
                                        control={<Radio />}
                                        label={formatLabel(option.label)}
                                        value={option.value}
                                        sx={{
                                            '& .MuiTypography-root': {
                                                fontSize: 12
                                            }
                                        }}
                                    />
                                ))}
                            </RadioGroup>
                            <FormHelperText>{Boolean(formik.touched[field.valueField.name] && formik.errors[field.valueField.name]) && `${field.valueField.label !== "" ? field.valueField.label : field.ruleDisplayName} ${formik.errors[field.valueField.name]}`}</FormHelperText>
                        </FormControl>
                    );
                } else {
                    return (
                        <FormControl component="fieldset" error={Boolean(formik.touched[field.valueField.name] && formik.errors[field.valueField.name])}
                        >
                            {!formattedLabel?.includes(formatLabel(field.matchTypeField.label)) && <Typography sx={{ fontSize: 10, fontWeight: 400, py: '5px', color: theme.palette.customColors?.black[1] }}>
                                {field.valueField.label}
                            </Typography>}
                            {field.valueField.options?.map((option, index) => (
                                <FormControlLabel
                                    key={index}
                                    control={<Checkbox />}
                                    onBlur={formik.handleBlur}
                                    name={field.valueField.name}
                                    label={option.label}
                                    value={option.value}
                                    checked={formik.values[field.valueField.name]?.includes(option.value)}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        formik.handleChange(e);
                                        handleMatchTypeChange(field.valueField.name, e.target.value);
                                    }}

                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontSize: 12
                                        }
                                    }}
                                />
                            ))}
                        </FormControl>
                    );
                }
            case 'checkbox':
                if (field.valueField?.selectionMode?.toLowerCase() !== 'single') {
                    return (
                        <Box>
                            <FormControl component="fieldset" error={Boolean(formik.touched[field.valueField.name] && formik.errors[field.valueField.name])}
                                sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                {!formattedLabel?.includes(formatLabel(field.valueField.label)) && <Typography sx={{ fontSize: 10, fontWeight: 400, py: '5px', color: theme.palette.customColors?.black[1] }}>
                                    {field.valueField.label}
                                </Typography>}
                                {field?.valueField?.options?.map((option, index) => (
                                    <FormControlLabel
                                        key={index}
                                        control={<Checkbox icon={<BpIcon sx={{ fontSize: '16px' }} />}
                                            checkedIcon={<BpCheckedIcon sx={{ fontSize: '16px' }} />} />}
                                        name={field.valueField.name}
                                        label={option.label}
                                        value={option.value}
                                        onBlur={formik.handleBlur}
                                        checked={formik.values[field.valueField.name]?.includes(option.value)}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            formik.handleChange(e);
                                            handleMatchTypeChange(field.valueField.name, e.target.value);
                                        }}
                                        sx={{
                                            '& .MuiTypography-root': {
                                                fontSize: 12
                                            }
                                        }}
                                    />
                                ))}
                            </FormControl>
                            {formik.touched[field.valueField.name] && formik.errors[field.valueField.name] && Object.keys(formik.errors[field.valueField.name]).length > 0 && (
                                <Typography sx={{ color: 'red', fontSize: '0.7rem', mt: 1 }}>
                                    {`${field.valueField.label !== "" ? field.valueField.label : field.ruleDisplayName !== "" ? field.ruleDisplayName : jsonData?.ConstraintName?.split('(')?.[0]?.trim()} ${formik.errors[field.valueField.name]}`}
                                </Typography>
                            )}
                        </Box>
                    );
                } else {
                    // MULTIPLE selection: render subrule fields inline with their parent option
                    return (
                        <FormGroup>
                            <FormControl component="fieldset" error={Boolean(formik.touched[field.valueField.name] && formik.errors[field.valueField.name])}
                                sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                {!formattedLabel?.includes(formatLabel(field.valueField.label)) && <Typography sx={{ fontSize: 10, fontWeight: 400, py: '5px' }}>
                                    {field.valueField.label}
                                </Typography>}
                                {field?.valueField?.options?.map((option) => {
                                    // Find subrule fields for this option
                                    const subruleFields = uniqueFields.filter(
                                        (subField) =>
                                            subField.parentFieldName &&
                                            subField.parentFieldName.startsWith(field.valueField.name + '_') &&
                                            subField.parentFieldName.split('_')[1].split('|').includes(option.value)
                                    );
                                    const isChecked = Array.isArray(formik.values[field.valueField.name]) && (formik.values[field.valueField.name] as string[]).includes(option.value);
                                    return (
                                        <Box key={option.value} sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap' }}>
                                            <FormControlLabel
                                                control={<Checkbox icon={<BpIcon sx={{ fontSize: '16px' }} />}
                                                    checkedIcon={<BpCheckedIcon sx={{ fontSize: '16px' }} />} />}
                                                name={field.valueField.name}
                                                label={option.label}
                                                value={option.value}
                                                checked={isChecked}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    // Clear sub-rules of this option if being unchecked
                                                    if (!e.target.checked) {
                                                        const normalize = (str: string) => (str ?? '').replace(/\s+/g, '_').toUpperCase();
                                                        const normalizedOptionValue = normalize(option.value as string);
                                                        const optionSubruleFields = uniqueFields.filter(
                                                            (subField) => {
                                                                if (!subField.parentFieldName) return false;
                                                                if (!subField.parentFieldName.startsWith(field.valueField.name + '_')) return false;

                                                                // Get everything after the first underscore
                                                                const underscoreIndex = subField.parentFieldName.indexOf('_');
                                                                if (underscoreIndex === -1) return false;
                                                                const inputValueNamesRaw = subField.parentFieldName.substring(underscoreIndex + 1);
                                                                const inputValueNames = inputValueNamesRaw.split('|');
                                                                const isMatch = inputValueNames.some(inputValueName =>
                                                                    normalize(inputValueName) === normalizedOptionValue
                                                                );
                                                                return isMatch;
                                                            }
                                                        );
                                                        optionSubruleFields.forEach(subField => {
                                                            formik.setFieldValue(subField.matchTypeField.name, '');
                                                            if (subField.valueField.options && subField.valueField.options.length > 0) {
                                                                subField.valueField.options.forEach(item => {
                                                                    formik.setFieldValue(toPascalCaseWithSuffix(item.value), '');
                                                                });
                                                            }
                                                            formik.setFieldValue(subField.valueField.name, '');
                                                        });
                                                    }

                                                    // Update the form value after clearing sub-rules if unchecked
                                                    formik.handleChange(e);
                                                    handleMatchTypeChange(field.valueField.name, e.target.value);
                                                }}
                                                onBlur={formik.handleBlur}
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: 12
                                                    }
                                                }}
                                            />
                                            {/* Render subrule fields inline next to the option */}
                                            {isChecked && subruleFields.map((subField) => (
                                                <Box key={subField.ruleId + (subField.parentFieldName || '')} sx={{ ml: 2, minWidth: 120 }}>
                                                    {renderValueField(subField)}
                                                </Box>
                                            ))}
                                        </Box>
                                    );
                                })}
                            </FormControl>
                            {formik.touched[field.valueField.name] && formik.errors[field.valueField.name] && Object.keys(formik.errors[field.valueField.name]).length > 0 && (
                                <Typography sx={{ color: 'red', fontSize: '0.7rem', mt: 1 }}>
                                    {`${field.valueField.label !== "" ? field.valueField.label : field.ruleDisplayName !== "" ? field.ruleDisplayName : jsonData?.ConstraintName?.split('(')?.[0]?.trim()} ${formik.errors[field.valueField.name]}`}
                                </Typography>
                            )}
                        </FormGroup>
                    );
                }
            case 'text':
                return (<Box sx={{ flex: 1 }}>
                    {!formattedLabel?.includes(formatLabel(field.matchTypeField.label)) && <Typography sx={{ fontSize: 10, fontWeight: 400, py: '5px', color: theme.palette.customColors?.black[1] }}>
                        {field.valueField.label}
                    </Typography>}
                    <TextField
                        name={field.valueField.name}
                        placeholder={field.valueField.placeholder}
                        value={formik.values[field.valueField.name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched[field.valueField.name] && Boolean(formik.errors[field.valueField.name])}
                        helperText={formik.touched[field.valueField.name] && formik.errors[field.valueField.name] ? formik.errors[field.valueField.name]?.toString() : ''}
                        size="small"
                        sx={{
                            width: field.matchTypeField.Visibility === "HIDDEN" ? "50%" : "100%",
                            '& .MuiOutlinedInput-input': {
                                fontSize: 12
                            },
                            '& .MuiFormHelperText-root': {
                                ml: 0,
                                fontSize: 8
                            },
                            '& .MuiInputBase-input::placeholder': {
                                fontSize: '12px',
                                fontWeight: 400,
                                opacity: 0.6
                            }
                        }}
                    />
                </Box>
                );
            case 'currency':
                // Check if this is a subrule field (has parentFieldName)
                isCurrencySubrule = 'parentFieldName' in field && field.parentFieldName;
                if (isCurrencySubrule) {
                    // For subrule fields, render inline without separate label
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TextField
                                name={field.valueField.name}
                                placeholder={field.valueField.placeholder}
                                value={formik.values[field.valueField.name]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched[field.valueField.name] && Boolean(formik.errors[field.valueField.name])}
                                helperText={formik.touched[field.valueField.name] && formik.errors[field.valueField.name] ? formik.errors[field.valueField.name]?.toString() : ''}
                                size="small"
                                sx={{
                                    width: '120px',
                                    '& .MuiFormHelperText-root': {
                                        ml: 0,
                                        fontSize: 8
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        fontSize: '12px',
                                        fontWeight: 400,
                                        opacity: 0.6
                                    }
                                }}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {currency?.Symbol}
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        </Box>
                    );
                } else {
                    // For regular fields, use the original layout
                    return (
                        <Box sx={{ flex: 1 }}>
                            {!formattedLabel?.includes(formatLabel(field.matchTypeField.label)) && <Typography sx={{ fontSize: 10, fontWeight: 400, py: '5px', color: theme.palette.customColors?.black[1] }}>
                                {field.valueField.label}
                            </Typography>}
                            <TextField
                                name={field.valueField.name}
                                placeholder={field.matchTypeField.placeholder}
                                value={formik.values[field.valueField.name]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched[field.valueField.name] && Boolean(formik.errors[field.valueField.name])}
                                helperText={formik.touched[field.valueField.name] && formik.errors[field.valueField.name] ? formik.errors[field.valueField.name]?.toString() : ''}
                                size="small"
                                sx={{
                                    width: field.matchTypeField.Visibility === "HIDDEN" ? "50%" : "100%",
                                    '& .MuiOutlinedInput-input': {
                                        fontSize: 12
                                    },
                                    '& .MuiFormHelperText-root': {
                                        ml: 0,
                                        fontSize: 8
                                    }
                                }}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {currency?.Symbol}
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        </Box>
                    );
                }
            case 'percentage':
                // Check if this is a subrule field (has parentFieldName)
                isSubrule = 'parentFieldName' in field && field.parentFieldName;

                if (isSubrule) {
                    // For subrule fields, render inline without separate label
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TextField
                                name={field.valueField.name}
                                placeholder={field.valueField.placeholder}
                                value={formik.values[field.valueField.name]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched[field.valueField.name] && Boolean(formik.errors[field.valueField.name])}
                                helperText={formik.touched[field.valueField.name] && formik.errors[field.valueField.name] ? formik.errors[field.valueField.name]?.toString() : ''}
                                size="small"
                                sx={{
                                    width: '120px',
                                    '& .MuiOutlinedInput-input': {
                                        fontSize: 12
                                    },
                                    '& .MuiFormHelperText-root': {
                                        ml: 0,
                                        fontSize: 8
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        fontSize: '12px',
                                        fontWeight: 400,
                                        opacity: 0.6
                                    }
                                }}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                %
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        </Box>
                    );
                } else {
                    // For regular fields, use the original layout
                    return (
                        <Box sx={{ flex: 1 }}>
                            {!formattedLabel?.includes(formatLabel(field.matchTypeField.label)) && <Typography sx={{ fontSize: 10, fontWeight: 400, py: '5px', color: theme.palette.customColors?.black[1] }}>
                                {field.valueField.label}
                            </Typography>}
                            <TextField
                                name={field.valueField.name}
                                placeholder={field.matchTypeField.placeholder}
                                value={formik.values[field.valueField.name]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched[field.valueField.name] && Boolean(formik.errors[field.valueField.name])}
                                helperText={formik.touched[field.valueField.name] && formik.errors[field.valueField.name] ? formik.errors[field.valueField.name]?.toString() : ''}
                                size="small"
                                sx={{
                                    width: field.matchTypeField.Visibility === "HIDDEN" ? "50%" : "100%",
                                    '& .MuiOutlinedInput-input': {
                                        fontSize: 12
                                    },
                                    '& .MuiFormHelperText-root': {
                                        ml: 0,
                                        fontSize: 8
                                    }
                                }}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                %
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        </Box>
                    );
                }
            case 'kilograms':
                return (
                    <Box sx={{ flex: 1 }}>
                        {!formattedLabel?.includes(formatLabel(field.matchTypeField.label)) && <Typography sx={{ fontSize: 10, fontWeight: 400, py: '5px', color: theme.palette.customColors?.black[1] }}>
                            {field.valueField.label}
                        </Typography>}
                        <TextField
                            name={field.valueField.name}
                            placeholder={field.matchTypeField.placeholder}
                            value={formik.values[field.valueField.name]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched[field.valueField.name] && Boolean(formik.errors[field.valueField.name])}
                            helperText={formik.touched[field.valueField.name] && formik.errors[field.valueField.name] ? formik.errors[field.valueField.name]?.toString() : ''}
                            size="small"
                            sx={{
                                width: field.matchTypeField.Visibility === "HIDDEN" ? "50%" : "100%",
                                '& .MuiOutlinedInput-input': {
                                    fontSize: 12
                                },
                                '& .MuiFormHelperText-root': {
                                    ml: 0,
                                    fontSize: 8
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    fontSize: '12px',
                                    fontWeight: 400,
                                    opacity: 0.6
                                }
                            }}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            Kg(s)
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </Box>
                );
            case 'autocomplete':
                return (
                    <Box sx={{ flex: 1 }}>
                        {!formattedLabel?.includes(formatLabel(field.matchTypeField.label)) && <Typography sx={{ fontSize: 10, fontWeight: 400, py: '5px', color: theme.palette.customColors?.black[1] }}>
                            {field.valueField.label}
                        </Typography>}
                        <Autocomplete
                            open={autocompleteOpenStates[field.valueField.name] || false}
                            limitTags={1}
                            multiple={field.valueField.selectionMode?.toLowerCase() === 'multiple'}
                            isOptionEqualToValue={(option, value) => option?.value === value?.value}
                            slots={{
                                listbox: ListboxComponent
                            }}
                            slotProps={{
                                paper: {
                                    sx: {
                                        padding: 0,
                                        boxShadow: 'none',
                                        border: 'none'
                                    },
                                },
                                listbox: {
                                    'data-total-count': autocompleteDropdownValue?.length || 0,
                                    'data-selected-count': (() => {
                                        const tempSelected = tempSelections[field.valueField.name];
                                        return tempSelected ? tempSelected.size : 0;
                                    })(),
                                    'data-temp-selected': tempSelections[field.valueField.name] || new Set(),
                                    'data-on-select-all': () => {
                                        const isMultiple = field.valueField.selectionMode?.toLowerCase() === 'multiple';
                                        if (isMultiple && autocompleteDropdownValue) {
                                            const allValues = new Set(autocompleteDropdownValue.map(option => option.value));
                                            setTempSelections(prev => ({
                                                ...prev,
                                                [field.valueField.name]: allValues
                                            }));
                                        }
                                    },
                                    'data-on-clear': () => {
                                        setTempSelections(prev => ({
                                            ...prev,
                                            [field.valueField.name]: new Set()
                                        }));
                                    },
                                    'data-on-save': () => {
                                        const tempSelected = tempSelections[field.valueField.name];
                                        const isMultiple = field.valueField.selectionMode?.toLowerCase() === 'multiple';
                                        const inputElement = document.querySelector(`input[name="${field.valueField.name}"]`) as HTMLInputElement;
                                        if (tempSelected) {
                                            if (isMultiple) {
                                                const selectedItem = Array.from(tempSelected)
                                                setSelectedAirports(selectedItem);
                                                formik.setFieldValue(field.valueField.name, selectedItem);
                                            } else {
                                                const firstValue = Array.from(tempSelected) || '';
                                                setSelectedAirports(firstValue);
                                                formik.setFieldValue(field.valueField.name, firstValue);
                                            }
                                        } else {
                                            formik.setFieldValue(field.valueField.name, isMultiple ? [] : '');
                                        }

                                        // Close the autocomplete dropdown
                                        setAutocompleteOpenStates(prev => ({
                                            ...prev,
                                            [field.valueField.name]: false
                                        }));

                                        if (inputElement) {
                                            setTimeout(() => {
                                                inputElement.blur();
                                            }, 0);
                                        }
                                    }
                                }
                            }}
                            options={
                                (() => {
                                    const allOptions = autocompleteDropdownValue || [];
                                    const fieldValue = formik.values[field.valueField.name];
                                    const isMultiple = field.valueField.selectionMode?.toLowerCase() === 'multiple';
                                    if (!isMultiple && fieldValue) {
                                        // For single selection, filter out the currently selected value
                                        return allOptions.filter(option => option.value !== fieldValue);
                                    }
                                    return allOptions;
                                })()
                            }
                            value={
                                (() => {
                                    const fieldValue = formik.values[field.valueField.name];
                                    const isMultiple = field.valueField.selectionMode?.toLowerCase() === 'multiple';
                                    if (isMultiple) {
                                        // For multiple selection, return array of options
                                        if (Array.isArray(fieldValue)) {
                                            return autocompleteDropdownValue?.filter(option =>
                                                fieldValue.includes(option.value)
                                            ) || [];
                                        }
                                        return [];
                                    } else {
                                        // For single selection, return single option or null
                                        if (fieldValue) {
                                            return autocompleteDropdownValue?.find(option =>
                                                option.value === fieldValue
                                            ) || null;
                                        }
                                        return null;
                                    }
                                })()
                            }
                            disableCloseOnSelect={true}
                            onClose={(event) => {
                                // Prevent closing for all reasons - dropdown should only close via save button
                                event?.preventDefault();
                                event?.stopPropagation();
                                return false;
                            }}
                            loading={isGraphql ? isAirportsLoading : isAirlineLoading}
                            onOpen={() => {
                                // Set the autocomplete as open
                                setAutocompleteOpenStates(prev => ({
                                    ...prev,
                                    [field.valueField.name]: true
                                }));

                                // Initialize temp selections with current formik values
                                const formikValues = formik.values[field.valueField.name];
                                if (Array.isArray(formikValues)) {
                                    setTempSelections(prev => ({
                                        ...prev,
                                        [field.valueField.name]: new Set(formikValues)
                                    }));
                                }
                                const arr: unknown[] = Array.isArray(airlineData?.Response) ? airlineData.Response : [];
                                if (arr.length === 0) {
                                    if (!isGraphql) {
                                        fetchAirline({
                                            patch: {
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
                                                }
                                            },
                                            // endpoint: removeApiVersion("/api/v1/meta/autocomplete/search")
                                            endpoint: removeApiVersion(field?.valueField?.url)
                                        })
                                    }

                                }
                            }}
                            onChange={(_, newValue) => {
                                const isMultiple = field.valueField.selectionMode?.toLowerCase() === 'multiple';
                                if (isMultiple) {
                                    // Handle chip removal and addition for multiple selection
                                    if (Array.isArray(newValue)) {
                                        const newValueStrings = newValue.map(option =>
                                            typeof option === 'object' && option && 'value' in option
                                                ? (option as { value: string }).value
                                                : String(option)
                                        );
                                        formik.setFieldValue(field.valueField.name, newValueStrings);

                                        // Update temp selections to reflect the change
                                        setTempSelections(prev => ({
                                            ...prev,
                                            [field.valueField.name]: new Set(newValueStrings)
                                        }));
                                    } else {
                                        formik.setFieldValue(field.valueField.name, []);
                                        setTempSelections(prev => ({
                                            ...prev,
                                            [field.valueField.name]: new Set()
                                        }));
                                    }
                                } else {
                                    // Handle single selection
                                    if (newValue && typeof newValue === 'object' && 'value' in newValue) {
                                        formik.setFieldValue(field.valueField.name, (newValue as { value: string }).value);
                                    } else {
                                        formik.setFieldValue(field.valueField.name, '');
                                    }
                                }
                            }}
                            onBlur={formik.handleBlur}
                            clearOnBlur={false}
                            onChangeCapture={async (e: React.ChangeEvent<HTMLInputElement>) => {
                                if (isGraphql && e.target.value.length === 3) {
                                    try {
                                        await trigger({
                                            text: e.target.value,
                                            TextSearch: selectedAirports,
                                            endpoint: removeApiVersion(field?.valueField?.url)
                                        })
                                    } catch {
                                        console.error("Error fetching airports data");
                                    }
                                } else {
                                    formik.setFieldValue(field.valueField.name, e.target.value);
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    placeholder={field.valueField.placeholder}
                                    onInput={(e) => {
                                        const input = e.target as HTMLInputElement;
                                        input.value = input.value.replace(/[^a-zA-Z]/g, ''); // Allow only alphabets, no spaces
                                    }}
                                    error={formik.touched[field.valueField.name] && Boolean(formik.errors[field.valueField.name])}
                                    helperText={formik.touched[field.valueField.name] && formik.errors[field.valueField.name]}
                                    slotProps={{
                                        input: {
                                            ...params.InputProps,
                                            endAdornment: (
                                                <>
                                                    {isAirlineLoading ? <InputAdornment position="end">
                                                        <CircularProgress size={20} sx={{
                                                            marginRight: "22px"
                                                        }} />
                                                    </InputAdornment> : null}
                                                    {params.InputProps.endAdornment}
                                                </>
                                            ),
                                        },
                                    }}
                                    sx={{
                                        fontSize: 12,
                                        width: "100%",
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                borderColor: theme?.palette?.customColors?.lightBlue?.[2],
                                            },
                                            "&.MuiInputBase-root": {
                                                padding: 0,
                                            },
                                        },
                                        "& .MuiInputAdornment-root": {
                                            position: "absolute",
                                            right: 0,
                                            top: 0,
                                            height: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                        }, '& .MuiInputBase-input::placeholder': {
                                            fontSize: '12px',
                                            fontWeight: 400,
                                            opacity: 0.6
                                        }
                                    }}
                                />
                            )}
                            getOptionLabel={(option) => {
                                if (Array.isArray(option)) return '';
                                return (option as { label?: string }).label || '';
                            }}
                            renderTags={(tagValue, getTagProps) =>
                                tagValue.map((option, index) => {
                                    const { key, ...tagProps } = getTagProps({ index });
                                    const label = typeof option === 'object' && option && 'label' in option
                                        ? (option as { label: string }).label
                                        : String(option);

                                    // Truncate label if it's longer than 25 characters
                                    const truncatedLabel = label.length > 18
                                        ? `${label.substring(0, 15)}...`
                                        : label;

                                    return (
                                        <Chip
                                            key={key}
                                            label={truncatedLabel}
                                            {...tagProps}
                                            title={label} // Show full text on hover
                                            size="small"
                                            sx={{
                                                fontSize: '12px',
                                                height: '24px',
                                                maxWidth: '200px',
                                                '& .MuiChip-label': {
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }
                                            }}
                                        />
                                    );
                                })
                            }
                            renderOption={(props, option) => {
                                const { key, ...optionProps } = props;
                                if (Array.isArray(option)) return null;
                                const tempSelected = tempSelections[field.valueField.name] || new Set();
                                const isTemporarilySelected = tempSelected?.has((option as { value?: string }).value || '');
                                const displaySelected = isTemporarilySelected;
                                return (
                                    <li
                                        key={key}
                                        {...optionProps}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            const optionValue = (option as { value?: string }).value || '';
                                            const isMultiple = field.valueField.selectionMode?.toLowerCase() === 'multiple';
                                            if (isMultiple) {
                                                setTempSelections(prev => {
                                                    const currentSet = new Set(prev[field.valueField.name] || []);
                                                    if (currentSet.has(optionValue)) {
                                                        currentSet.delete(optionValue);
                                                    } else {
                                                        currentSet.add(optionValue);
                                                    }
                                                    return {
                                                        ...prev,
                                                        [field.valueField.name]: currentSet
                                                    };
                                                });
                                            } else {
                                                // For single selection, replace the entire set
                                                setTempSelections(prev => ({
                                                    ...prev,
                                                    [field.valueField.name]: new Set([optionValue])
                                                }));
                                            }
                                        }}
                                        style={{
                                            ...optionProps.style,
                                            fontSize: 14,
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '2px 8px ',
                                            fontWeight: 400,
                                            cursor: 'pointer',
                                            transition: 'background-color 0.2s ease',
                                        }}>
                                        <Checkbox
                                            icon={<BpIcon sx={{ fontSize: '16px' }} />}
                                            checkedIcon={<BpCheckedIcon sx={{ fontSize: '16px' }} />}
                                            sx={{
                                                py: 0,
                                                paddingX: '9px',
                                                borderColor: theme?.palette?.customColors?.grey?.[8],
                                                borderRadius: '10px',
                                                '&.MuiCheckbox-root': { color: theme?.palette?.customColors?.grey?.[8] },
                                            }}
                                            checked={displaySelected}
                                            size="small"
                                        />
                                        <Typography sx={{ fontSize: 12, fontWeight: 400, color: theme.palette.customColors?.black[1] }}>
                                            {(option as { label?: string }).label || ''}
                                        </Typography>
                                    </li>
                                );
                            }}
                        />
                    </Box>
                );
            default:
                return (
                    <></>
                );
        }

    }
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ mt: isMobileView ? 2 : "35px", pb:"3rem" }}>
                <Typography sx={{ fontSize: 20, fontWeight: 600, color: theme.palette.customColors?.black[1] }}>{jsonData?.ConstraintName?.split('(')?.[0]?.trim()}</Typography>
                <Divider sx={{ color: theme.palette.customColors?.lightGray[12], mt: "11px", mb: 2 }} />
                <form onSubmit={formik.handleSubmit}>
                    {uniqueFields
                        .filter(field => field.matchTypeField?.name && field.valueField?.name)
                        .filter(field => shouldRenderField(field, formik.values))
                        .map((field) => (
                            <Box key={field.ruleId + (field.parentFieldName || '')} sx={{
                                mt: isMobileView ? "16px" : 0,
                            }}>
                                <Typography sx={{ fontSize: 14, fontWeight: 500, color: theme.palette.customColors?.black[1] }}>{field.ruleDisplayName}</Typography>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: isMobileView ? "column" : "row",
                                    gap: '10%',
                                    ml: isMobileView ? "10px" : "30px",
                                    mb: "30px",
                                }}>
                                    {/* Match Type Field (Select) */}
                                    {renderRuleField(field)}
                                    {/* Value Field (TextField with DateCalendar trigger) */}
                                    {renderValueField(field)}
                                </Box>
                            </Box>
                        ))}
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleCloseDateCalendar}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <Box>
                            <CustomCalendar
                                value={activeFieldName && formik.values[activeFieldName] ? moment(formik.values[activeFieldName], 'DD/MM/YY') : null}
                                disablePast
                                minDate={activeFieldName === 'EndDateValue' && formik.values.StartDateValue ? moment(formik.values.StartDateValue, 'DD/MM/YY') : undefined}
                                onChange={handleDateChange}
                            />
                        </Box>
                    </Popover>
                    <Box sx={{
                        width: isMobileView ? "100%" : '54%',
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
                            type="button"
                            size="small"
                            variant="outlined"
                            sx={{ color: theme.palette.customColors?.lightBlue[2], textTransform: "none", borderColor: theme.palette.customColors?.lightBlue[2] }}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            size="small"
                            disabled={formik.isSubmitting}
                            variant="contained"
                            sx={{ backgroundColor: theme.palette.customColors?.lightBlue[2], textTransform: "none", ml: 1 }}
                        >
                            Save
                        </Button>
                    </Box>
                </form>
            </Box>
        </LocalizationProvider>
    );
};

export default DynamicForm;

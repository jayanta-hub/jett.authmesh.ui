import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Checkbox, CircularProgress, Divider, IconButton, MenuItem, Select, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { Form, Formik, } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Info from "../../../../assets/images/info.svg";
import { useBasicCreationMutation, useEditTagMutation, useFetchTagsByIdMutation } from '../../../../store/musafirTagsApi';
import { setSelectValues } from '../../../../store/slice/TagCreationDataSlice';
import { RootState } from '../../../../store/store';
import { theme } from '../../../../theme';
import { customEnqueueSnackbar } from '../../../../utility/helper';
import { useTagsContext } from '../../context/TagsContext';

const TagBasicInfoForm: React.FC<basicInfoType> = ({ setMoveToTableComponent, editTagData }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
    const [basicCreation] = useBasicCreationMutation()
    const [loading, setLoading] = useState<boolean>(false)
    const [value, setValue] = useState("")
    const { fetchTagsMetaData, fetchParentTags } = useSelector((state: RootState) => state.tagsSlice);
    const [editTagApi] = useEditTagMutation();
    const { editFlag, editTagOnLastPage } = useTagsContext();
    const [fetchTagsById] = useFetchTagsByIdMutation()
    const { basicCreationId } = useSelector((state: RootState) => state.tagsSlice);
    const [tagData, setTagData] = useState<any>(null);
    const [selectedObject, setSelectedObject] = useState()
    const [filteredParentTags, setFilteredParentTags] = useState()
    const savedFormData = localStorage.getItem('formData');
    const parsedSavedFormData = savedFormData ? JSON.parse(savedFormData) : null;
    const [selectedTagType, setSelectedTagType] = useState([])
    const [tagTypeChanged, setTagTypeChanged] = useState('')
    const initialValues = tagData
        ? {
            isMandatory: tagData?.IsMandatory,
            tagType: tagData?.TagTypes?.map(i => i.Key) ?? [],
            valueType: tagData?.TagValueType?.Key ?? '',
            showInModules: tagData?.Modules?.map(i => i.Key) ?? [],
            assignParent: tagData?.ParentTagId ?? '',
            tagName: tagData?.TagName ?? '',
            Placeholder: tagData?.Placeholder ?? '',
            RegularExpression: tagData?.RegularExpression ?? ''
        }
        : parsedSavedFormData || {
            isMandatory: false,
            tagType: [],
            valueType: '',
            showInModules: [],
            assignParent: '',
            tagName: '',
            Placeholder: '',
            RegularExpression: ''
        };

    const validationSchema = Yup.object({
        tagType: Yup.array()
            .of(Yup.string())
            .min(1, 'At least one tag type is required')
            .required('Tag type is required'),
        valueType: Yup.string().required('Value type is required'),
        tagName: Yup.string().required('Tag name is required').max(50, 'Tag name cannot be longer than 50 characters'),
        showInModules: Yup.array()
            .of(Yup.string())
            .min(1, 'Please select at least one module.')
            .required('Please select at least one module.'),
    });

    useEffect(() => {
        if (editFlag || editTagOnLastPage) {
            fetchTagData();
        }
    }, [editFlag, editTagOnLastPage]);

    useEffect(() => {
        if (fetchParentTags && tagData) {
            const parentTags = fetchParentTags?.Response;
            const filteredTags = parentTags?.filter(
                (tag: any) => tag?.TagId !== tagData?.TagId
            );
            setFilteredParentTags(filteredTags)
        } else {
            setFilteredParentTags(fetchParentTags?.Response)
        }
    }, [fetchParentTags, tagData])

    const fetchTagData = async () => {
        const payload = {
            Context: {
                UserAgent: "Mozilla5.0",
                TrackingId: "41f716e3-fc85-4d36-bf53-64bbd752f520",
                TransactionId: "41f716e3-fc85-4d36-bf53-64bbd752f520",
                CountryCode: "IN",
                IpAddress: "127.0.0.1"
            },
            Request: {
                TagId: (editFlag && editTagData) ||
                    (editTagOnLastPage && basicCreationId?.Response?.Id)
            }
        };

        try {
            setLoading(true);
            const response = await fetchTagsById({ patch: payload }).unwrap();
            setTagData(response?.Response);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
            const errorMessage = error?.data?.Context?.Message || 'An error occurred';
            customEnqueueSnackbar(errorMessage ?? 'An error occurred', 'error');

        }
    };
    const tagCreation = async (values: any) => {
        const payload = {
            "Context": {
                "UserAgent": "Mozilla/5.0",
                "TrackingId": "c5feba9b-3996-4b52-9c7f-2f46bb1b8cde",
                "TransactionId": "c5feba9b-3996-4b52-9c7f-2f46bb1b8cde",
                "CountryCode": "IN",
                "IpAddress": "127.0.0.1"
            },
            "Request": {
                "Name": values.tagName,
                "Types": values.tagType,
                "ValueType": values.valueType,
                "Modules": values.showInModules,
                "TravelIntent": "ALL",
                "IsMandatory": values.isMandatory,
                "ParentTagId": showAssignParent ? values.assignParent : "",
                "TmcEntityId": "*",
                "OrgEntityId": "*",
                "Category": "CUSTOM",
                "Placeholder": value == 'FreeText' ? values?.Placeholder : "",
                "RegularExpression": value == 'FreeText' ? values?.RegularExpression : ""
            }
        }
        try {
            setLoading(true)
            const response = await basicCreation({ patch: payload }).unwrap();
            if (response?.Context?.StatusCode == 1001) {
                setLoading(false)
                setMoveToTableComponent(2)
                if (localStorage.getItem('formData')) { localStorage.removeItem('formData'); }
            }
        } catch (error: any) {
            localStorage.setItem('formData', JSON.stringify(values));
            console.error(error?.data)
            setLoading(false)
            const errorMessage = error?.data?.Context?.Message || 'An error occurred';
            customEnqueueSnackbar(errorMessage ?? "Error occured", 'error');
        }
        finally {
            setLoading(false);
        }
    }

    const tagEdit = async (values: any) => {
        const payload = {
            "Context": {
                "UserAgent": "Mozilla/5.0",
                "TrackingId": "c5feba9b-3996-4b52-9c7f-2f46bb1b8cde",
                "TransactionId": "c5feba9b-3996-4b52-9c7f-2f46bb1b8cde",
                "CountryCode": "IN",
                "IpAddress": "127.0.0.1"
            },
            "Request": {
                "Id": editFlag ? editTagData : basicCreationId?.Response?.Id,
                "Name": values.tagName,
                "Types": values.tagType,
                "ValueType": values.valueType,
                "Modules": values.showInModules,
                "TravelIntent": "ALL",
                "IsMandatory": values.isMandatory,
                "ParentTagId": showAssignParent ? values.assignParent : "",
                "TmcEntityId": "*",
                "OrgEntityId": "*",
                "Category": tagData && tagData?.Category,
                "Placeholder": (value === 'FreeText' || (!value && tagData?.TagValueType?.Key === 'FreeText')) ? values?.Placeholder : "",
                "RegularExpression": (value === 'FreeText' || (!value && tagData?.TagValueType?.Key === 'FreeText')) ? values?.RegularExpression : "",
            }
        }
        try {
            setLoading(true)
            const response = await editTagApi({ patch: payload }).unwrap();
            if (response?.StatusCode == 1002) {
                setLoading(false)
                setMoveToTableComponent(2)
            }
        } catch (error: any) {
            setValue(tagData?.TagValueType?.Key)
            setTagData(tagData)
            console.error(error?.data)
            setLoading(false)
            const errorMessage = error?.data?.Message || 'An error occurred';
            customEnqueueSnackbar(errorMessage ?? "Error occured", 'error');
        }
    }

    if (loading) {
        return <Box className="flex items-center justify-center h-full ">
            <CircularProgress color="primary" />
        </Box>;
    }

    const valueValidation = (values: any) => {
        if (values === 'ListSingleSelect' || values === 'ListMultiSelect' || values === 'FreeText' || values === 'ListWithAdd') {
            const formattedValue = values
                .replace(/([a-z])([A-Z])/g, '$1 $2')
                .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
                .toLowerCase();
            return formattedValue.charAt(0).toUpperCase() + formattedValue.slice(1);
        }
        return values;
    }

    const allowedKeys = ["ListSingleSelect", "ListMultiSelect", "ListWithAdd"];

    const showAssignParent = value
        ? allowedKeys.includes(value)
        : allowedKeys.includes(tagData?.TagValueType?.Key);
    const areArraysEqual = (arr1: any[], arr2: any[]) => {
        if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
        if (arr1.length !== arr2.length) return false;

        const sorted1 = [...arr1].sort();
        const sorted2 = [...arr2].sort();

        return sorted1.every((value, index) => value === sorted2[index]);
    };

    const handleChangeTagType = (tag: any) => {
        const changed = !areArraysEqual(selectedTagType, tag?.TagTypes || []);
        if (changed) {
            setTagTypeChanged('The Tag Type is changed same as Parent Tag Type');
        }
        else {
            setTagTypeChanged('');
        }
    };
    const handleParentChange = (tag: any, parent: any) => {
        if (!showAssignParent) {
            setTagTypeChanged('');
            return;
        }
        const parentType = filteredParentTags?.find((item: any) => item?.TagId === parent);
        const parentTagTypes = Array.isArray(parentType?.TagTypes) ? parentType.TagTypes : [];
        const tagTypes = Array.isArray(tag) ? tag : [];
        const changed = !areArraysEqual(parentTagTypes, tagTypes);
        if (changed && parentType?.TagTypes !== undefined) {
            setTagTypeChanged('Parent Tag Type is different from Tag Type');
        } else {
            setTagTypeChanged('');
        }
    };
    const handleChangeTagValueType = (tag: any) => {
        const allowedKeys = ["ListSingleSelect", "ListMultiSelect", "ListWithAdd"];
        const showAssignParent = allowedKeys.includes(tag);
        if (!showAssignParent) {
            setTagTypeChanged('');
        }
    }

    return (
        <Box>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    dispatch(setSelectValues({ ...values, assignParent: showAssignParent ? values.assignParent : "" }));
                    (editFlag || editTagOnLastPage) ? tagEdit(values) : tagCreation(values);
                }}
            >
                {({ values, errors, touched, handleChange, setFieldValue }) => (
                    <Box>
                        <Box>
                            {tagData?.Category === "PREDEFINED" ? (
                                <Typography sx={{ fontSize: '1.2rem', lineHeight: "15px", fontWeight: 500 }}>{values.tagName}</Typography>
                            ) : (
                                <TextField
                                    name="tagName"
                                    value={values.tagName}
                                    onChange={handleChange}
                                    variant="standard"
                                    placeholder={t("tag_name")}
                                    error={touched.tagName && Boolean(errors.tagName)}
                                    sx={{
                                        width: isMobileView ? "50%" : "30%",
                                        lineHeight: "100%",
                                        '& input::placeholder': {
                                            fontSize: '1.2rem', color: '#B3B3B3',
                                        },
                                        '& input': {
                                            fontSize: '1.2rem',
                                            caretColor: theme.palette.customColors?.blue[10],
                                            fontWeight: 500
                                        },
                                        '& .MuiInput-underline:before': {
                                            borderBottomColor: theme.palette.customColors?.blue[10],
                                        },
                                        '& .MuiInput-underline:after': {
                                            borderBottomColor: theme.palette.customColors?.blue[10],
                                        },

                                    }}
                                />
                            )
                            }

                            {touched.tagName && errors.tagName && (
                                <Typography sx={{ color: 'red', fontSize: '12px' }}>
                                    {errors.tagName}
                                </Typography>
                            )}
                        </Box>
                        <Divider sx={{ marginTop: "30px", marginBottom: "25px", color: theme.palette.customColors?.lightGray[12] }} />

                        <Form>
                            <Box>
                                <Box className="flex items-center mb-[25px]">
                                    <Checkbox

                                        sx={{

                                            '&.Mui-checked': {
                                                color: theme.palette.customColors?.blue[20],
                                            },
                                            '&. MuiButtonBase-root': {
                                                '& .MuiCheckbox-root': {
                                                    padding: "0px",
                                                }
                                            },
                                            padding: "0px",

                                        }}
                                        checked={values.isMandatory}
                                        onChange={(e) => setFieldValue('isMandatory', e.target.checked)}
                                    />
                                    <Typography sx={{ fontSize: "12px", lineHeight: "15px" }}>{t("is_mandatory")}</Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        width: {
                                            xs: '100%',
                                            md: '60%',
                                        },
                                        justifyContent: 'space-between',
                                        flexDirection: {
                                            xs: 'column',
                                            md: 'row',
                                        },
                                        mt: 3,
                                        mb: '25px',
                                    }}
                                >                                    <Box className="w-full">
                                        <Typography sx={{ marginBottom: "10px", fontSize: "14px", fontWeight: 500 }}>
                                            {t("choose_tag_type")}
                                        </Typography>
                                        <Select
                                            IconComponent={(props) => (
                                                <KeyboardArrowDownIcon
                                                    {...props}
                                                    className={`custom-arrow ${props.className}`}
                                                />
                                            )}
                                            disabled={tagData?.Category === "PREDEFINED"}
                                            name="tagType"
                                            value={
                                                Array.isArray(values.tagType) &&
                                                    values.tagType.length === 2 &&
                                                    values.tagType.includes('TRIP') &&
                                                    values.tagType.includes('TRAVELER')
                                                    ? 'TRIP & TRAVELER'
                                                    : values.tagType?.[0] || ''
                                            }
                                            onChange={(e) => {
                                                const selected = e.target.value;
                                                const tagType = selected === 'TRIP & TRAVELER' ? ['TRIP', 'TRAVELER'] : [selected];
                                                handleParentChange(tagType, values?.assignParent);
                                                setFieldValue('tagType', tagType);
                                            }}
                                            renderValue={(selected) => {
                                                if (!selected || selected.length === 0) {
                                                    return <span style={{ color: '#D9D9D9' }}>
                                                        Select Tag Type
                                                    </span>
                                                }

                                                if (selected === 'TRIP & TRAVELER') {
                                                    return 'Trip & Traveler';
                                                }

                                                const matchedItem = fetchTagsMetaData?.Response?.TagTypes?.find(
                                                    (type) => type.Key === selected
                                                );
                                                return matchedItem?.Value || selected;
                                            }}
                                            displayEmpty
                                            labelId="tag-type-label"
                                            id="tag-type-select"
                                            error={touched.tagType && Boolean(errors.tagType)}
                                            sx={{
                                                height: 40,
                                                width: isMobileView ? "100%" : "90%",
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: theme.palette.customColors?.blue[20],
                                                },
                                                '& .MuiSelect-select': {
                                                    color: values.tagType ? 'black' : '#D9D9D9',
                                                },
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: theme.palette.customColors?.white[22],
                                                },
                                                '& .custom-arrow': {
                                                    color: theme.palette.customColors?.grey[8],
                                                    transition: 'transform 0.3s ease',
                                                },
                                                '&[aria-expanded="true"] .custom-arrow': {
                                                    transform: 'rotate(180deg)',
                                                },
                                            }}
                                        >
                                            <MenuItem value="" disabled>Select Tag Type</MenuItem>
                                            {fetchTagsMetaData?.Response?.TagTypes?.map((type, index) => (
                                                <MenuItem
                                                    key={index + type?.Key}
                                                    value={type?.Key}
                                                    sx={{
                                                        color: 'black',
                                                        '&:hover': {
                                                            backgroundColor: theme.palette.customColors?.blue[11],
                                                        }
                                                    }}
                                                >
                                                    {type?.Value}
                                                </MenuItem>
                                            ))}
                                        </Select>

                                        {touched.tagType && errors.tagType && (
                                            <Typography sx={{ color: 'red', fontSize: '12px' }}>{errors.tagType}</Typography>
                                        )}
                                    </Box>

                                    <Box
                                        sx={{
                                            width: '100%',
                                            mt: {
                                                xs: 2,
                                                md: 0,
                                            },
                                        }}
                                    >
                                        <Typography sx={{ marginBottom: "10px", fontSize: "14px", fontWeight: 500 }}>
                                            {t("choose_value_type")}
                                        </Typography>
                                        <Select
                                            IconComponent={(props) => (
                                                < KeyboardArrowDownIcon
                                                    {...props}
                                                    className={`custom-arrow ${props.className}`}
                                                />
                                            )}
                                            disabled={tagData?.Category === "PREDEFINED"}
                                            name="valueType"
                                            value={values.valueType}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setValue(e.target.value);
                                                handleChangeTagValueType(e.target.value);
                                                setFieldValue("assignParent", '');
                                            }} displayEmpty
                                            error={touched.valueType && Boolean(errors.valueType)}
                                            sx={{
                                                height: 40,
                                                width: isMobileView ? "100%" : "90%",
                                                '& .MuiSelect-select': {
                                                    color: values.valueType ? 'black' : '#D9D9D9',
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: theme.palette.customColors?.blue[20],
                                                },
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: theme.palette.customColors?.white[22],
                                                },
                                                '& .custom-arrow': {
                                                    color: theme.palette.customColors?.grey[8],
                                                    transition: 'transform 0.3s ease',
                                                },
                                                '&[aria-expanded="true"] .custom-arrow': {
                                                    transform: 'rotate(180deg)',
                                                },
                                            }}
                                        >
                                            <MenuItem value="" disabled>
                                                <span >{t("select_value_type")}</span>
                                            </MenuItem>
                                            {fetchTagsMetaData?.Response?.TagValueTypes?.map((value: any, index: number) => (
                                                <MenuItem sx={{
                                                    color: 'black',
                                                    '&:hover': {
                                                        backgroundColor: theme.palette.customColors?.blue[11],
                                                    }
                                                }} key={index + value?.Key} value={value?.Key}>{valueValidation(value?.Key)} </MenuItem>
                                            ))}
                                        </Select>
                                        {touched.valueType && errors.valueType && (
                                            <Typography sx={{ color: 'red', fontSize: '12px' }}>{errors.valueType}</Typography>
                                        )}
                                    </Box>
                                </Box>
                                {(value === "FreeText" || (!value && tagData?.TagValueType?.Key === "FreeText")) && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            width: {
                                                xs: '100%',
                                                md: '60%',
                                            },
                                            justifyContent: 'space-between',
                                            flexDirection: {
                                                xs: 'column',
                                                md: 'row',
                                            },
                                            mt: 4,
                                        }}
                                    >

                                        <Box sx={{ width: '100%' }}>
                                            <Typography sx={{ marginBottom: "10px", fontSize: "14px", fontWeight: 500 }}>
                                                {t("Regular Expression Validation")}
                                            </Typography>
                                            <TextField
                                                disabled={tagData?.Category === "PREDEFINED"}
                                                name="RegularExpression"
                                                placeholder="/^C [0-9] [0-9] D [0-9]$/"
                                                value={values.RegularExpression}
                                                onChange={handleChange}
                                                error={touched.RegularExpression && Boolean(errors.RegularExpression)}
                                                helperText={touched.RegularExpression && errors.RegularExpression}
                                                sx={{
                                                    width: isMobileView ? "100%" : "90%",
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: theme.palette.customColors?.white[22],
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: theme.palette.customColors?.blue[20],
                                                        },
                                                    },
                                                }}
                                                size="small"
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                mt: {
                                                    xs: 2,
                                                    md: 0,
                                                },
                                            }}
                                        >
                                            <Typography sx={{ marginBottom: "10px", fontSize: "14px", fontWeight: 500 }}>
                                                {t("Placeholder Text")}
                                            </Typography>
                                            <TextField
                                                name="Placeholder"
                                                value={values.Placeholder}
                                                onChange={handleChange}
                                                error={touched.Placeholder && Boolean(errors.Placeholder)}
                                                helperText={touched.Placeholder && errors.Placeholder}
                                                sx={{
                                                    width: isMobileView ? "100%" : "90%",
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: theme.palette.customColors?.white[22],
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: theme.palette.customColors?.blue[20],
                                                        },
                                                    },
                                                }}
                                                size="small"
                                            />
                                        </Box>
                                    </Box>
                                )}




                                {!isMobileView && <Box className="mt-5">
                                    <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>{t("select_where_will_you_show_this_tag")}</Typography>
                                    <Box className="flex flex-wrap md:flex-nowrap w-full md:w-[80%] mt-3 justify-between">
                                        {fetchTagsMetaData?.Response?.Modules?.map((condition: any, index: number) => (
                                            <Box key={index} className="flex items-center w-1/2 md:w-auto mb-2 justify-center">
                                                <Checkbox

                                                    sx={{
                                                        '&.Mui-checked': {
                                                            color: theme.palette.customColors?.blue[20],
                                                        },
                                                        '&. MuiButtonBase-root': {
                                                            '& .MuiCheckbox-root': {
                                                                padding: "0px",
                                                            }
                                                        },
                                                        padding: "0px"
                                                    }}
                                                    checked={values.showInModules.includes(condition?.Key)}
                                                    onChange={(e) => {
                                                        const updated = [...values.showInModules];
                                                        if (e.target.checked) updated.push(condition?.Key);
                                                        else updated.splice(updated.indexOf(condition?.Key), 1);
                                                        setFieldValue('showInModules', updated);
                                                    }}
                                                />
                                                <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>{condition?.Value}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                    {touched.showInModules && errors.showInModules && (
                                        <Typography sx={{ color: 'red', fontSize: '12px' }}>
                                            {errors.showInModules}
                                        </Typography>
                                    )}
                                </Box>}
                                {isMobileView &&
                                    <Box className="mt-5">
                                        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>{t("select_where_will_you_show_this_tag")}</Typography>
                                        <Box className="flex flex-wrap md:flex-nowrap w-full md:w-[80%] mt-3 justify-between">
                                            {fetchTagsMetaData?.Response?.Modules?.map((condition: any, index: number) => (
                                                <Box key={index} className="flex items-center w-1/2 md:w-auto mb-2 justify-start ">
                                                    <Checkbox

                                                        sx={{
                                                            '&.Mui-checked': {
                                                                color: theme.palette.customColors?.blue[20],
                                                            },
                                                            '&. MuiButtonBase-root': {
                                                                '& .MuiCheckbox-root': {
                                                                    padding: "0px",
                                                                }
                                                            },
                                                            padding: "0px"
                                                        }}
                                                        checked={values.showInModules.includes(condition?.Key)}
                                                        onChange={(e) => {
                                                            const updated = [...values.showInModules];
                                                            if (e.target.checked) updated.push(condition?.Key);
                                                            else updated.splice(updated.indexOf(condition?.Key), 1);
                                                            setFieldValue('showInModules', updated);
                                                        }}
                                                    />
                                                    <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>{condition?.Value}</Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                        {touched.showInModules && errors.showInModules && (
                                            <Typography sx={{ color: 'red', fontSize: '12px' }}>
                                                {errors.showInModules}
                                            </Typography>
                                        )}
                                    </Box>}

                                <Box className=" mt-5  w-[100%]  flex flex-row justify-between">
                                    <Box sx={{ width: isMobileView ? "100%" : "40%", }}>
                                        {showAssignParent ? (<>
                                            <Typography sx={{ fontSize: "14px", fontWeight: 500, marginBottom: "10px" }}>{t("assign_parent")}</Typography>

                                            <Select
                                                IconComponent={(props) => (
                                                    < KeyboardArrowDownIcon
                                                        {...props}
                                                        className={`custom-arrow ${props.className}`}
                                                    />
                                                )}
                                                name="assignParent"
                                                value={values.assignParent}
                                                onChange={(event) => {
                                                    handleChange(event);
                                                    const selectedTagId = event.target.value;

                                                    const tagType = filteredParentTags?.find((item: any) => item?.TagId === selectedTagId);
                                                    handleChangeTagType(tagType);
                                                    setFieldValue('tagId', selectedTagId);
                                                    if (
                                                        tagType?.TagTypes &&
                                                        Array.isArray(tagType.TagTypes) &&
                                                        tagType.TagTypes.length === 2 &&
                                                        tagType.TagTypes.includes('TRIP') &&
                                                        tagType.TagTypes.includes('TRAVELER')
                                                    ) {
                                                        setFieldValue('tagType', ['TRIP', 'TRAVELER']);
                                                        setSelectedTagType(['TRIP', 'TRAVELER']);
                                                    } else if (tagType?.TagTypes?.length > 0) {
                                                        setFieldValue('tagType', [tagType.TagTypes[0]]);
                                                        setSelectedTagType([tagType.TagTypes[0]]);
                                                    } else {
                                                        setFieldValue('tagType', []);
                                                    }
                                                }}
                                                displayEmpty
                                                error={touched.assignParent && Boolean(errors.assignParent)}
                                                sx={{
                                                    height: 40,
                                                    width: isMobileView ? "100%" : "70%",
                                                    '& .MuiSelect-select': {
                                                        color: values.assignParent ? 'black' : theme.palette.customColors?.grey[14],
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: theme.palette.customColors?.blue[20],
                                                    },
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: theme.palette.customColors?.white[22],
                                                    },
                                                    '& .custom-arrow': {
                                                        color: theme.palette.customColors?.grey[8],
                                                        transition: 'transform 0.3s ease',
                                                    },
                                                    '&[aria-expanded="true"] .custom-arrow': {
                                                        transform: 'rotate(180deg)',
                                                    },
                                                }}
                                                renderValue={(selected) => {
                                                    if (!selected) {
                                                        return <Typography sx={{ color: theme.palette.customColors?.grey[14] }}>{t("select_parent")}</Typography>;
                                                    }

                                                    const selectedObj = fetchParentTags?.Response?.find((p: any) => p.TagId === selected);
                                                    if (selectedObj) {
                                                        setSelectedObject(selectedObj)
                                                    }
                                                    if (selectedObj === undefined) {

                                                        return <>
                                                            {tagData?.Category !== "PREDEFINED" && <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1 }}>
                                                                <Typography sx={{ color: theme.palette.customColors?.grey[14] }}>{t("Parent Tag Deleted")}</Typography>
                                                                <IconButton
                                                                    onMouseDown={(e) => {
                                                                        e.preventDefault();
                                                                        e.stopPropagation();
                                                                    }}
                                                                    size="small"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setFieldValue('assignParent', '');
                                                                    }}
                                                                >
                                                                    <CloseIcon fontSize="small" />
                                                                </IconButton>
                                                            </Box>
                                                            }</>
                                                    }
                                                    return (
                                                        <Tooltip title={selectedObj?.TagName}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1 }}>
                                                                <Typography
                                                                    sx={{
                                                                        whiteSpace: 'nowrap',
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis',
                                                                        maxWidth: '100%',
                                                                    }}
                                                                >
                                                                    {selectedObj?.TagName || selected}
                                                                </Typography>
                                                                {tagData?.Category !== "PREDEFINED" &&
                                                                    <IconButton
                                                                        onMouseDown={(e) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                        }}
                                                                        size="small"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setFieldValue('assignParent', '');
                                                                        }}
                                                                    >
                                                                        <CloseIcon fontSize="small" />
                                                                    </IconButton>
                                                                }
                                                            </Box>
                                                        </Tooltip>
                                                    );
                                                }}
                                                MenuProps={{
                                                    PaperProps: {
                                                        sx: {
                                                            maxWidth: '300px',
                                                            overflow: 'auto',
                                                            wordBreak: 'break-word',
                                                            whiteSpace: 'normal',
                                                        },
                                                    },
                                                }}
                                            >
                                                <MenuItem value="" disabled>{t("select_parent")}</MenuItem>
                                                {filteredParentTags?.map((parent: any, index: number) => {
                                                    const allowedTypes = ["ListSingleSelect", "ListWithAdd", "ListMultiSelect"];

                                                    if (!allowedTypes.includes(parent?.TagValueType)) return null;

                                                    return (
                                                        <MenuItem
                                                            key={index}
                                                            value={parent?.TagId}
                                                            sx={{
                                                                whiteSpace: "normal",
                                                                wordBreak: "break-word",
                                                                maxWidth: "100%",
                                                                lineHeight: 1.4,
                                                                paddingY: 1,
                                                                color: 'black',
                                                                '&:hover': {
                                                                    backgroundColor: theme.palette.customColors?.blue?.[11],
                                                                }
                                                            }}
                                                        >
                                                            {parent.TagName}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>

                                            {touched.assignParent && errors.assignParent && (
                                                <Typography sx={{ color: 'red', fontSize: '12px' }}>{errors.assignParent}</Typography>
                                            )}
                                            {selectedObject === undefined && values.assignParent && (
                                                <Box sx={{ backgroundColor: theme.palette.customColors?.pink?.[4], borderRadius: "5px", marginTop: "5px", padding: "5px", wordBreak: "break-word", display: "flex", width: "70%" }}>
                                                    <img src={Info} style={{ width: "20px", height: "20px", marginRight: 8 }} />
                                                    <Typography sx={{ color: theme.palette.customColors?.black?.[1], fontSize: '12px', fontWeight: 400 }}>
                                                        {t("Parent Tag is deleted - Add New Tag instead")}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </>) : ""}
                                        {tagTypeChanged && <Box sx={{ backgroundColor: theme.palette.customColors?.pink?.[4], borderRadius: "5px", marginTop: "5px", padding: "5px", wordBreak: "break-word", display: "flex", width: "70%" }}>
                                            <img src={Info} style={{ width: "20px", height: "20px", marginRight: 8 }} />
                                            <Typography sx={{ color: theme.palette.customColors?.black?.[1], fontSize: '12px', fontWeight: 400 }}>
                                                {t(tagTypeChanged)}
                                            </Typography>
                                        </Box>}
                                    </Box>

                                    {!isMobileView && <Box className="flex  mt-16 w-[22%] h-[40px]">
                                        <Button type="submit" variant="contained" sx={{ backgroundColor: theme.palette.customColors?.blue?.[22], textTransform: "none", width: "185px", fontSize: "16px", height: "40px" }}>
                                            {t("save_&_continue")}
                                        </Button>
                                    </Box>}
                                </Box>
                                {isMobileView && <Box className="flex  mt-5 w-[100%] h-[40px]  justify-end">
                                    <Button type="submit" variant="contained" sx={{ backgroundColor: theme.palette.customColors?.blue?.[22], textTransform: "none", width: "50%" }}>
                                        {t("save_&_continue")}
                                    </Button>
                                </Box>}

                            </Box>
                        </Form>
                    </Box>
                )
                }

            </Formik >

        </Box >
    )
}

export default TagBasicInfoForm
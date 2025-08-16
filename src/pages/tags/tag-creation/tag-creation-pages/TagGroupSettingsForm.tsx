import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Checkbox, CircularProgress, ClickAwayListener, Divider, FormControl, FormControlLabel, FormHelperText, MenuItem, Paper, Popper, Select, TextField, Typography, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useFetchGroupsTestMutation } from '../../../../store/musafirGroupTest';
import { useCreateGroupMutation, useFetchTagsByIdMutation, useTagGroupMutation } from '../../../../store/musafirTagsApi';
import { RootState } from '../../../../store/store';
import { theme } from '../../../../theme';
import { customEnqueueSnackbar } from '../../../../utility/helper';
import { useTagsContext } from '../../context/TagsContext';



const TagGroupSettingsForm: React.FC<basicInfoType> = ({ setMoveToTableComponent, setGroupSelected, editTagData }) => {
    const [tagGroup] = useTagGroupMutation();
    const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
    const [fetchGroupsTest] = useFetchGroupsTestMutation();
    const [groupData, setGroupData] = useState([]);
    const { fetchTagsMetaData, basicCreationId } = useSelector((state: RootState) => state.tagsSlice);
    const [loading, setLoading] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [newGroupName, setNewGroupName] = useState('');
    const [createGroup] = useCreateGroupMutation()
    const [error, setError] = useState(false)
    const [popperOpen, setPopperOpen] = useState(false)
    const tagData = useSelector((state: any) => state.tagCreationDataSlice);
    const { tagName } = tagData
    const { t } = useTranslation();
    const { editFlag, editTagOnLastPage } = useTagsContext();
    const [buttonLoader, setButtonLoader] = useState(false)
    const [groupAdded, setGroupAdded] = useState(false)
    const [fetchTagsById] = useFetchTagsByIdMutation()
    const selectRef = useRef(null);
    const [created, setCreated] = useState(false)
    const [selectWidth, setSelectWidth] = useState(0);
    const [category, setCategory] = useState('')

    const formik = useFormik({
        initialValues: {
            parentGroup: '',
            selectedModules: [] as string[],
        },
        onSubmit: values => {
            saveGroupSetting(values);
        }
    });


    useEffect(() => {
        const groupPayload = {
            "UserAgent": "Mozilla/5.0",
            "TrackingId": "de2ade5e6a0b4c75b44ab079f4f0b0cb",
            "TransactionId": "019473a9-5977-761b-b608-11ab070f281a",
            "IpAddress": "192.168.1.1",
            "CountryCode": "IN"
        }
        const getGroupData = async () => {
            try {
                const response = await fetchGroupsTest({ patch: groupPayload }).unwrap()
                setGroupData(response?.Response)
            } catch (error) {
                console.error(error)
            }
        }
        getGroupData()
    }, [groupAdded])

    useEffect(() => {
        const updateWidth = () => {
            if (selectRef.current) {
                setSelectWidth(selectRef.current.offsetWidth);
            }
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    useEffect(() => {
        if (editFlag || editTagOnLastPage) {
            fetchTagData();
        }
    }, [editFlag, editTagOnLastPage]);

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
                    (editTagOnLastPage && basicCreationId?.Response?.Id) ||
                    '',
            }
        };

        try {
            setLoading(true);
            const response = await fetchTagsById({ patch: payload }).unwrap();
            const data = response?.Response;
            setCategory(data?.Category)
            if (data) {

                formik.setValues({
                    parentGroup: data?.GroupId ?? '',
                    selectedModules: data?.ModulesInGroup?.map(m => m.Key) ?? [],
                });
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
            const errorMessage = error?.data?.Context?.Message || 'An error occurred';
            customEnqueueSnackbar(errorMessage ?? 'Error occured', 'error');
        }
    };

    const saveGroupSetting = async (values: any) => {
        const selectedGroup = groupData?.find((group: any) => group?.Id === values?.parentGroup);
        setGroupSelected(selectedGroup?.Name);
        const isValuesEmpty = Object.values(values).every(val => {
            if (Array.isArray(val)) return val.length === 0;
            return !val;
        });
        const payload = {
            "Context": {
                "UserAgent": "Mozilla/5.0",
                "TrackingId": "27017030-0526-4a01-9065-55df296f0c1f",
                "TransactionId": "27017030-0526-4a01-9065-55df296f0c1f",
                "CountryCode": "IN",
                "IpAddress": "127.0.0.1"
            },
            "Request": {
                "Id": (editFlag && editTagData) ||
                    (editTagOnLastPage && basicCreationId?.Response?.Id) ||
                    basicCreationId?.Response?.Id,
                "GroupId": values?.parentGroup,
                "ModulesInGroup": values?.selectedModules
            }
        };

        try {
            setLoading(true);
            const response = await tagGroup({ patch: payload }).unwrap();
            if (response?.Context?.StatusCode == 1002) {
                setLoading(false);
                setMoveToTableComponent(4);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
            const errorMessage = error?.data?.Context?.Message || 'An error occurred';
            customEnqueueSnackbar(errorMessage ?? 'Error occured', 'error');
        }

    };

    const handleCheckboxChange = (value: string) => {
        const { selectedModules } = formik.values;
        if (selectedModules.includes(value)) {
            formik.setFieldValue(
                'selectedModules',
                selectedModules.filter((v) => v !== value)
            );
        } else {
            formik.setFieldValue('selectedModules', [...selectedModules, value]);
        }
    };

    const handleCreateNewGroup = async (addedGroupName: string) => {

        const payload = {

            "Context": {
                "UserAgent": "Mozilla/5.0",
                "TrackingId": "c5feba9b-3996-4b52-9c7f-2f46bb1b8cde",
                "TransactionId": "c5feba9b-3996-4b52-9c7f-2f46bb1b8cde",
                "CountryCode": "IN",
                "IpAddress": "127.0.0.1"
            },
            "Request": {
                "Name": addedGroupName
            }
        }

        if (addedGroupName?.length > 0) {
            try {
                setButtonLoader(true)
                setError(false)
                setButtonLoader(true)
                const response = await createGroup({ patch: payload }).unwrap();
                if (response?.Context?.StatusCode == 200) {
                    const createdGroupId = response?.Response?.GroupId;
                    const createdGroupName = response?.Response?.Name;
                    formik.setFieldValue('parentGroup', createdGroupId);
                    setGroupAdded((prev) => !prev)
                    setAnchorEl(Boolean(anchorEl))
                    setAnchorEl(null);
                    setPopperOpen(false);
                    customEnqueueSnackbar(response?.Context?.Message ?? 'Success', 'success');
                    setButtonLoader(false);
                    setNewGroupName("")
                    setButtonLoader(false)
                    setCreated(true)
                }
            } catch (error) {
                customEnqueueSnackbar(error?.data?.Context?.Message ?? 'An error occurred', 'error');
            }
        }
        else {
            setError(true)
        }

    }

    if (loading) {
        return <Box className="flex items-center justify-center h-full ">
            <CircularProgress color="primary" />
        </Box>;
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box className="mt-2">
                <Typography sx={{ fontSize: "22px", fontWeight: 600, lineHeight: "100%", color: theme.palette.customColors?.black[1] }}>{tagName && tagName}</Typography>
                <Divider sx={{ marginY: "40px", color: theme.palette.customColors.lightGray[12] }} />

                <Box className="w-full mt-5 md:mt-0">
                    <Typography sx={{ marginBottom: "10px", fontSize: "16px", fontWeight: 500 }}>{t("add_group")}</Typography>
                    <FormControl fullWidth sx={{ width: isMobileView ? "100%" : "25%" }} error={!!formik.errors.parentGroup && formik.touched.parentGroup}>
                        <Box ref={selectRef}>
                            <Select
                                ref={(ref) => {
                                    setAnchorEl(ref);
                                }}
                                IconComponent={(props) => (
                                    < KeyboardArrowDownIcon
                                        {...props}
                                        className={`custom-arrow ${props.className}`}
                                    />
                                )}
                                displayEmpty
                                name="parentGroup"
                                value={formik.values.parentGroup}
                                onChange={formik.handleChange}
                                sx={{
                                    height: 40,
                                    width: "100%",
                                    '& .MuiSelect-select': {
                                        color: formik?.values?.parentGroup ? theme.palette.customColors?.black[1] : theme.palette.customColors?.grey[14],
                                    },

                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: theme.palette.customColors.blue[20],
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: theme.palette.customColors.lightWhite[5],
                                    },
                                    '& .custom-arrow': {
                                        color: theme.palette.customColors.grey[8]
                                        ,
                                        transition: 'transform 0.3s ease',
                                    },
                                    '&[aria-expanded="true"] .custom-arrow': {
                                        transform: 'rotate(180deg)',
                                    },
                                }}
                                ref={(ref) => setAnchorEl(ref)}
                            >
                                <MenuItem disabled value=''>{t("select_group")}</MenuItem>
                                {groupData?.map((group, index) => (
                                    <MenuItem
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                backgroundColor: theme.palette.customColors.blue[11],
                                            },
                                        }}
                                        value={group?.Id}
                                        key={index + group?.Id}
                                    >
                                        {group?.Name}
                                    </MenuItem>
                                ))}
                                <MenuItem
                                    value=''
                                    onClick={(e) => {
                                        setAnchorEl(e.currentTarget);
                                        setPopperOpen(true)
                                    }}
                                >
                                    + Add New
                                </MenuItem>
                            </Select>
                            {popperOpen &&
                                <Popper
                                    open={Boolean(anchorEl)}
                                    anchorEl={anchorEl}
                                    placement="bottom-start"
                                    sx={{
                                        zIndex: 1300,
                                        width: `${selectWidth}px`
                                    }}
                                >
                                    <ClickAwayListener onClickAway={() => {
                                        setPopperOpen(false); setError(false);
                                        setNewGroupName("")
                                    }}>
                                        <Paper
                                            sx={{
                                                p: 0,
                                                boxShadow: 3,
                                                mt: "10px",
                                                overflow: "hidden"
                                            }}
                                        >
                                            <Box sx={{ px: 2, pt: 2 }}>
                                                <Box className="flex justify-between" mb={1}>
                                                    <Typography sx={{
                                                        fontSize: "12px",
                                                        color: theme.palette.customColors.grey[14]
                                                    }}>
                                                        Add Group Name
                                                    </Typography>
                                                </Box>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    value={newGroupName}
                                                    onChange={(e) => setNewGroupName(e.target.value)}
                                                    sx={{
                                                        mb: 1,
                                                        '& .MuiOutlinedInput-root': {
                                                            height: 30,
                                                            padding: 0,
                                                            '& input': {
                                                                height: '100%',
                                                                padding: '10px 14px',
                                                                boxSizing: 'border-box',
                                                            },
                                                            '& fieldset': {
                                                                borderColor: theme.palette.customColors.lightWhite[5],
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: theme.palette.customColors.blue[20],
                                                            },
                                                        },
                                                        ...(error && {
                                                            '& .MuiOutlinedInput-root': {
                                                                border: '1px solid red',
                                                                borderRadius: '5px',
                                                            }
                                                        })
                                                    }}
                                                />

                                                {error && (
                                                    <Typography sx={{ fontSize: "10px", color: "red", mb: 1 }}>
                                                        Please Enter Group Name
                                                    </Typography>
                                                )}
                                            </Box>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",

                                                    backgroundColor: theme.palette.background.paper
                                                }}
                                            >
                                                <Button
                                                    size="small"
                                                    sx={{
                                                        color: theme.palette.customColors.blue[10],
                                                        fontSize: "12px",
                                                        fontWeight: 500,
                                                        textTransform: "none",
                                                        minWidth: 0,
                                                        px: 2
                                                    }}
                                                    onClick={() => handleCreateNewGroup(newGroupName)}
                                                    loading={buttonLoader}
                                                    loadingPosition="start"
                                                >
                                                    Add
                                                </Button>
                                            </Box>
                                        </Paper>
                                    </ClickAwayListener>
                                </Popper>

                            }
                        </Box>
                        {formik.errors.parentGroup && formik.touched.parentGroup && (
                            <FormHelperText>{formik.errors.parentGroup}</FormHelperText>
                        )}
                    </FormControl>
                </Box>

                <Box className="mt-4">
                    <Typography sx={{ marginBottom: "10px", fontFamily: "Poppins", fontSize: "14px", fontWeight: 500 }}>{t("select_where_will_you_show_this_tag")}</Typography>
                    {!isMobileView && <Box className="flex flex-wrap md:flex-nowrap w-full md:w-[80%] mt-3 justify-between">

                        {!Array.isArray(fetchTagsMetaData?.Response?.Modules) ? (
                            <Typography color="error">No modules available or failed to load.</Typography>
                        ) : (
                            fetchTagsMetaData?.Response?.Modules?.map((condition, index) => (
                                <Box key={index} className="flex items-center w-1/2 md:w-auto mb-2 justify-center">
                                    <FormControlLabel
                                        control={
                                            <Checkbox

                                                sx={{
                                                    '&.Mui-checked': {
                                                        color: theme.palette.customColors.blue[20],
                                                    },
                                                }}
                                                checked={formik.values.selectedModules.includes(condition?.Key)}
                                                onChange={() => handleCheckboxChange(condition?.Key)}
                                            />
                                        }
                                        label={
                                            <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>
                                                {condition?.Value}
                                            </Typography>
                                        }
                                    />
                                </Box>
                            )))}
                    </Box>}
                    {isMobileView && <Box className="flex flex-wrap md:flex-nowrap w-full md:w-[80%] mt-3 justify-between">

                        {!Array.isArray(fetchTagsMetaData?.Response?.Modules) ? (
                            <Typography color="error">No modules available or failed to load.</Typography>
                        ) : (
                            fetchTagsMetaData?.Response?.Modules?.map((condition, index) => (
                                <Box key={index} className="flex">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                sx={{
                                                    '&.Mui-checked': {
                                                        color: theme.palette.customColors.blue[20],
                                                    },
                                                }}
                                                checked={formik.values.selectedModules.includes(condition?.Key)}
                                                onChange={() => handleCheckboxChange(condition?.Key)}
                                            />
                                        }
                                        label={
                                            <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>
                                                {condition?.Value}
                                            </Typography>
                                        }
                                    />
                                </Box>
                            )))}
                    </Box>}
                </Box>

                {
                    !isMobileView && <Box className="flex justify-end md:justify-end md:w-[100%] w-full mt-5">
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: theme.palette.customColors.blue[20],
                                textTransform: "none",
                                fontSize: "16px",
                                fontWeight: 500,
                                padding: "10px",
                                width: "185px",
                                height: "40px"
                            }}
                        >
                            {t("save_&_continue")}
                        </Button>
                    </Box>
                }
                {
                    isMobileView && <Box className="flex justify-end md:justify-end md:w-[100%] w-full mt-5">
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                textTransform: "none",
                                fontSize: "16px",
                                fontWeight: 500,
                                padding: "10px",
                                width: "50%",
                                backgroundColor: theme.palette.customColors.blue[20]

                            }}
                        >
                            {t("save_&_continue")}
                        </Button>
                    </Box>
                }

            </Box >
        </form >
    );
};

export default TagGroupSettingsForm;

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Box, Button, CircularProgress, Divider, FormControl, IconButton, InputAdornment, MenuItem, Select, TextField, Typography, useMediaQuery } from '@mui/material'
import { GridRowModesModel } from '@mui/x-data-grid'
import dayjs from "dayjs"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import DeleteIcon from "../../../../assets/images/deleteIconTable.png"
import DownloadIcon from "../../../../assets/images/downloadicon.png"
import EditIconBlue from "../../../../assets/images/EditIconBlue.png"
import EditIcon from "../../../../assets/images/editIcontable.png"
import searchIcon from '../../../../assets/images/SearchIcon.svg'
import { CustomDataGrid } from "../../../../components"
import { useAutocompletePlacesMutation, usePlaceDetailsMutation } from '../../../../store/musafirGoogleLocationApi'
import { useFetchTagsByIdMutation, useFetchTagsIdMutation, useTagValuesCreationMutation } from '../../../../store/musafirTagsApi'
import { useGetApproversSearchAutoCompleteGraphQuery } from '../../../../store/slice/ApproversSearchApigqlSlice'
import { RootState } from '../../../../store/store'
import { theme } from '../../../../theme'
import { customEnqueueSnackbar } from '../../../../utility/helper'
import { useTagsContext } from '../../context/TagsContext'
import getGridConfigByType from '../../tagConfig'

const TagValueSettingsForm: React.FC<basicInfoType> = ({ setMoveToTableComponent, setValueCount, editTagData }) => {
    const [fetchTagsId] = useFetchTagsIdMutation()
    const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
    const [tagValuesCreation] = useTagValuesCreationMutation()
    const [errorMessageForDelete, setErrorMessageForDelete] = useState("");
    const [loading, setLoading] = useState<boolean>(false)
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [searchKey, setSearchKey] = useState<string>('');
    const { data, isFetching } = useGetApproversSearchAutoCompleteGraphQuery({ text: searchKey }, { skip: !searchKey });
    const [options, setOptions] = useState<string[]>([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const tagData = useSelector((state: any) => state.tagCreationDataSlice);
    const [responseTagValues, setResponseTagValues] = useState([])
    const [optionCheck, setOptionCheck] = useState<{ name: string; id: string }[]>([])
    const { t } = useTranslation();
    const { assignParent, tagType, valueType, tagName } = tagData
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedParentId, setSelectedParentId] = useState("")
    const [selectedParentIdCheckbox, setSelectedParentIdCheckbox] = useState([])
    const [lastId, setLastId] = useState(1)
    const { basicCreationId } = useSelector((state: RootState) => state.tagsSlice);
    const [searchText, setSearchText] = useState('')
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const [fetchTagsById] = useFetchTagsByIdMutation()
    const [checkboxSelection, setCheckBoxChecked] = useState(false)
    const [assignedParentMap, setAssignedParentMap] = useState({});
    const [selectedParentValue, setSelectedParentValue] = useState("");
    const [locationSearch, setLocationSearch] = useState('');
    const { editFlag, setEditFlag, editTagOnLastPage, setEditTagOnLastPage } = useTagsContext();
    const [triggerAutocomplete, { data: suggestions = [], isLoading }] = useAutocompletePlacesMutation();
    const [getPlaceDetails] = usePlaceDetailsMutation();
    const [rows, setRows] = useState([{ id: 1, Name: '', ApproverIds: [], ParentTagValueId: '' }]);
    const [isHovered, setIsHovered] = useState(false);
    const [allRows, setAllRows] = useState([
        { id: 1, Name: '', ApproverIds: [], ParentTagValueId: '' },
    ]);

    const formattedSuggestions =
        suggestions?.suggestions?.map((s) => ({
            label:
                s?.placePrediction?.structuredFormat?.mainText?.text +
                ', ' +
                s?.placePrediction?.structuredFormat?.secondaryText?.text,
            placeId: s?.placePrediction?.placeId,
        })) ?? [];

    useEffect(() => {
        if (locationSearch.length >= 2) {
            triggerAutocomplete(locationSearch);
        }
    }, [locationSearch, triggerAutocomplete]);

    useEffect(() => {
        if (editFlag || editTagOnLastPage) {
            fetchTagData();
        }
    }, [editFlag, editTagOnLastPage]);
    const handleAddRow = () => {
        if (searchText?.length > 0) {
            setErrorMessageForDelete("Clear the searched Item to add more rows");
            return
        } else if (searchText === '') {
            setErrorMessageForDelete("");
        }
        const newId = lastId + 1;
        const newRow = { id: newId, ApproverIds: [], Name: '', ParentTagValueId: '' };
        setRows([...rows, newRow]);
        setAllRows([...rows, newRow]);
        setLastId(newId);
    };

    const condition = !tagType?.includes('PRODUCT') && !tagType?.includes('ORGANIZATION') && valueType !== 'CheckBox';
    const handleDelete = (id: number) => {
        if (rows?.length === 1) return
        setRows(rows.filter(row => row.id !== id));
        setAllRows(rows.filter(row => row.id !== id));
    }
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
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
                TagId:
                    (editFlag && editTagData) ||
                    (editTagOnLastPage && basicCreationId?.Response?.Id)
            }
        };
        try {
            setLoading(true);
            const response = await fetchTagsById({ patch: payload }).unwrap();
            const values: TagValue[] = response?.Response?.Values ?? [];
            const maxId = values.length ? Math.max(...values.map(i => i.Id)) : 1;
            setLastId(maxId);
            const formattedRows = values.map(i => ({
                id: Number(i.Id),
                ...i,
                ApproverIds: i.Approvers?.map(a => a.Name) || []
            }));
            setRows(formattedRows.length ? formattedRows : [{ id: 1, Name: '', ApproverIds: [], ParentTagValueId: '' }]);
            setAllRows(formattedRows);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            const errorMessage = error?.data?.Context?.Message ?? 'An error occurred';
            customEnqueueSnackbar(errorMessage ?? 'Error occured', 'error');
            setOpenSnackbar(true);
        }
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const fetchLocationDetails = async (placeId) => {
        try {
            const response = await getPlaceDetails(placeId).unwrap();
            const nameParts = [
                response?.displayName?.text,
                response?.postalAddress?.Locality,
                response?.postalAddress?.addressLines?.[0],
                response?.postalAddress?.locality,
                response?.postalAddress?.administrativeArea,
                response?.postalAddress?.postalCode
            ];
            const Name = nameParts.filter(Boolean).join(' ');
            return {
                placeId,
                label: response.displayName?.text || '',
                latitude: response.location?.latitude ?? null,
                longitude: response.location?.longitude ?? null,
                Name: Name,
                ...(response.postalAddress && {
                    PostalAddress: {
                        RegionCode: response.postalAddress?.regionCode || '',
                        LanguageCode: response.postalAddress?.languageCode || '',
                        PostalCode: response.postalAddress?.postalCode || '',
                        AdministrativeArea: response.postalAddress?.administrativeArea || '',
                        Locality: response.postalAddress?.locality || '',
                        Address: response.postalAddress?.addressLines?.[0] || '',
                    }
                }),
            };

        } catch (err) {
            console.error("Error fetching place details:", err);
            return {
                placeId,
                label: '',
                latitude: null,
                longitude: null,
                Name: '',
                PostalAddress: {
                    RegionCode: '',
                    LanguageCode: '',
                    PostalCode: '',
                    AdministrativeArea: '',
                    Locality: '',
                    Address: '',
                },
            };
        }
    };

    const columns = getGridConfigByType(valueType == 'User ID' ? "User_ID" : valueType, {
        condition,
        options,
        isFetching,
        searchKey,
        setSearchKey,
        assignParent,
        responseTagValues,
        selectedParentIdCheckbox,
        selectedParentId,
        isMobileView,
        handleMenuClick,
        anchorEl,
        isMenuOpen,
        handleMenuClose,
        handleDelete,
        setIsHovered,
        isHovered,
        EditIcon,
        EditIconBlue,
        DeleteIcon,
        assignedParentMap,
        setAssignedParentMap,
        locationSearch,
        setLocationSearch,
        suggestions: formattedSuggestions,
        isLoading,
        fetchLocationDetails,
    }).flat();

    useEffect(() => {
        if (data?.AutoCompleteApproversSearch?.Response?.Profiles) {
            const profileNames = data.AutoCompleteApproversSearch.Response.Profiles.map(profile =>
                [profile.FirstName, profile.MiddleName, profile.LastName].filter(Boolean).join(" ")
            );
            setOptions(profileNames);
            const newProfiles = data.AutoCompleteApproversSearch.Response.Profiles.map(profile => ({
                name: [profile.FirstName, profile.MiddleName, profile.LastName].filter(Boolean).join(" "),
                id: profile.Id
            }));
            setOptionCheck(prev =>
                [...prev, ...newProfiles.filter(p => !prev.some(existing => existing.id === p.id))]
            );
        }
    }, [data, editFlag]);

    const fetchTagById = async () => {
        const payload = {
            "Context": {
                "UserAgent": "Mozilla/5.0",
                "TrackingId": "de2ade5e6a0b4c75b44ab079f4f0b0cb",
                "TransactionId": "3ddf1ed3414146e684c236b69a477b7d",
                "IpAddress": "192.168.1.1",
                "CountryCode": "IN"
            },
            "Request": {
                "Id": assignParent
            }
        }
        try {
            const response = await fetchTagsId({ patch: payload }).unwrap();
            if (response) {
                setResponseTagValues(response?.Response?.Values)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchTagById()
    }, [assignParent])

    const handleRowEdit = (params) => {
        const { id, field, value } = params;
        const updatedRows = allRows?.map((row) =>
            row.id === id ? { ...row, [field]: value } : row
        );
        setRows(updatedRows);
        setAllRows(updatedRows);
        return { ...params, isValid: true };
    };

    const createTagValues = async () => {
        setValueCount(rows?.length);
        const formattedRows = rows?.map(row => {
            const updatedApproverIds = row?.ApproverIds?.map((name: string) => {
                const optionCheckMatch = optionCheck?.find(opt => opt?.name === name);
                const approversMatch = row?.Approvers?.find((opt: { [key: string]: any }) => opt?.Name === name);
                return optionCheckMatch
                    ? optionCheckMatch?.id
                    : approversMatch
                        ? approversMatch?.Id
                        : name;
            });
            const baseRow = {
                ...row,
                id: editFlag
                    ? (row?.Id ?? row?.id)?.toString()
                    : row?.id?.toString(),
                Name: row?.Name,
                ApproverIds: updatedApproverIds,
                ParentTagValueId: assignParent ? assignedParentMap[row?.id] ?? row?.ParentTagValueId : "",
            };
            switch (valueType) {
                case 'ListSingleSelect':
                case 'ListMultiSelect':
                case 'ListWithAdd':
                    return {
                        ...baseRow,
                        Date: {
                            FromDate: "",
                            ToDate: ""
                        },
                        MatchType: "",
                        Location: null,
                    };
                case 'FreeText':
                    return {
                        ...baseRow,
                        Date: {
                            FromDate: "",
                            ToDate: ""
                        },
                        Location: null,
                        ParentTagValueId: "",
                    };
                case 'CheckBox':
                    return {
                        ...baseRow,
                        ApproverIds: [],
                        ParentTagValueId: "",
                        Date: {
                            FromDate: "",
                            ToDate: ""
                        },
                        MatchType: "",
                        Location: null,
                    };
                case 'User ID':
                    const userIdMatch = optionCheck?.find(opt => opt?.name === row?.Name);
                    return {
                        ...baseRow,
                        Name: userIdMatch?.id ? userIdMatch?.id : row?.Name,
                        ParentTagValueId: "",
                        Date: {
                            FromDate: "",
                            ToDate: ""
                        },
                        MatchType: "",
                        Location: null,
                    };
                case 'Date':
                    return {
                        ...baseRow,
                        ParentTagValueId: "",
                        MatchType: "",
                        Name: "",
                        Location: null,
                    };
                case 'Location':
                    return {
                        ...baseRow,
                        Name: "",
                        Date: {
                            FromDate: "",
                            ToDate: ""
                        },
                        MatchType: "",
                        ParentTagValueId: "",
                    };
                default:
                    return baseRow;
            }
        });

        const payload = {
            Context: {
                UserAgent: "Mozilla/5.0",
                TrackingId: "27017030-0526-4a01-9065-55df296f0c1f",
                TransactionId: "27017030-0526-4a01-9065-55df296f0c1f",
                CountryCode: "IN",
                IpAddress: "127.0.0.1",
            },
            Request: {
                Id:
                    (editFlag && editTagData) ||
                    (editTagOnLastPage && basicCreationId?.Response?.Id) ||
                    basicCreationId?.Response?.Id,
                Values: formattedRows,
            },
        };
        try {
            setLoading(true);
            const response = await tagValuesCreation({ patch: payload }).unwrap();
            if (response?.Context?.StatusCode == 1002) {
                setLoading(false);
                setMoveToTableComponent(3);
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
            const errorMessage = error?.data?.Context?.Message || 'An error occurred';
            customEnqueueSnackbar(errorMessage ?? 'Error occurred', 'error');
        }
    };

    if (loading) {
        return <Box className="flex items-center justify-center h-full ">
            <CircularProgress color="primary" />
        </Box>;
    }
    const handleRowEditCommit = (params) => {
        const updatedRows = allRows?.map((row) =>
            row.id === params.id
                ? { ...row, [params.field]: params.value }
                : row
        );
        setAllRows(updatedRows)
        setRows(updatedRows);
    };

    const handleDeleteAll = () => {
        if (searchText?.length > 0) {
            if (selectedRows.length === allRows.length) {
                setErrorMessageForDelete("You cannot delete all rows.");
                return;
            }
            const updated = allRows.filter((row) => !selectedRows.includes(row.id));
            setRows(updated);
            setAllRows(updated);
            setSelectedRows([]);
            setErrorMessageForDelete("");
        } else if (searchText === '') {
            if (selectedRows.length === rows.length) {
                setErrorMessageForDelete("You cannot delete all rows.");
                return;
            }
            const updated = rows.filter((row) => !selectedRows.includes(row.id));
            setRows(updated);
            setAllRows(updated);
            setSelectedRows([]);
            setErrorMessageForDelete("");
        }
    };
    const handleAssignParent = (event) => {
        const newParentId = event.target.value;
        const updatedMap = { ...assignedParentMap };
        selectedRows.forEach(id => {
            updatedMap[id] = newParentId;
        });
        setAssignedParentMap(updatedMap);
        setSelectedParentValue("");
    };

    const handleDownload = () => {
        const headers = ['ID', 'Tag Value', 'Approvers', 'Parent'];
        const csvRows = [
            headers.join(','),
            ...rows.map((row) => {
                const parent = responseTagValues.find(opt => opt.Id === row.ParentTagValueId);
                return [
                    row.id,
                    row.Name,
                    row.ApproverIds.join(', '),
                    parent ? parent.Name : ''
                ].join(',');
            })
        ];
        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ValueTable.csv';
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleSearchTable = (text: string) => {
        const searchText = text.trim().toLowerCase();
        setSearchText(searchText);
        if (searchText.length > 0) {

            const filteredRows = allRows.filter((row) => {
                const searchInObject = (obj: any): boolean => {
                    return Object.values(obj).some((value) => {
                        if (value === null || value === undefined) return false;
                        if (typeof value === "object") {
                            if ("FromDate" in value || "ToDate" in value) {
                                const fromFormatted = dayjs(value?.FromDate, "MM/DD/YYYY", true).isValid()
                                    ? dayjs(value.FromDate, "MM/DD/YYYY").format("MMM DD, YYYY").toLowerCase()
                                    : "";
                                const toFormatted = dayjs(value?.ToDate, "MM/DD/YYYY", true).isValid()
                                    ? dayjs(value.ToDate, "MM/DD/YYYY").format("MMM DD, YYYY").toLowerCase()
                                    : "";
                                const fullRange = `${fromFormatted} - ${toFormatted}`;
                                return (
                                    fromFormatted.includes(searchText) ||
                                    toFormatted.includes(searchText) ||
                                    fullRange.includes(searchText)
                                );
                            }
                            return searchInObject(value);
                        }
                        return value.toString().toLowerCase().includes(searchText);
                    });
                };
                return searchInObject(row);
            });

            setRows(filteredRows);
        } else {
            setSearchText('');
            setRows(allRows);
        }
    };
    return (
        <Box className="mt-2">
            <Typography sx={{ fontSize: "22px", fontWeight: 600, lineHeight: "100%", color: "#000000", marginLeft: "12px" }}>{tagName && tagName}</Typography>
            <Divider sx={{ marginY: "40px", color: "#EBEBEB", marginLeft: "12px" }} />
            <Typography sx={{ fontSize: "16px", fontWeight: 500, lineHeight: "100%", marginLeft: "12px" }}>{t("add_values_approvers_and_relation")}</Typography>
            {!isMobileView && <Box className="mt-8  flex items-center justify-between">
                <Box className="flex items-center w-[50%] pl-[3.2rem]" >
                    <TextField
                        placeholder={t("search here")}
                        onChange={(e) => handleSearchTable(e.target.value)}
                        sx={{
                            height: 40,
                            '& .MuiInputBase-root': {
                                height: '100%',
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <img
                                        src={searchIcon}
                                        alt="search"
                                        style={{
                                            width: '13px',
                                            height: '13px',
                                            margin: 0,
                                            color: theme?.palette?.customColors?.grey[8],
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box className="flex flex-row justify-start gap-4 items-center">
                    <Box className="border border-[#DDDDDD] h-full flex items-center justify-center p-3 min-w-4 rounded-md" onClick={handleDownload}>
                        <img src={DownloadIcon} className="w-4 cursor-pointer" alt="downloadIcon" />
                    </Box>

                    {!!assignParent && (
                        <FormControl sx={{ minWidth: 150 }}>
                            <Select
                                IconComponent={(props) => (
                                    < KeyboardArrowDownIcon
                                        {...props}
                                        className={`custom-arrow ${props.className}`}
                                    />
                                )}
                                displayEmpty
                                value={selectedParentValue}
                                defaultValue=""
                                sx={{
                                    height: 40, '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#0080FF',
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#ccc',
                                    },
                                    '& .custom-arrow': {
                                        color: '#676767',
                                        transition: 'transform 0.3s ease',
                                    },
                                    '&[aria-expanded="true"] .custom-arrow': {
                                        transform: 'rotate(180deg)',
                                    },

                                }}
                                onChange={handleAssignParent}
                                renderValue={() => t("assign_parent")}
                            >
                                <MenuItem value="" disabled>{t("assign_parent")}</MenuItem>
                                {responseTagValues && responseTagValues?.length > 0 ? (
                                    responseTagValues?.map((item: any) => (
                                        <MenuItem
                                            key={item.Id}
                                            value={item.Id}
                                            sx={{
                                                color: 'black',
                                                '&:hover': {
                                                    backgroundColor: '#DCEDFF',
                                                },
                                            }}
                                        >
                                            {item?.Name || item?.Location?.Name || item?.Date?.FromDate}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled value="">
                                        No options
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    )}

                    <Button onClick={handleDeleteAll} sx={{ textTransform: "none", fontWeight: 400, lineHeight: "100%", padding: "13px", fontsize: "19px", border: checkboxSelection ? "1px solid #0080FF" : "1px solid #DDDDDD", color: "black" }}>{t("delete")}</Button>
                </Box>
            </Box>}
            {
                isMobileView && (
                    <Box className="mt-8 flex flex-col items-center justify-between ">
                        <Box className="flex items-center justify-between w-full">
                            <Box className="w-[40%] ">
                                <TextField
                                    onChange={(e) => handleSearchTable(e.target.value)}
                                    placeholder="Search here"
                                    sx={{
                                        height: 35,
                                        width: "100%",

                                        '& .MuiInputBase-root': {
                                            height: '100%',
                                        },
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <img
                                                    src={searchIcon}
                                                    alt="search"
                                                    style={{
                                                        width: '13px',
                                                        height: '13px',
                                                        margin: 0,
                                                        color: theme?.palette?.customColors?.grey[8],
                                                    }}
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            <Box className={`flex justify-between flex-row items-center  w-[57%]`}>

                                <Box className="border border-[#DDDDDD] h-[100%] items-center justify-center flex p-2 min-w-3 rounded-md">
                                    <img src={DownloadIcon} className="w-4" alt="downloadIcon" />
                                </Box>
                            </Box>
                        </Box>
                        <Box className="flex flex-row items-center w-full mt-4  ">
                            {!!assignParent && (
                                <FormControl sx={{ minWidth: 150 }}>
                                    <Select
                                        IconComponent={(props) => (
                                            < KeyboardArrowDownIcon
                                                {...props}
                                                className={`custom-arrow ${props.className}`}
                                            />
                                        )}
                                        displayEmpty defaultValue="" sx={{
                                            height: 35, '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#0080FF',
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#ccc',
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#0080FF',
                                            },
                                            '& .custom-arrow': {
                                                color: '#676767',
                                                transition: 'transform 0.3s ease',
                                            },
                                            '&[aria-expanded="true"] .custom-arrow': {
                                                transform: 'rotate(180deg)',
                                            },
                                        }} onChange={handleAssignParent} renderValue={() => t("assign_parent")} >
                                        <MenuItem value="" disabled>
                                            Assign a parent
                                        </MenuItem>
                                        {responseTagValues?.map((item) => (
                                            <MenuItem key={item?.Id} value={item?.Id}>
                                                {item?.Name || item?.Location?.Name || item?.Date?.FromDate}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                            <Button
                                variant="outlined"
                                sx={{
                                    textTransform: "none",
                                    fontWeight: 400,
                                    lineHeight: "100%",
                                    padding: "7px",
                                    fontSize: "18px",
                                    border: "1px solid #0080FF",
                                    color: "#0080FF",
                                    marginLeft: "10px"
                                }}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>
                )
            }
            <Box sx={{ mt: 2 }}>
                {columns &&
                    <CustomDataGrid
                        rows={rows}
                        columns={columns}
                        rowModesModel={rowModesModel}
                        setRowModesModel={setRowModesModel}
                        handleRowEditCommit={handleRowEditCommit}
                        handleRowEdit={handleRowEdit}
                        setRows={setRows}
                        setAllRows={setAllRows}
                        setSelectedRows={setSelectedRows}
                        selectedRows={selectedRows}
                        setCheckBoxChecked={setCheckBoxChecked}
                    />}
            </Box>
            <IconButton
                onClick={handleAddRow}
                sx={{
                    textTransform: "none",
                    fontWeight: 400,
                    padding: "8px 16px",
                    color: "#0080FF"
                }}
            >
                <AddCircleOutlineIcon />
            </IconButton>
            {errorMessageForDelete && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {errorMessageForDelete}
                </Typography>
            )}
            {/* {errorMessage && <Typography sx={{ fontSize: "12px", fontWeight: "400", }} color='error' >Error occured</Typography>} */}
            <Box className="flex justify-end  md:justify-end md:w-[100%] w-full mt-5 ">
                <Button onClick={createTagValues} variant='contained' sx={{ backgroundColor: "#0083FF", textTransform: "none", fontSize: "16px", fontWeight: 500, lineHeight: "100%", padding: "10px", width: isMobileView ? "50%" : "185px", height: "40px", marginBottom: "20px" }}>{t("save_&_continue")}</Button>
            </Box>
        </Box >
    )
}

export default TagValueSettingsForm
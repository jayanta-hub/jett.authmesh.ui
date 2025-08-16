import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Autocomplete, Box, Breadcrumbs, Button, CircularProgress, FormControl, Link, MenuItem, Pagination, Select, TextField, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Filter from "../../assets/images/filterTags.png";
import GridMenu from "../../assets/images/gridMenuIcon.png";
import ListMenu from "../../assets/images/listMenuIcon.png";
import searchIcon from '../../assets/images/SearchIcon.svg';
import { TagModalContent, TagsTabSelector } from '../../components';
import Container from '../../components/core-module/container/Container';
import LoadingScreen from '../../components/core-module/loading-screen/LoadingScreen';
import { useFetchGroupsTestMutation } from '../../store/musafirGroupTest';
import { useFetchParentTagsMutation, useFetchTagsMetaMutation, useFetchTagsMutation, useGetTagByIdMutation, useStatusChangeMutation, useTagArchiveMutation, useTagsRankMutation, useTagsStatusMutation } from '../../store/musafirTagsApi';
import { useGetAutoCompleteTagSearchQuery } from '../../store/slice/AutoCompleteTagSearch';
import { resetSelectValues, setView } from '../../store/slice/TagCreationDataSlice';
import { theme } from '../../theme';
import { customEnqueueSnackbar } from '../../utility/helper';
import { editTagType } from '../../utility/types/budget/budget';
import { TabPanelProps } from '../../utility/types/dashboard/Dashboard';
import { useTagsContext } from './context/TagsContext';
import { TagCreationModal } from './tag-creation';
import { AllTags } from './tag-listing';

/**
 * Tags Component
* 
 * This component renders the tags page with all the necessary elements such as breadcrumbs, search bar, sort by dropdown, and tags list.
 * It also renders the tag creation modal and pagination.
 * The component fetches the tags list from the server and renders it based on the selected tab.
 * The user can also search for tags and sort them by name, date, or relevance.
 * If the user clicks on a tag, it opens the tag creation modal.
 * The component also renders the custom tags tab selector.
 * @returns {JSX.Element} The rendered component.
 */

const CustomArrowIcon = (props) => (
    <KeyboardArrowDownIcon
        {...props}
        className={`custom-arrow ${props.className || ''}`}
    />
);


const Tags: React.FC = () => {
    const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
    const [selectedIndex, setSelectedIndex] = useState<number>(useSelector((state: any) => state.tagCreationDataSlice?.view) ?? 0)
    const [value, setValue] = useState<number>(0)
    const [tagsList, setTagsList] = useState<ApiResponse | null>(null);
    const [tagsLoading, setTagsLoading] = useState<boolean>(false);
    const [fetchTags] = useFetchTagsMutation()
    const [fetchTagsMeta] = useFetchTagsMetaMutation();
    const [fetchParentTags] = useFetchParentTagsMutation()
    const [fetchGroupsTest] = useFetchGroupsTestMutation();
    const [statusChange] = useStatusChangeMutation();
    const [tagsRank] = useTagsRankMutation();
    const [getTagById] = useGetTagByIdMutation();
    const [page, setPage] = useState<number>(1)
    const [metaResponse, setMetaResponse] = useState({})
    const [parentTagResponse, setParentTagResponse] = useState([])
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [groupResponse, setGroupResponse] = useState([])
    const [createSuccessfullFlag, setCreateSuccessfullFlag] = useState<boolean>(false)
    const [selectedValue, setSelectedValue] = useState("");
    const [pagination, setPagination] = useState({});
    const { setEditFlag, setEditTagOnLastPage } = useTagsContext();
    const [enableFilterOpen, setEnableFilterOpen] = useState(false)
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [toggleButtonClicked, setToggleButtonClicked] = useState(false)
    const [searchKey, setSearchKey] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [valueInput, setValueInput] = useState<string>()
    const [platformSearchData, setPlatformSearchData] = useState<any>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [selectedTag, setSelectedTag] = useState(null);
    const [tagsStatus] = useTagsStatusMutation()
    const [tagArchive] = useTagArchiveMutation()
    const [editTagData, setEditTagData] = useState<editTagType | undefined>(undefined);
    const [editLoading, setEditLoading] = useState(false)
    const tabs = [
        "all", "predefined", "custom", "draft", "archive"
    ]
    useEffect(() => {
        if (value === 0) {
            setSelectedValue('Rank');
        } else {
            setSelectedValue('CreatedDate');
        }
    }, [value]);

    const [filterValues, setFilterValues] = useState<Partial<TagSettings>>({
        selectAll: false,
        tagTypeSwitch: false,
        tagValueTypeSwitch: false,
        moduleSwitch: false,
        parentSwitch: false,
        tagTypes: [],
        tagValueTypes: [],
        modules: [],
        parentTag: false,
    });
    const [tagFilterValues, setTagFilterValues] = useState<Partial<TagSettings>>({})
    const [filterEnabled, setFilterEnabled] = useState(false);
    const breadcrumbs = [
        <Link key="1" color="inherit" fontSize="12px" sx={{ textDecoration: 'none' }} >
            {t("hub")}
        </Link>,
        <Link
            sx={{ textDecoration: 'none' }}
            key="2"
            color="inherit"
            fontSize="12px"
        >
            {t("settings")}
        </Link>,
        <Typography key="3" sx={{ color: 'text.primary', fontSize: "12px" }}>
            {t("tags")}
        </Typography>,
    ];
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const { data, error: queryError } = useGetAutoCompleteTagSearchQuery(
        { searchKey: searchKey });

    useEffect(() => {
        if (data) {
            setPlatformSearchData(data?.AutoCompleteTagSearchFilter?.Response?.Tags)
        }
        if (queryError) {
            console.log("Error111: ", queryError);
        }
    }, [data, queryError]);

    const handleModalOpen = () => {
        setModalOpen(true)
    }
    const handleModalClose = () => {
        setModalOpen(false);
        setEditTagData(undefined);
        dispatch(resetSelectValues());
        setEditFlag(false)
        setEditTagOnLastPage(false)
    }
    const handleEditClick = async (tagId: string) => {
        setEditFlag(true)
        setEditTagOnLastPage(false)
        setEditLoading(true)
        let payload = {
            "Context": {
                "UserAgent": "Mozilla/5.0",
                "TrackingId": "ac38544e-5f95-4c79-bb84-c284e7e3d6a7",
                "TransactionId": "ac38544e-5f95-4c79-bb84-c284e7e3d6a7",
                "CountryCode": "IN",
                "IpAddress": "127.0.0.1"
            },
            "Request": {
                "TagId": tagId
            }
        }
        try {
            const response = await getTagById({ patch: payload }).unwrap();
            const data = response as TagResponse;

            if (data?.Context?.StatusCode === 2101) {
                setEditTagData(data.Response);
                setEditLoading(false);
            }
        } catch (error: any) {
            console.error(error?.data)
            const errorMessage = error?.data?.Context?.Message || 'An error occurred';
            customEnqueueSnackbar(errorMessage ?? "Error occured", 'error');
            setEditLoading(false)
        }
        setModalOpen(true);
    }
    const getFilterType = (value: number): string => {
        switch (value) {
            case 1: return "PREDEFINED";
            case 2: return "CUSTOM";
            case 3: return "DRAFT";
            case 4: return "ARCHIVE";
            default: return "ALL";
        }
    };

    const getSortConfig = (selectedValue: string | null, value: number) => {
        if (selectedValue) {
            return {
                Sort: {
                    SortBy: selectedValue,
                    SortOrder: selectedValue === "CreatedDate" ? -1 : 1,
                },
            };
        }
        if (value === 0) {
            return {
                Sort: {
                    SortBy: "Rank",
                    SortOrder: 1,
                },
            };
        }
        return {};
    };

    const getFilters = () => {
        return {
            TagTypeKey: Array.isArray(filterValues?.tagTypes) ? filterValues.tagTypes : [],
            TagValueTypeKey: Array.isArray(filterValues?.tagValueTypes) ? filterValues.tagValueTypes : [],
            ModuleKey: Array.isArray(filterValues?.modules) ? filterValues.modules : [],
            ...(filterValues?.parentTag === true && { HasParent: true }),
        };
    };

    const fetchTagsCall = async () => {
        setTagsLoading(true);
        const filterType = getFilterType(value);
        const sortConfig = getSortConfig(selectedValue, value);
        const filters = getFilters();
        const isFilterEnabled = (
            filters.TagTypeKey.length > 0 ||
            filters.TagValueTypeKey.length > 0 ||
            filters.ModuleKey.length > 0 ||
            filterValues?.parentTag !== false
        );
        setFilterEnabled(isFilterEnabled);
        const payload = {
            Context: {
                UserAgent: "Mozilla/5.0",
                TrackingId: "de2ade5e6a0b4c75b44ab079f4f0b0cb",
                TransactionId: "3ddf1ed3414146e684c236b69a477b7d",
                IpAddress: "192.168.1.1",
                CountryCode: "US",
            },
            Request: {
                Pagination: {
                    PageNumber: selectedTag ? 1 : page,
                    PageSize: 10,
                },
                CategoryType: filterType,
                ...sortConfig,
                ...(isFilterEnabled && { Filters: filters }),
                Search: {
                    Key: selectedTag ? "Tag" : "",
                    Value: selectedTag ? selectedTag?.Id : "",
                },
            },
        };

        const metaPayload = {
            UserAgent: "Mozilla/5.0",
            TrackingId: "de2ade5e6a0b4c75b44ab079f4f0b0cb",
            TransactionId: "3ddf1ed3414146e684c236b69a477b7d",
            IpAddress: "192.168.1.1",
            CountryCode: "US",
        };

        const parentPayload = {
            Context: { ...metaPayload, CountryCode: "IN" },
            Request: { Type: "All" },
        };

        const groupPayload = {
            ...metaPayload,
            TransactionId: "019473a9-5977-761b-b608-11ab070f281a",
            CountryCode: "IN",
        };

        try {
            const results = await Promise.allSettled([
                fetchTags({ patch: payload }).unwrap(),
                fetchTagsMeta({ patch: metaPayload }).unwrap(),
                fetchParentTags({ patch: parentPayload }).unwrap(),
                fetchGroupsTest({ patch: groupPayload }).unwrap()
            ]);
            const [tagResult, metaResult, parentTagResult, groupResult] = results;

            if (tagResult?.status === "fulfilled" && tagResult?.value?.Context?.Message === "Success") {
                setTagsList(tagResult?.value?.Response);
                setPagination(tagResult?.value?.Response?.Pagination);
            }
            else {
                setTagsList({ Data: [], Pagination: {} });
                console.warn("fetchTags failed", tagResult?.reason || tagResult);
            }

            if (metaResult?.status === "fulfilled") {
                setMetaResponse(metaResult.value?.Response);
            } else {
                console.warn("fetchTagsMeta failed", metaResult?.reason || metaResult);
            }

            if (parentTagResult?.status === "fulfilled") {
                setParentTagResponse(parentTagResult?.value?.Response);
            } else {
                console.warn("fetchParentTags failed", parentTagResult.reason || parentTagResult);
            }

            if (groupResult?.status === "fulfilled") {
                setGroupResponse(groupResult?.value?.Response);
            } else {
                console.warn("fetchGroupsTest failed", groupResult?.reason || groupResult);
            }

            window.scrollTo({ top: 10, behavior: "smooth" });
        } catch (error) {
            console.error("Unexpected error in fetchTagsCall", error);
            setTagsList({ Data: [], Pagination: {} });
        } finally {
            setTagsLoading(false);
        }
    };

    useEffect(() => {
        if (createSuccessfullFlag) {
            setPage(1);
            setCreateSuccessfullFlag(false)
        }
    }, [createSuccessfullFlag]);

    useEffect(() => {
        fetchTagsCall();
    }, [value, page, toggleButtonClicked, selectedTag, tagFilterValues, selectedValue, createSuccessfullFlag]);
    useEffect(() => {
        setTagsLoading(true)
        fetchTagsCall();
    }, [])

    const handleInputChange = async (value: string, event) => {
        setValueInput(value)
        setSearchKey(value)
    }

    function CustomTabPanel(props: Readonly<TabPanelProps>): JSX.Element {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{ p: 0, pt: 0 }}>{children}</Box>}
            </div>
        );
    }

    const handleValues = (values: TagSettings) => {
        setFilterValues(values);
        setTagFilterValues(values)
    }
    const handleArchive = async (id: number) => {
        setEditLoading(true)
        const payload = {
            "Context": {
                "UserAgent": "Mozilla5.0",
                "TrackingId": "41f716e3-fc85-4d36-bf53-64bbd752f520",
                "TransactionId": "41f716e3-fc85-4d36-bf53-64bbd752f520",
                "CountryCode": "IN",
                "IpAddress": "127.0.0.1"
            },
            "Request": {
                "TagId": id
            }
        }
        try {
            const response = await tagArchive({ patch: payload }).unwrap()
            if (response) {
                customEnqueueSnackbar(response?.Context?.Message || response?.Message || 'Success', 'success');
                setEditLoading(false)
                setToggleButtonClicked((prev: any) => !prev);
            }
        } catch (error) {
            console.error(error)
            customEnqueueSnackbar(error?.data?.Context?.Message || error?.data?.Message || 'An error occurred', 'error');
            setEditLoading(false)
        }
    };

    const handleChange = async (id: number, currentStatus: boolean) => {
        setEditLoading(true)
        const payload = {
            "Context": {
                "UserAgent": "Mozilla/5.0",
                "TrackingId": "de2ade5e6a0b4c75b44ab079f4f0b0cb",
                "TransactionId": "3ddf1ed3414146e684c236b69a477b7d",
                "IpAddress": "192.168.1.1",
                "CountryCode": "US"
            },
            "Request": {
                "TagId": id,
                "IsDisabled": !currentStatus
            }
        }
        try {
            const response = await tagsStatus({ patch: payload }).unwrap()

            if (response?.Context?.StatusCode === 1145 || 1143) {
                setToggleButtonClicked((prev: any) => !prev)
                const errorMessage = response?.Context?.Message
                customEnqueueSnackbar(errorMessage ?? 'Success', 'success');
                setEditLoading(false)
            }
        } catch (error) {
            console.error(error)
            const errorMessage = error?.data?.Message || error?.data?.Context?.Message || 'An error occurred';
            customEnqueueSnackbar(errorMessage ?? 'Error occured', 'error');
            setEditLoading(false)
        }
    };

    const rankChange = async (id: number, rank: number) => {
        setEditLoading(true)
        const payload = {
            "Context": {
                "UserAgent": "Mozilla/5.0",
                "TrackingId": "de2ade5e6a0b4c75b44ab079f4f0b0cb",
                "TransactionId": "3ddf1ed3414146e684c236b69a477b7d",
                "IpAddress": "192.168.1.1",
                "CountryCode": "US"
            },
            "Request": {
                "TagId": id,
                "Rank": rank
            }
        }
        try {
            const response = await tagsRank({ patch: payload }).unwrap()
            if (response?.Context?.StatusCode === 1145 || 1143) {
                setToggleButtonClicked((prev: any) => !prev)
                const errorMessage = response?.Context?.Message
                customEnqueueSnackbar(errorMessage ?? 'Success', 'success');
                setEditLoading(false)

            }
        } catch (error) {
            console.error(error)
            const errorMessage = error?.data?.Message || error?.data?.Context?.Message || 'An error occurred';
            customEnqueueSnackbar(errorMessage ?? 'Error occured', 'error');
            setEditLoading(false)
        }
    }

    const handleStatusChange = async (id: number, currentStatus: string) => {
        setEditLoading(true)
        const payload = {
            "Context": {
                "UserAgent": "Mozilla/5.0",
                "TrackingId": "ac38544e-5f95-4c79-bb84-c284e7e3d6a7",
                "TransactionId": "ac38544e-5f95-4c79-bb84-c284e7e3d6a7",
                "CountryCode": "IN",
                "IpAddress": "127.0.0.1"
            },
            "Request": {
                "TagIds": [
                    id
                ],
                "Status": currentStatus
            }
        }
        try {
            const response = await statusChange({ patch: payload }).unwrap()
            if (response?.Context?.StatusCode === 1145 || 1143) {
                setToggleButtonClicked((prev: any) => !prev)
                const errorMessage = response?.Context?.Message
                customEnqueueSnackbar(errorMessage ?? 'Success', 'success');
                setEditLoading(false)
            }
        } catch (error) {
            console.error(error)
            const errorMessage = error?.data?.Message || error?.data?.Context?.Message || 'An error occurred';
            customEnqueueSnackbar(errorMessage ?? 'Error occured', 'error');
            setEditLoading(false)
        }

    }
    console.log("tags", tagsList)
    return (
        <Container>
            <LoadingScreen isLoading={editLoading} />
            <Box className="flex  py-0 px-0 sm:py-2 sm:px-24 flex-col gap-1 w-full ">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        justifyContent: 'space-between',
                        width: '100%',
                        gap: 2,
                        p: {
                            xs: 4,
                            sm: 0,
                        },

                    }}
                >
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb"
                    >
                        {breadcrumbs}
                    </Breadcrumbs>
                    {!isMobileView && (
                        <Box
                            sx={{
                                border: '1px solid #DDDDDD',
                                p: 0.5,
                                width: '8rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderRadius: '0.375rem',

                            }}
                        >
                            <Box className={` ${selectedIndex === 0 && "bg-[#CBE5FF] text-black border border-[#0087FA]"} w-[50%] flex justify-around px-2 py-1 items-center cursor-pointer rounded-md`} onClick={() => { setSelectedIndex(0); dispatch(setView(0)); }}>
                                <img src={ListMenu} alt="menu" className='w-3 h-auto object-contain mr-[2px]' />
                                <Typography variant="body2">{t("list")}</Typography>
                            </Box>
                            <Box className={` ${selectedIndex === 1 && "bg-[#CBE5FF] text-black border border-[#0087FA]"} w-[50%] flex justify-around px-2 py-1 items-center cursor-pointer rounded-md`} onClick={() => { setSelectedIndex(1); dispatch(setView(1)); }}>
                                <img src={GridMenu} alt="menu" className='w-3 h-auto object-contain mr-[4px]' />
                                <Typography variant="body2">{t("grid")}</Typography>
                            </Box>
                        </Box>
                    )}
                    {isMobileView && (
                        <Box
                            sx={{
                                ml: 'auto',
                                border: '1px solid #DDDDDD',
                                p: 0.5,
                                width: '10rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderRadius: '0.375rem',
                            }}
                        >
                            <Box className={` ${selectedIndex === 0 && "bg-[#CBE5FF] text-black border border-[#0087FA]"} w-[50%] flex justify-around px-2 py-1 items-center cursor-pointer rounded-md`} onClick={() => { setSelectedIndex(0) }}>
                                <img src={ListMenu} alt="menu" className='w-3 h-auto object-contain mr-[2px]' />
                                <Typography variant="body2">{t("list")}</Typography>
                            </Box>
                            <Box className={` ${selectedIndex === 1 && "bg-[#CBE5FF] text-black border border-[#0087FA]"} w-[50%] flex justify-around px-2 py-1 items-center cursor-pointer rounded-md`} onClick={() => { setSelectedIndex(1) }}>
                                <img src={GridMenu} alt="menu" className='w-3 h-auto object-contain mr-[4px]' />
                                <Typography variant="body2">{t("grid")}</Typography>
                            </Box>
                        </Box>
                    )}
                </Box>
                {!isMobileView && (
                    <>
                        {value !== 3 && value !== 4 && < Box className="flex justify-between mt-9 ">
                            <Typography sx={{ fontWeight: 600, fontSize: "30px" }} >{t("tags")}</Typography>
                            <Box className="flex flex-row  items-center w-[100%] justify-end gap-3 ">
                                <Box className={`border border-[#DDDDDD] h-[90%] items-center justify-center flex px-3 min-w-4 rounded-md hover:border-black cursor-pointer ${filterEnabled && "bg-[#CBE5FF] text-black border border-[#0087FA]"} `} onClick={() => { setEnableFilterOpen(true); }}><img src={Filter} className="w-4 " alt='filter' /></Box>
                                <FormControl sx={{ minWidth: "14%" }}>
                                    <Select
                                        displayEmpty
                                        value={selectedValue}
                                        IconComponent={CustomArrowIcon}
                                        onChange={(e) => setSelectedValue(e.target.value)}
                                        sx={{
                                            height: 40, color: "#A2A2A2", fontSize: "12px", fontFamily: "Poppins", fontWeight: "400",
                                            '& .MuiSelect-select': {
                                                color: selectedValue ? 'black' : '#BDBDBD'
                                            },

                                            '& .custom-arrow': {
                                                color: '#676767',
                                                transition: 'transform 0.3s ease',
                                            },
                                            '&[aria-expanded="true"] .custom-arrow': {
                                                transform: 'rotate(180deg)',
                                            },

                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#0080FF',
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#ccc',
                                            },
                                        }}
                                        inputProps={{ 'aria-label': 'Sort' }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    '& .MuiMenuItem-root:hover': {
                                                        backgroundColor: '#DDDDDD',
                                                        color: '#000000',
                                                    }
                                                }
                                            },
                                            disableScrollLock: true
                                        }}
                                    >
                                        <MenuItem value="" disabled >
                                            {t("sort")}
                                        </MenuItem>

                                        <MenuItem value="TagName">{t("name")}</MenuItem>
                                        <MenuItem value="CreatedDate">{t("created_date")}</MenuItem>
                                        {value === 0 && <MenuItem value="Rank">{t("rank")}</MenuItem>}
                                    </Select>
                                </FormControl>
                                <Autocomplete
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        // margin: "1rem",
                                        width: { lg: "130px", md: "120px", sm: "100px" },
                                        height: { lg: "30", md: "25px", sm: "20px" },
                                        borderRadius: "6px",
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: "0",
                                            padding: "0",
                                            margin: "0px !important",
                                            paddingRight: '6px', // Add paddingRight here
                                            '&:hover fieldset': {
                                                borderColor: 'black', // <- Hover with black border
                                            },
                                        },
                                        '& .MuiAutocomplete-root': {
                                            margin: "0px !important", // Remove margin from the root
                                        },
                                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                            border: "1px solid #DDDDDD",
                                            borderRadius: "5px"
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused': {
                                            '& fieldset': {
                                                border: '1px solid #000000',  // <-- This removes the border on focus
                                            },
                                        }
                                    }}
                                    isOptionEqualToValue={(option: any, value: any) => option?.label === value?.value}
                                    options={platformSearchData}
                                    // value={selectedCompany}
                                    open={platformSearchData?.length > 0 && valueInput?.length !== 0 && open}
                                    onOpen={() => {
                                        if (inputValue.length >= 3) {
                                            setOpen(true);
                                        }
                                    }}
                                    onClose={() => setOpen(false)}
                                    inputValue={inputValue}
                                    onChange={(event, newValue) => {
                                        setSelectedTag(newValue);
                                        setOpen(false);
                                    }}
                                    onInputChange={(event, newInputValue, reason) => {
                                        if (reason !== "reset") {
                                            setInputValue(newInputValue);
                                            setValueInput(newInputValue)
                                        }
                                        if (newInputValue.length >= 3) {
                                            handleInputChange(newInputValue, event);
                                            setOpen(true);
                                        } else {
                                            setOpen(false);
                                        }
                                    }}
                                    getOptionLabel={(option) => option.Name}
                                    popupIcon={<img
                                        src={searchIcon}
                                        alt="search"
                                        style={{
                                            width: '13px',
                                            height: '13px',
                                            margin: 0,
                                            color: theme?.palette?.customColors?.grey[8],
                                            marginRight: '5px'
                                        }}
                                    />}
                                    renderOption={(props, option) => (
                                        <li {...props} style={{ fontSize: '12px' }}> {/* Decrease font size here */}
                                            {option.Name}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            inputRef={inputRef}
                                            sx={{
                                                width: "100%",
                                                height: 40,
                                                '& .MuiInputBase-root': {
                                                    height: '100%',
                                                    '& .MuiInputBase-input': {
                                                        fontSize: "12px",
                                                        '&:focus': {
                                                            outline: 'none',          // Remove the default outline
                                                            boxShadow: 'none',        // Remove any box shadow on focus
                                                        },
                                                    }
                                                },
                                                '& .MuiAutocomplete-root': {
                                                    margin: 0, // Remove margin from the root
                                                },
                                                '& .MuiAutocomplete-popupIndicator': {
                                                    transition: 'none !important', // Disable transition
                                                    transform: 'none !important', // Prevent rotation
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: '#ccc',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#',
                                                        border: "2px solid #0080FF "
                                                    },
                                                },
                                            }}
                                            placeholder={t('search here')}
                                            size="small"
                                        />
                                    )}
                                />
                                <Button onClick={handleModalOpen} variant='contained' startIcon={<AddCircleOutlineOutlinedIcon />} sx={{
                                    backgroundColor: "#0083FF",
                                    textTransform: "none",
                                    height: "90%",
                                    flexWrap: "nowrap",
                                    minWidth: "18%",
                                    lineHeight: "100%",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    paddingY: 0,
                                    paddingX: "8px",
                                    padding: "2px 8px",
                                    minHeight: "32px"
                                }}>
                                    {t("new_custom_tag")}
                                </Button>
                            </Box>

                        </Box>
                        }
                        {(value === 3 || value === 4) && (
                            <Box className="flex justify-between mt-9 py-1">
                                <Typography sx={{ fontWeight: 600, fontSize: "30px" }}>
                                    {t("tags")}
                                </Typography>
                                <Button
                                    onClick={handleModalOpen}
                                    variant="contained"
                                    startIcon={<AddCircleOutlineOutlinedIcon />}
                                    sx={{
                                        backgroundColor: "#0083FF",
                                        textTransform: "none",
                                        flexWrap: "nowrap",
                                        minWidth: "18.5%",
                                        lineHeight: "100%",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        height: "40px",
                                    }}
                                >
                                    {t("new_custom_tag")}
                                </Button>
                            </Box>
                        )}
                    </>
                )}

                {isMobileView && (
                    <Box className="flex flex-col gap-4 mt-2 px-4 py-1">
                        <Box className="flex flex-row items-center justify-between">
                            <Typography variant='h5'>{t("tags")}</Typography>
                            <Button onClick={handleModalOpen} variant='contained' startIcon={<AddCircleOutlineOutlinedIcon />} sx={{ backgroundColor: "#0083FF", textTransform: "none", height: "100%", flexWrap: "nowrap" }}>
                                {t("new_custom_tag")}
                            </Button>
                        </Box>
                        <Box className="flex flex-row gap-2 w-[100%]">
                            <Box className="flex flex-row">
                                <Autocomplete
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        // margin: "1rem",
                                        width: { lg: "150px", md: "140px", sm: "212px" },
                                        height: { lg: "30", md: "25px", sm: "20px" },
                                        borderRadius: "6px",
                                        '& .MuiOutlinedInput-root': {
                                            margin: "0px !important",
                                            paddingRight: '6px', // Add paddingRight here
                                        },
                                        '& .MuiAutocomplete-root': {
                                            margin: "0px !important", // Remove margin from the root
                                        }
                                    }}
                                    isOptionEqualToValue={(option: any, value: any) => option?.label === value?.value}
                                    options={platformSearchData}
                                    // value={selectedCompany}
                                    open={platformSearchData?.length > 0 && valueInput?.length !== 0 && open}
                                    onOpen={() => setOpen(true)}
                                    onClose={() => setOpen(false)}
                                    inputValue={inputValue}
                                    onChange={(event, newValue) => {
                                        setSelectedTag(newValue);
                                        setOpen(false);
                                    }}
                                    onInputChange={(event, newInputValue, reason) => {
                                        if (reason !== "reset") {
                                            setInputValue(newInputValue);
                                            setValueInput(newInputValue)
                                        }
                                        if (newInputValue.length >= 3) {
                                            handleInputChange(newInputValue, event);
                                            setOpen(true);
                                        }
                                    }}
                                    getOptionLabel={(option: any) => option.Name}
                                    popupIcon={<img
                                        src={searchIcon}
                                        alt="search"
                                        style={{
                                            width: '13px',
                                            height: '13px',
                                            margin: 0,
                                            color: theme?.palette?.customColors?.grey[8],
                                        }}
                                    />}
                                    renderOption={(props, option) => (
                                        <li {...props} style={{ fontSize: '12px' }}> {/* Decrease font size here */}
                                            {option.Name}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            inputRef={inputRef}
                                            sx={{
                                                width: "212px",
                                                height: 40,
                                                '& .MuiInputBase-root': {
                                                    height: '100%',
                                                    '& .MuiInputBase-input': {
                                                        fontSize: "12px"
                                                    },
                                                },
                                                '& .MuiAutocomplete-root': {
                                                    margin: 0, // Remove margin from the root
                                                },
                                                '& .MuiAutocomplete-popupIndicator': {
                                                    transition: 'none !important', // Disable transition
                                                    transform: 'none !important', // Prevent rotation
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: '#ccc',
                                                    },

                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#0080FF',
                                                        border: "1px solid"
                                                    },
                                                },
                                            }}
                                            placeholder={t('search here')}
                                            size="small"
                                        />
                                    )}
                                />
                            </Box>
                            <Box className="flex flex-row gap-2">
                                <Box className={`border border-[#DDDDDD] h-[100%] items-center justify-center flex min-w-10 rounded-md ${filterEnabled ? "bg-[#0083FF] text-white" : ""}`} onClick={() => { setEnableFilterOpen(true); }}><FilterAltOutlinedIcon sx={{ color: "#676767" }} /></Box>
                                <FormControl sx={{ minWidth: 90 }}>
                                    <Select
                                        IconComponent={CustomArrowIcon}
                                        displayEmpty
                                        defaultValue=""
                                        sx={{
                                            '& .custom-arrow': {
                                                color: 'green',
                                                transition: 'transform 0.3s ease',
                                            },
                                            '&[aria-expanded="true"] .custom-arrow': {
                                                transform: 'rotate(180deg)',
                                            },
                                            height: 40, '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#0080FF',
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#ccc',
                                            },
                                        }}
                                        inputProps={{ 'aria-label': 'Sort' }}
                                        onChange={(e) => setSelectedValue(e.target.value)}
                                    >
                                        <MenuItem value="" disabled>
                                            {t("sort")}
                                        </MenuItem>
                                        <MenuItem value="">{t("Default")}</MenuItem>
                                        <MenuItem value="TagName">{t("name")}</MenuItem>
                                        <MenuItem value="CreatedDate">{t("created_date")}</MenuItem>

                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    </Box>
                )}
                <TagsTabSelector setValue={setValue} value={value} setPage={setPage} tabs={tabs} />
                {tagsLoading && (
                    <Box className="min-h-[200px] flex justify-center items-center">
                        <CircularProgress color="primary" />
                    </Box>
                )}
                {!tagsLoading && tagsList?.Data &&
                    ["all", "predefined", "custom", "draft", "archive"].map((type, index) => (
                        <CustomTabPanel key={index + type} value={value} index={index}>
                            {tagsList.Data.length > 0 ? (
                                <AllTags
                                    setModalOpen={setModalOpen}
                                    handleEditClick={handleEditClick}
                                    tagsList={tagsList.Data}
                                    value={value}
                                    pagination={pagination}
                                    setToggleButtonClicked={setToggleButtonClicked}
                                    onArchive={handleArchive}
                                    onChange={handleChange}
                                    rankChange={rankChange}
                                    handleStatusChange={handleStatusChange}
                                />
                            ) : (
                                <Box className="min-h-[200px] justify-center items-center flex">
                                    <Typography>No Tags Found</Typography>
                                </Box>
                            )}
                        </CustomTabPanel>
                    ))
                }
                <TagCreationModal setValue={setValue} value={value} open={modalOpen} handleModalClose={handleModalClose} metaResponse={metaResponse ?? {}} parentTags={parentTagResponse ?? []} setCreateSuccessfullFlag={setCreateSuccessfullFlag} editTagData={editTagData} />
                <Box className=" flex justify-center mt-6">
                    {tagsList && tagsList?.Data?.length > 0 && <Pagination count={Math.ceil(tagsList?.Pagination?.Total / 10)} page={page} onChange={handlePageChange} sx={{

                        "& .MuiPaginationItem-root.Mui-selected": {
                            backgroundColor: "#0087FA",
                            color: "white",
                        },
                        "& .MuiPaginationItem-previousNext": {
                            color: "#0087FA",
                        },
                        "& .MuiPaginationItem-previousNext:hover": {
                            backgroundColor: "#0087FA",
                            color: "white",
                        },
                        "& .MuiPaginationItem-previousNext.Mui-disabled": {
                            color: "#B0B0B0",
                        },
                    }} />}
                </Box>
                <TagModalContent setEnableFilterOpen={setEnableFilterOpen} enableFilterOpen={enableFilterOpen} handleValues={handleValues} initialValues={filterValues} />
            </Box>
        </Container >
    )
}

export default Tags
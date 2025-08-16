import React, { useEffect, useState } from 'react'
import { IconButton, Typography, Box, Paper, InputAdornment, CircularProgress, TextField } from '@mui/material'
import { ListComponent } from '../../components';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useFetchRoleByIdMutation, useRolesMutation } from '../../store/musafirRolesApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import LoadingScreen from '../../components/core-module/loading-screen/LoadingScreen';
import useDebounce from '../../utility/hooks/useDebounce';
import { enqueueSnackbar } from 'notistack';


/**
 * The User component is a React functional component that renders a user interface
 * for displaying and selecting user information. It features responsive design 
 * adjustments with event listeners that toggle display states based on screen width.
 * It includes a list of users and a detailed view of the selected user's information.
 * 
 * State Variables:
 * - selectedIndex: Determines the currently selected user's index.
 * - selectedIndexList: Indicates the current list index.
 * - information: Holds the data of the selected user.
 * - display: Controls the visibility of the user details view.
 * - page: Manages the current page number for pagination.
 * - pageSizeNumber: Stores the number of items per page.
 * 
 * Hooks:
 * - useEffect: Sets up a window resize listener to handle responsive display toggling.
 * - useTranslation: Provides translation capabilities for localized strings.
 * 
 * Methods:
 * - handleClick: Updates selected user information and toggles the display based on screen size.
 * - handlePagination: Updates pagination state based on user interaction.
 * 
 * Sub-components:
 * - List: Renders a button for each user, displaying their name and email, and triggers selection.
 */
const Roles: React.FC = (): JSX.Element => {

    const { t } = useTranslation()
    const [selectedIndex, setSelectedIndex] = useState<number>();
    const [selectedIndexList, setSelectedIndexList] = useState<number>();
    const [information, setInformation] = useState<any>()
    const [display, setDisplay] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [pageSizeNumber, setPageSizeNumber] = useState<number>(5)
    const rolesData = useSelector((state: RootState) => state?.rolesSlice?.roleinfo?.Response?.Roles);
    const totalCount = useSelector((state: RootState) => state?.rolesSlice?.roleinfo?.Response?.Pagination?.TotalCount);
    const [roles, { isLoading }] = useRolesMutation()
    const [fetchRoleById] =useFetchRoleByIdMutation();
     const [searchTerm, setSearchTerm] = useState("");
     const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const init = async (searchValue: string) => {
        const payload = {
            "Context": {
                "UserAgent": "string",
                "TrackingId": "f6744ff0-a976-4165-8223-0f5cfe5a034b",
                "TransactionId": "10146f40-1ff0-45ab-bbde-c5f385b3542e",
                "CountryCode": "IN",
                "IpAddress": " 192.168.10.180"
            },
            "Request": {
                "PageNumber": page,
                "PageSize": pageSizeNumber,
                "SearchTerm": searchValue,
                "SortField": "Name",
                "SortDescending": false
            }
        }
        try {
            const response = await roles(payload).unwrap();
            if (response?.Context?.StatusCode == 1) {
                // setRolesData(response.data?.roles || []);
            }
            else{
                if (response?.Context?.StatusCode == '0') {
                                    enqueueSnackbar(t('fail'), {
                                      variant: 'error',
                                      anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                      }
                                    })
                                  }

            }
        } catch (error: any) {

        }
    }


      useEffect(() => {
        setInformation("");
        if (debouncedSearchTerm.length >= 3) {
            init(debouncedSearchTerm);
        } else if (debouncedSearchTerm.length === 0) {
            init("");
        }
      }, [debouncedSearchTerm,page, pageSizeNumber]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setDisplay(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    /**
     * Handles user selection by updating the selected user's index and information
     * and displaying the user details view based on screen size.
     * 
     * @param {number} index The index of the selected user.
     * @param {MenuItem} item The details of the selected user.
     */

    const handleClick = async (index: number, item: any) => {
        try {
            const response =  await fetchRoleById(item?.Id).unwrap();
            if (response?.Context?.StatusCode == 1) {
                setSelectedIndex(1)
                setSelectedIndexList(index)
                setInformation(item)
                if (window.innerWidth <= 768) { setDisplay(true) }
            }
            else{
                if (response?.Context?.StatusCode == '0') {
                                    enqueueSnackbar(t('fail'), {
                                      variant: 'error',
                                      anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                      }
                                    })
                                  }

            }
            
        } catch (error) {
            
        }
    }

    /**
     * Handles pagination by updating the page number and page size state.
     * 
     * @param {number} pageNumber The page number to navigate to.
     * @param {number} pageSize The number of items to display per page.
     */
    const handlePagination = (pageNumber: number, pageSize: number) => {
        setPage(pageNumber)
        setPageSizeNumber(pageSize)
        if (page !== pageNumber) {
            setInformation("");
            setSelectedIndexList(-1)
          }
    }
      // Handle search input change  
      const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setPage(1);
      };
    /**
     * Renders a list item as a button with user information such as name and email.
     * Highlights the button if the item is selected.
     * 
     * Props:
     * - item: The user data to display, including `name` and `email`.
     * - index: The index of the item in the list.
     * 
     * The component uses an Avatar to display the initial of the user's name and
     * utilizes Typography for displaying the name and email information.
     * 
     * Clicking the button triggers a selection handler.
     */

    const List: React.FC = ({ item, index }: any): JSX.Element => {
        return (
            <button
                onClick={() => handleClick(index, item)}
                className={`px-4 py-3 flex w-full ${selectedIndexList === index ? "bg-[#ceebff]" : ""}  cursor-pointer font-sans flex-row `}
            >

                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", marginLeft: "5px" }}>
                    <Typography sx={{ fontSize: "14px" }} >{item?.Name}</Typography>
                </Box>
            </button >

        )
    }

    return (
        <Box className="overflow-hidden  flex h-[90vh]">
            <LoadingScreen isLoading={isLoading} />
            <Box>
                {display && (
                    <IconButton
                        sx={{
                            border: '1px solid black',
                            color: 'black',
                            margin: '5px',
                        }}
                        onClick={() => setDisplay(false)}
                    >
                        <ArrowBackIcon sx={{ fontSize: '15px' }} />
                    </IconButton>
                )}
            </Box>
            <Box className="container flex-col md:flex-row flex">
                <Box className={`flex shadow-md ${display ? "hidden" : "flex"}`} sx={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
                    <Box sx={{ width: "100%", padding: "10px", marginTop: "10px" }}>
                        <TextField
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearchChange} 
                            fullWidth
                            size="small"
                            placeholder={t('search_role')}
                            InputProps={{
                                endAdornment: isLoading ? (
                                    <InputAdornment position="end">
                                        <CircularProgress size={20} />
                                    </InputAdornment>
                                ) : null,
                            }}
                        />
                    </Box>
                    <Box className="w-full">
                        <ListComponent data={rolesData} onChange={handlePagination} totalCount={totalCount} page={page} setPage={setPage} pageSizeNumber={pageSizeNumber} setPageSizeNumber={setPageSizeNumber} >
                            <List />
                        </ListComponent>
                    </Box>
                </Box>

                <Box
                    className={`md:flex flex-col py-7 md:px-7 px-0 sm:w-full custom-scrollbar flex ${display ? 'flex' : 'hidden'}`}
                >
                    {selectedIndex === 1 && information  && (
                        <Paper>
                            <Box className="flex items-center justify-center px-4 py-3 border-b-2" sx={{ fontWeight: "600", fontSize: "20px" }}>{t("role_details")}</Box>
                            <Box className="flex flex-col" sx={{ mb: 4, padding: "10px" }}>
                                <Typography >{t("role_name")}:</Typography>
                                <Typography sx={{ fontWeight: "600" }}>{information?.Name}</Typography>
                            </Box>
                            <Box className="flex flex-col" sx={{ mb: 4, padding: "10px" }}>
                                <Typography>{t("role_description")}:</Typography>
                                <Typography sx={{ fontWeight: "600" }}>{information?.Description}</Typography>
                            </Box>
                            <Box className="flex flex-col" sx={{ mb: 4, padding: "10px" }}>
                                <Typography>{t("role_source_type")}:</Typography>
                                <Typography sx={{ fontWeight: "600" }}>{information?.SourceType}</Typography>
                            </Box>
                            <Box className="flex flex-col" sx={{ mb: 4, padding: "10px" }}>
                                <Typography>{t("role_scope")}:</Typography>
                                <Typography sx={{ fontWeight: "600" }}>{information?.Scope}</Typography>
                            </Box>
                        </Paper>

                    )}
                </Box>
            </Box>``
        </Box>
    )
}

export default Roles;
import React, { useCallback, useEffect, useState } from 'react'
import { IconButton, Typography, Box, Avatar, useMediaQuery, Button } from '@mui/material'
import { ListComponent } from '../../../components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useFetchUsersMutation } from '../../../store/musafirUserApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import useSearch from '../../../utility/hooks/useSearch';
import UpdateUser from '../update-user/UpdateUser';
import { enqueueSnackbar } from 'notistack';
import AddUser from '../add-user/AddUser';
import LoadingScreen from '../../../components/core-module/loading-screen/LoadingScreen';
import UserDeleteComponent from '../delete-user/DeleteUser';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utility/constant';
import { useTranslation } from 'react-i18next';


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
const UserList: React.FC = (): JSX.Element => {

    const [selectedIndex, setSelectedIndex] = useState<number>();
    const [selectedIndexList, setSelectedIndexList] = useState<number | null>();
    const [information, setInformation] = useState<any>()
    const [display, setDisplay] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [pageSizeNumber, setPageSizeNumber] = useState<number>(5)
    const { userData, loading } = useSelector((state: RootState) => state.userSlice);
    const totalCount = useSelector((state: RootState) => state?.userSlice?.userData?.pagination?.totalCount);
    const { add, setAdd, setEdit, setEditIcon, showScreen, setShowScreen } = useSearch();
    const [fetchUsers] = useFetchUsersMutation();
    const [filteredData, setFilteredData] = useState<any>([]);
    const navigate = useNavigate();
    const { t } = useTranslation();

    /**
     * Fetches user data from the backend and handles the response.
     * 
     * This function sends a POST request with a predefined payload that includes
     * user ID and pagination details. Upon receiving a successful response, a 
     * success  message is displayed. If the response indicates an error, 
     * an error massage is shown with the status description. In case of any exceptions 
     * during the API call, a generic error  message is displayed.
     */
    const fetchUserData = async () => {
        const payload = {
            userId: 0,
            pagination: {
                pageNumber: page,
                pageSize: pageSizeNumber
            }
        }
        try {
            const response = await fetchUsers({ patch: payload }).unwrap();
            if (response?.status?.statusCode == 'SC00001') {
                filterData(response?.users);
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

    useEffect(() => {
        setShowScreen(false)
        fetchUserData();
        setEditIcon(false);
        setSelectedIndexList(null);
    }, [page, pageSizeNumber])

    useEffect(() => {
        return () => {
            setShowScreen(false)
        }
    }, [])

    const filterData = (users: any) => {
        const filtered = users.filter((user: any) => (user?.userId === information?.userId));
        setFilteredData(filtered);
    };

    const isLargeScreen = useMediaQuery('(min-width:768px)');
    React.useEffect(() => {
        if (isLargeScreen) {
            setDisplay(false);
        } else {
            setDisplay(true);
        }
    }, [isLargeScreen]);
    /**
     * Handles user selection by updating the selected user's index and information
     * and displaying the user details view based on screen size.
     * 
     * @param {number} index The index of the selected user.
     * @param {MenuItem} item The details of the selected user.
     */

    /**
     * Handles user selection by updating the selected user's index and information
     * and displaying the user details view based on screen size.
     * 
     * @param {number} index The index of the selected user.
     * @param {MenuItem} item The details of the selected user.
     */
    const handleClick = useCallback((index: number, item: any) => {
        setSelectedIndex(1)
        setSelectedIndexList(index)
        setInformation(item)
        setAdd(false)
        setEdit(false)
        setEditIcon(true)
        setShowScreen(true)
        navigate(ROUTES.USER);
        if (window.innerWidth <= 768) { setDisplay(true) }
    }, [])

    /**
     * Handles pagination by updating the page number and page size state.
     * 
     * @param {number} pageNumber The page number to navigate to.
     * @param {number} pageSize The number of items to display per page.
     */
    const handlePagination = useCallback((pageNumber: number, pageSize: number) => {
        setPage(pageNumber);
        setPageSizeNumber(pageSize);
    }, []);
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
            <Button
                onClick={() => handleClick(index, item)}
                variant="text"
                sx={{
                    textTransform: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                    textAlign: "left",
                    padding: "12px 16px",
                    backgroundColor: selectedIndexList === index ? "#ceebff" : "white",
                    overflow: "hidden",
                }}
            >
                <Box sx={{ flexShrink: 0 }}>
                    <Avatar sx={{ background: "green", fontSize: "15px" }}>
                        {item?.firstName?.slice(0, 1)}{item?.lastName?.slice(0, 1)}
                    </Avatar>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        marginLeft: "10px",
                        overflow: "hidden",
                        flex: 1,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "14px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "100%",
                            color: "black",
                        }}
                    >
                        {item?.firstName} {item?.lastName}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "12px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "100%",
                            color: "black",
                        }}
                    >
                        {item?.email}
                    </Typography>
                </Box>
            </Button>

        )
    }

    return (
        <Box className="flex h-auto">
            <LoadingScreen isLoading={loading} />
            <Box >
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
            <Box className="container flex-col md:flex-row flex h-auto">
                <Box className={`flex  border-x-[1px] border-gray-100  ${display ? 'hidden' : 'flex'}`}>
                    <Box className="w-full">
                        <ListComponent data={userData.users} totalCount={totalCount} onChange={handlePagination} page={page} setPage={setPage} pageSizeNumber={pageSizeNumber} setPageSizeNumber={setPageSizeNumber} >
                            <List />
                        </ListComponent>
                    </Box>
                </Box>

                <Box
                    className={`md:flex flex-col py-7 md:px-7 px-0 sm:w-full custom-scrollbar flex ${display ? 'flex' : 'hidden'}`}
                >
                    {selectedIndex === 1 && !add && (
                        information && showScreen && <UpdateUser data={information}
                            filteredData={filteredData}
                            onUpdateSuccess={fetchUserData} />
                    )}
                    {selectedIndex === 1 && !add && (
                        information && <UserDeleteComponent data={information?.userId}
                            onDeleteSuccess={fetchUserData} />
                    )}
                    {add && showScreen && (
                        <AddUser onAddSuccess={fetchUserData} />
                    )}
                </Box>

            </Box>
        </Box>
    )
}

export default UserList
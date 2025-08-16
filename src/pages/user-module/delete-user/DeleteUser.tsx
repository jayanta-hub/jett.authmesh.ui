import React, { useState } from 'react';
import useSearch from '../../../utility/hooks/useSearch';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { enqueueSnackbar } from 'notistack';
import LoadingScreen from '../../../components/core-module/loading-screen/LoadingScreen';
import { useDeleteUserMutation } from '../../../store/musafirUserApi';

interface DeleteUserProps {
    data: number,
    onDeleteSuccess: () => void
}
/**
 * The UserDeleteComponent is a React functional component that renders a delete confirmation modal.
 * It takes as a prop the ID of the user to be deleted and displays a confirmation dialog
 * with a prompt asking the user if they are sure they want to delete the user.
 * If the user confirms the deletion, the delete confirmation modal is closed
 * and a message is printed to the console with the ID of the user to be deleted.
 * 
 * The component uses the useSearch hook to access the state of the delete confirmation modal
 * and the user ID to be deleted. It also uses the useTranslation hook to access the translations
 * for the text in the modal.
 * 
 * State Variables:
 * - openDeleteModal: Determines whether the delete confirmation modal is open or closed.
 * - selectedIndex: Holds the ID of the user to be deleted.
 * 
 * Methods:
 * - closeDeleteConfirmationModal: Closes the delete confirmation modal and resets the user ID to be deleted.
 * - handleDeleteUser: Handles the deletion of the user if the user confirms the deletion.
 * 
 * Sub-components:
 * - Dialog: Renders the delete confirmation modal.
 * - DialogTitle: Displays the title of the modal.
 * - DialogContent: Displays the content of the modal.
 * - DialogActions: Displays the actions in the modal.
 * - Button: Displays the buttons in the modal.
 */
const UserDeleteComponent: React.FC<DeleteUserProps> = ({ data, onDeleteSuccess }): JSX.Element => {
    const { t } = useTranslation();
    const { deleteUser, setDeleteUser } = useSearch();
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [deleteUsers, {isLoading}] = useDeleteUserMutation();


   
    const deleteUserAPI = async () => {
        const payload = { id: data }; // API call payload
        try {
            const response = await deleteUsers(payload).unwrap(); // API call to delete user

            if (response?.status?.statusCode === 'SC00001') {
                enqueueSnackbar(response?.status?.statusDescription, {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });
                setDeleteUser(!deleteUser)
                onDeleteSuccess(); // Callback function after successful deletion
            } else {
                enqueueSnackbar(response?.status?.statusDescription, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });
            }

            //closeDeleteConfirmationModal(); // Close the modal after handling the API response
        } catch (error: any) {
            enqueueSnackbar(t('something_Wrong'), {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            });
            
            //closeDeleteConfirmationModal(); // Close the modal in case of error
        }
        finally {
            setOpenDeleteModal(false);
        }
    };

    /**
     * Closes the delete confirmation modal and resets the user ID to be deleted.
     * It sets openDeleteModal to false and sets selectedIndex to null.
     */
    const closeDeleteConfirmationModal = (): void => {
        setOpenDeleteModal(false);
        setSelectedIndex(null);
        setDeleteUser(!deleteUser)
    };

    return (
        <>
        <LoadingScreen isLoading={isLoading} />
            <Dialog open={deleteUser} onClose={setDeleteUser}>
                <DialogTitle>{t('confirm_delete')}</DialogTitle>
                <DialogContent>
                    <Typography sx={{ textTransform: 'none' }} >{t('sure_you_want_to_delete?')}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteConfirmationModal} color="primary" sx={{ textTransform: 'none' }} >
                        {t('cancel')}
                    </Button>
                    <Button onClick={deleteUserAPI} color="error" sx={{ textTransform: 'none' }} >
                        {t('delete')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UserDeleteComponent;


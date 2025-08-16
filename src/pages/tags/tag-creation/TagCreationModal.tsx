import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Box, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import CustomDrawer from '../../../components/core-module/custom-drawer/CustomDrawer';
import { theme } from '../../../theme';
import showAlertDialog from '../../../utility/widgets/AlertDialog';
import { useTagsContext } from '../context/TagsContext';
import { TagBasicInfoForm, TagGroupSettingsForm, TagSummaryView, TagValueSettingsForm } from './index';

const TagCreationModal: React.FC<TagCreationModalProps> = ({ open, handleModalClose, metaResponse, parentTags, setCreateSuccessfullFlag, editTagData, setValue, value }) => {
    const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
    const [moveToTableComponent, setMoveToTableComponent] = useState(1)
    const [valueCount, setValueCount] = useState(0)
    const [groupSelected, setGroupSelected] = useState("")
    const { editFlag, setEditFlag, setEditTagOnLastPage } = useTagsContext();

    const handleClose = async () => {
        setEditFlag(false)
        setEditTagOnLastPage(false)
        localStorage.removeItem('formData');
        if (moveToTableComponent === 4) {
            handleModalClose();
            setMoveToTableComponent(1);
            return;
        }
        if (moveToTableComponent === 2 || moveToTableComponent === 3) {
            setCreateSuccessfullFlag(true)
        }
        const userConfirmed = await showAlertDialog("Alert",
            "Are you sure you want to cancel? All unsaved changes will be discarded.");
        if (!userConfirmed) {
            return
        }
        handleModalClose()
        setMoveToTableComponent(1)
        setValue(value)
    }


    return (
        <CustomDrawer isOpen={open} anchor="right">
            <Box sx={{ display: "flex", flexDirection: "column", width: isMobileView ? "100vw" : "70vw", padding: "20px", height: '100vh', }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", cursor: "pointer", marginBottom: "10px" }}>
                    {moveToTableComponent !== 1 ? <ArrowBackIcon sx={{
                        color: "#676767",
                        marginLeft: moveToTableComponent === 2 ? "12px" : "0px",
                    }} onClick={() => {
                        setMoveToTableComponent(moveToTableComponent - 1); if (editFlag) {
                            setEditFlag(true);
                        } else {
                            setEditTagOnLastPage(true);
                        }
                    }} /> : <Box></Box>}
                    <CloseOutlinedIcon onClick={handleClose} />
                </Box>
                {moveToTableComponent === 1 && (
                    <TagBasicInfoForm setMoveToTableComponent={setMoveToTableComponent} editTagData={editTagData?.TagId} />
                )}
                {moveToTableComponent === 2 && (
                    <TagValueSettingsForm setMoveToTableComponent={setMoveToTableComponent} setValueCount={setValueCount} editTagData={editTagData?.TagId} handleClose={handleClose} />
                )}
                {moveToTableComponent === 3 && (
                    <TagGroupSettingsForm setMoveToTableComponent={setMoveToTableComponent} setGroupSelected={setGroupSelected} editTagData={editTagData?.TagId} />
                )}
                {moveToTableComponent === 4 && (
                    <TagSummaryView handleClose={handleClose} valueCount={valueCount} groupSelected={groupSelected} setCreateSuccessfullFlag={setCreateSuccessfullFlag} setMoveToTableComponent={setMoveToTableComponent} editTagData={editTagData?.TagId} />
                )}
            </Box>
        </CustomDrawer>
    )
}

export default TagCreationModal
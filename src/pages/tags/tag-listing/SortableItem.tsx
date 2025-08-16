import { useSortable } from "@dnd-kit/sortable";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Alert, Box, ClickAwayListener, Divider, Grow, IconButton, MenuItem, MenuList, Paper, Popper, Snackbar, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Archive from '../../../assets/images/archive.png';
import Edit from '../../../assets/images/edit.png';
import { useTagsStatusMutation } from "../../../store/musafirTagsApi";
import { capitalizeFirstLetter } from "../../../utility/helper";
import { AntSwitch } from "../../../components/core-module/ant-switch/AntSwitch";


const SortableItem: React.FC<{ tag: Tag; index: number, value: number }> = ({ tag, index, value }) => {
    const [tags, setTags] = useState(tag)
    const tagTypeIndex = useSelector((state: any) => state.tagCreationDataSlice);
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState<boolean>(false)
    const [tagsStatus] = useTagsStatusMutation()
    const [alert, setAlert] = useState('');
    const handleClose = () => {
        setAnchorEl(null);
    };
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: tag.TagId, handle: true });

    const style = {
        transform: CSS?.Transform?.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
    };

    const getTagColor = (color: string) => {
        if (color === 'predefined') return '#D9EDFF';
        if (color === 'custom') return '#FFF8E3';
        if (color === 'drafts') return '#F1F1F1';
    };
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const open = Boolean(anchorEl)
    const handleChange = async (id: string, status: boolean) => {

        if (tags.TagId === id) {
            setTags((prev) => ({
                ...prev,
                IsDisabled: !prev.IsDisabled,
            }));
        }

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
                "IsDisabled": !status
            }
        }
        try {
            const response = await tagsStatus({ patch: payload }).unwrap();
            if (response?.Context?.StatusCode == 1142) {
                setAlert('error');
                const errorMessage = response?.Context?.Message;
                setErrorMessage(errorMessage);
                setOpenSnackbar(true);
            } else {
                setAlert('success');
                setErrorMessage('Operation completed successfully');
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
            const errorMessage = error?.data?.Context?.Message || 'An error occurred';
            setErrorMessage(errorMessage);
            setOpenSnackbar(true);
            setAlert('error');
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div

            style={style}
            className={`${tagTypeIndex === 1 ? "col-span-6" : "col-span-12"} w-full border border-[#EBEBEB] rounded-xl transition-all duration-150 ${isDragging ? 'border-blue-500 shadow-lg' : ''
                }`}
        >
            <Box>
                <Box className="flex justify-between w-[97%] py-4 min-h-[150px]">
                    <Box className="flex ">
                        <Box className="items-start">
                            {value === 0 && <Typography
                                sx={{
                                    display: 'flex',
                                    backgroundColor: '#FFE596',
                                    padding: '7px',
                                    fontSize: '9px',
                                    fontWeight: 600,
                                }}
                            >
                                #{index + 1}
                            </Typography>}
                            <IconButton
                                ref={setNodeRef}
                                {...attributes}
                                {...listeners} sx={{ cursor: 'grab', padding: '4px' }}>
                                <DragIndicatorIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Box className="ml-2 flex flex-col justify-start ">
                            <Typography
                                sx={{ fontSize: '18px', fontWeight: 600, marginBottom: '13px', }}
                            >
                                {tags?.TagName}
                            </Typography>
                            <Typography sx={{ fontSize: '12px', marginBottom: '8px' }}>
                                {t("can_be_used_in")}:{' '}
                                {tags?.Modules?.map((usage, i) => (
                                    <span key={i + usage?.Value} className="text-[#6D6D6D]">
                                        {usage?.Value}
                                        {i !== tags?.Modules?.length - 1 ? ', ' : ''}
                                    </span>
                                ))}
                            </Typography>
                            {tags?.GroupName && (
                                <Typography sx={{ fontSize: '12px', marginBottom: '8px' }}>
                                    {t("group_name")}:
                                    <span className="text-[#6D6D6D]"> {tags?.GroupName}</span>
                                </Typography>
                            )}
                            {tags?.ParentTagName && (
                                <Typography sx={{ fontSize: '12px', marginBottom: '8px' }}>
                                    {t("parent")}: <span className="text-[#6D6D6D]">{tags?.ParentTagName}</span>
                                </Typography>
                            )}
                        </Box>
                    </Box>
                    <Box className="flex items-start justify-center relative">
                        {(value === 0) && < Typography
                            sx={{
                                padding: '8px',
                                backgroundColor: tags?.IsDraft ? "#F1F1F1" : getTagColor(tags?.Category.toLowerCase()),
                                borderRadius: '6px',
                                fontSize: '10px',
                                fontWeight: 400,
                                textAlign: 'center',
                            }}
                        >
                            {tags?.IsDraft ? 'Draft' : capitalizeFirstLetter(tags?.Category)}
                        </Typography>}

                        {tags?.Category?.toLowerCase() === 'predefined' ? (
                            <IconButton sx={{ padding: '5px', marginLeft: '6px' }}>
                                <img src={Edit} alt="edit" className="w-4" />
                            </IconButton>
                        ) : (
                            <Box sx={{ position: 'relative' }}>
                                <IconButton
                                    sx={{ padding: '5px' }}
                                    onPointerDown={(e) => e.stopPropagation()}
                                    onClick={handleClick}
                                >
                                    <MoreVertOutlinedIcon />
                                </IconButton>

                                <Popper
                                    open={open}
                                    anchorEl={anchorEl}
                                    role={undefined}
                                    placement="bottom-start"
                                    transition
                                    disablePortal
                                >
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                                            }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose}>
                                                    <MenuList
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'space-around',
                                                            padding: '10px',
                                                        }}
                                                        autoFocusItem={open}
                                                        id="composition-menu"
                                                        aria-labelledby="composition-button"
                                                    >
                                                        <MenuItem sx={{ display: 'flex', color: '#535353', fontSize: '12px' }}>
                                                            <img src={Edit} alt="edit" className="w-4 object-contain" />
                                                            <Typography sx={{ marginLeft: '7px' }}>Edit</Typography>
                                                        </MenuItem>
                                                        <MenuItem
                                                            onPointerDown={(e) => e.stopPropagation()}
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                color: '#535353',
                                                                fontSize: '12px',
                                                            }}
                                                            onClick={handleClose}
                                                        >
                                                            <img src={Archive} alt="archive" className="w-4 object-contain" />
                                                            <Typography sx={{ marginLeft: '7px' }}>{t("archive")}</Typography>
                                                        </MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </Box>
                        )}
                    </Box>

                </Box>
                <Divider />
                <Box className=" w-[97%] py-4">
                    <Box className="flex justify-between pl-8 items-center pr-1">
                        <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>
                            Tag ID: {tags?.TagId}
                        </Typography>
                        <Tooltip title={tags?.IsDisabled ? "Tag In-Active" : "Tag Active"} arrow>
                            <AntSwitch
                                onChange={() => handleChange(tag?.TagId, tags?.IsDisabled)}
                                checked={!tags?.IsDisabled}
                                inputProps={{ 'aria-label': 'ant design' }}
                            />
                        </Tooltip>
                    </Box>
                </Box>
            </Box >
            {alert && (
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity={alert}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            )}
        </div >
    );
};
export default SortableItem
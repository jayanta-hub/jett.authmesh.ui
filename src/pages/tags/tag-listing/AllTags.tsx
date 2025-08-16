import {
    closestCenter,
    DndContext,
    DragEndEvent,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {
    arrayMove,
    horizontalListSortingStrategy,
    SortableContext,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import {
    Box,
    Button,
    ClickAwayListener,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grow,
    IconButton,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Tooltip,
    Typography,
    useMediaQuery
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Archive from '../../../assets/images/archive.png';
import Edit from '../../../assets/images/edit.png';
import { AntSwitch } from '../../../components/core-module/ant-switch/AntSwitch';
import { capitalizeFirstLetter } from '../../../utility/helper';
import { theme } from '../../../theme';


const SortableItem: React.FC<{ tag: Tag; index: number, value: number, setToggleButtonClicked: any, setModalOpen: (open: boolean) => void, handleEditClick: (Id: string) => void; onChange: () => void; onArchive: () => void; dragOverlay?: boolean }> = ({ tag, index, value, setToggleButtonClicked, setModalOpen, handleEditClick, onArchive, onChange, dragOverlay = false, handleStatusChange }) => {
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [tags, setTags] = useState(tag)
    const tagTypeIndex = useSelector((state: any) => state.tagCreationDataSlice?.view);
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [statusChange, setStatusChange] = useState(false)
    const [archiveChange, setArchiveChange] = useState(false)
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
        opacity: isDragging ? 0 : 1,

    };

    const getTagColor = (color: string) => {
        if (color === 'predefined') return '#D9EDFF';
        if (color === 'custom') return '#FFF8E3';
        if (color === 'drafts') return '#F1F1F1';
    };
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl)
    useEffect(() => {
        if (tag !== tags) {
            setTags(tag)
        }
    }, [tags, tag])

    const handleDeleteCancel = () => {
        setDeleteConfirmationOpen(false)
    }

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
                <Box className=" group flex justify-between w-[97%] py-4 min-h-[180px]">
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
                                #{tags?.Rank}
                            </Typography>}
                            {value === 0 && <Box

                                ref={setNodeRef}
                                {...attributes}
                                {...listeners}

                                sx={{
                                    cursor: 'grab', padding: '4px', opacity: 0,
                                    "&:hover": {
                                        opacity: 1,
                                    },
                                }}>
                                <DragIndicatorIcon fontSize="small" />
                            </Box>}

                        </Box>
                        <Box className={`${value === 0 ? "ml-2" : "ml-6"} ml-2 flex flex-col justify-start`}>
                            <Typography
                                sx={{ fontSize: '18px', fontWeight: 600, marginBottom: '13px', }}
                            >
                                {tags?.TagName}
                            </Typography>
                            <Typography sx={{ fontSize: '12px', marginBottom: '8px', color: '#6D6D6D' }}>
                                {t("can_be_used_in")}:{' '}
                                {tags?.Modules?.map((usage, i) => (
                                    <span key={i + usage?.Value} className="text-[#000000]">
                                        {usage?.Value}
                                        {i !== tags?.Modules?.length - 1 ? ', ' : ''}
                                    </span>
                                ))}
                            </Typography>
                            {tags?.GroupName && (
                                <Typography sx={{ fontSize: '12px', marginBottom: '8px', color: '#6D6D6D' }}>
                                    {t("group_name")}:
                                    <span className="text-[#000000]"> {tags?.GroupName}</span>
                                </Typography>
                            )}
                            {tags?.ParentTagName && (
                                <Typography sx={{ fontSize: '12px', marginBottom: '8px', color: '#6D6D6D' }}>
                                    {t("parent")}: <span className="text-[#000000]">{tags?.ParentTagName}</span>
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

                        {tags?.Category?.toLowerCase() === 'predefined' && value !== 3 ? (
                            <IconButton sx={{ padding: '5px', marginLeft: '6px' }} onClick={() => {
                                handleEditClick(tag?.TagId)
                            }}>
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
                                                        <MenuItem
                                                            sx={{ display: 'flex', color: '#535353', fontSize: '12px' }}
                                                            onClick={() => {
                                                                handleEditClick(tag?.TagId)
                                                            }}>
                                                            <img src={Edit} alt="edit" className="w-4 object-contain" />
                                                            <Typography sx={{ marginLeft: '7px' }}>Edit</Typography>
                                                        </MenuItem>
                                                        {value !== 1 && tags?.Category?.toLowerCase() !== 'predefined' && <MenuItem
                                                            onPointerDown={(e) => e.stopPropagation()}
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                color: '#535353',
                                                                fontSize: '12px',
                                                            }}
                                                            onClick={() => { setDeleteConfirmationOpen(true); setArchiveChange(true); setStatusChange(false) }}
                                                        >
                                                            <img src={Archive} alt="archive" className="w-4 object-contain" />
                                                            <Typography sx={{ marginLeft: '7px' }}>{t("archive")}</Typography>
                                                        </MenuItem>}
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
                    <Box className={`flex justify-between ${value === 0 ? 'pl-8' : 'pl-6'}  items-center pr-1`}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>
                            Tag ID: {tags?.TagId}
                        </Typography>
                        <Tooltip title={tags?.Status?.toLowerCase() === 'active' ? "Tag In-Active" : "Tag Active"} arrow>
                            <AntSwitch
                                onChange={() => { setDeleteConfirmationOpen(true); setStatusChange(true); setArchiveChange(false) }}
                                checked={tags?.Status?.toLowerCase() === 'active'}
                                inputProps={{ 'aria-label': 'ant-switch' }}
                            />
                        </Tooltip>
                    </Box>
                </Box>
            </Box >
            <Dialog
                open={deleteConfirmationOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableScrollLock
            >
                {archiveChange && (

                    <><DialogTitle id="alert-dialog-title">
                        Confirm Archive
                    </DialogTitle>
                        <DialogContent>
                            <Typography>
                                Are you sure you want to archive the tag "{tags?.TagName}"?
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDeleteCancel} color="primary" sx={{ textTransform: 'none' }}>
                                Cancel
                            </Button>
                            <Button onClick={() => handleStatusChange(tag?.TagId, "Archived",)} color="error" autoFocus sx={{ textTransform: 'none' }}>
                                Archive
                            </Button>
                        </DialogActions>
                    </>

                )}
                {statusChange &&
                    <> <DialogTitle id="alert-dialog-title">
                        Confirm Action
                    </DialogTitle>
                        <DialogContent>
                            <Typography>
                                Are you sure you want to {tags?.Status?.toLowerCase() === 'active' ? "deactivate" : "activate"} the tag "{tags?.TagName}"?
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDeleteCancel} color="primary" sx={{ textTransform: 'none' }}>
                                Cancel
                            </Button>
                            <Button onClick={() => handleStatusChange(tag?.TagId, tags?.Status?.toLowerCase() === 'active' ? "Inactive" : "Active",)} color="error" autoFocus sx={{ textTransform: 'none' }}>
                                {tags?.Status?.toLowerCase() === 'active' ? "Deactivate" : "Activate"}
                            </Button>
                        </DialogActions>
                    </>}
            </Dialog>
        </div >
    );
};

const AllTags: React.FC<AllTagsProps> = ({ setModalOpen, tagsList, value, pagination, setToggleButtonClicked, handleEditClick, onArchive, onChange, rankChange, handleStatusChange }) => {
    const tagTypeIndex = useSelector((state: any) => state.tagCreationDataSlice?.view);
    const [localTags, setLocalTags] = useState(tagsList);
    const sensors = useSensors(useSensor(PointerSensor));
    const [activeTag, setActiveTag] = useState<Tag | null>(null);
    const { t } = useTranslation();
    const totalPages = Math.ceil(pagination?.Total / pagination?.PageSize);
    const isLastPage = pagination?.PageNumber === totalPages;
    const [lastMovedTagId, setLastMovedTagId] = useState<string | null>(null);
    const [previousTags, setPreviousTags] = useState<Tag[]>([]);
    const [rank, setRank] = useState()
    const [tagId, setTagId] = useState()
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const rank = localTags?.filter((tag) => tag.TagId === over?.id)[0]?.Rank;
            setRank(rank)
            setPreviousTags(localTags);
            const oldIndex = localTags.findIndex((tag) => tag.TagId === active.id);
            const tagId = localTags.find(tag => tag.TagId === event.active.id);

            setTagId(tagId?.TagId)
            const newIndex = localTags.findIndex((tag) => tag.TagId === over?.id);
            const newTags = arrayMove(localTags, oldIndex, newIndex);
            setLastMovedTagId(active.id);
            setLocalTags(newTags);
        }
        setActiveTag(null);
    };

    const handleAddTag = () => setModalOpen(true);
    const handleDragStart = (event: any) => {
        const { active, over } = event;
        const draggedTag = localTags.find(tag => tag.TagId === event.active.id);
        setActiveTag(draggedTag || null);
    };
    const getTagColor = (color: string) => {
        if (color === 'predefined') return '#D9EDFF';
        if (color === 'custom') return '#FFF8E3';
        if (color === 'drafts') return '#F1F1F1';
    };
    const handleConfirmRanking = () => {
        setLastMovedTagId(null);
        setPreviousTags([]);
        rankChange(tagId, rank)
    }
    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
        >
            <SortableContext
                items={localTags.map((tag) => tag.TagId)}
                strategy={horizontalListSortingStrategy}
            >
                <Box className={`grid grid-cols-3 sm:grid-cols-8 md:grid-cols-12 ${tagTypeIndex === 1 ? "gap-8" : "gap-6"} mt-8 p-3 md:p-0`}>
                    {localTags.map((tag, index) => (
                        <>
                            <SortableItem
                                key={tag.TagId}
                                setModalOpen={setModalOpen}
                                handleEditClick={handleEditClick}
                                tag={tag}
                                index={index}
                                value={value}
                                setToggleButtonClicked={setToggleButtonClicked}
                                onArchive={onArchive}
                                onChange={onChange}
                                handleStatusChange={handleStatusChange}
                            />
                            {/* {lastMovedTagId === tag.TagId && (
                                <Box className=" flex space-x-2 z-50">
                                    <Tooltip title="Confirm">
                                        <IconButton
                                            sx={{ border: "1px solid #EBEBEB" }}
                                            onClick={handleConfirmRanking}
                                        >
                                            <CheckIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Cancel">
                                        <IconButton
                                            sx={{ border: "1px solid #EBEBEB" }}
                                            onClick={() => {

                                                setLocalTags(previousTags);
                                                setLastMovedTagId(null);
                                                setPreviousTags([]);

                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            )} */}
                            {lastMovedTagId === tag.TagId && (
                                <Dialog
                                    open={lastMovedTagId === tag.TagId}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    disableScrollLock
                                >
                                    <><DialogTitle id="alert-dialog-title">
                                        Confirm Ranking
                                    </DialogTitle>
                                        <DialogContent>
                                            <Typography>
                                                Are you sure you want to change the Ranking
                                            </Typography>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => {
                                                setLocalTags(previousTags);
                                                setLastMovedTagId(null);
                                                setPreviousTags([]);
                                            }} color="primary" sx={{ textTransform: 'none' }}>
                                                Cancel
                                            </Button>
                                            <Button onClick={handleConfirmRanking} color="error" autoFocus sx={{ textTransform: 'none' }}>
                                                Confirm
                                            </Button>
                                        </DialogActions>
                                    </>
                                </Dialog>
                            )}
                        </ >
                    ))}
                    {isLastPage && (
                        <Box
                            onClick={handleAddTag}
                            className="col-span-6 w-full min-h-[170px] border border-[#EBEBEB] items-center cursor-pointer rounded-xl flex justify-center flex-col"
                        >
                            <AddCircleOutlineOutlinedIcon sx={{ color: '#0087FA' }} />
                            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#0087FA' }}>
                                {t("new_custom_tag")}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </SortableContext>
            <DragOverlay>
                {activeTag ? (
                    <Box
                        className={`${tagTypeIndex === 1 ? "w-[35vw]" : "w-[70vw]"} bg-white  border border-[#EBEBEB] rounded-xl transition-all duration-150
                }`}
                    >
                        <Box>
                            <Box className=" group flex justify-between w-[97%] py-4 min-h-[180px]">
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
                                            #{activeTag?.Rank}
                                        </Typography>}


                                    </Box>
                                    <Box className="ml-2 flex flex-col justify-start ">
                                        <Typography
                                            sx={{ fontSize: '18px', fontWeight: 600, marginBottom: '13px', }}
                                        >
                                            {activeTag?.TagName}
                                        </Typography>
                                        <Typography sx={{ fontSize: '12px', marginBottom: '8px' }}>
                                            {t("can_be_used_in")}:{' '}
                                            {activeTag?.Modules?.map((usage, i) => (
                                                <span key={i + usage?.Value} className="text-[#6D6D6D]">
                                                    {usage?.Value}
                                                    {i !== activeTag?.Modules?.length - 1 ? ', ' : ''}
                                                </span>
                                            ))}
                                        </Typography>
                                        {activeTag?.GroupName && (
                                            <Typography sx={{ fontSize: '12px', marginBottom: '8px' }}>
                                                {t("group_name")}:
                                                <span className="text-[#6D6D6D]"> {activeTag?.GroupName}</span>
                                            </Typography>
                                        )}
                                        {activeTag?.ParentTagName && (
                                            <Typography sx={{ fontSize: '12px', marginBottom: '8px' }}>
                                                {t("parent")}: <span className="text-[#6D6D6D]">{activeTag?.ParentTagName}</span>
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                                <Box className="flex items-start justify-center relative">
                                    {(value === 0) && < Typography
                                        sx={{
                                            padding: '8px',
                                            backgroundColor: activeTag?.IsDraft ? "#F1F1F1" : getTagColor(activeTag?.Category.toLowerCase()),
                                            borderRadius: '6px',
                                            fontSize: '10px',
                                            fontWeight: 400,
                                            textAlign: 'center',
                                        }}
                                    >
                                        {activeTag?.IsDraft ? 'Draft' : capitalizeFirstLetter(activeTag?.Category)}
                                    </Typography>}


                                </Box>

                            </Box>
                            <Divider />
                            <Box className=" w-[97%] py-4">
                                <Box className="flex justify-between pl-8 items-center pr-1">
                                    <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>
                                        Tag ID: {activeTag?.TagId}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box >


                    </Box >
                ) : null}
            </DragOverlay>

        </DndContext >

    );
};

export default React.memo(AllTags);

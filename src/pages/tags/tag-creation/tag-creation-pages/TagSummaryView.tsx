import { Box, Typography, IconButton, Button, Divider, Alert, Snackbar, CircularProgress, useMediaQuery } from '@mui/material'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import editIcon from '../../../../assets/icons/EditIcon.svg'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { capitalizeFirstLetter } from '../../../../utility/helper';
import { useEffect, useState } from 'react';
import { useFetchTagsByIdMutation } from '../../../../store/musafirTagsApi';
import { RootState } from '../../../../store/store';
import { theme } from '../../../../theme';
import { useTagsContext } from '../../context/TagsContext';
import { setValue } from '../../../../store/slice/SelectValueSlice';



const TagSummaryView = ({ handleClose, valueCount, groupSelected, setCreateSuccessfullFlag, setMoveToTableComponent, editTagData }: { handleClose: any, valueCount: number, groupSelected: string, setCreateSuccessfullFlag: (flag: boolean) => void, setMoveToTableComponent: (flag: number) => void, editTagData?: string }) => {
    const { t } = useTranslation();
    const tagData = useSelector((state: any) => state.tagCreationDataSlice);
    const [fetchTagsById] = useFetchTagsByIdMutation()
    const [response, setResponse] = useState({})
    const { basicCreationId } = useSelector((state: RootState) => state.tagsSlice);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState<boolean>(false)
    const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
    const { editFlag, setEditFlag, setEditTagOnLastPage } = useTagsContext();
    const dispatch = useDispatch();
    const handleCloseModal = () => {
     
        handleClose()
        setCreateSuccessfullFlag(true)

    }
    const valueValidation = (values: any) => {
        if (values === 'ListSingleSelect' || values === 'ListMultiSelect' || values === 'FreeText') {
            const formattedValue = values
                .replace(/([a-z])([A-Z])/g, '$1 $2')
                .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
            return formattedValue
        }
        return values
    }
    useEffect(() => {
        fetchTagData()
    }, [])


    const fetchTagData = async () => {
        setLoading(true)
        const payload = {
            "Context": {
                "UserAgent": "Mozilla5.0",
                "TrackingId": "41f716e3-fc85-4d36-bf53-64bbd752f520",
                "TransactionId": "41f716e3-fc85-4d36-bf53-64bbd752f520",
                "CountryCode": "IN",
                "IpAddress": "127.0.0.1"
            },
            "Request": {
                TagId: editFlag
                    ? editTagData
                    : basicCreationId?.Response?.Id
            }
        }

        try {
            const response = await fetchTagsById({ patch: payload }).unwrap();
            setResponse(response?.Response)
            setLoading(false)

        } catch (error) {
            console.error(error)
            setLoading(false)
            const errorMessage = error?.data?.Context?.Message || 'An error occurred';
            setErrorMessage(errorMessage);
            setOpenSnackbar(true);
        }
    }
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    if (loading) {
        return <Box className="flex items-center justify-center h-full ">
            <CircularProgress color="primary" />
        </Box>;
    }

    return (
        <Box>
            {response ? (
                <Box className="mt-2">
                    <Typography sx={{ fontSize: "22px", fontWeight: 600, lineHeight: "100%", color: "#000000" }}>{response?.TagName} </Typography>
                    <Divider sx={{ marginY: "40px", color: "#EBEBEB" }} />
                    <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#0000000" }}>{t("define_tag")}</Typography>
                            <Box sx={{ display: "flex", gap: 2, flexDirection: "row", flexWrap: "wrap" }}>
                                <Typography sx={{ fontSize: "12px", fontWeight: "400", color: "#676767" }}>{t("value_type")}: {valueValidation(response?.TagValueType?.Key)}</Typography>
                                <HorizontalRuleIcon sx={{ transform: 'rotate(90deg)', fontSize: { xs: "10px", sm: "15px" }, marginTop: 0.2, color: "#676767" }} />
                                <Typography sx={{ fontSize: "12px", fontWeight: "400", color: "#676767" }}>{t("tag_is")} {response?.IsMandatory ? "Mandatory" : "Not Mandatory"}</Typography>
                                <HorizontalRuleIcon sx={{ transform: 'rotate(90deg)', fontSize: { xs: "10px", sm: "15px" }, marginTop: 0.2, color: "#676767" }} />
                                <Typography sx={{ fontSize: "12px", fontWeight: "400", color: "#676767" }}>{t("tag_type")} {response?.TagTypes?.map((tag: any) => capitalizeFirstLetter(tag?.Value))}</Typography>
                            </Box>
                        </Box>
                        <IconButton>
                            <Box
                                onClick={() => {
                                    setMoveToTableComponent(1); if (editFlag) {
                                        setEditFlag(true);
                                    } else {
                                        setEditTagOnLastPage(true);
                                    }
                                }}
                                component="img"
                                src={editIcon}
                                alt="Your Image"
                                sx={{ width: "20px", height: "20px" }}
                            />
                        </IconButton>
                    </Box>
                    {response?.Values && <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row", marginTop: 4 }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#0000000" }}>{t("tag_values_(assign values, approves, and parent)")}</Typography>
                            <Typography sx={{ fontSize: "12px", fontWeight: "400", color: "#676767" }}>{response?.Values?.length ?? 0} {response?.Values?.length > 1 ? "values" : "value"} {t("added")}</Typography>
                        </Box>
                        <IconButton>
                            <Box
                                onClick={() => {
                                    setMoveToTableComponent(2); if (editFlag) {
                                        setEditFlag(true);
                                    } else {
                                        setEditTagOnLastPage(true);
                                    }
                                }}
                                component="img"
                                src={editIcon}
                                alt="Your Image"
                                sx={{ width: "20px", height: "20px" }}
                            />
                        </IconButton>
                    </Box>}
                    {response?.GroupId && <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row", marginTop: 4 }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#0000000" }}>{t("assign_group")}</Typography>
                            <Typography sx={{ fontSize: "12px", fontWeight: "400", color: "#676767" }}>{response?.GroupName ?? ""}</Typography>
                        </Box>
                        <IconButton>
                            <Box
                                onClick={() => {
                                    setMoveToTableComponent(3); if (editFlag) {
                                        setEditFlag(true);
                                    } else {
                                        setEditTagOnLastPage(true);
                                    }
                                }}
                                component="img"
                                src={editIcon}
                                alt="Your Image"
                                sx={{ width: "20px", height: "20px" }}
                            />
                        </IconButton>
                    </Box>}
                    {!isMobileView && <Box className="flex justify-end  md:justify-end md:w-[100%] w-full mt-5 ">
                        <Button onClick={handleCloseModal} variant='contained' sx={{ backgroundColor: "#0083FF", textTransform: "none", fontSize: "16px", fontWeight: 500, lineHeight: "100%", padding: "10px", width: "185px", height: "40px" }}>{t("save_&_continue")}</Button>
                    </Box>}
                    {isMobileView && <Box className="flex justify-end  md:justify-end md:w-[100%] w-full mt-5 ">
                        <Button onClick={handleCloseModal} variant='contained' sx={{ backgroundColor: "#0083FF", textTransform: "none", fontSize: "16px", fontWeight: 500, lineHeight: "100%", padding: "10px", width: "50%" }}>{t("save_&_continue")}</Button>
                    </Box>}
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackbar}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    >
                        <Alert onClose={handleCloseSnackbar} severity="error">
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                </Box>
            ) : <Box>Error fetching Data</Box>}
        </Box>
    )
}

export default TagSummaryView


import { Box, Typography, MenuItem, Checkbox, Select, Button, Divider, FormControlLabel, IconButton, useMediaQuery } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { AntSwitch } from '../ant-switch/AntSwitch';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Formik, Form, Field, FieldArray } from 'formik';
import { useState } from 'react';
import { set } from 'date-fns';
import { t } from 'i18next';
import { theme } from '../../../theme';
import CustomDrawer from '../custom-drawer/CustomDrawer';

type TagModalContentProps = {
    setEnableFilterOpen: (open: boolean) => void;
    handleValues: (values: TagSettings) => void;
    initialValues: Partial<TagSettings>;
    enableFilterOpen: boolean;
};
const TagModalContent = ({ setEnableFilterOpen, handleValues, initialValues, enableFilterOpen }: TagModalContentProps) => {
    const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
    const { fetchTagsMetaData } = useSelector((state: RootState) => state.tagsSlice);
    const [tagTypeSwitch, setTagTypeSwitch] = useState(false)
    const [tagValueTypeSwitch, setTagValueTypeSwitch] = useState(false)
    const [moduleSwitch, setModuleSwitch] = useState(false)
    const [parentSwitch, setParentSwitch] = useState(false)
    const [tagTypeSelected, setTagTypeSelected] = useState(false)
    const [tagValueTypeSelected, setTagValueTypeSelected] = useState(false)
    const [moduleSelected, setModuleSelected] = useState(false)
    const [parentSelected, setParentSelected] = useState(false)
    const [tagTypeEnabled, setTagEnabled] = useState(false)
    const [tagValueTypeEnabled, setTagValueTypeEnabled] = useState(false)
    const [moduleEnabled, setModuleEnabled] = useState(false)

    const handleClose = () => {
        setEnableFilterOpen(false)
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

    return (
        <CustomDrawer isOpen={enableFilterOpen} anchor="right">
            <Box sx={{ width: isMobileView ? "100vw" : "70vw", padding: '20px' }}>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        handleValues(values)
                        handleClose()
                    }}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Box >
                                    <Box className="flex justify-between">
                                        <Typography sx={{ fontSize: "15px", fontWeight: "600" }}>
                                            {t("apply_filters")}
                                        </Typography>
                                        <IconButton onClick={handleClose} ><CloseIcon /></IconButton>
                                    </Box>
                                    <Divider sx={{ marginBottom: "20px", marginTop: "5px" }} />
                                    <Box className="flex justify-between">
                                        <Box className="flex items-center">
                                            <Field name="selectAll">
                                                {({ field }: any) => (
                                                    <Checkbox
                                                        {...field}
                                                        checked={field.value || values?.parentTag && tagTypeSelected && tagValueTypeSelected && moduleSelected}
                                                        onChange={(e) => {
                                                            const checked = e.target.checked;
                                                            setFieldValue("selectAll", checked);
                                                            if (checked) {
                                                                setFieldValue("tagTypes", fetchTagsMetaData?.Response?.TagTypes?.map((t: any) => t.Key));
                                                                setFieldValue("tagValueTypes", fetchTagsMetaData?.Response?.TagValueTypes?.map((t: any) => t.Key));
                                                                setFieldValue("modules", fetchTagsMetaData?.Response?.Modules?.map((t: any) => t.Key));
                                                                setFieldValue("parentTag", true);
                                                                setTagTypeSwitch(true);
                                                                setTagValueTypeSwitch(true);
                                                                setModuleSwitch(true);
                                                                setParentSwitch(true);
                                                                setFieldValue("tagTypeSwitch", true);
                                                                setFieldValue("tagValueTypeSwitch", true);
                                                                setFieldValue("moduleSwitch", true);
                                                                setFieldValue("parentSwitch", true);
                                                            } else {
                                                                setFieldValue("tagTypes", []);
                                                                setFieldValue("tagValueTypes", []);
                                                                setFieldValue("modules", []);
                                                                setFieldValue("tagTypeSwitch", false);
                                                                setFieldValue("tagValueTypeSwitch", false);
                                                                setFieldValue("moduleSwitch", false);
                                                                setFieldValue("parentSwitch", false);
                                                                setFieldValue("parentTag", false);
                                                                setTagTypeSwitch(false);
                                                                setTagValueTypeSwitch(false);
                                                                setModuleSwitch(false);
                                                                setParentSwitch(false);
                                                            }
                                                        }}
                                                        sx={{ p: 0, m: 0 }}
                                                    />
                                                )}
                                            </Field>
                                            <Typography sx={{ fontSize: "10px", color: "black", marginLeft: '7px' }}>{t("select_all")}</Typography>
                                        </Box>
                                        <Typography
                                            sx={{ fontSize: "10px", color: "red", cursor: "pointer" }}
                                            onClick={() => {
                                                setFieldValue("tagTypes", []);
                                                setFieldValue("tagValueTypes", []);
                                                setFieldValue("modules", []);
                                                setFieldValue("tagTypeSwitch", false);
                                                setFieldValue("tagValueTypeSwitch", false);
                                                setFieldValue("moduleSwitch", false);
                                                setFieldValue("selectAll", false);
                                                setTagTypeSwitch(false);
                                                setTagValueTypeSwitch(false);
                                                setModuleSwitch(false);
                                                setParentSwitch(false);
                                                setFieldValue("parentTag", false);
                                                setFieldValue("parentSwitch", false);
                                                setTagTypeSelected(false)
                                                setTagValueTypeSelected(false)
                                                setModuleSelected(false)
                                                setParentSelected(false)
                                                setTagEnabled(false)
                                                setTagValueTypeEnabled(false)
                                                setModuleEnabled(false)
                                            }}
                                        >
                                            {t("reset_all")}
                                        </Typography>
                                    </Box >
                                    <Divider sx={{ marginY: "10px" }} />
                                    <Box className="flex flex-col overflow-y-auto h-[90vh] pb-16" sx={{
                                        scrollbarWidth: 'none',
                                        '&::-webkit-scrollbar': {
                                            display: 'none',
                                        },
                                    }}>
                                        <Box className="my-2">
                                            <Box className="flex justify-between">
                                                <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>{t("tag_type")}</Typography>
                                                <Field name="tagTypeSwitch">
                                                    {({ field }: any) => (
                                                        <AntSwitch {...field} checked={field.value || tagTypeEnabled} onChange={(e) => { setFieldValue("tagTypeSwitch", e.target.checked); setTagTypeSwitch(e.target.checked), setFieldValue("tagTypes", []); setTagEnabled(false) }} />
                                                    )}
                                                </Field>
                                            </Box>
                                            <Field name="tagTypeSwitch">
                                                {({ field }: any) => (
                                                    <Box
                                                        className={`transition-all duration-300 ease-in-out overflow-hidden max-h-96 opacity-100`}
                                                    >
                                                        {fetchTagsMetaData?.Response?.TagTypes?.map((type: any, index: number) => (
                                                            <Box className="flex items-center mt-2" key={index}>
                                                                <Field name="tagTypes">
                                                                    {({ field }: any) => (
                                                                        <Checkbox
                                                                            checked={field.value.includes(type.Key)}
                                                                            onChange={(e) => {
                                                                                let updated = e.target.checked
                                                                                    ? [...field.value, type.Key]
                                                                                    : field.value.filter((val: string) => val !== type.Key);

                                                                                setFieldValue("tagTypes", updated);
                                                                                setTagTypeSelected(updated?.length == fetchTagsMetaData?.Response?.TagTypes?.length);
                                                                                setFieldValue("tagTypeSwitch", updated?.length > 0)
                                                                            }}
                                                                            sx={{ p: 0, m: 0 }}
                                                                        />
                                                                    )}
                                                                </Field>
                                                                <Typography sx={{ fontSize: "10px", color: "black", marginLeft: "7px" }}>{type.Value}</Typography>
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                )}
                                            </Field>
                                        </Box>
                                        <Divider />
                                        <Box className="my-2">
                                            <Box className="flex justify-between">
                                                <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>{t("tag_value_type")}</Typography>
                                                <Field name="tagValueTypeSwitch">
                                                    {({ field }: any) => (
                                                        <AntSwitch {...field} checked={field.value || tagValueTypeEnabled} onChange={(e) => { setFieldValue("tagValueTypeSwitch", e.target.checked); setTagValueTypeSwitch(e.target.checked), setFieldValue("tagValueTypes", []); setTagValueTypeEnabled(false) }} />
                                                    )}
                                                </Field>
                                            </Box>
                                            <Field name="tagValueTypeSwitch">
                                                {({ field }: any) => (
                                                    <Box
                                                        className={`transition-all duration-300 ease-in-out overflow-hidden max-h-96 opacity-100' 
                                                    `}
                                                    >{fetchTagsMetaData?.Response?.TagValueTypes?.map((type: any, index: number) => (
                                                        <Box className="flex items-center mt-2" key={index}>
                                                            <Field name="tagValueTypes">
                                                                {({ field }: any) => (
                                                                    <Checkbox
                                                                        checked={field.value.includes(type.Key)}
                                                                        onChange={(e) => {
                                                                            let updated = e.target.checked
                                                                                ? [...field.value, type.Key]
                                                                                : field.value.filter((val: string) => val !== type.Key);

                                                                            setFieldValue("tagValueTypes", updated);
                                                                            setTagValueTypeSelected(updated?.length == fetchTagsMetaData?.Response?.TagValueTypes?.length);
                                                                            setFieldValue("tagValueTypeSwitch", updated?.length > 0);
                                                                        }}
                                                                        sx={{ p: 0, m: 0 }}
                                                                    />
                                                                )}
                                                            </Field>
                                                            <Typography sx={{ fontSize: "10px", color: "black", marginLeft: "7px" }}>{valueValidation(type.Key)}</Typography>
                                                        </Box>
                                                    ))}
                                                    </Box>
                                                )}
                                            </Field>
                                        </Box>
                                        <Divider />
                                        <Box className="my-2">
                                            <Box className="flex justify-between">
                                                <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>{t("modules")}</Typography>
                                                <Field name="moduleSwitch">
                                                    {({ field }: any) => (
                                                        <AntSwitch {...field} checked={field.value || moduleEnabled} onChange={(e) => { setFieldValue("moduleSwitch", e.target.checked); setModuleSwitch(e.target.checked), setFieldValue("modules", []); setModuleEnabled(false) }} />
                                                    )}
                                                </Field>
                                            </Box>
                                            <Field name="moduleSwitch">
                                                {({ field }: any) => (
                                                    <Box
                                                        className={`transition-all duration-300 ease-in-out overflow-hidden max-h-96 opacity-100
                                                    `}
                                                    >
                                                        {fetchTagsMetaData?.Response?.Modules?.map((type: any, index: number) => (
                                                            <Box className="flex items-center mt-2" key={index}>
                                                                <Field name="modules">
                                                                    {({ field }: any) => (
                                                                        <Checkbox
                                                                            checked={field.value.includes(type.Key)}
                                                                            onChange={(e) => {
                                                                                let updated = e.target.checked
                                                                                    ? [...field.value, type.Key]
                                                                                    : field.value.filter((val: string) => val !== type.Key);

                                                                                setFieldValue("modules", updated);
                                                                                setModuleSelected(updated?.length == fetchTagsMetaData?.Response?.Modules?.length);
                                                                                setFieldValue("moduleSwitch", updated?.length > 0);
                                                                            }}
                                                                            sx={{ p: 0, m: 0 }}
                                                                        />
                                                                    )}
                                                                </Field>
                                                                <Typography sx={{ fontSize: "10px", color: "black", marginLeft: '7px' }}>{type.Value}</Typography>
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                )}
                                            </Field>
                                        </Box>
                                        <Divider />
                                        <Box className="mt-2">
                                            <Box className="flex justify-between">
                                                <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>{t("parent_tag")} </Typography>
                                                <Field name="parentSwitch">
                                                    {({ field }: any) => (
                                                        <AntSwitch {...field} checked={field.value} onChange={(e) => {
                                                            setFieldValue("parentSwitch", e.target.checked); setParentSwitch(e.target.checked); setFieldValue("parentTag", e.target.checked);
                                                            setParentSelected(e.target.checked);
                                                        }} />
                                                    )}
                                                </Field>
                                            </Box>
                                        </Box>
                                        <Box className="flex justify-end mt-4 mb-16">
                                            <Button
                                                variant="contained"
                                                type="submit"
                                                sx={{ backgroundColor: "#0083ff", color: "white", fontSize: "12px", textTransform: "none" }}
                                            >
                                                {t("filter")}
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Form>
                    )
                    }
                </Formik >
            </Box>
        </CustomDrawer >
    )
}

export default TagModalContent
import { Autocomplete, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
interface ConfigProps {
    condition: boolean;
    options: any[];
    isFetching: boolean;
    setSearchKey: (val: string) => void;
    isMobileView: boolean;
    isHovered: boolean;
    setIsHovered: (hovered: boolean) => void;
    handleMenuClick: (e: React.MouseEvent<HTMLElement>) => void;
    anchorEl: HTMLElement | null;
    isMenuOpen: boolean;
    handleMenuClose: () => void;
    handleDelete: (id: string) => void;
    EditIcon: string;
    EditIconBlue: string;
    DeleteIcon: string;
}

export default function getUserIdConfig({
    condition,
    options,
    isFetching,
    setSearchKey,
    isMobileView,
    isHovered,
    setIsHovered,
    handleMenuClick,
    anchorEl,
    isMenuOpen,
    handleMenuClose,
    handleDelete,
    EditIcon,
    EditIconBlue,
    DeleteIcon,
    searchKey
}: ConfigProps) {
    const [inputValue, setInputValue] = useState("");
    const { t } = useTranslation();
    return [
        [
            {
                field: 'Name',
                headerName: t("tag_value"),
                flex: 0.5,
                editable: true,
                renderEditCell: (params) => {
                    const { id, field, value: rawValue = "", api } = params;
                    const value = typeof rawValue === "string" ? rawValue : "";

                    const handleChange = (event, newValue) => {
                        api.setEditCellValue({ id, field, value: newValue || "" });
                    };

                    return (
                        <Autocomplete
                            options={
                                inputValue === "" && value.length == 0
                                    ? []
                                    : options
                            }
                            value={value}
                            onChange={handleChange}
                            onInputChange={(event, newInputVal) => {
                                setInputValue(newInputVal);
                                setSearchKey(newInputVal);
                            }}
                            loading={isFetching}
                            isOptionEqualToValue={(option, value) => option === value}
                            sx={{ width: "100%" }}
                            noOptionsText={
                                searchKey.length > 0
                                    ? isFetching
                                        ? 'Loading...'
                                        : 'No matching options'
                                    : 'Search for a User'
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    InputProps={{ ...params.InputProps, disableUnderline: true }}
                                    sx={{ fontSize: "12px", mt: 1 }}
                                />
                            )}
                            ListboxProps={{ style: { fontSize: "12px" } }}
                        />
                    );
                },
                renderCell: (params) => {
                    const value = params?.row?.Name;
                    return value || '';
                },
                valueGetter: (params) => {

                    return params;
                },
            },

            ...(condition
                ? [{
                    field: 'ApproverIds',
                    headerName: t("approvers"),
                    flex: 0.5,
                    editable: condition,
                    renderEditCell: (params) => {
                        const { id, field, value = [], api } = params;
                        const handleChange = (event, newValue) => {
                            api.setEditCellValue({ id, field, value: newValue });
                        };

                        return (
                            <Autocomplete
                                multiple
                                options={
                                    inputValue === ""
                                        ? []
                                        : options
                                }
                                value={value}
                                onChange={handleChange}
                                onInputChange={(event, newInputVal) => {
                                    setInputValue(newInputVal);
                                    setSearchKey(newInputVal);
                                }}
                                loading={isFetching}
                                disableCloseOnSelect
                                isOptionEqualToValue={(option, value) => option === value}
                                sx={{ width: "100%" }}
                                noOptionsText={
                                    searchKey.length > 0
                                        ? isFetching
                                            ? 'Loading...'
                                            : 'No matching options'
                                        : 'Search for an approver'
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        InputProps={{ ...params.InputProps, disableUnderline: true }}
                                        sx={{ fontSize: "12px", mt: 1 }}
                                    />
                                )}
                                renderTags={(selected, getTagProps) =>
                                    selected.map((option, index) => (
                                        <span
                                            key={index}
                                            {...getTagProps({ index })}
                                            style={{
                                                background: "transparent",
                                                border: "none",
                                                color: "black",
                                                fontSize: "12px",
                                            }}
                                        >
                                            {option}
                                        </span>
                                    ))
                                }
                                ListboxProps={{ style: { fontSize: "12px" } }}
                            />
                        );
                    },
                    renderCell: (params) => {

                        const value = params?.row?.ApproverIds || [];
                        return value.length > 0 ? value.join(', ') : '';
                    },
                    valueGetter: (params) => { return params || [] },
                },] : []),
            {
                field: 'actions',
                headerName: '   ',
                width: 80,
                filterable: false,
                sortable: false,
                disableColumnMenu: true,
                renderCell: (params) => {
                    const handleEditClick = () => handleMenuClose();
                    const handleDeleteClick = () => {
                        handleDelete(params.row.id);
                        handleMenuClose();
                    };

                    return (
                        <div className='flex justify-center items-center h-full'>

                            <>

                                <img
                                    src={DeleteIcon}
                                    alt='deleteicon'
                                    onClick={handleDeleteClick}
                                    style={{ cursor: 'pointer', width: '14px', height: '14px', objectFit: 'contain' }}
                                />
                            </>

                        </div>
                    );
                },
            },
        ],
    ];
}

import { Autocomplete, FormControl, MenuItem, Select, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
export default function getFreeTextConfig({
    condition,
    options,
    isFetching,
    setSearchKey,
    handleMenuClick,
    anchorEl,
    isMenuOpen,
    handleMenuClose,
    handleDelete,
    isMobileView,
    setIsHovered,
    isHovered,
    EditIcon,
    EditIconBlue,
    DeleteIcon,
    searchKey
}: Record<string, any>) {
    const { t } = useTranslation();
    const [inputValue, setInputValue] = useState("");
    const regexConditionLabels = [
        { label: "Exactly matches", value: "EXACTLY_MATCHES" },
        { label: "Does not exactly match", value: "DOES_NOT_EXACTLY_MATCH" },
        { label: "Contains", value: "CONTAINS" },
        { label: "Does not contain", value: "DOES_NOT_CONTAIN" },
        { label: "Begins with", value: "BEGINS_WITH" },
        { label: "Does not begin with", value: "DOES_NOT_BEGIN_WITH" },
        { label: "Ends with", value: "ENDS_WITH" },
        { label: "Does not end with", value: "DOES_NOT_END_WITH" },
        { label: "Matches regex", value: "MATCHES_REGEX" },
    ];


    return [

        [
            {
                field: 'MatchType',
                headerName: t("Condition"),
                flex: 0.5,
                editable: true,
                renderEditCell: (params) => {
                    const { id, value, field, api } = params;

                    const handleChange = (event) => {
                        const newValue = event.target.value;
                        api.setEditCellValue({ id, field, value: newValue }, event);
                    };

                    return (
                        <FormControl fullWidth variant="standard" sx={{ mt: 1 }}>
                            <Select
                                value={value || ""}
                                onChange={handleChange}
                                disableUnderline
                                size="small"
                            >
                                {regexConditionLabels.map((opt, idx) => (
                                    <MenuItem key={idx} value={opt.value}>
                                        {opt.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    );
                },
                renderCell: (params) => {
                    const value = params.value || ''
                    const label = regexConditionLabels.find((opt) => opt.value === value)?.label;
                    return label;
                },
            },
            {
                field: 'Name',
                headerName: t("tag_value"),
                flex: 0.5,
                editable: true,
                cellClassName: 'MuiDataGrid-cell--tagValue',
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
                sortable: false,
                disableColumnMenu: true,
                filterable: false,
                renderCell: (params) => {
                    const handleEditClick = () => {
                        handleMenuClose();
                    };

                    const handleDeleteClick = () => {
                        handleDelete(params.row.id);
                        handleMenuClose();
                    };

                    return (
                        <div className='flex justify-center items-center h-full'>
                            {!isMobileView && (
                                <>

                                    <img
                                        src={DeleteIcon}
                                        alt='deleteicon'
                                        onClick={handleDeleteClick}
                                        style={{
                                            cursor: 'pointer',
                                            width: '14px',
                                            height: '14px',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </>
                            )}

                        </div>
                    );
                },
            },
        ]
    ];
}

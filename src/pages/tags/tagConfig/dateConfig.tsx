import { CalendarTodayOutlined } from "@mui/icons-material";
import {
    Autocomplete,
    TextField
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { theme } from "../../../theme";

export default function getDateConfig({
    options,
    setSearchKey,
    isFetching,
    condition,
    handleDelete,
    isMobileView,
    anchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    searchKey,
    DeleteIcon,
}) {
    const { t } = useTranslation();
    const [inputValue, setInputValue] = useState("");

    return [
        [
            {
                field: "Date",
                headerName: t("tag_value"),
                flex: 0.5,
                editable: true,
                renderEditCell: (params) => {
                    const value = params.value || params.row.Date || {
                        FromDate: "",
                        ToDate: "",
                    };
                    const handleChange = (key) => (dateString) => {
                        const parsed = dayjs(dateString, "MM/DD/YYYY", true);
                        if (!parsed.isValid()) return;

                        const year = parsed.year();
                        if (year < 1900 || year > 2100) return;

                        const formatted = parsed.format("MM/DD/YYYY");
                        const newVal = { ...value, [key]: formatted };

                        params.api.setEditCellValue({
                            id: params.id,
                            field: params.field,
                            value: newVal,
                        });
                    };

                    const CustomDateField = ({ label, dateKey }) => {
                        const anchorRef = useRef(null);
                        const selectedDate = value[dateKey];
                        const parsedDate = selectedDate
                            ? dayjs(selectedDate, "MM/DD/YYYY", true)
                            : undefined;

                        const handleDateChange = (date) => {
                            if (!dayjs(date).isValid()) return;

                            const existingDate = value[dateKey]
                                ? dayjs(value[dateKey], "MM/DD/YYYY")
                                : dayjs();

                            const updatedDate = dayjs(date);

                            const finalDate = updatedDate
                                .set("year", updatedDate.year())
                                .set("month", updatedDate.month() ?? existingDate.month())
                                .set("date", updatedDate.date() ?? existingDate.date());

                            const formatted = finalDate.format("MM/DD/YYYY");
                            handleChange(dateKey)(formatted);
                        };

                        return (
                            <div style={{ width: 150 }} ref={anchorRef}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        minDate={dayjs("1900-01-01")}
                                        maxDate={dayjs("2100-12-31")}
                                        format="MMM DD, YYYY"
                                        value={parsedDate}
                                        onChange={handleDateChange}
                                        localeText={{
                                            fieldYearPlaceholder: () => "YYYY",
                                            fieldMonthPlaceholder: () => "MMM",
                                            fieldDayPlaceholder: () => "DD",
                                        }}
                                        slots={{
                                            openPickerIcon: CalendarTodayOutlined,
                                        }}
                                        slotProps={{
                                            textField: {
                                                size: "small",
                                                fullWidth: false,
                                                placeholder: label,
                                                variant: "standard",
                                                InputLabelProps: {
                                                    shrink: true,
                                                },
                                                InputProps: {
                                                    disableUnderline: true,
                                                    sx: {
                                                        fontSize: "12px !important",
                                                        padding: "2px 4px",
                                                        height: "28px",
                                                    },
                                                },
                                                sx: {

                                                    width: 135,
                                                    fontSize: "12px !important",
                                                    "& .MuiInputBase-root": {
                                                        padding: 0,
                                                        height: "28px",
                                                    },
                                                    "& .MuiSvgIcon-root": {
                                                        fontSize: "14px",
                                                    },
                                                },
                                            },
                                            popper: {
                                                anchorEl: () => anchorRef.current,
                                                modifiers: [
                                                    {
                                                        name: "offset",
                                                        options: {
                                                            offset: [0, 4],
                                                        },
                                                    },
                                                ],
                                                placement: "bottom-start",
                                                sx: {
                                                    maxHeight: "310px",
                                                    "& .MuiPickersCalendarHeader-root": {
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        position: "relative",
                                                        padding: "4px 10px",
                                                    },
                                                    "& .MuiPickersCalendarHeader-labelContainer": {
                                                        position: "absolute",
                                                        left: "51%",
                                                        transform: "translateX(-50%)",
                                                        fontWeight: 500,
                                                    },
                                                    "& .MuiPickersArrowSwitcher-root": {
                                                        width: "100%",
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        padding: "0px 6px",
                                                    },
                                                    "& .Mui-selected": {
                                                        backgroundColor:
                                                            `${theme.palette.customColors.blue[10]} !important`,
                                                        color: theme.palette.customColors.white[0],
                                                    },
                                                    "& .MuiPickersCalendarHeader-switchViewButton": {
                                                        padding: 0,
                                                        marginBottom: "4px",
                                                    },
                                                    "& .MuiDayCalendar-header": {
                                                        position: "relative",
                                                        paddingTop: "8px",
                                                        "&::before": {
                                                            content: '""',
                                                            position: "absolute",
                                                            top: 0,
                                                            left: "30px",
                                                            right: "30px",
                                                            height: "0.6px",
                                                            backgroundColor:
                                                                theme.palette.customColors.grey[17],
                                                        },
                                                    },
                                                },
                                            },
                                        }}
                                        sx={{
                                            width: "100%",
                                            "& .MuiPickersInputBase-sectionsContainer": {
                                                width: "unset !important",
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                            </div>
                        );
                    };

                    return (
                        <div
                            style={{
                                display: "flex",
                                gap: 8,
                                alignItems: "center",
                                overflowX: isMobileView ? "auto" : "visible",
                                maxWidth: isMobileView ? "100%" : "unset",
                            }}
                        >
                            <CustomDateField label="From Date" dateKey="FromDate" />
                            <CustomDateField label="To Date" dateKey="ToDate" />
                        </div>
                    );
                },

                renderCell: (params) => {
                    const value = params?.row?.Date || {};

                    const formatDate = (dateStr) => {
                        const parsed = dayjs(dateStr, "MM/DD/YYYY");
                        return parsed.isValid() ? parsed.format("MMM DD, YYYY") : "";
                    };
                    const start = formatDate(value.FromDate);
                    const end = formatDate(value.ToDate);

                    return start && end ? `${start} - ${end}` : start || end || "";
                },
                valueGetter: (params) => {
                    return params
                },
            },

            ...(condition
                ? [
                    {
                        field: "ApproverIds",
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
                                    } value={value}
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
                                                ? "Loading..."
                                                : "No matching options"
                                            : "Search for an approver"
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            InputProps={{
                                                ...params.InputProps,
                                                disableUnderline: true,
                                            }}
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
                                                    color: theme?.palette?.customColors?.black[1],
                                                    fontSize: "12px",
                                                }}
                                            >
                                                {option}
                                            </span>
                                        ))
                                    }
                                    ListboxProps={{
                                        style: {
                                            fontSize: "12px",
                                        },
                                    }}
                                />
                            );
                        },
                        renderCell: (params) => {
                            const value = params?.row?.ApproverIds;
                            return Array.isArray(value) ? value.join(", ") : value || "";
                        },
                        valueGetter: (params) => { return params || [] },
                    },
                ]
                : []),

            {
                field: "actions",
                headerName: " ",
                width: 80,
                filterable: false,
                sortable: false,
                disableColumnMenu: true,
                renderCell: (params) => {
                    const handleDeleteClick = () => {
                        handleDelete(params.row.id);
                        handleMenuClose();
                    };

                    return (
                        <div className="flex justify-center items-center h-full">
                            {!isMobileView && (
                                <img
                                    src={DeleteIcon}
                                    alt="deleteicon"
                                    onClick={handleDeleteClick}
                                    style={{
                                        cursor: "pointer",
                                        width: "14px",
                                        height: "14px",
                                        objectFit: "contain",
                                    }}
                                />
                            )}
                        </div>
                    );
                },
            },
        ],
    ];
}

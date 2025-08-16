import { Autocomplete, FormControl, MenuItem, Select, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";


export default function getListGridConfig({
  condition,
  options,
  isFetching,
  setSearchKey,
  searchKey,
  assignParent,
  responseTagValues,
  isMobileView,
  handleMenuClick,
  anchorEl,
  isMenuOpen,
  handleMenuClose,
  handleDelete,
  DeleteIcon,
  assignedParentMap,
  setAssignedParentMap
}: {
  condition: boolean;
  options: string[];
  isFetching: boolean;
  setSearchKey: (value: string) => void;
  assignParent: boolean;
  responseTagValues: Array<{ Id: number | string; Name: string }>;
  selectedParentIdCheckbox: Array<number | string>;
  selectedParentId: string;
  isMobileView: boolean;
  handleMenuClick: () => void;
  anchorEl: HTMLElement | null;
  isMenuOpen: boolean;
  handleMenuClose: () => void;
  handleDelete: (id: number | string) => void;
  setIsHovered: (value: boolean) => void;
  isHovered: boolean;
  EditIcon: string;
  EditIconBlue: string;
  DeleteIcon: string;
  assignedParentMap: Map<string, string>;
  setAssignedParentMap: (value: Map<string, string>) => void;
}) {

  const [inputValue, setInputValue] = useState("");
  const { t } = useTranslation();
  return [
    [
      {
        field: 'Name',
        headerName: t("tag_value"),
        flex: 0.5,
        editable: true,
        cellClassName: 'MuiDataGrid-cell--tagValue',

      },
      ...(condition
        ? [
          {
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
                          color: "black",
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
              const value = params?.row?.ApproverIds || [];
              return value?.length > 0 ? value?.join(', ') : '';
            },
            valueGetter: (params) => { return params || [] },
          },
        ] : []),
      ...(assignParent
        ? [
          {
            field: 'ParentTagValueId',
            headerName: t('parent'),
            flex: 0.5,
            editable: true,
            valueGetter: (params) => {
              const match = responseTagValues?.find(item => item?.Id === params);

              return match?.Name || ""
            },

            renderEditCell: (params) => {
              const { id, field, value, api } = params;

              const handleChange = (event) => {
                const newValue = event?.target?.value;
                api.setEditCellValue({ id, field, value: newValue }, event);
                setAssignedParentMap(prev => ({
                  ...prev,
                  [id]: newValue
                }));
              };

              return (
                <FormControl fullWidth variant="standard" sx={{ mt: 1 }}>
                  <Select
                    value={value || ''}
                    onChange={handleChange}
                    disableUnderline
                  >
                    {responseTagValues?.length > 0 ? (
                      responseTagValues.map((item: any) => (
                        <MenuItem
                          key={item?.Id}
                          value={item?.Id}
                          sx={{
                            color: 'black',
                            '&:hover': {
                              backgroundColor: '#DCEDFF',
                            },
                          }}
                        >
                          {item?.Name || item?.Location?.Name || item?.Date?.FromDate}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled value="">No options</MenuItem>
                    )}
                  </Select>
                </FormControl>
              );
            },

            renderCell: (params) => {
              const assignedParentId = assignedParentMap[params?.row?.id];
              const entered = responseTagValues?.find(opt => opt?.Id === params?.row?.ParentTagValueId);
              const selected = responseTagValues?.find(opt => opt?.Id === assignedParentId);
              return selected?.Name || entered?.Name;
            }
          }
        ]
        : []),
      {
        field: 'actions',
        headerName: '   ',
        width: 80,
        filterable: false,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => {
          const handleEditClick = () => {
            handleMenuClose();
          };

          const handleDeleteClick = () => {
            handleDelete(params?.row?.id);
            handleMenuClose();
          };


          return (
            <div className='flex justify-center items-center h-full'>
              {!isMobileView && <>

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
                /></>}

            </div>
          );
        },
      }
    ]
  ];
}


import { Autocomplete, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function getLocationConfig({
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
  setIsHovered,
  isHovered,
  EditIcon,
  EditIconBlue,
  DeleteIcon,
  assignedParentMap,
  setAssignedParentMap,
  locationSearch,
  setLocationSearch,
  suggestions,
  isLoading,
  fetchLocationDetails
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
        field: 'Location',
        headerName: t("Location"),
        flex: 0.5,
        editable: true,
        cellClassName: 'MuiDataGrid-cell--tagValue',
        renderEditCell: (params) => {
          const { id, field, value = '', api } = params;

          const handleChange = async (event, newValue) => {
            const enrichedLocation = await fetchLocationDetails(newValue?.placeId);
            api.setEditCellValue({
              id,
              field,
              value: enrichedLocation || '',
            });
          };

          const handleInputChange = (event, newInputValue) => {
            if (newInputValue?.length >= 2) {
              setLocationSearch(newInputValue);
            }
          };


          const selectedOption =
            suggestions.find((s) => s.label === value) || null;

          return (
            <Autocomplete
              options={suggestions}
              getOptionLabel={(option) => option?.label || ''}
              value={selectedOption}
              onChange={handleChange}
              onInputChange={handleInputChange}
              loading={isLoading}
              isOptionEqualToValue={(option, val) =>
                option.placeId === val.placeId
              }
              sx={{ width: '100%' }}
              noOptionsText={isLoading ? 'Loading...' : 'No matching locations'}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                  }}
                  sx={{ fontSize: '12px', mt: 1 }}
                  placeholder="Search location"
                />
              )}
              ListboxProps={{
                style: {
                  fontSize: '12px',
                },
              }}
            />
          );
        },
        renderCell: (params) => {
          const location = params?.value;

          if (!location || typeof location !== 'object') return '';


          const matchedSuggestion = location?.placeId
            ? suggestions.find((s) => s.placeId === location.placeId)
            : null;


          if (matchedSuggestion) {
            return matchedSuggestion.label;
          }

          const name = location?.Name || '';
          const locality = location?.PostalAddress?.Locality || '';
          const postalCode = location?.PostalAddress?.PostalCode || '';
          const address = location?.PostalAddress?.addressLines?.[0] || '';
          const administrativeArea = location?.PostalAddress?.administrativeArea || '';

          return `${name} ${address ? `, ${address}` : ''}${locality ? `, ${locality}` : ''}${administrativeArea ? `, ${administrativeArea}` : ''}${postalCode ? ` - ${postalCode}` : ''}`;
        }




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
        },] : []),
      {
        field: 'actions',
        headerName: '   ',
        width: 80,
        filterrable: false,
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


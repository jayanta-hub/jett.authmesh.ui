import {
    Box,
    Button,
    Checkbox,
    ClickAwayListener,
    InputBase,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper,
    styled,
    Typography
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { FixedSizeList as ListVirtualized } from 'react-window';
import { theme } from '../../../theme';
import useDebounce from '../../../utility/hooks/useDebounce';
import { MultiSelectDropdownProps, OptionType } from '../../../utility/types/multi-select-dropdown/MultiSelectDropdown';
import * as styles from './MultiSelectDropdown.module.css';

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
    label,
    options,
    selectedValues,
    onChange,
    placeholder = 'Select',
    width = '100%'
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [tempSelectedValues, setTempSelectedValues] = useState<OptionType[]>(selectedValues);
    const inputRef = useRef<HTMLDivElement>(null);
    const debouncedSearchText = useDebounce(searchText, 300);
    const BpIcon = styled('span')(({ theme }) => ({
        borderRadius: 3,
        width: 14,
        height: 14,
        boxShadow: `inset 0 0 0 1px ${theme?.palette?.customColors?.grey?.[8]}, inset 0 -1px 0 ${theme?.palette?.customColors?.grey?.[8]}`,
        backgroundColor: theme?.palette?.customColors?.white?.[0],
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        ...theme.applyStyles('dark', {
            boxShadow: '0 0 0 1px rgb(16 22 26 / 40%)',
            backgroundColor: theme?.palette?.customColors?.grey?.[22],
            backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))',
        }),
    }));

    const BpCheckedIcon = styled(BpIcon)({
        backgroundColor: theme?.palette?.customColors?.blue?.[10],
        boxShadow: `inset 0 0 0 1px ${theme?.palette?.customColors?.blue?.[10]}, inset 0 -1px 0 ${theme?.palette?.customColors?.blue?.[10]}`,
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&::before': {
            display: 'block',
            width: 14,
            height: 14,
            backgroundImage:
                "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
                " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
                "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: theme?.palette?.customColors?.blue?.[10],
        },
    });

    const handleOpen = () => {
        if (!isOpen) {
            setTempSelectedValues(selectedValues);
            setIsOpen(true);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setSearchText('');
        setTempSelectedValues(selectedValues);
    };

    const handleSelectAll = () => {
        // Check if all filtered options are already selected
        const allFilteredSelected = filteredOptions.length > 0 && filteredOptions.every(opt => tempSelectedValues.some(sel => sel.id === opt.id));
        if (allFilteredSelected) {
            // Unselect all filtered options
            setTempSelectedValues(prev => prev.filter(item => !filteredOptions.some(opt => opt.id === item.id)));
        } else {
            // Add all filtered options (without duplicates)
            setTempSelectedValues(prev => {
                const filteredNotSelected = filteredOptions.filter(
                    opt => !prev.some(sel => sel.id === opt.id)
                );
                return [...prev, ...filteredNotSelected];
            });
        }
    };

    const handleClear = () => {
        if (isOpen) {
            setTempSelectedValues([]);
        } else {
            onChange([]);
            setSearchText('');
        }
    };

    const handleToggle = (option: OptionType) => {
        const existingIndex = tempSelectedValues.findIndex(item => item.id === option.id);
        if (existingIndex >= 0) {
            setTempSelectedValues(prev => prev.filter(item => item.id !== option.id));
        } else {
            setTempSelectedValues(prev => [...prev, option]);
        }
    };

    const handleSave = () => {
        onChange(tempSelectedValues);
        handleClose();
    };

    const getDisplayText = () => {
        if (selectedValues?.length === 0) return '';
        if (selectedValues?.length <= 2) {
            return selectedValues?.map(v => v.name).join(', ');
        }
        return `${selectedValues?.[0]?.name}, ${selectedValues?.[1]?.name}`;
    };

    const filteredOptions = options?.filter(option =>
        option?.name?.toLowerCase()?.includes(debouncedSearchText?.toLowerCase())
    );

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <Box sx={{ position: 'relative', width }}>
                <Typography variant="subtitle1" sx={{ mb: 0.5, color: theme?.palette?.customColors?.grey?.[18] }} className={(styles as unknown as { multiSelectLabel: string }).multiSelectLabel}>
                    {label}
                </Typography>
                <Box
                    ref={inputRef}
                    onClick={handleOpen}
                    sx={{
                        border: `1px solid ${theme?.palette?.customColors?.white?.[22]}`,
                        borderRadius: isOpen ? '4px 4px 0 0' : '4px',
                        p: '6px 12px',
                        minHeight: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'text',
                        backgroundColor: theme?.palette?.customColors?.white?.[0],
                        '&:hover': {
                            borderColor: theme?.palette?.customColors?.black?.[1]
                        }
                    }}
                >
                    <Box sx={{ width: '100%' }}>
                        {isOpen ? (
                            <InputBase
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder={placeholder}
                                fullWidth
                                sx={{
                                    '& input': {
                                        p: 0,
                                        color: 'text.primary',
                                        '&::placeholder': {
                                            color: theme?.palette?.customColors?.grey?.[10],
                                            fontSize: '12px',
                                            fontWeight: '400',
                                        }
                                    },
                                }}
                            />
                        ) : (
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                p: 0,
                            }}>
                                <Box sx={{
                                    color: selectedValues.length > 0 ? 'text.primary' : 'text.secondary',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    fontSize: '12px',
                                    flex: 1,
                                    mr: 1
                                }}>
                                    {selectedValues?.length === 0 ? (
                                        <span style={{
                                            color: theme?.palette?.customColors?.grey?.[10],
                                            fontSize: '12px',
                                            fontWeight: '400'
                                        }}>
                                            {placeholder}
                                        </span>
                                    ) : (
                                        getDisplayText()
                                    )}
                                </Box>
                                {selectedValues?.length > 2 && (
                                    <Box sx={{
                                        color: theme?.palette?.customColors?.blue?.[22],
                                        flexShrink: 0,
                                        fontSize: '12px'
                                    }}>
                                        {`${selectedValues?.length - 2} more`}
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Box>
                </Box>

                {isOpen && (
                    <Paper
                        elevation={2}
                        sx={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            zIndex: 1000,
                            mt: '-1px',
                            borderRadius: '0 0 4px 4px',
                            borderTop: 'none',
                            backgroundColor: theme?.palette?.customColors?.white?.[0],
                            display: 'flex',
                            flexDirection: 'column',
                            maxHeight: '300px'
                        }}
                    >
                        {/* Fixed Header */}
                        <Box sx={{ borderBottom: `1px solid ${theme?.palette?.customColors?.lightBlue?.[5]}` }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                backgroundColor: theme?.palette?.customColors?.blue?.[11],
                                py: 0,
                                px: 2,
                                borderRadius: 1
                            }}>
                                <Button
                                    size="small"
                                    onClick={handleSelectAll}
                                    sx={{ textTransform: 'none' }}
                                    className={(styles as unknown as { selectAll: string }).selectAll}
                                >
                                    {`Select all ${filteredOptions.length}`}
                                </Button>
                                <Button
                                    size="small"
                                    onClick={handleClear}
                                    sx={{ textTransform: 'none' }}
                                    className={(styles as unknown as { clearAll: string }).clearAll}
                                >
                                    Clear
                                </Button>
                            </Box>
                        </Box>

                        {/* Virtualized Scrollable List */}
                        <Box sx={{
                            flex: 1,
                            maxHeight: '115px',
                            overflow: 'auto',
                            px: '4px',
                            margin: "4px 0px 4px 5px",
                            '& .ReactVirtualized__List': {
                                scrollbarWidth: '4px',
                                scrollbarColor: theme?.palette?.customColors?.lightGray[20],
                            },
                            '& .ReactVirtualized__List::-webkit-scrollbar': {
                                width: '4px',
                            },
                            '& .ReactVirtualized__List::-webkit-scrollbar-thumb': {
                                backgroundColor: theme?.palette?.customColors?.lightGray[20],
                                borderRadius: '4px',
                                height: "53px"
                            },
                            '& .ReactVirtualized__List::-webkit-scrollbar-track': {
                                backgroundColor: 'transparent',
                            },
                        }}>
                            <ListVirtualized
                                className="ReactVirtualized__List"
                                height={Math.min(70, filteredOptions.length * 30)}
                                itemCount={filteredOptions.length}
                                itemSize={20}
                                width="100%"
                            >
                                {({ index, style }) => {
                                    const option = filteredOptions[index];
                                    return (
                                        <div style={style} key={option.id}>
                                            <ListItem disablePadding sx={{ m: 0, p: 0 }}>
                                                <ListItemButton
                                                    role={undefined}
                                                    onClick={() => handleToggle(option)}
                                                    dense
                                                    sx={{ paddingY: '3px' }}
                                                >
                                                    <Checkbox
                                                        sx={{
                                                            py:0,
                                                            paddingX: '9px',
                                                            borderColor: theme?.palette?.customColors?.grey?.[8],
                                                            borderRadius: '10px',
                                                            '&.MuiCheckbox-root': { color: theme?.palette?.customColors?.grey?.[8] },
                                                            '&.Mui-checked': { color: theme?.palette?.customColors?.blue?.[10] },

                                                        }}
                                                        edge="start"
                                                        checkedIcon={<BpCheckedIcon  sx={{ fontSize: '16px' }} />}
                                                        icon={<BpIcon  sx={{ fontSize: '16px' }} />}
                                                        checked={tempSelectedValues.some(item => item.id === option.id)}
                                                        tabIndex={-1}
                                                        disableRipple
                                                    />
                                                    <ListItemText slotProps={{ primary: { sx: { fontSize: '10px', fontWeight: '400' } } }} primary={option.name} />
                                                </ListItemButton>
                                            </ListItem>
                                        </div>
                                    );
                                }}
                            </ListVirtualized>
                            {filteredOptions.length === 0 && (
                                <Box sx={{ p: 2, textAlign: 'center', color: 'text.secondary', fontSize: '12px' }}>
                                    No results found
                                </Box>
                            )}
                        </Box>

                        {/* Fixed Footer */}
                        <Box sx={{ p: 1, pl: '12px', borderTop: `1px solid ${theme?.palette?.customColors?.lightBlue?.[5]}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography className={(styles as unknown as { selectedCount: string }).selectedCount} variant="body2" sx={{ pl: 1 }}>
                                Selected: {tempSelectedValues.length}
                            </Typography>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleSave}
                                sx={{ mr: 2, textTransform: 'none', width: '48px', height: '22px', backgroundColor: theme?.palette?.customColors?.blue?.[22], color: theme?.palette?.customColors?.white?.[0], fontSize: '10px', fontWeight: '600' }}
                            >
                                Save
                            </Button>
                        </Box>
                    </Paper>
                )}
            </Box>
        </ClickAwayListener>
    );
};

export default MultiSelectDropdown; 
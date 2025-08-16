import { Autocomplete, Box, Button, Typography, useMediaQuery, useTheme, styled } from '@mui/material';
import React, { forwardRef } from 'react';
import { ListChildComponentProps, VariableSizeList } from 'react-window';
import { LISTBOX_PADDING } from '../constants/listboxConstants';
const OuterElementContext = React.createContext({});

// Custom checkbox styled components (matching MultiSelectDropdown)
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

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
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
}));
const BpDisableIcon = styled(BpIcon)(({ theme }) => ({
    backgroundColor: theme?.palette?.customColors?.lightWhite?.[7],
    boxShadow: `inset 0 0 0 1px ${theme?.palette?.customColors?.lightWhite?.[7]}, inset 0 -1px 0 ${theme?.palette?.customColors?.lightWhite?.[7]}`,
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
        backgroundColor: theme?.palette?.customColors?.lightWhite?.[7],
    },
}));

// Export the custom checkbox icons for use in DynamicForm
export { BpIcon, BpCheckedIcon, BpDisableIcon };

const OuterElementType = forwardRef<HTMLDivElement>((props, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    // Filter out Material-UI internal props that shouldn't be passed to DOM elements
    const { ownerState, ...filteredProps } = props as any;
    return <div ref={ref} {...filteredProps} {...outerProps} />;
});

export function renderRow(props: ListChildComponentProps) {
    const { data, index, style } = props;
    const item = data[index] as React.ReactElement;
    const newStyle = {
        ...style,
        ...item.props.style,
        top: (style.top as number) + LISTBOX_PADDING,
    };
    return React.cloneElement(item, {
        style: newStyle,
    });
}

export const ListboxComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement> & {
    'data-total-count'?: number;
    'data-selected-count'?: number;
    'data-on-select-all'?: () => void;
    'data-on-clear'?: () => void;
    'data-on-save'?: () => void;
    'data-temp-selected'?: Set<string>;
}>((props, ref) => {
    const {
        children,
        'data-total-count': totalCount = 0,
        'data-selected-count': selectedCount = 0,
        'data-on-select-all': onSelectAll,
        'data-on-clear': onClear,
        'data-on-save': onSave,
        ...other
    } = props;

    const itemData = React.Children.toArray(children);
    const theme = useTheme()
    const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
    const itemCount = itemData.length;
    const itemSize = smUp ? 40 : 44; // Reduced for cleaner look

    const getChildSize = (child: React.ReactNode) => {
        if (React.isValidElement(child) && child.type === Autocomplete) {
            if (child.props.size === 'small') {
                return 32;
            }
        }
        return itemSize;
    };

    const getHeight = () => {
        if (itemCount > 5) {
            return 5 * itemSize; // Show max 5 items before scrolling to leave space for footer
        }
        return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    return (
        <div ref={ref} style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            backgroundColor: 'white',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            width: '100%'
        }}>
            {/* Header */}
            <Box
                onMouseDown={(e) => e.preventDefault()}
                sx={{ borderBottom: `1px solid ${theme?.palette?.customColors?.lightBlue?.[5]}` }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: theme?.palette?.customColors?.blue?.[11],
                    py: 1,
                    px: 2,
                    borderRadius: 1
                }}>
                    <Button
                        size="small"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (onSelectAll) onSelectAll();
                        }}
                        sx={{
                            textTransform: 'none', background: 'none',
                            border: 'none',
                            color: theme?.palette?.customColors?.blue?.[10],
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: 400,
                            textDecoration: 'underline',
                            padding: 0
                        }}
                    >
                        {`Select all ${totalCount}`}
                    </Button>
                    <Button
                        size="small"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (onClear) onClear();
                        }}
                        sx={{
                            textTransform: 'none', background: 'none',
                            border: 'none',
                            color: theme?.palette?.customColors?.blue?.[10],
                            cursor: 'pointer',
                            fontSize: '10px',
                            fontWeight: 400,
                            textDecoration: 'underline',
                            padding: 0
                        }}
                    >
                        Clear
                    </Button>
                </Box>
            </Box>
            {/* List Container */}
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <OuterElementContext.Provider value={other}>
                    <VariableSizeList
                        itemData={itemData}
                        height={Math.min(getHeight() + 2 * LISTBOX_PADDING, 200)}
                        width="100%"
                        key={itemCount}
                        outerElementType={OuterElementType}
                        innerElementType="ul"
                        itemSize={() => itemSize}
                        overscanCount={5}
                        itemCount={itemCount}
                    >
                        {renderRow}
                    </VariableSizeList>
                </OuterElementContext.Provider>
            </div>

            {/* Footer */}
            <Box
                onMouseDown={(e) => e.preventDefault()}
                sx={{ p: 1, pl: '12px', borderTop: `1px solid ${theme?.palette?.customColors?.lightBlue?.[5]}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ pl: 1, fontSize: '12px', fontWeight: 400 }}>
                    Selected: {selectedCount}
                </Typography>
                <Button
                    fullWidth
                    variant="contained"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (onSave) onSave();
                    }}
                    sx={{ mr: 2, textTransform: 'none', width: '48px', height: '22px', backgroundColor: theme?.palette?.customColors?.blue?.[22], color: theme?.palette?.customColors?.white?.[0], fontSize: '12px', fontWeight: 400 }}
                >
                    Save
                </Button>
            </Box>
        </div>
    );
});

ListboxComponent.displayName = 'ListboxComponent';

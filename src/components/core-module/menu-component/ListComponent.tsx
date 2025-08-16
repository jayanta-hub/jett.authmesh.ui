import React, { ReactNode, memo } from 'react';
import { Pagination, Select, MenuItem, SelectChangeEvent, Box, Typography, InputLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Item {
    username: string;
    email: string;
    Id: number;
}

interface ListComponentProps {
    children: ReactNode;
    data: Item[];
    totalCount: number;
    page: number;
    pageSizeNumber: number;
    setPage: (page: number) => void;
    setPageSizeNumber: (pageSizeNumber: number) => void;
    onChange: (page: number, rowsPerPage: number) => void;
}

/**
 * A component that renders a list of items with pagination.
 *
 * @param {{ children: ReactNode, data: Item[], onChange: (page: number, rowsPerPage: number) => void, totalCount: number, page: number, setPage: (page: number) => void, pageSizeNumber: number, setPageSizeNumber: (pageSizeNumber: number) => void }} props
 * @prop {ReactNode} children - The components to render for each item in the list.
 * @prop {Item[]} data - The list of items to display.
 * @prop {(page: number, rowsPerPage: number) => void} onChange - The callback to trigger when the page or rows per page changes.
 * @prop {number} totalCount - The total number of items in the list.
 * @prop {number} page - The current page number.
 * @prop {(page: number) => void} setPage - The callback to set the current page number.
 * @prop {number} pageSizeNumber - The current number of rows per page.
 * @prop {(pageSizeNumber: number) => void} setPageSizeNumber - The callback to set the current number of rows per page.
 *
 * The component renders a list of items and a pagination component that allows the user to navigate through the list.
 * The list is paginated based on the number of rows per page.
 * When the user changes the page or rows per page, the `onChange` callback is triggered with the new page and rows per page.
 * The component also renders a message when there are no items in the list.
 */
const ListComponent: React.FC<ListComponentProps> = memo(({
    children,
    data,
    onChange,
    totalCount,
    page,
    setPage,
    pageSizeNumber,
    setPageSizeNumber,
}) => {
    const { t } = useTranslation();
    // Handle page change
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        onChange(value, pageSizeNumber); // Trigger data fetch/update
    };

    // Handle rows per page change
    const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
        const newPageSize = event.target.value as number;
        setPageSizeNumber(newPageSize);
        setPage(1); // Reset to page 1 to avoid out-of-range page numbers
        onChange(1, newPageSize);
    };

    // Calculate the data for the current page
    // const currentData = data?.slice((page - 1) * pageSizeNumber, page * pageSizeNumber);

    return (
        <Box className="w-full md:w-[40vw] lg:w-[22vw] flex flex-col justify-between overflow-y-auto h-[90vh]">
            {data?.length > 0 ? (
                <>
                    {/* Scrollable content */}
                    <Box className="flex-1 overflow-y-auto">
                        {data.map((item, index) =>
                            React.cloneElement(children as React.ReactElement, {
                                key: item.Id,
                                item,
                                index,
                            })
                        )}
                    </Box>

                    {/* Sticky Pagination Box */}
                    <Box
                        className="flex justify-center items-center px-1 flex-col"
                        sx={{
                            position: 'sticky',
                            bottom: 0,
                            backgroundColor: 'white', // Optional: Matches the background for better UI
                            zIndex: 10,
                            padding: 2,
                            boxShadow: '0px -1px 5px rgba(0, 0, 0, 0.1)', // Optional: Adds subtle shadow
                            marginBottom: 8,
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                            <InputLabel htmlFor="rows-per-page-select" sx={{ marginRight: 1 }}>
                                {t('rows_per_page')}
                            </InputLabel>
                            <Select
                                id="rows-per-page-select"
                                size="small"
                                value={pageSizeNumber}
                                onChange={handleRowsPerPageChange}
                                sx={{ minWidth: 80 }}
                            >
                                {[5, 10, 20].map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Pagination
                            page={page} // Bind Pagination component to the current page
                            onChange={handlePageChange}
                            count={Math.ceil(totalCount / pageSizeNumber) || 1}
                            color="primary"
                            size="small"
                        />
                    </Box>
                </>
            ) : (
                <Box className="flex justify-center items-center mt-2 w-full">
                    <Typography variant="h6">{t('no_Data')}</Typography>
                </Box>
            )}
        </Box>

    );
});

export default ListComponent;

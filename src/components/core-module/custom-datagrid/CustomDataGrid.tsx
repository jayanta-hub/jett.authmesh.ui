import React, { useState, useEffect } from 'react';
import {
    DataGrid,
    GridColDef,
    GridRowModesModel,
    GridRowModes,
    GridRowId,
    GridRowModel,
} from '@mui/x-data-grid';
import { Box, Pagination } from '@mui/material';

interface CustomDataGridProps {
    rows: GridRowModel[];
    columns: GridColDef[];
    rowModesModel: GridRowModesModel;
    setRowModesModel: (model: GridRowModesModel) => void;
    handleRowEditCommit: (id: GridRowId) => void;
    handleRowEdit: (newRow: GridRowModel) => GridRowModel;
    setRows: (rows: GridRowModel[]) => void;
    setAllRows: (rows: GridRowModel[]) => void;
    setSelectedRows: (selectionModel: any) => void;
    setCheckBoxChecked: (value: boolean) => void;
}

const CustomDataGrid: React.FC<CustomDataGridProps> = ({
    rows,
    columns,
    rowModesModel,
    setRowModesModel,
    handleRowEditCommit,
    handleRowEdit,
    setRows,
    setAllRows,
    setSelectedRows,
    setCheckBoxChecked,
    selectedRows
}) => {
    const [page, setPage] = useState(0);
    const [pageSize] = useState(10);
    const pageCount = Math.ceil(rows.length / pageSize);
    useEffect(() => {
        const newPageCount = Math.ceil(rows.length / pageSize);
        if ((page + 1) * pageSize < rows.length) {
            setPage((prevPage) => prevPage + 1);
        }
        if (page >= newPageCount && newPageCount > 0) {
            setPage(newPageCount - 1);
        }
        if (rows.length === 0) {
            setPage(0);
        }
    }, [rows, pageSize]);

    const handlePageChange = (_, value) => {
        setPage(value - 1);
    };

    return (
        columns && (
            <Box>  <DataGrid
                disableColumnSelector
                rows={rows.slice(page * pageSize, page * pageSize + pageSize)}
                columns={columns}
                disableColumnMenu={false}
                rowModesModel={rowModesModel}
                onRowModesModelChange={setRowModesModel}
                onRowEditCommit={handleRowEditCommit}
                onProcessRowUpdate={handleRowEdit}
                checkboxSelection
                selectionModel={selectedRows}
                onRowSelectionModelChange={(newSelectionModel) => {
                    let selectedIds: string[] = [];
                    if (
                        typeof newSelectionModel === "object" &&
                        newSelectionModel?.type &&
                        newSelectionModel?.ids instanceof Set
                    ) {
                        const allRowIds = rows.map((r) => String(r.id));
                        const idsArray = Array.from(newSelectionModel.ids).map(String);

                        if (newSelectionModel.type === "include") {
                            selectedIds = idsArray;
                        } else if (newSelectionModel.type === "exclude") {
                            selectedIds = allRowIds.filter(id => !idsArray.includes(id));
                        }
                    } else if (Array.isArray(newSelectionModel)) {
                        selectedIds = newSelectionModel.map(String);
                    } else if (newSelectionModel instanceof Set) {
                        selectedIds = Array.from(newSelectionModel).map(String);
                    }
                    const numericSelectedIds = selectedIds.map(Number);
                    setSelectedRows(numericSelectedIds);
                    setCheckBoxChecked(numericSelectedIds.length > 0);
                }}
                processRowUpdate={(newRow) => {
                    const updatedFilteredRows = rows.map((row) =>
                        row.id === newRow.id ? newRow : row
                    );
                    setRows(updatedFilteredRows);
                    setAllRows((prevAllRows) =>
                        prevAllRows.map((row) => (row.id === newRow.id ? newRow : row))
                    );
                    return newRow;
                }}
                getRowClassName={(params) => {
                    const mode = rowModesModel[params.id]?.mode;
                    return mode === GridRowModes.Edit ? 'editing-row' : '';
                }}
                experimentalFeatures={{ newEditingApi: true }}
                hideFooterPagination
                hideFooter
                disableRowSelectionOnClick
                sx={{
                    width: '100%',
                    border: 'none',
                    '& .MuiDataGrid-main': {
                        padding: 0,
                    },
                    '& .MuiDataGrid-cell--editing .MuiInputBase-root': {
                        padding: '0 !important',
                        margin: '0 !important',
                        fontSize: 'inherit',
                        height: '100%',
                        lineHeight: 'inherit',
                        backgroundColor: 'transparent !important',
                        boxShadow: 'none !important',
                    },
                    '& .MuiDataGrid-cell--editing .MuiInputBase-input': {
                        padding: '0 !important',
                        margin: '0 !important',
                        height: '100%',
                        boxSizing: 'border-box',
                        fontSize: 'inherit',
                        lineHeight: 'inherit',
                    },
                    borderBottom: "none",
                    '& .MuiDataGrid-columnHeaders': {
                        borderBottom: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                        paddingLeft: 0,
                    },
                    '& .MuiDataGrid-columnHeader': {
                        borderBottom: 'none !important',
                        paddingLeft: 0,
                    },
                    overflow: 'hidden',
                    '.MuiDataGrid-columnSeparator': {
                        display: 'none',
                    },
                    '.MuiDataGrid-columnHeader': {
                        backgroundColor: '#DCEDFF',
                        color: '#000',
                        fontWeight: 'bold',
                        borderBottom: 'none',
                        borderTop: '1px solid #ccc',
                    },
                    '& .MuiDataGrid-cell:not(.MuiDataGrid-cellCheckbox)': {
                        borderBottom: '1px solid #ccc',
                        paddingLeft: '35px',
                    },
                    '& .MuiDataGrid-cell[data-field="actions"]': {
                        borderRight: '1px solid #ccc',
                    },
                    '& .MuiDataGrid-row:last-child .MuiDataGrid-cell[data-field="actions"]': {
                        borderRight: '1px solid #ccc',
                        borderBottomRightRadius: '10px',
                    },
                    '& .MuiDataGrid-row:last-child .MuiDataGrid-cell:nth-of-type(3)': {
                        borderLeft: '1px solid #ccc',
                        borderBottomLeftRadius: '10px',
                    },
                    '& .MuiDataGrid-cell:nth-of-type(3)': {
                        borderLeft: '1px solid #ccc',
                    },
                    '& .MuiDataGrid-columnHeader:nth-of-type(3)': {
                        borderLeft: '1px solid #ccc',
                        borderTopLeftRadius: '10px',
                    },
                    '& .MuiDataGrid-columnHeader[data-field="actions"]': {
                        borderRight: "1px solid #ccc",
                        borderTopRightRadius: "10px"
                    },
                    '& .MuiDataGrid-row:last-child .MuiDataGrid-cell:not(.MuiDataGrid-cellCheckbox)': {
                        borderBottom: '1px solid #ccc',
                    },
                    '& .MuiDataGrid-row.MuiDataGrid-row--editing': {
                        backgroundColor: '#FFF8E3',
                    },
                    '& .MuiDataGrid-row': {
                        borderBottom: 'none',
                    },
                    '.MuiDataGrid-columnHeaderCheckbox': {
                        border: 'none',
                        paddingLeft: '8px',
                        borderLeft: 'none',
                        borderTop: 'none',
                        borderBottom: 'none',
                        backgroundColor: 'white',
                    },
                    '.MuiDataGrid-cellCheckbox': {
                        border: 'none',
                        paddingLeft: '8px',
                        borderLeft: 'white',
                        borderBottom: 'none',
                        borderTop: 'none',
                        backgroundColor: 'white',
                    },
                    '& .MuiDataGrid-columnHeaderCheckbox': {
                        paddingLeft: '0px !important',
                    },
                    '& .MuiDataGrid-cellCheckbox': {
                        paddingLeft: '0px !important', // match header
                    },
                    '& .MuiCheckbox-indeterminate': {
                        color: '#0080FF !important', // Same as unchecked checkbox
                    },
                    '& .MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeaderCheckbox)': {
                        paddingLeft: '35px',
                    },
                    '& .MuiDataGrid-column:first-of-type': {
                        display: 'none',
                    },
                    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
                        outline: 'none !important',
                    },
                    '& .MuiDataGrid-row--editing': {
                        outline: 'none !important',
                        border: 'none !important',
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: 'none',
                    },
                    '& .MuiDataGrid-row.Mui-selected': {
                        backgroundColor: 'white !important',
                    },
                    '& .MuiDataGrid-cell.Mui-selected': {
                        backgroundColor: 'white !important',
                    },
                    '& .MuiCheckbox-root': {
                        color: '#676767',
                    },
                    '& .Mui-checked': {
                        color: '#0080FF !important',
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: 'white !important',
                    },
                    '& .MuiDataGrid-cell:hover': {
                        backgroundColor: 'white !important',
                    },
                    '& .MuiDataGrid-cell--editing': {
                        boxShadow: 'none !important',
                        backgroundColor: 'transparent !important',
                    },
                    '& .MuiInputBase-root': {
                        boxShadow: 'none !important',
                        backgroundColor: 'transparent !important',
                        border: 'none !important',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none !important',
                    },
                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: 'none !important',
                        boxShadow: 'none !important',
                    },
                    '& .MuiDataGrid-columnHeaderCheckbox:focus-within': {
                        outline: 'none !important',
                        boxShadow: 'none !important',
                    },
                    '& .MuiDataGrid-cellCheckbox:focus-within': {
                        outline: 'none !important',
                        boxShadow: 'none !important',
                    },
                    '& .MuiCheckbox-root:focus': {
                        outline: 'none !important',
                        boxShadow: 'none !important',
                    },
                    '& .MuiCheckbox-root:focus-visible': {
                        outline: 'none !important',
                        boxShadow: 'none !important',
                    },
                    '& .MuiDataGrid-columnHeader:focus-within': {
                        outline: 'none !important',
                        boxShadow: 'none !important',
                    },
                }}
            />
                {rows?.length > 10 && <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                    <Pagination count={pageCount} page={page + 1} onChange={handlePageChange} sx={{
                        "& .MuiPaginationItem-root.Mui-selected": {
                            backgroundColor: "#0087FA",
                            color: "white",
                        },
                        "& .MuiPaginationItem-previousNext": {
                            color: "#0087FA",
                        },
                        "& .MuiPaginationItem-previousNext:hover": {
                            backgroundColor: "#0087FA",
                            color: "white",
                        },
                    }} />
                </div>}
            </Box>
        )
    );
};

export default CustomDataGrid;
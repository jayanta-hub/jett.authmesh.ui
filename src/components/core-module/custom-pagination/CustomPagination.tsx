import { Pagination, PaginationItem } from '@mui/material';
import { ChangeEvent } from 'react';
import { theme } from "../../../theme";

const CustomPagination: React.FC<{ page: { Total: number, PageSize: number }, currentPage: number, handlePageChange: (event: ChangeEvent<unknown>, page: number) => void }> = ({ page, currentPage, handlePageChange }) => {

    return (
        <Pagination
            count={Math.ceil(page?.Total / page?.PageSize)}
            page={currentPage}
            color="primary"
            size="small"
            shape="circular"
            siblingCount={1}
            boundaryCount={1}
            hidePrevButton={false}
            hideNextButton={false}
            onChange={handlePageChange}
            renderItem={(item) => {
                // If only one page, disable previous/next buttons
                if (
                    Math.ceil(page?.Total / page?.PageSize) === 1 &&
                    (item.type === 'previous' || item.type === 'next')
                ) {
                    return (
                        <PaginationItem
                            {...item}
                            disabled
                            sx={{
                                color: (theme?.palette?.customColors?.grey?.[8] ?? '#9e9e9e') + " !important",
                                backgroundColor: "transparent !important",
                                "&.Mui-disabled": {
                                    color: (theme?.palette?.customColors?.grey?.[8] ?? '#9e9e9e') + " !important",
                                },
                            }}
                        />
                    );
                }
                return <PaginationItem {...item} />;
            }}
            sx={{
                display: "inline-flex",
                "& .MuiPagination-ul": {
                    justifyContent: "center",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                },
                "& .MuiPaginationItem-root": {
                    lineHeight: "32px",
                    padding: 0,
                    margin: "0 2px",
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                    backgroundColor: theme?.palette?.customColors?.blue[10],
                    color: "white",
                },
                "& .MuiPaginationItem-previousNext": {
                    color: theme?.palette?.customColors?.blue[10],
                },
                "& .MuiPaginationItem-previousNext.Mui-disabled": {
                    color: theme?.palette?.customColors?.grey[8],
                },
                "& .MuiPaginationItem-page": {
                    color: theme?.palette?.customColors?.grey[25],
                    fontWeight: 400,
                },
            }}
        />
    )
}

export default CustomPagination
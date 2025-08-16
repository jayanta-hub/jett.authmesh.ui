import { useTranslation } from "react-i18next";

export default function getCheckboxConfig({
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
}: Record<string, any>) {
    const { t } = useTranslation();
    const regexConditionLabels = [
        { label: "Exact Match" },
        { label: "Does not Match" },
        { label: "Contains" },
        { label: "Does not contain" },
        { label: "Begins with" },
        { label: "Does not begin with" },
        { label: "Ends with" },
        { label: "Does not end with" },
    ];

    return [
        [
            {
                field: 'Name',
                headerName: t("tag_value"),
                flex: 0.5,
                editable: true,
                cellClassName: 'MuiDataGrid-cell--tagValue',
            },
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

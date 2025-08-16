import { Breadcrumbs, Typography, useMediaQuery } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useTranslation } from 'react-i18next';
import { theme } from "../../../../theme";

const CustomBreadcrumbs = ({ breadcrumbData }: { breadcrumbData: string[] }) => {
    const { t } = useTranslation();
    const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <>
            <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />} sx={{
                ".MuiBreadcrumbs-separator": {
                    margin: 0,
                }
            }}>
                {
                    breadcrumbData.map((text: string) => (
                        <Typography key={text} sx={{
                            color: text==='travel_policy'?theme.palette.customColors?.black[1]:'text.secondary', fontWeight: 400,
                            fontSize: isMobileView ? "10px" : "12px",
                            fontStyle: 'Poppins'
                        }}>{t(text)}</Typography>
                    ))
                }
            </Breadcrumbs>

        </>
    )
}

export default CustomBreadcrumbs
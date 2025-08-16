import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const TypographyWrapper = ({ header, subHeader }: { header: string, subHeader: string }) => {
    const { t } = useTranslation()
    return (
        <Box className="w-[100%] md:w-[55%]">
            <Typography sx={{ fontWeight: 500, fontSize: {xs:"12px",md:'14px'}, marginBottom: '5px' }}>
                {t(header)}
            </Typography>
            <Typography sx={{ fontSize: {xs:"10px",md:'12px'}, fontWeight: 400, color: '#676767' }}>
                {t(subHeader)}
            </Typography>
        </Box>
    )
}

export default TypographyWrapper
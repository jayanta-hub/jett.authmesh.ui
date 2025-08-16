import { Box, Grid2, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const PerformanceSection = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        backgroundColor: "#f9f9ff",
        borderRadius: { xs: 0, sm: "20px" },
        padding: { xs: 3, sm: "40px" },
        maxWidth: "100%",
        mt: { xs: 3, sm: 8 },
        mb: { xs: '3.5rem', md: 'unset' }
      }}
    >
      <Grid2 container spacing={3} alignItems="center">
        {/* Left Section */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#7134FF" }}>
            musafir<span style={{ color: "#ff9800" }}>biz</span>
          </Typography>
          <Typography variant="h5" fontWeight="600" sx={{ mt: 1, fontSize: "26px" }}>
            {t('performance_section_title')}
          </Typography>
        </Grid2>

        {/* Right Section - Statistics */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Grid2 container spacing={4}>
            {[
              { percentage: "50%", text: "Lorem ipsum is simply dummy text of the printing and typesetting industry." },
              { percentage: "20%", text: "Lorem ipsum is simply dummy text of the printing and typesetting industry." },
              { percentage: "15%", text: "Lorem ipsum is simply dummy text of the printing and typesetting industry." },
            ].map((item, index) => (
              <Grid2 size={{ xs: 12, sm: 4 }} key={index}>
                <Typography variant="h4" fontWeight="600" sx={{ fontSize: "35px" }}>
                  {item.percentage}
                </Typography>
                <Typography variant="body2" sx={{ color: "gray", fontSize: "12px" }}>
                  {item.text}
                </Typography>
              </Grid2>
            ))}
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default PerformanceSection;

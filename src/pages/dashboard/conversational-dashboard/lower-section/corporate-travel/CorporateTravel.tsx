import { Box, Card, CardContent, Grid2, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SeamlessTravel from "../../../../../assets/images/semalesstravel.svg";

export default function CorporateTravel() {
  const { t } = useTranslation();
  const features = [
    { title: "Heading 1", desc: "Enjoy exclusive flight deals with easy booking, cost savings.", color: "#E6F8F3" },
    { title: "Heading 2", desc: "Corporate travel made easy with booking, cost control, and 24/7 support.", color: "#FBE9EB" },
    { title: "Heading 3", desc: "Corporate travel made easy with booking, cost control, and 24/7 support.", color: "#FFF2E7" },
    { title: "Heading 4", desc: "Corporate travel made easy with booking, cost control, and 24/7 support.", color: "#E7F6F8" },
  ];

  return (
    <Grid2 container spacing={4} sx={{ mt: 8, p: { xs: 3, md: 0 } }} alignItems="center">
      {/* Left Image Section */}
      <Grid2 size={{ xs: 12, md: 4 }}>
        <Typography
          variant="h4"
          fontWeight="600"
          sx={{ mb: 2, maxWidth: '512px', fontSize: "30px", display: { xs: 'block', md: 'none' } }}
          gutterBottom
        >
          {t('seamless_start_to_your_corporate_travel')}
        </Typography>
        <Box
          component="img"
          src={SeamlessTravel}
          alt="Luxury Travel"
          sx={{ borderRadius: 2, width: "100%", height: "auto" }}
        />
      </Grid2>

      {/* Right Content Section */}
      <Grid2 size={{ xs: 12, md: 8 }}>
        <Typography variant="h4" fontWeight="600" sx={{ mb: 1, maxWidth: '512px', fontSize: "35px", display: { xs: 'none', md: 'block' } }} gutterBottom>
          {t('seamless_start_to_your_corporate_travel')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: "18px", color: "#6D6D6D" }} mb={3}>
          {t('24*7_support_for_your_travel_needs')}
        </Typography>

        {/* Feature List */}
        <Grid2 container spacing={2}>
          {features.map((feature, index) => (
            <Grid2 size={{ xs: 6, sm: 6 }} key={index}>
              <Card sx={{ display: "block", alignItems: "center", boxShadow: 0, border: "none" }}>
                <Box sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: feature.color,
                  borderRadius: "50%",
                  mr: 2,
                }} />
                <CardContent sx={{ p: 0, mt: 1 }}>
                  <Typography sx={{ fontSize: "16px" }} fontWeight="bold">{feature.title}</Typography>
                  <Typography sx={{ fontSize: "10px", maxWidth: "211px" }} variant="body2" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Grid2>
    </Grid2>
  )
}

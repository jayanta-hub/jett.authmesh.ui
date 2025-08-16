import FlightIcon from '@mui/icons-material/Flight';
import { Box, Card, CardContent, Grid2, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { theme } from '../../../../../theme';

const flightData = [
  {
    date: "Wed, Oct 26 2023",
    time: "6:30 PM",
    from: { city: "Pune", code: "PNQ" },
    to: { city: "Mumbai", code: "BOM" },
    passengers: "2 Traveller",
    class: "Economy class",
  },
  {
    date: "Wed, Oct 26 2023",
    time: "6:30 PM",
    from: { city: "Pune", code: "PNQ" },
    to: { city: "Mumbai", code: "BOM" },
    passengers: "2 Traveller",
    class: "Economy class",
  },
  {
    date: "Wed, Oct 26 2023",
    time: "6:30 PM",
    from: { city: "Pune", code: "PNQ" },
    to: { city: "Mumbai", code: "BOM" },
    passengers: "2 Traveller",
    class: "Economy class",
  }
];

export default function RecentSearch() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();
  const isRTL = localStorage.getItem("isRtl") === "true";
  return (
    <div style={{ marginBottom: '2rem' }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" sx={{ textAlign: "center", fontWeight: 600, fontSize: { xs: "26px", md: "30px" } }}>
          {t('recent_search')}
        </Typography>
      </Box>
      {
        isMobile && (
          <Box sx={{ overflowX: "auto", whiteSpace: "nowrap", pb: 2 }}>
            <Grid2
              container
              spacing={3}
              justifyContent="left"
              sx={{
                mt: 4,
                flexWrap: { xs: "nowrap", sm: "wrap" }, // Prevent wrapping on small screens
              }}
            >
              {flightData.map((flight, index) => (
                <Grid2
                  sx={{
                    display: "inline-block", // Ensures cards are in a row for horizontal scrolling
                    minWidth: "300px", // Adjust as needed
                  }}
                  key={index}
                >
                  <Card
                    sx={{
                      width: "100%",
                      minWidth: "310px",
                      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                      borderRadius: "12px",
                      padding: "5px",
                    }}
                  >
                    <CardContent>
                      <Typography variant="body2" sx={{ color: "#B3B3B3", fontSize: "14px" }}>
                        {flight.date} <span style={{ float: isRTL ? "left" : "right" }}>{flight.time}</span>
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {/* FROM City */}
                        <Box sx={{ textAlign: "left", flex: 1 }}>
                          <Typography variant="h6" fontWeight="bold">
                            {flight.from.city}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "gray" }}>
                            {flight.from.code}
                          </Typography>
                        </Box>

                        {/* Flight Icon + Line */}
                        <Box sx={{ display: "flex", alignItems: "center", mx: "auto" }}>
                          <Box sx={{ width: "40px", borderBottom: "1px solid gray", mr: '-10px' }} />
                          <FlightIcon sx={{ mx: 1, color: "#FFC000", transform: "rotate(90deg)", zIndex: 1 }} />
                          <Box sx={{ width: "40px", borderBottom: "1px solid gray", ml: '-10px' }} />
                        </Box>

                        {/* TO City */}
                        <Box sx={{ textAlign: "right", flex: 1 }}>
                          <Typography variant="h6" fontWeight="bold">
                            {flight.to.city}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "gray" }}>
                            {flight.to.code}
                          </Typography>
                        </Box>
                      </Box>

                      <Typography variant="body2" sx={{ color: "gray" }}>
                        {flight.passengers} <span style={{ float: isRTL ? "left" : "right" }}>{flight.class}</span>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          </Box>

        )
      }
      {
        !isMobile && (
          <Grid2 container spacing={3} justifyContent="left" sx={{ mt: 4 }}>
            {flightData.map((flight, index) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card
                  sx={{
                    width: "100%",
                    // minWidth: "300px",
                    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "12px",
                    padding: "5px",
                  }}
                >
                  <CardContent>
                    <Typography variant="body2" sx={{ color: "#B3B3B3", fontSize: "14px", mb: "10px" }}>
                      {flight.date} <span style={{ float: isRTL ? "left" : "right" }}>{flight.time}</span>
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {/* FROM City */}
                      <Box sx={{ textAlign: "left", flex: 1 }}>
                        <Typography variant="h6" fontWeight="bold">
                          {flight.from.city}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "gray" }}>
                          {flight.from.code}
                        </Typography>
                      </Box>

                      {/* Flight Icon + Line */}
                      <Box sx={{ display: "flex", alignItems: "center", mx: "auto" }}>
                        <Box sx={{ width: "40px", borderBottom: "1px solid gray", mr: '-10px' }} />
                        <FlightIcon sx={{ mx: 1, color: "#FFC000", transform: "rotate(90deg)", zIndex: 1 }} />
                        <Box sx={{ width: "40px", borderBottom: "1px solid gray", ml: '-10px' }} />
                      </Box>

                      {/* TO City */}
                      <Box sx={{ textAlign: "right", flex: 1 }}>
                        <Typography variant="h6" fontWeight="bold">
                          {flight.to.city}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "gray" }}>
                          {flight.to.code}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="body2" sx={{ color: "gray" }}>
                      {flight.passengers} <span style={{ float: isRTL ? "left" : "right" }}>{flight.class}</span>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        )
      }
    </div>
  )
}

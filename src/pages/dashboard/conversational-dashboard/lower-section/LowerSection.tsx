import { Box } from "@mui/material"; // Import Grid v2
import CorporateTravel from "./corporate-travel/CorporateTravel";
import OfferCards from "./offer-cards/OfferCards";
import PerformanceSection from "./performance-section/PerformanceSection";
import RecentSearch from "./recent-search/RecentSearch";


export default function LowerSection() {
  return (
    <Box sx={{ alignItems: "center", justifyContent: "center", p: { xs: 0, sm: 10 }, paddingTop: 0 }}>
      {/* Recent Search */}
      <RecentSearch />
      {/* Corporate Travel Section */}
      <CorporateTravel />
      <OfferCards />
      <PerformanceSection />
    </Box>
  );
}

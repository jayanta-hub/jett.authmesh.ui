import { Card, CardContent, CardMedia, Grid2, Typography } from "@mui/material";
import offer1 from "../../../../../assets/images/offer/offer1.svg";
import offer2 from "../../../../../assets/images/offer/offer2.svg";
import offer3 from "../../../../../assets/images/offer/offer3.svg";

const offers = [
  {
    image: offer3, // Replace with actual image URL
    title: "Offer related text 1",
    description: "Enjoy exclusive flight deals with easy booking, cost savings.",
  },
  {
    image: offer1,
    title: "Offer related text 2",
    description: "Enjoy exclusive flight deals with easy booking, cost savings.",
  },
  {
    image: offer2,
    title: "Offer related text 3",
    description: "Enjoy exclusive flight deals with easy booking, cost savings.",
  },
];

const OfferCards = () => {
  return (
    <Grid2 sx={{ mt: { xs: 0, sm: 8 }, p: { xs: '0 24px 24px 24px', sm: 'unset' } }} container spacing={3} justifyContent="left">
      {offers.map((offer, index) => (
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
          <Card
            sx={{
              display: "flex",
              // alignItems: "center",
              // padding: 2,
              borderRadius: "12px",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
              // maxWidth: 350,
            }}
          >
            <CardMedia
              component="img"
              image={offer.image}
              alt={offer.title}
              sx={{
                width: "140px",
                height: "143px",
                borderRadius: "8px",
                objectFit: "cover",
                marginRight: 2,
              }}
            />
            <CardContent sx={{ flex: 1, maxWidth: "171px" }}>
              <Typography sx={{ fontSize: "18px" }} variant="h6" fontWeight="bold">
                {offer.title}
              </Typography>
              <Typography sx={{ color: "#6D6D6D", fontSize: "10px" }} variant="body2" color="textSecondary">
                {offer.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default OfferCards;

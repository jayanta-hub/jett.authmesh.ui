import { ArrowUpward } from '@mui/icons-material';
import { Button, styled, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useChatbotSearch } from '../../../utility/hooks/useChatbotSearch';
import './ConversationalDashboard.css';
import LowerSection from './lower-section/LowerSection';
import SearchComponent from './search-component/SearchComponent';
export default function ConversationalDashboard() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isRTL = localStorage.getItem("isRtl") === "true";

  const scrollToTop = () => {
    // Get the scrollable content div
    const contentDiv = document.getElementById("scrollable-content");

    if (contentDiv) {
      contentDiv.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const GradientTypography = styled(Typography)(() => ({
    background: !isMobile ? 'linear-gradient(92.9deg, #000A12 -12.96%, #000000 -12%, #7134FF 57.38%)' : 'linear-gradient(105.9deg, #000000 6.93%, #0087FA 80.31%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }));
  const chatPayload = useChatbotSearch();
  return (
    <>
      {chatPayload ? (
        <Suspense fallback={<div>Loading flight search...</div>}>
          Flight Search
          <SearchComponent />
        </Suspense>
      ) : (
        <div id="scrollable-content">
          <div className="conversational-dashboard">
            <GradientTypography className="conversational-dashboard-title">
              {t("hi_there")}<br />
              {t("i_your") + " "}
              <span className="conversational-dashboard-title-highlight">
                {t("ai_business_travel")}
              </span>
            </GradientTypography>

            <SearchComponent />
          </div>

          <LowerSection />

          <div style={{ padding: "0rem 5rem", float: isRTL ? "left" : "right" }}>
            <Button
              sx={{
                width: '40px',
                height: '40px',
                backgroundColor: theme?.palette?.customColors?.blue[10],
                color: theme?.palette?.customColors?.white[0],
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "fixed",
                bottom: "1rem",
                [isRTL ? "left" : "right"]: "2rem",
              }}
              onClick={scrollToTop}
            >
              <ArrowUpward />
            </Button></div>
        </div>
      )}

    </>
  );
}
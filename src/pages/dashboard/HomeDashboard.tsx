import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BackgroundCity from '../../assets/images/background.png';
import MapView3 from '../../components/core-module/dynamic-map/Mapview3';
import ErrorBoundary from '../../components/core-module/ErrorBoundry/ErrorBoundary';
import { useMenuListQuery } from '../../store/musafirHomePageApi';
import { ROUTES } from '../../utility/constant';
import useSearch from '../../utility/hooks/useSearch';
import { TabPanelProps } from '../../utility/types/dashboard/Dashboard';
import WidgetSection from '../widget-module/WidgetSection';
import DeveloperDashboard from './DeveloperDashboard';
import RotatingText from './RotatingText';
/**
 * CustomTabPanel component renders the content of a tab panel.
 * 
 * @param {TabPanelProps} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The content to display within the tab panel.
 * @param {number} props.value - The current value of the selected tab.
 * @param {number} props.index - The index of this tab panel.
 * @returns {JSX.Element} - A div element that acts as a tab panel.
 */
function CustomTabPanel(props: Readonly<TabPanelProps>) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0, pt: 0, marginTop: '15px' }}>{children}</Box>}
    </div>
  );
}

/**
 * Generates ARIA properties for a tab element.
 * The properties are:
 * - id: The id of the tab.
 * - aria-controls: The id of the tabpanel that this tab controls.
 * @param {number} index - The index of the tab.
 * @returns {Object} - An object containing the ARIA properties.
 */
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const HomeDashboard: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const [templateValue, setTemplateValue] = useState(localStorage.getItem("templateValue") ? localStorage.getItem("templateValue") : "0");
  const { showMap, coordinates, setShowMap, setCoordinates } = useSearch();
  const { data: menuData, error, isLoading: menuLoading, } = useMenuListQuery({});

  useEffect(() => {
    const handleFlightMapUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{
        showMap: boolean;
        coordinates: string[];
      }>;
      const { showMap, coordinates } = customEvent.detail;
      setShowMap(showMap);
      setCoordinates(coordinates);
    };
    document.addEventListener("flightMapUpdate", handleFlightMapUpdate);

    return () => {
      document.removeEventListener("flightMapUpdate", handleFlightMapUpdate);
    };
  }, []);

  /**
   * Handles the change event for the tabs.
   * Updates the state to reflect the newly selected tab.
   * @param {React.SyntheticEvent} _event - The event triggered by the tab change.
   * @param {number} newValue - The index of the newly selected tab.
   */
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    const themeFromURL = new URLSearchParams(window.location.search).get("theme");
    const storedTheme = localStorage.getItem("templateValue");
    const themeValue = themeFromURL || storedTheme || "0";

    if (templateValue !== themeValue) {
      setTemplateValue(themeValue);
      localStorage.setItem("templateValue", themeValue);
      window.dispatchEvent(new Event("template-change"));
    }
  }, []);
  const handleTemplateChange = (_event: React.SyntheticEvent, newValue: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set('theme', newValue.toString());
    window.history.pushState({}, '', url.toString());
    setTemplateValue(newValue.toString());
    localStorage.setItem("templateValue", newValue.toString());
    window.dispatchEvent(new Event("template-change"));
    const RedirectURL = `${ROUTES.DASHBOARD}?theme=${newValue}`
    navigate(RedirectURL)
  };
  const isRole: string = "tmc";
  //future refrence
  // const isRole="developer";
  const bookingContent: string = "Flight";
  const allTabs = [
    {
      label: t('flight_home'),
      apiKey: 'Flights',
      a11yIndex: 0,
      sx: {
        textTransform: 'none',
        minHeight: '20px',
        height: '20px',
        fontWeight: 600,
        marginX: '8px',
      },
      component: "Flight Search Coming Soon!",
    },
    {
      label: t('hotel_home'),
      apiKey: 'Hotels',
      a11yIndex: 1,
      sx: {
        textTransform: 'none',
        minHeight: '20px',
        height: '20px',
        fontWeight: 500,
        marginX: '8px',
      },
      component: <>Hotel Search Coming Soon!</>,
    },
    {
      label: t('visa_home'),
      apiKey: 'Visa',
      a11yIndex: 2,
      sx: {
        textTransform: 'none',
        minHeight: '20px',
        height: '20px',
        fontWeight: 500,
        marginX: '8px',
      },
      component: <>Visa Search Coming Soon!</>,
    },
    {
      label: t('holidays_home'),
      apiKey: 'Holidays',
      a11yIndex: 3,
      sx: {
        textTransform: 'none',
        minHeight: '20px',
        height: '20px',
        fontWeight: 500,
        marginX: '8px',
      },
      component: <>Holidays Search Coming Soon!</>,
    },
  ];
  const pageName = "Home";
  const content = menuData?.Response?.Pages?.find(page => page?.Name?.toLowerCase() === pageName?.toLowerCase())
    ?.Sections?.find(section => section?.Category === 'Content')
    ?.Menus || []

  const availableTabs = allTabs.filter(tab =>
    content?.some(api => api?.MenuId === tab.apiKey)
  );
  return (<>
    {isMobileView && (
      <>  <Box className="  p-[0.5rem]" sx={{ marginTop: "2rem"}}>


        <Box className="" sx={{
          marginTop: "3rem",
        }}>
          <Box sx={{
            position: 'relative',
            top: '-40px',
            left: '40%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '1280px',
            zIndex: "1",
          }}>
            <Box sx={{
              position: "absolute",
              zIndex: 1,
              flex: !showMap ? 1 : '',
              left: "2.5rem",
              width: "350px",
            }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                slotProps={{
                  indicator: {
                    sx: {
                      backgroundColor: theme.palette.customColors?.yellow[10],
                    },
                  }
                }}
                sx={{

                  '& .MuiTabs-flexContainer': {
                    justifyContent: 'space-evenly',
                  },
                  '& .MuiTab-root': {
                    flex: 1,
                    textAlign: 'center',
                    minWidth: 0,
                    maxWidth: '60px',
                    fontSize: '12px',
                    fontWeight: "500",
                  },
                  '& .MuiTabs-indicator': {
                    bottom: "15px",
                  },
                  ".Mui-selected": {
                    color: "black !important",
                    fontWeight: "600"
                  },
                }}
              >
                <Tab

                  label={t('flight_home')}
                  {...a11yProps(0)}
                  sx={{
                    textTransform: 'none',
                    minHeight: '20px',
                    height: '20px',
                    fontWeight: 600,

                  }}
                />
                <Tab

                  label={t('hotel_home')}
                  {...a11yProps(1)}
                  sx={{
                    textTransform: 'none',
                    minHeight: '20px',
                    height: '20px',
                    fontWeight: 500,
                  }}
                />
                <Tab

                  label={t('visa_home')}
                  {...a11yProps(2)}
                  sx={{
                    textTransform: 'none',
                    minHeight: '20px',
                    height: '20px',
                    fontWeight: 500,
                  }}
                />
                <Tab

                  label={t('holidays_home')}
                  {...a11yProps(3)}
                  sx={{
                    textTransform: 'none',
                    minHeight: '20px',
                    height: '20px',
                    marginRight: '10px',
                    fontWeight: 500,
                  }}
                />
              </Tabs>
            </Box>
          </Box>
          <Box sx={{
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '1280px',
            zIndex: "1",
          }}>
            <Box sx={{
              mt: 3, mb: 2, borderBottom: 1, borderColor: 'divider', position: "absolute", right: '-5rem',
              top: '15rem',
              transform: 'rotate(90deg)',
              boxShadow: 'rgba(0, 0, 0, 0.18) 0px 2px 4px',
              borderRadius: '17px',
              zIndex: 2
            }}

              id="template-tabs">
              <Tabs
                value={templateValue}
                onChange={handleTemplateChange}
                aria-label="template tabs"
                slotProps={{
                  indicator: {
                    sx: { display: 'none' },
                  }
                }}
                sx={{

                  '& .MuiTab-root': {
                    borderRadius: "10px",
                  },

                  '& .Mui-selected': {
                    color: "#f1f1f1 !important",
                    bgcolor: '#0087fa'
                  }
                }}
              >
                <Tab
                  label="Template 1"
                  value={'0'}
                  {...a11yProps(0)}
                />
                <Tab
                  label="Template 2"
                  value={'1'}
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box>
          </Box>
          <Box sx={{
            backgroundColor: theme.palette.customColors?.white[0],
            boxShadow: `-10px 14px 50px 0px ${theme.palette.customColors?.white[15]}`,
            margin: "0.5rem", padding: "0.5rem",
          }}
          >
            <CustomTabPanel value={value} index={0}>
              <ErrorBoundary updatedError="Failed to load flight module, Please try again later">
                <React.Suspense fallback={<div>Loading...</div>}>
                  Flight Search Coming Soon!
                </React.Suspense>
              </ErrorBoundary>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              Hotel Search Coming Soon!
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              Visa Search Coming Soon!
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              Holidays Search Coming Soon!
            </CustomTabPanel>
          </Box>
        </Box>
        {/* </Box> */}

        <WidgetSection />

      </Box>
      </>

    )}



    {!isMobileView && (<>
      {isRole === "tmc" && (<Box className="flex flex-col justify-center" sx={{
        maxWidth: showMap ? "100%" : 1280,
        marginX: showMap ? "none" : "auto"
      }}>


        <Box className="flex flex-row mt-4 h-[600px]"
          sx={{
            backgroundImage: !showMap ? `url('${BackgroundCity}')` : '',
            backgroundRepeat: "no-repeat",
            width: "auto",
            backgroundPosition: "30% 97%",
            backgroundSize: "100%",

          }}
        >
          {!showMap && <RotatingText />}
          <Box sx={{
            position: "relative", width: !showMap ? "50%" : "100%"
          }}>
            {showMap &&
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: -1,
                }}
              >
                <MapView3
                  startPoints={coordinates?.[0] ? [[26.2672, 50.6303]] : []}
                  destinations={coordinates?.[1] ? [[30.1160, 31.4172]] : []}
                  height="800px"
                  width="100%"
                  coordinates={coordinates}
                />
              </Box>}
            <Box sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              maxWidth: '1280px',
              height: '100%',
              zIndex: "1",
              width: "98%"
            }}>
              <Box sx={{
                position: "absolute",
                zIndex: 2,
                flex: !showMap ? 1 : '',
                mt: '5rem',
                mr: !showMap ? { sm: "", md: "4rem" } : '',
                right: !showMap ? "4rem" : "5.5rem",
                width: "350px"
              }}
              >

                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  slotProps={{
                    indicator: {
                      sx: { backgroundColor: theme.palette.customColors?.yellow[10], },
                    }
                  }}
                  sx={{


                    width: showMap ? (currentLanguage === 'en' ? '100%' : "100%") : '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: showMap ? '#fff' : '',

                    '& .MuiTab-root': {
                      flex: 1,
                      textAlign: 'center',
                      minWidth: 0,

                      fontSize: '13px',
                      fontWeight: "500",
                      py: showMap ? '17px' : '0px',

                    },
                    '& .MuiTabs-indicator': {
                      bottom: "15px",
                    },
                    ".Mui-selected": {
                      color: "black !important",
                      fontWeight: "600",

                    },
                  }}
                >
                  {availableTabs.map(tab => (
                    <Tab
                      key={tab.apiKey}
                      label={tab.label}
                      {...a11yProps(tab.a11yIndex)}
                      sx={tab.sx}
                    />
                  ))}
                </Tabs>
                <Box sx={{
                  position: 'fixed',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100%',
                  maxWidth: '1280px',
                  height: '100%',
                  zIndex: "-1"
                }}>
                  <Box sx={{
                    mt: 3, mb: 2, borderBottom: 1, borderColor: 'divider', position: "absolute", right: '-5rem',
                    top: '9rem',
                    transform: 'rotate(90deg)',
                    boxShadow: 'rgba(0, 0, 0, 0.18) 0px 2px 4px',
                    borderRadius: '17px',
                    zIndex: 1
                  }}

                    id="template-tabs">
                    <Tabs
                      value={templateValue}
                      onChange={handleTemplateChange}
                      aria-label="template tabs"
                      slotProps={{
                        indicator: {
                          sx: { display: 'none' },
                        }
                      }}
                      sx={{

                        '& .MuiTab-root': {
                          borderRadius: "10px",
                        },

                        '& .Mui-selected': {
                          color: "#f1f1f1 !important",
                          bgcolor: '#0087fa'
                        },
                        backgroundColor: "#f1f1f1 !important",
                        borderRadius: "10px",
                      }}
                    >
                      <Tab
                        label="Template 1"
                        value={'0'}
                        {...a11yProps(0)}
                      />
                      <Tab
                        label="Template 2"
                        value={'1'}
                        {...a11yProps(1)}
                      />
                    </Tabs>
                  </Box>
                </Box>
                <Box sx={{
                  backgroundColor: theme.palette.customColors?.white[0],
                  boxShadow: showMap ? " " : `-10px 14px 50px 0px ${theme.palette.customColors?.white[15]}`,
                  width: "350px"
                }}
                >
                  {availableTabs.map((tab, idx) => (
                    <CustomTabPanel key={tab.apiKey} value={value} index={idx}>
                      <Box sx={{
                        minWidth: "350px", padding: "10px",
                        boxShadow: showMap ? " " : `-10px 14px 50px 0px ${theme.palette.customColors?.white[15]}`,
                      }}>
                        <ErrorBoundary updatedError="Failed to load flight module, Please try again later">
                          {tab.component}
                        </ErrorBoundary>
                      </Box>
                    </CustomTabPanel>
                  ))}

                </Box>
              </Box></Box>
          </Box>
          {/* <Box sx={{
            flex: "auto", backgroundImage: `url(${BackgroundCity})`,
            backgroundSize: "cover",
            backgroundPosition: "right 20px top -30px",
          }}></Box> */}
          <Box />
        </Box>



        {/* Widget section */}
      </Box>)}
      {isRole == "developer" && !showMap && (
        <DeveloperDashboard />
      )}
      {!showMap && <WidgetSection />}

    </>)}


  </>



  );
}
export default HomeDashboard;

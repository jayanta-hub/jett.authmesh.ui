import React, { useEffect, useState } from 'react';
import i18n from 'i18next';
import { Autocomplete, Box, Button, Menu, styled, useTheme, TextField, Tooltip, Typography } from '@mui/material';
import i18next, { t } from 'i18next';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { dummyCountries } from '../../../utility/countryData';
import Language from '../../../assets/images/language.svg';
import MynauiGlobe from '../../../assets/images/mynaui_globe.svg';
import { KeyboardArrowDown } from '@mui/icons-material';
import { CountryType, LanguageType } from '../../../utility/countries';
import { CountryList, Setting } from '../../../utility/types/homepage/homepageType';

const settings: Setting[] = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "हिन्दी",
    value: "hn",
  },
  {
    label: "عربي",
    value: "ar",
  }
];
const LanguageCountrySwitcher: React.FC<{ data: CountryType[], languageData: LanguageType[] }> = ({ data, languageData }) => {
  const theme = useTheme();
  const currentLanguage = i18next.language == "hn" ? "hi" : i18next.language;
  const defaultLanguage: LanguageType = languageData.find((lang) => lang.Code.toLowerCase() === currentLanguage) || languageData[0];
  const isRTL = localStorage.getItem("isRtl") === "true";
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [selectedCountry, setSelectedCountry] = React.useState<CountryType | null>(
    data[0]
  );
  const [dummyCountriesList, setDummyCountriesList] = useState<CountryType[]>([])

  const [touched, setTouched] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = React.useState<LanguageType | null>(defaultLanguage)

  const [country, setCountry] = useState<CountryType | null>()
  const [language, setLanguage] = useState<LanguageType | null>()
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElUser(event.currentTarget);
  };
  const handleApply = () => {
    handleCloseUserMenu();
    changeLanguage(selectedLanguage?.Name == "Hindi" ? "hn" : selectedLanguage?.Code?.toLowerCase() ?? "");
    if (selectedCountry && selectedLanguage) {
      localStorage.setItem("country", JSON.stringify(selectedCountry));
      //future refrence
      // localStorage.setItem("language", JSON.stringify(selectedLanguage));
    }
  }
  useEffect(() => {
    const storedCountry = localStorage.getItem("country");
    const country = storedCountry ? JSON.parse(storedCountry) : null;
    setCountry(country)
    //future refrence
    // const storedLanguage = localStorage.getItem("language");
    // const language = storedLanguage ? JSON.parse(storedLanguage) : null;
    // setLanguage(language)
  }, [])



  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const CustomTextField = styled(TextField)(
    {
      "& .MuiOutlinedInput-root": {
        backgroundColor: theme.palette.customColors?.white[12],
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: 500,
        lineHeight: "15px",
        color: theme.palette.customColors?.black[1],
        fontFamily: "Poppins",
        "& fieldset": {
          border: `1px solid ${theme.palette.customColors?.lightGray[12]}`,
        },

      },
      "& .MuiInputAdornment-root svg": {
        color: theme.palette.customColors?.black[1],
      },
    },
  );
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", float: 'right', }}
    >
      <Tooltip title={t("select_country_language")}>
        <Button onClick={handleOpenUserMenu} sx={{ display: "flex", alignItems: "center", float: 'right', backgroundColor: theme.palette.customColors?.lightGray[10], width: "100px", height: "30px", justifyContent: "center", borderRadius: "6px" }}>
          <Typography color={theme.palette.customColors?.black[3]} fontSize="12px" fontFamily="Poppins" fontWeight="400" lineHeight="18px" textAlign="center" >
            <Box className="flex">
              <Box
                component="img"
                src={country ? `https://flagcdn.com/w40/${country?.code.toLowerCase()}.png` : `https://flagcdn.com/w40/${data[0]?.code.toLowerCase()}.png`}
                alt={"flag"}
                sx={{
                  width: "14px",
                  height: "14px",
                  objectFit: "contain",
                  margin: "2px 4px"
                }}
              /> {country ? country?.code : data[0]?.code}
              <span style={{ color: theme.palette.customColors?.lightGray[13], margin: "0px 4px" }}>|</span> {language ? language?.Name?.slice(0, 3).toUpperCase() : selectedLanguage?.Name?.slice(0, 3).toUpperCase()}
              <KeyboardArrowDownIcon fontSize="small" />
            </Box>
          </Typography>
        </Button>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        disableScrollLock
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        slotProps={{
          paper: {
            sx: {
              width: "260px",
              height: "254px",
              borderRadius: "4px",
              border: `1px solid ${theme.palette.customColors?.lightGray[12]}`,
              //   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", 
            },
          }

        }}>
        <Box sx={{ display: "flex", flexDirection: "column", margin: "1rem" }} >
          <Box className="flex flex-row" sx={{ lineHeight: "18px" }}>
            <Box
              component="img"
              src={MynauiGlobe}
              sx={{
                height: "16px",
                width: "16px",
                margin: "10px 5px 0px 0px",
                objectFit: "contain", lineHeight: "18px"
              }} />
            <Typography color={theme.palette.customColors?.grey[8]} fontSize="12px" fontFamily="Poppins" fontWeight="400" textAlign="left" padding="10px 0px" >

              {t('country_region')}</Typography></Box>
          <Autocomplete
            sx={{
              display: "flex",
              alignItems: "center",
              float: "right",
              width: "100%",
              height: "40px",
              borderRadius: "6px",
            }}
            options={data ?? []}
            renderOption={(props, option) => (
              <li {...props} key={option.code} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img
                  loading="lazy"
                  width="20"
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  alt=""
                />
                {option.label}
              </li>
            )}
            value={country || selectedCountry}
            onChange={(event, newValue) => {
              setSelectedCountry(newValue);
              setTouched(true);
            }}
            getOptionLabel={(option) => option.label}
            popupIcon={<KeyboardArrowDown fontSize="small" sx={{ color: theme.palette.customColors?.blue[13] }} />}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                placeholder="Search Country"
                size="small"
                slotProps={{
                  input: {
                    ...params.InputProps,
                    startAdornment: selectedCountry ? (
                      <img
                        loading="lazy"
                        width="14"
                        srcSet={`https://flagcdn.com/w40/${selectedCountry?.code.toLowerCase()
                          }.png 2x`}
                        src={`https://flagcdn.com/w20/${selectedCountry?.code.toLowerCase()
                          }.png`}
                        alt=""
                        style={{ [isRTL ? "marginLeft" : "marginRight"]: "0px" }}
                      />
                    ) : (
                      <img
                        loading="lazy"
                        width="14"
                        srcSet={`https://flagcdn.com/w40/${country?.code.toLowerCase()
                          }.png 2x`}
                        src={`https://flagcdn.com/w20/${country?.code.toLowerCase()
                          }.png`}
                        alt=""
                        style={{ [isRTL ? "marginLeft" : "marginRight"]: "0px" }}
                      />
                    )
                  }

                }}

              />
            )}
          />
          <Box className="flex flex-row" sx={{ lineHeight: "18px" }}>
            <Box
              component="img"
              src={Language}
              sx={{
                height: "16px",
                width: "16px", margin: "10px 5px 0px 0px",
                objectFit: "contain", lineHeight: "18px"
              }}
            />
            <Typography color={theme.palette.customColors?.grey[8]} fontSize="12px" fontFamily="Poppins" fontWeight="400" textAlign="left" padding="10px 0px" >
              {t('language')}</Typography></Box>
          <Autocomplete
            sx={{
              display: "flex",
              alignItems: "center",
              float: "right",
              width: "100%",
              height: "40px",
              borderRadius: "6px",
            }}
            options={languageData}
            value={language || selectedLanguage}
            onChange={(event, newValue) => setSelectedLanguage(newValue)}
            getOptionLabel={(option) => option.Name}
            popupIcon={<KeyboardArrowDown fontSize="small" sx={{ color: theme.palette.customColors?.blue[13] }} />}
            clearIcon={selectedLanguage ? undefined : null}
            slotProps={{
              paper: {
                sx: {
                  backgroundColor: theme.palette.customColors?.white[0],
                  borderRadius: "8px",
                  boxShadow: "0px 20px 10px rgba(0, 0, 0, 0.1)",
                },
              },
            }}
            renderInput={(params) => (
              <CustomTextField {...params} placeholder="Search Language" size="small"
              />
            )}
          />
          <Button
            type="submit"
            size="large"
            variant="contained"
            sx={{
              width: "100%", borderRadius: "10px", marginTop: "8px"
              , backgroundColor: theme.palette.customColors?.blue[13], lineHeight: "21px",
              height: "40px",
              textTransform: "none",
              color: theme.palette.customColors?.white[0], textAlign: "center", fontFamily: "Poppins", fontSize: "14px", fontWeight: "600"
            }} onClick={handleApply}>
            {t('apply')}
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};
export default LanguageCountrySwitcher;
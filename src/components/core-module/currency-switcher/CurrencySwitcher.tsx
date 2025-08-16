import React, { useEffect, useState } from 'react';
import { Box, IconButton, InputAdornment, Menu, styled, useTheme, TextField, Tooltip, Typography } from '@mui/material';
import { t } from 'i18next';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import UilSearch from '../../../assets/images/uil_search.svg';
import { CurrencyType, Setting } from '../../../utility/types/homepage/homepageType';
import { useCurrencyDetails } from '../../../utility/hooks/useCurrencyDetails';

const settings: Setting[] = [
  {
    label: "INR",
    value: "inr",
  },
  {
    label: "AED",
    value: "AED",
  },

];
const currency: Currency[] = [
  {
    "Name": "Indian Rupee",
    "code": "INR",
    "isPopular": true
  },
  {
    "Name": "US Dollar",
    "code": "USD",
    "isPopular": true
  },
  {
    "Name": "Euro",
    "code": "EUR",
    "isPopular": true
  },
  {
    "Name": "British Pound",
    "code": "GBP",
    "isPopular": true
  },
  {
    "Name": "Japanese Yen",
    "code": "JPY",
    "isPopular": true
  },
  {
    "Name": "Chinese Yuan",
    "code": "CNY",
    "isPopular": true
  },
  {
    "Name": "Australian Dollar",
    "code": "AUD",
    "isPopular": true
  },
  {
    "Name": "Canadian Dollar",
    "code": "CAD",
    "isPopular": true
  },
  {
    "Name": "Swiss Franc",
    "code": "CHF",
    "isPopular": true
  },
  {
    "Name": "South African Rand",
    "code": "ZAR",
    "isPopular": false
  },
  {
    "Name": "Brazilian Real",
    "code": "BRL",
    "isPopular": false
  },
  {
    "Name": "Russian Ruble",
    "code": "RUB",
    "isPopular": false
  },
  {
    "Name": "Mexican Peso",
    "code": "MXN",
    "isPopular": false
  },
  {
    "Name": "Hong Kong Dollar",
    "code": "HKD",
    "isPopular": false
  },
  {
    "Name": "Singapore Dollar",
    "code": "SGD",
    "isPopular": false
  },
  {
    "Name": "Norwegian Krone",
    "code": "NOK",
    "isPopular": false
  },
  {
    "Name": "New Zealand Dollar",
    "code": "NZD",
    "isPopular": false
  },
  {
    "Name": "Swedish Krona",
    "code": "SEK",
    "isPopular": false
  },
  {
    "Name": "Danish Krone",
    "code": "DKK",
    "isPopular": false
  },
  {
    "Name": "Polish Zloty",
    "code": "PLN",
    "isPopular": false
  },
  {
    "Name": "Turkish Lira",
    "code": "TRY",
    "isPopular": false
  }
];
const CurrencySwitcher: React.FC<{ currencyData: CurrencyType[] }> = ({ currencyData }) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCurrencies, setFilteredCurrencies] = useState(currencyData);
  const [currencyUser, setCurrencyUser] = React.useState<null | HTMLElement>(
    null
  );
  const currency = useCurrencyDetails();
  const [selectedCurrency, setSelectedCurrency] = useState(() =>
    currency?.IsoCode3 ?? currencyData?.[0]?.IsoCode3 ?? ""
  );


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setCurrencyUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setCurrencyUser(null);
    setSearchTerm("")
    setFilteredCurrencies(currencyData)
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (event.target.value?.length === 0) {
      setFilteredCurrencies(currencyData)
    } else {
      const filtered = currencyData.filter((item) => item.Name.toLowerCase().includes(event.target.value.toLowerCase()));
      setFilteredCurrencies(filtered);
    }
  };

  const currencySelection = (code: CurrencyType) => {
    setSelectedCurrency(code?.IsoCode3);
    localStorage.setItem("currency", JSON.stringify(code));
    window.dispatchEvent(new Event("currency-change"));
    handleCloseUserMenu()
  }
  const List: React.FC = () => {
    return (
      <Box className="mx-4 my-2">
        <Typography color={theme.palette.customColors?.grey[8]} fontSize="10px" fontFamily="Poppins" fontWeight="500" lineHeight="15px" textAlign="left" sx={{ textTransform: "uppercase" }} >
          Popular Currency</Typography>
        {filteredCurrencies?.map((item, index) => (
          <button
            key={index}
            className={`pr-4 py-2 flex w-full justify-between cursor-pointer font-sans flex-row hover:bg-slate-100 `}
            onClick={() => currencySelection(item)}
          >
            <Typography sx={{ fontSize: "12px", color: theme.palette.customColors?.grey[9], fontFamily: "Poppins", fontWeight: "400", lineHeight: "18px" }}>{item.Name}</Typography>
            <Typography sx={{ fontSize: "12px", color: theme.palette.customColors?.black[3], fontFamily: "Poppins", fontWeight: "500", lineHeight: "18px" }}>{item.IsoCode3}</Typography>
          </button>
        ))}
        {/* <Box width="100%">
          <hr
            style={{
              border: `0.5px solid ${theme.palette.customColors?.white[13]}`,
              margin: "10px 0",
              width: "100%",
            }}
          />
        </Box> */}
      </Box>
    );
  };
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", float: 'right', backgroundColor: theme.palette.customColors?.lightGray[10], width: "56px", height: "30px", justifyContent: "center", borderRadius: "6px" }}
    >
      <Tooltip title={t("select_currency")}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Typography color={theme.palette.customColors?.black[3]} fontSize="12px" fontFamily="Poppins" fontWeight="400" lineHeight="18px"  >{selectedCurrency}

            <KeyboardArrowDownIcon fontSize="small" />
          </Typography>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={currencyUser}
        disableScrollLock
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(currencyUser)}
        onClose={handleCloseUserMenu}
        slotProps={{
          paper: {
            sx: {
              width: "260px",
              height: "382px",
              borderRadius: "4px",
              border: `1px solid ${theme.palette.customColors?.lightGray[12]}`,
              overflowY: "hidden",
            },
          }
        }}>
        <Box sx={{ width: "100%", padding: "5px", marginTop: "10px", paddingLeft: '9px' }}>
          <TextField
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth

            placeholder={t('search_currencies')}
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: `0.5px solid ${theme.palette.customColors?.white[13]}`,
                },
                "&.Mui-focused fieldset": {
                  border: `0.5px solid ${theme.palette.customColors?.white[13]}`,
                },
              },
              color: theme.palette.customColors?.grey[9], fontFamily: "Poppins", fontWeight: "400", lineHeight: "18px"

            }}
            slotProps={{
              input: {
                startAdornment:
                  <InputAdornment position="start">
                    <Box
                      component="img"
                      src={UilSearch}
                      sx={{
                        height: "16px",
                        width: "16px",
                        objectFit: "contain", lineHeight: "18px"
                      }}
                    /></InputAdornment>
              }
            }}
          />
        </Box>
        <Box sx={{
          height: "300px", overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
            borderRadius: "10px",
            backgroundColor: theme.palette.customColors?.white[0]
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.customColors?.grey[10],
            borderRadius: "10px",
          },
        }}>
          <List />
        </Box>
      </Menu>
    </Box>
  );
};

export default CurrencySwitcher;
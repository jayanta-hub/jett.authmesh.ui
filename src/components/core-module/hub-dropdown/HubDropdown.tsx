import { Box, Menu, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../utility/constant';
interface Setting {
  label: string;
  value: string;
  link?: string
}
const finances: Setting[] = [{
  label: "Finance-Billing",
  value: "finance_billing",
  navigate: ROUTES.FINANCE
},
{
  label: "Reports",
  value: "reports",
  navigate: ROUTES.REPORTS
}]
const settings: HomeMenu[] = [
  {
    label: "Approval Workflow",
    value: "approval_workflow",
    link: ROUTES.APPROVALWORKFLOW
  },
  {
    label: "Travel Policy",
    value: "travel_policy",
    navigate: ROUTES.TRAVEL_POLICY
  },
  {
    label: "Organisations",
    value: "organisations",
    navigate: ROUTES.ORGANISATIONS

  }, {
    label: "Tags",
    value: "tags",
    navigate: ROUTES.TAGS
  }, {
    label: "Market Place",
    value: "market_place",
    navigate: ROUTES.MARKET_PLACE

  }, {
    label: "Whitelabel Settings",
    value: "whitelabel_settings",
    navigate: ROUTES.WHITELABEL_SETTINGS
  }, {
    label: "Roles & Permissions",
    value: "roles_permissions",
    navigate: ROUTES.ROLES
  }
];
const HubDropdown = ({ openHub, handleCloseHubMenu, handleOpenHubMenu, data }: { openHub: HTMLElement | null, handleCloseHubMenu: () => void, handleOpenHubMenu: (event: React.MouseEvent<HTMLElement>) => void, data: any }) => {

  const subMenu = data?.Response?.Pages?.find((page: any) => page.Name === "Hub")?.Sections?.find((section: any) => section.Category === "SubMenu")?.Menus || []
  const theme = useTheme();
  return (
    <Menu
      sx={{ mt: "45px", maxWidth: 1280, mx: "auto", }}
      id="menu-appbar"
      anchorEl={openHub}
      disableScrollLock
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(openHub)}
      onClose={handleCloseHubMenu}
      slotProps={{
        paper: {
          sx: {
            width: "530px",
            height: "276px",
            borderRadius: "4px",
            border: `0.5px solid ${theme.palette.customColors?.lightGray[12]}`,
            left: "260px !important"
          },
        }
      }}>
      <Box sx={{ display: "flex", flexDirection: "row", margin: "1rem" }}>
        {subMenu.map((menu, index) => {
          const isLast = index === subMenu.length - 1;

          const renderSubItems = () => {
            if (menu.MenuId === "FINANCE & ANALYTICS") {
              return data?.Response?.Pages?.find((page: any) => page.Name === "FINANCE_ANALYTICS")?.Sections?.find((section: any) => section.Category === "SubMenu")?.Menus?.map((finance, idx) => (
                <Link to={finance.MenuId == 'Offers' ? ROUTES.OFFER : finance?.MenuId == "Budget" ? ROUTES.BUDGET : ""} key={`setting-${idx}`
                }> <Typography
                  key={`finance-${idx}`}
                  color={theme.palette.customColors?.grey[9]}
                  fontSize="12px"
                  fontFamily="Poppins"
                  fontWeight="400"
                  lineHeight="18px"
                  marginLeft="1rem"
                  marginTop="0.5rem"
                >
                    {finance.MenuId}
                  </Typography></Link>
              ));
            }

            if (menu.MenuId === "SETTINGS") {
              return data?.Response?.Pages?.find((page: any) => page.Name === "SETTINGS")?.Sections?.find((section: any) => section.Category === "SubMenu")?.Menus?.map((setting, idx) => (
                <Link to={setting.MenuId == 'Approval Workflow' ? ROUTES.APPROVALWORKFLOW : setting.MenuId == 'Travel Policy' ? ROUTES.TRAVEL_POLICY : setting.MenuId == 'Organisations' ? ROUTES.ORGANISATIONS : setting.MenuId == 'Tags' ? ROUTES.TAGS : setting.MenuId == 'Vouchers' ? ROUTES.VOUCHER : setting.MenuId ==='Pricing Policy' ? ROUTES.PRICING_POLICY : ""} key={`setting-${idx}`
                }> <Typography
                  color={theme.palette.customColors?.grey[9]}
                  fontSize="12px"
                  fontFamily="Poppins"
                  fontWeight="400"
                  lineHeight="18px"
                  marginLeft="1rem"
                  marginTop="0.5rem"

                >
                    {setting.MenuId}
                  </Typography>
                </Link>
              ));
            }

            return null;
          };

          return (
            <Box
              key={menu.MenuId}
              sx={{
                flex: 1,
                borderRight: !isLast
                  ? `0.5px solid ${theme.palette.customColors?.white[13]}`
                  : "none",
              }}
            >
              <Typography
                color={theme.palette.customColors?.black[3]}
                fontSize="12px"
                fontFamily="Poppins"
                fontWeight="500"
                lineHeight="18px"
                marginLeft="1rem"
              >
                <span
                  style={{
                    textUnderlineOffset: "4px",
                    textDecoration: "underline",
                    textDecorationColor:
                      theme.palette.customColors?.yellow[10],
                    textDecorationThickness: "1px",
                  }}
                >
                  {menu.MenuId.slice(0, 2)}
                </span>
                {menu.MenuId.slice(2)}
              </Typography>
              {renderSubItems()}
            </Box>
          );
        })}
      </Box>

    </Menu >
  );
};

export default HubDropdown;
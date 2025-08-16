
import { Visibility } from "@mui/icons-material";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, List, ListItem, ListItemButton, ListItemText, TextField, Typography, useMediaQuery } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { useFormik } from "formik";
import Cookies from 'js-cookie';
import forge from 'node-forge';
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import GoogleLogo from "../../../assets/images/google.png";
import SAML from "../../../assets/images/saml.svg";
import MusafirLogo from "../../../assets/images/musafirbiz-logo.svg";
import LanguageSwitcher from "../../../components/core-module/language-switcher/LanguageSwitcher";
import { useCreateTokenMutation, useLoginMutation, useLoginmethodsMutation } from "../../../store/musafirLoginApi";
import { ROUTES } from "../../../utility/constant";
import { theme } from '../../../theme';
import { customEnqueueSnackbar } from "../../../utility/helper";
import { Profile } from '../../../utility/types/login/Login'


/**
 * Login component is a React functional component that renders a login form with
 * email and password fields, including validation and translations. It uses Formik
 * for form handling and Yup for validation. The component handles form submission,
 * displaying success or error messages based on the response, and redirects to the
 * attempted route or dashboard upon successful login.
 * 
 * State Variables:
 * - showPassword: Determines whether the password is visible or hidden.
 * 
 * Hooks:
 * - useLoginMutation: Manages the login API call.
 * - useTranslation: Provides translation capabilities for localized strings.
 * - useNavigate: Enables navigation to different routes.
 * - useLocation: Captures the attempted route for potential redirection.
 * - useFormik: Manages form state, validation, and submission.
 * - useEffect: Validates the form whenever the language changes.
 * 
 * Constants:
 * - MIN_PASSWORD_LENGTH: Minimum length for the password.
 * - MAX_PASSWORD_LENGTH: Maximum length for the password.
 * - PASSWORD_REGEX: Regular expression for special characters in the password.
 * - NO_WHITESPACE_REGEX: Regular expression to ensure no whitespace in the password.
 * - UPPERCASE_REGEX: Regular expression for uppercase letters in the password.
 * - NUMBER_REGEX: Regular expression for numbers in the password.
 * - LOWERCASE_REGEX: Regular expression for lowercase letters in the password.
 * 
 * Methods:
 * - handleClickShowPassword: Toggles the visibility of the password.
 * - handleMouseDownPassword: Prevents default behavior when clicking the password visibility toggle.
 * 
 * Sub-components:
 * - LoadingScreen: Displays a loading screen when the login is in progress.
 * - LanguageSwitcher: Provides a UI to switch languages.
 * - FormControl: Renders input fields for email and password with validation errors.
 * - Button: Renders a submit button for the login form.
 */
const Login: React.FC = (): JSX.Element => {
  const [login] = useLoginMutation();
  const [createToken] = useCreateTokenMutation();
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();  // To capture the attempted route
  const modulus = `zktSGmyKa5SR8HO540HKTdgDPVmXafgGFrf4OYtRNApRssnt0hGoMU7Jitc/SVWbPstFshIi5XblbDL2NXWYhZtj4PWL4SKc1/bM02xxabPw/eFr3XAAPCF62WxAVPsJBbEoAB0AcOCeIcGHb+tzLtXQJAvOuIBsKLQiiB7/c9ltt5AVVM4si1RC3JsxpqcGTkgwnh+FMg8CFvLdHjh/oi789wj8zoGWLAdYSBBa8IoQgTuzZt1tft2LF0y4Ck3yT8F9TX5GbAiVXb0G9cM/hUmDNz/6xOvHuOfH5147tKDUNCT/sr5tEaLm5ePUmRdpoc5PZa04q1KGJ0rxf6T55E5pQ8Qh2EFr1yPyLh12wiSTRsnHwXwVsosbNNBBN3HdBOMklTQx2VJNDHpi19G+z4d1evlS8yDqNZe9QyRFKEsTd+xPg3ob3j/ObpYDOtXoMaw8fXWbvyG4MJTz7nWG5YL2s5oWSAFZ4mifgwOmM/OuTO/uholelws25k/a3+O/s5Xd/HOugBvpeb5azGLfMHrGvu6J9DSIVI28hfbaFm2+smjyLdS+5PWV2+hM9EQLgaw/euGx4Qhzo2nagLwl9+hNOZ2gjtNHJxJtbQJTNrE90d3mX2/yfxHzh8FiiAiraxiZCgdUQeEZbZNlAwQLHIYWazSqgmRhf4D1LGMMrak=`;
  const exponent = `AQAB`;

  /* *******************************************TPP-2619 changes**************************************** */
  const [loginOptions, setLoginOptions] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<"Password" | "SSO" | "SAML" | "">("");
  const [loginmethods, { isLoading }] = useLoginmethodsMutation();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:900px)");
  const [isMethodFetched, setIsMethodFetched] = useState<boolean>(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile>(null);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [idToken, setIdToken] = useState();
  const [loginMethodsResponse, setLoginMethodsResponse] = useState([]);
  const [isEmailDisabled, setIsEmailDisabled] = useState<boolean>(false);
  const redirectPath = `${ROUTES.DASHBOARD}?theme=0`;
  const search = location.state?.from?.search
  const from = location.state?.from?.pathname ? `${location.state?.from?.pathname}${search ?? ""}` : redirectPath;
  const isRTL = localStorage.getItem("isRtl") === "true";
  /* *******************************************TPP-2619 changes - ends**************************************** */
  const MIN_PASSWORD_LENGTH = 8;
  const PASSWORD_REGEX = /[!@#$%^&*]/;
  const NO_WHITESPACE_REGEX = /^\S*$/;
  const UPPERCASE_REGEX = /[A-Z]/;
  const NUMBER_REGEX = /\d/;

  const convertXmlToPem = (modulus, exponent) => {
    const decodedModulus = forge.util.decode64(modulus);
    const decodedExponent = forge.util.decode64(exponent);
    const publicKey = forge.pki.setRsaPublicKey(
      new forge.jsbn.BigInteger(forge.util.bytesToHex(decodedModulus), 16),
      new forge.jsbn.BigInteger(forge.util.bytesToHex(decodedExponent), 16)
    );
    return forge.pki.publicKeyToPem(publicKey);
  };

  const encryptEmail = (email, pemKey) => {
    const publicKey = forge.pki.publicKeyFromPem(pemKey);
    const encrypted = publicKey.encrypt(email, 'RSAES-PKCS1-V1_5');
    return forge.util.encode64(encrypted);
  };

  const handleEncrypt = (email) => {
    const pemKey = convertXmlToPem(modulus, exponent);
    const encrypted = encryptEmail(email, pemKey);
    const sanitizedBase64 = encrypted.replace(/\r?\n|\r/g, '');
    return sanitizedBase64;
  };
  /* *******************************************TPP-2619 changes - starts**************************************** */
  const emailvalidationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('invalid_email'))
      .required(t('email_required')),
  })

  const passwordvalidationSchema = Yup.object().shape({
    password: Yup.string()
      .required(t('password_required'))
      .min(MIN_PASSWORD_LENGTH, t('password_min_length', { min: MIN_PASSWORD_LENGTH }))
      .matches(PASSWORD_REGEX, t('password_special_char'))
      .matches(NO_WHITESPACE_REGEX, t('password_no_whitespace'))
      .matches(UPPERCASE_REGEX, t('password_uppercase'))
      .matches(NUMBER_REGEX, t('password_number'))
  })

  const formikLoginMethod = useFormik({
    initialValues: {
      email: "",
      loginMethod: "",
    },
    validationSchema: emailvalidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await loginmethods({
          Context: {
            UserAgent: "Mozilla/5.0",
            TrackingId: "de2ade5e6a0b4c75b44ab079f4f0b0c",
            TransactionId: "de2ade5e6a0b4c75b44ab079f4f0b1b",
            IpAddress: "192.168.1.1",
            CountryCode: "IN",
          },
          Request: handleEncrypt(JSON.stringify({ Email: values.email })),
        }).unwrap();

        const options = response?.Response || [];
        if (options.length === 0) {
          enqueueSnackbar(t('no_login_methods_available'), { variant: "error" });
        } else {
          setLoginOptions(options.map((option) => option.ModeOfLogin));
          setLoginMethodsResponse(response.Response);
          setIsMethodFetched(true);
          setIsEmailDisabled(true);
        }
      } catch (error) {
        setIsDisabled(true)
        customEnqueueSnackbar(error?.data?.Context?.Message ? error?.data?.Context?.Message : t("failed_to_fetch_login"), 'error', 'left', 1000);
        setTimeout(() => {
          setIsDisabled(false);
        }, 1000);
      }
    },
  });
  const formikPassword = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: passwordvalidationSchema,
    onSubmit: async () => {
    },
  });

  const handleLoginMethodSelection = async (method: "Password" | "SSO" | "SAML") => {
    setSelectedOption(method);
    formikLoginMethod.setFieldValue("loginMethod", method);
    if (method === "SSO" || method === "SAML") {
      handleFinalLoginWithSSO(method);
    }
  };

  const handleFinalLoginWithSSO = async (method: "Password" | "SSO" | "SAML") => {
    try {
      const ssoModeOflogin = loginMethodsResponse.find((option) => option.ModeOfLogin === method);
      const finalPayload = {
        "SSO": method === "SSO" ? { Provider: ssoModeOflogin?.LoginProvider } : null,
        "Saml": method === "SAML" ? { Provider: ssoModeOflogin?.LoginProvider } : null,
        "Password": null,
        "SourceId": ssoModeOflogin?.SourceId,
      };
      const encryptedLoginResponsePayload = handleEncrypt(JSON.stringify(finalPayload));
      const requestLoginPayload = {
        Context: {
          UserAgent: "Mozilla/5.0",
          TrackingId: "de2ade5e6a0b4c75b44ab079f4f0b0c",
          TransactionId: "de2ade5e6a0b4c75b44ab079f4f0b1b",
          IpAddress: "192.168.1.1",
          CountryCode: "IN",
        },
        Request:
          encryptedLoginResponsePayload,

      };

      const response = await login(requestLoginPayload).unwrap();
      try {

        if (response?.Context.StatusCode === 302) {
          if (response?.Response?.Url) {
            window.location.assign(response?.Response?.Url);
          } else {
            enqueueSnackbar(response?.statusDescription || "Login failed", { variant: "error" });
          }
          return;
        } else {
          enqueueSnackbar(response?.statusDescription || "Login failed", { variant: "error" });
        }
      } catch (error) {
        console.error(error, "login error")
        enqueueSnackbar("Error while generating access token. Please try again.", { variant: "error" });
        resetLoginComponent();
      }
    } catch (error) {
      enqueueSnackbar(error?.data?.Context?.Message, { variant: "error" });
      resetLoginComponent()
    }
  };

  const handleFinalLogin = async () => {
    setIsLoginLoading(true)
    try {
      await passwordvalidationSchema.validate(
        { password: formikPassword.values.password },
        { abortEarly: false }
      );
      const finalPayload = {
        "SSO": { "Provider": "" },
        "Saml": { "Provider": "" },
        "Password": {
          "Email": formikLoginMethod.values.email,
          "Password": formikPassword.values.password,
        },
        "SourceId": "",
      };
      const encryptedLoginResponsePayload = handleEncrypt(JSON.stringify(finalPayload));

      const requestLoginPayload = {
        Context: {
          UserAgent: "Mozilla/5.0",
          TrackingId: "de2ade5e6a0b4c75b44ab079f4f0b0c",
          TransactionId: "de2ade5e6a0b4c75b44ab079f4f0b1b",
          IpAddress: "192.168.1.1",
          CountryCode: "IN",
        },
        Request:
          encryptedLoginResponsePayload,

      };

      const response = await login(requestLoginPayload).unwrap();
      try {
        if (response?.Context.StatusCode === 200) {
          if (response.Context.StatusCode === 200) {

            const profilesList = response?.Response?.Profiles || [];
            const idToken = response?.Response?.IdToken;

            if (profilesList.length > 0) {
              if (profilesList.length === 1) {
                setProfiles(profilesList);
                setIdToken(idToken);
                sendCreateTokenRequest({
                  ProfileId: profilesList[0]?.ProfileId,
                  idToken: idToken
                });
              } else {
                setProfiles(profilesList);
                setIdToken(idToken);
                setOpenProfileDialog(true);
              }
            }
          }
        }
        else {
          enqueueSnackbar(response?.statusDescription || "Login failed", { variant: "error" });
        }
        setIsLoginLoading(false)
      } catch (error) {
        console.error(error, "error")
        enqueueSnackbar("Error while generating access token. Please try again.", { variant: "error" });
        resetLoginComponent();
        setIsLoginLoading(false)
      }
    } catch (error) {
      setIsLoginLoading(false)
      enqueueSnackbar(error?.data?.Context?.Message, { variant: "error" });
      resetLoginComponent()
    }
  };

  const sendCreateTokenRequest = async ({ ProfileId, idToken }) => {
    try {
      const createTokenPayload = {
        IdToken: idToken,
        ProfileId: ProfileId,
      };
      const encryptedTokenPayload = handleEncrypt(
        JSON.stringify(createTokenPayload)
      );
      const tokenPayload = {
        Context: {
          UserAgent: "Mozilla/5.0",
          TrackingId: "da865192-197d-4c63-aaa6-568f6001abf6",
          TransactionId: "dd2445d9-bfb2-48c6-9311-cfbba3c32375",
          IpAddress: "192.168.1.1",
          CountryCode: "IN",
        },
        Request: encryptedTokenPayload,
      };
      const tokenResponse = await createToken(tokenPayload).unwrap();
      Cookies.set('jeetat', JSON.stringify({
        token: tokenResponse?.Response?.Auth1dot0?.AccessToken,
        Expiry: tokenResponse?.Response?.Auth1dot0?.ExpiryAt
      }));

      Cookies.set('jeetrt', JSON.stringify({
        token: tokenResponse?.Response?.RefreshToken,
        Expiry: tokenResponse?.Response?.RefreshTokenExpiryAt
      }));
      if (tokenResponse?.Context?.StatusCode === 200 && (tokenResponse?.Response?.AccessDetail?.AccessToken !== "" || tokenResponse?.Response?.AccessDetail?.AccessToken !== null)) {
        sessionStorage.setItem("accessToken", tokenResponse?.response?.accessToken);
        navigate(from, { replace: true });
      } else {
        enqueueSnackbar("Token creation failed. Please try again.", { variant: "error" });
      }
    } catch (tokenError) {
      if (tokenError?.data?.Context?.StatusCode === 400) {
        enqueueSnackbar(tokenError?.data?.Context?.Message, { variant: "error" });

      } else if (tokenError?.data?.Context?.StatusCode) {
        return;
      }
      else {
        enqueueSnackbar("Error on creating Token", { variant: "error" });
      }
    }
  };

  const handleProfileSelection = () => {
    setOpenProfileDialog(false);
    sendCreateTokenRequest({
      ProfileId: selectedProfile?.ProfileId,
      idToken: idToken
    });
  }

  const resetLoginComponent = () => {
    formikLoginMethod.resetForm();
    formikPassword.resetForm();
    setSelectedOption("");
    setIsEmailDisabled(false);
    setLoginOptions([]);
    setIsMethodFetched(false);
    setSelectedProfile(null);
    setOpenProfileDialog(false);
  };

  return (
    <div>
      <Box display={"flex"} sx={{ m: 2 }} justifyContent="flex-end">
        <LanguageSwitcher />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" padding={isSmallScreen ? 2 : 2}>
        <Box component="img" src={MusafirLogo} alt="Musafir Logo" sx={{ width: isSmallScreen ? 150 : 175, marginBottom: 8, marginTop: 4 }} />

        <Box sx={{
          display: "flex", flexDirection: "column", alignItems: "center", width: isSmallScreen ? "90%" : isMediumScreen ? "70%" : "40%",
          maxWidth: "500px",
          padding: isSmallScreen ? 2 : 4,
          borderRadius: isSmallScreen ? 0 : 2,
        }}>
          <Typography sx={{ fontWeight: 600, fontSize: isSmallScreen ? "24px" : "32px", marginBottom: 1 }}>{t("welcome_back")}</Typography>
          <Typography color="#6D6D6D" fontSize={isSmallScreen ? "14px" : "16px"} textAlign="center">
            {t("enter_login_details")}
          </Typography>

          <Box sx={{ width: "100%", mt: 3 }}>
            <form onSubmit={formikLoginMethod.handleSubmit}>
              <Typography sx={{ fontWeight: 400, fontSize: "14px", textAlign: "center", color: "#6D6D6D", width: "100%", marginBottom: -2 }}>
                {t("work_email")}
              </Typography>
              <TextField
                type="email"
                fullWidth
                margin="normal"
                variant="outlined"
                {...formikLoginMethod.getFieldProps("email")}
                error={formikLoginMethod.touched.email && Boolean(formikLoginMethod.errors.email)}
                helperText={formikLoginMethod.touched.email && formikLoginMethod.errors.email}
                InputProps={{ inputProps: { style: { textAlign: "center" }, disabled: isEmailDisabled } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "6px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.customColors?.lightBlue[7],
                  },
                }}
              />
              {!isMethodFetched && (
                <Button
                  id="login-button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, bgcolor: "#0087FA", color: "white", height: 50, textTransform: "none", borderRadius: "6px" }}
                  type="submit"
                  disabled={isLoading || isDisabled}
                >
                  {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : t("choose_login_methods")}
                </Button>
              )}
            </form>

            {!selectedOption && (
              <Box display="flex" flexDirection="column" gap={2} mt={2}>
                {loginOptions.includes("Password") && (
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ bgcolor: "white", color: "black", border: "1px solid #ccc", height: 50, textTransform: "none", borderRadius: "6px" }}
                    onClick={() => handleLoginMethodSelection("Password")}
                  >
                    {t("login_with_password")}
                  </Button>
                )}
                {/* Future use */}
                {isMethodFetched &&
                  loginOptions.some(
                    (option) => option.toLowerCase() === "sso" || option.toLowerCase() === "saml"
                  ) && (
                    <Divider sx={{ my: 3 }} />
                  )}
                {loginOptions.includes("SSO") && (
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ bgcolor: "white", color: "black", border: "1px solid #ccc", height: 50, textTransform: "none", borderRadius: "6px" }}
                    onClick={() => handleLoginMethodSelection("SSO")}
                  >
                    Login with Google
                    <img src={GoogleLogo} alt="Google Logo" style={{ width: 20, height: 18, [isRTL ? "paddingRight" : "paddingLeft"]: 5, [isRTL ? "marginRight" : "marginLeft"]: '1%', }} ></img>
                  </Button>
                )}
                {loginOptions.some(option => option.toLowerCase() === "saml") && (
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ bgcolor: "white", color: "black", border: "1px solid #ccc", height: 50, textTransform: "none", borderRadius: "6px" }}
                    onClick={() => handleLoginMethodSelection("SAML")}
                  >
                    {t("sso_login")}
                    {/* <img src={GoogleLogo} alt="Google Logo" style={{ width: 18, height: 14, paddingLeft: 5,marginLeft:'1%' }} ></img>  */}
                  </Button>
                )}
              </Box>
            )}
            {selectedOption === "Password" && (
              <form onSubmit={formikPassword.handleSubmit}>
                <Typography sx={{ fontWeight: 400, fontSize: "14px", textAlign: "center", color: "#6D6D6D", width: "100%", marginBottom: -2 }}>
                  {t("password_*")}
                </Typography>
                <TextField
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  {...formikPassword.getFieldProps("password")}
                  error={formikPassword.touched.password && Boolean(formikPassword.errors.password)}
                  helperText={formikPassword.touched.password && formikPassword.errors.password}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "6px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.customColors?.lightBlue[7],
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                    inputProps: { style: { textAlign: "center" } },
                  }}
                />
                {selectedOption === "Password" && (
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, bgcolor: theme.palette.customColors?.blue[10], color: "white", height: 50, textTransform: "none", borderRadius: "6px" }} onClick={handleFinalLogin} disabled={isLoginLoading}> {isLoginLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : t("login")}
                  </Button>
                )}
              </form>
            )}
            <Dialog open={openProfileDialog} onClose={() => setOpenProfileDialog(false)}>
              <DialogTitle>{t('select_profile')}</DialogTitle>
              <DialogContent sx={{ width: 300 }}>
                <List>
                  {profiles.map((profile) => {
                    console.log('profile', profile.SourceName, profile.ProfileId, selectedProfile?.ProfileId === profile.ProfileId)
                    return (
                      <ListItem key={profile.ProfileId} disablePadding>
                        <ListItemButton
                          key={profile.ProfileId} selected={selectedProfile?.ProfileId === profile.ProfileId} onClick={() => setSelectedProfile(profile)}
                          sx={(theme) => ({
                            paddingLeft: 1,
                            borderRadius: "6px",
                            backgroundColor: selectedProfile?.ProfileId === profile.ProfileId 
                              ? theme.palette.customColors?.blue[4] 
                              : "transparent",
                            color: selectedProfile?.ProfileId === profile.ProfileId ? theme.palette.primary.contrastText : "inherit",
                            cursor: 'pointer',
                            "&:hover": {
                              backgroundColor: selectedProfile?.ProfileId === profile.ProfileId
                                ? theme.palette.customColors?.blue[10]
                                : theme.palette.customColors?.blue[0],
                            },
                            "&.Mui-selected": {
                              backgroundColor: theme.palette.customColors?.blue[10],
                              "&:hover": {
                                backgroundColor: theme.palette.customColors?.blue[10],
                              },
                            },
                          })}>
                          <ListItemText primary={`${profile.SourceName} `} />
                        </ListItemButton>
                      </ListItem>
                    )
                  })}
                </List>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => { resetLoginComponent() }} sx={{ textTransform: "none", color:theme.palette.customColors?.blue[10] }}>{t("cancel")}</Button>
                <Button onClick={handleProfileSelection} disabled={!selectedProfile} sx={{ textTransform: "none", color:theme.palette.customColors?.blue[10] }}>{t("continue")}</Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
/* *******************************************TPP-2619 changes - ends**************************************** */
export default Login;
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Cookies from 'js-cookie';
import forge from 'node-forge';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingScreen from '../../../components/core-module/loading-screen/LoadingScreen';
import { useAuthProfilesMutation, useCreateTokenMutation } from '../../../store/musafirLoginApi';
import { ROUTES } from '../../../utility/constant';
import { Profile } from '../../../utility/types/login/Login'

const ProfileSelection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authProfile, { isLoading }] = useAuthProfilesMutation();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile>(null);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [idToken, setIdToken] = useState(null);
  const { t } = useTranslation();
  const [createToken] = useCreateTokenMutation();
  const modulus = `zktSGmyKa5SR8HO540HKTdgDPVmXafgGFrf4OYtRNApRssnt0hGoMU7Jitc/SVWbPstFshIi5XblbDL2NXWYhZtj4PWL4SKc1/bM02xxabPw/eFr3XAAPCF62WxAVPsJBbEoAB0AcOCeIcGHb+tzLtXQJAvOuIBsKLQiiB7/c9ltt5AVVM4si1RC3JsxpqcGTkgwnh+FMg8CFvLdHjh/oi789wj8zoGWLAdYSBBa8IoQgTuzZt1tft2LF0y4Ck3yT8F9TX5GbAiVXb0G9cM/hUmDNz/6xOvHuOfH5147tKDUNCT/sr5tEaLm5ePUmRdpoc5PZa04q1KGJ0rxf6T55E5pQ8Qh2EFr1yPyLh12wiSTRsnHwXwVsosbNNBBN3HdBOMklTQx2VJNDHpi19G+z4d1evlS8yDqNZe9QyRFKEsTd+xPg3ob3j/ObpYDOtXoMaw8fXWbvyG4MJTz7nWG5YL2s5oWSAFZ4mifgwOmM/OuTO/uholelws25k/a3+O/s5Xd/HOugBvpeb5azGLfMHrGvu6J9DSIVI28hfbaFm2+smjyLdS+5PWV2+hM9EQLgaw/euGx4Qhzo2nagLwl9+hNOZ2gjtNHJxJtbQJTNrE90d3mX2/yfxHzh8FiiAiraxiZCgdUQeEZbZNlAwQLHIYWazSqgmRhf4D1LGMMrak=`;
  const exponent = `AQAB`;
 const location = useLocation();

  const convertXmlToPem = (modulus: string, exponent: string) => {
    const decodedModulus = forge.util.decode64(modulus);
    const decodedExponent = forge.util.decode64(exponent);
    const publicKey = forge.pki.setRsaPublicKey(
      new forge.jsbn.BigInteger(forge.util.bytesToHex(decodedModulus), 16),
      new forge.jsbn.BigInteger(forge.util.bytesToHex(decodedExponent), 16)
    );
    return forge.pki.publicKeyToPem(publicKey);
  };

  const encryptEmail = (email: string, pemKey: string) => {
    const publicKey = forge.pki.publicKeyFromPem(pemKey);
    const encrypted = publicKey.encrypt(email, 'RSAES-PKCS1-V1_5');
    return forge.util.encode64(encrypted);
  };

  const handleEncrypt = (email: string) => {
    const pemKey = convertXmlToPem(modulus, exponent);
    const encrypted = encryptEmail(email, pemKey);
    const sanitizedBase64 = encrypted.replace(/\r?\n|\r/g, '');

    return sanitizedBase64;
  };

  const autProfileAPI = async (code: string, state: string) => {
    const requestLoginPayload = {
      Context: {
        UserAgent: "Mozilla/5.0",
        TrackingId: "de2ade5e6a0b4c75b44ab079f4f0b0c",
        TransactionId: "de2ade5e6a0b4c75b44ab079f4f0b1b",
        IpAddress: "192.168.1.1",
        CountryCode: "IN",
      },
      Request: {
        Code: code,
        State: state
      }
    };
    try {
      const response = await authProfile(requestLoginPayload).unwrap();
      if (response?.Context.StatusCode === 200) {
        const profilesList = response?.Response?.Profiles || [];
        const idToken = response?.Response?.IdToken;
        setLoading(false);

        if (profilesList.length > 0) {
          if (profilesList.length === 1) {
            setProfiles(profilesList);
            setIdToken(idToken);
            sendCreateTokenRequest({
              ProfileId: profilesList[0].ProfileId,
              idToken: idToken
            });
          } else {
            setProfiles(profilesList);
            setIdToken(idToken);
            setOpenProfileDialog(true);
          }
        } else {
          enqueueSnackbar("No profiles found", { variant: "error" });
          const redirectPath = location.state?.from || ROUTES.LOGIN;
          navigate(redirectPath, { replace: true });
          setLoading(false);
        }
      }
    }
    catch (error) {
      console.error("Profile Selection Error", error);
      enqueueSnackbar("No profiles found", { variant: "error" });
    }
  }

  const handleProfileSelection = () => {
    if (selectedProfile) {
      setOpenProfileDialog(false);
      sendCreateTokenRequest({
        ProfileId: selectedProfile.ProfileId,
        idToken: idToken
      });
    }
  };

  const handleCancel = () => {
    setOpenProfileDialog(false);
    const redirectPath = ROUTES.LOGIN;
    navigate(redirectPath, { replace: true });
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

      if (tokenResponse?.Context?.StatusCode === 200 && (tokenResponse.Response?.AccessDetail?.AccessToken !== "" || tokenResponse.Response?.AccessDetail?.AccessToken !== null)) {

        Cookies.set('jeetat', JSON.stringify({
          token: tokenResponse?.Response?.Auth1dot0?.AccessToken,
          Expiry: tokenResponse?.Response?.Auth1dot0?.ExpiryAt
        }));

        Cookies.set('jeetrt', JSON.stringify({
          token: tokenResponse?.Response?.RefreshToken,
          Expiry: tokenResponse?.Response?.RefreshTokenExpiryAt
        }));
        const redirectPath = location.state?.from || `${ROUTES.DASHBOARD}?theme=0`;
        navigate(redirectPath, { replace: true });
        setLoading(false);
      } else {
        enqueueSnackbar("Token creation failed. Please try again.", { variant: "error" });
      }
    } catch (tokenError) {
      if (tokenError.data.Context.StatusCode === 400) {
        enqueueSnackbar(tokenError?.data?.Context?.Message, { variant: "error" });
      } else if (tokenError.data.Context.StatusCode) {
        enqueueSnackbar(tokenError?.data?.Context?.Message, { variant: "error" });
      }
      else {
        enqueueSnackbar("Error on creating Token", { variant: "error" });
      }
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');
    if (code && state) {
      <LoadingScreen isLoading={isLoading} />
      const resp = autProfileAPI(code, state);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      setLoading(false);
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [navigate]);
  if (loading) {
    <LoadingScreen isLoading={isLoading} />
  }

  return (
    <div>
      <Dialog open={openProfileDialog} onClose={() => setOpenProfileDialog(false)}>
        <DialogTitle>{t('select_profile')}</DialogTitle>
        <DialogContent>
          <List>
            {profiles.map((profile) => (
              <ListItem key={profile.ProfileId} disablePadding>
                <ListItemButton
                  key={profile.ProfileId}
                  selected={selectedProfile?.ProfileId === profile.ProfileId}
                  onClick={() => setSelectedProfile(profile)}
                  sx={(theme) => ({
                    backgroundColor:
                      selectedProfile?.ProfileId === profile.ProfileId
                        ? theme.palette.primary.main
                        : 'transparent',
                    color:
                      selectedProfile?.ProfileId === profile.ProfileId
                        ? theme.palette.primary.contrastText
                        : 'inherit',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor:
                        selectedProfile?.ProfileId === profile.ProfileId
                          ? theme.palette.customColors?.blue[10]
                          : theme.palette.customColors?.blue[0],
                    },
                  })}
                >
                  <ListItemText primary={`${profile.SourceName}`} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} sx={{ textTransform: 'none' }}>
            {t('cancel')}
          </Button>
          <Button
            onClick={handleProfileSelection}
            disabled={!selectedProfile}
            sx={{ textTransform: 'none' }}
          >
            {t('continue')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ProfileSelection;

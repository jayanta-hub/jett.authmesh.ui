import { Box, Card, CardActionArea, CardContent, Typography, Modal, Button, Pagination, SelectChangeEvent, MenuItem, Select, InputLabel, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./EmailTemplateViewer.css";
import { theme } from "../../theme";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from "react";
import { ROUTES } from "../../utility/constant";
import { useNavigate } from "react-router-dom";
import { useFetchEmailTemplatesMutation } from "../../store/musafirNotificationApi";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { RootState } from '../../store/store';
import LoadingScreen from "../../components/core-module/loading-screen/LoadingScreen";

interface TemplateItem {
  templateName: string;
  subject: string;
  body: string;
  templateTypeID: number;
  notificationTypeID: number;
  settingID: number;
  linkedEntityType: string;
  linkedEntityID: number;
  isActive: number;
}


/**
 * EmailTemplateViewer is a React functional component for viewing email templates.
 * It renders a card-based view of saved email templates with a preview of the HTML.
 * It also renders a button to create a new template and a modal to display the full HTML
 * of a selected template.
 * @returns A React component that displays a list of email templates and allows the
 * user to view the full HTML of a selected template.
 */
const EmailTemplateViewer = () => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [html, setHtml] = useState<string>()
  const [fetchEmailTemplates] = useFetchEmailTemplatesMutation()
  const totalCount = useSelector((state: RootState) => state?.notificationSlice?.fetchTemplateData?.pagination?.totalCount);
  const { fetchTemplateData, fetchLoading } = useSelector((state: RootState) => state.notificationSlice);
  const [page, setPage] = useState<number>(1)
  const [pageSizeNumber, setPageSizeNumber] = useState<number>(5)
  const handleOpen = (html: string) => {
    setOpen(true);
    setHtml(html)
  }
  const fetchTemplates = async () => {
    const payload = {
      "templateID": 0,
      "pagination": {
        "pageNumber": page,
        "pageSize": pageSizeNumber
      }
    }
    try {
      const response = await fetchEmailTemplates({ patch: payload }).unwrap();
      if (response?.status?.statusCode == "SC00001") {

      } else {

      }
    } catch (error: any) {

    }
  }

  useEffect(() => {
    fetchTemplates()
  }, [page, pageSizeNumber])

  const handleClose = () => setOpen(false);
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    const newPageSize = event.target.value as number;
    setPageSizeNumber(newPageSize);
    setPage(1);
  };

  if (fetchLoading) {
    return (
      <LoadingScreen isLoading={fetchLoading} />
    );
  }
  return (
    <Box className="flex flex-col p-2">

      {!fetchTemplateData?.emailNotifications || fetchTemplateData.emailNotifications.length <= 0 ? (
        <Box className="flex justify-center items-center h-screen flex-col" data-testid="no-template-message">
          <Typography>{t("currently_you_do_not_have_any_saved_templates")}</Typography>
          <Button variant="outlined" sx={{ textTransform: 'none' }} onClick={() => navigate(ROUTES.EMAILTEMPLATEEDITOR)}>
            {t("create_new_template")}
          </Button>
        </Box>
      ) : (
        <>
          <Box className="flex justify-end">
            <Button
              variant="outlined"
              sx={{ margin: '5px' }}
              className="button-submit"
              onClick={() => navigate(ROUTES.EMAILTEMPLATEEDITOR)}
            >
              {t("create_new_template")}
            </Button>
          </Box>

          <Grid container className="mb-24 md:mb-0" spacing={2}>
            {fetchTemplateData.emailNotifications.map((item: TemplateItem, index: number) => (
              <Grid size={{ xs: 12, md: 4, sm: 6, lg: 3 }} key={index}>
                <Card className="card" onClick={() => handleOpen(item?.body)}>
                  <CardActionArea>
                    <Box
                      className="h-[350px] p-3 overflow-hidden max-w-full max-h-full"
                      sx={{ pointerEvents: "none" }}
                    >
                      <iframe
                        style={{ height: "100%", width: "100%" }}
                        srcDoc={item?.body}
                        scrolling="no"
                      />
                    </Box>
                    <CardContent sx={{ padding: 2 }}>
                      <Typography sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                        {item?.templateName || "Template Name"}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                        {item?.subject || "Subject"}
                      </Typography>
                    </CardContent>
                    <Box className="hover-preview">
                      <OpenInNewIcon sx={{ color: theme.palette.primary.main, fontSize: "40px" }} />
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box className="fixed bottom-0 left-0 z-50 md:static bg-white w-full p-2">
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <InputLabel htmlFor="rows-per-page-select" sx={{ marginRight: 1 }}>
                {t('rows_per_page')}
              </InputLabel>
              <Select
                id="rows-per-page-select"
                size="small"
                value={pageSizeNumber}
                onChange={handleRowsPerPageChange}
                sx={{ minWidth: 80 }}
              >
                {[5, 10, 20].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box className="flex justify-center items-center md:justify-start" data-testid="pagination-container">
              <Pagination
                page={page}
                onChange={handlePageChange}
                count={Math.ceil(totalCount / pageSizeNumber)}
                color="primary"
                size="small"
                data-testid="pagination-container"
              />
            </Box>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            role="dialog"
          >
            <Box className="modal-content w-[90%] md:w-[70vw] lg:w-[50vw]">
              <Box className="flex justify-end">
                <IconButton onClick={handleClose}>
                  <Typography>Close</Typography>
                </IconButton>
              </Box>
              <iframe
                srcDoc={html || ""}
                className="iframe"
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="email-template-preview"
              />
            </Box>
          </Modal>
        </>
      )}



    </Box>

  );
};

export default EmailTemplateViewer;

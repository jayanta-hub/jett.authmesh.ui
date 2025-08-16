import { Accordion, AccordionDetails, AccordionSummary, Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useState, useCallback, useRef, useEffect } from 'react'
import EmailEditor from 'raven-react-email-editor'
import { useNavigate } from 'react-router-dom'
import { ArrowBack, ExpandMore } from '@mui/icons-material'
import Grid from '@mui/material/Grid2';
import { useTranslation } from 'react-i18next'
import { enqueueSnackbar } from 'notistack';
import { ROUTES } from '../../../utility/constant'
import { useCreateEmailTemplateMutation } from '../../../store/musafirNotificationApi'
import LoadingScreen from '../loading-screen/LoadingScreen'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
interface SavedState {
  state: string;
  html: string;
}
interface EmailEditorRef {
  fetchState: () => void;
}

/**
 * EmailTemplateEditor is a React functional component for creating and editing email templates.
 * It is a page component that is accessible via the route /emailtemplateeditor.
 * It renders an email template editor with a subject line, template name, and the ability to add variables.
 * It also renders a button to save the template.
 */
const EmailTemplateEditor = () => {
  const { t } = useTranslation()
  const [createEmailTemplate] = useCreateEmailTemplateMutation()
  const editorRef = useRef<EmailEditorRef | null>(null);
  const [savedState, setSavedState] = useState<SavedState>({ state: '', html: `` })
  const [isLoaded, setIsLoaded] = useState(false)
  const [templateName, setTemplateName] = useState<string>("")
  const [emailSubject, setEmailSubject] = useState<string>("")
  const [entityType, setEntityType] = useState<string>("")
  const { createLoading } = useSelector((state: RootState) => state.notificationSlice);
  const [isValdation, setIsValdation] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    templateName: "",
    emailSubject: "",
    entityType: "",
    html: ""
  })

  const navigate = useNavigate()

  const onLoad = () => setIsLoaded(true)

  const onFetched = useCallback((state: string, html: string) => {
    setSavedState({ state, html });
    setIsLoaded(true);
  }, []);



  /**
   * Validates the fields of the email template editor and sets the errors state accordingly.
   * Checks that the template name, email subject, entity type, and html are not empty.
   * Returns true if all fields are valid, false otherwise.
   */
  const validateFields = () => {
    let valid = true
    const newErrors = { templateName: "", emailSubject: "", entityType: "", html: "" }

    if (!templateName) {
      newErrors.templateName = t("template_name_required")
      valid = false
    }

    if (!emailSubject) {
      newErrors.emailSubject = t("email_subject_required")
      valid = false
    }

    if (!entityType) {
      newErrors.entityType = t("entity_type_required")
      valid = false
    }
    if (isTableEmpty(savedState?.html)) {
      newErrors.html = t("html_required");
      valid = false;
    }
    setErrors(newErrors)
    return valid
  }


  useEffect(() => {
    if (isSubmitted) {
      setErrors({
        templateName: '',
        emailSubject: '',
        entityType: '',
        html: ''
      });
    }
  }, [t]);

  useEffect(() => {
    if (isSubmitted) {
      validateFields();
    }
  }, [templateName, emailSubject, entityType, savedState, isLoaded, t, isSubmitted]);


  /**
   * Asynchronously creates a new email template after validating the fields.
   * Constructs a payload with template details and sends a request to create the template.
   * Displays a success or error notification based on the server response.
   * Navigates to the email template route upon successful creation.
   */
  const createTemplate = async () => {
    if (!validateFields()) return;
    const payload = {
      templateName: templateName,
      subject: emailSubject,
      body: savedState?.html ? savedState?.html : "",
      templateTypeID: 1,
      settingID: 2,
      linkedEntityType: entityType,
      linkedEntityID: 3,
      createdBy: 4,
      notificationTypeID: 1
    }
    try {
      const response = await createEmailTemplate({ patch: payload }).unwrap();
      if (response?.status?.statusCode == "SC00001") {
        enqueueSnackbar(response?.status?.statusDescription, {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        }
        )
        navigate(ROUTES.EMAILTEMPLATE)
      } else {
        enqueueSnackbar(response?.status?.statusDescription, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        });
      }
    } catch (error: any) {
      enqueueSnackbar("Something went wrong.", {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
    }
  }
  const handleSavedState = useCallback(() => {
    if (isLoaded) {
      setIsLoaded(false);
      editorRef?.current?.fetchState();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (savedState.html && isLoaded) {
      setIsSubmitted(true);
      const isValid = validateFields();
      if (isValid) {
        setIsValdation(true);
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }
  }, [isLoaded]);
  useEffect(() => {
    if (isValdation && savedState?.html) {
      createTemplate();
      setIsValdation(false);
    }
  }, [isValdation]);
  /**
   * Checks if the given HTML string contains a table with no content.
   * The table is considered empty if it contains no text content and no images.
   * @param html The HTML string to check.
   * @returns True if the table is empty, false otherwise.
   */
  const isTableEmpty = (html: string): boolean => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const tbody = doc.querySelector('tbody');
    if (!tbody) {
      return true;
    }
    const rows = tbody.querySelectorAll('tr');
    for (const row of rows) {
      const cells = row.querySelectorAll('td');
      for (const cell of cells) {
        const textContent = cell.textContent?.trim();
        if (textContent && textContent !== '') {
          return false;
        }
        const image = cell.querySelector('img');
        if (image) {
          return false;
        }
      }
    }
    return true;
  };
  if (createLoading) {
    return (
      <LoadingScreen isLoading={createLoading} />
    );
  }


  return (
    <Box className="flex flex-col p-3">
      <Box className="flex mb-3">
        <Button variant="outlined" sx={{ textTransform: "none" }} onClick={() => navigate(ROUTES.EMAILTEMPLATE)} startIcon={<ArrowBack />}>
          {t("back_to_templates")}
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }} >
          <Typography>
            {t("template_name")}: <span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            onChange={(e) => setTemplateName(e.target.value)}
            size="small"
            id="template-name"
            variant="outlined"
            fullWidth
            value={templateName}
            error={Boolean(errors.templateName) && !templateName}
          />
          {errors.templateName && !templateName && (
            <Typography color="error" sx={{ fontSize: '10px', margin: '7px' }}>
              {errors.templateName}
            </Typography>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} >
          <Box className="flex justify-between">
            <Typography>{t("email_subject")}: <span style={{ color: 'red' }}>*</span></Typography>
            <Typography className="text-gray-500" sx={{ fontSize: '12px' }}>
              {t("email_editor_instruction")}
            </Typography>
          </Box>
          <TextField
            onChange={(e) => setEmailSubject(e.target.value)}
            size="small"
            id="email-subject"
            variant="outlined"
            fullWidth
            value={emailSubject}
            error={Boolean(errors.emailSubject) && !emailSubject}
          />
          {errors.emailSubject && !emailSubject && (
            <Typography color="error" sx={{ fontSize: '10px', margin: '7px' }}>
              {errors.emailSubject}
            </Typography>
          )}</Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography sx={{ marginTop: "8px" }}>{t("entity_type")}: <span style={{ color: 'red' }}>*</span></Typography>
          <Select
            size="small"
            fullWidth
            value={entityType}
            onChange={(e) => setEntityType(e.target.value)}
            error={Boolean(errors.entityType) && !entityType}
          >
            <MenuItem value="Platform">{t("platform")}</MenuItem>
            <MenuItem value="TMC">{t("tmc")}</MenuItem>
            <MenuItem value="Organization">{t("organization")}</MenuItem>
          </Select>
          {errors.entityType && !entityType && (
            <Typography color="error" sx={{ fontSize: '10px', margin: '7px' }}>
              {errors.entityType}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Accordion className='mt-3'>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="editor-content"
          id="editor-header"
        >
          <Typography>{t("email_editor")}<span style={{ color: 'red' }}>*</span></Typography>
        </AccordionSummary>
        <AccordionDetails>
          {errors.html && (
            <Typography color="error" sx={{ fontSize: '10px', margin: '7px' }}>
              {errors.html}
            </Typography>
          )}
          <Box className={`h-screen flex flex-col mt-2 border rounded ${errors.html ? "border-red-500" : "border-gray-300"} p-2`}>
            <Box className="flex justify-between"> <Typography className="text-gray-500" sx={{ fontSize: '12px' }}>
              {t("email_editor_instruction")}
            </Typography>
            </Box>
            <EmailEditor
              state={savedState.state}
              onEditorLoad={onLoad}
              onFetched={onFetched}
              ref={editorRef}
            />
          </Box>

        </AccordionDetails>
      </Accordion>

      <Box className="flex justify-end mt-2">
        <Button variant="outlined" className="button-submit" onClick={handleSavedState}>
          {t("save_the_template")}
        </Button>

      </Box>
    </Box>
  )
}

export default EmailTemplateEditor

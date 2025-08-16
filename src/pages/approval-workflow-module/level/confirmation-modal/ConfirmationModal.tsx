import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
interface ConfirmationModalProps {
  showConfirmModal: boolean;
  onClose: (confirmed: boolean) => void;
}

export const ConfirmationModal = ({
  showConfirmModal,
  onClose
}: ConfirmationModalProps) => (
  <Dialog open={showConfirmModal} onClose={() => onClose(false)}
    sx={{

      zIndex: '99999 !important',
      '& .MuiDialog-root': {
        zIndex: '99999 !important',
      },
      '& .MuiPaper-root': {
        minWidth: 400,
        borderRadius: '18px',
      }
    }}
  >
    <DialogTitle id="alert-dialog-title" sx={{ fontSize: 16, fontWeight: 600, p: '16px 24px 10px 24px', }}>Alert</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description" sx={{ fontSize: 12, fontWeight: 400, color: "#6d6d6d" }}>
        Overriding rights may get impacted by this arrangement.
        Do you wish to continue?
      </DialogContentText>
    </DialogContent>
    <DialogActions sx={{ display: 'flex', justifyContent: "flex-end" }}>
      <Button onClick={() => onClose(false)} sx={{ color: "#676767", textTransform: 'none', fontSize: 16, fontWeight: 500 }}>
        No
      </Button>
      <Button
        onClick={() => onClose(true)}
        sx={{ color: "#0087fa", textTransform: 'none', fontSize: 16, fontWeight: 500 }}
      >
        Yes
      </Button>
    </DialogActions>
  </Dialog>
);
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { NotificationPopupProps } from "./NotificationPopup.props";

export default function NotificationPopup({
  message,
  open,
  handleClose,
}: NotificationPopupProps) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{message}</DialogTitle>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button
          type="button"
          variant="contained"
          onClick={handleClose}
          color="info"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

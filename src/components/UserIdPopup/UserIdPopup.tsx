import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { UserIdPopupProps } from "./UserIdPopup.props";

export default function UserIdPopup({
  open,
  handleClose,
  handleSubmit,
}: UserIdPopupProps) {
  const [userId, setUserId] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleuserIdChange = (e: any) => {
    setUserId(e.target.value);
  };

  const handleuserIdSubmit = () => {
    if (userId === "") {
      setError(true);
    } else {
      setError(false);
      handleSubmit(userId);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Write your userId in game</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="userId"
          label="userId"
          type="text"
          fullWidth
          onChange={handleuserIdChange}
          error={error}
          helperText={error ? "This field is required" : ""}
        />
      </DialogContent>
      <DialogActions>
        <Button
          type="button"
          variant="contained"
          onClick={handleClose}
          color="error"
        >
          Cancel
        </Button>
        <Button type="button" variant="contained" onClick={handleuserIdSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

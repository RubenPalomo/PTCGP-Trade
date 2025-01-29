export interface UserIdPopupProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (userId: string) => void;
}

import { User } from "@/models/user";

export interface ResultPopupProps {
  open: boolean;
  handleClose: () => void;
  users: User[];
}

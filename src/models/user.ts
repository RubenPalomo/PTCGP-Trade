import { Trade } from "./trade";

export interface User {
  _id?: string;
  userId: string;
  trades: Trade[];
  creationDate: Date;
}

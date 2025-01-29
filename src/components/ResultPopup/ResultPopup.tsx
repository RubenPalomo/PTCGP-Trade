import { IconButton, Dialog, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ResultPopupProps } from "./ResultPopup.props";
import { Trade } from "@/models/trade";

export function ResultPopup({ open, handleClose, users }: ResultPopupProps) {
  return (
    <Dialog
      className="result-popup"
      scroll="paper"
      open={open}
      onClose={handleClose}
    >
      <DialogContent
        style={{
          maxHeight: "100vh",
          overflowY: "auto",
        }}
      >
        <div className="result-popup--table">
          {users.length > 0 ? (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead
                style={{
                  position: "sticky",
                  top: "0",
                  backgroundColor: "#f4f4f4",
                }}
              >
                <tr style={{ backgroundColor: "#f4f4f4" }}>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Card Offered
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Card Wanted
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    User ID
                  </th>
                </tr>
              </thead>
              {users.map((user) => (
                <tbody
                  key={user.userId}
                  style={{ maxHeight: "50px", overflowY: "scroll" }}
                >
                  {user.trades.map((trade: Trade) => (
                    <tr
                      key={
                        user.userId + Math.floor(1000 + Math.random() * 9000)
                      }
                    >
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {trade.cardOffered.name}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {trade.cardWanted.name}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {user.userId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          ) : (
            <div>
              <p className="result-popup_message">No exchanges found</p>
              <p className="result-popup_message--minus">Be the first one!</p>
            </div>
          )}

          <IconButton
            onClick={handleClose}
            color="error"
            style={{
              position: "absolute",
              top: "2px",
              right: "2px",
              color: "red",
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}

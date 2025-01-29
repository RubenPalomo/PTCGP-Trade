import { Button } from "@mui/material";
import { addUser, getOffers } from "@/api/callsToApi/callsToApi";
import { SubmitButtonsProps } from "./SubmitButtons.props";
import UserIdPopup from "../UserIdPopup/UserIdPopup";
import { useState } from "react";
import NotificationPopup from "../NotificationPopup/NotificationPopup";
import { ResultPopup } from "../ResultPopup/ResultPopup";
import { User } from "@/models/user";

export default function SubmitButtons({
  selectedCard,
  selectedWantedCard,
}: SubmitButtonsProps) {
  const [openuserIdPopup, setuserIdPopup] = useState<boolean>(false);
  const [openNotificationPopup, setNotificationPopup] =
    useState<boolean>(false);
  const [openResultPopup, setResultPopup] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState<string>("");

  const handleSearchExchanges = async () => {
    if (selectedCard && selectedWantedCard) {
      const mongoDbData = await getOffers(selectedCard, selectedWantedCard);
      if (mongoDbData) {
        setUsers(mongoDbData);
        setResultPopup(true);
      }
    }
  };

  const handleAddExchange = async (userId: string): Promise<void> => {
    if (selectedCard && selectedWantedCard) {
      const response = await addUser(
        userId,
        {
          id: selectedCard.id,
          name: selectedCard.name,
          rarity: selectedCard.rarity,
          image: selectedCard.image,
        },
        {
          id: selectedWantedCard.id,
          name: selectedWantedCard.name,
          rarity: selectedWantedCard.rarity,
          image: selectedWantedCard.image,
        },
      );

      console.log(response);

      if (response) setMessage("Exchange added successfully");
      else setMessage("Error adding the exchange");

      setNotificationPopup(true);
    }
  };

  return (
    <div>
      <Button
        type="button"
        variant="contained"
        className="ptcgp-trade_submit-button"
        onClick={handleSearchExchanges}
      >
        See available exchanges
      </Button>
      <Button
        type="button"
        variant="contained"
        className="ptcgp-trade_submit-button"
        style={{ display: "flex", marginTop: "10px" }}
        onClick={() => setuserIdPopup(true)}
      >
        Add a new exchange
      </Button>
      <UserIdPopup
        open={openuserIdPopup}
        handleClose={() => setuserIdPopup(false)}
        handleSubmit={handleAddExchange}
      />
      <NotificationPopup
        message={message}
        open={openNotificationPopup}
        handleClose={() => setNotificationPopup(false)}
      />
      <ResultPopup
        open={openResultPopup}
        handleClose={() => setResultPopup(false)}
        users={users}
      />
    </div>
  );
}

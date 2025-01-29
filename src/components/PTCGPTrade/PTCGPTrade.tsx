"use client";

import { useEffect, useState } from "react";
import { PokemonCard } from "@/models/pokemonCard";
import { getAllOffers, getData } from "@/api/callsToApi/callsToApi";
import PokeCard from "../PokeCard/PokeCard";
import SubmitButtons from "../SubmitButtons/SubmitButtons";
import { Button } from "@mui/material";
import { ResultPopup } from "../ResultPopup/ResultPopup";
import { User } from "@/models/user";

export default function PTCGPWanted() {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [rarities, setRarities] = useState<string[]>([]);
  const [selectedRarity, setSelectedRarity] = useState<string>("");
  const [selectedWantedCard, setSelectedWantedCard] =
    useState<PokemonCard | null>(null);
  const [selectedOfferedCard, setSelectedOfferedCard] =
    useState<PokemonCard | null>(null);
  const [openResultPopup, setResultPopup] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeRarity = (e: any) => {
    setSelectedRarity(e.target.value);
    setSelectedOfferedCard(null);
    setSelectedWantedCard(null);
  };

  const handleWantedClick = (clickedCard: PokemonCard): void => {
    if (selectedWantedCard && selectedWantedCard.id === clickedCard.id) {
      setSelectedWantedCard(null);
      setSelectedOfferedCard(null);
      setSelectedRarity("");
    } else {
      setSelectedWantedCard(clickedCard);
      setSelectedRarity(clickedCard.rarity);
    }
  };

  const handleOfferClick = (clickedCard: PokemonCard): void => {
    if (selectedOfferedCard && selectedOfferedCard.id === clickedCard.id)
      setSelectedOfferedCard(null);
    else setSelectedOfferedCard(clickedCard);
  };

  const handleGetAllOffers = async () => {
    if (selectedWantedCard) {
      const users = await getAllOffers(selectedWantedCard);

      if (users) setUsers(users);
      setResultPopup(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      const data = result.cards;
      const rarities = result.rarities;

      setCards(data);
      setRarities(rarities);
    };

    fetchData();
  }, []);

  const filteredCards = selectedRarity
    ? cards.filter((card) => card.rarity === selectedRarity)
    : cards;

  return (
    <div>
      <h1 className="ptcgp-trade-title">Pokemon TCG Pocket Cards Trade</h1>
      <div className="ptcgp-trade_pokemon-card-container">
        <div className="ptcgp-trade_rarity-select">
          <label htmlFor="rarity-select">Filter by rarity: </label>
          <select
            id="rarity-select"
            value={selectedRarity}
            style={{ minWidth: "135px", marginLeft: "8px" }}
            onChange={handleChangeRarity}
          >
            <option value="">All</option>
            {rarities.map((rarity: string) => (
              <option key={rarity} value={rarity}>
                {rarity}
              </option>
            ))}
          </select>
        </div>
        {!(selectedWantedCard && selectedOfferedCard) && (
          <p className="ptcgp-trade-subtitle">
            {selectedWantedCard
              ? "Select a card to offer or view all offers"
              : "Select the card you want"}
          </p>
        )}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="ptcgp-trade_card-container">
            {selectedWantedCard ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <PokeCard
                  key={selectedWantedCard.id}
                  card={selectedWantedCard}
                  handleCardClick={handleWantedClick}
                />
                {!selectedOfferedCard && (
                  <Button variant="contained" onClick={handleGetAllOffers}>
                    See all offers
                  </Button>
                )}
              </div>
            ) : (
              filteredCards.map((card: PokemonCard) => (
                <PokeCard
                  key={card.id}
                  card={card}
                  handleCardClick={handleWantedClick}
                />
              ))
            )}
          </div>
          <div
            style={{
              display: selectedWantedCard ? "block" : "none",
              width: "100%",
            }}
          >
            <div className="ptcgp-trade_card-container">
              {selectedOfferedCard ? (
                <PokeCard
                  key={selectedOfferedCard.id}
                  card={selectedOfferedCard}
                  handleCardClick={handleOfferClick}
                />
              ) : (
                filteredCards.map(
                  (card: PokemonCard) =>
                    card !== selectedWantedCard && (
                      <PokeCard
                        key={card.id}
                        card={card}
                        handleCardClick={handleOfferClick}
                      />
                    ),
                )
              )}
            </div>
          </div>
        </div>
        <div className="ptcgp-trade_submit-button-container">
          {selectedOfferedCard && selectedWantedCard && (
            <SubmitButtons
              selectedCard={selectedOfferedCard}
              selectedWantedCard={selectedWantedCard}
            />
          )}
        </div>
      </div>
      <ResultPopup
        open={openResultPopup}
        handleClose={() => setResultPopup(false)}
        users={users}
      />
    </div>
  );
}

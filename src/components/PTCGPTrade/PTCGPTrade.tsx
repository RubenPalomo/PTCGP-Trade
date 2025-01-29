"use client";

import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { PokemonCard } from "@/models/pokemonCard";
import { getData } from "@/api/callsToApi/callsToApi";
import PokeCard from "../PokeCard/PokeCard";
import SubmitButtons from "../SubmitButtons/SubmitButtons";

export default function PTCGPTrade() {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [rarities, setRarities] = useState<string[]>([]);
  const [selectedRarity, setSelectedRarity] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<PokemonCard | null>(null);
  const [selectedTradeCard, setSelectedTradeCard] =
    useState<PokemonCard | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeRarity = (e: any) => {
    setSelectedRarity(e.target.value);
    setSelectedCard(null);
    setSelectedTradeCard(null);
  };

  const handleCardClick = (clickedCard: PokemonCard): void => {
    if (selectedCard && selectedCard.id === clickedCard.id) {
      setSelectedCard(null);
      setSelectedTradeCard(null);
      setSelectedRarity("");
    } else {
      setSelectedCard(clickedCard);
      setSelectedRarity(clickedCard.rarity);
    }
  };

  const handleTradeClick = (clickedCard: PokemonCard): void => {
    if (selectedTradeCard && selectedTradeCard.id === clickedCard.id)
      setSelectedTradeCard(null);
    else setSelectedTradeCard(clickedCard);
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
        <div>
          <label htmlFor="rarity-select">Filter by rarity: </label>
          <select
            id="rarity-select"
            value={selectedRarity}
            style={{ minWidth: "135px" }}
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
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="ptcgp-trade_card-container">
            {selectedCard ? (
              <PokeCard
                key={selectedCard.id}
                card={selectedCard}
                handleCardClick={handleCardClick}
              />
            ) : (
              filteredCards.map((card: PokemonCard) => (
                <PokeCard
                  key={card.id}
                  card={card}
                  handleCardClick={handleCardClick}
                />
              ))
            )}
          </div>
          <div
            style={{
              display: selectedCard ? "block" : "none",
              width: "100%",
            }}
          >
            <div className="ptcgp-trade_card-container">
              {selectedTradeCard ? (
                <PokeCard
                  key={selectedTradeCard.id}
                  card={selectedTradeCard}
                  handleCardClick={handleTradeClick}
                />
              ) : (
                filteredCards.map(
                  (card: PokemonCard) =>
                    card !== selectedCard && (
                      <PokeCard
                        key={card.id}
                        card={card}
                        handleCardClick={handleTradeClick}
                      />
                    ),
                )
              )}
            </div>
          </div>
        </div>
        <div className="ptcgp-trade_submit-button-container">
          {selectedCard && selectedTradeCard && <SubmitButtons />}
        </div>
      </div>
    </div>
  );
}

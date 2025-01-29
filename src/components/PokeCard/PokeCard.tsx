import { Button } from "@mui/material";
import { PokeCardProps } from "./PokeCard.props";

export default function PokeCard({ card, handleCardClick }: PokeCardProps) {
  return (
    <Button
      key={card.id}
      className={"poke-card"}
      onClick={() => handleCardClick(card)}
    >
      <p>{card.name}</p>
      <picture>
        <img className="poke-card-image" src={card.image} alt={card.name} />
      </picture>
    </Button>
  );
}

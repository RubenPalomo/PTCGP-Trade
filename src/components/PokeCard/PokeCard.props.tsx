import { PokemonCard } from "@/models/pokemonCard";

export interface PokeCardProps {
  card: PokemonCard;
  handleCardClick: (card: PokemonCard) => void;
}

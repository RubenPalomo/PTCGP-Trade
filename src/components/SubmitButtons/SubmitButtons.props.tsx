import { PokemonCard } from "@/models/pokemonCard";

export interface SubmitButtonsProps {
  selectedCard: PokemonCard | null;
  selectedWantedCard: PokemonCard | null;
}

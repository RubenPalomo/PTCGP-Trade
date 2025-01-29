import { PokemonCard } from "./pokemonCard";

export interface Trade {
  cardOffered: PokemonCard;
  cardWanted: PokemonCard;
}

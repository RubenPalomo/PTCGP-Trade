import { PokemonCard } from "@/models/pokemonCard";

type GetDataResult = { cards: PokemonCard[]; rarities: string[] };

export const getData = async (): Promise<GetDataResult> => {
  const allowedRarities = ["Common", "Uncommon", "Rare", "Rare EX", "Full Art"];
  const response = await fetch(
    "https://raw.githubusercontent.com/chase-manning/pokemon-tcg-pocket-cards/main/v2.json"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  const cards: PokemonCard[] = data.filter((card: PokemonCard) =>
    allowedRarities.includes(card.rarity)
  );

  // const uniqueRarities: string[] = Array.from(
  //   new Set(data.map((card: PokemonCard) => card.rarity)),
  // );

  return { cards: cards, rarities: allowedRarities };
};

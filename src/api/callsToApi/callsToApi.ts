"use server";

import { PokemonCard } from "@/models/pokemonCard";
import { User } from "@/models/user";
import { MongoClient, Db } from "mongodb";

type GetDataResult = { cards: PokemonCard[]; rarities: string[] };
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://rubenpalomo:morituri@mongoddbb.sqlpw.mongodb.net/?retryWrites=true&w=majority&appName=MongoDDBB";
const client = new MongoClient(MONGODB_URI);

const connectToDatabase = async (): Promise<Db> => {
  await client.connect();
  return client.db("PokemonTCGPocket-Trade");
};

export const getData = async (): Promise<GetDataResult> => {
  const allowedRarities = ["Common", "Uncommon", "Rare", "Rare EX", "Full Art"];
  const response = await fetch(
    "https://raw.githubusercontent.com/chase-manning/pokemon-tcg-pocket-cards/main/v2.json",
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  const cards: PokemonCard[] = data.filter((card: PokemonCard) =>
    allowedRarities.includes(card.rarity),
  );

  return { cards: cards, rarities: allowedRarities };
};

export const getAllOffers = async (
  cardWanted: PokemonCard,
): Promise<User[] | null> => {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection<User>("PTCGP-Trade");

    const users: User[] = (await usersCollection
      .aggregate([
        {
          $match: {
            "trades.cardOffered.id": cardWanted.id,
          },
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            trades: {
              $filter: {
                input: "$trades",
                as: "trade",
                cond: {
                  $eq: ["$$trade.cardOffered.id", cardWanted.id],
                },
              },
            },
          },
        },
      ])
      .toArray()) as User[];

    const usersWithStringId = users.map((user: User) => ({
      ...user,
      _id: user._id?.toString(),
      userId: user.userId.toString(),
    }));

    return usersWithStringId || null;
  } catch (error) {
    console.error("Error al obtener las ofertas de MongoDB:", error);
    return null;
  }
};

export const getOffers = async (
  cardOffered: PokemonCard,
  cardWanted: PokemonCard,
): Promise<User[] | null> => {
  try {
    const db = await connectToDatabase();

    const usersCollection = db.collection<User>("PTCGP-Trade");

    const users: User[] = (await usersCollection
      .aggregate([
        {
          $match: {
            trades: {
              $elemMatch: {
                "cardOffered.id": cardWanted.id,
                "cardWanted.id": cardOffered.id,
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            trades: {
              $filter: {
                input: "$trades",
                as: "trade",
                cond: {
                  $and: [
                    { $eq: ["$$trade.cardOffered.id", cardWanted.id] },
                    { $eq: ["$$trade.cardWanted.id", cardOffered.id] },
                  ],
                },
              },
            },
          },
        },
      ])
      .toArray()) as User[];

    const usersWithStringId = users.map((user: User) => ({
      ...user,
      _id: user._id?.toString(),
      userId: user.userId.toString(),
    }));

    return usersWithStringId || null;
  } catch (error) {
    console.error("Error al obtener los datos de MongoDB:", error);
    return null;
  }
};

export const addUser = async (
  userId: string,
  cardOffered: PokemonCard,
  cardWanted: PokemonCard,
): Promise<boolean> => {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection<User>("PTCGP-Trade");
    const result = await usersCollection.updateOne(
      { userId },
      {
        $push: {
          trades: {
            cardOffered,
            cardWanted,
          },
        },
        $set: {
          creationDate: new Date(),
        },
      },
      { upsert: true },
    );

    return result.modifiedCount > 0;
  } catch (error) {
    console.error("Error al añadir el usuario a MongoDB:", error);
    return false;
  }
};

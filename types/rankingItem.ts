import { Bar } from "./bar";
import { Pintxo } from "./pintxo";

// Discriminator
type Kind = "Bar" | "Pintxo";

// Narrowed item shapes
export type BarItem = Bar & { __typename: "Bar" };
export type PintxoItem = Pintxo & { __typename: "Pintxo" };

// The union you want
export type RankingItem = BarItem | PintxoItem;

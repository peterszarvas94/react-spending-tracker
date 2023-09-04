import type { Currency, Order, SpendingType } from "./types";
import { z } from "zod";
import { spendingSchema } from "./types";
import { env } from "./env";

interface Props {
  order: Order;
  currency?: Currency;
}

export async function getSpendings({ order, currency }: Props) {
  // create a URL object
  const url = new URL(env("URL"));
  url.searchParams.set("order", order);
  if (currency) {
    url.searchParams.set("currency", currency);
  }

  //get spendings from API
  const res = await fetch(url);
  const spendings = await res.json();

  // check if the response is an array
  const spendingArraySchema = z.array(z.unknown());
  let parsedSpendingsArray: unknown[] = [];
  try {
    parsedSpendingsArray = spendingArraySchema.parse(spendings);
  } catch (error) { }

  // check if objects are in the right format
  const parsedSpendings = parsedSpendingsArray.map((spending) => {
    try {
      const parsedSpending = spendingSchema.parse(spending);
      return parsedSpending;
    } catch (error) {
      return null;
    }
  });

  // filter out the null values
  const filteredSpendings = parsedSpendings.filter((spending) => {
    return spending !== null;
  }) as SpendingType[];

  return filteredSpendings;
}

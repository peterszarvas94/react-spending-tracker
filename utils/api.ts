import { z } from "zod";
import type { Currency, Order, SpendingType } from "./types";
import { spendingSchema } from "./types";

interface Props {
  order?: Order;
  currency?: Currency;
}

export async function getSpendings({ order, currency }: Props = {}) {
  // create a URL object
  const url = new URL("https://shielded-depths-43687-bb049deacd16.herokuapp.com/spendings");
  if (order) {
    url.searchParams.set("order", order);
  }
  if (currency) {
    url.searchParams.set("currency", currency);
  }

  //get spendings from API
  const res = await fetch(url, { cache: "no-store" });
  const spendings = await res.json();

  // check if the response is an array
  const spendingArraySchema = z.array(z.unknown());
  let parsedSpendingsArray: unknown[] = [];
  try {
    parsedSpendingsArray = spendingArraySchema.parse(spendings);
  } catch (error) {
    console.error(error);
  }

  // check if the array contains objects in the right format
  const parsedSpendings = parsedSpendingsArray.map((spending) => {
    try {
      const parsedSpending = spendingSchema.parse(spending);
      return parsedSpending;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  // filter out the null values

  const filteredSpendings = parsedSpendings.filter((spending) => {
    return spending !== null;
  }) as SpendingType[];

  return filteredSpendings;
}

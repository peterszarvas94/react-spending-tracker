"use client";

import { getSpendings } from "@/utils/api";
import type { Currency, Order, SpendingType } from "@/utils/types";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Context = {
  setOrder: Dispatch<SetStateAction<Order>>;
  setCurrency: Dispatch<SetStateAction<Currency | null>>;
  spendings: SpendingType[];
}

export const SpendingsContext = createContext<Context | null>(null);

interface Props {
  children: ReactNode;
}

export function SpendingsContextProvider({
  children
}: Props) {
  const [order, setOrder] = useState<Order>("-spent_at");
  const [currency, setCurrency] = useState<Currency | null>(null);
  const [spendings, setSpendings] = useState<SpendingType[]>([]);

  useEffect(() => {
    const data = getSpendings({ order, currency: currency ?? undefined });

    async function getData() {
      const spendings = await data;
      setSpendings(spendings);
    }

    getData();

  }, [order, currency]);

  return (
    <SpendingsContext.Provider value={{
      setOrder,
      setCurrency,
      spendings,
    }}>
      {children}
    </SpendingsContext.Provider>
  )
}

export function useSpendingsContext() {
  const context = useContext(SpendingsContext);
  if (context === null) {
    throw new Error("useSpendingsContext must be used inside SpendingsContextProvider");
  }

  return context;
}

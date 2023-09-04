"use client";

import type { Order } from "@/utils/types";
import Spending from "./Spending";
import { useSpendingsContext } from "@/context/spending";

export default function Options() {
  const { setOrder, currency, setCurrency, spendings } = useSpendingsContext();

  return (
    <>
      <section
        className="flex justify-between w-full max-w-4xl p-10 mx-auto"
      >
        <select
          className="rounded-lg bg-white border border-gray-500 px-3 py-1 font-semibold
          focus:outline-none focus:ring-1 focus:ring-gray-400"
          onChange={async (e) => {
            const order = e.target.value as Order;
            setOrder(order);
          }}
        >
          <option value="-spent_at">Sort by Date descending (default)</option>
          <option value="spent_at">Sort by Date ascending</option>
          <option value="-amount">Sort by Amount descending</option>
          <option value="amount">Sort by Amount ascending</option>
        </select>
        <div
          className="flex gap-4"
        >
          <button
            className={`rounded-lg ${currency === null ? "bg-blue-200 text-blue-600" : "bg-white"} px-3 py-1 font-bold
            focus:outline-none focus:ring-1 focus:ring-gray-400`}
            onClick={() => setCurrency(null)}
          >
            ALL
          </button>
          <button
            className={`rounded-lg ${currency === "HUF" ? "bg-blue-200 text-blue-600" : "bg-white"} px-3 py-1 font-bold
            focus:outline-none focus:ring-1 focus:ring-gray-400`}
            onClick={() => setCurrency("HUF")}
          >
            HUF
          </button>
          <button
            className={`rounded-lg ${currency === "USD" ? "bg-blue-200 text-blue-600" : "bg-white"} px-3 py-1 font-bold
            focus:outline-none focus:ring-1 focus:ring-gray-400`}
            onClick={() => setCurrency("USD")}
          >
            USD
          </button>
        </div>
      </section>
      <ul
        className="flex flex-col gap-4 w-full max-w-4xl px-10 pb-10 mx-auto"
      >
        {spendings.map((spending) => (
          <Spending
            key={spending.id}
            description={spending.description}
            amount={spending.amount}
            currency={spending.currency}
            spent_at={spending.spent_at}
          />
        ))}
      </ul>
    </>
  )
}

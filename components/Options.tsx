"use client";

import type { Order, Currency } from "@/utils/types";
import type { ChangeEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { generateUrl } from "@/utils/generateUrl";

interface Props {
  order?: Order;
  currency?: Currency;
}

export default function Options({
  order,
  currency,
}: Props) {

  const router = useRouter();
  const pathname = usePathname();

  function onSelect(event: ChangeEvent<HTMLSelectElement>) {
    const newOrder = event.target.value as Order;
    const url = generateUrl(pathname, newOrder, currency);
    router.push(url);
  }

  function onFilter(newCurrency?: Currency) {
    const url = generateUrl(pathname, order, newCurrency);
    router.push(url);
  }

  return (
    <>
      <section
        className="flex justify-between w-full max-w-4xl p-10 mx-auto"
      >
        <select
          className="rounded-lg bg-white px-3 py-1 font-semibold
          focus:outline-none focus:ring-1 focus:ring-gray-400"
          onChange={onSelect}
          defaultValue={order ?? "-spent_at"}
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
            className={`rounded-lg ${!currency ? "bg-blue-200 text-blue-600" : "bg-white"} px-3 py-1 font-bold
            focus:outline-none focus:ring-1 focus:ring-gray-400`}
            onClick={() => onFilter()}
          >
            ALL
          </button>
          <button
            className={`rounded-lg ${currency === "HUF" ? "bg-blue-200 text-blue-600" : "bg-white"} px-3 py-1 font-bold
            focus:outline-none focus:ring-1 focus:ring-gray-400`}
            onClick={() => onFilter("HUF")}
          >
            HUF
          </button>
          <button
            className={`rounded-lg ${currency === "USD" ? "bg-blue-200 text-blue-600" : "bg-white"} px-3 py-1 font-bold
            focus:outline-none focus:ring-1 focus:ring-gray-400`}
            onClick={() => onFilter("USD")}
          >
            USD
          </button>
        </div>
      </section>
    </>
  )
}

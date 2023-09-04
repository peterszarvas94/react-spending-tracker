import type { Currency, Order } from "@/utils/types";
import Options from "@/components/Options";
import Spending from "@/components/Spending";
import submitForm from "@/utils/actions";
import { getSpendings } from "@/utils/api";

/* export const dynamic = "force-dynamic"; */

interface Props {
  searchParams: {
    order?: Order;
    currency?: Currency;
  };
}

export default async function Home({
  searchParams: { order, currency },
}: Props) {

  const spendings = await getSpendings({
    order: order ?? "-spent_at",
    currency
  });

  return (
    <main
      className="bg-gray-200 min-h-screen text-lg"
    >
      <form
        className="flex gap-4 w-full max-w-4xl p-10 mx-auto"
        action={submitForm}
      >
        <input
          className="grow rounded-lg border-none shadow border-2 px-3 py-1 font-bold
          placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400"
          type="text"
          name="description"
          placeholder="description"
          required
        />
        {/* max value int32 */}
        <input
          className="rounded-lg border-none shadow border-2 px-3 py-1 font-bold
          placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400"
          placeholder="0"
          type="number"
          name="amount"
          min={0}
          max={2147483647}
          step={0.01}
          required
        />
        <select
          className="rounded-lg border-none shadow border-2 px-3 py-1 font-bold
          bg-white focus:outline-none focus:ring-1 focus:ring-gray-400"
          name="currency"
          required
          defaultValue={"USD"}
        >
          <option value="USD">USD</option>
          <option value="HUF">HUF</option>
        </select>
        <button
          className="rounded-lg border-none shadow border-2 px-3 py-1 font-bold
          bg-emerald-500 text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
          type="submit"
        >
          Save
        </button>
      </form>

      <Options order={order} currency={currency} />

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

    </main>
  )
}

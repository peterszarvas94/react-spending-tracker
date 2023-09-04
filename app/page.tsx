import type { Currency, Order } from "@/utils/types";
import Options from "@/components/Options";
import Spending from "@/components/Spending";
import submitForm from "@/utils/actions";
import { getSpendings } from "@/utils/api";
import Form from "@/components/Form";

export const dynamic = "force-dynamic";

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
      <Form />
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

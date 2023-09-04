import { convertToString } from "@/utils/date";
import { BiEditAlt } from "react-icons/bi";
import { FaXmark } from "react-icons/fa6";
import { LuDollarSign } from "react-icons/lu";


interface Props {
  description: string;
  amount: number;
  currency: "USD" | "HUF";
  spent_at: string;
}

export default function Spending({
  description,
  amount,
  currency,
  spent_at,
}: Props) {
  const timeStr = convertToString(spent_at);

  const currencySymbol = currency === "USD" ? "$" : "Ft";
  const amountStr = `${currencySymbol}${amount.toFixed(2)}`;

  return (

    <li
      className="flex items-center gap-4 p-6 w-full bg-white shadow rounded-lg"
    >
      <div
        className="flex items-center justify-center w-12 h-12 rounded-2xl
            bg-blue-200 text-blue-600 text-3xl"
      >
        <LuDollarSign />
      </div>

      <article
        className="flex flex-col grow"
      >
        <h1
          className="font-bold"
        >
          {description}
        </h1>
        <time
          className="text-gray-400 text-sm"
        >
          {timeStr}
        </time>
      </article>

      <div
        className="font-bold"
      >
        {amountStr}
      </div>

      <div
        className="flex items-center gap-2"
      >
        <button
          className="flex items-center justify-center w-10 h-10 rounded-xl
              bg-gray-200 text-gray-400 text-xl
              focus:outline-none focus:ring-1 focus:ring-gray-400"
        >
          <BiEditAlt />
        </button>
        <button
          className="flex items-center justify-center w-10 h-10 rounded-xl
              bg-gray-200 text-gray-400 text-xl
              focus:outline-none focus:ring-1 focus:ring-gray-400"
        >
          <FaXmark />
        </button>
      </div>

    </li>
  )
}

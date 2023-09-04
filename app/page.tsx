import { SpendingsContextProvider } from "@/context/spending";
import submitForm from "./actions";
import Options from "@/components/Options";

export default async function Home() {
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

      <SpendingsContextProvider>
        <Options />
      </SpendingsContextProvider>
    </main>
  )
}

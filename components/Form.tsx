"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter();

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/spendings/", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        form.reset();
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      className="flex gap-4 w-full max-w-4xl p-10 mx-auto"
      id="spending-form"
      onSubmit={submitForm}
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
  )
}

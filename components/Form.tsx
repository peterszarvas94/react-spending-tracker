"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import { toast, Toaster } from "react-hot-toast";

export default function Form() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

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
        setSubmitting(false);
        toast.success("Spending saved");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      setSubmitting(false);
    }
  }

  return (
    <>
      <Toaster />
      <form
        className="flex flex-col sm:flex-row gap-4 w-full max-w-4xl p-10 mx-auto "
        id="spending-form"
        onSubmit={submitForm}
      >
        <input
          className="grow rounded-lg border-none shadow border-2 px-3 py-1 font-bold
          placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 min-w-0"
          type="text"
          name="description"
          placeholder="description"
          required
        />
        {/* max value int32 */}
        <input
          className="rounded-lg border-none shadow border-2 px-3 py-1 font-bold
          placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 min-w-0"
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
          className="rounded-lg border-none shadow border-2 py-1 font-bold
          bg-emerald-500 text-white focus:outline-none focus:ring-1 focus:ring-gray-500
          w-16 flex justify-center items-center self-center"
          type="submit"
          disabled={submitting}
        >
          {submitting ? (
            <Spinner />
          ) : (
            <>Save</>
          )}
        </button>
      </form>
    </>
  )
}

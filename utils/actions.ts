"use server";

import { revalidateTag } from "next/cache";

export default async function submitForm(data: FormData) {
  const description = data.get('description') as string;
  const amountStr = data.get('amount') as string;
  const amount = parseFloat(amountStr);
  if (isNaN(amount)) {
    throw new Error(`amount is not a number: ${amountStr}`);
  }

  const currency = data.get('currency') as string;
  const spent_at = new Date().toISOString();

  let res: Response | undefined;

  try {
    res = await fetch("https://shielded-depths-43687-bb049deacd16.herokuapp.com/spendings/", {
      method: 'POST',
      body: JSON.stringify({
        description,
        amount,
        currency,
        spent_at,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) { }

  if (!res) {
    throw new Error('no response');
  }

  try {
    const json = await res.json();
    revalidateTag('spendings');

    return json;
  } catch (error) { }
}

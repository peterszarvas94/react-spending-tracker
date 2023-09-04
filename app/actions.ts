"use server";

export default async function submitForm(data: FormData) {
    const description = data.get('description') as string;
    const amountStr = data.get('amount') as string;
    const amount = parseFloat(amountStr);
    if (isNaN(amount)) {
      throw new Error(`amount is not a number: ${amountStr}`);
    }

    const currency = data.get('currency') as string;
    const spent_at = new Date().toISOString();

    const res = await fetch(`${process.env.URL}/spendings`, {
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
    
    if (!res.ok) {
      console.error(res);
    }

  }

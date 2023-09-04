import { z } from "zod";

export type Order = "spent_at" | "-spent_at" | "amount" | "-amount";
export type Currency = "USD" | "HUF";

export const spendingSchema = z.object({
  id: z.number(),
  description: z.string(),
  amount: z.number(),
  currency: z.enum(["USD", "HUF"]),
  spent_at: z.string(),
});

export type SpendingType = z.infer<typeof spendingSchema>;

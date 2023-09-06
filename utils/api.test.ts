import { expect, test } from "vitest";
import { getSpendings, convertData } from "./api";
import { spendingSchema } from "./types";

test("getSpendings", async () => {
  const order = "-spent_at";
  const currency = "USD";
  const spendings = await getSpendings({ order, currency });

  expect(spendings).toBeTypeOf("object");
});

test("convertData", async () => {
  const mockData: any[] = [
    {
      id: 1,
      invalid: "test",
    },
    {
      id: 2,
      description: "test",
      amount: 100,
      currency: "USD",
      spent_at: new Date().toISOString(),
    },
    {
      id: 3,
      description: "test",
      amount: 100,
      currency: null,
      spent_at: undefined,
    },
  ];
  const mockResponse = new Response(JSON.stringify(mockData));
  const spendings = await convertData(mockResponse);
  const isValid = spendingSchema.safeParse(spendings[0]);

  expect(spendings).toBeTypeOf("object");
  expect(spendings.length).toBe(1);
  expect(isValid.success).toBe(true);
});

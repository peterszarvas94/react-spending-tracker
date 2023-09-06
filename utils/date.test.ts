import { expect, test } from "vitest";
import { convertToString } from "./date";

test("date valid", () => {
  const input = "2023-09-06T09:58:17.025Z";
  const output = "11:58 AM - September 06, 2023";
  expect(convertToString(input)).toBe(output);
});

test("date invalid", () => {
  const input = "Some invalid date string";
  expect(convertToString(input)).toBe(null);
});

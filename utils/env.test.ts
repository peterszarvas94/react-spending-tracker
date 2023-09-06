import { expect, test } from "vitest";
import { env } from "./env";

test("env present", () => {
  expect(env("URL")).toBeTypeOf("string");
});

test("env missing", () => {
  expect(() => env("MISSING")).toThrowError("Missing environment variable in .env.local: MISSING");
});

import { expect, test } from "vitest";
import { generateUrl } from "./generateUrl";

test("generateUrl spent_at", () => {
  const pathname = "/";
  const order = "spent_at";
  const currency = "USD";

  expect(generateUrl(pathname)).toBe(pathname);
  expect(generateUrl(pathname, order)).toBe("/?order=spent_at");
  expect(generateUrl(pathname, undefined, currency)).toBe("/?currency=USD");
  expect(generateUrl(pathname, order, currency)).toBe("/?order=spent_at&currency=USD");
});

test("generateUrl -spent_at", () => {
  const pathname = "/example";
  const order = "-spent_at";
  const currency = "HUF";

  expect(generateUrl(pathname)).toBe("/example");
  expect(generateUrl(pathname, order)).toBe("/example");
  expect(generateUrl(pathname, undefined, currency)).toBe("/example?currency=HUF");
  expect(generateUrl(pathname, order, currency)).toBe("/example?currency=HUF");
});

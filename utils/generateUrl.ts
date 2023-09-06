import type { Currency, Order } from "./types";

export function generateUrl(pathname: string, order?: Order, currency?: Currency) {
  const params = new URLSearchParams();

  if (order && order !== "-spent_at") {
    params.set("order", order);
  }

  if (currency) {
    params.set("currency", currency);
  }

  if (params.toString() === "") {
    return pathname;
  }

  const url = `${pathname}?${params.toString()}`;
  return url;
}

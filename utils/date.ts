export function convertToString(dateTimeStr: string) {
  const date = new Date(dateTimeStr);

  const timeStr = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const dateStr = date.toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  return `${timeStr} - ${dateStr}`;
}

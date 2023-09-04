export function convertToString(dateStr: string) {
  const date = new Date(dateStr);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`; // 1 -> 01
  const formattedHours = hours > 12 ? hours - 12 : hours; // 13 -> 1

  const amOrPm = hours >= 12 ? "PM" : "AM"; // AM or PM

  const monthName = date.toLocaleString("en", { month: "long" }); // January

  const day = date.getDate(); 
  const formattedDay = day < 10 ? `0${day}` : `${day}`; // 1 -> 01

  const year = date.getFullYear();

  const timeStr = `${formattedHours}:${formattedMinutes} ${amOrPm} - ${monthName} ${formattedDay}, ${year}`;

  return timeStr;
}

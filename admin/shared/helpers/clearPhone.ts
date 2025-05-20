export const clearPhone = (value: string): string => {
  if (!value) return "";

  let cleaned = value.replace(/\D/g, "");

  if (cleaned.length === 11 && cleaned[0] === "7") {
    cleaned = "8" + cleaned.slice(1);
  } else if (cleaned.length < 11) {
    cleaned = "8" + cleaned;
  }

  return cleaned.slice(0, 11);
};

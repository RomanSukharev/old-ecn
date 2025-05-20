export function formatPhoneNumber(number: string): string {
  return number?.replace(
    /([8])(\d{3})(\d{3})(\d{2})(\d{2})/gi,
    "+7 ($2) $3-$4-$5",
  );
}

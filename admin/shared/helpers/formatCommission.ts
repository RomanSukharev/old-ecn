export function formatCommission(num: number) {
  return new Intl.NumberFormat("ru-RU").format(num);
}

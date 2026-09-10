/** Colombian peso display: `$ 119.900` (dot thousands, no decimals). */
export function formatCop(amount: number): string {
  const grouped = Math.trunc(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$ ${grouped}`;
}

/** Whole-percent discount; 0 when there is no markdown. */
export function discountPercent(listPrice: number, price: number): number {
  if (listPrice <= 0 || price >= listPrice) return 0;
  return Math.round((1 - price / listPrice) * 100);
}

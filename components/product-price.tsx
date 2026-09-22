import type { ReactElement } from "react";

import { discountPercent, formatCop } from "@/lib/money";

export function ProductPrice({
  listPrice,
  price,
}: {
  readonly listPrice: number;
  readonly price: number;
}): ReactElement {
  const percent = discountPercent(listPrice, price);
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs text-muted line-through">{formatCop(listPrice)}</p>
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-base font-medium">{formatCop(price)}</p>
        {percent > 0 ? <span className="text-xs text-success-400">{percent}% OFF</span> : null}
      </div>
    </div>
  );
}

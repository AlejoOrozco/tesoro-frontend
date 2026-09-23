import type { ReactElement } from "react";

import { formatCop } from "@/lib/money";

export function ProductPrice({
  listPrice,
  price,
}: {
  readonly listPrice: number;
  readonly price: number;
}): ReactElement {
  return (
    <div className="flex flex-col gap-0.5">
      {listPrice > price ? <p className="text-xs text-muted line-through">{formatCop(listPrice)}</p> : null}
      <p className="product-sale text-lg font-medium leading-tight">{formatCop(price)}</p>
    </div>
  );
}

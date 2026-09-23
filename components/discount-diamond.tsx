import type { ReactElement } from "react";

/** Chubby gem: short crown, wide shoulders, a soft point. Stroke rounds the corners. */
const GEM_PATH = "M46 16h48L122 42 70 96 18 42Z";

export function DiscountDiamond({ percent }: { readonly percent: number }): ReactElement | null {
  if (percent <= 0) return null;
  return (
    <span className="discount-diamond" role="img" aria-label={`${percent}% de descuento`}>
      <svg viewBox="0 0 140 108" className="discount-diamond-shape" aria-hidden="true">
        <path d={GEM_PATH} />
      </svg>
      <span className="discount-diamond-label" aria-hidden="true">
        -{percent}%
      </span>
    </span>
  );
}

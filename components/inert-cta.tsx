import type { ReactElement, ReactNode } from "react";

interface InertCtaProps {
  readonly children: ReactNode;
}

/** Looks like a text link; does nothing until the matching flow exists. */
export function InertCta({ children }: InertCtaProps): ReactElement {
  return (
    <button
      type="button"
      className="inline-flex min-h-11 items-center self-start text-sm font-medium text-foreground underline underline-offset-4 transition-colors duration-micro hover:text-muted rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {children}
    </button>
  );
}

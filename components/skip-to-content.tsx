import type { ReactElement } from "react";

import { MAIN_CONTENT_ID } from "@/lib/landmarks";

export function SkipToContent(): ReactElement {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="sr-only z-[60] rounded-md bg-chrome px-4 font-medium text-chrome-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:inline-flex focus:h-12 focus:items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      Saltar al contenido
    </a>
  );
}

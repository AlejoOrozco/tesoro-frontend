import { MAIN_CONTENT_ID } from "@/lib/landmarks";

export function SkipToContent() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="sr-only z-50 rounded-md bg-chrome px-4 font-medium text-chrome-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:inline-flex focus:h-12 focus:items-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
    >
      Saltar al contenido
    </a>
  );
}

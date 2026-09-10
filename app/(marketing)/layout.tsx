import { MAIN_CONTENT_ID } from "@/lib/landmarks";

/**
 * Public-site chrome lives here. Header and footer landmarks are added in
 * Stage 3 — empty landmarks would be announced with nothing in them.
 */
export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-dvh flex-col">
      <main
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        className="flex-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {children}
      </main>
    </div>
  );
}

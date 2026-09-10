import { SiteHeader } from "@/components/site-header";
import { MAIN_CONTENT_ID } from "@/lib/landmarks";

/** Public-site chrome. Footer lands in Stage 3.2. */
export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
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

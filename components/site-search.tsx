import type { ReactElement } from "react";

import { SearchIcon } from "@/components/icons";

/**
 * Header search — GET /search. Results are an empty state until the catalog
 * search endpoint exists (same deferral as the newsletter form).
 */
export function SiteSearch(): ReactElement {
  return (
    <form
      action="/search"
      method="get"
      role="search"
      className="flex h-10 w-full min-w-0 overflow-hidden rounded-md border border-border bg-neutral-50 text-neutral-900 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary"
    >
      <label htmlFor="site-search" className="sr-only">
        Buscar productos
      </label>
      <input
        id="site-search"
        name="q"
        type="search"
        enterKeyHint="search"
        autoComplete="off"
        placeholder="Buscar productos, marcas y más..."
        className="h-full min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-neutral-500"
      />
      <button
        type="submit"
        aria-label="Buscar"
        className="inline-flex h-full w-12 shrink-0 items-center justify-center border-l border-border text-neutral-700 transition-colors duration-micro hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <SearchIcon className="size-5" />
      </button>
    </form>
  );
}

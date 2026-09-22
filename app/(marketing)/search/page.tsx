import type { Metadata } from "next";
import type { ReactElement } from "react";

import { ButtonLink } from "@/components/button";
import { EmptyState } from "@/components/empty-state";
import { SearchIcon } from "@/components/icons";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Búsqueda",
};

interface SearchPageProps {
  readonly searchParams: Promise<{
    readonly q?: string | string[];
  }>;
}

function queryFromParams(raw: string | string[] | undefined): string {
  if (typeof raw === "string") return raw.trim();
  return "";
}

export default async function SearchPage({ searchParams }: SearchPageProps): Promise<ReactElement> {
  const params = await searchParams;
  const query = queryFromParams(params.q);
  const title = query === "" ? "¿Qué estás buscando?" : `No hay resultados para “${query}”`;

  return (
    <Section className="flex min-h-[50vh] items-center">
      <EmptyState
        icon={<SearchIcon />}
        title={title}
        description="La búsqueda del catálogo llega con la tienda. Mientras tanto, mira los productos destacados."
        action={<ButtonLink href="/#productos">Ver productos</ButtonLink>}
      />
    </Section>
  );
}

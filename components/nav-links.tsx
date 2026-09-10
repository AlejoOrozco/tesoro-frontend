"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";

import { NAV_ITEMS } from "@/lib/navigation";

interface NavLinksProps {
  readonly orientation?: "row" | "column";
  /** Called after a link is activated — the mobile menu uses it to close. */
  readonly onNavigate?: () => void;
}

const LINK_CLASSES =
  "flex h-11 items-center rounded-md px-3 text-sm font-medium transition-colors duration-micro " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function NavLinks({ orientation = "row", onNavigate }: NavLinksProps): ReactElement {
  const pathname = usePathname();

  return (
    <ul className={orientation === "row" ? "flex items-center gap-1" : "flex flex-col gap-1"}>
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={`${LINK_CLASSES} ${
                isActive ? "text-gold-200" : "text-chrome-foreground hover:text-gold-200"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

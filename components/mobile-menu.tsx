"use client";

import { useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactElement } from "react";

import { CloseIcon, MenuIcon } from "@/components/icons";
import { NavLinks } from "@/components/nav-links";

/**
 * Disclosure-pattern mobile navigation (not a modal, so no focus trap):
 * aria-expanded/aria-controls on the trigger, Escape closes and returns focus
 * to the trigger, activating a link closes the panel.
 */
export function MobileMenu(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  function closeAndRefocus(): void {
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    if (event.key === "Escape" && isOpen) closeAndRefocus();
  }

  return (
    <div className="sm:hidden" onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex size-11 items-center justify-center rounded-md text-chrome-foreground transition-colors duration-micro hover:bg-navy-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span className="sr-only">{isOpen ? "Cerrar menú" : "Abrir menú"}</span>
        {isOpen ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
      </button>

      {isOpen && (
        <nav
          id={panelId}
          aria-label="Principal"
          className="absolute inset-x-0 top-full border-t border-navy-700 bg-chrome p-4 shadow-lg"
        >
          <NavLinks orientation="column" onNavigate={() => setIsOpen(false)} />
        </nav>
      )}
    </div>
  );
}

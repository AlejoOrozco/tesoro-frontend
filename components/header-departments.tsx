"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { ReactElement, RefObject } from "react";

import { ChevronDownIcon } from "@/components/icons";
import { CATEGORY_ITEMS, DEPARTMENT_ITEMS } from "@/lib/navigation";

const DEPARTMENT_LINK_CLASSES =
  "header-dept inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-sm text-sm " +
  "transition-colors duration-micro " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const CATEGORY_LINK_CLASSES =
  "flex min-h-11 items-center px-4 text-sm text-foreground transition-colors duration-micro " +
  "hover:bg-background hover:text-primary " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function useDisclosureDismiss(
  isOpen: boolean,
  rootRef: RefObject<HTMLDivElement | null>,
  buttonRef: RefObject<HTMLButtonElement | null>,
  setIsOpen: (open: boolean) => void,
): void {
  useEffect(() => {
    if (!isOpen) return;

    function close(): void {
      setIsOpen(false);
      buttonRef.current?.focus();
    }

    function onPointerDown(event: PointerEvent): void {
      const root = rootRef.current;
      if (root === null || !(event.target instanceof Node)) return;
      if (root.contains(event.target)) return;
      setIsOpen(false);
    }

    function onKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") close();
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [buttonRef, isOpen, rootRef, setIsOpen]);
}

function HeaderCategories({ isHidden }: { readonly isHidden: boolean }): ReactElement {
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  if (isHidden && isOpen) setIsOpen(false);
  useDisclosureDismiss(isOpen, rootRef, buttonRef, setIsOpen);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
        className={`${DEPARTMENT_LINK_CLASSES} gap-1 font-bold transition-transform duration-micro active:scale-[0.97]`}
      >
        Categorías
        <ChevronDownIcon
          className={[
            "size-4 transition-transform duration-micro motion-reduce:transition-none",
            isOpen ? "rotate-180" : "rotate-0",
          ].join(" ")}
        />
      </button>
      {isOpen ? (
        <ul
          id={menuId}
          className="absolute left-0 top-full z-50 min-w-56 rounded-md bg-surface py-1 shadow-sm ring-1 ring-neutral-200"
        >
          {CATEGORY_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={CATEGORY_LINK_CLASSES} onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/** Slim second row under the search: Categorías, then department shortcuts, centered. */
export function HeaderDepartments({ isHidden = false }: { readonly isHidden?: boolean }): ReactElement {
  return (
    <div className="relative flex min-h-11 items-center justify-center gap-8">
      <HeaderCategories isHidden={isHidden} />
      {DEPARTMENT_ITEMS.map((item) => (
        <Link key={item.href} href={item.href} className={DEPARTMENT_LINK_CLASSES} aria-label={item.ariaLabel}>
          {item.label}
        </Link>
      ))}
    </div>
  );
}

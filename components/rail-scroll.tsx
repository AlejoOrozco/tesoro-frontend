"use client";

import { useEffect, useState, type ReactElement } from "react";
import { LineChevron } from "@/components/icons";

const RAIL_ITEM_CLASS =
  "w-[calc((100%-0.75rem)/2)] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/3)] lg:w-[calc((100%-3.75rem)/6)]";

interface ScrollEnds {
  readonly canPrev: boolean;
  readonly canNext: boolean;
}

function readScrollEnds(list: HTMLElement): ScrollEnds {
  const max = list.scrollWidth - list.clientWidth;
  return { canPrev: list.scrollLeft > 1, canNext: max - list.scrollLeft > 1 };
}

function pageDistance(list: HTMLElement): number {
  const item = list.firstElementChild;
  if (!(item instanceof HTMLElement)) return list.clientWidth;
  const gap = Number.parseFloat(getComputedStyle(list).columnGap) || 0;
  const step = item.offsetWidth + gap;
  const visible = Math.max(1, Math.round((list.clientWidth + gap) / step));
  return visible * step;
}

function useRailScroll(): {
  readonly ends: ScrollEnds;
  readonly listRef: (node: HTMLUListElement | null) => void;
  readonly scrollByPage: (direction: -1 | 1) => void;
} {
  const [list, setList] = useState<HTMLUListElement | null>(null);
  const [ends, setEnds] = useState<ScrollEnds>({ canPrev: false, canNext: false });

  useEffect(() => {
    if (list === null) return;
    const update = (): void => {
      const next = readScrollEnds(list);
      setEnds((current) =>
        current.canPrev === next.canPrev && current.canNext === next.canNext ? current : next,
      );
    };
    update();
    list.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(list);
    return () => {
      list.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [list]);

  const scrollByPage = (direction: -1 | 1): void => {
    if (list === null) return;
    list.scrollBy({ left: direction * pageDistance(list), behavior: "smooth" });
  };

  return { ends, listRef: setList, scrollByPage };
}

function RailArrow({
  direction,
  disabled,
  onClick,
  className,
}: {
  readonly direction: "prev" | "next";
  readonly disabled: boolean;
  readonly onClick: () => void;
  readonly className?: string;
}): ReactElement | null {
  if (disabled) return null;
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      aria-label={isPrev ? "Ver productos anteriores" : "Ver más productos"}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={[
        "line-arrow absolute top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center text-foreground",
        "active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className ?? (isPrev ? "left-0" : "right-0"),
      ].join(" ")}
    >
      <LineChevron direction={direction} />
    </button>
  );
}

export { RAIL_ITEM_CLASS, RailArrow, useRailScroll };

"use client";

import { Fragment, useLayoutEffect, useRef } from "react";
import type { AnimationEvent, ReactElement } from "react";

type SegmentPhase = "done" | "active" | "todo";

const COMPLETION_SLACK_MS = 80;

export interface HeroBannerProgressProps {
  readonly index: number;
  readonly labels: readonly string[];
  readonly durationMs: number;
  readonly isPaused: boolean;
  readonly onElapsed: (fromIndex: number) => void;
  readonly onSelect: (index: number) => void;
}

function segmentPhase(slideIndex: number, segmentIndex: number): SegmentPhase {
  if (segmentIndex < slideIndex) return "done";
  if (segmentIndex === slideIndex) return "active";
  return "todo";
}

function SegmentFill({
  phase,
  durationMs,
  isPaused,
  onElapsed,
}: {
  readonly phase: SegmentPhase;
  readonly durationMs: number;
  readonly isPaused: boolean;
  readonly onElapsed: () => void;
}): ReactElement {
  const armedAt = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (phase !== "active") {
      armedAt.current = null;
      return;
    }
    armedAt.current = performance.now();
  }, [phase, durationMs]);

  function handleEnd(event: AnimationEvent<HTMLSpanElement>): void {
    if (event.target !== event.currentTarget) return;
    if (event.animationName !== "hero-segment-fill") return;
    const start = armedAt.current;
    if (start === null) return;
    if (performance.now() - start < durationMs - COMPLETION_SLACK_MS) return;
    onElapsed();
  }

  return (
    <span
      className={["hero-segment-fill", `is-${phase}`, isPaused && phase === "active" ? "is-paused" : ""]
        .filter(Boolean)
        .join(" ")}
      style={phase === "active" ? { animationDuration: `${durationMs}ms` } : undefined}
      onAnimationEnd={phase === "active" ? handleEnd : undefined}
    />
  );
}

function Station({
  label,
  isCurrent,
  isReached,
  onSelect,
}: {
  readonly label: string;
  readonly isCurrent: boolean;
  readonly isReached: boolean;
  readonly onSelect: () => void;
}): ReactElement {
  const dotClass = [
    "hero-progress-dot",
    isReached ? "is-reached" : "",
    isCurrent ? "is-current" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      aria-label={label}
      aria-current={isCurrent ? "true" : undefined}
      onClick={onSelect}
      className="relative z-10 flex size-4 shrink-0 items-center justify-center rounded-full transition-transform duration-micro before:absolute before:-inset-3 before:content-[''] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span className={dotClass} />
    </button>
  );
}

/**
 * Stations on a gold track. Tracks overlap into the 16px hit targets so the
 * line runs through each dot. The active segment fills toward the next
 * station; arriving there advances the slide. The tail after the last slide
 * dot is the last timer — when it completes, the cycle restarts.
 */
export function HeroBannerProgress({
  index,
  labels,
  durationMs,
  isPaused,
  onElapsed,
  onSelect,
}: HeroBannerProgressProps): ReactElement {
  const count = labels.length;

  return (
    <div
      role="group"
      aria-label={`Promoción ${index + 1} de ${count}`}
      className="mx-auto flex w-full max-w-48 items-center"
    >
      {labels.map((label, stationIndex) => {
        const phase = segmentPhase(index, stationIndex);
        return (
          <Fragment key={label}>
            <Station
              label={label}
              isCurrent={stationIndex === index}
              isReached={stationIndex <= index}
              onSelect={() => onSelect(stationIndex)}
            />
            <div className="hero-progress-track relative z-0 h-px min-w-4 flex-1 -mx-2 overflow-hidden rounded-full">
              <SegmentFill
                key={phase === "active" ? `active-${stationIndex}` : `seg-${stationIndex}`}
                phase={phase}
                durationMs={durationMs}
                isPaused={isPaused}
                onElapsed={() => onElapsed(stationIndex)}
              />
            </div>
          </Fragment>
        );
      })}
      <span aria-hidden="true" className="relative z-10 flex size-4 shrink-0 items-center justify-center">
        <span className="hero-progress-dot" />
      </span>
    </div>
  );
}

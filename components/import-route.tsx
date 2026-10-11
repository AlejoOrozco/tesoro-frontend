"use client";

import { useState, type AnimationEvent, type ReactElement, type ReactNode, type SVGProps } from "react";

import "./import-route.css";

const WAVE_TILES = 14;
const WAVE_TILE_WIDTH = 128;

type MarkProps = SVGProps<SVGSVGElement>;

/** One period is 8rem wide. Shift the strip by exactly that so the loop is seamless. */
function seaPath(crestY: number): string {
  let path = "";
  for (let index = 0; index < WAVE_TILES; index += 1) {
    const x = index * WAVE_TILE_WIDTH;
    const start = index === 0 ? `M${x} 20` : "";
    path += `${start} Q${x + 32} ${crestY} ${x + 64} 20 T${x + WAVE_TILE_WIDTH} 20`;
  }
  return `${path} V32 H0 Z`;
}

/** Material Design airplane, turned so the nose points right. */
function PlaneMark(props: MarkProps): ReactElement {
  return (
    <svg viewBox="-2 -2 28 28" fill="currentColor" aria-hidden="true" {...props}>
      <path
        transform="rotate(43 12 12)"
        d="M20.56 3.91c.59.59.59 1.54 0 2.12l-3.89 3.89 2.12 9.19-1.41 1.42-3.88-7.43L9.6 17l.36 2.47-1.07 1.06-1.76-3.18-3.19-1.77L5 14.5l2.5.37L11.37 11 3.94 7.09l1.42-1.41 9.19 2.12 3.89-3.89c.56-.58 1.56-.58 2.12 0"
      />
    </svg>
  );
}

/** Side-view container ship: bridge aft, bow to the right. */
function ShipMark(props: MarkProps): ReactElement {
  return (
    <svg viewBox="0 0 128 40" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4 22h88l28 12H18L4 22Z" />
      <path d="M10 22V10h18v12H10Z" />
      <path d="M14 10V5h10v5H14Z" />
      <path d="M36 22v-10h11v10H36Zm13 0V9h11v13H49Zm13 0v-8h11v8H62Zm13 0v-6h11v6H75Z" />
      <rect className="import-cut" x="13.2" y="13" width="3.4" height="2.4" rx="0.4" />
      <rect className="import-cut" x="18.4" y="13" width="3.4" height="2.4" rx="0.4" />
      <rect className="import-cut" x="23.6" y="13" width="2.4" height="2.4" rx="0.4" />
    </svg>
  );
}

/** Material Design side-view car. Windows and hubs cut through to the card. */
function CarMark(props: MarkProps): ReactElement {
  return (
    <svg viewBox="0.5 5.5 23 11.5" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="m16 6 3 4h2c1.11 0 2 .89 2 2v3h-2a3 3 0 0 1-3 3 3 3 0 0 1-3-3H9a3 3 0 0 1-3 3 3 3 0 0 1-3-3H1v-3c0-1.11.89-2 2-2l3-4zm-5.5 1.5H6.75L4.86 10h5.64zm1.5 0V10h5.14l-1.89-2.5zm-6 6A1.5 1.5 0 0 0 4.5 15 1.5 1.5 0 0 0 6 16.5 1.5 1.5 0 0 0 7.5 15 1.5 1.5 0 0 0 6 13.5m12 0a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5"
      />
    </svg>
  );
}

function WaveBand({ className, crestY }: { readonly className: string; readonly crestY: number }): ReactElement {
  return (
    <div className={className}>
      <svg
        className="import-wave-svg"
        viewBox={`0 0 ${WAVE_TILES * WAVE_TILE_WIDTH} 32`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className="import-wave-fill" d={seaPath(crestY)} />
      </svg>
    </div>
  );
}

function Traveling({
  className,
  startsReversed,
  children,
}: {
  readonly className: string;
  readonly startsReversed: boolean;
  readonly children: ReactNode;
}): ReactElement {
  const [reversed, setReversed] = useState(startsReversed);
  const [hasLooped, setHasLooped] = useState(false);

  function onIteration(event: AnimationEvent<HTMLDivElement>): void {
    if (event.target !== event.currentTarget) return;
    setHasLooped(true);
    setReversed(Math.random() < 0.5);
  }

  const classes = [
    "import-traveler",
    className,
    reversed ? "import-reversed" : "",
    hasLooped ? "import-leg" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} onAnimationIteration={onIteration}>
      {children}
    </div>
  );
}

function Vehicle({
  floatClassName,
  children,
}: {
  readonly floatClassName: string;
  readonly children: ReactNode;
}): ReactElement {
  return (
    <div className={floatClassName}>
      <div className="import-face">{children}</div>
    </div>
  );
}

function SkyLane(): ReactElement {
  return (
    <div className="import-sky">
      <Traveling className="import-plane" startsReversed={false}>
        <Vehicle floatClassName="import-float import-float-plane">
          <PlaneMark className="import-plane-svg" />
        </Vehicle>
      </Traveling>
    </div>
  );
}

function ShoreLane(): ReactElement {
  return (
    <div className="import-shore">
      <Traveling className="import-car" startsReversed>
        <Vehicle floatClassName="import-float">
          <CarMark className="import-car-svg" />
        </Vehicle>
      </Traveling>
    </div>
  );
}

function SeaLane(): ReactElement {
  return (
    <div className="import-sea">
      <WaveBand className="import-waves import-waves-back" crestY={14} />
      <WaveBand className="import-waves import-waves-front" crestY={8} />
      <div className="import-ship-lane">
        <Traveling className="import-ship" startsReversed={false}>
          <Vehicle floatClassName="import-float import-float-ship">
            <ShipMark className="import-ship-svg" />
          </Vehicle>
        </Traveling>
      </div>
    </div>
  );
}

/** Air, sea, and road looping inside the import strip. Decorative only. */
export function ImportRoute(): ReactElement {
  return (
    <div className="import-route" aria-hidden="true">
      <SkyLane />
      <ShoreLane />
      <SeaLane />
    </div>
  );
}

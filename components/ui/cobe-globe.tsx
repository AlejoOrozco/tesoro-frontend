"use client";

import createGlobe from "cobe";
import type { Arc, COBEOptions, Globe as CobeHandle, Marker } from "cobe";
import {
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactElement,
} from "react";

import {
  createGlobeDrag,
  endGlobeDrag,
  moveGlobeDrag,
  startGlobeDrag,
  type GlobeDrag,
} from "@/lib/cobe-globe-drag";
import type { GlobeArc, GlobeMarker } from "@/lib/globe-routes";

interface GlobeProps {
  readonly markers: readonly GlobeMarker[];
  readonly arcs: readonly GlobeArc[];
}

interface GlobeLabelStyle extends CSSProperties {
  readonly "--globe-anchor"?: string;
  readonly "--globe-visible"?: string;
}

const GOLD: [number, number, number] = [0.937, 0.8, 0.439];
const WHITE: [number, number, number] = [1, 1, 1];
const NAVY_GLOW: [number, number, number] = [0.24, 0.3, 0.5];
const DEFAULT_PHI = 5.45;
const DEFAULT_THETA = 0.22;
const DEFAULT_SPEED = 0.0018;
const DEFAULT_MARKER_SIZE = 0.04;

function toCobeMarkers(markers: readonly GlobeMarker[]): Marker[] {
  return markers.map((marker) => ({
    id: marker.id,
    location: [marker.location[0], marker.location[1]],
    size: marker.size ?? DEFAULT_MARKER_SIZE,
  }));
}

function toCobeArcs(arcs: readonly GlobeArc[]): Arc[] {
  return arcs.map(toCobeArc);
}

function toCobeArc(arc: GlobeArc): Arc {
  const from: [number, number] = [arc.from[0], arc.from[1]];
  const to: [number, number] = [arc.to[0], arc.to[1]];
  if (arc.control === undefined) return { id: arc.id, from, to };
  const control: [number, number] = [arc.control[0], arc.control[1]];
  return { id: arc.id, from, to, control };
}

function buildOptions(
  width: number,
  markers: readonly GlobeMarker[],
  arcs: readonly GlobeArc[],
  phi: number,
  theta: number,
): COBEOptions {
  return {
    devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
    width,
    height: width,
    phi,
    theta,
    dark: 1,
    diffuse: 1.4,
    mapSamples: 16000,
    mapBrightness: 8,
    baseColor: WHITE,
    markerColor: GOLD,
    glowColor: NAVY_GLOW,
    arcColor: GOLD,
    arcWidth: 0.55,
    arcHeight: 0.3,
    markerElevation: 0.02,
    markers: toCobeMarkers(markers),
    arcs: toCobeArcs(arcs),
    opacity: 1,
  };
}

function watchUntilSized(canvas: HTMLCanvasElement, start: () => void): () => void {
  if (canvas.offsetWidth > 0) {
    start();
    return () => undefined;
  }
  const observer = new ResizeObserver(() => {
    if (canvas.offsetWidth === 0) return;
    observer.disconnect();
    start();
  });
  observer.observe(canvas);
  return () => observer.disconnect();
}

function runGlobe(
  canvas: HTMLCanvasElement,
  markers: readonly GlobeMarker[],
  arcs: readonly GlobeArc[],
  drag: GlobeDrag,
): () => void {
  let globe: CobeHandle | null = null;
  let frame = 0;
  let phi = DEFAULT_PHI;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function tick(): void {
    if (globe === null) return;
    if (!drag.active && !reduced) phi += DEFAULT_SPEED;
    const width = canvas.offsetWidth;
    globe.update({
      phi: phi + drag.phi,
      theta: DEFAULT_THETA + drag.theta,
      width,
      height: width,
    });
    frame = requestAnimationFrame(tick);
  }

  function start(): void {
    globe = createGlobe(canvas, buildOptions(canvas.offsetWidth, markers, arcs, phi, DEFAULT_THETA));
    canvas.style.opacity = "1";
    frame = requestAnimationFrame(tick);
  }

  const stopWatch = watchUntilSized(canvas, start);
  return () => {
    stopWatch();
    cancelAnimationFrame(frame);
    globe?.destroy();
  };
}

function pinLabelStyle(id: string): GlobeLabelStyle {
  return {
    "--globe-anchor": `--cobe-${id}`,
    "--globe-visible": `var(--cobe-visible-${id}, 0)`,
  };
}

function GlobeLabels({ markers }: { readonly markers: readonly GlobeMarker[] }): ReactElement {
  return (
    <>
      {markers.map((marker) =>
        marker.label === undefined ? null : (
          <div key={marker.id} className="globe-marker-label" style={pinLabelStyle(marker.id)}>
            {marker.label}
          </div>
        ),
      )}
    </>
  );
}

function onGlobePointerDown(drag: GlobeDrag, event: ReactPointerEvent<HTMLCanvasElement>): void {
  event.currentTarget.setPointerCapture(event.pointerId);
  startGlobeDrag(drag, event.clientX, event.clientY);
  event.currentTarget.style.cursor = "grabbing";
}

function onGlobePointerMove(drag: GlobeDrag, event: ReactPointerEvent<HTMLCanvasElement>): void {
  moveGlobeDrag(drag, event.clientX, event.clientY);
}

function onGlobePointerUp(drag: GlobeDrag, event: ReactPointerEvent<HTMLCanvasElement>): void {
  endGlobeDrag(drag);
  event.currentTarget.style.cursor = "grab";
}

/** Cobe v2 WebGL globe. Auto-spins unless the user is dragging or prefers reduced motion. */
export function Globe({ markers, arcs }: GlobeProps): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragRef = useRef<GlobeDrag>(createGlobeDrag());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    return runGlobe(canvas, markers, arcs, dragRef.current);
  }, [markers, arcs]);

  return (
    <div className="relative aspect-square w-full select-none">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        onPointerDown={(event) => onGlobePointerDown(dragRef.current, event)}
        onPointerMove={(event) => onGlobePointerMove(dragRef.current, event)}
        onPointerUp={(event) => onGlobePointerUp(dragRef.current, event)}
        onPointerCancel={(event) => onGlobePointerUp(dragRef.current, event)}
        className="size-full cursor-grab rounded-full touch-none opacity-0 transition-opacity duration-[1.2s] ease motion-reduce:opacity-100 motion-reduce:transition-none"
      />
      <GlobeLabels markers={markers} />
    </div>
  );
}

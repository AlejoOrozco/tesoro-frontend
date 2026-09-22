export interface GlobeDrag {
  active: boolean;
  originX: number;
  originY: number;
  phi: number;
  theta: number;
  basePhi: number;
  baseTheta: number;
}

const PHI_DRAG = 300;
const THETA_DRAG = 1000;
const THETA_MIN = -0.4;
const THETA_MAX = 0.4;

export function createGlobeDrag(): GlobeDrag {
  return {
    active: false,
    originX: 0,
    originY: 0,
    phi: 0,
    theta: 0,
    basePhi: 0,
    baseTheta: 0,
  };
}

function clampTheta(value: number): number {
  if (value < THETA_MIN) return THETA_MIN;
  if (value > THETA_MAX) return THETA_MAX;
  return value;
}

export function startGlobeDrag(drag: GlobeDrag, x: number, y: number): void {
  drag.active = true;
  drag.originX = x;
  drag.originY = y;
  drag.basePhi = drag.phi;
  drag.baseTheta = drag.theta;
}

export function moveGlobeDrag(drag: GlobeDrag, x: number, y: number): void {
  if (!drag.active) return;
  drag.phi = drag.basePhi + (x - drag.originX) / PHI_DRAG;
  drag.theta = clampTheta(drag.baseTheta + (y - drag.originY) / THETA_DRAG);
}

export function endGlobeDrag(drag: GlobeDrag): void {
  drag.active = false;
}

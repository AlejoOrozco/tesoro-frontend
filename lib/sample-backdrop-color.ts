const SAMPLE_WIDTH = 320;
const BOTTOM_FRACTION = 0.04;
const BRIGHT_LUMA = 0.55;

interface Rgb {
  readonly red: number;
  readonly green: number;
  readonly blue: number;
  readonly luma: number;
}

/** Color of the banner's lit bottom edge, as `rgb(r, g, b)`. Near-white product pixels are left out. */
export function sampleBackdropColor(image: HTMLImageElement): string | null {
  const data = bottomEdge(image);
  if (!data) return null;
  const kept = edgePixels(data);
  if (kept.length === 0) return null;
  return formatRgb(average(lighterHalf(kept)));
}

function bottomEdge(image: HTMLImageElement): Uint8ClampedArray | null {
  if (image.naturalWidth === 0 || image.naturalHeight === 0) return null;
  const sampleHeight = Math.max(1, Math.round((SAMPLE_WIDTH * image.naturalHeight) / image.naturalWidth));
  const canvas = document.createElement("canvas");
  canvas.width = SAMPLE_WIDTH;
  canvas.height = sampleHeight;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return null;
  context.drawImage(image, 0, 0, SAMPLE_WIDTH, sampleHeight);
  const startRow = Math.floor(sampleHeight * (1 - BOTTOM_FRACTION));
  try {
    return context.getImageData(0, startRow, SAMPLE_WIDTH, sampleHeight - startRow).data;
  } catch {
    return null;
  }
}

function edgePixels(data: Uint8ClampedArray): Rgb[] {
  const pixels: Rgb[] = [];
  for (let index = 0; index < data.length; index += 4) {
    const pixel = readPixel(data, index);
    if (pixel) pixels.push(pixel);
  }
  return pixels;
}

function readPixel(data: Uint8ClampedArray, index: number): Rgb | null {
  const red = data[index] ?? 0;
  const green = data[index + 1] ?? 0;
  const blue = data[index + 2] ?? 0;
  const alpha = data[index + 3] ?? 0;
  if (alpha < 16) return null;
  const luma = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
  if (luma > BRIGHT_LUMA) return null;
  return { red, green, blue, luma };
}

/** The brighter half of the edge. Dark corners would paint a stripe under the glow in the art. */
function lighterHalf(pixels: readonly Rgb[]): readonly Rgb[] {
  const sorted = [...pixels].sort((left, right) => left.luma - right.luma);
  return sorted.slice(Math.floor(sorted.length / 2));
}

function average(pixels: readonly Rgb[]): Rgb {
  let red = 0;
  let green = 0;
  let blue = 0;
  for (const pixel of pixels) {
    red += pixel.red;
    green += pixel.green;
    blue += pixel.blue;
  }
  const count = pixels.length;
  return { red: red / count, green: green / count, blue: blue / count, luma: 0 };
}

function formatRgb(pixel: Rgb): string {
  return `rgb(${Math.round(pixel.red)}, ${Math.round(pixel.green)}, ${Math.round(pixel.blue)})`;
}

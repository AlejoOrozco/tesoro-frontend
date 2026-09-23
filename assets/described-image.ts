import type { StaticImageData } from "next/image";

/** A content image and the Spanish description search engines read from its alt text. */
export interface DescribedImage {
  readonly src: StaticImageData;
  readonly alt: string;
}

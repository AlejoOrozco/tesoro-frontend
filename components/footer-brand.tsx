import Image from "next/image";
import type { ReactElement } from "react";

import { brandAssets } from "@/assets/brand";
import { InstagramIcon, TikTokIcon } from "@/components/icons";
import { SOCIAL_LINKS } from "@/lib/social";

const SOCIAL_ICONS = {
  tiktok: TikTokIcon,
  instagram: InstagramIcon,
} as const;

const SOCIAL_LINK_CLASSES =
  "inline-flex size-11 items-center justify-center rounded-md text-chrome-foreground " +
  "transition-colors duration-micro hover:text-gold-200 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function FooterSocial(): ReactElement {
  return (
    <ul className="flex items-center gap-1">
      {SOCIAL_LINKS.map((link) => {
        const Icon = SOCIAL_ICONS[link.id];
        return (
          <li key={link.id}>
            <a
              href={link.href}
              className={SOCIAL_LINK_CLASSES}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
            >
              <Icon className="size-6" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** Stacked gold lockup with wordmark, plus TikTok and Instagram. */
export function FooterBrand(): ReactElement {
  return (
    <div className="flex w-fit flex-col items-center gap-4">
      <span className="relative block h-32 w-40 overflow-hidden sm:h-36 sm:w-44">
        <Image
          src={brandAssets.logoGoldNoBackground.src}
          alt={brandAssets.logoGoldNoBackground.alt}
          fill
          sizes="176px"
          className="object-contain object-center scale-125"
        />
      </span>
      <FooterSocial />
    </div>
  );
}

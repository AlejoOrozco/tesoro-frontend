export interface SocialLink {
  readonly id: "tiktok" | "instagram";
  readonly href: string;
  readonly label: string;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    id: "tiktok",
    href: "https://www.tiktok.com/@tesoro.global.sas",
    label: "TikTok",
  },
  {
    id: "instagram",
    href: "https://www.instagram.com/tesoroglobalsas/?hl=es-la",
    label: "Instagram",
  },
];

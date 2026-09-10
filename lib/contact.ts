export interface ContactInfo {
  readonly phoneDisplay: string;
  readonly phoneTel: string;
  readonly whatsappNumber: string;
  readonly email: string;
}

export const contact: ContactInfo = {
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "",
  phoneTel: process.env.NEXT_PUBLIC_PHONE_TEL ?? "",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
};

/**
 * WhatsApp deep link, optionally with a prefilled message. Returns null while
 * the number isn't configured so consumers can skip rendering dead links.
 */
export function whatsappUrl(message?: string): string | null {
  if (contact.whatsappNumber === "") return null;
  const base = `https://wa.me/${contact.whatsappNumber}`;
  if (message === undefined) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

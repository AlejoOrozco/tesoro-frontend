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

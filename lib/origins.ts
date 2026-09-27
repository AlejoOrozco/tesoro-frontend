import { logger } from "@/lib/logger";

export interface SiteOrigins {
  readonly apiOrigin: string | null;
  readonly appOrigin: string | null;
}

/** Public origins. Client code receives these as props so the browser can call the API. */
function readOrigin(value: string | undefined): string | null {
  if (value === undefined) return null;
  const trimmed = value.trim().replace(/\/+$/, "");
  if (trimmed === "") return null;
  return trimmed;
}

let reportedMissingApi = false;
let reportedMissingApp = false;

export function readSiteOrigins(): SiteOrigins {
  const apiOrigin = readOrigin(process.env.NEXT_PUBLIC_API_ORIGIN_URL);
  const appOrigin = readOrigin(process.env.NEXT_PUBLIC_APP_ORIGIN_URL);
  if (apiOrigin === null && !reportedMissingApi) {
    reportedMissingApi = true;
    logger.error("NEXT_PUBLIC_API_ORIGIN_URL is not set");
  }
  if (appOrigin === null && !reportedMissingApp) {
    reportedMissingApp = true;
    logger.error("NEXT_PUBLIC_APP_ORIGIN_URL is not set");
  }
  return { apiOrigin, appOrigin };
}

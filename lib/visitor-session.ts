import { logger } from "@/lib/logger";

/**
 * The session cookies are HttpOnly. This is the only copy of the CSRF token
 * the page may hold, and it is empty again after a refresh.
 */
let csrfToken: string | null = null;

export function getCsrfToken(): string | null {
  return csrfToken;
}

export function setCsrfToken(token: string | null): void {
  csrfToken = token;
}

export type VisitorSession = { readonly status: "loading" } | { readonly status: "anonymous" } | { readonly status: "signed-in" };

const ANONYMOUS: VisitorSession = { status: "anonymous" };
const SIGNED_IN: VisitorSession = { status: "signed-in" };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readCsrfToken(value: unknown): string | null {
  if (!isRecord(value)) return null;
  const token = value.csrfToken;
  if (typeof token !== "string" || token.length === 0) return null;
  return token;
}

function isAbortError(cause: unknown): boolean {
  return cause instanceof Error && cause.name === "AbortError";
}

async function readSignedIn(response: Response): Promise<VisitorSession> {
  try {
    const body: unknown = await response.json();
    const token = readCsrfToken(body);
    if (token === null) logger.error("GET /auth/me returned 200 without a csrfToken");
    setCsrfToken(token);
  } catch (cause) {
    logger.error("GET /auth/me returned 200 with an unreadable body", cause);
    setCsrfToken(null);
  }
  return SIGNED_IN;
}

/** `GET /auth/me`. Anything other than 200 is treated as signed out. */
export async function loadVisitorSession(apiOrigin: string | null, signal?: AbortSignal): Promise<VisitorSession> {
  if (apiOrigin === null) {
    setCsrfToken(null);
    return ANONYMOUS;
  }

  try {
    const response = await fetch(`${apiOrigin}/auth/me`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
      signal,
    });
    if (response.status === 200) return readSignedIn(response);
    if (response.status !== 401) logger.error(`GET /auth/me failed with status ${response.status}`);
    setCsrfToken(null);
    return ANONYMOUS;
  } catch (cause) {
    if (isAbortError(cause)) return ANONYMOUS;
    logger.error("GET /auth/me failed", cause);
    setCsrfToken(null);
    return ANONYMOUS;
  }
}

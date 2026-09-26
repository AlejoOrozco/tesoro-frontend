"use client";

import { useEffect, useState } from "react";

import { loadVisitorSession, type VisitorSession } from "@/lib/visitor-session";

const LOADING: VisitorSession = { status: "loading" };

/** Resolves once on mount so the header does not flash the signed-out label. */
export function useVisitorSession(apiOrigin: string | null): VisitorSession {
  const [session, setSession] = useState<VisitorSession>(LOADING);

  useEffect(() => {
    const controller = new AbortController();
    void loadVisitorSession(apiOrigin, controller.signal).then((next) => {
      if (!controller.signal.aborted) setSession(next);
    });
    return () => {
      controller.abort();
    };
  }, [apiOrigin]);

  return session;
}

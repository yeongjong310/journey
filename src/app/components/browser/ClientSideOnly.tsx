"use client";

import { hasWindow } from "@/app/utils/browser";

export function ClientSideOnly({ children }: { children: React.ReactNode }) {
  return hasWindow() ? children : null;
}

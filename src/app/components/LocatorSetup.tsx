"use client";

import { useEffect } from "react";

export function LocatorSetup() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    function handleClick(e: MouseEvent) {
      if (!e.altKey) return;

      const target = (e.target as HTMLElement).closest("[data-locatorjs]");
      if (!target) return;

      e.preventDefault();
      e.stopPropagation();

      const loc = target.getAttribute("data-locatorjs");
      if (loc) {
        window.open(`cursor://file${loc}`);
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}

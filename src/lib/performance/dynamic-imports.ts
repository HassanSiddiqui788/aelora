import type { ComponentType } from "react";

/**
 * Lazy-load client components with a consistent loading boundary.
 * Use for heavy client-only modules (Three.js, GSAP, etc.) in future phases.
 */
export async function loadClientComponent<T extends ComponentType<unknown>>(
  loader: () => Promise<{ default: T }>,
): Promise<T> {
  const dynamicModule = await loader();
  return dynamicModule.default;
}

/**
 * Preload a dynamic import on idle — useful for anticipated navigation.
 */
export function preloadComponent(loader: () => Promise<unknown>): void {
  if (typeof window === "undefined") return;

  const preload = () => {
    void loader();
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(preload);
  } else {
    setTimeout(preload, 200);
  }
}

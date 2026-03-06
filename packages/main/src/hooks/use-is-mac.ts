/**
 * Platform detection hook for React components
 * Determines whether the current user agent is running on a macOS device.
 * Useful for rendering platform-specific keyboard shortcuts or UI variations.
 */

"use client";

import { useEffect, useState } from "react";

/**
 * React hook that returns whether the current platform is macOS.
 *
 * This hook:
 * - Runs only on the client (browser) side.
 * - Checks `navigator.platform` and normalizes the value to uppercase.
 * - Returns a boolean indicating if the platform contains `"MAC"`.
 *
 * @returns `true` if the current platform is macOS, otherwise `false`.
 *
 * @example
 * ```tsx
 * const isMac = useIsMac();
 *
 * return (
 *   <kbd>
 *     {isMac ? "⌘" : "Ctrl"} + K
 *   </kbd>
 * );
 * ```
 */
export function useIsMac() {
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().includes("MAC"));
  }, []);

  return isMac;
}

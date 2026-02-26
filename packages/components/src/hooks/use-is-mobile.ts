"use client";

import * as React from "react";

const DEFAULT_MOBILE_BREAKPOINT = 1024;

export function useIsMobile(breakpoint: number = DEFAULT_MOBILE_BREAKPOINT) {
  /**
   * State to track mobile status
   * Starts as undefined to handle SSR properly and prevent hydration mismatches
   * Will be updated to actual boolean value after client-side mount
   */
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    /**
     * Create media query list for the specified breakpoint
     * Uses max-width approach: viewport <= (breakpoint - 1)px is considered mobile
     * The -1 ensures clean breakpoint boundaries (e.g., 991px and below for 1024px breakpoint)
     */
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    /**
     * Handler function to update mobile state when viewport changes
     * Uses window.innerWidth for consistent and reliable viewport width detection
     * This approach works consistently across different browsers and devices
     */
    const onChange = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Add event listener for viewport size changes
    mql.addEventListener("change", onChange);

    // Set initial state immediately on mount to prevent flash
    setIsMobile(window.innerWidth < breakpoint);

    // Cleanup function to remove event listener and prevent memory leaks
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]); // Re-run effect when breakpoint changes

  /**
   * Return boolean value, converting undefined to false for SSR safety
   * During SSR and initial client render: undefined -> false
   * After client-side hydration: actual boolean value based on viewport width
   * This approach prevents hydration mismatches while providing accurate mobile detection
   */
  return !!isMobile;
}

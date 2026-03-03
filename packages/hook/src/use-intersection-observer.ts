/**
 * Intersection observer hook for React components
 * Efficiently observes visibility of DOM elements using a shared IntersectionObserver instance.
 * Ideal for lazy loading, infinite scrolling, and animating elements when they enter the viewport.
 */

"use client";

import * as React from "react";

/**
 * Configuration options for the `useIntersectionObserver` hook.
 *
 * Extends the native `IntersectionObserverInit` options with an additional
 * convenience flag for freezing the observer state.
 */
interface IntersectionObserverOptions extends IntersectionObserverInit {
  /**
   * When `true`, the hook stops observing once the element becomes visible
   * and keeps returning `true` for subsequent renders.
   *
   * This is useful for one-time animations or lazy loading where you only
   * care about the first time an element enters the viewport.
   */
  freezeOnceVisible?: boolean;
}

/**
 * A shared intersection observer to manage multiple targets with a single observer instance.
 * Optimized for high-density lists (like the patterns grid).
 */
class SharedObserver {
  private observer: IntersectionObserver | null = null;
  private callbacks = new Map<Element, (isIntersecting: boolean) => void>();
  private options: IntersectionObserverInit;

  constructor(options: IntersectionObserverInit) {
    this.options = options;
  }

  private getObserver() {
    if (!this.observer) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const callback = this.callbacks.get(entry.target);
          if (callback) {
            callback(entry.isIntersecting);
          }
        });
      }, this.options);
    }
    return this.observer;
  }

  observe(element: Element, callback: (isIntersecting: boolean) => void) {
    this.callbacks.set(element, callback);
    this.getObserver().observe(element);
  }

  unobserve(element: Element) {
    this.callbacks.delete(element);
    this.observer?.unobserve(element);
  }

  disconnect() {
    this.observer?.disconnect();
    this.callbacks.clear();
    this.observer = null;
  }
}

// Singleton instances for common root margins to maximize reuse
const observers = new Map<string, SharedObserver>();

/**
 * Get or create a shared `IntersectionObserver` instance based on the provided options.
 *
 * Using a shared observer reduces the number of underlying `IntersectionObserver`
 * instances created by the browser, which is especially beneficial for pages
 * with many observed elements.
 *
 * @param options - Intersection observer configuration (threshold, root, rootMargin)
 * @returns A shared `SharedObserver` instance for the given options
 */
function getSharedObserver(options: IntersectionObserverInit) {
  const key = JSON.stringify(options);
  if (!observers.has(key)) {
    observers.set(key, new SharedObserver(options));
  }
  return observers.get(key)!;
}

/**
 * React hook that tracks whether a DOM element is currently intersecting the viewport.
 *
 * Features:
 * - Uses a shared `IntersectionObserver` instance for better performance.
 * - Supports custom `threshold`, `root`, and `rootMargin` options.
 * - Optional `freezeOnceVisible` flag to stop observing after first intersection.
 *
 * @param elementRef - React ref pointing to the DOM element to observe.
 * @param options - Optional observer configuration and behavior flags.
 * @param options.threshold - Intersection threshold(s) for triggering visibility changes.
 * @param options.root - Scrollable ancestor element to use as the viewport (defaults to browser viewport).
 * @param options.rootMargin - Margin around the root, expressed in CSS units (e.g. `"0px 0px -20% 0px"`).
 * @param options.freezeOnceVisible - When `true`, stops observing after the element first becomes visible.
 *
 * @returns `true` when the element is intersecting based on the given options, otherwise `false`.
 *
 * @example
 * ```tsx
 * const ref = React.useRef<HTMLDivElement | null>(null);
 * const isVisible = useIntersectionObserver(ref, {
 *   threshold: 0.2,
 *   rootMargin: "0px 0px -10% 0px",
 *   freezeOnceVisible: true,
 * });
 *
 * return (
 *   <div ref={ref} className={isVisible ? "animate-in" : "opacity-0"}>
 *     I will animate when I enter the viewport.
 *   </div>
 * );
 * ```
 */
export function useIntersectionObserver(
  elementRef: React.RefObject<Element | null>,
  {
    threshold = 0,
    root = null,
    rootMargin = "0%",
    freezeOnceVisible = false,
  }: IntersectionObserverOptions = {},
): boolean {
  const [isIntersecting, setIntersecting] = React.useState(false);
  const frozen = React.useRef(false);

  React.useEffect(() => {
    const element = elementRef?.current;
    if (!element || (freezeOnceVisible && frozen.current)) return;

    const observer = getSharedObserver({ threshold, root, rootMargin });

    observer.observe(element, (intersecting) => {
      setIntersecting(intersecting);
      if (intersecting && freezeOnceVisible) {
        frozen.current = true;
        observer.unobserve(element);
      }
    });

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, threshold, root, rootMargin, freezeOnceVisible]);

  return isIntersecting;
}

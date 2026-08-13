import { useEffect, useLayoutEffect, useState } from 'react';

/**
 * `useLayoutEffect` in the browser, `useEffect` on the server.
 *
 * The initial scroll position has to be read before the browser paints,
 * otherwise a reload halfway down the page shows one frame of the
 * top-of-page state. React warns when `useLayoutEffect` runs during server
 * rendering, so the choice is made once at module scope. It must not be made
 * per render: that would change the hook call order.
 */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * The vertical scroll offset, updated at most once per frame.
 *
 * This hook had four separate defects, all of which showed up in a Lighthouse
 * trace as forced reflows attributed to `use-scroll-position.tsx:8`:
 *
 * 1. The hooks were called behind `if (typeof window === 'undefined')`, so the
 *    server rendered the component with zero hooks and the browser rendered it
 *    with two. React compares those, and a differing hook count is a hydration
 *    error rather than a fallback.
 * 2. `useEffect` had no dependency list, so it re-ran after every render. Since
 *    every scroll event set state, every scroll event also tore the listener
 *    down and built a new one.
 * 3. The listener was not passive, so the browser had to wait and see whether
 *    the handler would call `preventDefault` before it was allowed to scroll.
 * 4. `window.scrollY` was read straight out of the event handler. A scroll
 *    event can fire many times per frame, and each read forces the browser to
 *    flush pending layout to answer it.
 *
 * Both call sites only compare the result against a threshold, `scrollPos <
 * 100` in Hero and `scrollPos < heroHeightPx` in TopNav, so one value per
 * frame is all either of them can use.
 */
const useScrollPosition = (): number => {
  // Starts at zero on the server and in the first client render, which is what
  // makes the two agree. The real value arrives before the first paint, from
  // the layout effect below.
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useIsomorphicLayoutEffect(() => {
    let frame = 0;

    const read = (): void => {
      frame = 0;
      setScrollPosition(window.scrollY);
    };

    const handleScroll = (): void => {
      if (frame === 0) {
        frame = requestAnimationFrame(read);
      }
    };

    read();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (frame !== 0) {
        cancelAnimationFrame(frame);
      }

      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
};

export default useScrollPosition;

/**
 * The thin brand-coloured bar that sweeps across the top of the viewport while
 * a client-side route is being fetched and rendered.
 *
 * Imperative and outside React on purpose, for two reasons.
 *
 * It is driven by Gatsby's onPreRouteUpdate / onRouteUpdate / onRouteUpdateDelayed,
 * which cache-dir/navigation.js fires from outside the page's React tree. A
 * component would need a global event bridge to hear them and would gain
 * nothing for it.
 *
 * The second reason is the one that matters. Nothing here is rendered by
 * gatsby-ssr, and the element is not created until the first client-side
 * navigation, so the bar is absent from the served HTML and from the first
 * paint. LCP on this site was 18.3 s and is now 1.9 s, and the element that
 * decides it is the cookie banner. A solid background-color is not an LCP
 * candidate under the spec anyway — candidates are images, video posters,
 * url() background images and text — but "not in the document yet" is a
 * guarantee rather than an argument.
 *
 * Look and easing are taken from skytekx.com, which paints the same 3px fixed
 * strip with `transform: scaleX()` off a left origin.
 */

const ELEMENT_ID = 'ns-route-progress';

/**
 * How far and how long the bar creeps while the route is still pending.
 *
 * A single long decelerating transition to 92% replaces nprogress's setInterval
 * trickle: the same "fast at first, then crawling" shape, no timer, and it runs
 * on the compositor. The curve is skytekx.com's loadbar easing.
 */
const FILL_MS = 3000;
const FILL_TO = 0.92;
const FILL_EASING = 'cubic-bezier(0.15, 0.75, 0.25, 1)';

/** The closing sweep to 100%, and the fade that follows it. */
const SWEEP_MS = 180;
const FADE_MS = 220;

/**
 * How long the bar stays on screen before it is allowed to finish.
 *
 * Gatsby prefetches page data, so most navigations here resolve in well under
 * 100 ms and onPreRouteUpdate/onRouteUpdate land in the same handful of frames.
 * Without a floor the whole thing would be a one-frame flash, which reads as a
 * rendering glitch rather than as feedback.
 */
const MIN_VISIBLE_MS = 150;

/** Time from the start of the closing sweep to the bar being idle again. */
const RESET_MS = SWEEP_MS + FADE_MS;

/**
 * Last resort. Gatsby always follows a start with either onRouteUpdate or a
 * full `window.location` reload, so this should never fire; it exists so that a
 * bar can never be left hanging across the top of the site.
 */
const FAILSAFE_MS = 15000;

/**
 * Everything the bar does is transform and opacity, i.e. compositor-only, and
 * it is `position: fixed` with no sibling in flow. The site's CLS was just
 * brought back to 0 and this is the only shape that cannot move it.
 *
 * `pointer-events: none` is not cosmetic: the bar covers the top 3px of the
 * fixed TopNav (TopNav.tsx, `position: fixed; top: 0; z-index: 3`) and would
 * otherwise swallow clicks landing on the very edge of the nav.
 *
 * z-index sits one above the 9999 that global.css pins onto
 * `.chakra-popover__popper`.
 *
 * The brand token is read through the CSS variable rather than the hex because
 * `--chakra-colors-brand-500` is what src/styles/theme/system.ts emits on
 * `:where(html, .chakra-theme)`, and the bar hangs off `document.body` so it
 * inherits it. The literal is a fallback for the CMS routes, where jaen's
 * provider mounts under the `jaen` prefix and the site's variables may be
 * absent — a `var()` with no fallback would resolve to nothing there and paint
 * an invisible bar.
 *
 * skytekx.com switches its bar to `position: absolute` on coarse pointers,
 * because iOS Safari flashes a transparent band above a fixed `top: 0` element
 * while scrolling. That is deliberately not copied: their bar is permanent and
 * therefore on screen during scrolling, ours lives for about half a second
 * during a route change, and `absolute` would pin it to the top of the
 * document, where a visitor who navigates while scrolled down would never see
 * it.
 */
const STYLES = `
#${ELEMENT_ID} {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 10000;
  pointer-events: none;
  background: var(--chakra-colors-brand-500, #f77f00);
  opacity: 0;
  transform: scaleX(0);
  transform-origin: 0 50%;
  will-change: transform, opacity;
}

#${ELEMENT_ID}[data-state="loading"] {
  opacity: 1;
  transform: scaleX(${FILL_TO});
  transition: transform ${FILL_MS}ms ${FILL_EASING}, opacity 80ms linear;
}

#${ELEMENT_ID}[data-state="done"] {
  opacity: 0;
  transform: scaleX(1);
  transition: transform ${SWEEP_MS}ms ease-out,
    opacity ${FADE_MS}ms linear ${SWEEP_MS}ms;
}

/*
 * Reduced motion keeps the indicator and drops the travel: the bar is simply
 * there at full width and fades out, so there is state to read without
 * anything sliding across the viewport. The rules repeat the selectors of the
 * two above and come later in the sheet, so they win on order at equal
 * specificity without !important.
 */
@media (prefers-reduced-motion: reduce) {
  #${ELEMENT_ID}[data-state="loading"] {
    transform: scaleX(1);
    transition: opacity 80ms linear;
  }

  #${ELEMENT_ID}[data-state="done"] {
    transform: scaleX(1);
    transition: opacity ${FADE_MS}ms linear;
  }
}
`;

let bar: HTMLDivElement | null = null;
let state: 'loading' | 'done' | null = null;
let startedAt = 0;
let resetTimer: number | undefined;
let failsafeTimer: number | undefined;

const mount = (): HTMLDivElement => {
  if (bar) return bar;

  const style = document.createElement('style');
  style.id = `${ELEMENT_ID}-style`;
  style.textContent = STYLES;
  document.head.appendChild(style);

  const element = document.createElement('div');
  element.id = ELEMENT_ID;
  // Purely decorative. Gatsby's own RouteAnnouncer live region already says
  // "Navigated to <title>" on every route update, so anything announced here
  // would be a duplicate.
  element.setAttribute('aria-hidden', 'true');
  // Appended to body rather than to the page wrapper so that no ancestor with
  // a transform, filter or backdrop-filter can turn into its containing block
  // and unpin the fixed position. TopNav already sets backdrop-filter.
  document.body.appendChild(element);

  bar = element;
  return element;
};

/**
 * Starts, or keeps, the bar running. Safe to call more than once per
 * navigation: a slow route fires onRouteUpdateDelayed first and
 * onPreRouteUpdate afterwards, and the second call must not rewind a bar that
 * is already most of the way across.
 */
export const startRouteProgress = (): void => {
  if (typeof document === 'undefined') return;
  if (state === 'loading') return;

  const element = mount();

  window.clearTimeout(resetTimer);
  window.clearTimeout(failsafeTimer);

  // Drop to the idle rule, which carries no transition, and force a style
  // recalculation before asking for `loading` again. Without the forced read
  // the browser coalesces both attribute writes into one computed-style change
  // and the fill animates down from wherever the previous closing sweep left
  // it instead of starting at zero.
  element.removeAttribute('data-state');
  element.getBoundingClientRect();

  state = 'loading';
  startedAt = Date.now();
  element.setAttribute('data-state', 'loading');

  failsafeTimer = window.setTimeout(finishRouteProgress, FAILSAFE_MS);
};

/**
 * Runs the closing sweep and fade. A no-op when no navigation is in flight,
 * which is what keeps the initial page load out of it: the very first
 * onRouteUpdate arrives before anything has ever started the bar, so this
 * returns without so much as creating the element.
 */
export const finishRouteProgress = (): void => {
  if (!bar || state !== 'loading') return;

  const element = bar;

  window.clearTimeout(failsafeTimer);
  window.clearTimeout(resetTimer);

  state = 'done';

  const remaining = Math.max(0, MIN_VISIBLE_MS - (Date.now() - startedAt));

  // setTimeout rather than a transitionend listener: transitions are paused in
  // a background tab, so transitionend may never arrive and the bar would come
  // back into view still on screen when the tab is refocused.
  resetTimer = window.setTimeout(() => {
    element.setAttribute('data-state', 'done');

    resetTimer = window.setTimeout(() => {
      element.removeAttribute('data-state');
      state = null;
    }, RESET_MS);
  }, remaining);
};

import type { GatsbyBrowser } from 'gatsby';

import {
  finishRouteProgress,
  startRouteProgress
} from './src/components/RouteProgressBar';
import './src/styles/global.css';

export { wrapPageElement } from './src/wrap-page-element';

/**
 * Show the route-progress bar, but never on the first render.
 *
 * cache-dir/navigation.js calls `onPreRouteUpdate(props.location, null)` from
 * the RouteUpdates constructor and `onRouteUpdate(this.props.location, null)`
 * from its componentDidMount, so both APIs fire once during hydration of a
 * cold load. `prevLocation` is the only thing that tells that apart from a real
 * navigation, and the guard is what keeps a full-width coloured bar from
 * painting while the page is still settling its LCP.
 *
 * Same-pathname updates are skipped as well. A hash jump or a query-string
 * change goes through RouteUpdates exactly like a navigation does, but Gatsby
 * keys page resources by pathname, so nothing is being loaded and there is
 * nothing to report.
 */
export const onPreRouteUpdate: GatsbyBrowser['onPreRouteUpdate'] = ({
  location,
  prevLocation
}) => {
  if (!prevLocation) return;
  if (location.pathname === prevLocation.pathname) return;

  startRouteProgress();
};

/**
 * The one case onPreRouteUpdate cannot cover.
 *
 * `navigate()` in cache-dir/navigation.js awaits `loader.loadPage()` before it
 * hands the URL to reach-router, so on a route whose data is not prefetched the
 * entire wait happens *before* onPreRouteUpdate fires and the bar would only
 * ever cover the React render. Gatsby fires this API 1000 ms into such a wait,
 * which is exactly the case worth reporting.
 */
export const onRouteUpdateDelayed: GatsbyBrowser['onRouteUpdateDelayed'] =
  () => {
    startRouteProgress();
  };

/**
 * Unconditional on purpose. onPreRouteUpdate decides whether a bar exists at
 * all; this one only has to make sure that whatever is running stops, and it is
 * a no-op when nothing is. Gating it the same way would strand the bar when
 * onRouteUpdateDelayed started it for a same-pathname navigation.
 */
export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = () => {
  finishRouteProgress();
};

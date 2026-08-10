/**
 * Tag that marks a product as recently released.
 *
 * This is a SENTINEL, not a label. It travels in `product.tags` from
 * `useJaenProducts` (src/hooks/use-products.tsx) to `ProductCard`, which
 * both tests for it and hides it from the plain tag line. Translating it
 * would break every one of those comparisons, so the value stays fixed and
 * the visible badge text comes from the `ProductCardBadgeNew` message
 * instead.
 */
export const NEW_PRODUCT_TAG = 'Neu';

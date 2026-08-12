'use client';

import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';

/**
 * Scroll-in fade, without framer-motion.
 *
 * framer cost 367 KB of the bundle for this file, ArrowPattern and GridPattern
 * together, and all three animate properties the compositor can do on its own.
 * What framer gave here was `whileInView` plus a stagger, which is an
 * IntersectionObserver and a transition-delay.
 *
 * The rendered result is the same in both directions: hidden means opacity 0
 * and 24px down, visible means opacity 1 at rest, over 500ms, triggered once
 * when the element comes within 200px of the bottom of the viewport. The
 * reduced-motion branch keeps the fade and drops the travel, exactly as
 * framer's `useReducedMotion` did.
 *
 * It stays a forwardRef component that spreads every prop, because two call
 * sites depend on that: Hero mounts it through Chakra's `asChild`, which clones
 * it with the parent's className and ref, and AltTopNav passes it as `as={}`,
 * which hands it the resolved Box props.
 */

const StaggerContext = createContext<number | null>(null);

/** Matches framer's `viewport={{margin: '0px 0px -200px'}}`. */
const ROOT_MARGIN = '0px 0px -200px 0px';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const FadeIn = forwardRef<HTMLDivElement, any>(function FadeIn(
  {className, style, children, ...props},
  ref
) {
  const own = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const stagger = useContext(StaggerContext);
  const index = useRef<number>(0);

  useEffect(() => {
    const el = own.current;
    if (!el) return;

    // No observer means no way to know when it scrolls in, so show it rather
    // than leave it invisible forever.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    // Its position among its siblings is what the stagger delay counts.
    if (stagger !== null && el.parentElement) {
      index.current = [...el.parentElement.children].indexOf(el);
    }

    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      {rootMargin: ROOT_MARGIN}
    );
    io.observe(el);

    return () => {
      io.disconnect();
    };
  }, [stagger]);

  const travel = prefersReducedMotion() ? '0' : '24px';

  return (
    <div
      {...props}
      ref={node => {
        own.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as any).current = node;
      }}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : `translateY(${travel})`,
        transition: 'opacity 500ms ease, transform 500ms ease',
        transitionDelay:
          stagger !== null && !visible ? undefined : `${(stagger ?? 0) * index.current}s`,
        willChange: visible ? undefined : 'opacity, transform',
        ...style
      }}>
      {children}
    </div>
  );
});

/**
 * Kept for the same reason it existed before: nothing renders it today, and the
 * export is part of the module's surface. The delay it used to hand down
 * through framer's `staggerChildren` is now a number in context, which FadeIn
 * multiplies by its own position.
 */
export function FadeInStagger({
  faster = false,
  children,
  ...props
}: {faster?: boolean; children?: React.ReactNode; [key: string]: any}) {
  return (
    <StaggerContext.Provider value={faster ? 0.12 : 0.2}>
      <div {...props}>{children}</div>
    </StaggerContext.Provider>
  );
}

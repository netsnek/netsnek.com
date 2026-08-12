import {
  Component,
  FC,
  ReactNode,
  useEffect,
  useId,
  useRef,
  useState
} from 'react';
import { Box, Button, ButtonGroup, chakra } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import type { TabsProps } from 'jaen-fields-mdx';

/**
 * The hero must survive whatever the visitor types.
 *
 * The mdx field holds on to its last good render by itself, so a document
 * that stops parsing leaves the drawing standing. That covers the compile
 * step. It does not cover the render step: a document can parse perfectly and
 * still throw while React builds it, from an attribute React refuses or an
 * element used in a way its component cannot handle. Nothing catches that on
 * the way up, and an uncaught render error unmounts the whole page. On the
 * home page of the site that is the worst possible outcome for a sandbox
 * nobody was even asked to use.
 *
 * So the panel gets a boundary of its own, and it falls back to the drawing
 * as it last stood rather than to an apology.
 */
class PreviewGuard extends Component<
  { resetKey: unknown; fallback: () => ReactNode; children: ReactNode },
  { hasFailed: boolean }
> {
  state = { hasFailed: false };

  static getDerivedStateFromError() {
    return { hasFailed: true };
  }

  componentDidUpdate(previous: { resetKey: unknown }) {
    // Without this the boundary latches: the first throw would freeze the
    // preview for good and every later keystroke, including the one that
    // fixes the document, would render nothing.
    if (this.state.hasFailed && previous.resetKey !== this.props.resetKey) {
      this.setState({ hasFailed: false });
    }
  }

  render() {
    return this.state.hasFailed ? this.props.fallback() : this.props.children;
  }
}

/** Tab order as the mdx field builds it: preview first, editor second. */
const PREVIEW_TAB = 0;
const EDITOR_TAB = 1;

/**
 * The switcher for the hero playground.
 *
 * The mdx field hands its tabs to whatever template it is given, so this
 * replaces the field's default Chakra tab bar with two pills, and uses the
 * validity the field already computes to outline the editor: brand while the
 * source parses, red while it does not.
 *
 * The preview keeps the last drawing that parsed, which is the field's own
 * behaviour, so typing a broken tag leaves the artwork standing instead of
 * blanking the hero.
 */
/** The two arrows of the mark, split out of the brand file's double arrow. */
const ARROW_UP = 'M 30.99 1 L 28 1 L 31 11 L 1 11 L 4 21 L 50.99 21 Z';
const ARROW_DOWN = 'M 52 25 L 5.01 25 L 25.01 45 L 28 45 L 25 35 L 55 35 Z';

/**
 * The pair of arrows that sits between the two switches.
 *
 * The upper arrow points right, at the second view, the lower one points
 * left, at the first. The one pointing at the view you are looking at is
 * filled, the other is drawn as an outline, so the pair reads as a marker of
 * where you are rather than as decoration.
 */
const ViewArrows: FC<{ activeTab: number }> = ({ activeTab }) => {
  // Use React.useId instead (available in React 18+)
  const id = useId();
  // Filled points where you have to click to change the view, not where you
  // already are. The upper arrow points right at the source, the lower one
  // left at the prototype, so the filled one is always the invitation.
  const upFilled = activeTab === PREVIEW_TAB;

  /**
   * One arrow, filled or hollow, at exactly the same size either way.
   *
   * A stroke sits centred on its path, so half of it lies outside the shape
   * and the hollow arrow would stand larger than the filled one. Drawing the
   * stroke at twice the width and clipping it to its own outline leaves only
   * the inner half, which puts the line inside the silhouette instead of
   * around it. Both arrows then occupy the identical area.
   */
  const arrow = (d: string, filled: boolean, key: string) =>
    filled ? (
      <path key={key} d={d} fill="var(--chakra-colors-brand-500)" />
    ) : (
      <path
        key={key}
        d={d}
        fill="none"
        stroke="var(--chakra-colors-brand-500)"
        strokeWidth={6}
        clipPath={`url(#${id}-${key})`}
      />
    );

  return (
    <chakra.svg
      viewBox="0 0 56 46"
      // Beide Pfeile zusammen stehen so hoch wie die Knoepfe daneben, eine
      // Spur darunter. Die Breite folgt dem viewBox-Verhaeltnis 56 zu 46.
      w="27px"
      h="22px"
      flexShrink={0}
      aria-hidden="true"
      display="block"
    >
      <defs>
        <clipPath id={`${id}-up`}>
          <path d={ARROW_UP} />
        </clipPath>
        <clipPath id={`${id}-down`}>
          <path d={ARROW_DOWN} />
        </clipPath>
      </defs>
      {arrow(ARROW_UP, upFilled, 'up')}
      {arrow(ARROW_DOWN, !upFilled, 'down')}
    </chakra.svg>
  );
};

export const HeroEditorTabs: FC<TabsProps> = ({ tabs, selectedTab, stats }) => {
  const intl = useIntl();
  const [tab, setTab] = useState(selectedTab ?? PREVIEW_TAB);

  const isBroken = (stats?.fatal ?? 0) > 0;

  // Latch the last good state so the outline does not flicker between
  // keystrokes while the parser catches up.
  const [wasValid, setWasValid] = useState(true);

  useEffect(() => {
    if (!isBroken) setWasValid(true);
    else setWasValid(false);
  }, [isBroken]);

  // The outline appears and disappears with the editor, in the same frame.
  // It used to animate, which made it lag behind the switch in one direction
  // and run ahead of it in the other, so there is no transition on it at all.
  // The brand to red change while typing does not need one either: wasValid
  // above already latches, so it cannot flicker between keystrokes.
  const isEditorOutlined = tab === EDITOR_TAB;

  // The drawing as it last stood, kept as the markup the browser produced for
  // it. Re-rendering the last good SOURCE would mean a second mdx field and a
  // second parse for something that is already sitting in the DOM; this is the
  // drawing itself, to the pixel. The markup is our own output, built in this
  // browser from what this visitor typed, and it never leaves the tab.
  const panelRef = useRef<HTMLDivElement>(null);
  const lastGoodDrawing = useRef('');

  useEffect(() => {
    if (tab !== PREVIEW_TAB || isBroken) return;

    // Only a panel that actually holds a drawing counts. Deleting the whole
    // document compiles perfectly well, so without this the empty result would
    // be filed as the last good version and take the real one with it.
    if (!panelRef.current?.querySelector('svg')) return;

    lastGoodDrawing.current = panelRef.current.innerHTML;
  });

  const lastDrawing = () => (
    <Box dangerouslySetInnerHTML={{ __html: lastGoodDrawing.current }} />
  );

  const pill = (value: number, label: string) => (
    <Button
      size="xs"
      px={4}
      // Not xl. These sit at 24px against the site's 40px buttons, and an
      // identical radius there is half the height, which is why they still
      // read as pills. lg keeps the same proportion the rest has.
      borderRadius="lg"
      fontWeight="semibold"
      // The same pair the site uses everywhere: the active one filled, the
      // other an outline in brand colour.
      variant={tab === value ? 'solid' : 'outline'}
      color={tab === value ? 'white' : 'brand.500'}
      borderColor={tab === value ? 'transparent' : 'brand.500'}
      borderWidth={2}
      bg={tab === value ? undefined : 'white'}
      _hover={
        tab === value
          ? undefined
          : { borderColor: 'brand.400', color: 'brand.400' }
      }
      aria-pressed={tab === value}
      onClick={() => setTab(value)}
    >
      {label}
    </Button>
  );

  return (
    <Box position="relative">
      <Box display="flex" justifyContent="center" mb={3}>
        {/* Kein Rahmen um die beiden mehr: sie sind jetzt ein Buttonpaar
            wie ueberall sonst, kein Segment-Schalter in einer Schiene. */}
        <ButtonGroup size="xs" gap={2} w="fit-content" alignItems="center">
          {pill(
            PREVIEW_TAB,
            intl.formatMessage({
              id: 'HeroShowcasePreview',
              defaultMessage: 'Prototyp'
            })
          )}
          <ViewArrows activeTab={tab} />

          {pill(
            EDITOR_TAB,
            intl.formatMessage({
              id: 'HeroShowcaseCode',
              defaultMessage: 'Open Source'
            })
          )}
        </ButtonGroup>
      </Box>

      <Box
        ref={panelRef}
        borderRadius="xl"
        // The preview must not be clipped, the drawing's shadow reaches past
        // the device. The editor on the other hand needs a definite height,
        // because that is the only thing that makes CodeMirror scroll inside
        // itself instead of being cut off by whatever sits above it.
        overflow={tab === EDITOR_TAB ? 'hidden' : 'visible'}
        borderWidth={2}
        borderColor={
          isEditorOutlined
            ? wasValid
              ? 'brand.500'
              : 'red.400'
            : 'transparent'
        }
        boxShadow={
          isEditorOutlined
            ? wasValid
              ? '0 0 0 4px rgba(247, 127, 0, 0.15)'
              : '0 0 0 4px rgba(245, 101, 101, 0.15)'
            : 'none'
        }
        css={{
          // The drawing fills the panel and keeps its own proportions. This
          // is scoped to the panel on purpose: the same rule on the whole
          // hero would also resize the arrows between the switches.
          //
          // One ampersand, not two. Emotion expands every `&` to this
          // element's own class, so `& & svg` compiled to
          // `.css-x .css-x svg`, which nothing on the page can match, and the
          // drawing rendered at its intrinsic size.
          '& svg': {
            width: '100%',
            height: 'auto',
            display: 'block',
            overflow: 'visible'
          },

          '& .cm-editor': { height: { base: '320px', md: '420px' } },

          '& .cm-scroller': {
            fontSize: '12px',
            overflow: 'auto !important',
            // Keep the wheel inside the editor instead of scrolling the page
            // on once the source is at its end.
            overscrollBehavior: 'contain'
          }
        }}
      >
        {tab === PREVIEW_TAB ? (
          // Compiled is not the same as rendered, and the two failures need
          // different answers.
          //
          // A document that does not COMPILE never produces an element, so
          // nothing throws and no boundary fires: the field would simply put
          // its error messages where the drawing was. That case is caught
          // here, before the field is asked for anything.
          //
          // A document that compiles and then throws while React builds it,
          // which a plain `style="fill:#f77f00"` is enough to do, gets no
          // warning at all. That one needs the boundary.
          //
          // Both land on the same picture: the drawing as it last stood.
          isBroken ? (
            lastDrawing()
          ) : (
            // resetKey is the parse, not the keystroke. `stats` is memoized
            // per document, so it changes exactly when there is something new
            // to try and stays put through unrelated re-renders.
            <PreviewGuard resetKey={stats} fallback={lastDrawing}>
              {tabs[tab]?.content}
            </PreviewGuard>
          )
        ) : (
          tabs[tab]?.content
        )}
      </Box>
    </Box>
  );
};

export default HeroEditorTabs;

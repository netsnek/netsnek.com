import { FC, useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, chakra } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import type { TabsProps } from 'jaen-fields-mdx';

/** Tab order as the mdx field builds it: preview first, editor second. */
const PREVIEW_TAB = 0;
const EDITOR_TAB = 1;

/**
 * The switcher for the hero playground.
 *
 * The mdx field hands its tabs to whatever template it is given, so this
 * replaces the field's default Chakra tab bar with two pills, and uses the
 * validity the field already computes to outline the editor: green while the
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
  const upFilled = activeTab === EDITOR_TAB;

  return (
    <chakra.svg
      viewBox="0 0 56 46"
      // Deutlich kleiner als die Knoepfe daneben: ein Zeichen zwischen
      // ihnen, kein dritter Knopf.
      w="9px"
      h="7.5px"
      flexShrink={0}
      aria-hidden="true"
      display="block"
    >
      <path
        d={ARROW_UP}
        fill={upFilled ? 'var(--chakra-colors-brand-500)' : 'none'}
        stroke="var(--chakra-colors-brand-500)"
        strokeWidth={upFilled ? 0 : 4}
      />
      <path
        d={ARROW_DOWN}
        fill={upFilled ? 'none' : 'var(--chakra-colors-brand-500)'}
        stroke="var(--chakra-colors-brand-500)"
        strokeWidth={upFilled ? 4 : 0}
      />
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
  // The green to red change while typing does not need one either: wasValid
  // above already latches, so it cannot flicker between keystrokes.
  const isEditorOutlined = tab === EDITOR_TAB;

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
          : { borderColor: 'brand.600', color: 'brand.600' }
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
        <ButtonGroup size="xs" spacing={2} w="fit-content" alignItems="center">
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
              ? 'green.400'
              : 'red.400'
            : 'transparent'
        }
        boxShadow={
          isEditorOutlined
            ? wasValid
              ? '0 0 0 4px rgba(72, 187, 120, 0.15)'
              : '0 0 0 4px rgba(245, 101, 101, 0.15)'
            : 'none'
        }
        sx={{
          // The drawing fills the panel and keeps its own proportions. This
          // is scoped to the panel on purpose: the same rule on the whole
          // hero would also resize the arrows between the switches.
          '& svg': {
            width: '100%',
            height: 'auto',
            display: 'block',
            overflow: 'visible'
          },
          // CodeMirror only scrolls inside itself when it has a DEFINITE
          // height. A percentage is not one: it resolves against the mdx
          // field's own wrappers, which are auto, so the editor grew to its
          // content, never overflowed its scroller, and the surplus was
          // simply clipped by the box around it. An explicit height is the
          // one thing that works here, and the box takes its size from it.
          '.cm-editor': { height: { base: '320px', md: '420px' } },
          '.cm-scroller': {
            fontSize: '12px',
            overflow: 'auto !important',
            // Keep the wheel inside the editor instead of scrolling the page
            // on once the source is at its end.
            overscrollBehavior: 'contain'
          }
        }}
      >
        {tabs[tab]?.content}
      </Box>
    </Box>
  );
};

export default HeroEditorTabs;

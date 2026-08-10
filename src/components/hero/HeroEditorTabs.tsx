import { FC, useEffect, useState } from 'react';
import { Box, Button, ButtonGroup } from '@chakra-ui/react';
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

  // The outline follows the content instead of leading it. Both used to hang
  // off the same value, but the outline animates while swapping the tab takes
  // a moment, so on the way out the frame was already gone while the editor
  // was still standing. This state settles one paint later, which puts them
  // back in the right order.
  const [outlinedTab, setOutlinedTab] = useState(tab);

  useEffect(() => {
    setOutlinedTab(tab);
  }, [tab]);

  const isEditorOutlined = outlinedTab === EDITOR_TAB;

  const pill = (value: number, label: string) => (
    <Button
      size="xs"
      px={4}
      borderRadius="full"
      fontWeight="semibold"
      variant={tab === value ? 'solid' : 'ghost'}
      color={tab === value ? 'white' : 'gray.500'}
      aria-pressed={tab === value}
      onClick={() => setTab(value)}
    >
      {label}
    </Button>
  );

  return (
    <Box position="relative">
      <Box display="flex" justifyContent="center" mb={3}>
        <ButtonGroup
          size="xs"
          spacing={1}
          p={1}
          borderRadius="full"
          bg="blackAlpha.50"
          w="fit-content"
        >
          {pill(
            PREVIEW_TAB,
            intl.formatMessage({
              id: 'HeroShowcasePreview',
              defaultMessage: 'Prototyp'
            })
          )}
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
        transition="border-color 0.25s ease-in-out, box-shadow 0.25s ease-in-out"
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

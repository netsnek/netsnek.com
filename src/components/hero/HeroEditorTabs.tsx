import { FC, useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, HStack, Text } from '@chakra-ui/react';
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
    <Box
      position="relative"
      h="full"
      display="flex"
      flexDirection="column"
      minH={0}
    >
      <HStack justify="center" mb={3} spacing={3} flexShrink={0}>
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
              defaultMessage: 'Ansicht'
            })
          )}
          {pill(
            EDITOR_TAB,
            intl.formatMessage({
              id: 'HeroShowcaseCode',
              defaultMessage: 'Quelltext'
            })
          )}
        </ButtonGroup>

        {tab === EDITOR_TAB && (
          <HStack spacing={2} aria-live="polite">
            <Box
              boxSize={2}
              borderRadius="full"
              bg={wasValid ? 'green.400' : 'red.400'}
              transition="background-color 0.2s ease-in-out"
            />
            <Text fontSize="xs" color={wasValid ? 'green.600' : 'red.500'}>
              {wasValid
                ? intl.formatMessage({
                    id: 'HeroShowcaseValid',
                    defaultMessage: 'gültig'
                  })
                : intl.formatMessage({
                    id: 'HeroShowcaseInvalid',
                    defaultMessage: 'Syntaxfehler'
                  })}
            </Text>
          </HStack>
        )}
      </HStack>

      <Box
        borderRadius="xl"
        overflow="hidden"
        flex="1"
        minH={0}
        borderWidth={2}
        transition="border-color 0.25s ease-in-out, box-shadow 0.25s ease-in-out"
        borderColor={
          tab === EDITOR_TAB
            ? wasValid
              ? 'green.400'
              : 'red.400'
            : 'transparent'
        }
        boxShadow={
          tab === EDITOR_TAB
            ? wasValid
              ? '0 0 0 4px rgba(72, 187, 120, 0.15)'
              : '0 0 0 4px rgba(245, 101, 101, 0.15)'
            : 'none'
        }
        sx={{
          // CodeMirror only scrolls inside itself when it has a definite
          // height. A fixed one taller than this box meant the editor never
          // overflowed its own scroller, so the surplus was simply clipped by
          // the parent and unreachable. Filling the box makes the scroller do
          // its job.
          '.cm-editor': { height: '100%', maxHeight: '100%' },
          '.cm-scroller': {
            fontSize: '12px',
            overflow: 'auto',
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

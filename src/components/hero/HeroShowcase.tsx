import { FC, useLayoutEffect, useRef, useState } from 'react';
import {
  AspectRatio,
  Box,
  Button,
  ButtonGroup,
  Image,
  chakra
} from '@chakra-ui/react';
import { useIntl } from 'react-intl';

import Netsnek from '../../gatsby-plugin-jaen/components/Netsnek';

type ShowcaseView = 'preview' | 'code';

/**
 * Attributes that say nothing about the drawing and only add noise to the
 * source view: emotion's generated classes and React's own bookkeeping.
 * The semantic class names the logo animates on (snek, arrows, heart) are
 * kept, since those are the interesting part.
 */
const GENERATED_CLASS = /^css-[a-z0-9]+$/;

/**
 * Serialize a live SVG node into readable source.
 *
 * The markup is taken from the DOM rather than from a checked-in copy, so the
 * code pane always shows the drawing that is actually on screen, including
 * whatever the theme resolved. Emotion's generated class names are dropped,
 * every element goes on its own line, and nesting is indented.
 */
function serializeSvg(node: SVGSVGElement): string {
  const clone = node.cloneNode(true) as SVGSVGElement;

  clone.querySelectorAll('[class]').forEach(element => {
    const kept = Array.from(element.classList).filter(
      name => !GENERATED_CLASS.test(name)
    );

    if (kept.length > 0) {
      element.setAttribute('class', kept.join(' '));
    } else {
      element.removeAttribute('class');
    }
  });

  const markup = new XMLSerializer().serializeToString(clone);

  let depth = 0;

  return markup
    .replace(/></g, '>\n<')
    .split('\n')
    .map(line => {
      if (line.startsWith('</')) depth = Math.max(0, depth - 1);

      const indented = '  '.repeat(depth) + line;

      const opens =
        line.startsWith('<') &&
        !line.startsWith('</') &&
        !line.endsWith('/>') &&
        !line.includes('</');

      if (opens) depth += 1;

      return indented;
    })
    .join('\n');
}

export interface HeroShowcaseProps {
  /** Styles handed to the logo, so the caller keeps control of the artwork. */
  logoSx?: Record<string, any>;
}

/**
 * The hero artwork with a switch between the rendered logo and its source.
 *
 * The preview is the tablet with the animated mark on its screen. The code
 * view shows the very same drawing as markup, which is both an honest look
 * behind the artwork and a small statement about what this shop does.
 */
export const HeroShowcase: FC<HeroShowcaseProps> = ({ logoSx }) => {
  const intl = useIntl();
  const [view, setView] = useState<ShowcaseView>('preview');
  const [source, setSource] = useState('');
  const logoRef = useRef<HTMLDivElement>(null);

  // Read the markup once the logo is in the DOM. Layout effect rather than
  // effect so the code pane never paints empty on the first switch.
  useLayoutEffect(() => {
    const svg = logoRef.current?.querySelector('svg');

    if (svg) setSource(serializeSvg(svg as SVGSVGElement));
  }, []);

  const pill = (value: ShowcaseView, label: string) => (
    <Button
      size="xs"
      px={4}
      borderRadius="full"
      fontWeight="semibold"
      variant={view === value ? 'solid' : 'ghost'}
      color={view === value ? 'white' : 'gray.500'}
      aria-pressed={view === value}
      onClick={() => setView(value)}
    >
      {label}
    </Button>
  );

  return (
    <Box position="relative">
      <ButtonGroup
        size="xs"
        spacing={1}
        mb={3}
        p={1}
        borderRadius="full"
        bg="blackAlpha.50"
        w="fit-content"
        mx="auto"
      >
        {pill(
          'preview',
          intl.formatMessage({
            id: 'HeroShowcasePreview',
            defaultMessage: 'Ansicht'
          })
        )}
        {pill(
          'code',
          intl.formatMessage({
            id: 'HeroShowcaseCode',
            defaultMessage: 'Quelltext'
          })
        )}
      </ButtonGroup>

      <AspectRatio ratio={4 / 3} w="full" h="auto">
        <Box position="relative" w="full" h="full">
          {/* The logo stays mounted in both views. Unmounting it would
              restart its animation on every switch, and the code view reads
              its markup from this node. */}
          <Box
            ref={logoRef}
            position="absolute"
            inset={0}
            visibility={view === 'preview' ? 'visible' : 'hidden'}
          >
            <Image
              src="/images/iPad.png"
              alt={intl.formatMessage({
                id: 'HeroIpadImageAlt',
                defaultMessage: 'iPad image'
              })}
              objectFit="contain"
              position="absolute"
              inset={0}
              w="full"
              h="full"
            />
            <Netsnek
              position="absolute"
              mt="7%"
              p="5%"
              w="full"
              h="full"
              sx={logoSx}
            />
          </Box>

          {view === 'code' && (
            <Box
              position="absolute"
              inset={0}
              borderRadius="xl"
              bg="gray.900"
              color="gray.300"
              overflow="hidden"
              boxShadow="lg"
            >
              <chakra.pre
                h="full"
                overflow="auto"
                m={0}
                p={4}
                fontFamily="mono"
                fontSize={{ base: '2xs', md: 'xs' }}
                lineHeight="1.6"
                whiteSpace="pre"
                sx={{
                  // The mark is a wide drawing, so the pane scrolls in both
                  // directions rather than wrapping attributes mid-line.
                  '&::-webkit-scrollbar': { width: '8px', height: '8px' },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'whiteAlpha.300',
                    borderRadius: 'full'
                  }
                }}
              >
                {source}
              </chakra.pre>
            </Box>
          )}
        </Box>
      </AspectRatio>
    </Box>
  );
};

export default HeroShowcase;

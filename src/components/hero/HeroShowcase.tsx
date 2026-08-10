import { FC, useCallback, useMemo, useState } from 'react';
import { AspectRatio, Box, Image, chakra } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { UncontrolledMdxField } from 'jaen-fields-mdx';
import type { MdxFieldProps } from 'jaen-fields-mdx';

import HeroEditorTabs from './HeroEditorTabs';

/**
 * The drawing the hero starts with, as MDX.
 *
 * It is deliberately small and readable rather than the full brand mark: a
 * visitor should be able to find the fill colour in the first few seconds and
 * change it. The arrow is the one from the brand pattern.
 */
const INITIAL_SOURCE = `<svg viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="12" fill="#0A0A0A" />

  <g fill="#f77f00">
    <path d="M 62 24 L 59 24 L 62 34 L 32 34 L 35 44 L 82 44 Z" />
    <path d="M 83 48 L 36 48 L 56 68 L 59 68 L 56 58 L 86 58 Z" />
  </g>

  <text x="60" y="96" fill="#ffffff" font-size="13"
        font-family="monospace" text-anchor="middle">
    netsnek
  </text>
</svg>`;

/**
 * SVG elements the playground understands.
 *
 * The mdx field sanitizes against the component map, so anything not listed
 * here is dropped rather than rendered. That is the point: a visitor edits a
 * drawing, and cannot reach past it.
 */
const svgComponents: MdxFieldProps['components'] = {
  svg: props => <chakra.svg {...props} />,
  g: props => <g {...props} />,
  defs: props => <defs {...props} />,
  mask: props => <mask {...props} />,
  clipPath: props => <clipPath {...props} />,
  linearGradient: props => <linearGradient {...props} />,
  radialGradient: props => <radialGradient {...props} />,
  stop: props => <stop {...props} />,
  path: props => <path {...props} />,
  rect: props => <rect {...props} />,
  circle: props => <circle {...props} />,
  ellipse: props => <ellipse {...props} />,
  line: props => <line {...props} />,
  polyline: props => <polyline {...props} />,
  polygon: props => <polygon {...props} />,
  text: props => <text {...props} />,
  tspan: props => <tspan {...props} />,
  use: props => <use {...props} />,
  title: props => <title {...props} />
};

export interface HeroShowcaseProps {
  /** Styles handed to the artwork, so the caller keeps control of it. */
  logoSx?: Record<string, any>;
}

/**
 * The hero artwork as a playground.
 *
 * The tablet holds a drawing that the visitor can open and edit, and the
 * result redraws while they type. Two pills switch between the drawing and
 * its source, and the editor is outlined green while the source parses.
 *
 * Edits live in this component only. Nothing is written back to the CMS, so
 * the page is a sandbox: reloading brings the original drawing back.
 */
export const HeroShowcase: FC<HeroShowcaseProps> = () => {
  const intl = useIntl();
  const [value, setValue] = useState<string>(INITIAL_SOURCE);

  const onUpdateValue = useCallback((_mdast: any, next: string) => {
    setValue(next);
  }, []);

  // The field remounts when its components object changes identity, which
  // would drop the caret on every keystroke.
  const components = useMemo(() => svgComponents, []);

  return (
    <Box position="relative">
      <AspectRatio ratio={4 / 3} w="full" h="auto">
        <Box position="relative" w="full" h="full">
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
            pointerEvents="none"
          />

          {/* The screen area of the tablet frame. The frame is a photo, so
              these insets are measured against it rather than derived. */}
          <Box
            position="absolute"
            top="9%"
            bottom="9%"
            left="12%"
            right="12%"
            overflow="hidden"
            borderRadius="sm"
          >
            <UncontrolledMdxField
              components={components}
              value={value}
              isEditing
              onUpdateValue={onUpdateValue}
              onMdast={() => {}}
              tabsTemplate={HeroEditorTabs}
            />
          </Box>
        </Box>
      </AspectRatio>
    </Box>
  );
};

export default HeroShowcase;

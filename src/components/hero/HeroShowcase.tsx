import {
  createElement,
  FC,
  Fragment,
  ReactNode,
  useCallback,
  useMemo,
  useState
} from 'react';
import { AspectRatio, Box } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { UncontrolledMdxField } from 'jaen-fields-mdx';
import type { MdxFieldProps } from 'jaen-fields-mdx';

import { splitAccentDot } from '../../utils/accent-dots';
import HeroEditorTabs from './HeroEditorTabs';
import { buildMockup } from './mockup';
import { buildArtwork } from './artwork';

/** An element the playground renders as itself. */
const svgTag = (tag: string) => (props: any) => createElement(tag, props);

/** The text of a rendered subtree. */
const textOf = (node: ReactNode): string => {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return '';
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) return node.map(textOf).join('');

  const children = (node as any)?.props?.children;

  return children === undefined ? '' : textOf(children);
};

/**
 * Elements the drawing is allowed to use.
 *
 * The mdx field sanitizes against the component map, so anything not listed
 * here is dropped rather than rendered. That is the point: a visitor edits a
 * drawing, and cannot reach past it.
 *
 * Everything the visitor writes as a tag is literal JSX, which the field
 * renders as the element itself rather than through this map, so for those
 * elements the entry is nothing but the permission to exist. Only the
 * elements markdown builds on its own, `p` and `pre` below, actually pass
 * through their component.
 */
const SVG_TAGS = [
  // Structure
  'svg',
  'g',
  'defs',
  'use',
  'title',
  // Shapes
  'path',
  'rect',
  'circle',
  'ellipse',
  'line',
  'polyline',
  'polygon',
  // Type
  'text',
  'tspan',
  // Paint
  'linearGradient',
  'radialGradient',
  'stop',
  // Cutting things out
  'clipPath',
  'mask',
  // The drop shadow of the tablet
  'filter',
  'feGaussianBlur',
  'feOffset',
  'feFlood',
  'feComposite',
  'feMerge',
  'feMergeNode',
  // The Apple Pencil, the one bitmap left in the drawing
  'image',
  // The animation of the mark travels with it, inside the drawing
  'style'
];

const svgComponents: MdxFieldProps['components'] = {
  ...Object.fromEntries(SVG_TAGS.map(tag => [tag, svgTag(tag)])),

  // A drawing has no paragraphs. Markdown still makes them out of anything
  // that sits between two tags, and an unknown element inside an `<svg>`
  // swallows everything below it, so they are unwrapped again.
  p: (props: any) => createElement(Fragment, {}, props.children),

  // The CSS of the mark sits in a fenced code block inside its `<style>`,
  // because MDX reads a bare `{` as the start of an expression and a fence
  // is the one place where braces, comments and indentation survive
  // untouched. A stylesheet only counts its own text though, so the fence is
  // handed on as the string it was.
  pre: (props: any) => textOf(props.children)
};

/**
 * The hero artwork as a playground.
 *
 * Tablet and mark are one SVG document, and that document is what the
 * visitor can open and edit: the frame, the browser bar, the address, and
 * the animation of the brand mark down to its keyframes. The result redraws
 * while they type. Two pills switch between the drawing and its source, and
 * the editor is outlined green while the source parses.
 *
 * Edits live in this component only. Nothing is written back to the CMS, so
 * the page is a sandbox: reloading brings the original drawing back.
 */
export const HeroShowcase: FC = () => {
  const intl = useIntl();

  // The two headings the mark draws are copy, not artwork. Their accent dot
  // is painted through a mask of its own, so the terminator is split off the
  // localized string, exactly as the standalone mark does it.
  const [heading1, dot1] = splitAccentDot(
    intl.formatMessage({
      id: 'LogoHeadingIdea',
      defaultMessage: 'Ihre Idee.'
    })
  );
  const [heading2, dot2] = splitAccentDot(
    intl.formatMessage({
      id: 'LogoHeadingKnowHow',
      defaultMessage: 'Unser Know-How.'
    })
  );

  const [value, setValue] = useState<string>(() =>
    buildMockup(buildArtwork({ heading1, dot1, heading2, dot2 }))
  );

  const onUpdateValue = useCallback((_mdast: any, next: string) => {
    setValue(next);
  }, []);

  // The field remounts when its components object changes identity, which
  // would drop the caret on every keystroke.
  const components = useMemo(() => svgComponents, []);

  return (
    <Box position="relative">
      {/* The drawing is 700 by 560, and it brings its own frame, so it fills
          the box instead of being inset into a photo of a tablet. */}
      <AspectRatio ratio={700 / 560} w="full" h="auto">
        <Box position="relative" w="full" h="full" overflow="hidden">
          {/* AspectRatio centres its child rather than stretching it, so the
              playground is pinned to the box instead of shrinking to the
              width of its own pills. */}
          <Box position="absolute" inset={0}>
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

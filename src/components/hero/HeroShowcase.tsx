import {
  createElement,
  FC,
  Fragment,
  ReactNode,
  useCallback,
  useMemo,
  useState
} from 'react';
import { Box } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { xml } from '@codemirror/lang-xml';
import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { UncontrolledMdxField } from 'jaen-fields-mdx';
import type { MdxFieldProps } from 'jaen-fields-mdx';

import { splitAccentDot } from '../../utils/accent-dots';
import HeroEditorTabs from './HeroEditorTabs';

/**
 * Colours for the source view.
 *
 * The editor ships no highlight style of its own: the fallback that comes
 * with the basic setup is tuned for a light background and loses against the
 * dark theme, which is why every token rendered in the same grey no matter
 * which language was configured. These are picked against #282c34 and lean on
 * the brand orange for the parts that carry meaning in a drawing, the tags and
 * the values.
 */
const highlight = HighlightStyle.define([
  { tag: tags.tagName, color: '#f77f00', fontWeight: '600' },
  { tag: tags.attributeName, color: '#9cdcfe' },
  { tag: tags.attributeValue, color: '#c3e88d' },
  { tag: tags.string, color: '#c3e88d' },
  { tag: tags.number, color: '#f78c6c' },
  { tag: tags.comment, color: '#6b7a8f', fontStyle: 'italic' },
  { tag: tags.angleBracket, color: '#7f8c9b' },
  { tag: tags.definitionOperator, color: '#7f8c9b' },
  { tag: tags.processingInstruction, color: '#6b7a8f' },
  { tag: tags.keyword, color: '#c792ea' },
  { tag: tags.propertyName, color: '#9cdcfe' }
]);

/** The source is SVG, so it is highlighted as XML rather than as markdown. */
const editorExtensions = [
  xml(),
  syntaxHighlighting(highlight),
  EditorView.lineWrapping
];
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
    // No fixed aspect box around the drawing. The svg carries its own
    // viewBox, so giving it a width is enough and the height follows. A ratio
    // box with overflow hidden cropped exactly what it must not: the device's
    // bottom edge and its shadow.
    // The drawing is sized inside the tabs template, on the panel that
    // holds it. Sizing every svg under this element instead would also
    // catch the little arrows between the switches, which is exactly what
    // happened once.
    <Box position="relative">
      <Box id="hero-artwork">
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
  );
};

export default HeroShowcase;

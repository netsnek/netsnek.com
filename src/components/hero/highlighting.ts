/**
 * The language of the hero's source view.
 *
 * The document in the editor is one SVG, but it is not pure SVG. It carries
 * its explanations as MDX comments in `{/* … *\/}` form, because the field
 * parses the document as MDX where an HTML comment is a fatal error, and it
 * carries the stylesheet of the animation as a fenced ```css block inside
 * `<style>`, because MDX reads a bare `{` as the start of an expression and a
 * fence is the one place where braces survive untouched.
 *
 * Those two islands were the entire problem behind "why is so much of this
 * just grey". Measured against the real document, the XML parser produces ZERO
 * error nodes, so it understands the drawing perfectly, and still only 71% of
 * the characters came out coloured. Every single grey character sat in a `Text`
 * node: the 58 comments and the 3000 characters of CSS, which to an XML parser
 * are nothing but text between tags. It was never a broken parse. It was two
 * islands no XML parser can be expected to know.
 *
 * So the islands get parsers that do know them. XML stays the outer language
 * and hands each island on, which takes the document from 71% to 98% coloured
 * with still zero error nodes: the comments from 1% to 98%, the stylesheet
 * from nothing to 94%.
 *
 * Deliberately no palette of our own. The editor already applies One Dark, and
 * One Dark colours all of this once the tokens exist. A second highlight style
 * would only race the theme for precedence, and losing that race silently is
 * the exact failure that hid here for so long.
 */

import { LanguageSupport } from '@codemirror/language';
import { xmlLanguage } from '@codemirror/lang-xml';
import { cssLanguage } from '@codemirror/lang-css';
import { javascriptLanguage } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';
import { parseMixed } from '@lezer/common';

/** The stylesheet of the mark, as it sits inside `<style>`. */
const CSS_FENCE = /```css\r?\n([\s\S]*?)\r?\n[ \t]*```/;

/** An MDX comment, braces included. */
const MDX_COMMENT = /\{\/\*[\s\S]*?\*\/\}/g;

/**
 * SVG, with its two foreign islands handed on.
 *
 * The braces of a comment go to the JavaScript parser together with the
 * comment itself: `{/* … *\/}` is a block containing a block comment and parses
 * cleanly, while the bare `/* … *\/` leaves a dangling error node behind.
 *
 * The text is read through the parser's own `Input` rather than from a copy of
 * the document, so this keeps working while the visitor types.
 */
const svgPlaygroundLanguage = xmlLanguage.configure(
  {
    wrap: parseMixed((node, input) => {
      if (node.name !== 'Text') return null;

      const slice = input.read(node.from, node.to);

      const fence = CSS_FENCE.exec(slice);

      if (fence) {
        const from = node.from + fence.index + fence[0].indexOf(fence[1]);

        return {
          parser: cssLanguage.parser,
          overlay: [{ from, to: from + fence[1].length }]
        };
      }

      const comments = Array.from(slice.matchAll(MDX_COMMENT)).map(match => ({
        from: node.from + match.index!,
        to: node.from + match.index! + match[0].length
      }));

      return comments.length
        ? { parser: javascriptLanguage.parser, overlay: comments }
        : null;
    })
  },
  'svg-playground'
);

/** The language of the hero's source view. */
export const svgPlayground = () => new LanguageSupport(svgPlaygroundLanguage);

/** Everything the source view needs, in the order the editor expects it. */
export const heroEditorExtensions = [svgPlayground(), EditorView.lineWrapping];

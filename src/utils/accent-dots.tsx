import { chakra } from '@chakra-ui/react';
import * as React from 'react';

/** Every sentence terminator this site paints in the brand colour. */
const TERMINATOR = /[.。]/g;

/**
 * Renders a localized string with every sentence terminator (`.` or `。`)
 * in the brand color, reproducing the accent-dot styling of the original
 * hardcoded headings across all locales.
 */
export const withAccentDots = (text: string): React.ReactNode[] =>
  text.split(/([.。])/).map((part, index) =>
    /^[.。]$/.test(part) ? (
      <chakra.span key={index} color="brand.500">
        {part}
      </chakra.span>
    ) : (
      part
    )
  );

/**
 * The same dots, as the rich text a CMS field carries.
 *
 * A field renders HTML rather than React nodes, so a heading that wants its
 * accent dots has to hold them in its value. The two hero strings are stored
 * as plain text in every catalog, unlike the other section headings which
 * carry the span already, so they are painted here on the way into the field
 * and every locale comes out exactly as the node version painted it.
 *
 * The text is escaped first. The node version was escaped by React; this one
 * goes through dangerouslySetInnerHTML, so an ampersand in a catalog string
 * would otherwise be read as markup.
 */
export const withAccentDotsHtml = (text: string): string =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(
      TERMINATOR,
      "<span style='color:var(--chakra-colors-brand-500)'>$&</span>"
    );

/**
 * Splits a localized heading into its body and its trailing sentence
 * terminator, for the places that cannot wrap the dot in an element of its
 * own — the SVG logo paints body and dot through two separate masks. A
 * string without a terminator yields an empty dot.
 */
export const splitAccentDot = (text: string): [string, string] => {
  const match = /^([\s\S]*)([.。])$/.exec(text);

  return match ? [match[1]!, match[2]!] : [text, ''];
};

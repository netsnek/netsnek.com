import { chakra } from '@chakra-ui/react';
import * as React from 'react';

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
 * Splits a localized heading into its body and its trailing sentence
 * terminator, for the places that cannot wrap the dot in an element of its
 * own — the SVG logo paints body and dot through two separate masks. A
 * string without a terminator yields an empty dot.
 */
export const splitAccentDot = (text: string): [string, string] => {
  const match = /^([\s\S]*)([.。])$/.exec(text);

  return match ? [match[1]!, match[2]!] : [text, ''];
};

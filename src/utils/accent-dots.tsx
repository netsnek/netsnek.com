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

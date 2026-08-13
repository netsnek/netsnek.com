const smtShared = {
  translucent: {
    bgColor: {
      default: 'rgba(255, 255, 255, 0.8)',
      _dark: 'rgba(26, 32, 44, 0.8)'
    }
  },
  text: {
    default: {
      default: 'gray.800',
      _dark: 'gray.400'
    },
    bright: {
      default: 'gray.600',
      _dark: 'gray.300'
    },
    /**
     * Brand-coloured TEXT, and only text. Surfaces, buttons, borders and
     * icons keep `brand.500`, which is the mark and must not move.
     *
     * `brand.500` (#f77f00) as a glyph colour on the white body fails WCAG
     * 2.1 1.4.3 outright. Relative luminance of the orange is 0.3495 and of
     * white 1.0000, so the ratio is (1.0000 + 0.05) / (0.3495 + 0.05) =
     * 2.63:1, short of the 3:1 large-text threshold and far short of the
     * 4.5:1 small-text one. axe-core counted seventeen instances, from the
     * 36px accent spans in the section headings down to the 14px
     * "Weiterlesen" of the docs cards.
     *
     * #b55e00 is the same hue (31 degrees, as #f77f00) at 73 per cent value.
     * Luminance 0.1783, so (1.0000 + 0.05) / (0.1783 + 0.05) = 4.60:1 on
     * white. That clears the small-text threshold, and clearing 4.5:1 means
     * one token serves the big headings and the small links alike. Neither
     * existing ramp step does: `brand.600` (#cc6002, L 0.2121) reaches only
     * 4.01:1, and `brand.700` (#a14a0b, L 0.1250) reaches 6.00:1 but reads
     * brown rather than orange.
     *
     * Dark mode stays on the mark. #f77f00 against the gray.800 body
     * (#1A202C, L 0.0143) is (0.3495 + 0.05) / (0.0143 + 0.05) = 6.21:1.
     *
     * One caveat for call sites: the `_dark` half assumes the text sits on
     * the dark body. A surface that is light in BOTH modes needs a colour
     * that does not flip, so this token is the wrong one there.
     */
    brand: {
      default: '#b55e00',
      _dark: 'brand.500'
    }
  },
  // This is the default color for the body background
  // and overrides chakra-body-bg
  body: {
    bgColor: {
      default: 'white',
      _dark: 'gray.800'
    }
  },
  scrollbar: {
    thumb: {
      bgColor: {
        default: 'gray.300',
        _dark: 'gray.700'
      },
      hover: {
        bgColor: {
          default: 'gray.400',
          _dark: 'gray.600'
        }
      }
    }
  }
};

export default smtShared;

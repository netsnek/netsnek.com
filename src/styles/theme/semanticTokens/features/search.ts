const smtSearchFeature = {
  menuList: {
    bgColor: {
      default: 'white',
      _dark: 'gray.800'
    }
  },
  input: {
    borderColor: {
      default: 'brand.400',
      _dark: 'brand.600'
    },
  },
  section: {
    title: {
      color: {
        default: 'gray.500',
        _dark: 'gray.400'
      }
    },
    item: {
      icon: {
        color: {
          default: 'gray.500',
          _dark: 'gray.500'
        }
      },
      goto: {
        color: {
          default: 'gray.500',
          _dark: 'gray.400'
        },
      },
      _hover: {
        bgColor: {
          default: 'gray.100',
          _dark: 'gray.600'
        },
        // Text on the hovered row, so it takes the accessible brand token.
        // The row is gray.100 rather than white in light mode, where the
        // token reads 4.08:1 and the mark read 2.33:1. Better, but still
        // under 4.5:1, see the note in the handover.
        color: {
          default: 'shared.text.brand',
          _dark: 'brand.300'
        },
      },
    },
  },
  noResults: {
    text: {
      color: {
        default: 'gray.500',
        _dark: 'gray.400'
      }
    }
  }
};

export default smtSearchFeature;

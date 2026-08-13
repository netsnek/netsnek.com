const smtRightNav = {
  titleTop: {
    color: {
      default: 'gray.800',
      _dark: 'gray.200'
    }
  },
  link: {
    active: {
      // The active entry of the docs table of contents is text on the body,
      // which is white in light mode. brand.500 was 2.63:1 there, the token
      // is 4.60:1. Dark half untouched.
      color: {
        default: 'shared.text.brand',
        _dark: 'brand.300'
      }
    },
    inactive: {
      color: {
        default: 'gray.800',
        _dark: 'gray.400'
      }
    }
  }
};

export default smtRightNav;

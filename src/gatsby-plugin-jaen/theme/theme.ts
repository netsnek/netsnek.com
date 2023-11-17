import {
  extendTheme,
  ThemeConfig,
  withDefaultColorScheme,
  baseTheme
} from '@chakra-ui/react'

export const colors = {}

const theme = extendTheme(
  baseTheme,
  {
    styles: {
      global: (props) => ({
        body: {
          //bg: "#f4f8fa",
        }
      })
    },
    colors: {
      ...baseTheme.colors,
      brand: {
        //...baseTheme.colors.blackAlpha,		
        '50': '#f4f9fb',
        '100': '#e8f2f6',
        '200': '#bbdde4',
        '300': '#9fd1da',
        '400': '#6cb8c4',
        '500': '#499fae',
        '600': '#378392',
        '700': '#2e6976',
        '800': '#295963',
        '900': '#274b53',
        '950': '#1a3037',
      }
    }
  },
  withDefaultColorScheme({
    colorScheme: 'brand'
  })
)

export default theme

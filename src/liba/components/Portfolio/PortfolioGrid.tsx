import {
  Box,
  GridProps,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  VStack,
  useColorModeValue
} from '@chakra-ui/react'
import {Field} from '@atsnek/jaen'
import {Link} from 'gatsby'
import {FC} from 'react'
import Slider from 'react-slick'
import {JaenPageIndexType} from '../../../shared/types/news'
import JaenImage from '../../../shared/components/JaenImage'
import {ProductCard} from '../ProductCard'

// expand with GridProps
interface IPortfolioGridProps extends GridProps {
  index: JaenPageIndexType
}

const PortfolioGrid: FC<IPortfolioGridProps> = ({index, ...props}) => {
  return (
    <Grid
      templateColumns={{base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)'}}
      gap={6}
      {...props}>
      {index.childPages.map((page, i) => {
        return index.withJaenPage(
          page.id,
          <ProductCard
            key={i}
            product={{
              handle: page.slug || 'none',
              title: page.jaenPageMetadata?.title,
              description: page.jaenPageMetadata?.description,
              price: '29.99',
              compareAtPrice: '39.99',
              discount: '',
              tags: ['New', 'T-Shirt', 'Summer'],
              taxable: false,
              createdAt: page.jaenPageMetadata?.blogPost?.date, // Example date
              featuredMedia: {
                image: {
                  name: page.slug || 'none',
                  defaultValue: page.jaenPageMetadata?.image || '',
                  altText: page.jaenPageMetadata?.description || ''
                }
              },
              media: []
              //   {
              //     image: {
              //       altText: 'Cool T-Shirt - Front',
              //       // gatsbyImageData: {
              //       //   // ... your Gatsby image data
              //       // }
              //      name
              //     }
              //   },
              //   {
              //     image: {
              //       altText: 'Cool T-Shirt - Front',
              //       // gatsbyImageData: {
              //       //   // ... your Gatsby image data
              //       // }
              //      name
              //     }
              //   },
              //   {
              //     image: {
              //       altText: 'Cool T-Shirt - Front',
              //       // gatsbyImageData: {
              //       //   // ... your Gatsby image data
              //       // }
              //      name
              //     }
              //   }
              // ]
            }}
          />
        )
      })}
    </Grid>
  )
}

export default PortfolioGrid

const DesktopSlider: FC<IPortfolioGridProps> = ({index}) => {
  const slidesToShow = 3

  var settings = {
    dots: true,
    infinite: index.childPages.length > slidesToShow,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1
  }

  const borderColor = useColorModeValue('brand.500', 'brand.200')
  const dotActiveBgColor = useColorModeValue('brand.500', 'brand.200')
  const arrowColor = useColorModeValue('brand.500', 'brand.200')

  return (
    <Container
      maxW="4xl"
      pos="relative"
      zIndex="1"
      display={{base: 'none', md: 'block'}}
      sx={{
        '.news_slider .slick-dots .slick-active': {
          background: dotActiveBgColor,
          borderRadius: '50%'
        },
        '.slick-prev:before, .slick-next:before': {
          color: `${arrowColor} !important` // Note the use of arrowColor here
        },
        '.news_slider .slick-dots li button:before': {
          display: 'none'
        },
        '.news_slider ul.slick-dots': {
          top: '0px',
          position: 'relative'
        },
        '.news_slider .slick-dots li': {
          background: borderColor, // Used for inactive dots, could use a different color here if needed
          borderRadius: '50%',
          height: '1.125rem',
          width: '1.125rem'
        }
      }}>
      <Slider {...settings} className="news_slider">
        {index.childPages.map((page, i) => {
          return index.withJaenPage(
            page.id,
            <Box key={i} p="5">
              <ProductCard
                product={{
                  handle: page.slug || 'none',
                  title: page.jaenPageMetadata?.title,
                  description: page.jaenPageMetadata?.description,
                  price: '29.99',
                  compareAtPrice: '39.99',
                  discount: '',
                  tags: ['New', 'T-Shirt', 'Summer'],
                  taxable: false,
                  createdAt: page.jaenPageMetadata?.blogPost?.date, // Example date
                  featuredMedia: {
                    image: {
                      name: page.slug || 'none',
                      defaultValue: page.jaenPageMetadata?.image || '',
                      altText: page.jaenPageMetadata?.description || ''
                    }
                  },
                  media: []
                  //   {
                  //     image: {
                  //       altText: 'Cool T-Shirt - Front',
                  //       // gatsbyImageData: {
                  //       //   // ... your Gatsby image data
                  //       // }
                  //       name: 'fuck'
                  //     }
                  //   },
                  //   {
                  //     image: {
                  //       altText: 'Cool T-Shirt - Front',
                  //       // gatsbyImageData: {
                  //       //   // ... your Gatsby image data
                  //       // }
                  //       name: 'fuck'
                  //     }
                  //   },
                  //   {
                  //     image: {
                  //       altText: 'Cool T-Shirt - Front',
                  //       // gatsbyImageData: {
                  //       //   // ... your Gatsby image data
                  //       // }
                  //       name: 'fuck'
                  //     }
                  //   }
                  // ]
                }}
              />
            </Box>
          )
        })}
      </Slider>
    </Container>
  )
}
//export default DesktopSlider

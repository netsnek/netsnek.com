import { Box, Button, Container, Flex, Grid, Heading, Stack, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { Field } from '@atsnek/jaen'
import { Link } from 'gatsby'
import { FC } from 'react'
import Slider from 'react-slick'
import { JaenPageIndexType } from '../../../shared/types/news'
import JaenImage from '../../../shared/components/JaenImage'

interface IDesktopSliderProps {
  showTitle?: boolean
  index: JaenPageIndexType
}

const DesktopSlider: FC<IDesktopSliderProps> = ({
  showTitle = false,
  index,
}) => {
  const slidesToShow = 2

  var settings = {
    dots: true,
    infinite: index.childPages.length > slidesToShow,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
  }

  const borderColor = useColorModeValue('brand.500', 'brand.200')
  const dotActiveBgColor = useColorModeValue('brand.500', 'brand.200')
  const arrowColor = useColorModeValue('brand.500', 'brand.200')

  return (
    <Container
      maxW="4xl"
      pos="relative"
      zIndex="1"
      display={{ base: 'none', md: 'block' }}
      sx={{
        '.news_slider .slick-dots .slick-active': {
          background: dotActiveBgColor,
          borderRadius: '50%',
        },
        '.slick-prev:before, .slick-next:before': {
          color: `${arrowColor} !important`, // Note the use of arrowColor here
        },
        '.news_slider .slick-dots li button:before': {
          display: 'none',
        },
        '.news_slider ul.slick-dots': {
          top: '0px',
          position: 'relative',
        },
        '.news_slider .slick-dots li': {
          background: borderColor, // Used for inactive dots, could use a different color here if needed
          borderRadius: '50%',
          height: '1.125rem',
          width: '1.125rem',
        },
      }}
    >
      <Slider {...settings} className="news_slider">
        {index.childPages.map((page, i) => {
          return index.withJaenPage(
            page.id,
            <Box key={i}>
              <Stack
                mx="4"
                mt="24"
                mb="8"
                borderRadius="xl"
                boxShadow="dark"
                py="8"
                pb="16"
                px="8"
                borderWidth="1px"
                borderStyle="dashed"
                borderColor={useColorModeValue('brand.500', 'brand.200')}
                //bg="white"
                flex="1"
                pt="20"
                //align="center"
                justify="center">
                <Grid flex="1" placeItems="center" pos="relative" bg="red">
                  <Box
                    pos="absolute"
                    top="-40"
                    overflow="hidden"
                    boxSize={{base: '9.375rem'}}
                    bg="gray.800"
                    //border='1px dashed #499fae'
                    borderRadius="full">
                    <JaenImage
                      name={page.slug || 'none'}
                      defaultValue={page.jaenPageMetadata?.image || ''}
                      alt={page.jaenPageMetadata?.description || ''}
                      style={{
                        height: '100%',
                        //height: 'var(--chakra-sizes-xs)',
                        objectFit: 'cover',
                        borderRadius: 'var(--chakra-radii-xl)',
                        overflow: 'hidden'
                      }}></JaenImage>
                  </Box>
                </Grid>
                <VStack
                  gap="4"
                  flex="1"
                  //textAlign="center"
                >
                  <Text fontSize={'sm'}>
                    {page.jaenPageMetadata?.blogPost?.date
                      ? new Date(
                          page.jaenPageMetadata.blogPost.date
                        ).toLocaleDateString('de-DE', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          timeZone: 'UTC'
                        })
                      : null}
                  </Text>
                  <Heading
                    color="black.500"
                    fontSize="md"
                    fontWeight="semibold"
                    noOfLines={2}>
                    {page.jaenPageMetadata?.title}
                  </Heading>
                  <Text color="black.500" fontSize="sm" noOfLines={4}>
                    {page.jaenPageMetadata?.description}
                  </Text>
                  <Button
                    as={Link}
                    to={`/blog/artikel/${page.slug}`}
                    size={{base: 'sm', md: 'md'}}
                    variant="outline">
                    Mehr anzeigen
                  </Button>
                </VStack>
              </Stack>
            </Box>
          )
        })}
      </Slider>
    </Container>
  )
}
export default DesktopSlider
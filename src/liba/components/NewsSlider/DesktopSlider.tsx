import {
  Box,
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

interface IWhiteDesktopSliderProps {
  showTitle?: boolean
  index: JaenPageIndexType
}

const WhiteDesktopSlider: FC<IWhiteDesktopSliderProps> = ({
  showTitle = false,
  index
}) => {
  const slidesToShow = 2

  var settings = {
    dots: true,
    infinite: index.childPages.length > slidesToShow,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1
  }

  return (
    <Container
    maxW={'4xl'}
    //overflow="hidden"
    pos="relative"
    zIndex="1"
    display={{base: 'none', md: 'block'}}
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
                    }}
                    ></JaenImage>
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
                <Text
                  color="black.500"
                  fontSize="sm"
                  noOfLines={4}
                >
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
export default WhiteDesktopSlider

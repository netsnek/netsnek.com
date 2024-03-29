import {
  Image,
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Link,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  Wrap,
  useColorModeValue
} from '@chakra-ui/react'
import {useContactModal} from '../services/contact'
import {Field} from '@atsnek/jaen'
import {GoogleMaps} from './GoogleMaps'
import WebampPlayer from './Webamp/WebampPlayer'
import Gallery from './Gallery'
import NewsSlider from './NewsSlider/NewsSlider'
import {
  Testimonial,
  TestimonialAvatar,
  TestimonialContent,
  TestimonialHeading,
  TestimonialText
} from './Testimonials'
import University_Vienna from '../../gatsby-plugin-jaen/components/University_Vienna'
import Ballons_Ballons from '../../gatsby-plugin-jaen/components/Ballons_Ballons'
import Kanbon from '../../gatsby-plugin-jaen/components/Kanbon'
import {StylizedImage} from './StylizedImage'
import servicesSvg from '../../common/assets/services.svg'

interface Props {
  children: React.ReactNode
}

const testamonialsDefaults = [
  // {
  //   heading: 'Lorem ipsum dolor sit amet',
  //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.',
  //   avatar: {
  //     src: 'https://osg.snek.at/storage/BQACAgQAAxkDAAIsW2VFGtrO0UmpkYZV0BgslLcByh8qAAJRDwACCtMwUiMJbD4kmhDjLwQ',
  //     name: 'Christoph Clementschitsch',
  //     title: 'Christoph Clementschitsch IT',
  //     to: 'https://www.neurons.at/'
  //   }
  // },
  // {
  //   heading: 'Lorem ipsum dolor sit amet',
  //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.',
  //   avatar: {
  //     src: 'https://i1.rgstatic.net/ii/profile.image/11431281181196403-1691945466424_Q128/Felix-Zilk.jpg',
  //     name: 'Felix Zilk',
  //     title: '',
  //     to: 'https://www.researchgate.net/profile/Felix-Zilk'
  //   }
  // },
  {
    heading: 'Lorem ipsum dolor sit amet',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.',
    avatar: {
      src: 'https://osg.snek.at/storage/BQACAgQAAxkDAAIs9GWQkatLRzGIxNON1c3Cw3opvLR9AALsGAACpzGAUCTJZjhqLIryLwQ',
      name: 'Simon Prast',
      title: 'Kanbon',
      to: 'https://kanbon.at/'
    }
  },
  {
    heading: 'Lorem ipsum dolor sit amet',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.',
    avatar: {
      src: 'https://osg.snek.at/storage/BQACAgQAAxkDAAIsX2VG2JlO_XvDt3JcexGfxSLesn_oAAJZEAACLqAxUnY2C2EatToLLwQ',
      name: 'Florian Kleber',
      title: 'Florian Herbert Kleber IT',
      to: 'https://fhkit.at/'
    }
  }
]

function Services() {
  return (
    <Box mt={{base: '24', sm: '32', lg: '40'}}>
      <Box>
        <Text fontSize="sm" fontWeight="medium">
          Services
        </Text>
        <Heading as="h2" size="xl" mt="4">
          Tailored solutions for your business needs
        </Heading>
        <Text mt="4">
          Bei Netsnek bieten wir eine breite Palette von Dienstleistungen an,
          die auf die individuellen Bedürfnisse unserer Kunden zugeschnitten
          sind.
        </Text>
      </Box>
      <Container maxW="container.xl" mt="16">
        <Flex
          direction={{base: 'column', lg: 'row'}}
          align="center"
          justify="end">
          <Box flex="1" textAlign="center" pr={{lg: '12'}}>
            {/* Please replace `servicesSvg` with the source of your image or adjust as needed */}
            <StylizedImage
              sx={{
                filter:
                  'hue-rotate(180deg) saturate(1.3) brightness(1.1) contrast(0.9)'
              }}
              src={servicesSvg}
              boxSize={{base: '31rem', lg: '41rem'}}
              m="auto"
            />
          </Box>
          <Box
            mt={{base: '16', lg: '0'}}
            flex="1"
            minW={{lg: '33rem'}}
            pl={{lg: '4'}}>
            {/* For each ListItem you can create a custom component or structure here */}
            <Box mb="6">
              <Heading as="h4" size="md">
                UX-Konzeption
              </Heading>
              <Text mt="2">
                Durch den Einsatz moderner UX-Methoden gestalten wir
                benutzerfreundliche und intuitive Oberflächen.
              </Text>
            </Box>
            <Box mb="6">
              <Heading as="h4" size="md">
                Web development
              </Heading>
              <Text mt="2">
                Wir kreieren moderne Websites und Webanwendungen, die exakt auf
                Ihre individuellen Bedürfnisse zugeschnitten sind.
              </Text>
            </Box>
            <Box mb="6">
              <Heading as="h4" size="md">
                Backend development
              </Heading>
              <Text mt="2">
                Unsere maßgeschneiderten Backend-Lösungen werden speziell auf
                Ihre Anforderungen abgestimmt und basieren auf dem Framework{' '}
                <Link href="/jaen" textDecoration="underline">
                  Pylon
                </Link>
                .
              </Text>
            </Box>
            <Box mb="6">
              <Heading as="h4" size="md">
                Content management
              </Heading>
              <Text mt="2">
                Mit{' '}
                <Link href="/jaen" textDecoration="underline">
                  Jaen
                </Link>{' '}
                als Content-Management-System ermöglichen wir es Ihnen, Ihre
                Website eigenständig zu verwalten.
              </Text>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

const ContentSection = () => {
  const contactModal = useContactModal()
  const onContactClick = () => {
    contactModal.onOpen({
      meta: {}
    })
  }

  return (
    <Box>
      <Container
        maxW="6xl"
        borderRadius="2xl"
        //borderLeft="1px solid"
        //borderRight="1px solid"
        //background='linear-gradient(rgba(248,253,255,.85), rgba(248,253,255,.85)), url("https://www.transparenttextures.com/patterns/dark-denim.png")'
        //backgroundColor={"alphaWhite.900"}
        //backgroundBlendMode="screen"
        pb={24}
        mb="128"
        // borderWidth="1px"
        // borderStyle="dashed"
        // borderColor={useColorModeValue('brand.500', 'brand.200')}
      >
        {/* <Container
          //minH={"calc(100vh - 60px)"}
          maxW="4xl"
          px={{base: 6, md: 3}}>
          <Field.Text
            mt={{base: '20 !important', md: '0'}}
            mb="8"
            as={Heading}
            fontSize={{base: '4xl', lg: '5xl'}}
            lineHeight={1}
            fontWeight="bold"
            textAlign="left"
            name="ContentSectionHeadingTeam"
            defaultValue="Rezepte zum Anhören"
          />
          <WebampPlayer />
        </Container> */}
        {/* <HStack h="100px" w="100%" spacing={12}>
          <University_Vienna />
          <Ballons_Ballons />
          <Kanbon />
        </HStack> */}
        <Services />
      </Container>
    </Box>
  )
}

export default ContentSection

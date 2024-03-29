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
  useColorModeValue,
  GridItem,
  Grid,
  AspectRatio,
  VStack
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
import Ballons_Ballons, { HBalloon } from '../../gatsby-plugin-jaen/components/Ballons_Ballons'
import Kanbon from '../../gatsby-plugin-jaen/components/Kanbon'
import {StylizedImage} from './StylizedImage'
import servicesSvg from '../../common/assets/services.svg'
import ContactButton from './ContactButton'
import { ImportantArrow } from '../../gatsby-plugin-jaen/components/ImportantArrow'
import { AGTIcon } from '../../gatsby-plugin-jaen/components/agtguntrade'
import { LibaIcon } from '../../gatsby-plugin-jaen/components/liba'
import { FHKITIcon } from '../../gatsby-plugin-jaen/components/fhkit'
import { MyP5Icon } from '../../gatsby-plugin-jaen/components/p5'
import { WGIcon } from '../../gatsby-plugin-jaen/components/wgstros'

interface Props {
  children: React.ReactNode
}

function ProjectsLinkGrid() {
  // Sample list of your links and icons, assuming you will replace these with your actual data
  const links = [
    {href: 'https://facebook.com', icon: HBalloon},
    {href: 'https://facebook.com', icon: AGTIcon},
    {href: 'https://facebook.com', icon: LibaIcon},
    {href: 'https://facebook.com', icon: FHKITIcon},
    {href: 'https://facebook.com', icon: MyP5Icon},
    {href: 'https://facebook.com', icon: WGIcon}
  ]

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      gap={10}
      pb={{base: '16', lg: '0'}}
      w={{base: 'full', lg: '50%'}}
      maxW={{base: '500px', lg: 'full'}}
      alignItems={'center'}>
      <GridItem
        mb={4}
        pos="relative"
        display="flex"
        colSpan={3}
        justifyContent={'center'}
        alignItems={'center'}>
        <ImportantArrow pos="absolute" top="-150%" right="-10%" h="300%"/>
        <ContactButton size={'lg'} mt={10} inverted />
      </GridItem>
      {links.map((link, index) => (
        <LinkBox
          key={index}
          w="auto"
          h="auto"
          color="white"
          transition="color 0.2s"
          _hover={{color: 'brand.500'}}>
          <LinkOverlay href={link.href} isExternal>
            <AspectRatio ratio={4 / 3}>
              {/* Assuming you have a way to dynamically select your icon component */}
              <link.icon w="full" h="full" />
            </AspectRatio>
          </LinkOverlay>
        </LinkBox>
      ))}
      {/* Den Wrapper um den Link mit GridItem oder einer ähnlichen Komponente und setze colSpan auf 3 */}
      <GridItem colSpan={3}>
        <Link
          href="/projects"
          variant="hover-theme"
          //textDecor={"underline"}
          opacity={0.7}
          w="100%"
          textAlign="end">
          <Field.Text
            name="FooterLinkAllProjects"
            defaultValue="Oder lassen Sie sich inspirieren"
            fontSize="xl"
            //fontWeight="500"
          />
        </Link>
      </GridItem>
    </Grid>
  )
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
        <Container maxW={'4xl'} pt={0} as={Stack} spacing={12}>
          <Stack spacing={0}>
            <Field.Text
              mt={{base: '20 !important', md: '0'}}
              mb="8"
              as={Heading}
              fontSize={{base: '4xl', lg: '5xl'}}
              lineHeight={1}
              fontWeight="bold"
              textAlign="left"
              name="ContentSectionHeadingServices"
              defaultValue="Services"
            />
            <Field.Text
              fontSize="1.2rem"
              color="gray.500"
              name="ContentSectionTextServices"
              defaultValue="Mit diesen Services unterstützen wir dein Unternehmen im digitalen Zeitalter."
            />
          </Stack>
          {/* <Stack spacing={0}>
            <Field.Text
              mt={{base: '20 !important', md: '0'}}
              mb="8"
              as={Heading}
              fontSize={{base: '4xl', lg: '5xl'}}
              lineHeight={1}
              fontWeight="bold"
              textAlign="left"
              name="ContentSectionHeadingGallery"
              defaultValue="Beratung vor Ort"
            />
            <Field.Text
              fontSize="1.2rem"
              color="gray.500"
              name="ContentSectionTextGallery"
              defaultValue="Ich biete branchenübergreifende Kundenberatung und -betreuung mit Unterstützung von Experten aus meinem umfassenden Netzwerk an. In Zusammenarbeit mit meinen Partnern gewährleisten wir ein breites Angebot an Dienstleistungen. Mein Ziel ist es, gemeinsam mit Ihnen alle Ihre technologischen Herausforderungen zu meistern."
            />
          </Stack>
          <Gallery /> */}
          <Container maxW={'4xl'} pb={16} as={Stack} spacing={12}>
            <Stack spacing={0}>
              <Field.Text
                mt={{base: '20 !important', md: '0'}}
                mb="8"
                as={Heading}
                fontSize={{base: '4xl', lg: '5xl'}}
                lineHeight={1}
                fontWeight="bold"
                textAlign="left"
                name="ContentSectionHeadingNews"
                defaultValue="Mein Blog"
              />
              <Field.Text
                fontSize="1.2rem"
                color="gray.500"
                name="ContentSectionTextNews"
                defaultValue="Ich biete branchenübergreifende Kundenberatung und -betreuung mit Unterstützung von Experten aus meinem umfassenden Netzwerk an. In Zusammenarbeit mit meinen Partnern gewährleisten wir ein breites Angebot an Dienstleistungen. Mein Ziel ist es, gemeinsam mit Ihnen alle Ihre technologischen Herausforderungen zu meistern."
              />
            </Stack>
          </Container>
          <NewsSlider showNewsTitle={true} />
          <Stack spacing={0}>
            <Field.Text
              mt={{base: '20 !important', md: '0'}}
              mb="8"
              as={Heading}
              fontSize={{base: '4xl', lg: '5xl'}}
              lineHeight={1}
              fontWeight="bold"
              textAlign="left"
              name="ContentSectionHeadingMap"
              defaultValue="Beratung vor Ort"
            />
            <Field.Text
              fontSize="1.2rem"
              color="gray.500"
              name="ContentSectionTextMap"
              defaultValue="Ich biete branchenübergreifende Kundenberatung und -betreuung mit Unterstützung von Experten aus meinem umfassenden Netzwerk an. In Zusammenarbeit mit meinen Partnern gewährleisten wir ein breites Angebot an Dienstleistungen. Mein Ziel ist es, gemeinsam mit Ihnen alle Ihre technologischen Herausforderungen zu meistern."
            />
          </Stack>
          <Box
            mb="8"
            h="xl"
            w="full"
            borderRadius="xl"
            overflow="hidden"
            boxShadow="dark">
            <GoogleMaps
              objectFit="cover"
              h="full"
              w="100%"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2733.773688803737!2d14.533973499999995!3d46.74964430000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4770114ec881291b%3A0xc1c76f5632cd333e!2sSt.%20Johanner%20Str.%2010%2C%209371%20Br%C3%BCckl!5e0!3m2!1sen!2sat!4v1702039895770!5m2!1sen!2sat"
            />
          </Box>
          <Stack spacing={0}>
            <Field.Text
              mt={{base: '20 !important', md: '0'}}
              mb="8"
              as={Heading}
              fontSize={{base: '4xl', lg: '5xl'}}
              lineHeight={1}
              fontWeight="bold"
              textAlign="left"
              name="ContentSectionHeadingTeam"
              defaultValue="Nicht nur essbar"
            />
            <Field.Text
              fontSize="1.2rem"
              color="gray.500"
              name="ContentSectionTextTeam"
              defaultValue="Ich biete branchenübergreifende Kundenberatung und -betreuung mit Unterstützung von Experten aus meinem umfassenden Netzwerk an. In Zusammenarbeit mit meinen Partnern gewährleisten wir ein breites Angebot an Dienstleistungen. Mein Ziel ist es, gemeinsam mit Ihnen alle Ihre technologischen Herausforderungen zu meistern."
            />
          </Stack>
          {/* <Wrap justify="center" mt={10} spacing={10} shouldWrapChildren>
            {testamonialsDefaults.map((testimonial, index) => (
              <Testimonial>
                <TestimonialContent>
                  <TestimonialHeading>
                    <Field.Text
                      name={`TestimonialHeading${index}`}
                      defaultValue={testimonial.heading}
                      color="pq.sections.aboutUs.testimonial.heading.color"
                    />
                  </TestimonialHeading>
                  <TestimonialText>
                    <Field.Text
                      name={`TestimonialText${index}`}
                      defaultValue={testimonial.text}
                    />
                  </TestimonialText>
                </TestimonialContent>
                <TestimonialAvatar
                  src={testimonial.avatar.src}
                  name={testimonial.avatar.name}
                  title={testimonial.avatar.title}
                  to={testimonial.avatar.to}
                />
              </Testimonial>
            ))}
          </Wrap> */}
        </Container>
        <Services />
      </Container>
      <Container
        maxW="5xl"
        borderRadius="2xl"
        borderTop="1px solid"
        borderColor={useColorModeValue('brand.500', 'brand.200')}
        mb={20}
        position="relative"
        //mt="-25px"
        px={{base: 5, lg: 0}}
        bgColor="black"
        zIndex={0}>
        {/* <Box
          position="absolute"
          top="-122px"
          left="10%"
          zIndex={0}
          bgColor="pq.500"
          boxSize="290px"
          filter="blur(140px)"
        />
        <Box
          position="absolute"
          top="-122px"
          right="10%"
          zIndex={0}
          bgColor="#b57edc"
          boxSize="290px"
          filter="blur(140px)"
        /> */}
        {/* <Box
          position="relative"
          // top={{ base: '-1.5rem', lg: 0 }}
          left={{ base: '-1.6rem', lg: 0 }}
          w={{ base: 'calc(100% + 3.2rem)', lg: 'full' }}
          h="50px"
          bgColor="pq.shared.section.bgColor"
          borderBottomRadius="3xl"
          // zIndex={1}
        /> */}
        <Flex
          px={16}
          color={'white'}
          wrap={{base: 'wrap', lg: 'nowrap'}}
          alignItems={'center'}
          justifyContent={{base: 'center', lg: 'space-between'}}>
          <VStack
            alignItems={{base: 'center', lg: 'start'}}
            py={16}
            w={{base: 'full', lg: '50%'}}
            textAlign={{base: 'center', lg: 'initial'}}>
            <Field.Text
              name="FooterTitleLine1"
              defaultValue="Erzählen Sie uns<br>
                von Ihrer Idee<span style='color:var(--chakra-colors-brand-500)'>.</span>"
              fontSize="4xl"
              fontWeight="500"
              w={{base: 'full', lg: 'fit-content'}}
              display={{base: 'block', lg: 'initial'}}
              mr={{base: 0, md: 3}}
            />
            <Field.Text
              name="FooterTextNew"
              defaultValue='<b>E-Mail</b><br>
              <a href="mailto:office@netsnek.com">office@netsnek.com</a><br>
              <br>
              <b>Telefon</b><br>
              <a href="tel:+43 650 834 88 11">+43 650 834 88 11</a><br>
              <br>
              <span style="font-weight: 700;">Oder besuchen Sie uns?</span><br>
              Löwengasse 28 / Lokal 2A<br>
              1030, Wien<br>
              Österreich'
              mt={10}
              maxW={{base: 'full', lg: '50%'}}
              fontSize="1.1rem"
              textAlign={{base: 'center', lg: 'initial'}}
            />
          </VStack>
          <ProjectsLinkGrid />
          {/* <Box
              w={{base: 'full', lg: 'fit-content'}}
              textAlign={{base: 'center', lg: 'initial'}}
              pl={"16"}
              >
              <Field.Text
                name="FooterTitleLine2"
                defaultValue="Oder lassen Sie sich vun unseren Kunden inspirieren<span style='color:var(--chakra-colors-brand-500)'>.</span>"
                fontSize="2xl"
                fontWeight="500"
                w={{base: 'full', lg: 'fit-content'}}
                display={{base: 'block', lg: 'initial'}}
                
                mr={{base: 0, md: 3}}
              />
            </Box> */}
        </Flex>
      </Container>
    </Box>
  )
}

export default ContentSection

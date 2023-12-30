import {
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
        background='linear-gradient(rgba(248,253,255,.85), rgba(248,253,255,.85)), url("https://www.transparenttextures.com/patterns/dark-denim.png")'
        //backgroundColor={"alphaWhite.900"}
        //backgroundBlendMode="screen"
        pb={24}
        mb="128"
        border={{base: 'none', md: '1px dashed #499fae'}}>
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
          <Gallery />
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
          <Wrap justify="center" mt={10} spacing={10} shouldWrapChildren>
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
          </Wrap>
        </Container>
      </Container>
    </Box>
  )
}

export default ContentSection

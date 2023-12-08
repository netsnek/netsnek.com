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
  useColorModeValue
} from '@chakra-ui/react'
import {useContactModal} from '../services/contact'
import {Field} from '@atsnek/jaen'
import Neurons from './Neurons'
import {FeaturedProducts} from './organisms/FeaturedProductsSection/FeaturedProductsSection'
import {GoogleMaps} from './GoogleMaps'
import WebampPlayer from './Webamp/WebampPlayer'

interface Props {
  children: React.ReactNode
}

const Testimonial = (props: Props) => {
  const {children} = props

  return <Box>{children}</Box>
}

const TestimonialContent = (props: Props) => {
  const {children} = props

  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      mt="5"
      p={8}
      rounded={'xl'}
      //align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)'
      }}>
      {children}
    </Stack>
  )
}

const TestimonialHeading = (props: Props) => {
  const {children} = props

  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  )
}

const TestimonialText = (props: Props) => {
  const {children} = props

  return (
    <Text
      //textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}>
      {children}
    </Text>
  )
}

const TestimonialAvatar = ({
  src,
  name,
  title
}: {
  src: string
  name: string
  title: string
}) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} mb={2} objectFit={'contain'} />
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
          {title}
        </Text>
      </Stack>
    </Flex>
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
      <Container maxW="6xl" borderLeft="4px solid" borderColor="brand.500" pb={24}>
        <Container
          //minH={"calc(100vh - 60px)"}
          maxW="4xl"
          px={{base: 6, md: 3}}>
          {/* <Image
          margin={'0 auto'}
          src="/images/MCALIENSCHRIFTLOGOOFFIZIELL.png"
          maxW="2xl"
        /> */}

          {/* <Heading>News</Heading>
        <AspectRatio ratio={16/9} mb="16">
          <Box borderRadius="lg" 
          // border={'solid black 5px'}
          ></Box>
        </AspectRatio> */}

          {/* <FeaturedProducts anchor='test' featuredProducts={[{image: "https://osg.snek.at/storage/BQACAgQAAxkDAAIsW2VFGtrO0UmpkYZV0BgslLcByh8qAAJRDwACCtMwUiMJbD4kmhDjLwQ", handle: "", product: ""},]} productsPagePath=''/> */}
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
        </Container>
        <Container maxW={'4xl'} pt={16} as={Stack} spacing={12}>
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
          <Stack
            direction={{base: 'column', md: 'row'}}
            spacing={{base: 10, md: 4, lg: 10}}>
            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>IT & Cloud</TestimonialHeading>
                <TestimonialText>
                  <Field.Text
                    name="ContentSectionTextTeam1"
                    defaultValue='Als Experte für IT-Services und ein Meister der Cloud-Technologie🚀, mit starker Basis in der Cyber-Security🔒, liegt meine Expertise in der Betreuung von IT-Systemen und in der Optimierung von Geschäftsprozessen. Die erfolgreiche Entwicklung eines gemeinsamen ERP-Systems namens "Jaen"✨, zusammen mit Agentur Nico Schett, unterstreicht meine Fähigkeit, proaktiv und lösungsorientiert zu handeln. Ich stehe stets bereit, Herausforderungen zu meistern, bevor sie entstehen, und sorge somit für ein reibungsloses technologisches Erlebnis. 💻🔧 '
                  />
                </TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={
                  'https://osg.snek.at/storage/BQACAgQAAxkDAAIsX2VG2JlO_XvDt3JcexGfxSLesn_oAAJZEAACLqAxUnY2C2EatToLLwQ'
                }
                name={'Florian Kleber'}
                title={'fhkit.at'}
              />
            </Testimonial>
            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>Elektrotechnik</TestimonialHeading>
                <TestimonialText>
                  <Field.Text
                    name="ContentSectionTextTeam2"
                    defaultValue="Ich kombiniere mein Masterstudium in Elektrotechnik⚡️ und Informationstechnik📡 mit hingebungsvoller Arbeit an Technik jeder Art. Besondere Leidenschaft habe ich für das Programmieren von Cloudsystemen, Websites und der Instandhaltung von Computern. Mit ständiger Faszination betreibe ich Server und Netzwerke. Vereinfachen und effizient machen - das ist mein Credo!💪🚀"
                  />
                </TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={
                  'https://osg.snek.at/storage/BQACAgQAAxkDAAIsW2VFGtrO0UmpkYZV0BgslLcByh8qAAJRDwACCtMwUiMJbD4kmhDjLwQ'
                }
                name={'Christoph Clementschitsch'}
                title={'neurons.at'}
              />
            </Testimonial>
            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>Design & Marketing</TestimonialHeading>
                <TestimonialText>
                  <Field.Text
                    name="ContentSectionTextTeam3"
                    defaultValue="Wir sind eine kreative 🎨 Werbeagentur in der charmanten Stadt Villach. Zusammen mit Florian Herbert Kleber IT arbeiten wir daran, moderne, stilvolle und wirkungsvolle Online-Auftritte zu gestalten."
                  />
                </TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={
                  'https://osg.snek.at/storage/BQACAgQAAxkDAAIsXWVGJpY-_RcMtfNgb1pEQHkhgpzcAAIdEQACCtM4Undi6U7j1-BRLwQ'
                }
                name={'Kanbon'}
                title={'kanbon.at'}
              />
            </Testimonial>
          </Stack>
          <Field.Text
            mt={{base: '20 !important', md: '0'}}
            mb="8"
            as={Heading}
            fontSize={{base: '4xl', lg: '5xl'}}
            lineHeight={1}
            fontWeight="bold"
            textAlign="left"
            //color="#b57edc"
            name="MapSectionHeading"
            defaultValue="Trau dich komm zu mir"
          />
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
        </Container>
  
      </Container>
      {/* <Flex flex={1} width={'100%'} overflow={'hidden'}>
          <Neurons display={{base: 'none', sm: 'flex'}} />
          <Neurons display={{base: 'none', md: 'flex'}} />
          <Neurons display={{base: 'none', xl: 'flex'}} />
          <Neurons />
        </Flex> */}
    </Box>
  )
}

export default ContentSection

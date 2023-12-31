import {
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
  useColorModeValue,
  Image,
  Icon,
  VisuallyHidden,
  IconButton
} from '@chakra-ui/react'
import {useContactModal} from '../services/contact'
import {Field} from '@atsnek/jaen'
import {FaGithub} from '@react-icons/all-files/fa/FaGithub'
import {FaLinkedin} from '@react-icons/all-files/fa/FaLinkedin'
import {FaTelegram} from '@react-icons/all-files/fa/FaTelegram'
import {FaInstagram} from '@react-icons/all-files/fa/FaInstagram'
import {FaTwitter} from '@react-icons/all-files/fa/FaTwitter'
import {FaFacebook} from '@react-icons/all-files/fa/FaFacebook'
import {FaBook} from '@react-icons/all-files/fa/FaBook'
import DottedBox from './DottedBox'

const HeroSection = () => {
  const contactModal = useContactModal()
  const onContactClick = () => {
    contactModal.onOpen({
      meta: {}
    })
  }

  return (
    <Container maxW="6xl" px={{base: 6, md: 3}} pb={24} overflow={'hidden'}>
      <Stack
        direction={{base: 'column-reverse', lg: 'row'}}
        justifyContent="center">
        <Stack
          direction="column"
          spacing={6}
          justifyContent="center"
          maxW="480px">
          <HStack
            as={LinkBox}
            p={1}
            rounded="full"
            fontSize="sm"
            w="max-content"
            //bg={useColorModeValue('gray.300', 'gray.700')}
            border="1px dashed #499fae"
            onClick={onContactClick}
            _hover={{
              textDecoration: 'underline',
              bg: useColorModeValue('gray.100', 'gray.700')
            }}>
            <Box
              py={1}
              px={2}
              lineHeight={1}
              rounded="full"
              color="white"
              bgColor="brand.500">
              Für dich
            </Box>
            <HStack spacing={1} alignItems="center" justifyContent="center">
              <Text as={LinkOverlay} lineHeight={1} mr={2}>
                Kostenlose Erstberatung
              </Text>
              {/* <Icon as={GoChevronRight} w={4} h={4} /> */}
            </HStack>
          </HStack>
          <Field.Text
            as={Heading}
            fontSize={{base: '4xl', lg: '5xl'}}
            lineHeight={1}
            fontWeight="bold"
            textAlign="left"
            color="#000000"
            name="HeroSectionHeading"
            defaultValue="Lass dich von <br />
            mir beraten"
          />
          <Field.Text
            fontSize="1.2rem"
            textAlign="left"
            lineHeight="1.375"
            fontWeight="400"
            color="gray.500"
            name="HeroSectionTexto"
            defaultValue="Willkommen bei Barbara Mauz 🌿💦 Ins Leben gerufen durch die reine
            Mutterliebe von Barbara für ihre Tochter Lilli, bieten wir
            handgefertigte, natürliche Seifenkreationen an. 🌼
            Unsere Produkte sind babyfreundlich und bestehen aus natürlichen
            Wirkstoffen und ätherischen Ölen. 🌱 Perfekt für alle, die sich
            eine chemikalienfreie Hautpflege wünschen. Hergestellt in Brückl,
            Kärnten, Austria. Und ja, sie sind sogar essbar (aber wir empfehlen
            doch das Naschen nicht 😉)."
          />
          <HStack
            spacing={{base: 0, sm: 2}}
            mb={{base: '3rem !important', sm: 0}}
            flexWrap="wrap">
            <Button
              w={{base: '100%', sm: 'auto'}}
              h={12}
              px={6}
              color="white"
              size="lg"
              rounded="md"
              mb={{base: 2, sm: 0}}
              zIndex={1}
              lineHeight={1}
              onClick={onContactClick}>
              Kontaktiere mich
              {/* <Icon as={MdBolt} h={4} w={4} ml={1} /> */}
            </Button>
            <Flex
              justifyContent="center"
              alignItems={'center'}
              w={{base: '100%', sm: 'auto'}}
              bg={useColorModeValue('white', 'gray.800')}
              //backgroundImage='url("https://www.transparenttextures.com/patterns/translucent-fibres.png")'
              //background='linear-gradient(rgba(244,249,251,.85), rgba(244,249,251,.85)), url("https://www.transparenttextures.com/patterns/dark-denim.png")'
              background='linear-gradient(rgba(248,253,255,.85), rgba(248,253,255,.85)), url("https://www.transparenttextures.com/patterns/dark-denim.png")'
              //borderColor="gray.300"
              p={3}
              border="1px dashed #499fae"
              lineHeight={1.18}
              rounded="md"
              //boxShadow="md"
              as={LinkBox}
              zIndex={1}
              _hover={{
                textDecoration: 'underline',
                bg: useColorModeValue('gray.100', 'gray.700')
              }}>
              <Icon as={FaBook} w={4} h={4} mr={2} />
              <LinkOverlay href="/blog/rezepte/">Rezepte</LinkOverlay>
            </Flex>
          </HStack>
        </Stack>
        <Box ml={{base: 0, md: 5}} pos="relative" flex="1">
          <DottedBox />
          <Box overflow={'hidden'} my={'10%'} ml={'20%'}>
            <Box borderRadius={'xl'} overflow={'hidden'}>
              {/* <video autoPlay muted>
                <source src="/N0jxFNt.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
              <Field.Image
                name="HeroImage"
                alt="Hero Image"
                defaultValue="/images/BQACAgQAAxkDAAIsg2Vksu1mAxWagurFpYDqaDyZeVCOAALoEgAC02YgUx7IfDguAAHhCC8E.png"
                h="full"
                w="full"
              />
            </Box>
            <Stack
              as={LinkBox}
              direction={'row'}
              spacing="0"
              //mx="-12px"
              flexWrap={'wrap'}>
              {/* <IconButton
                as={LinkOverlay}
                size="lg"
                variant={'ghost'}
                color="brand.500"
                icon={<Netsnek w={'25px'} h={'25px'} />}
                aria-label="Netsnek"
                href="https://netsnek.com/schett"
                isExternal
              /> */}
              <IconButton
                as={LinkOverlay}
                size="lg"
                variant={'ghost'}
                color="brand.500"
                icon={<FaFacebook />}
                aria-label="Github"
                href="https://github.com/schettn/"
                isExternal
              />
              <IconButton
                as={LinkOverlay}
                size="lg"
                variant={'ghost'}
                color="brand.500"
                icon={<FaInstagram />}
                aria-label="Instagram"
                href="https://www.instagram.com/barbara.mauz/"
                isExternal
              />
              <IconButton
                as={LinkOverlay}
                size="lg"
                variant={'ghost'}
                color="brand.500"
                icon={<FaTelegram />}
                aria-label="Telegram"
                href="https://t.me/schettn"
                isExternal
              />
              {/*<IconButton
            as={LinkOverlay}
            size="lg"
            variant={'ghost'}
            color="#ffffff"
            icon={<FaTwitter />}
            aria-label="Twitter"
            href="https://twitter.com/kleberbaum"
            isExternal
          />*/}
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Container>
  )
}

export default HeroSection

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
  IconButton,
  VStack
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
import Netsnek from '../../gatsby-plugin-jaen/components/Netsnek'

const HeroSection = () => {
  const contactModal = useContactModal()
  const onContactClick = () => {
    contactModal.onOpen({
      meta: {}
    })
  }

  return (
    <Container
      maxW="6xl"
      h="85vh"
      position="relative"
      display="Flex"
      justifyContent="space-between"
      pt="16"
    >
      <VStack spacing={4} align="left" w="50%" pt="20">
        <Box>
          <Heading as="h3" size="md" style={{animationDelay: '300ms'}}>
            STILVOLL. WIRKSAM.
          </Heading>
        </Box>
        <Box>
          <Heading as="h2" size="lg">
            Professioneller Webauftritt für dein Unternehmen.
          </Heading>
        </Box>
        <Text>
          Deine Werbeagentur in Villach. Gemeinsam gestalten wir einen modernen,
          stilvollen und effektiven Online-Auftritt für dein Unternehmen.
        </Text>
        <HStack spacing={4} mt={4}>
          <Button
            rightIcon={<Icon />}
            variant="solid"
            borderRadius="full"
            filter='drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))'
            onClick={() => (window.location.href = '#kontakt')}>
            Kontakt
          </Button>
          <Button
            variant="outline"
            borderRadius="full"
            filter='drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))'
            onClick={() => (window.location.href = '/projekte')}>
            Projekte ansehen
          </Button>
        </HStack>
      </VStack>
      <Box position="relative" h="20vw" w="20vw">
        <Netsnek
          position="absolute"
          h="100%"
          sx={{
            '.squarel': {
              display: 'none'
            },
            '.snek': {
              fill: 'black',
              stroke: 'black',
              strokeWidth: '1',
              filter: 'drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))'
            },
            '.arrows': {
              display: 'none'
            }
          }}
        />
        <Box
          bgColor="brand.500"
          h="24%" // Adjusted to 50% of the Flex container's height
          w="24%" // Adjusted to 50% of the Flex container's width
          top="43%"
          left="39%"
          transform="rotate(-45deg)"
          display="block"
          animation="beat 2s infinite"
          position="relative"
          filter="drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))"
          _before={{
            content: '""',
            bgColor: 'brand.500',
            borderRadius: '50%',
            width: '100%', // Adjusted to 100% of the Box element's width
            height: '100%', // Adjusted to 100% of the Box element's height
            position: 'absolute',
            top: `-50%`, // Adjusted to -25% of the Box element's height
            left: '0'
            //filter: "drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))"
          }}
          _after={{
            content: '""',
            bgColor: 'brand.500',
            borderRadius: '50%',
            width: '100%', // Adjusted to 100% of the Box element's width
            height: '100%', // Adjusted to 100% of the Box element's height
            position: 'absolute',
            left: `50%`, // 50% of the Box element's width, but the result might not be as expected
            top: '0'
            //filter: "drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))"
          }}
        />
      </Box>
    </Container>
  )
}

export default HeroSection

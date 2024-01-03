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
import Netsnek from '../../gatsby-plugin-jaen/components/Netsnek'

const HeroSection = () => {
  const contactModal = useContactModal()
  const onContactClick = () => {
    contactModal.onOpen({
      meta: {}
    })
  }

  return (
    <Box h="100vh" position="relative">
      <Netsnek
        position="absolute"
        h="500px"
        w="500px"
        right="0px"
        top="0px"
        sx={{
          '.squarel': {
            display: 'none'
          },
          '.snek': {
            display: 'none'
          },
          '.arrows': {
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: '1'
          },
          _hover: {
            '.arrows': {
              fill: 'black',
              stroke: 'black',
              strokeWidth: '1'
            }
          }
        }}
      />
      <Netsnek
        position="absolute"
        h="500px"
        sx={{
          '.squarel': {
            display: 'none'
          },
          '.snek': {
            display: 'none'
          },
          '.arrows': {
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: '1'
          }
        }}
      />
    </Box>
  )
}

export default HeroSection

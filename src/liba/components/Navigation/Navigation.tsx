import {
  Text,
  Box,
  Flex,
  HStack,
  Stack,
  VStack,
  useDisclosure,
  Link,
  IconButton,
  Grid,
  Divider,
  CloseButton,
  Container,
  SimpleGrid,
  Icon,
  Spacer,
  Button,
  LinkOverlay,
  LinkBox,
  useColorModeValue,
  Tooltip
} from '@chakra-ui/react'
import {FC, useState} from 'react'

import {Navbar} from './Navbar'

import {useContactModal} from '../../services/contact'
import TopNav from './TopNav'
import {useAuthenticationContext} from '@atsnek/jaen'
import {CloseIcon, HamburgerIcon} from '@chakra-ui/icons'
import {FaTwitter} from '@react-icons/all-files/fa/FaTwitter'
import {FaGithub} from '@react-icons/all-files/fa/FaGithub'
import {FaInstagram} from '@react-icons/all-files/fa/FaInstagram'
import {FaFacebook} from '@react-icons/all-files/fa/FaFacebook'
import {FiSearch} from '@react-icons/all-files/fi/FiSearch'
import Netsnek from '../../../gatsby-plugin-jaen/components/Netsnek'
import Logo from '../../../gatsby-plugin-jaen/components/Logo'
import HamburgerMenuIcon, {
  THamburgerMenuIconStylerProps
} from '../../../shared/components/HamburgerMenuIcon'
import SearchMenu from './SearchMenu'

interface IHeaderProps {
  path: string
  hamburgerIconProps?: THamburgerMenuIconStylerProps
}

const Header: FC<IHeaderProps> = ({path, hamburgerIconProps}) => {
  hamburgerIconProps = {
    color: 'red.500'
  }
  const contactModal = useContactModal()
  const handleOnContactClick = () => {
    contactModal.onOpen({
      meta: {}
    })
  }
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [hamburgerClass, setHamburgerClass] = useState('')

  const openDrawer = () => {
    setHamburgerClass('open')
    onOpen()
  }

  const closeDrawer = () => {
    setHamburgerClass('')
    onClose()
  }

  const toggleMobileMenu = () => {
    if (hamburgerClass === 'open') closeDrawer()
    else openDrawer()
  }

  return (
    <Box
      pos="relative"
      overflow="hidden"
      minH="100px"
      height={isOpen ? '100vh' : '100px'}
      transition="height 0.3s ease-in-out">
      <Box
        pos="relative"
        bg="#0A0A0A"
        transition="height 0.3s ease-in-out"
        height={isOpen ? '100vh' : '0'} // Adjust according to your header's initial height
        width="100%"
        overflow="hidden">
        <Container maxW="8xl">
          <VStack
            px="0"
            pt="4"
            pb="8"
            spacing="4"
            align="start"
            h="90vh"
            mt="15vh">
            <SimpleGrid
              fontSize="xxx-large"
              flex="1.5"
              w="full"
              columns={{base: 1, md: 2}}>
              <LinkBox
                flex="1"
                display="flex"
                pl="16"
                alignItems="center"
                borderWidth="1px"
                borderStyle="solid"
                borderRight={{base: '0', md: '1px'}}
                borderLeft="0"
                borderBottom="0"
                borderColor={useColorModeValue('gray.900', 'gray.600')}>
                <LinkOverlay href="/work" color="white">
                  Our Work
                </LinkOverlay>
              </LinkBox>
              <LinkBox
                flex="1"
                display="flex"
                pl="16"
                alignItems="center"
                borderWidth="1px"
                borderStyle="solid"
                borderBottom="0"
                borderRight="0"
                borderLeft="0"
                borderColor={useColorModeValue('gray.900', 'gray.600')}>
                <LinkOverlay href="/about" color="white">
                  About Us
                </LinkOverlay>
              </LinkBox>
              <LinkBox
                flex="1"
                display="flex"
                pl="16"
                alignItems="center"
                borderWidth="1px"
                borderStyle="solid"
                borderRight={{base: '0', md: '1px'}}
                borderLeft="0"
                borderColor={useColorModeValue('gray.900', 'gray.600')}>
                <LinkOverlay href="/process" color="white">
                  Our Process
                </LinkOverlay>
              </LinkBox>
              <LinkBox
                flex="1"
                display="flex"
                pl="16"
                alignItems="center"
                borderWidth="1px"
                borderRight="0"
                borderLeft="0"
                borderStyle="solid"
                borderColor={useColorModeValue('gray.900', 'gray.600')}>
                <LinkOverlay href="/blog" color="white">
                  Blog
                </LinkOverlay>
              </LinkBox>
              <Box pt="16" pl="16">
                <Text color="white" fontWeight="bold" fontSize="lg" pb="4">
                  Our offices
                </Text>
                <Text color="gray.400" fontSize="md">
                  Vienna
                </Text>
                <Text color="gray.400" fontSize="md">
                  Löwengasse 28
                </Text>
                <Text color="gray.400" fontSize="md">
                  1030 Vienna, Austria
                </Text>
              </Box>
              <Box pt="16" pl="16">
                <Text color="white" fontWeight="bold" fontSize="lg">
                  Follow us
                </Text>
                <HStack spacing="12">
                  <Link href="https://facebook.com" isExternal>
                    <Icon as={FaFacebook} boxSize="6" color="white" />
                  </Link>
                  <Link href="https://instagram.com" isExternal>
                    <Icon as={FaInstagram} boxSize="6" color="white" />
                  </Link>
                  <Link href="https://twitter.com" isExternal>
                    <Icon as={FaTwitter} boxSize="6" color="white" />
                  </Link>
                  <Link href="https://github.com" isExternal>
                    <Icon as={FaGithub} boxSize="6" color="white" />
                  </Link>
                </HStack>
              </Box>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
      <Box pos="absolute" top="0" left="0" w="100%">
        <Container maxW="8xl">
          <HStack
            px={{base: '4', md: '8'}}
            py={{base: '2', md: '4'}}
            justifyContent="space-between"
            alignItems="center">
            <LinkBox flex="1" display="flex" alignItems="center">
              <LinkOverlay href="/" color="white" mr="4">
                <Logo height="100%" color="black" />
              </LinkOverlay>
            </LinkBox>
            <Flex alignItems="center">
              <SearchMenu
                boxSizing={"border-box"}
                borderWidth={2}
                _hover={{
                  borderColor: 'brand.600'
                }}
              />
              <Button
                ml={4}
                filter="drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))"
                borderRadius={'full'}
                onClick={handleOnContactClick}
                fontSize="sm"
                fontWeight="semibold"
                color="white"
                display={{base: 'none', md: 'block'}}
              >
                Contact us
              </Button>
              <IconButton
                ml={4}
                icon={
                  <HamburgerMenuIcon
                    handleClick={toggleMobileMenu}
                    wrapperProps={{className: hamburgerClass}}
                    iconProps={{
                      // ...hamburgerIconProps,
                      //boxSize: '6',
                      //boxSize: '100%',
                      backgroundColor: 'white'
                    }}
                  />
                }
                filter="drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))"
                borderRadius={'full'}
                //variant="ghost"
                fontWeight={'bold'}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                onClick={toggleMobileMenu}
              />
            </Flex>
          </HStack>
        </Container>
      </Box>
      <Box
        pointerEvents="none"
        pos="absolute"
        top="0"
        left="0"
        transition="height 0.3s ease-in-out"
        h={isOpen ? '100vh' : '0'} // Adjust according to your header's initial height
        w="100%"
        overflow="hidden"
        style={{clip: 'rect(0, auto, auto, 0)'}}>
        <Container maxW="8xl" pointerEvents="auto">
          <HStack
            px={{base: '4', md: '8'}}
            py={{base: '2', md: '4'}}
            justifyContent="space-between"
            alignItems="center">
            <LinkBox flex="1" mr="4" display="flex" alignItems="center">
              <LinkOverlay href="/" color="white">
                <Logo height="100%" color="white" />
              </LinkOverlay>
            </LinkBox>
            <Flex alignItems="center">
              <SearchMenu
                borderColor={"white"}
                boxSizing={"border-box"}
                borderWidth={2}
                _hover={{
                  borderColor: 'brand.500'
                }}
              />
              <Button
                ml={4}
                _hover={{
                  bg: 'brand.500'
                }}
                borderRadius={'full'}
                filter="drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))"
                //variant="ghost"
                onClick={handleOnContactClick}
                fontSize="sm"
                fontWeight="semibold"
                bg="white"
                color="black"
                display={{base: 'none', md: 'block'}}>
                Contact us
              </Button>
              <IconButton
                ml={4}
                _hover={{
                  bg: 'brand.500'
                }}
                icon={
                  <HamburgerMenuIcon
                    // handleClick={toggleMobileMenu}
                    wrapperProps={{className: hamburgerClass}}
                    iconProps={{
                      // ...hamburgerIconProps,
                      //boxSize: '6',
                      //boxSize: '100%',
                      backgroundColor: 'black'
                    }}
                  />
                }
                filter="drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))"
                borderRadius={'full'}
                //variant="ghost"
                fontWeight={'bold'}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                onClick={toggleMobileMenu}
                bg={'white'}
                color={'black'}
              />
            </Flex>
          </HStack>
        </Container>
      </Box>
    </Box>
  )
}

export default Header

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
    <>
      <Box
        pos="relative"
        overflow="hidden"
        height={isOpen ? '100vh' : {base: '12vh', md: '15vh'}}
        //minH={isOpen ? '1000px' : '100px'}
        transition="height 0.3s ease-in-out">
        <Box
          pos="relative"
          bg="#0A0A0A"
          color="white"
          transition="height 0.3s ease-in-out"
          height={isOpen ? '100vh' : '0'} // Adjust according to your header's initial height
          // minH={isOpen ? '1000px' : '0'}
          width="100%"
          overflow="hidden">
          <Container maxW="8xl">
            <VStack
              px="0"
              pt="4"
              //pb="8"
              spacing="4"
              align="start"
              h="88vh"
              mt={{base: '12vh', md: '15vh'}}>
              <SimpleGrid
                fontSize={{base: 'xx-large', md: 'xxx-large'}}
                h="full"
                w="full"
                columns={{base: 1, md: 2}}>
                <LinkBox
                  display="flex"
                  pl={{base: '8', md: '16'}}
                  alignItems="center"
                  borderWidth="1px"
                  borderStyle="solid"
                  borderRight="1px"
                  borderLeft="0"
                  borderBottom="0"
                  borderColor={useColorModeValue('gray.900', 'gray.600')}
                  _hover={{
                    color: 'brand.500'
                  }}>
                  <LinkOverlay href="/work">Our Work</LinkOverlay>
                </LinkBox>
                <LinkBox
                  display="flex"
                  pl={{base: '8', md: '16'}}
                  alignItems="center"
                  borderWidth="1px"
                  borderStyle="solid"
                  borderBottom="0"
                  borderRight="0"
                  borderLeft={{base: '1px', md: '0px'}}
                  borderColor={useColorModeValue('gray.900', 'gray.600')}
                  _hover={{
                    color: 'brand.500'
                  }}>
                  <LinkOverlay href="/about">About Us</LinkOverlay>
                </LinkBox>
                <LinkBox
                  display="flex"
                  pl={{base: '8', md: '16'}}
                  alignItems="center"
                  borderWidth="1px"
                  borderStyle="solid"
                  borderRight="1px"
                  borderLeft="0"
                  borderColor={useColorModeValue('gray.900', 'gray.600')}
                  _hover={{
                    color: 'brand.500'
                  }}>
                  <LinkOverlay href="/process">Our Process</LinkOverlay>
                </LinkBox>
                <LinkBox
                  display="flex"
                  pl={{base: '8', md: '16'}}
                  alignItems="center"
                  borderWidth="1px"
                  borderRight="0"
                  borderLeft={{base: '1px', md: '0px'}}
                  borderStyle="solid"
                  borderColor={useColorModeValue('gray.900', 'gray.600')}
                  _hover={{
                    color: 'brand.500'
                  }}>
                  <LinkOverlay href="/blog">Blog</LinkOverlay>
                </LinkBox>
                <Box
                  pt={{base: '8', md: '16'}}
                  pl={{base: '8', md: '16'}}
                  borderWidth="1px"
                  borderTop="0"
                  borderBottom="0"
                  borderRight={{base: '1px', md: '0px'}}
                  borderLeft="0"
                  borderStyle="solid"
                  borderColor={useColorModeValue('gray.900', 'gray.600')}>
                  <Text color="white" fontWeight="bold" fontSize="lg" pb="4">
                    Our offices
                  </Text>
                  <Text color="white" fontSize="md">
                   Headquarter
                  </Text>
                  <Text color="gray.400" fontSize="md">
                    Löwengasse 28
                  </Text>
                  <Text color="gray.400" fontSize="md">
                    1030 Vienna, Austria
                  </Text>
                </Box>
                <Box
                  pt={{base: '8', md: '16'}}
                  pl={{base: '8', md: '16'}}
                  borderWidth="1px"
                  borderTop="0"
                  borderBottom="0"
                  borderRight={{base: '1px', md: '0px'}}
                  borderLeft="0"
                  borderStyle="solid"
                  borderColor={useColorModeValue('gray.900', 'gray.600')}>
                  <Text color="white" fontWeight="bold" fontSize="lg" pb="4">
                    Follow us
                  </Text>
                  <HStack spacing="12">
                    <LinkBox
                      mr="4"
                      display="flex"
                      _hover={{
                        color: 'brand.500'
                      }}>
                      <LinkOverlay href="https://facebook.com" isExternal>
                        <Icon as={FaFacebook} boxSize="6" />
                      </LinkOverlay>
                    </LinkBox>
                    <LinkBox
                      mr="4"
                      display="flex"
                      _hover={{
                        color: 'brand.500'
                      }}>
                      <LinkOverlay href="https://instagram.com" isExternal>
                        <Icon as={FaInstagram} boxSize="6" />
                      </LinkOverlay>
                    </LinkBox>
                    <LinkBox
                      mr="4"
                      display="flex"
                      _hover={{
                        color: 'brand.500'
                      }}>
                      <LinkOverlay href="https://twitter.com" isExternal>
                        <Icon as={FaTwitter} boxSize="6" />
                      </LinkOverlay>
                    </LinkBox>
                    <LinkBox
                      mr="4"
                      display="flex"
                      _hover={{
                        color: 'brand.500'
                      }}>
                      <LinkOverlay href="https://github.com" isExternal>
                        <Icon as={FaGithub} boxSize="6" />
                      </LinkOverlay>
                    </LinkBox>
                  </HStack>
                </Box>
              </SimpleGrid>
            </VStack>
          </Container>
        </Box>
        <Box pos="absolute" top="0" left="0" w="100%">
          <Container maxW="8xl" pointerEvents="auto">
            <HStack
              h={{base: '12vh', md: '15vh'}}
              minH="100px"
              alignItems={'center'}
              px={{base: '4', md: '8'}}
              py={{base: '2', md: '4'}}
              justifyContent="space-between">
              <LinkBox flex="2" mr="4" display="flex">
                <LinkOverlay href="/" color="white">
                  <Logo height="100%" color="black" />
                </LinkOverlay>
              </LinkBox>
              <Flex alignItems="center" flex="1" justifyContent="flex-end">
                <SearchMenu
                  boxSizing={'border-box'}
                  borderWidth={{base: 0, lg: 2}}
                  color={{base: 'white', lg: 'gray.400'}}
                  _hover={{
                    borderColor: 'brand.600',
                    bg: {base: 'brand.600', lg: 'transparent'}
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
                  display={{base: 'none', md: 'block'}}>
                  Contact us
                </Button>
                <Button
                  ml={4}
                  filter="drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))"
                  borderRadius={'full'}
                  onClick={handleOnContactClick}
                  fontSize="sm"
                  fontWeight="semibold"
                  color="white"
                  display={{base: 'none', md: 'block'}}>
                  Sign In
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
              h={{base: '12vh', md: '15vh'}}
              minH="100px"
              alignItems={'center'}
              px={{base: '4', md: '8'}}
              py={{base: '2', md: '4'}}
              justifyContent="space-between">
              <LinkBox flex="2" mr="4" display="flex">
                <LinkOverlay href="/" color="white">
                  <Logo height="100%" color="white" />
                </LinkOverlay>
              </LinkBox>
              <Flex alignItems="center" flex="1" justifyContent="flex-end">
                <SearchMenu
                  borderColor={'white'}
                  boxSizing={'border-box'}
                  borderWidth={{base: 0, lg: 2}}
                  bg={{base: 'white', lg: 'transparent'}}
                  color={{base: 'black', lg: 'gray.400'}}
                  _hover={{
                    borderColor: 'brand.500',
                    bg: {base: 'brand.500', lg: 'transparent'}
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
                  Sign In
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
      {/* <Container maxW="8xl" position={'sticky'} top={0}>
        <HStack
          w="fit-content"
          spacing={4}
          px={{base: '4', md: '8'}}
          //py={{base: '2', md: '4'}}
          borderWidth="1px"
          borderStyle="solid"
          borderRight="0"
          borderLeft="0"
          borderColor={useColorModeValue('gray.900', 'gray.600')}
          justifyContent="space-between"
          alignItems="center">
          <Link href="https://facebook.com" isExternal>
            foo
          </Link>
          <Link href="https://facebook.com" isExternal>
            bar
          </Link>
          <Link href="https://facebook.com" isExternal>
            fooo
          </Link>
          <Link href="https://facebook.com" isExternal>
            baar
          </Link>
        </HStack>
      </Container> */}
    </>
  )
}

export default Header

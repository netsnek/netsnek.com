import {useAuthenticationContext} from '@atsnek/jaen'
import {CloseIcon, HamburgerIcon} from '@chakra-ui/icons'
import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Stack,
  useDisclosure,
  VStack,
  Button,
  Tooltip,
  Icon,
  LinkOverlay,
  Flex,
  LinkBox,
  useColorModeValue
} from '@chakra-ui/react'
import {FaUser} from '@react-icons/all-files/fa/FaUser'
import {navigate} from 'gatsby'
// import {Logo} from '../../common/assets/Logo'
// import Logo from '../../gatsby-plugin-jaen/components/Logo'
import {useContactModal} from '../../services/contact'
import {FaPhoneAlt} from '@react-icons/all-files/fa/FaPhoneAlt'
import {FaBook} from '@react-icons/all-files/fa/FaBook'
import {FaNewspaper} from '@react-icons/all-files/fa/FaNewspaper'
import {FaPercent} from '@react-icons/all-files/fa/FaPercent'
// import {BottomNavLinks} from './NavLinks'

export const MobileHambuger: React.FC<{
  pathname: string
}> = ({pathname}) => {
  const {isOpen, onToggle} = useDisclosure()

  const contactModal = useContactModal()

  const handleOnContactClick = () => {
    contactModal.onOpen({
      meta: {}
    })
  }

  const {user, openLoginModal, logout} = useAuthenticationContext()

  return (
    <>
      <IconButton
        display={{base: 'flex', md: 'none'}}
        onClick={onToggle}
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        //variant={"ghost"}
        aria-label="Menu"
      />

      <Drawer placement="left" onClose={onToggle} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderRightRadius="lg">
          <DrawerCloseButton />
          <DrawerHeader>
            {/* <Image
                onClick={() => {
                  void navigate('/')
                }}
                h=".875rem"
                w="10rem"
                src="/images/red_logo.svg"
              /> */}
            {/* <Logo
              //maxWidth='20rem'
              //height="auto"
              height=".875rem"
              width="10rem"
              //transform="scale(0.5)"
              objectFit="contain"
              // display={mode === 'website' ? 'block' : 'none'}
              cursor="pointer"
              onClick={() => {
                void navigate('/')
              }}
              color="#E3000F"
              alt="logo"
            /> */}
          </DrawerHeader>
          <Divider />
          <DrawerBody>
            <Stack spacing="8" pt="4">
              {/* <BottomNavLinks
                pathname={pathname}
                childrenTextAlign="left"
                w="full"
                px="2"
                zIndex="5"
                spacing="6"
                fontSize="md"
                onClick={onToggle}
              /> */}

              <VStack
                direction="row"
                justify="space-between"
                align="center"
                spacing="4"
                mt="4">
                <Flex
                  justifyContent="center"
                  alignItems={'center'}
                  w="full"
                  bg={useColorModeValue('white', 'gray.800')}
                  //backgroundImage='url("https://www.transparenttextures.com/patterns/translucent-fibres.png")'
                  //background='linear-gradient(rgba(244,249,251,.85), rgba(244,249,251,.85)), url("https://www.transparenttextures.com/patterns/dark-denim.png")'
                  background='linear-gradient(rgba(248,253,255,.85), rgba(248,253,255,.85)), url("https://www.transparenttextures.com/patterns/dark-denim.png")'
                  //borderColor="gray.300"
                  p={2}
                  borderWidth="1px"
                  borderStyle="dashed"
                  borderColor={useColorModeValue('brand.500', 'brand.200')}
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
                  <LinkOverlay href="/blog/rezepte">Rezepte</LinkOverlay>
                </Flex>
                <Flex
                  justifyContent="center"
                  alignItems={'center'}
                  w="full"
                  bg={useColorModeValue('white', 'gray.800')}
                  //backgroundImage='url("https://www.transparenttextures.com/patterns/translucent-fibres.png")'
                  //background='linear-gradient(rgba(244,249,251,.85), rgba(244,249,251,.85)), url("https://www.transparenttextures.com/patterns/dark-denim.png")'
                  background='linear-gradient(rgba(248,253,255,.85), rgba(248,253,255,.85)), url("https://www.transparenttextures.com/patterns/dark-denim.png")'
                  //borderColor="gray.300"
                  p={2}
                  borderWidth="1px"
                  borderStyle="dashed"
                  borderColor={useColorModeValue('brand.500', 'brand.200')}
                  lineHeight={1.18}
                  rounded="md"
                  //boxShadow="md"
                  as={LinkBox}
                  zIndex={1}
                  _hover={{
                    textDecoration: 'underline',
                    bg: useColorModeValue('gray.100', 'gray.700')
                  }}>
                  <Icon as={FaNewspaper} w={4} h={4} mr={2} />
                  <LinkOverlay href="/blog/artikel">Artikel</LinkOverlay>
                </Flex>
                <Flex
                  justifyContent="center"
                  alignItems={'center'}
                  w="full"
                  bg={useColorModeValue('white', 'gray.800')}
                  //backgroundImage='url("https://www.transparenttextures.com/patterns/translucent-fibres.png")'
                  //background='linear-gradient(rgba(244,249,251,.85), rgba(244,249,251,.85)), url("https://www.transparenttextures.com/patterns/dark-denim.png")'
                  background='linear-gradient(rgba(248,253,255,.85), rgba(248,253,255,.85)), url("https://www.transparenttextures.com/patterns/dark-denim.png")'
                  //borderColor="gray.300"
                  p={2}
                  borderWidth="1px"
                  borderStyle="dashed"
                  borderColor={useColorModeValue('brand.500', 'brand.200')}
                  lineHeight={1.18}
                  rounded="md"
                  //boxShadow="md"
                  as={LinkBox}
                  zIndex={1}
                  _hover={{
                    textDecoration: 'underline',
                    bg: useColorModeValue('gray.100', 'gray.700')
                  }}>
                  <Icon as={FaPercent} w={4} h={4} mr={2} />
                  <LinkOverlay href="/blog/rabattcodes">Rabattcodes</LinkOverlay>
                </Flex>
                <Tooltip label="Login" aria-label="Login">
                  <Button
                    w="full"
                    leftIcon={<FaUser />}
                    onClick={openLoginModal}>
                    Anmelden
                  </Button>
                </Tooltip>
                <Tooltip label="Kontakt" aria-label="Kontakt">
                  <Button
                    w="full"
                    aria-label="Kontakt"
                    leftIcon={<FaPhoneAlt />}
                    onClick={handleOnContactClick}>
                    Kontakt
                  </Button>
                </Tooltip>
              </VStack>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

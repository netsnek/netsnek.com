import {
  Image,
  Text,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Icon,
  IconButton,
  Stack,
  Tooltip,
  HStack,
  LinkBox,
  Heading,
  ChakraBaseProvider,
  chakra,
  LinkOverlay
} from '@chakra-ui/react'

import {FaLongArrowAltLeft} from '@react-icons/all-files/fa/FaLongArrowAltLeft'
import {FaShopify} from '@react-icons/all-files/fa/FaShopify'
import {FaPhoneAlt} from '@react-icons/all-files/fa/FaPhoneAlt'
import {FaShoppingCart} from '@react-icons/all-files/fa/FaShoppingCart'
import {Link as GatsbyLink, navigate} from 'gatsby'
import {FC} from 'react'
import BottomNav from './BottomNav'
//import {NavAuthButton} from './NavAuthButton'

import {useAuthenticationContext} from '@atsnek/jaen'
import Logo from '../../../gatsby-plugin-jaen/components/Logo'
import {MobileHambuger} from './MobileHamburger'
import {NavAuthButton} from './NavAuthButton'
import {FaUser} from '@react-icons/all-files/fa/FaUser'
import {Field} from '@atsnek/jaen'

import SearchMenu from './SearchMenu'

interface INavbarProps {
  pathname: string
  onBasketClick?: () => void
  onSearchClick?: () => void
  onContactClick?: () => void
}

export const Navbar: FC<INavbarProps> = ({
  pathname,
  onSearchClick,
  onBasketClick,
  onContactClick
}) => {
  const {isAuthenticated} = useAuthenticationContext()
  const {user, openLoginModal, logout} = useAuthenticationContext()

  return (
    <Stack
      display={isAuthenticated ? 'none' : 'flex'}
      direction="row"
      spacing="4"
      h={'60px'}
      py={{base: 2}}
      px={{base: 4}}
      justifyContent="space-between"
      alignItems={'center'}>
      <Flex flex="1" textAlign="center" display={{base: 'flex', md: 'none'}}>
        <MobileHambuger pathname={pathname} />
      </Flex>
      <Flex flex="1" justifyContent="start">
        <HStack as={LinkBox} w="max-content">
          {/* <Box 
            bg="black"
            top="0" 
            position={{ base: "static", md: "absolute" }} 
            borderRadius="lg"
            display={{
              base: "none",
              md: "flex",
            }}
            >
            <Logo
              border="1px dashed white"
              h={{ base: "50px", md: "80px" }}
              w={{ base: "50px", md: "80px" }}
              m="1"
              borderRadius="lg"
            />
          </Box> */}
          <LinkOverlay href="/">
            <IconButton
              display={{'base': 'none', 'sm': 'block'}}
              filter="drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))"
              position={{base: 'static', md: 'absolute'}}
              top="0"
              h={{base: '2.5rem', md: '70px'}}
              w={{base: '2.5rem', md: '70px'}}
              bg="black"
              _hover={{
                bg: 'brand.600',
                background:
                  'linear-gradient(rgba(55,131,146,.85), rgba(55,131,146,.85)), url("https://www.transparenttextures.com/patterns/dark-denim.png")'
              }}
              //backgroundImage='url("https://www.transparenttextures.com/patterns/dark-denim.png")'
              background='linear-gradient(rgba(0,0,0,.85), rgba(0,0,0,.85)), url("https://www.transparenttextures.com/patterns/dark-denim.png")'
              size="md"
              aria-label="Logo"
              p="0.5"
              icon={
                <Logo
                  bg="transperent"
                  //border={{base: 'none', md: '1px dashed white'}}
                  border="1px dashed #bae0e2"
                  // h={{ base: "50px", md: "80px" }}
                  // w={{ base: "50px", md: "80px" }}
                  borderRadius="lg"
                />
              }
              onClick={undefined}
            />

            <Text
              ml={{base: 'none', md: '90px'}}
              //display={{base: 'none', md: 'flex'}}
              as={Heading}
              whiteSpace={'nowrap'}
              size="h5030"
              fontSize={{base: '3xl', md: '5xl'}}
              lineHeight={1}
              fontWeight="bold"
              //textAlign="left"
              color="#000000">
              Barbara
              {/* <chakra.span color="brand.200">.</chakra.span> */}
              <chakra.span fontWeight="light">Mauz</chakra.span>
            </Text>
          </LinkOverlay>
        </HStack>
      </Flex>
      <Flex
        justifyContent={'center'}
        w="30%"
        display={{
          base: 'none',
          lg: 'flex'
        }}>
        <SearchMenu />
      </Flex>
      <Flex flex="1" justifyContent="end">
        <ButtonGroup
          spacing={{
            base: 0,
            md: 2
          }}>
          <Tooltip label="Login" aria-label="Login">
            <Button
              display={{
                base: 'none',
                md: 'flex'
              }}
              size="sm"
              leftIcon={<FaUser />}
              onClick={openLoginModal}>
              Anmelden
            </Button>
          </Tooltip>
          <Tooltip label="Kontakt" aria-label="Kontakt">
            <Button
              display={{
                base: 'none',
                md: 'flex'
              }}
              size="sm"
              aria-label="Kontakt"
              leftIcon={<FaPhoneAlt />}
              onClick={onContactClick}>
              Kontakt
            </Button>
          </Tooltip>
          <Tooltip label="Kontakt" aria-label="Kontakt">
            <IconButton
              filter="drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))"
              display={{
                base: 'flex',
                md: 'none'
              }}
              size="md"
              aria-label="Kontakt"
              icon={<FaPhoneAlt />}
              onClick={onContactClick}
            />
          </Tooltip>
        </ButtonGroup>
      </Flex>
    </Stack>
  )
}

import {
  AspectRatio,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Link,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Spacer,
  Stack,
  VStack,
  useColorModeValue
} from '@chakra-ui/react'
import {FC, ReactNode} from 'react'
import {Field, useAuthenticationContext} from '@atsnek/jaen'
import {FaGithub} from '@react-icons/all-files/fa/FaGithub'
import {FaLinkedin} from '@react-icons/all-files/fa/FaLinkedin'
import {FaTelegram} from '@react-icons/all-files/fa/FaTelegram'
import {FaInstagram} from '@react-icons/all-files/fa/FaInstagram'
import {FaTwitter} from '@react-icons/all-files/fa/FaTwitter'
import Logo from '../../gatsby-plugin-jaen/components/Logo'
import Netsnek from '../../gatsby-plugin-jaen/components/Netsnek'
import {
  Balloon,
  HBalloon
} from '../../gatsby-plugin-jaen/components/Ballons_Ballons'
import ContactButton from './ContactButton'
import {AGTIcon} from '../../gatsby-plugin-jaen/components/agtguntrade'
import {WGIcon} from '../../gatsby-plugin-jaen/components/wgstros'
import {FHKITIcon} from '../../gatsby-plugin-jaen/components/fhkit'
import {LibaIcon} from '../../gatsby-plugin-jaen/components/liba'
import {MyP5Icon} from '../../gatsby-plugin-jaen/components/p5'
import {FaFacebook} from '@react-icons/all-files/fa/FaFacebook'

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
    </Grid>
  )
}

const Footer: FC = () => {
  const isAuthenticated = useAuthenticationContext().user !== null

  const links = [
    [
      {
        label: 'Links',
        isTitle: true
      },
      {
        label: 'GitHub',
        href: 'https://github.com/in/kleberbaum/'
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/kleberbaum/'
      },
      {
        label: 'Telegram',
        href: 'https://t.me/kleberbaum'
      },
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/kleberbaum/'
      },
      {
        label: 'Impressum',
        href: '/impressum'
      }
    ],
    [
      {
        label: 'Partner',
        isTitle: true
      },
      {
        label: 'Kanbon',
        href: 'https://kanbon.at'
      },
      {
        label: 'Neurons',
        href: 'https://neurons.at'
      }
    ],
    [
      {
        label: 'Gestaltet von',
        isTitle: true
      },
      {
        label: 'Florian H. Kleber',
        href: 'https://github.com/in/kleberbaum/'
      },
      {
        label: 'Nico Schett',
        href: 'https://schett.net'
      }
    ]
  ]

  const linkElmnts: ReactNode[] = []

  links.forEach((linkGroup, i) => {
    linkElmnts.push(
      <VStack spacing={3} alignItems="start" wrap="wrap" key={i}>
        {linkGroup.map((link, i) => {
          if ('isTitle' in link) {
            return (
              <Field.Text
                key={i}
                name={'FooterLinkTitle' + link.label}
                defaultValue={link.label}
                fontWeight="500"
              />
            )
          }
          return (
            <Link key={i} href={link.href} variant="hover-theme" opacity={0.7}>
              <Field.Text
                name={'FooterLink' + link.label}
                defaultValue={link.label}
              />
            </Link>
          )
        })}
      </VStack>
    )
  })

  return (
    <>
      <Container
        maxW="5xl"
        borderRadius="2xl"
        borderTop="1px solid"
        borderColor={useColorModeValue('brand.500', 'brand.200')}
        mb={20}
        position="relative"
        //mt="-25px"
        px={{base: 5, lg: 0}}
        overflowX="hidden"
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
                von Ihrem Projekt<span style='color:var(--chakra-colors-brand-500)'>.</span>"
              fontSize="4xl"
              fontWeight="500"
              w={{base: 'full', lg: 'fit-content'}}
              display={{base: 'block', lg: 'initial'}}
              mr={{base: 0, md: 3}}
            />
            <Field.Text
              name="FooterTextNew"
              defaultValue="Löwengasse 28 / Lokal 2A<br>
                1030, Wien<br>
                Österreich<br>
                <br>
                Tel: +43 676 4002330"
              mt={10}
              maxW={{base: 'full', lg: '50%'}}
              fontSize="1.1rem"
              textAlign={{base: 'center', lg: 'initial'}}
            />
            <ContactButton mt={10} inverted />
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
      <Box
        borderTopRadius="2xl"
        borderTop="1px solid"
        borderColor={useColorModeValue('brand.500', 'brand.200')}
        pb={20}
        position="relative"
        //mt="-25px"
        px={{base: 5, lg: 0}}
        overflowX="hidden"
        bgColor="black"
        zIndex={0}>
        <Container maxW="7xl" h="100%">
          <Flex mt={20} color="white" wrap={{base: 'wrap', sm: 'nowrap'}}>
            <Box>
              <Flex alignItems={'center'}>
                <Logo h="100px" />
              </Flex>
            </Box>
            <Spacer minW={{base: '5rem', lg: '25%'}} />
            <HStack
              alignItems="start"
              spacing={{base: 5, sm: 20}}
              wrap={{base: 'wrap', md: 'nowrap'}}
              mt={{base: 10, md: 0}}>
              {linkElmnts}
            </HStack>
          </Flex>
          {/* <Stack
            mt={20}
            as={LinkBox}
            direction={'row'}
            spacing="0"
            mx="-12px"
            flexWrap={'wrap'}>
            <IconButton
              as={LinkOverlay}
              size="lg"
              variant={'ghost'}
              color="#ffffff"
              icon={<Netsnek w={'25px'} h={'25px'} />}
              aria-label="Netsnek"
              href="https://netsnek.com/schett"
              isExternal
            />
            <IconButton
              as={LinkOverlay}
              size="lg"
              variant={'ghost'}
              color="#ffffff"
              icon={<FaGithub />}
              aria-label="Github"
              href="https://github.com/schettn/"
              isExternal
            />
            <IconButton
              as={LinkOverlay}
              size="lg"
              variant={'ghost'}
              color="#ffffff"
              icon={<FaInstagram />}
              aria-label="Instagram"
              href="https://www.instagram.com/barbara.mauz/"
              isExternal
            />
            <IconButton
              as={LinkOverlay}
              size="lg"
              variant={'ghost'}
              color="#ffffff"
              icon={<FaTelegram />}
              aria-label="Telegram"
              href="https://t.me/schettn"
              isExternal
            />
          </Stack> */}
          <HStack
            //justifyContent={"flex-end"}
            color={'white'}
            mt={20}
            mb={4}
            as={LinkBox}
            spacing="4"
            flexWrap={'wrap'}>
            <LinkBox
              mr="4"
              display="flex"
              transition="color 0.2s"
              _hover={{
                color: 'brand.500'
              }}>
              <LinkOverlay href="https://facebook.com" isExternal>
                <Icon as={FaFacebook} boxSize="5" />
              </LinkOverlay>
            </LinkBox>
            <LinkBox
              mr="4"
              display="flex"
              transition="color 0.2s"
              _hover={{
                color: 'brand.500'
              }}>
              <LinkOverlay href="https://instagram.com" isExternal>
                <Icon as={FaInstagram} boxSize="5" />
              </LinkOverlay>
            </LinkBox>
            <LinkBox
              mr="4"
              display="flex"
              transition="color 0.2s"
              _hover={{
                color: 'brand.500'
              }}>
              <LinkOverlay href="https://twitter.com" isExternal>
                <Icon as={FaTwitter} boxSize="5" />
              </LinkOverlay>
            </LinkBox>
            <LinkBox
              mr="4"
              display="flex"
              transition="color 0.2s"
              _hover={{
                color: 'brand.500'
              }}>
              <LinkOverlay href="https://github.com" isExternal>
                <Icon as={FaGithub} boxSize="5" />
              </LinkOverlay>
            </LinkBox>
          </HStack>
          <Divider mt={0} opacity={0.2} border="1px" />
          <Field.Text
            name="FooterBottomText"
            defaultValue="Copyright © 2023 Florian H. Kleber, Florian Herbert Kleber IT. All rights reserved."
            mt={5}
            color="white"
            opacity={0.2}
            _hover={{
              opacity: 1
            }}
            cursor="default"
            transition="opacity 0.2s ease-in-out"
          />
        </Container>
      </Box>
    </>
  )
}

export default Footer

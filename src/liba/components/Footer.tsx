import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  Link,
  LinkBox,
  LinkOverlay,
  Spacer,
  Stack,
  VStack
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

const Footer: FC = () => {
  const isAuthenticated = useAuthenticationContext().user !== null

  const links = [
    [
      {
        label: 'Links',
        isTitle: true
      },
      {
        label: 'Facebook',
        href: 'https://t.me/schettn'
      },
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/barbara.mauz/'
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
        label: 'Lilli Mauz',
        href: '#'
      }
    ],
    [
      {
        label: 'Gestaltet von',
        isTitle: true
      },
      {
        label: 'Florian Kleber',
        href: '#'
      },
      {
        label: 'Alexander Kleber',
        href: '#'
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
    <Box
      borderTopRadius="2xl"
      borderTop="1px solid"
      borderColor="brand.500"
      pb={20}
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
      <Container maxW="7xl" h="100%">
        <Box mt="20vh" color="white">
          <Flex
            maxW={{base: 'full', lg: '75%'}}
            wrap={{base: 'wrap', lg: 'nowrap'}}>
            <Box
              w={{base: 'full', lg: 'fit-content'}}
              textAlign={{base: 'center', lg: 'initial'}}>
              <Field.Text
                name="FooterTitleLine1"
                defaultValue="Danke für deinen Besuch!"
                fontSize="4xl"
                fontWeight="500"
                w={{base: 'full', lg: 'fit-content'}}
                display={{base: 'block', lg: 'initial'}}
                mr={{base: 0, md: 3}}
              />
            </Box>
          </Flex>
          <Field.Text
            name="FooterTextNew"
            defaultValue="St. Johanner Straße 10<br>
            9371, Brückl<br>
            Austria<br>
            <br>
            Tel: +43 676 4002330"
            mt={10}
            maxW={{base: 'full', lg: '50%'}}
            fontSize="1.1rem"
            textAlign={{base: 'center', lg: 'initial'}}
          />
        </Box>
        <Flex mt={20} color="white" wrap={{base: 'wrap', sm: 'nowrap'}}>
          <Box>
            <Flex alignItems={'center'}>
              <Logo w="100px" h="100px" mr={-4} />
              <Field.Text
                name="FooterLogoText1"
                defaultValue="arbara"
                //display={{ base: "none", md: "flex"}}
                as={Heading}
                //whiteSpace={'nowrap'}
                fontSize="5xl"
                lineHeight={1}
                fontWeight="bold"
              />
            </Flex>
            <Field.Text
              name="FooterLogoText2"
              defaultValue="Mauz"
              ml="18px"
              //display={{ base: "none", md: "flex"}}
              as={Heading}
              //whiteSpace={'nowrap'}
              fontSize="4xl"
              lineHeight={1}
              fontWeight="light"
            />
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
        <Stack
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
        </Stack>
        <Divider mt={0} opacity={0.1} border='1px dashed white'/>
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
  )
}

export default Footer

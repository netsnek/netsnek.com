import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'gatsby-plugin-jaen';
import { Field } from 'jaen';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram';
import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook';
import Logo from '../../gatsby-plugin-jaen/components/Logo';

const year = new Date().getFullYear();

/** A localizable group heading of the footer link columns. */
interface FooterGroupTitle {
  label: string;
  isTitle: true;
}

/**
 * A footer link. `name` is the jaen field name and must stay stable even
 * when the label is localized, because it keys the stored CMS content.
 */
interface FooterLink {
  name: string;
  label: string;
  href: string;
}

type FooterEntry = FooterGroupTitle | FooterLink;

/**
 * Footer component.
 */
const Footer: FC = () => {
  const intl = useIntl();

  const links: FooterEntry[][] = [
    [
      {
        label: intl.formatMessage({
          id: 'FooterLinksTitle',
          defaultMessage: 'Links'
        }),
        isTitle: true
      },
      {
        name: 'FooterLinkGitHub',
        label: 'GitHub',
        href: 'https://github.com/netsnek/'
      },
      // {
      //   label: 'LinkedIn',
      //   href: 'https://www.linkedin.com/in/kleberbaum/'
      // },
      {
        name: 'FooterLinkTelegram',
        label: 'Telegram',
        href: 'https://t.me/kleberbaum'
      },
      {
        name: 'FooterLinkFacebook',
        label: 'Facebook',
        href: 'https://facebook.com/netsnek/'
      },
      {
        name: 'FooterLinkInstagram',
        label: 'Instagram',
        href: 'https://instagram.com/netsnek/'
      },
      {
        name: 'FooterLinkImpressum',
        label: intl.formatMessage({
          id: 'FooterLinkImprint',
          defaultMessage: 'Impressum'
        }),
        href: '/imprint'
      }
    ],
    [
      {
        label: intl.formatMessage({
          id: 'FooterPartnerTitle',
          defaultMessage: 'Partner'
        }),
        isTitle: true
      },
      {
        name: 'FooterLinkKanbon',
        label: 'Kanbon',
        href: 'https://kanbon.at'
      },
      {
        name: 'FooterLinkNeurons',
        label: 'Neurons',
        href: 'https://neurons.at'
      }
    ],
    [
      {
        label: intl.formatMessage({
          id: 'FooterDesignedByTitle',
          defaultMessage: 'Gestaltet von'
        }),
        isTitle: true
      },
      {
        name: 'FooterLinkFlorian H. Kleber',
        label: 'Florian H. Kleber',
        href: 'https://fhkit.at'
      },
      {
        name: 'FooterLinkNico Schett',
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
            // Group titles are localized chrome (react-intl), not CMS fields.
            return (
              <Text key={i} color="white" fontWeight="500">
                {link.label}
              </Text>
            )
          }
          return (
            <Link
              key={i}
              href={link.href}
              variant="footer"
              color="white"
              opacity={0.7}
            >
              <Field.Text
                color="white"
                name={link.name}
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
      <Box
        // Gerade Kante ohne Rundung: der Footer schliesst direkt an die
        // dunkle Open-Source-Flaeche an, eine abgerundete Oberkante mit
        // Linie haette dazwischen eine Naht gezogen.
        bgGradient="none"
        pb={20}
        position="relative"
        //mt="-25px"
        px={{base: 5, lg: 0}}
        overflowX="hidden"
        bgColor="#0A0A0A"
        zIndex={0}>
        <Container maxW="7xl" h="100%">
          <Flex mt={20} wrap={{base: 'wrap', sm: 'nowrap'}}>
            <Box>
              <Flex alignItems={'center'}>
                <Logo color="white" h="100px" />
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
              <LinkOverlay href="https://facebook.com/netsnek" isExternal>
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
              <LinkOverlay href="https://instagram.com/netsnek" isExternal>
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
              <LinkOverlay href="https://twitter.com/netsnek_com" isExternal>
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
              <LinkOverlay href="https://github.com/netsnek" isExternal>
                <Icon as={FaGithub} boxSize="5" />
              </LinkOverlay>
            </LinkBox>
          </HStack>
          <Divider mt={8} opacity={0.2} />
          <Field.Text
            name="FooterBottomText"
            defaultValue={intl.formatMessage({
              id: 'FooterCopyright',
              defaultMessage:
                'Copyright © 2024 Netsnek, Florian Herbert Kleber IT & Werbeagentur Nico Schett. All rights reserved.'
            })}
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

export default Footer;

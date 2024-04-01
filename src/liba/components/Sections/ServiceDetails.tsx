import {
  Link,
  Box,
  Flex,
  Container,
  Heading,
  Text,
  chakra
} from '@chakra-ui/react'

import {StylizedImage} from '../StylizedImage'
import servicesSvg from '../../../common/assets/services.svg'

const Services = () => {
  return (
    <Box as="section" mt={{base: '24', sm: '32', lg: '40'}}>
      <Box>
        {/* <Text fontSize="sm" fontWeight="medium">
            Services
          </Text> */}
        <Heading as="h2" size="xl" mt="4">
          Wir unterstützen
          <br />
          <chakra.span color="brand.500">Ihr Unternehmen</chakra.span>
          <br />
          im digitalen Zeitalter<chakra.span color="brand.500">.</chakra.span>
        </Heading>
        {/* <Text mt="4">
            Bei Netsnek bieten wir eine breite Palette von Dienstleistungen an,
            die auf die individuellen Bedürfnisse unserer Kunden zugeschnitten
            sind.
          </Text> */}
      </Box>
      <Container maxW="container.xl" mt="16">
        <Flex
          direction={{base: 'column', lg: 'row'}}
          align="center"
          justify="end">
          <Box flex="1" textAlign="center" pr={{lg: '12'}}>
            {/* Please replace `servicesSvg` with the source of your image or adjust as needed */}
            <StylizedImage
              sx={{
                filter:
                  'hue-rotate(180deg) saturate(1.3) brightness(1.1) contrast(0.9)'
              }}
              src={servicesSvg}
              boxSize={{base: '31rem', lg: '41rem'}}
              m="auto"
            />
          </Box>
          <Box
            mt={{base: '16', lg: '0'}}
            flex="1"
            minW={{lg: '33rem'}}
            pl={{lg: '4'}}>
            {/* For each ListItem you can create a custom component or structure here */}
            <Box mb="6">
              <Heading as="h4" size="md">
                UX-Konzeption
              </Heading>
              <Text mt="2">
                Durch den Einsatz moderner UX-Methoden gestalten wir
                benutzerfreundliche und intuitive Oberflächen.
              </Text>
            </Box>
            <Box mb="6">
              <Heading as="h4" size="md">
                Web development
              </Heading>
              <Text mt="2">
                Wir kreieren moderne Websites und Webanwendungen, die exakt auf
                Ihre individuellen Bedürfnisse zugeschnitten sind.
              </Text>
            </Box>
            <Box mb="6">
              <Heading as="h4" size="md">
                Backend development
              </Heading>
              <Text mt="2">
                Unsere maßgeschneiderten Backend-Lösungen werden speziell auf
                Ihre Anforderungen abgestimmt und basieren auf dem Framework{' '}
                <Link href="/jaen" textDecoration="underline">
                  Pylon
                </Link>
                .
              </Text>
            </Box>
            <Box mb="6">
              <Heading as="h4" size="md">
                Content management
              </Heading>
              <Text mt="2">
                Mit{' '}
                <Link href="/jaen" textDecoration="underline">
                  Jaen
                </Link>{' '}
                als Content-Management-System ermöglichen wir es Ihnen, Ihre
                Website eigenständig zu verwalten.
              </Text>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default Services

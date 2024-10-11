import {
  Image,
  Box,
  Container,
  Heading,
  Text,
  GridItem,
  Grid
} from '@chakra-ui/react'
import { Field } from 'jaen'

const Mushroom = () => {
  return (
    <Container
      as="section"
      maxW="3xl"
      borderRadius="2xl"
      //mb={{ base: '0', lg: '16' }}
      position="relative"
      overflow={{ base: 'hidden', lg: 'visible' }}
      px={0}
      py={16}
      zIndex={0}
      id="mushroom"
      >
      <Image
        margin="0 auto"
        mb="8"
        src="images/svg/mushroom.svg"
        alt="mushroom"
      />
      <Field.Text
        as={Heading}
        variant="cursive"
        mb="8"
        size={{ base: 'sm', lg: 'md' }}
        style={{ animationDelay: '300ms' }}
        fontWeight="500"
        //textTransform="uppercase"
        lineHeight="1.5em"
        //letterSpacing="4.2px"
        textAlign="center"
        name="MushroomSectionHeading1"
        defaultValue="Gesund muss nicht kompliziert sein."
      />
      <Field.Text
        //mt={{ base: '20 !important', md: '0' }}
        mb="8"
        as={Text}
        fontSize={{ base: '2xl', lg: '3xl' }}
        lineHeight={1}
        fontWeight="900"
        textAlign="center"
        name="MushroomSectionSubheading1"
        //defaultValue="“Indem ich erkenne, wie meine Ernährung meinen Körper beeinflusst, wächst meine Bereitschaft, positive Veränderungen vorzunehmen.”"
        defaultValue="“Gesunde ausgewogene Ernährung ist der einfachste und günstigste Weg deine Gesundheit und deine Lebensqualität signifikant zu verbessern.”"
      />
      {/* <Field.Text
        //mt={{ base: '20 !important', md: '0' }}
        mb="8"
        as={Text}
        fontSize={{ base: 'lg', lg: 'xl' }}
        lineHeight={1}
        fontWeight="bold"
        textAlign="center"
        name="MushroomSectionSubheading2"
        defaultValue="Das ist meine Devise."
      />
      <Field.Text
        //mt={{ base: '20 !important', md: '0' }}
        mb="8"
        as={Text}
        fontSize={{ base: 'md', lg: 'lg' }}
        lineHeight={1}
        //fontWeight="bold"
        textAlign="center"
        name="MushroomSectionHeading2"
        defaultValue="Indem wir deine individuellen Lebensumstände genau betrachten, entwickeln wir gemeinsam eine gesunde Ernährungsweise, die du mühelos in deinen Alltag integrieren kannst."
      /> */}
      {/* <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={10}>
        <GridItem colSpan={1}>
          <Box
            bg="white"
            borderRadius="xl"
            p={6}
            h="full"
            w="full"
            border="1px"
            borderColor="#f9f9f9"
            boxShadow="sm">
            <Image
              src="https://kanbon.at/wp-content/uploads/2024/02/beratung.jpg"
              alt="Beratung"
              h="200px"
              w="full"
              objectFit="cover"
              borderRadius="md"
            />
            <Text mt={4} fontSize="xl" fontWeight="bold">
              Beratung
            </Text>
            <Text mt={2} fontSize="md" color="gray.500">
              Wir beraten Sie in allen Fragen rund um die Digitalisierung.
            </Text>
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Box
            bg="white"
            borderRadius="2xl"
            p={6}
            h="full"
            w="full"
            border="1px"
            borderColor="#f9f9f9"
            boxShadow="sm">
            <Image
              src="https://kanbon.at/wp-content/uploads/2021/12/Mockup_Arneitz-scaled.jpg"
              alt="Entwicklung"
              h="200px"
              w="full"
              objectFit="cover"
              borderRadius="md"
            />
            <Text mt={4} fontSize="xl" fontWeight="bold">
              Entwicklung
            </Text>
            <Text mt={2} fontSize="md" color="gray.500">
              Wir entwickeln individuelle Softwarelösungen für Ihr Unternehmen.
            </Text>
          </Box>
        </GridItem>
      </Grid> */}
    </Container>
  )
}

export default Mushroom

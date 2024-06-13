import {
  Image,
  Box,
  Container,
  Heading,
  Text,
  GridItem,
  Grid,
  HStack,
  Center
} from '@chakra-ui/react'
import { Field } from '@atsnek/jaen'

const Special = () => {
  return (
    <Container
      as="section"
      maxW="4xl"
      borderRadius="2xl"
      mb={{ base: '0', lg: '16' }}
      position="relative"
      overflow={{ base: 'hidden', lg: 'visible' }}
      px={{ base: 5, lg: 0 }}
      py={8}
      zIndex={0}>
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
        name="SpecialSectionHeading1"
        defaultValue="Jeder Mensch ist einzigartig."
      />
      <Field.Text
        //mt={{ base: '20 !important', md: '0' }}
        mb="8"
        as={Text}
        fontSize={{ base: 'md', lg: 'lg' }}
        lineHeight={1}
        //fontWeight="bold"
        textAlign="center"
        name="SpecialSectionSubheading1"
        defaultValue="... und genau so individuell sollte die Ernährung an deine persönlichen Lebensumstände angepasst sein. Gemeinsam ermitteln wir eine Ernährungsweise, die du mühelos in deinen Alltag integrieren und vor allem langfristig beibehalten kannst, ohne Einbußen in deiner Lebensqualität hinnehmen zu müssen."
      />
      <HStack justifyContent="space-between" mb={8}>
        <Image
          src="images/svg/grapes.svg"
          alt="grapes"
        />
        <Image
          src="images/svg/cup.svg"
          alt="cup"
        />
        <Image
          src="images/svg/apple.svg"
          alt="apple"
        />
        <Image
          src="images/svg/spaghetti.svg"
          alt="spaghetti"
        />
        <Image
          src="images/svg/fish.svg"
          alt="fish"
        />
        <Image
          src="images/svg/cut_mushroom.svg"
          alt="cut mushroom"
        />
        <Image
          src="images/svg/wine_glass.svg"
          alt="wine glass"
        />
      </HStack>
      <Field.Text
        //mt={{ base: '20 !important', md: '0' }}
        //mb="8"
        as={Text}
        fontSize={{ base: 'lg', lg: 'xl' }}
        lineHeight={1}
        //fontWeight="bold"
        textAlign="center"
        name="SpecialSectionHeading2"
        defaultValue="Die richtige Ernährung verleiht dir mehr Energie und Konzentration für den Alltag und schafft so zusätzlichen Freiraum für dich und deine Liebsten."
      />
    </Container>
  )
}

export default Special

import {
  Image,
  Box,
  Container,
  Heading,
  Text,
  GridItem,
  Grid,
  HStack,
  Center,
  Button
} from '@chakra-ui/react'
import { Field, Head } from '@atsnek/jaen'

const Pains = () => {
  return (
    <HStack
      as="section"
      w={"full"}
      borderRadius="2xl"
      mb={{ base: '0', lg: '16' }}
      position="relative"
      overflow={{ base: 'hidden', lg: 'visible' }}
      px={{ base: 5, lg: 0 }}
      pb={8}
      zIndex={0}>
      <Image
        w={"500px"}
        src="images/pains-image-1.png"
        alt="grapes"
      />
      <Container
        maxW="2xl"
      >
        <Field.Text
          as={Text}
          //variant="cursive"
          mb="8"
          size={{ base: 'xl', lg: '2xl' }}
          style={{ animationDelay: '300ms' }}
          fontWeight="500"
          //textTransform="uppercase"
          lineHeight="1.5em"
          //letterSpacing="4.2px"
          textAlign="left"
          name="PainsSectionHeading1"
          borderLeft={"4px solid"}
          borderColor={"brand.500"}
          pl={8}
          defaultValue="
Fühlst du dich im Alltag <i>energielos</i>?<br/>
Strebst du danach, endlich <i>konzentrierter</i> arbeiten zu können?<br/>
Fühlst du dich abends regelmäßig <i>erschöpft und ausgebrannt</i>?<br/>
Möchtest du deine Zeit <i>aktiver und erfüllter</i> nutzen können?<br/>
          "
        />
        <Field.Text
          //mt={{ base: '20 !important', md: '0' }}
          mb="8"
          as={Heading}
          fontSize={{ base: 'xl', lg: '2xl' }}
          lineHeight={1}
          //fontWeight="bold"
          textAlign="left"
          name="PainsSectionHeading2"
          defaultValue="Wenn du dich in den Punkten wiederfindest, stehen die Chancen gut, dass du von einem unverbindlichen Kennenlernen profitieren wirst."
        />
        <Field.Text
          //mt={{ base: '20 !important', md: '0' }}
          mb="8"
          as={Text}
          fontSize={{ base: 'md', lg: 'lg' }}
          lineHeight={1}
          //fontWeight="bold"
          textAlign="left"
          name="PainsSectionSubheading1"
          defaultValue="
          Mein Ziel ist es, dass du nicht nur deine eigenen Ziele übertriffst, sondern auch außerhalb der Arbeit aktiv und erfüllt leben kannst. Jeder Tag bietet dir 24 Stunden. Wenn du gesunde 8 Stunden schläfst, bleiben dir noch 16 wertvolle Stunden – und jede einzelne davon sollte lebenswert sein.
          "
        />
        <HStack alignItems="center">
          <Button
            mr="8"
          >
            Lernen wir uns kennen
          </Button>
          <Field.Text
            //mt={{ base: '20 !important', md: '0' }}
            //mb="8"
            as={Text}
            fontSize={{ base: 'sm', lg: 'md' }}
            opacity={0.8}
            lineHeight={1}
            //fontWeight="bold"
            textAlign="left"
            name="PainsSectionSubheading1"
            defaultValue="
            Kostenlos und unverbindlich.<br/>
            Eine Stunde nur für dich.
          "
          />
        </HStack>
      </Container>
    </HStack>
  )
}

export default Pains

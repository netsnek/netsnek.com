import {
  Image,
  Box,
  Flex,
  Container,
  Heading,
  Text,
  GridItem,
  Grid,
  HStack,
  Center,
  Button
} from '@chakra-ui/react'
import { Field, Head } from 'jaen'
import { useContactModal } from '../../services/contact';

const Sweets = () => {
  const contactModal = useContactModal()

  const onContactClick = () => {
    contactModal.onOpen({
      meta: {}
    })
  };

  return (
    <Flex
      as="section"
      flexDir={{ base: 'column-reverse', lg: 'row' }}
      w={"full"}
      borderRadius="2xl"
      mb={{ base: '0', lg: '16' }}
      position="relative"
      overflow={{ base: 'hidden', lg: 'visible' }}
      px={{ base: 5, lg: 0 }}
      py={8}
      zIndex={0}>
      <Container
        maxW="2xl"
      >
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
          textAlign="left"
          name="SweetsSectionHeading1"
          defaultValue="Jeder Mensch ist einzigartig."
        />
        <Field.Text
          //mt={{ base: '20 !important', md: '0' }}
          mb="8"
          as={Heading}
          fontSize={{ base: 'xl', lg: '2xl' }}
          lineHeight={1}
          //fontWeight="bold"
          textAlign="left"
          name="SweetsSectionHeading2"
          defaultValue="Du liebst Süßigkeiten, genießt gelegentlich frittierte Speisen und findest es schwer, auf etwas zu verzichten?"
        />
        <Field.Text
          //mt={{ base: '20 !important', md: '0' }}
          mb="8"
          as={Text}
          fontSize={{ base: 'md', lg: 'lg' }}
          lineHeight={1}
          //fontWeight="bold"
          textAlign="left"
          name="SweetsSectionSubheading1"
          defaultValue="
          <b>Deine Ernährung sollte deine Vorlieben berücksichtigen.</b>
<br/><br/>
Auch die Bedürfnisse deiner Partnerin, deines Partners oder deiner Kinder sind wichtig für deine Ernährungsplanung.
<br/><br/>
Ob du beruflich oft unterwegs bist und häufig außer Haus isst oder es vorziehst, selbst zu kochen und deine Mahlzeiten daheim zuzubereiten – wir gestalten einen Ernährungsplan, der zu deinem Lebensstil passt.
          "
        />
        <Button
          onClick={onContactClick}
        >
          Unverbindliches Gespräch vereinbaren
        </Button>
      </Container>
      <Image
        mb="8"
        w={"500px"}
        src="images/sweets-image-1.png"
        alt="grapes"
      />
    </Flex>
  )
}

export default Sweets

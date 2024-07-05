import { Grid, GridItem, Heading, Text, Button, chakra, Container } from '@chakra-ui/react';
import { useContactModal } from '../../services/contact';

const Customer = () => {
  const contactModal = useContactModal()

  const onContactClick = () => {
    contactModal.onOpen({
      meta: {}
    })
  };

  return (
    <Container
      maxW="8xl"
      as="section"
      p={16}
    >
      <Grid
        templateAreas={{
          base: `
          "heading-main"
          "heading1"
          "text1"
          "heading2"
          "text2"
          "heading3"
          "text3"
          "bottom-text"
          "bottom-button"
        `,
          md: `
          "heading-main heading-main"
          "heading1 heading2"
          "text1 text2"
          "heading3 heading3"
          "text3 text3"
          "bottom-text bottom-text"
          "bottom-button bottom-button"
        `,
          lg: `
          "heading-main heading-main heading-main"
          "heading1 heading2 heading3"
          "text1 text2 text3"
          "bottom-text bottom-text bottom-text"
          "bottom-button bottom-button bottom-button"
        `,
        }}
        gap={{ base: 4, sm: 8 }}
        mt={{ base: '12', sm: '12', lg: '20' }}
        //p="16"
        w="full"
        maxW="full"
        color="white"
        alignItems="start"
      >
        <GridItem colSpan={{ base: 1, md: 2, lg: 3 }} textAlign="center" area="heading-main" mb={4}>
          <Heading as="h2" size="xl" mt={4} fontWeight="500">
            Meine Kunden
            <chakra.span color="brand.500">.</chakra.span>
          </Heading>
        </GridItem>

        {/* Pair 1 */}
        <GridItem area="heading1">
          <Heading as="h3" size="md">
            Du bist Unternehmer und möchtest den ganzen Tag über konzentriert Entscheidungen treffen?
          </Heading>
        </GridItem>
        <GridItem area="text1" mb={4}>
          <Text>
            Wir lernen gemeinsam kennen, wie dein Körper auf unterschiedliche Lebensmittel reagiert. Auf was solltest du beim schnellen Mittagessen achten? Welche Essgewohnheiten bringen dir Energie, welche mindern sie? Mit welchen Lebensmitteln gelingt eine gesunde, selbstgekochte Mahlzeit, wenns nur 10 Minuten dauern darf?
          </Text>
        </GridItem>

        {/* Pair 2 */}
        <GridItem area="heading2">
          <Heading as="h3" size="md">
            Du bist Mutter/Vater und möchtest mehr Zeit für deine Familie schaffen?
          </Heading>
        </GridItem>
        <GridItem area="text2" mb={4}>
          <Text>
            Wichtig ist, dass jeder gerne bei der Ernährungsweise mitmacht und dass das Kochen keine Stunden benötigt. Wie kann man sich ausführlich belohnen, ohne gesunde Routinen zu brechen? Ziel ist es, dass ihr auch abends noch Energie für Aktivitäten oder für gemeinsame Hausaufgaben habt.
          </Text>
        </GridItem>

        {/* Pair 3 */}
        <GridItem area="heading3">
          <Heading as="h3" size="md">
            Du arbeitest körperlich und hast am Abend keine Energie mehr für deine persönlichen Bedürfnisse?
          </Heading>
        </GridItem>
        <GridItem area="text3" mb={4}>
          <Text>
            Von was profitiert dein Körper? Woher nimmt dein Körper die Energie? Wir finden heraus, welche Speisen nicht nur ausreichend Energie für den Alltag bringen, sondern auch deine Gesundheit nachhaltig verbessern.
          </Text>
        </GridItem>

        {/* Bottom Text */}
        <GridItem colSpan={{ base: 1, md: 2, lg: 3 }} textAlign="center" area="bottom-text" mb={4}>
          <Text>
            Jeder Mensch profitiert von mehr Energie und klareren Gedanken. Wir erhöhen deine Lebensqualität, indem du deinen Körper besser zu verstehen lernst.
          </Text>
        </GridItem>

        {/* Bottom Button */}
        <GridItem colSpan={{ base: 1, md: 2, lg: 3 }} textAlign="center" area="bottom-button" mb={4}>
          <Button colorScheme="brand" onClick={onContactClick}>Finden wir heraus, ob du von mir profitierst</Button>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Customer;
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text
} from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import { Field } from 'jaen';
import { FC } from 'react';
import { useIntl } from 'react-intl';

import { useLocalizeHref } from '../../contexts/locale';
import MatrixRain from './MatrixRain';

/** Ground of the panel, the same near black the contact block uses. */
const PANEL_BG = '#0A0A0A';

interface Pillar {
  id: string;
  titleId: string;
  titleDefault: string;
  textId: string;
  textDefault: string;
}

/**
 * The three things we actually give back, in the order they cost us the most:
 * the code, the writing, the evenings spent at the Linuxtag.
 */
const PILLARS: Pillar[] = [
  {
    id: 'source',
    titleId: 'OpenSourceTitle',
    titleDefault: 'Offener Code',
    textId: 'OpenSourceText',
    textDefault:
      'Jaen, das CMS hinter dieser Seite, ist Open Source, und qtamp samt der Skin-Engine qtWasabi steht unter der MIT-Lizenz. Wer wissen will, wie etwas gebaut ist, liest den Quellcode selbst nach.'
  },
  {
    id: 'knowledge',
    titleId: 'OpenKnowledgeTitle',
    titleDefault: 'Offenes Wissen',
    textId: 'OpenKnowledgeText',
    textDefault:
      'In unserer Dokumentation veröffentlichen wir, was wir gelernt haben, von den Quantencomputing-Kapiteln aus PhotonQ über die Linux- und RPM-Notizen bis zu den Security-Berichten. Unser RPM-Repository stellt dazu die gepatchten Pakete bereit, die dabei entstanden sind.'
  },
  {
    id: 'community',
    titleId: 'OpenCommunityTitle',
    titleDefault: 'Community vor Ort',
    textId: 'OpenCommunityText',
    textDefault:
      'Netsnek sponsert den Kärntner Linuxtag und hilft mit, die Linuxtage nach Kärnten zu bringen. Beim Linux-Stammtisch sind wir regelmäßig dabei.'
  }
];

/**
 * What we give back to open source, as a full bleed dark panel.
 *
 * The glyph curtain rains behind everything, a scrim sits between the rain
 * and the content, and the text itself rides on cards of its own, so the
 * copy never has to compete with a moving background at any width. The
 * penguin gets a halo instead: dimming the rain only where it stands keeps
 * the curtain intact everywhere else.
 */
const Open: FC = () => {
  const intl = useIntl();
  const localizeHref = useLocalizeHref();

  return (
    <Box
      as="section"
      id="open"
      position="relative"
      overflow="hidden"
      bg={PANEL_BG}
      borderY="1px solid"
      borderColor="whiteAlpha.200"
      py={{ base: '16', lg: '24' }}
      // Oben Luft zum Kontakt, unten keine: die Karte schliesst direkt an,
      // sonst steht ein weisser Streifen zwischen zwei dunklen Flaechen.
      mt={{ base: '24', sm: '32', lg: '40' }}
      mb="0"
      borderBottom="none"
    >
      {/* Viele Spalten und viele Zeilen: der Vorhang wird per slice auf die
          Flaeche skaliert, ein kleines Raster liefe sonst als Riesenschrift. */}
      <MatrixRain
        columns={64}
        rows={36}
        speed={0.85}
        background="transparent"
        opacity={0.5}
        seed={7}
      />

      {/* Der Vorhang darf regnen, der Text muss lesbar bleiben: ein Schleier
          zwischen beiden kostet nichts und nimmt dem Regen nur die Spitze. */}
      <Box
        position="absolute"
        inset="0"
        pointerEvents="none"
        aria-hidden="true"
        background={`linear-gradient(180deg, ${PANEL_BG}80 0%, ${PANEL_BG}b8 45%, ${PANEL_BG}d9 100%)`}
      />

      <Container
        maxW="6xl"
        position="relative"
        zIndex={1}
        px={{ base: 5, lg: 8 }}
      >
        <Grid
          templateColumns={{
            base: '1fr',
            lg: 'minmax(0, 0.8fr) minmax(0, 1.2fr)'
          }}
          gap={{ base: 10, lg: 16 }}
          alignItems="center"
        >
          {/* Am Telefon steht der Pinguin ueber dem Text, ab lg daneben.
              Die Reihenfolge im Markup erledigt beides. */}
          <GridItem>
            <Flex
              position="relative"
              justify="center"
              align="center"
              minH={{ base: '220px', md: '280px', lg: '360px' }}
            >
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                w={{ base: '300px', md: '380px', lg: '460px' }}
                h={{ base: '300px', md: '380px', lg: '460px' }}
                pointerEvents="none"
                aria-hidden="true"
                background="radial-gradient(closest-side, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 52%, rgba(10,10,10,0) 78%)"
              />

              <Image
                src="/images/carinthian-tux.svg"
                alt={intl.formatMessage({
                  id: 'OpenTuxImageAlt',
                  defaultMessage:
                    'Tux mit dem Kärntner Wappen, das Logo des Carinthian Linuxday'
                })}
                position="relative"
                w={{ base: '180px', md: '220px', lg: '260px' }}
                h="auto"
                maxW="full"
                filter="drop-shadow(0 0 26px rgba(247, 127, 0, 0.35))"
              />
            </Flex>
          </GridItem>

          <GridItem>
            <Field.Text
              mb={{ base: '8', lg: '10' }}
              as={Heading}
              color="white"
              fontSize={{ base: '4xl', lg: '5xl' }}
              lineHeight={1}
              fontWeight="bold"
              textAlign="left"
              name="SectionHeadingOpen"
              defaultValue={intl.formatMessage({
                id: 'OpenHeading',
                defaultMessage:
                  "Wir geben zurück, was uns trägt<span style='color:var(--chakra-colors-brand-500)'>.</span>"
              })}
            />

            <Stack spacing={{ base: 4, lg: 5 }}>
              {PILLARS.map(pillar => (
                <Box
                  key={pillar.id}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  bg="rgba(255, 255, 255, 0.04)"
                  backdropFilter="blur(8px)"
                  boxShadow="0 8px 24px rgba(0, 0, 0, 0.45)"
                  p={{ base: 5, lg: 6 }}
                >
                  <Text fontSize="xl" fontWeight="bold" color="white">
                    {intl.formatMessage({
                      id: pillar.titleId,
                      defaultMessage: pillar.titleDefault
                    })}
                  </Text>
                  <Text mt="2" fontSize="md" color="whiteAlpha.800">
                    {intl.formatMessage({
                      id: pillar.textId,
                      defaultMessage: pillar.textDefault
                    })}
                  </Text>
                </Box>
              ))}
            </Stack>

            <Flex justify={{ base: 'center', lg: 'flex-start' }} mt="10">
              <Button
                as={GatsbyLink}
                to={localizeHref('/docs')}
                variant="solid"
                filter="drop-shadow(1px 2px 2px rgb(0 0 0 / 0.35))"
              >
                {intl.formatMessage({
                  id: 'OpenDocsLink',
                  defaultMessage: 'Zur Dokumentation'
                })}
              </Button>
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Open;

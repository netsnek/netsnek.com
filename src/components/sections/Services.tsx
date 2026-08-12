import {
  Box,
  Container,
  Heading,
  Text,
  GridItem,
  Grid
} from '@chakra-ui/react';
import { Field } from 'jaen';
import { useIntl } from 'react-intl';

/**
 * What the two card pictures actually occupy, derived from the containers
 * rather than from the eye.
 *
 * index.tsx wraps this section in `<Container maxW="5xl">`, whose recipe pads
 * `4` (16px) a side, so its content box is `min(100vw, 1024px) - 32px`. The
 * `<Container maxW="6xl">` below pads `5` (20px) at base and nothing from lg
 * (992px) up, and never reaches its own 72rem. The grid is one column at base
 * and two from lg with a gap of `10` (40px), and each card pads `6` (24px a
 * side). So the picture box is
 *
 *   base        100vw - 32 - 40 - 48            =  100vw - 120px
 *   lg ≥992px   (992 - 32 - 40) / 2 - 48        =  412px
 *   ≥1024px     the container stops growing:       428px
 *
 * against the `sizes="100vw"` that jaen's page fragment declares, because it
 * asks for `gatsbyImageData(layout: FULL_WIDTH)`.
 *
 * Be clear about what this does and does not buy. The srcset that fragment
 * produces starts at 750w — FULL_WIDTH's breakpoints are 750, 1080, 1366,
 * 1920, capped at the source width — so on the 412px / 1.75x profile
 * PageSpeed emulates, the browser already picks the smallest candidate there
 * is and this changes nothing for that run. It does stop a 1x desktop from
 * fetching the 1600w variant for a 428px box, and a 2x phone from fetching
 * 1080w for a 292px one. Closing the rest needs a candidate below 750w, i.e.
 * breakpoints that only jaen's fragment or gatsby-plugin-sharp's `defaults`
 * can supply.
 */
const SERVICE_CARD_IMAGE_SIZES =
  '(min-width: 992px) 428px, calc(100vw - 120px)';

const Services = () => {
  const intl = useIntl();

  return (
    <Container
      as="section"
      maxW="6xl"
      borderRadius="2xl"
      mb={{ base: '0', lg: '16' }}
      position="relative"
      overflow={{ base: 'hidden', lg: 'visible' }}
      px={{ base: 5, lg: 0 }}
      zIndex={0}
    >
      <Field.Text
        mt={{ base: '20 !important', md: '0' }}
        mb="8"
        as={Heading}
        // A recipe size, not fontSize + lineHeight props. The pair is v2's
        // exactly; see `siteHeadingSizes` in styles/theme/recipes for why it
        // has to live in the recipe to survive v3's merge order.
        size="section"
        fontWeight="bold"
        textAlign="left"
        name="ContentSectionHeadingServices"
        defaultValue={intl.formatMessage({
          id: 'ServicesHeading',
          defaultMessage:
            "Wir verwirklichen in Wochen,<br/> <span style='color:var(--chakra-colors-brand-500)'>nicht Monaten.</span>"
        })}
      />
      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={10}>
        <GridItem colSpan={1}>
          <Box
            bg="white"
            borderRadius="xl"
            p={6}
            h="full"
            w="full"
            border="1px"
            borderColor="#f9f9f9"
            boxShadow="sm"
          >
            {/* Field.Image always fills the box it is given, so the frame
                carries the height and the rounded corners that used to sit
                on the picture itself. */}
            <Box h="200px" w="full" borderRadius="md" overflow="hidden">
              <Field.Image
                name="ServicesCardConsultingImage"
                defaultValue="/images/services/beratung.jpg"
                alt={intl.formatMessage({
                  id: 'ServicesCardConsultingImageAlt',
                  defaultMessage: 'Beratung'
                })}
                objectFit="cover"
                sizes={SERVICE_CARD_IMAGE_SIZES}
              />
            </Box>
            <Field.Text
              mt={4}
              as={Text}
              fontSize="xl"
              fontWeight="bold"
              name="ServicesCardConsultingTitle"
              defaultValue={intl.formatMessage({
                id: 'ServicesCardConsultingTitle',
                defaultMessage: 'Beratung'
              })}
            />
            <Field.Text
              mt={2}
              as={Text}
              fontSize="md"
              color="gray.500"
              name="ServicesCardConsultingText"
              defaultValue={intl.formatMessage({
                id: 'ServicesCardConsultingText',
                defaultMessage:
                  'Wir beraten Sie in allen Fragen rund um die Digitalisierung.'
              })}
            />
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
            boxShadow="sm"
          >
            <Box h="200px" w="full" borderRadius="md" overflow="hidden">
              <Field.Image
                name="ServicesCardDevelopmentImage"
                defaultValue="/images/services/mockup-arneitz.jpg"
                alt={intl.formatMessage({
                  id: 'ServicesCardDevelopmentImageAlt',
                  defaultMessage: 'Entwicklung'
                })}
                objectFit="cover"
                sizes={SERVICE_CARD_IMAGE_SIZES}
              />
            </Box>
            <Field.Text
              mt={4}
              as={Text}
              fontSize="xl"
              fontWeight="bold"
              name="ServicesCardDevelopmentTitle"
              defaultValue={intl.formatMessage({
                id: 'ServicesCardDevelopmentTitle',
                defaultMessage: 'Entwicklung'
              })}
            />
            <Field.Text
              mt={2}
              as={Text}
              fontSize="md"
              color="gray.500"
              name="ServicesCardDevelopmentText"
              defaultValue={intl.formatMessage({
                id: 'ServicesCardDevelopmentText',
                defaultMessage:
                  'Wir entwickeln individuelle Softwarelösungen für Ihr Unternehmen.'
              })}
            />
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Services;

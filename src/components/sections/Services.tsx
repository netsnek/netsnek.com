import {
  Box,
  Container,
  Heading,
  Text,
  GridItem,
  Grid
} from '@chakra-ui/react'
import { Field } from 'jaen'
import { useIntl } from 'react-intl'

const Services = () => {
  const intl = useIntl()

  return (
    <Container
      as="section"
      maxW="6xl"
      borderRadius="2xl"
      mb={{base: '0', lg: '16'}}
      position="relative"
      overflow={{base: 'hidden', lg: 'visible'}}
      px={{base: 5, lg: 0}}
      zIndex={0}>
      <Field.Text
        mt={{base: '20 !important', md: '0'}}
        mb="8"
        as={Heading}
        fontSize={{base: '4xl', lg: '5xl'}}
        lineHeight={1}
        fontWeight="bold"
        textAlign="left"
        name="ContentSectionHeadingServices"
        defaultValue={intl.formatMessage({
          id: 'ServicesHeading',
          defaultMessage:
            "Wir verwirklichen in Wochen,<br/> <span style='color:var(--chakra-colors-brand-500)'>nicht Monaten.</span>"
        })}
      />
      <Grid templateColumns={{base: '1fr', lg: '1fr 1fr'}} gap={10}>
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
            boxShadow="sm">
            <Box h="200px" w="full" borderRadius="md" overflow="hidden">
              <Field.Image
                name="ServicesCardDevelopmentImage"
                defaultValue="/images/services/mockup-arneitz.jpg"
                alt={intl.formatMessage({
                  id: 'ServicesCardDevelopmentImageAlt',
                  defaultMessage: 'Entwicklung'
                })}
                objectFit="cover"
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
  )
}

export default Services

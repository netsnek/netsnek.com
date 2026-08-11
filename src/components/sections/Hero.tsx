import {
  AspectRatio,
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Text,
  VStack,
  Image,
  Container
} from '@chakra-ui/react';
import { FC } from 'react';
import { useIntl } from 'react-intl';

import { Field, useAuth } from 'jaen';
import useNavOffset from '../../hooks/use-nav-offset';
import { Link } from 'gatsby-plugin-jaen';
import { useLocalizeHref } from '../../contexts/locale';
import { withAccentDotsHtml } from '../../utils/accent-dots';

// import {useContactModal} from '../services/contact'
import HeroShowcase from '../hero/HeroShowcase';
import useScrollPosition from '../../hooks/use-scroll-position';
import { FadeIn } from '../FadeIn';
import { useContactModal } from '../../services/contact';

interface ScrollArrowsProps {
  isVisible: boolean;
}

const ScrollArrows: React.FC<ScrollArrowsProps> = ({ isVisible }) => {
  return (
    <Box
      alignSelf="flex-end"
      h="100px"
      opacity={isVisible ? '1' : '0'}
      transition={'opacity 0.5s ease-in-out'}
      position="relative"
    >
      {Array.from({ length: 3 }, (_, index) => (
        <Box
          key={index}
          position="absolute"
          left="50%"
          top={`${index * 16}px`}
          w="24px"
          h="24px"
          animation={`scrollarrows 2s infinite ${index * 0.15}s`} // Add animationDelay here
          opacity="0"
          borderRadius={'sm'}
          // borderLeft='2px solid'
          // borderBottom='2px solid'
          // borderColor='brand.500' // Use color from theme
          boxShadow="-2px 2px 2px rgba(0, 0, 0, 0.1)"
          transform="translateX(-50%) rotate(-45deg)"
        />
      ))}
    </Box>
  );
};

const Hero: FC = () => {
  const navOffset = useNavOffset();
  const intl = useIntl();
  const localizeHref = useLocalizeHref();

  const isAuthenticated = useAuth().user !== null;

  //const {ref, scrollTop} = useScrollSync(500)
  const scrollPos = useScrollPosition();

  const contactModal = useContactModal();

  const onContactClick = () => {
    contactModal.onOpen({
      meta: {}
    });
  };

  return (
    <Box as="header">
      <Grid
        maxW="6xl"
        h={{ base: 'max-content', md: `calc(100vh - ${navOffset} - 200px)` }}
        minH="700px"
        position="relative"
        templateAreas={{
          base: `"image" "content" "customer"`,
          md: `"content image" "customer customer"`
        }}
        gridTemplateColumns={{ md: '1fr 1fr' }}
        gridTemplateRows={{ base: 'auto 1fr auto', md: '1fr auto' }}
        gap={{ base: 8, md: 16 }}
        id="hero"
        overflow="hidden"
        //p={{ base: 5, lg: 0 }}
        pt={`calc(${navOffset})`}
        asChild
      >
        <Container>
          <Box position="relative" gridArea="image" asChild>
            <FadeIn>
              {/* Tablet and mark are one editable drawing now, and the styles
                  the hero used to hand down are rules inside it. */}
              <HeroShowcase />
            </FadeIn>
          </Box>
          <VStack gap={4} align="left" gridArea="content" asChild>
            <FadeIn>
              <Box>
                {/* asAs, because a field guesses h2 for anything wrapped in a
                    Heading and this line sits above the headline, not on it. */}
                <Field.Text
                  as={Heading}
                  asAs="h3"
                  size={{ base: 'sm', lg: 'md' }}
                  style={{ animationDelay: '300ms' }}
                  fontWeight="500"
                  textTransform="uppercase"
                  lineHeight="1.5em"
                  letterSpacing="4.2px"
                  name="HeroEyebrow"
                  defaultValue={withAccentDotsHtml(
                    intl.formatMessage({
                      id: 'HeroTitle',
                      defaultMessage: 'INNOVATIV. EFFEKTIV.'
                    })
                  )}
                />
              </Box>
              <Box>
                <Field.Text
                  as={Heading}
                  asAs="h2"
                  size={{ base: 'xl', lg: '2xl' }}
                  fontWeight="900"
                  lineHeight="1.1em"
                  name="HeroHeading"
                  defaultValue={withAccentDotsHtml(
                    intl.formatMessage({
                      id: 'HeroSubtitle',
                      defaultMessage: 'Professionelle Softwareentwicklung.'
                    })
                  )}
                />
              </Box>
              <Field.Text
                as={Text}
                fontSize="lg"
                opacity={0.5}
                name="HeroLeadText"
                defaultValue={intl.formatMessage({
                  id: 'HeroText',
                  defaultMessage:
                    'Ihre Softwareagentur in Österreich. Wir verhelfen Ihnen zu maßgeschneiderten Softwarelösungen.'
                })}
              />
              <HStack gap={4} mt={4}>
                <Button
                  variant="solid"
                  borderRadius="xl"
                  filter="drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))"
                  onClick={onContactClick}
                >
                  {/* A button may only hold phrasing content, so the label
                      renders as a span instead of the paragraph a text field
                      defaults to. */}
                  <Field.Text
                    as={Text}
                    asAs="span"
                    name="HeroButtonContact"
                    defaultValue={intl.formatMessage({
                      id: 'HeroButtonContact',
                      defaultMessage: 'Kontakt'
                    })}
                  />
                </Button>
                <Button
                  variant="outline"
                  bg={'white'}
                  borderRadius="xl"
                  filter="drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))"
                  onClick={() => (window.location.href = localizeHref('/docs'))}
                  borderColor={'brand.500'}
                  color={'brand.500'}
                  borderWidth={2}
                  _hover={{ borderColor: 'brand.400', color: 'brand.400' }}
                >
                  <Field.Text
                    as={Text}
                    asAs="span"
                    name="HeroButtonProjects"
                    defaultValue={intl.formatMessage({
                      id: 'HeroButtonProjects',
                      defaultMessage: 'Projekte ansehen'
                    })}
                  />
                </Button>
              </HStack>
            </FadeIn>
          </VStack>
          <Box gridArea="customer">
            {/* <Text>Customer Testimonials or Data</Text> */}
            <ScrollArrows isVisible={scrollPos < 100} />
            {/* Any additional content for the customer area goes here */}
          </Box>
        </Container>
      </Grid>
    </Box>
  );
};

export default Hero;

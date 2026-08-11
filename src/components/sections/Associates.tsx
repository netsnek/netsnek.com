import {
  Link,
  LinkProps,
  Image,
  Heading,
  LinkBox,
  LinkOverlay,
  GridItem,
  Grid,
  AspectRatio
} from '@chakra-ui/react';
import { Field } from 'jaen';
import { useIntl } from 'react-intl';

import { useLocalizeHref } from '../../contexts/locale';
import { splitAccentDot } from '../../utils/accent-dots';

const Associates = () => {
  const intl = useIntl();
  const localizeHref = useLocalizeHref();

  // The heading is rich text now, so the accent dot has to be markup instead
  // of the element withAccentDots builds around a plain string. The
  // terminator is taken from the translated sentence rather than written out
  // here, because Japanese closes on 。 and not on a period.
  const [headingText, headingDot] = splitAccentDot(
    intl.formatMessage({
      id: 'AssociatesHeading',
      defaultMessage: 'Wir entwickeln für Sie in Österreich.'
    })
  );

  const headingValue = headingDot
    ? `${headingText}<span style='color:var(--chakra-colors-brand-500)'>${headingDot}</span>`
    : headingText;

  // Sample list of your links and icons, assuming you will replace these with your actual data
  const associates = [
    {
      href: 'https://cronit.io/',
      name: 'cronit',
      logo: '/images/associates/cronit.svg'
    },
    // {
    //   href: 'https://kanbon.at/',
    //   name: 'Kanbon',
    //   logo: '/images/clients/kanbon.svg'
    // },
    {
      href: 'https://pra.st/',
      name: 'Kanbon',
      logo: '/images/associates/simon_prast.jpg'
    },
    {
      href: 'https://fhkit.at/',
      name: 'Florian Herbert Kleber IT',
      logo: '/images/associates/fhkit.svg'
    },
    {
      href: 'https://neurons.at/',
      name: 'Neurons',
      logo: '/images/associates/neurons.svg'
    },
    {
      href: 'https://github.com/XenoVerve',
      name: 'XenoVerve',
      logo: '/images/associates/xenoverve.png'
    },
    {
      href: 'https://firmen.wko.at/christian-aichner/k%C3%A4rnten/?firmaid=c904523d-dce4-4b26-90bf-aff015ce4f73',
      name: 'Werbeagentur Christian Aichner',
      logo: '/images/associates/aichner.svg'
    }
  ];

  return (
    <Grid
      as="section"
      position="relative"
      borderRadius="2xl"
      bgColor="#0A0A0A"
      borderTop="1px solid"
      borderColor="brand.500"
      templateColumns={{
        base: 'repeat(2, 1fr)',
        sm: 'repeat(3, 1fr)',
        md: 'repeat(6, 1fr)'
      }}
      gap={{ base: 4, sm: 8 }}
      mt={{ base: '24', sm: '32', lg: '40' }}
      p="16"
      w="full"
      maxW="full"
      color="white"
      alignItems={'center'}
    >
      <GridItem
        mb={4}
        pos="relative"
        display="flex"
        colSpan={{ base: 2, sm: 3, md: 6 }}
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {/* <ImportantArrow pos="absolute" top="-150%" right="-10%" h="300%" /> */}
        <LinkBox
          w={{ base: '70%', sm: '50%', md: '25%' }}
          h="auto"
          bg="white"
          p={2}
          borderRadius="2xl"
          overflow="hidden"
          transition="bg 0.2s"
          _hover={{ bg: 'brand.500' }}
        >
          <LinkOverlay
            href={'https://www.wko.at/oe/aussenwirtschaft'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AspectRatio ratio={4 / 3}>
              {/* Field.Image only forwards the props of its own image
                  contract, so the size travels through autoScale, which fills
                  the box the same way w="full" h="full" did. The contain fit
                  no longer needs !important either: the picture sits one box
                  below AspectRatio now, and the cover rule of AspectRatio
                  reaches direct children only. */}
              <Field.Image
                name="AssociatesAustriaImage"
                defaultValue="/images/austria-a-aussenwirtschaft-austria.png"
                alt={intl.formatMessage({
                  id: 'AssociatesAustriaImageAlt',
                  defaultMessage: 'Austria'
                })}
                objectFit="contain"
              />
            </AspectRatio>
          </LinkOverlay>
        </LinkBox>
        {/* Software in Österreich */}
        {/* Softwareentwicklung in Österreich */}
        {/* Österreichische Qualitätssoftware */}
        {/* Softwareentwicklung in Österreich */}
        <Field.Text
          as={Heading}
          size="xl"
          mt={4}
          textAlign="center"
          fontWeight="500"
          name="AssociatesHeading"
          defaultValue={headingValue}
        />
      </GridItem>
      {associates.map((associate, index) => (
        <LinkBox
          key={index}
          w="auto"
          h="auto"
          bg="white"
          p={2}
          borderRadius="2xl"
          overflow="hidden"
          transition="bg 0.2s"
          _hover={{ bg: 'brand.500' }}
        >
          <LinkOverlay
            href={associate.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AspectRatio ratio={4 / 3}>
              {/* Assuming you have a way to dynamically select your icon component */}
              <Image
                src={associate.logo}
                alt={associate.name}
                w="full"
                h="full"
                css={{
                  objectFit: 'contain !important'
                }}
              />
            </AspectRatio>
          </LinkOverlay>
        </LinkBox>
      ))}
      {/* Den Wrapper um den Link mit GridItem oder einer ähnlichen Komponente und setze colSpan auf 3 */}
      <GridItem
        display="flex"
        colSpan={{ base: 2, sm: 3, md: 6 }}
        justifyContent="center"
      >
        {/* There is no /projects page, the invitation to browse leads to the
            docs. The href has to run through localizeHref, otherwise a
            visitor on /en/ lands back on the German page. */}
        <Link
          href={localizeHref('/docs')}
          // `hover-theme` is one of the site's own link variants and resolves
          // at runtime; the props type only lists Chakra's built-in names
          // until the recipe types are generated, hence the cast.
          variant={'hover-theme' as LinkProps['variant']}
          //textDecor={"underline"}
          opacity={0.7}
          textAlign="center"
        >
          {/* <Field.Text
                name="FooterLinkAllCustomers"
                defaultValue="Sie sind in guter Gesellschaft"
                fontSize="xl"
                //fontWeight="500"
              /> */}
          <Field.Text
            name="FooterLinkAllCustomers"
            // defaultValue="Werden Sie Teil unseres Netzwerks"
            // I need something that makes clear that these are not customers but partners
            // And that they are Austrian
            defaultValue={intl.formatMessage({
              id: 'AssociatesNetworkLink',
              defaultMessage: 'Experten aus unserem Netzwerk'
            })}
            fontSize="xl"
            //fontWeight="500"
          />
        </Link>
      </GridItem>
    </Grid>
  );
};

export default Associates;

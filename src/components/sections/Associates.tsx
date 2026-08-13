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
import { StaticImage } from 'gatsby-plugin-image';
import { Field } from 'jaen';
import { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import { useLocalizeHref } from '../../contexts/locale';
import { splitAccentDot } from '../../utils/accent-dots';

/**
 * What the Aussenwirtschaft-Austria picture actually occupies, derived from
 * the containers rather than from the eye.
 *
 * index.tsx wraps this section in `<Container maxW="5xl">`, whose recipe pads
 * `4` (16px) a side, so its content box is `min(100vw, 1024px) - 32px`. The
 * grid below pads `16` (64px a side), leaving `min(100vw, 1024px) - 160px`.
 * The GridItem holding the picture spans every column, so the LinkBox gets
 * 70 / 50 / 25 percent of that at base / sm (480px) / md (768px), and the
 * LinkBox itself pads `2` (8px a side). That gives a picture box of
 *
 *   base        0.70 * (100vw - 160) - 16  =  70vw - 128px
 *   sm  >=480px 0.50 * (100vw - 160) - 16  =  50vw -  96px
 *   md  >=768px 0.25 * (100vw - 160) - 16  =  25vw -  56px
 *   >=1024px    the container stops growing:   200px
 *
 * 200px wide, and 130px tall once the 1922x1250 source is contained in the
 * 4/3 box. Without this prop the field inherits the `sizes="100vw"` that
 * jaen's page fragment declares, because it asks for
 * `gatsbyImageData(layout: FULL_WIDTH)`, and a desktop browser then picks the
 * widest candidate there is for a 200px box.
 *
 * Be clear about what this does and does not buy. FULL_WIDTH's breakpoints are
 * 750, 1080, 1366 and 1920 capped at the source width, so the smallest
 * candidate is 750w. This moves a 1x desktop off the 1366w AVIF (15 759 B)
 * and onto the 750w one (9 325 B). A 2x screen wants 400 device pixels here,
 * so even the 750w candidate stays oversized. Closing that last part needs a
 * candidate below 750w, which only jaen's fragment or gatsby-plugin-sharp's
 * `defaults.breakpoints` can supply.
 */
const AUSTRIA_IMAGE_SIZES =
  '(min-width: 1024px) 200px, (min-width: 768px) calc(25vw - 56px), (min-width: 480px) calc(50vw - 96px), calc(70vw - 128px)';

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

  /**
   * The partner logos. `logo` is the finished element, not a path.
   *
   * None of these is a jaen field: the list is hard coded here, there is no
   * media id behind any entry, so the media library route AGENTS.md describes
   * cannot reach them. The two raster logos are `StaticImage` instead, which
   * processes a file that no `Field.Image` owns into AVIF, WebP, a srcset and
   * a box that is reserved before the picture arrives. gatsby-plugin-image is
   * already registered through gatsby-plugin-jaen's theme config, so no plugin
   * change is involved.
   *
   * The vector logos stay a plain `<Image>` — sharp does not touch an SVG, and
   * they were not among the files PageSpeed flagged. Their `contain` fit still
   * needs `!important` because they are direct children of `AspectRatio`,
   * whose `& > img` rule sets `cover`. A `StaticImage` sits one box lower and
   * is not reached by that rule, so `objectFit` as a prop is enough there.
   *
   * How the `sizes` below were derived, from the containers rather than by
   * eye. index.tsx wraps this in `<Container maxW="5xl">`, whose recipe pads
   * `4` (16px) a side, so the content box is `min(100vw, 1024px) - 32px`. The
   * grid here pads `16` (64px a side) and has a gap of `4` (16px) at base and
   * `8` (32px) from sm up, over 2 / 3 / 6 columns at base / sm (480px) /
   * md (768px). Each tile pads `2` (8px a side). That gives a logo box of
   *
   *   base        (100vw - 32 - 128 -  16) / 2 - 16  =  50vw    - 104px
   *   sm  ≥480px  (100vw - 32 - 128 -  64) / 3 - 16  =  33.3vw  -  91px
   *   md  ≥768px  (100vw - 32 - 128 - 160) / 6 - 16  =  16.7vw  -  69px
   *   ≥1024px     the container stops growing:                    102px
   *
   * so the widest a logo ever gets is ~165px, just under md. A `width` of 200
   * puts the constrained density steps at 50w / 100w / 200w / 400w, which
   * covers that up to a 2x screen.
   *
   * Quality is left at the site default, as everywhere else. Whether AVIF at
   * that setting keeps a wordmark of this size crisp has not been measured; if
   * the lettering looks soft, `quality={80}` is the knob.
   */
  const associates: Array<{href: string; name: string; logo: ReactNode}> = [
    {
      href: 'https://cronit.io/',
      name: 'cronit',
      logo: (
        <Image
          src="/images/associates/cronit.svg"
          alt="cronit"
          w="full"
          h="full"
          css={{ objectFit: 'contain !important' }}
        />
      )
    },
    // {
    //   href: 'https://kanbon.at/',
    //   name: 'Kanbon',
    //   logo: '/images/clients/kanbon.svg'
    // },
    {
      href: 'https://pra.st/',
      name: 'Kanbon',
      // The path is relative to this file and resolves to the same file under
      // `static/`. StaticImage runs path.resolve against the source directory,
      // so the file does not have to move into `src/`. The static copy stays
      // where it is; nothing else points at it.
      logo: (
        <StaticImage
          src="../../../static/images/associates/simon_prast.jpg"
          alt="Kanbon"
          layout="constrained"
          width={200}
          sizes="(min-width: 1024px) 102px, (min-width: 768px) calc(16.7vw - 69px), (min-width: 480px) calc(33.3vw - 91px), calc(50vw - 104px)"
          formats={['auto', 'webp', 'avif']}
          placeholder="none"
          objectFit="contain"
        />
      )
    },
    {
      href: 'https://fhkit.at/',
      name: 'Florian Herbert Kleber IT',
      logo: (
        <Image
          src="/images/associates/fhkit.svg"
          alt="Florian Herbert Kleber IT"
          w="full"
          h="full"
          css={{ objectFit: 'contain !important' }}
        />
      )
    },
    {
      href: 'https://neurons.at/',
      name: 'Neurons',
      logo: (
        <Image
          src="/images/associates/neurons.svg"
          alt="Neurons"
          w="full"
          h="full"
          css={{ objectFit: 'contain !important' }}
        />
      )
    },
    {
      href: 'https://github.com/XenoVerve',
      name: 'XenoVerve',
      // The source file is only 100x100, so the density steps stop at 100w and
      // the whole 13.2 KiB PageSpeed wants back here comes from the format,
      // not from the resolution. It is already under-resolved on a 2x screen;
      // that needs a larger original, not a code change.
      logo: (
        <StaticImage
          src="../../../static/images/associates/xenoverve.png"
          alt="XenoVerve"
          layout="constrained"
          width={200}
          sizes="(min-width: 1024px) 102px, (min-width: 768px) calc(16.7vw - 69px), (min-width: 480px) calc(33.3vw - 91px), calc(50vw - 104px)"
          formats={['auto', 'webp', 'avif']}
          placeholder="none"
          objectFit="contain"
        />
      )
    },
    {
      href: 'https://firmen.wko.at/christian-aichner/k%C3%A4rnten/?firmaid=c904523d-dce4-4b26-90bf-aff015ce4f73',
      name: 'Werbeagentur Christian Aichner',
      logo: (
        <Image
          src="/images/associates/aichner.svg"
          alt="Werbeagentur Christian Aichner"
          w="full"
          h="full"
          css={{ objectFit: 'contain !important' }}
        />
      )
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
                sizes={AUSTRIA_IMAGE_SIZES}
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
            <AspectRatio ratio={4 / 3}>{associate.logo}</AspectRatio>
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

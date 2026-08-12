import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  LinkBox,
  LinkOverlay,
  Text
} from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import { Field, PageMetadataImage } from 'jaen';
import { FC } from 'react';
import { useIntl } from 'react-intl';

import { useLocalizeHref } from '../../contexts/locale';
import { DocsSection, useDocsSections } from '../../hooks/use-docs-pages';

/**
 * One docs section as a card. Without a preview image the card falls back
 * to a brand-colored plate carrying the initial of the section, so a
 * section the CMS has no image for still fills its slot in the grid.
 */
const BlogCard: FC<{ section: DocsSection }> = ({ section }) => {
  const intl = useIntl();

  return (
    <LinkBox
      as="article"
      h="full"
      bg="white"
      borderRadius="xl"
      border="1px"
      borderColor="#f9f9f9"
      boxShadow="sm"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      transition="transform 0.2s, box-shadow 0.2s, border-color 0.2s"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'md',
        borderColor: 'brand.500'
      }}
    >
      <AspectRatio ratio={16 / 9}>
        {section.image ? (
          // Both metadata shapes render through one component. A section
          // whose CMS page carries a media id gets a GatsbyImage with AVIF
          // and WebP sources and a srcset; one that still carries only an
          // address gets the same plain <img> as before. On this grid both
          // happen at once: the six cards are backed by five media library
          // images, while /docs still lists sections that never got one.
          //
          // The srcset is worth nothing without a truthful `sizes`. The grid
          // is 3 columns from lg, 2 from sm, 1 below, inside a maxW="5xl"
          // container, so a card is about 320px wide on a desktop and the
          // fragment's CONSTRAINED default of "(min-width: 800px) 800px"
          // would have the browser fetch more than twice the pixels it needs.
          <PageMetadataImage
            metadata={section.image}
            alt={section.title}
            objectFit="cover"
            style={{ height: '100%', width: '100%' }}
            sizes="(min-width: 1024px) 320px, (min-width: 480px) 50vw, 100vw"
          />
        ) : (
          // Direction on bgGradient, stops on gradientFrom/To. v2's
          // `linear(...)` string is still assignable and still silently
          // unparseable, which left this placeholder tile flat white.
          <Box bgGradient="to-br" gradientFrom="brand.400" gradientTo="brand.600">
            <Text
              fontSize="4xl"
              fontWeight="bold"
              color="white"
              textTransform="uppercase"
              aria-hidden="true"
            >
              {section.title.charAt(0)}
            </Text>
          </Box>
        )}
      </AspectRatio>

      <Flex direction="column" flex="1" p={6}>
        {/* size, not fontSize: see `siteHeadingSizes` in styles/theme/recipes.
            These six card titles were the loudest instance of the bug, 36px
            where v2 had 20. */}
        <Heading as="h3" size="card" fontWeight="bold">
          <LinkOverlay asChild>
            <GatsbyLink to={section.href}>{section.title}</GatsbyLink>
          </LinkOverlay>
        </Heading>

        {section.description && (
          <Text mt="2" fontSize="md" color="gray.500" lineClamp={3}>
            {section.description}
          </Text>
        )}

        {/* The cards come from the docs tree, not from a Jaen section, so
            every card carries the same field name on purpose. The owner
            edits the wording once and it applies to the whole grid. */}
        <Field.Text
          mt="auto"
          pt="4"
          as={Text}
          fontSize="sm"
          fontWeight="semibold"
          color="brand.500"
          name="BlogReadMore"
          defaultValue={intl.formatMessage({
            id: 'BlogReadMore',
            defaultMessage: 'Weiterlesen'
          })}
        />
      </Flex>
    </LinkBox>
  );
};

export interface BlogProps {
  /** Maximum number of sections on the grid (the rest live on /docs). */
  limit?: number;
}

/**
 * The docs sections as a card grid on the homepage. Everything is read from
 * the docs tree of the current locale, so `/en/` lists the English sections
 * and links into `/en/docs/`. Nothing renders when the locale has no docs
 * sections at all.
 */
const Blog: FC<BlogProps> = ({ limit = 6 }) => {
  const intl = useIntl();
  const localizeHref = useLocalizeHref();

  const sections = useDocsSections({ limit });

  if (sections.length === 0) return null;

  return (
    <Box as="section" id="blog" mt={{ base: '24', sm: '32', lg: '40' }}>
      <Field.Text
        mb="4"
        as={Heading}
        // See `siteHeadingSizes` in styles/theme/recipes.
        size="section"
        fontWeight="bold"
        textAlign="left"
        name="SectionHeadingBlog"
        defaultValue={intl.formatMessage({
          id: 'BlogHeading',
          defaultMessage:
            "Geschichten aus unseren Projekten<span style='color:var(--chakra-colors-brand-500)'>.</span>"
        })}
      />

      <Grid
        templateColumns={{
          base: '1fr',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)'
        }}
        gap={{ base: 6, lg: 8 }}
      >
        {sections.map(section => (
          <BlogCard key={section.id} section={section} />
        ))}
      </Grid>

      {/* Der Weg zu allen Themen gehoert unter die Karten, nicht ueber sie:
          erst sieht man, worum es geht, dann kann man weiterlesen. */}
      <Flex justify="center" mt="10">
        <Button
          variant="solid"
          filter="drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))"
          asChild
        >
          <GatsbyLink to={localizeHref('/docs')}>
            {/* The label carries no styling of its own so it keeps inheriting
                the typography of the button around it. */}
            <Field.Text
              name="BlogAllLink"
              defaultValue={intl.formatMessage({
                id: 'BlogAllLink',
                defaultMessage: 'Alle Themen ansehen'
              })}
            />
          </GatsbyLink>
        </Button>
      </Flex>
    </Box>
  );
};

export default Blog;

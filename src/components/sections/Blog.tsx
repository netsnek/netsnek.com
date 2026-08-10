import {
  AspectRatio,
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  LinkBox,
  LinkOverlay,
  Text
} from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import { Field } from 'jaen';
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
          <Image src={section.image} alt={section.title} />
        ) : (
          <Box bgGradient="linear(to-br, brand.400, brand.600)">
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
        <Heading as="h3" fontSize="xl" fontWeight="bold">
          <LinkOverlay as={GatsbyLink} to={section.href}>
            {section.title}
          </LinkOverlay>
        </Heading>

        {section.description && (
          <Text mt="2" fontSize="md" color="gray.500" noOfLines={3}>
            {section.description}
          </Text>
        )}

        <Text
          mt="auto"
          pt="4"
          fontSize="sm"
          fontWeight="semibold"
          color="brand.500"
        >
          {intl.formatMessage({
            id: 'BlogReadMore',
            defaultMessage: 'Weiterlesen'
          })}
        </Text>
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
        fontSize={{ base: '4xl', lg: '5xl' }}
        lineHeight={1}
        fontWeight="bold"
        textAlign="left"
        name="SectionHeadingBlog"
        defaultValue={intl.formatMessage({
          id: 'BlogHeading',
          defaultMessage:
            "Geschichten aus unseren Projekten<span style='color:var(--chakra-colors-brand-500)'>.</span>"
        })}
      />

      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'start', md: 'baseline' }}
        justify="space-between"
        gap="2"
        mb="8"
      >
        <Text fontSize="md" color="gray.500" maxW="2xl">
          {intl.formatMessage({
            id: 'BlogIntro',
            defaultMessage:
              'Was wir gebaut haben, wie es funktioniert und was wir dabei gelernt haben.'
          })}
        </Text>

        <Link
          as={GatsbyLink}
          to={localizeHref('/docs')}
          fontSize="md"
          fontWeight="semibold"
          color="brand.500"
          whiteSpace="nowrap"
        >
          {intl.formatMessage({
            id: 'BlogAllLink',
            defaultMessage: 'Alle Themen ansehen'
          })}
        </Link>
      </Flex>

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
    </Box>
  );
};

export default Blog;

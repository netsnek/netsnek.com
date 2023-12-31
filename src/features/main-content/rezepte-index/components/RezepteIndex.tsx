import { JaenPage, useJaenPageIndex } from '@atsnek/jaen'
import {
  VStack,
  SimpleGrid,
  Box,
  Heading,
  Text,
  Button,
  LinkOverlay,
  LinkBox,
  useBreakpointValue,
  AspectRatio,
} from '@chakra-ui/react'
import React from 'react'
import JaenImage from '../../../../shared/components/JaenImage'
import MdxHeading from '../../heading/components/Heading'

const RezepteIndex: React.FC = () => {
  const index = useJaenPageIndex({
    jaenPageId: 'JaenPage /blog/rezepte/'
  })

  const indexArray = React.useMemo(() => {
    return index.childPages.reduce<{ [key: string]: Partial<JaenPage>[] }>((acc, child) => {
      const title = child.jaenPageMetadata?.title || 'Untitled'
      const firstLetter = title[0].toLowerCase()

      if (!acc[firstLetter]) {
        acc[firstLetter] = []
      }

      acc[firstLetter].push({
        ...child
      })

      // Sorting for stable ordering
      acc[firstLetter].sort((a, b) => (a.slug || '').localeCompare(b.slug || ''))

      return acc
    }, {})
  }, [index.childPages]);

  // Determines the number of columns based on the breakpoint
  const columns = useBreakpointValue({ base: 1, sm: 2, lg: 3 })

  return (
    <VStack spacing="4" align="stretch">
      {Object.entries(indexArray).map(([letter, pages]) => (
        <Box key={letter} width="100%">
          <MdxHeading variant="h3" id={`index-${letter}`} pb="3">
            {letter.toUpperCase()}
          </MdxHeading>
          <SimpleGrid columns={columns} spacing="4">
            {pages.map(page => (
              <LinkBox key={page.slug || 'missing-key'} borderWidth="1px" borderRadius="lg" overflow="hidden">
                <AspectRatio ratio={4 / 3}>
                  <JaenImage
                    name={page.slug ? page.slug : 'missing-slug'}
                    defaultValue={page.jaenPageMetadata?.image || 'default-image-url'}
                    alt={page.jaenPageMetadata?.description || 'Image'}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </AspectRatio>
                <Box p={5}>
                  <Heading as="h3" size="md" noOfLines={2}>
                    {page.jaenPageMetadata?.title || 'Untitled'}
                  </Heading>
                  <Text fontSize="sm" mt={1} noOfLines={3}>
                    {page.jaenPageMetadata?.description || 'No description'}
                  </Text>
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    {page.jaenPageMetadata?.blogPost?.date
                      ? new Date(page.jaenPageMetadata.blogPost.date).toLocaleDateString('de-DE', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          timeZone: 'UTC'
                        })
                      : null}
                  </Text>
                  <LinkOverlay href={`/blog/rezepte/${page.slug || 'none'}/`} isExternal={false}>
                    <Button size="sm" mt={2}>
                      Zum Artikel
                    </Button>
                  </LinkOverlay>
                </Box>
              </LinkBox>
            ))}
          </SimpleGrid>
        </Box>
      ))}
    </VStack>
  )
}

export default RezepteIndex
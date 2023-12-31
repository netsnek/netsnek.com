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

const ArtikelIndex: React.FC = () => {
  const index = useJaenPageIndex({
    jaenPageId: 'JaenPage /blog/artikel/'
  })

  const indexByYear = React.useMemo(() => {
    return index.childPages.reduce<{ [key: string]: Partial<JaenPage>[] }>((acc, child) => {
      const postDate = child.jaenPageMetadata?.blogPost?.date
      const year = postDate ? new Date(postDate).getFullYear().toString() : 'Unknown'

      if (!acc[year]) {
        acc[year] = []
      }

      acc[year].push({
        ...child
      })

      acc[year].sort((a, b) => {
        const dateA = a.jaenPageMetadata?.blogPost?.date ? new Date(a.jaenPageMetadata.blogPost.date).getTime() : 0
        const dateB = b.jaenPageMetadata?.blogPost?.date ? new Date(b.jaenPageMetadata.blogPost.date).getTime() : 0
        return dateB - dateA // Sort by timestamp descending
      })

      return acc
    }, {})
  }, [index.childPages])

  const sortedYears = Object.keys(indexByYear).sort((a, b) => parseInt(b) - parseInt(a))

  const columns = useBreakpointValue({ base: 1, sm: 2, lg: 3 })

  return (
    <VStack spacing="4" align="stretch">
      {sortedYears.map(year => (
        <Box key={year} width="100%">
          <MdxHeading variant="h3" id={`index-${year}`} pb="3">
            {year}
          </MdxHeading>
          <SimpleGrid columns={columns} spacing="4">
            {indexByYear[year].map(page => (
              <LinkBox key={page.slug || 'missing-key'} borderWidth="1px" borderRadius="lg" overflow="hidden">
                <AspectRatio ratio={4 / 3}>
                  <JaenImage
                    name={page.slug ? page.slug : 'missing-slug'}
                    defaultValue={page.jaenPageMetadata?.image || 'default-image-url'}
                    alt={page.jaenPageMetadata?.description || 'Image'}
                    style={{
                      objectFit: 'cover',
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
                          timeZone: 'UTC',
                        })
                      : null}
                  </Text>
                  <LinkOverlay href={`/blog/artikel/${page.slug || 'none'}/`} isExternal={false}>
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

export default ArtikelIndex
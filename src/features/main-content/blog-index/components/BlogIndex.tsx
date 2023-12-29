import {JaenPage, useJaenPageIndex} from '@atsnek/jaen'
import {
  HStack,
  Heading,
  Text,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Button,
  LinkOverlay,
  LinkBox
} from '@chakra-ui/react'
import ImageCard from '../../image-card/components/ImageCard'
import React from 'react'
import JaenImage from '../../../../shared/components/JaenImage'
import MdxHeading from '../../heading/components/Heading'

const BlogIndex: React.FC = () => {
  const index = useJaenPageIndex({
    jaenPageId: 'JaenPage /blog/'
  })

  // transform index.childPages into a multidimensional array with child.jaenPageMetadata?.title[0] as the key
  // the child.jaenPageMetadata?.title should be in an array that starts with the first letter of the title
  const indexArray: {[key: string]: Partial<JaenPage>[]} =
    index.childPages.reduce((acc, child) => {
      const firstLetter = (
        child.jaenPageMetadata?.title?.[0] || '0'
      ).toLowerCase()

      if (!acc.hasOwnProperty(firstLetter)) {
        acc[firstLetter] = []
      }
      acc[firstLetter].push({
        ...child
      })
      return acc
    }, {} as {[key: string]: Partial<JaenPage>[]})

  return (
    <VStack spacing="4">
      {Object.entries(indexArray).map(([letter, pages]) => (
        <LinkBox key={letter}>
          <Table>
            <Thead>
              <Tr>
                <Th w={'200px'}>
                  <MdxHeading variant="h3" id={`index-${letter}`}>
                    {letter}
                  </MdxHeading>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* <Tr>
              <Td colSpan={4}>Loading...</Td>
            </Tr> */}
              {pages.map(page => (
                <Tr key={page.slug} w={'100%'} borderRadius={'xl'}>
                  <Td>
                    <JaenImage
                      name={page.slug || 'none'}
                      defaultValue={page.jaenPageMetadata?.image || ''}
                      alt={page.jaenPageMetadata?.description || ''}
                      style={{
                        height: '100%',
                        //height: 'var(--chakra-sizes-xs)',
                        objectFit: 'cover',
                        borderRadius: 'var(--chakra-radii-xl)',
                        overflow: 'hidden'
                      }}
                    />
                  </Td>
                  <Td verticalAlign={'text-top'}>
                    <Heading as="h3" size="md">
                      {page.jaenPageMetadata?.title}
                    </Heading>
                    <Text>{page.jaenPageMetadata?.description}</Text>
                  </Td>
                  <Td textAlign={'end'}>
                    <Text>
                      {page.jaenPageMetadata?.blogPost?.date
                        ? new Date(
                            page.jaenPageMetadata.blogPost.date
                          ).toLocaleDateString('de-DE', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : null}
                    </Text>
                  </Td>
                  <Td textAlign={'end'} w="30px">
                    <LinkOverlay href={`/blog/${page.slug || 'none'}`}>
                      <Button>Zum Artikel</Button>
                    </LinkOverlay>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </LinkBox>
      ))}
    </VStack>
  )
}

export default BlogIndex

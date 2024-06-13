import {
  Link,
  Image,
  Heading,
  LinkBox,
  LinkOverlay,
  GridItem,
  Grid,
  AspectRatio,
  chakra
} from '@chakra-ui/react'
import {Field} from '@atsnek/jaen'

const Customer = () => {
  // Sample list of your links and icons, assuming you will replace these with your actual data

  return (
    <Grid
      as="section"
      templateColumns={{base: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)'}}
      gap={{base: 4, sm: 8}}
      mt={{ base: '24', sm: '32', lg: '40' }}
      p="16"
      w="full"
      maxW="full"
      color="white"
      alignItems={'center'}>
      <GridItem
        mb={4}
        pos="relative"
        display="flex"
        colSpan={{base: 2, sm: 3, md: 6}}
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}>
        {/* <ImportantArrow pos="absolute" top="-150%" right="-10%" h="300%" /> */}
        <Heading as="h2" size="xl" mt={4} textAlign="center" fontWeight="500">
          {/* Software in Österreich */}
          {/* Softwareentwicklung in Österreich */}
          {/* Österreichische Qualitätssoftware */}
          {/* Softwareentwicklung in Österreich */}
          Meine Kunden
          <chakra.span color="brand.500">.</chakra.span>
        </Heading>
      </GridItem>
      

      {/* Den Wrapper um den Link mit GridItem oder einer ähnlichen Komponente und setze colSpan auf 3 */}
    </Grid>
  )
}

export default Customer

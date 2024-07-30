import { JaenPage, useJaenPageIndex } from 'jaen'
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
  Grid,
  GridProps,
  StackProps,
  Link
} from '@chakra-ui/react'
import React, { FC } from 'react'
import { ProductCard } from './ProductCard'
import { IJaenProduct } from '../hooks/use-products'
//import JaenImage from '../../../../shared/components/JaenImage'
// import MdxHeading from '../../../../shared/components/MdxHeading'

// New Interface for abcProducts
interface IAbcProducts {
  [key: string]: IJaenProduct[];
}

interface IRecipeGridProps extends StackProps {
  featuredProducts: IJaenProduct[]
  abcProducts: IAbcProducts
}

const RecipeGrid: FC<IRecipeGridProps> = ({ featuredProducts, abcProducts, ...props }) => {

  console.log('!!!abcproducts!!!', abcProducts)
  console.log('!!!featuredproducts!!!', featuredProducts)
  // Determines the number of columns based on the breakpoint
  const columns = useBreakpointValue({ base: 1, sm: 2, lg: 3 })

  return (
    <VStack spacing="4" align="stretch" {...props}>
      <Heading as="h2" size="lg" noOfLines={2}>
        Neue Rezepte
      </Heading>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
        gap={6}
        mb={6}
      >
        {featuredProducts?.map((product, index) => {

          console.log('my full index', index)
          console.log('!!!product!!!', product)
          return (
            <ProductCard key={index} bcolor='#a0c1d9' product={product} />
          )
        })}
      </Grid>
      <Heading as="h2" size="lg" noOfLines={2}>
        Alle Rezepte - nach Buchstaben sortiert&nbsp;
      </Heading>
      <Heading as="h2" size="lg" noOfLines={2}>
        {Object.keys(abcProducts).map((letter) => (
          <>
            ·&nbsp;
            <Link
              onClick={() => {
                // if not on the homepage, redirect to the homepage first
                // if (path !== '/') {
                //   window.location.href = '/';
                // }
                //alert('clicked')
                const element = document.getElementById(letter);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {letter}
            </Link>
            {/* <Link href={`#${letter}`}>{letter}</Link>  */}
          </>
        ))}
      </Heading>
      {Object.entries(abcProducts).map(([letter, products]) => (
        <Box key={letter} width="100%">
          {/* <MdxHeading variant="h3" id={`index-${letter}`} pb="3">
            {letter.toUpperCase()}
          </MdxHeading> */}
          <Heading id={letter} as="h3" size="md" noOfLines={2}>
            {letter.toUpperCase()}
          </Heading>

          <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
            gap={6}
            my={6}
          >
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
              // <LinkBox key={product.title || 'missing-key'} borderWidth="1px" borderRadius="lg" overflow="hidden">
              //   {/* <AspectRatio ratio={4 / 3}>
              //     <JaenImage
              //       name={page.slug ? page.slug : 'missing-slug'}
              //       defaultValue={page.jaenPageMetadata?.image || 'default-image-url'}
              //       alt={page.jaenPageMetadata?.description || 'Image'}
              //       style={{
              //         objectFit: 'cover',
              //         width: '100%',
              //         height: '100%',
              //       }}
              //     />
              //   </AspectRatio> */}
              //   <Box p={5}>
              //     <Heading as="h3" size="md" noOfLines={2}>
              //       {product.title || 'Untitled'}
              //     </Heading>
              //     <Text fontSize="sm" mt={1} noOfLines={3}>
              //       {product.description || 'No description'}
              //     </Text>
              //     {/* <Text fontSize="xs" color="gray.500" mt={1}>
              //       {page.jaenPageMetadata?.blogPost?.date
              //         ? new Date(page.jaenPageMetadata.blogPost.date).toLocaleDateString('de-DE', {
              //             year: 'numeric',
              //             month: 'long',
              //             day: 'numeric',
              //             timeZone: 'UTC'
              //           })
              //         : null}
              //     </Text> */}
              //     <LinkOverlay href={`${product.handle || 'none'}/`} isExternal={false}>
              //       <Button size="sm" mt={2}>
              //         Zum Artikel
              //       </Button>
              //     </LinkOverlay>
              //   </Box>
              // </LinkBox>
            ))}
          </Grid>
        </Box>
      ))}
    </VStack>

  )
}

export default RecipeGrid
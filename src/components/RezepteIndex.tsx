import React, { FC, useState, useMemo } from 'react';
import {
  VStack,
  Box,
  Heading,
  Grid,
  StackProps,
  Button,
  Wrap,
  WrapItem,
  Link,
  Divider,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ProductCard } from './ProductCard';

interface IJaenProduct {
  handle: string;
  tags?: string[];
  title: string;
  description?: string;
  price?: string;
  createdAt: string;
  featuredMedia?: {
    image: {
      src: string;
      altText?: string | null;
    };
  };
  media: Array<{
    image: {
      src: string;
      altText?: string | null;
    };
  }>;
}

interface IAbcProducts {
  [key: string]: IJaenProduct[];
}

interface IRezepteIndexProps extends StackProps {
  featuredProducts: IJaenProduct[];
  abcProducts: IAbcProducts;
}

const RezepteIndex: FC<IRezepteIndexProps> = ({
  featuredProducts,
  abcProducts,
  ...props
}) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Combine all products into one array for filtering
  const allProducts = useMemo(
    () => Object.values(abcProducts).flat(),
    [abcProducts]
  );

  // Get unique tags from all products, excluding 'Gratis'
  const allTags = useMemo(() => {
    const tags = allProducts.flatMap((product) => product.tags || []);
    return Array.from(new Set(tags.filter((tag) => tag !== 'Gratis')));
  }, [allProducts]);

  // Filter products based on selected tag
  const filteredProducts = useMemo(() => {
    if (selectedTag) {
      return allProducts.filter((product) =>
        product.tags?.includes(selectedTag)
      );
    }
    return allProducts;
  }, [allProducts, selectedTag]);

  // Group filtered products alphabetically
  const groupedProducts = useMemo(() => {
    return filteredProducts.reduce<IAbcProducts>((acc, product) => {
      const firstLetter = product.title.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(product);
      return acc;
    }, {});
  }, [filteredProducts]);

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <VStack spacing={8} align="stretch" {...props}>
      {/* Header Section with Link to Blog */}
      {/* <Box textAlign="center" py={4}>
        <Heading as="h1" size="xl">
          Rezepte Übersicht
        </Heading>
        <Text mt={2}>
          Entdecke unsere vielfältigen Rezepte oder besuche unseren{' '}
          <Link href="/blog" color="blue.500">
            Blog
          </Link>{' '}
          für mehr Inspiration!
        </Text>
      </Box> */}

      {/* Tag Filter Buttons */}
      <Wrap spacing={2} justify="center" mb={4}>
        <WrapItem>
          <Button
            size="sm"
            variant={selectedTag === null ? 'solid' : 'outline'}
            onClick={() => setSelectedTag(null)}
          >
            Alle
          </Button>
        </WrapItem>
        {/* Add 'Neu' to the filter buttons */}
        {['Neu', ...allTags.filter((tag) => tag !== 'Neu')].map((tag) => (
          <WrapItem key={tag}>
            <Button
              size="sm"
              variant={selectedTag === tag ? 'solid' : 'outline'}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </Button>
          </WrapItem>
        ))}
      </Wrap>

      {/* Neue Rezepte (New Recipes) Section */}
      {!selectedTag && (
        <>
          <Heading as="h2" size="lg" mt={8}>
            Neue Rezepte
          </Heading>
          <Grid
            templateColumns={{
              sm: 'repeat(1, 1fr)', // Mobile devices: 1 column
              md: 'repeat(2, 1fr)', // Small screens: 2 columns
              lg: 'repeat(4, 1fr)', // Large screens: 4 columns
            }}
            gap={6}
            mb={6}
          >
              {featuredProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  bcolor="#a0c1d9"
                  product={product}
                  isMobile={isMobile}
                />
              ))}
          </Grid>
          <Divider />
        </>
      )}

      {/* Alphabetical Shortcuts */}
      <Heading as="h2" size="lg" mt={8}>
        Alle Rezepte - nach Buchstaben sortiert
      </Heading>
      <Wrap spacing={2} justify="center" mb={4}>
        {Object.keys(groupedProducts)
          .sort()
          .map((letter) => (
            <WrapItem key={letter}>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  const element = document.getElementById(`letter-${letter}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {letter}
              </Button>
            </WrapItem>
          ))}
      </Wrap>

      {/* Grouped Products by Alphabet */}
      {Object.entries(groupedProducts)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([letter, products]) => (
          <Box key={letter} width="100%">
            <Heading id={`letter-${letter}`} as="h3" size="md" mt={4} mb={2}>
              {letter.toUpperCase()}
            </Heading>

            <Grid
              templateColumns={{
                sm: 'repeat(1, 1fr)', // Mobile devices: 1 column
                md: 'repeat(2, 1fr)', // Small screens: 2 columns
                lg: 'repeat(4, 1fr)', // Large screens: 4 columns
              }}
              gap={6}
              my={6}
            >
              {products.map((product, index) => (
                <ProductCard bcolor="#a0c1d9" key={index} product={product} />
              ))}
            </Grid>
          </Box>
        ))}
    </VStack>
  );
};

export default RezepteIndex;

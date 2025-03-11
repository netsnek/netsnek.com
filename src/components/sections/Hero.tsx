import {
  AspectRatio,
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Text,
  VStack,
  Image,
  Container,
  chakra
} from '@chakra-ui/react';
import { FC } from 'react';

import { Field, useAuth } from 'jaen';
import useNavOffset from '../../hooks/use-nav-offset';
import { Link } from 'gatsby-plugin-jaen';

// import {useContactModal} from '../services/contact'
import Netsnek from '../../gatsby-plugin-jaen/components/Netsnek';
import useScrollPosition from '../../hooks/use-scroll-position';
import { FadeIn } from '../FadeIn';
import { useContactModal } from '../../services/contact';

interface ScrollArrowsProps {
  isVisible: boolean;
}

const ScrollArrows: React.FC<ScrollArrowsProps> = ({ isVisible }) => {
  return (
    <Box
      alignSelf="flex-end"
      h="100px"
      opacity={isVisible ? '1' : '0'}
      transition={'opacity 0.5s ease-in-out'}
      position="relative"
    >
      {Array.from({ length: 3 }, (_, index) => (
        <Box
          key={index}
          position="absolute"
          left="50%"
          top={`${index * 16}px`}
          w="24px"
          h="24px"
          animation={`scrollarrows 2s infinite ${index * 0.15}s`} // Add animationDelay here
          opacity="0"
          borderRadius={'sm'}
          // borderLeft='2px solid'
          // borderBottom='2px solid'
          // borderColor='brand.500' // Use color from theme
          boxShadow="-2px 2px 2px rgba(0, 0, 0, 0.1)"
          transform="translateX(-50%) rotate(-45deg)"
        />
      ))}
    </Box>
  );
};

const Hero: FC = () => {
  const navOffset = useNavOffset();

  const isAuthenticated = useAuth().user !== null;

  //const {ref, scrollTop} = useScrollSync(500)
  const scrollPos = useScrollPosition();

  const contactModal = useContactModal()

  const onContactClick = () => {
    contactModal.onOpen({
      meta: {}
    })
  };

  return (
    <Box as="header">
      <Grid
        as={Container}
        maxW="6xl"
        h={{ base: 'max-content', md: `calc(100vh - ${navOffset} - 200px)` }}
        minH="700px"
        position="relative"
        templateAreas={{
          base: `"image" "content" "customer"`,
          md: `"content image" "customer customer"`
        }}
        gridTemplateColumns={{ md: '1fr 1fr' }}
        gridTemplateRows={{ base: 'auto 1fr auto', md: '1fr auto' }}
        gap={{ base: 8, md: 16 }}
        id="hero"
        overflow="hidden"
        //p={{ base: 5, lg: 0 }}
        pt={`calc(${navOffset})`}
      >
        <Box as={FadeIn} position="relative" gridArea="image">
          <AspectRatio ratio={4 / 3} w="full" h="auto">
            <Box position="relative" w="full" h="full">
              <Image
                src="/images/iPad.png"
                alt="iPad image"
                objectFit="contain"
                position="absolute"
                top="0"
                right="0"
                bottom="0"
                left="0"
                w="full"
                h="full"
              />
              <Netsnek
                position="absolute"
                mt="7%"
                p="5%"
                w="full"
                h="full"
                sx={{
                  '.squarel': {
                    display: 'none'
                  },
                  '.snek': {
                    stroke: 'black',
                    filter: 'drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))'
                  },
                  '.arrows': {
                    display: 'none'
                  }
                }}
              />
            </Box>
          </AspectRatio>
        </Box>
        <VStack as={FadeIn} spacing={4} align="left" gridArea="content">
          <Box>
            <Heading
              as="h3"
              size={{ base: 'sm', lg: 'md' }}
              style={{ animationDelay: '300ms' }}
              fontWeight="500"
              textTransform="uppercase"
              lineHeight="1.5em"
              letterSpacing="4.2px"
            >
              INNOVATIV<chakra.span color="brand.500">.</chakra.span> EFFEKTIV
              <chakra.span color="brand.500">.</chakra.span>
            </Heading>
          </Box>
          <Box>
            <Heading
              as="h2"
              size={{ base: 'xl', lg: '2xl' }}
              fontWeight="900"
              lineHeight="1.1em"
            >
              Professionelle Softwareentwicklung
              <chakra.span color="brand.500">.</chakra.span>
            </Heading>
          </Box>
          <Text fontSize={'lg'} opacity={0.5}>
            Ihre Softwareagentur in Österreich. Wir verhelfen Ihnen zu
            maßgeschneiderten Softwarelösungen.
          </Text>
          <HStack spacing={4} mt={4}>
            <Button
              variant="solid"
              borderRadius={'lg'}
              filter="drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))"
              onClick={onContactClick}
            >
              Kontakt
            </Button>
            <Button
              variant="outline"
              bg={'white'}
              borderRadius={'lg'}
              filter="drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))"
              onClick={() => (window.location.href = '/docs')}
              borderColor={'brand.500'}
              color={'brand.500'}
              borderWidth={2}
              _hover={{ borderColor: 'brand.600', color: 'brand.600' }}
            >
              Projekte ansehen
            </Button>
          </HStack>
        </VStack>
        <Box gridArea="customer">
          {/* <Text>Customer Testimonials or Data</Text> */}
          <ScrollArrows isVisible={scrollPos < 100} />
          {/* Any additional content for the customer area goes here */}
        </Box>
      </Grid>
    </Box>
  );
};

export default Hero;

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
} from '@chakra-ui/react'
import {useContactModal} from '../services/contact'
import Netsnek from '../../gatsby-plugin-jaen/components/Netsnek'
import {useScrollSync} from '../hooks/useScrollSync'
import { FadeIn } from './FadeIn';

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
          borderRadius={"sm"}
          // borderLeft='2px solid'
          // borderBottom='2px solid'
          // borderColor='brand.500' // Use color from theme
          boxShadow='-2px 2px 2px rgba(0, 0, 0, 0.1)'
          transform='translateX(-50%) rotate(-45deg)'
        />
      ))}
    </Box>
  );
};

const HeroSection = () => {
  const contactModal = useContactModal()

  const {ref, scrollTop} = useScrollSync(500)

  const onContactClick = () => {
    contactModal.onOpen({
      meta: {}
    })
  }

  return (
    <Grid
      as={Container}
      maxW="6xl"
      minH={{base: 'auto', md: '85vh'}}
      position="relative"
      templateAreas={{
        base: `"image" "content" "customer"`,
        md: `"content image" "customer customer"`
      }}
      gridTemplateColumns={{md: '1fr 1fr'}}
      gridTemplateRows={{base: 'auto 1fr auto', md: '1fr auto'}}
      pt={16}
      gap={{base: 8, md: 16}}>
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
            size={{base: 'sm', lg: 'md'}}
            style={{animationDelay: '300ms'}}
            fontWeight="500"
            textTransform="uppercase"
            lineHeight="1.5em"
            letterSpacing="4.2px">
            STILVOLL<chakra.span color="brand.500">.</chakra.span> WIRKSAM<chakra.span color="brand.500">.</chakra.span>
          </Heading>
        </Box>
        <Box>
          <Heading
            as="h2"
            size={{base: 'xl', lg: '2xl'}}
            fontWeight="900"
            lineHeight="1.1em">
            Professionelle Softwareentwicklung<chakra.span color="brand.500">.</chakra.span>
          </Heading>
        </Box>
        <Text fontSize={'lg'} opacity={.5}>
          Ihr Entwickler in Österreich. 
          Wir verhelfen Ihnen zu einer professionellen Webpräsenz und individuellen Softwarelösungen.
        </Text>
        <HStack spacing={4} mt={4}>
          <Button
            variant="solid"
            borderRadius="full"
            filter="drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))"
            onClick={onContactClick}>
            Kontakt
          </Button>
          <Button
            variant="outline"
            bg={'white'}
            borderRadius="full"
            filter="drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))"
            onClick={() => (window.location.href = '/projekte')}
            borderColor={'brand.500'}
            color={'brand.500'}
            borderWidth={2}
            _hover={{borderColor: 'brand.600', color: 'brand.600'}}
            >
            Projekte ansehen
          </Button>
        </HStack>
      </VStack>
      <Box gridArea="customer">
        {/* <Text>Customer Testimonials or Data</Text> */}
        <ScrollArrows isVisible={scrollTop < 100} />
        {/* Any additional content for the customer area goes here */}
      </Box>
    </Grid>
  )
}

export default HeroSection

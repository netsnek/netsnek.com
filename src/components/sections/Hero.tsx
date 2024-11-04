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
  chakra,
  Stack,
  useBreakpointValue
} from '@chakra-ui/react';
import { FC, useEffect, useMemo, useRef, useState } from 'react';

import { Field, useAuth } from 'jaen';
import useNavOffset from '../../hooks/use-nav-offset';
import { Link } from 'gatsby-plugin-jaen';

// import {useContactModal} from '../services/contact'
import Netsnek from '../../gatsby-plugin-jaen/components/Netsnek';
import useScrollPosition from '../../hooks/use-scroll-position';
import { FadeIn } from '../FadeIn';
import { useContactModal } from '../../services/contact';
import { UncontrolledMdxField } from 'jaen-fields-mdx';
import SvgMdxEditor from '../mdx-editor/SvgMdxEditor';

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

  const ComponentFade = useBreakpointValue({ base: VStack, md: FadeIn });

  return (
    <Box as="header" backgroundColor='#dee9ec'>
      <Grid
        as={Container}
        maxW="6xl"
        // h={{ base: 'max-content', md: `calc(100vh - ${navOffset} - 200px)` }}
        // minH="700px"
        position="relative"
        templateAreas={{
          base: `"image" "content" "customer"`,
          md: `"content image" "customer customer"`
        }}
        gridTemplateColumns={{ md: '1fr 1fr' }}
        gridTemplateRows={{ base: 'auto 1fr auto', md: '1fr auto' }}
        pt={{ base: 8, md: 16 }}
        pb={{ base: '16', lg: '0' }}
        px={{ base: 8, md: 16 }}
        id="hero"
        overflow="hidden"
      //p={{ base: 5, lg: 0 }}
      // pt={`calc(${navOffset})`}
      >
        <Box
          // as={FadeIn}
          position="relative"
          gridArea="image"
        >
          <AspectRatio ratio={1 / 1.04} w="full" h="auto" maxH="700px">
            <Box position="relative" w="full" h="full">
              <Box
                defaultValue="/images/header-portrait-image.png"
                name="heroimage"
                as={Field.Image}
                alt="hero image"
                objectFit="cover"
                w="full"
                h="full"
                ml={{ base: 8, md: 16 }}
                sx={{
                  //borderRadius: 'md',
                  //filter: 'drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))'
                }}
              />
              {/* <Image
                src="images/header-portrait-image.png"
                alt="hero image"
                objectFit="cover"
                w="full"
                h="full"
                sx={{
                  //borderRadius: 'md',
                  //filter: 'drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))'
                }}
              /> */}
            </Box>
          </AspectRatio>
        </Box>
        <VStack
          as={ComponentFade}
          pt={`calc(${navOffset})`}
          spacing={4}
          align="left"
          alignItems="flex-start"
          //justify="flex-start"
          gridArea="content"
          pr={{ base: 8, md: 16 }}
        >
          <Heading
            as="h3"
            variant="cursive"
            size={{ base: 'sm', lg: 'md' }}
            style={{ animationDelay: '300ms' }}
            fontWeight="500"
            //textTransform="uppercase"
            lineHeight="1.5em"
            letterSpacing="4.2px"
          >
            Gesund<chakra.span color="brand.500">·</chakra.span>Einfach
            <chakra.span color="brand.500">·</chakra.span>Ehrlich
          </Heading>
          <Field.Text
            as={Heading}
            fontSize={{ base: '2xl', lg: '4xl' }}
            lineHeight={1}
            fontWeight="900"
            textAlign="left"
            name="HeroTitle"
            defaultValue="Dein <u>Leben</u>. <br/> Deine <u>Ernährung</u>. <br/> Perfekt abgestimmt."
          />
          <Field.Text
            as={Text}
            fontSize={'lg'}
            opacity={0.5}
            textAlign="left"
            name="HeroLead"
            defaultValue="Werde dir bewusst, wie deine Ernährung Körper und Geist beeinflusst – und erlerne die Kunst, dein Wohlbefinden gezielt zu steuern."
          />
          <HStack spacing={4} mt={4}>
            <Button
              variant="solid"
              filter="drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))"
              onClick={onContactClick}
            >
              Lernen wir uns kennen
            </Button>
            {/* <Button
              variant="outline"
              bg={'white'}
              filter="drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))"
              onClick={() => (window.location.href = '/docs')}
              borderWidth={2}
            >
              Projekte ansehen
            </Button> */}
          </HStack>
        </VStack>
        <Box gridArea="customer">
          {/* <Text>Customer Testimonials or Data</Text> */}
          {/* <ScrollArrows isVisible={scrollPos < 100} /> */}
          {/* Any additional content for the customer area goes here */}
        </Box>
      </Grid>
    </Box>
  );
};

export default Hero;

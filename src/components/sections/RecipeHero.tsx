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
  Stack
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
import { Interface } from 'readline';

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

interface RecipeHeroProps {
  defaultHeading: string;
  defaultLead: string;
}

const RecipeHero: FC<RecipeHeroProps> = ({ defaultHeading, defaultLead }) => {
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
        //gap={{ base: 8, md: 16 }}
        pt={{ base: 8, md: 16 }}
        //px={{ base: 8, md: 16 }}
        id="RecipeHero"
        overflow="hidden"
      //p={{ base: 5, lg: 0 }}
      // pt={`calc(${navOffset})`}
      >
        <Box as={FadeIn} position="relative" gridArea="image">
          {/* <AspectRatio ratio={1 / 1.04} w="full" h="auto" maxH="700px"> */}
          <Box position="relative" w="full" h="full">
            <Box
              defaultValue="/images/sweets-image-3.png"
              name="RecipeHeroimage"
              as={Field.Image}
              alt="RecipeHero image"
              objectFit="contain"
              w="full"
              h="full"
              //ml={{ base: 8, md: 16 }}
              sx={{
                //borderRadius: 'md',
                //filter: 'drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))'
              }}
            />
            {/* <Image
                src="images/header-portrait-image.png"
                alt="RecipeHero image"
                objectFit="cover"
                w="full"
                h="full"
                sx={{
                  //borderRadius: 'md',
                  //filter: 'drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))'
                }}
              /> */}
          </Box>
          {/* </AspectRatio> */}
        </Box>
        <VStack pt={`calc(${navOffset})`} as={FadeIn} spacing={4} align="left" gridArea="content" pr={{ base: 8, md: 16 }}>
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
          {/* <Field.Text
            as={Heading}
            fontSize={{ base: '2xl', lg: '4xl' }}
            lineHeight={1}
            fontWeight="900"
            textAlign="left"
            name="RecipeHeroTitle"
            defaultValue={defaultHeading} // "Mega Brain Food: Overnight Oats"
          />
          <Field.Text
            as={Text}
            fontSize={'lg'}
            opacity={0.5}
            textAlign="left"
            name="RecipeHeroLead"
            defaultValue={defaultLead} //"Werde dir bewusst, wie deine Ernährung Körper und Geist beeinflusst – und erlerne die Kunst, dein Wohlbefinden gezielt zu steuern."
          /> */}
          <Heading
            fontSize={{ base: '2xl', lg: '4xl' }}
            lineHeight={1}
            fontWeight="900"
            textAlign="left"
          >
            {defaultHeading}
          </Heading>
          <Text
            fontSize={'lg'}
            opacity={0.5}
            textAlign="left"
          >
            {defaultLead}
          </Text>
        </VStack>
        <Box gridArea="customer" p={16}>
          {/* <Text>Customer Testimonials or Data</Text> */}
          {/* <ScrollArrows isVisible={scrollPos < 100} /> */}
          {/* <Field.Text
            as={Heading}
            fontSize={{ base: '2xl', lg: '4xl' }}
            lineHeight={1}
            fontWeight="900"
            textAlign="center"
            name="RecipeLead2"
            defaultValue="Was gibts heute?"
          /> */}
          {/* Any additional content for the customer area goes here */}
        </Box>
      </Grid>
    </Box>
  );
};

export default RecipeHero;

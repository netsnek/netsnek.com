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
  ButtonGroup
} from '@chakra-ui/react';
import { FC, useEffect, useMemo, useRef, useState } from 'react';

import { checkUserRoles, Field, useAuth, useContentManagement, usePageContext } from 'jaen';
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
import { EditIcon, SettingsIcon } from '@chakra-ui/icons';

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
  defautlImage: string;
}

const RecipeHero: FC<RecipeHeroProps> = ({ defaultHeading, defaultLead, defautlImage }) => {
  const navOffset = useNavOffset();

  // const isAuthenticated = useAuth().user !== null;

  //const {ref, scrollTop} = useScrollSync(500)
  const scrollPos = useScrollPosition();

  const contactModal = useContactModal()

  const onContactClick = () => {
    contactModal.onOpen({
      meta: {}
    })
  };

  const { isAuthenticated, user, isLoading } = useAuth();
  const { isEditing, toggleIsEditing } = useContentManagement();
  const { jaenPage } = usePageContext();

  const canEdit = isAuthenticated && checkUserRoles(user, ['jaen:admin']);

  return (
    <Box as="header" backgroundColor='#dee9ec'>
            {canEdit && isLoading === false && (
        <ButtonGroup>
          <Button
            leftIcon={<EditIcon />}
            variant="outline"
            colorScheme={isEditing ? 'red' : undefined}
            onClick={() => toggleIsEditing()}
          >
            {isEditing ? 'Stop Editing' : 'Edit'}
          </Button>

          <Link
            leftIcon={<SettingsIcon />}
            variant="outline"
            as={Button}
            to={`/cms/pages/#${btoa(jaenPage.id)}`}
          >
            Page Settings
          </Link>
        </ButtonGroup>
      )}
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
        <Box
          // as={FadeIn}
          position="relative"
          gridArea="image"
        >
          {/* <AspectRatio ratio={1 / 1.04} w="full" h="auto" maxH="700px"> */}
          <Box position="relative" w="full" h="full">
            <VStack flex="1">
              <Grid placeItems="center" pos="relative">


                <AspectRatio
                  ratio={1}
                  pos="absolute"
                  boxShadow="dark"
                  overflow="hidden"
                  isolation="isolate"
                  w="75%"
                //borderRadius="full"
                >
                  <Field.Image name="RecipeHeroimage" defaultValue={defautlImage} isDisabled />
                  {/* <Image src={defautlImage} alt="RecipeHero image" objectFit="cover" w="full" h="full" /> */}
                </AspectRatio>
                <chakra.svg
                  zIndex={100}
                  pointerEvents="none"
                  w="30rem"
                  maxW="100%"
                  h="auto"
                  viewBox="0 0 809 678" // Adjusted for padding
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                  sx={{
                    '#Selection': {
                      fill: '#f6f8fa'
                    }
                  }}
                >
                  <path id="Auswahl #1"
                    fill="#dee9ec"
                    d="M -208.00,-158.00
           C -208.00,-158.00 1010.00,-158.00 1010.00,-158.00
             1010.00,-158.00 1010.00,798.00 1010.00,798.00
             1010.00,798.00 -208.00,798.00 -208.00,798.00
             -208.00,798.00 -208.00,-158.00 -208.00,-158.00 Z
           M 332.00,82.14
           C 326.61,83.06 326.37,82.99 321.00,83.00
             321.00,83.00 283.00,86.28 283.00,86.28
             227.50,93.59 167.95,109.50 132.23,156.00
             110.00,184.95 99.43,221.01 96.91,257.00
             96.91,257.00 96.00,267.00 96.00,267.00
             95.63,298.85 99.91,328.62 109.74,359.00
             137.10,443.50 207.72,513.22 291.00,542.69
             311.58,549.97 344.28,557.74 366.00,558.00
             366.00,558.00 383.00,559.00 383.00,559.00
             383.00,559.00 405.00,558.00 405.00,558.00
             417.22,557.98 438.63,554.81 451.00,552.58
             525.82,539.06 601.24,497.15 647.11,436.00
             663.86,413.67 675.29,391.81 685.60,366.00
             695.48,341.28 703.69,307.64 704.00,281.00
             704.00,281.00 704.99,269.00 704.99,269.00
             704.99,269.00 704.09,257.00 704.09,257.00
             701.58,220.30 693.91,189.86 669.56,161.00
             649.87,137.66 621.19,122.21 593.00,111.58
             548.88,94.93 500.80,88.13 454.00,84.91
             454.00,84.91 423.00,83.00 423.00,83.00
             423.00,83.00 407.00,82.14 407.00,82.14
             407.00,82.14 332.00,82.14 332.00,82.14 Z" />
                </chakra.svg>
              </Grid>
            </VStack>
            {/* <Box
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
            /> */}
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
        <VStack
          // as={FadeIn}
          pt={`calc(${navOffset})`}
          spacing={4}
          align="left"
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

import {
  Link,
  Box,
  Flex,
  Container,
  Heading,
  Text,
  chakra
} from '@chakra-ui/react';

import { StylizedImage } from '../StylizedImage';
import servicesSvg from '../../assets/images/services.svg';
import { Field } from 'jaen';
import { QASMPlayground } from '../main-content/qasm-playground/components/qasm-playground';
import { useIntl } from 'react-intl';

const Services = () => {
  const intl = useIntl();

  return (
    <Box as="section">
      <Field.Text
        mt={{ base: '24', sm: '32', lg: '40' }}
        mb="8"
        as={Heading}
        // See `siteHeadingSizes` in styles/theme/recipes.
        size="section"
        fontWeight="bold"
        textAlign="left"
        name="SectionHeadingServiceDetails1"
        defaultValue={intl.formatMessage({
          id: 'ServiceDetailsHeading1',
          defaultMessage:
            "Wir unterstützen<br/> <span style='color:var(--chakra-colors-brand-500)'>Ihr Unternehmen</span><br/> im digitalen Zeitalter<span style='color:var(--chakra-colors-brand-500)'>.</span>"
        })}
      />

      <Container maxW="container.xl" mt="16">
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          justify="end"
        >
          {/* Only the lg row layout has a column for the image. Below that
              the 31rem fixed-size artwork paints over the text column. */}
          <Box
            flex="1"
            textAlign="center"
            pr={{ lg: '12' }}
            display={{ base: 'none', lg: 'block' }}
          >
            {/* Please replace `servicesSvg` with the source of your image or adjust as needed */}
            {/* StylizedImage is untyped and spreads onto a Chakra Image, so
                the codemod never saw this one. v3 has no sx, and an unknown
                prop is passed straight to the DOM, which would have dropped
                the hue rotation. */}
            <StylizedImage
              css={{
                filter:
                  'hue-rotate(180deg) saturate(1.3) brightness(1.1) contrast(0.9)'
              }}
              src={servicesSvg}
              boxSize={{ base: '31rem', lg: '41rem' }}
              m="auto"
            />
          </Box>
          <Box
            mt={{ base: '16', lg: '0' }}
            flex="1"
            minW={{ lg: '33rem' }}
            pl={{ lg: '4' }}
          >
            {/* For each ListItem you can create a custom component or structure here */}
            {/* Field.Text derives the tag of a Heading wrapper on its own, so
                the item titles keep the size md Heading styling but cannot
                carry an as="h4" of their own. */}
            <Box mb="6">
              <Field.Text
                as={Heading}
                size="md"
                name="ServiceDetailsItemUxTitle"
                defaultValue={intl.formatMessage({
                  id: 'ServiceDetailsItemUxTitle',
                  defaultMessage: 'UX-Konzeption'
                })}
              />
              <Field.Text
                mt="2"
                as={Text}
                name="ServiceDetailsItemUxText"
                defaultValue={intl.formatMessage({
                  id: 'ServiceDetailsItemUxText',
                  defaultMessage:
                    'Durch den Einsatz moderner UX-Methoden gestalten wir benutzerfreundliche und intuitive Oberflächen.'
                })}
              />
            </Box>
            <Box mb="6">
              <Field.Text
                as={Heading}
                size="md"
                name="ServiceDetailsItemWebTitle"
                defaultValue={intl.formatMessage({
                  id: 'ServiceDetailsItemWebTitle',
                  defaultMessage: 'Web development'
                })}
              />
              <Field.Text
                mt="2"
                as={Text}
                name="ServiceDetailsItemWebText"
                defaultValue={intl.formatMessage({
                  id: 'ServiceDetailsItemWebText',
                  defaultMessage:
                    'Wir kreieren moderne Websites und Webanwendungen, die exakt auf Ihre individuellen Bedürfnisse zugeschnitten sind.'
                })}
              />
            </Box>
            <Box mb="6">
              <Field.Text
                as={Heading}
                size="md"
                name="ServiceDetailsItemBackendTitle"
                defaultValue={intl.formatMessage({
                  id: 'ServiceDetailsItemBackendTitle',
                  defaultMessage: 'Backend development'
                })}
              />
              <Field.Text
                mt="2"
                as={Text}
                name="ServiceDetailsItemBackendText"
                defaultValue={intl.formatMessage({
                  id: 'ServiceDetailsItemBackendText',
                  defaultMessage:
                    'Unsere maßgeschneiderten Backend-Lösungen werden speziell auf Ihre Anforderungen abgestimmt und basieren auf dem Framework Pylon.'
                })}
              />
            </Box>
            <Box mb="6">
              <Field.Text
                as={Heading}
                size="md"
                name="ServiceDetailsItemCmsTitle"
                defaultValue={intl.formatMessage({
                  id: 'ServiceDetailsItemCmsTitle',
                  defaultMessage: 'Content management'
                })}
              />
              <Field.Text
                mt="2"
                as={Text}
                name="ServiceDetailsItemCmsText"
                defaultValue={intl.formatMessage({
                  id: 'ServiceDetailsItemCmsText',
                  defaultMessage:
                    'Mit Jaen als Content-Management-System ermöglichen wir es Ihnen, Ihre Website eigenständig zu verwalten.'
                })}
              />
            </Box>
          </Box>
        </Flex>
      </Container>

      <Field.Text
        mt={{ base: '24', sm: '32', lg: '40' }}
        mb="8"
        as={Heading}
        // See `siteHeadingSizes` in styles/theme/recipes.
        size="section"
        fontWeight="bold"
        textAlign="left"
        name="SectionHeadingServiceDetails2"
        defaultValue={intl.formatMessage({
          id: 'ServiceDetailsHeading2',
          defaultMessage:
            "Wir lösen<br/> <span style='color:var(--chakra-colors-brand-500)'>Ihre Probleme</span><br/> zur Not mit Quantencomputern<span style='color:var(--chakra-colors-brand-500)'>.</span>"
        })}
      />

      <QASMPlayground
        children={`// quantum ripple-carry adder from Cuccaro et al, quant-ph/0410184
  OPENQASM 2.0;
  include "qelib1.inc";
  gate majority a,b,c 
  { 
    cx c,b; 
    cx c,a; 
    ccx a,b,c; 
  }
  gate unmaj a,b,c 
  { 
    ccx a,b,c; 
    cx c,a; 
    cx a,b; 
  }
  qreg cin[1];
  qreg a[4];
  qreg b[4];
  qreg cout[1];
  creg ans[5];
  // set input states
  x a[0]; // a = 0001
  x b;    // b = 1111
  // add a to b, storing result in b
  majority cin[0],b[0],a[0];
  majority a[0],b[1],a[1];
  majority a[1],b[2],a[2];
  majority a[2],b[3],a[3];
  cx a[3],cout[0];
  unmaj a[2],b[3],a[3];
  unmaj a[1],b[2],a[2];
  unmaj a[0],b[1],a[1];
  unmaj cin[0],b[0],a[0];
  measure b[0] -> ans[0];
  measure b[1] -> ans[1];
  measure b[2] -> ans[2];
  measure b[3] -> ans[3];
  measure cout[0] -> ans[4];`}
      />
    </Box>
  );
};

export default Services;

import { PageConfig, PageProps } from 'jaen';
import { Global } from '@emotion/react';

import { graphql } from 'gatsby';
import Hero from '../components/sections/Hero';
import ClientsMarquee from '../components/sections/ClientsMarquee';
import { Container } from '@chakra-ui/react';
import Services from '../components/sections/Services';
import ServicesDetails from '../components/sections/ServiceDetails';
import Associates from '../components/sections/Associates';
import { GoogleMaps } from '../components/GoogleMaps';
import Contact from '../components/sections/Contact';
import Blog from '../components/sections/Blog';
import Open from '../components/sections/Open';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      {/* <Global
        styles={{
          body: {
            backgroundColor: '#0D0E11'
          }
        }}
      /> */}

      <Hero />
      <ClientsMarquee w="full" />
      <Container maxW="5xl" mb="20">
        <Services />
        <Associates />
        {/* <Portfolio /> */}
        {/* <NewsSlider showNewsTitle={true} /> */}
        <ServicesDetails />
        <Blog />
      </Container>
      {/* Erst der Kontakt, dann die Haltung als Abschluss der Seite. Beide
          sind voll breit und stehen deshalb ausserhalb des Containers. */}
      <Contact />
      <Open />
      <GoogleMaps
        objectFit="cover"
        h="full"
        w="100%"
        src="https://www.google.com/maps?q=L%C3%B6wengasse%2014%2C%201030%20Wien%2C%20%C3%96sterreich&output=embed"
      />
    </>
  );
};

export default IndexPage;

export const pageConfig: PageConfig = {
  label: 'Home Page',
  icon: 'FaHome',
  childTemplates: ['BlogPage']
};

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
    allJaenPage {
      nodes {
        ...JaenPageData
        children {
          ...JaenPageData
        }
      }
    }
  }
`;

export { Head } from '../components/Head';

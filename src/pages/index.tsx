import { PageConfig, PageProps } from '@atsnek/jaen';
import { Global } from '@emotion/react';

import { graphql } from 'gatsby';
import AboutUs from '../components/sections/AboutUs';
import Features from '../components/sections/Features';
import Hero from '../components/sections/Hero';
import PhotonQ from '../components/sections/PhotonQ';
import ClientsMarquee from '../components/sections/ClientsMarquee';
import { Container } from '@chakra-ui/react';
import Services from '../components/sections/Services';
import ServicesDetails from '../components/sections/ServiceDetails';
import Associates from '../components/sections/Associates';
import Portfolio from '../components/sections/Portfolio/Portfolio';
import { GoogleMaps } from '../components/GoogleMaps';
import Contact from '../components/sections/Contact';

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
        <Portfolio />
        {/* <NewsSlider showNewsTitle={true} /> */}
        <ServicesDetails />
      </Container>
      {/* <Features />
      <PhotonQ />
      <AboutUs /> */}
      <Contact />
      <GoogleMaps
        objectFit="cover"
        h="full"
        w="100%"
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d995.97587950944!2d16.392940417133016!3d48.20781426146578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDjCsDEyJzI3LjUiTiAxNsKwMjMnMzUuOCJF!5e0!3m2!1sen!2sat!4v1711776420986!5m2!1sen!2sat"
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

export { Head } from '@atsnek/jaen';

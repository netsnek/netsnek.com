import {
  Image,
  Box,
  Container,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  useColorModeValue,
  GridItem,
  Grid,
  AspectRatio,
  VStack,
  chakra
} from '@chakra-ui/react'
import {useContactModal} from '../services/contact'
import {Field} from '@atsnek/jaen'
import {GoogleMaps} from './GoogleMaps'
import NewsSlider from './NewsSlider/NewsSlider'
import PortfolioSlider from './Portfolio/Portfolio'
import ProjectsLinkGrid from './ProjectsLinkGrid'
import Associates from './Sections/Associates'
import ServicesDetails from './Sections/ServiceDetails'
import Services from './Sections/Services'
import ClientsMarquee from './Sections/ClientsMarquee'
import Contact from './Sections/Contact'

const ContentSection = () => {
  return (
    <Box>
      <ClientsMarquee w="full" />
      <Container maxW="6xl" mb="20">
        <Services />
        <Associates />
        <PortfolioSlider />
        {/* <NewsSlider showNewsTitle={true} /> */}
        {/* <ServicesDetails /> */}
      </Container>
      <Contact />
      <GoogleMaps
        objectFit="cover"
        h="full"
        w="100%"
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d995.97587950944!2d16.392940417133016!3d48.20781426146578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDjCsDEyJzI3LjUiTiAxNsKwMjMnMzUuOCJF!5e0!3m2!1sen!2sat!4v1711776420986!5m2!1sen!2sat"
      />
    </Box>
  )
}

export default ContentSection

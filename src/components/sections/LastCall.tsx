import {
  Image,
  Box,
  Flex,
  Container,
  Heading,
  Text,
  GridItem,
  Grid,
  HStack,
  Center,
  Button
} from '@chakra-ui/react'
import { Field, Head } from 'jaen'
import { useContactModal } from '../../services/contact';

const LastCall = () => {
  const contactModal = useContactModal()

  const onContactClick = () => {
    contactModal.onOpen({
      meta: {}
    })
  };

  return (
    <Container
      display={"flex"}
      as="section"
      flexDir={{ base: 'column-reverse', lg: 'row' }}
      w={"full"}
      borderRadius="2xl"
      //mb={{ base: '4', lg: '16' }}
      mt={{ base: '0', lg: '16' }}
      position="relative"
      overflow={{ base: 'hidden', lg: 'visible' }}
      pb={{ base: '16', lg: '0' }}
      pt={8}
      maxW="4xl"
      zIndex={0}>
      <Box>
        <Field.Text
          mt={{ base: '20 !important', md: '0' }}
          mb="8"
          as={Heading}
          fontSize={{ base: '3xl', lg: '4xl' }}
          lineHeight={1}
          //fontWeight="bold"
          textAlign="left"
          name="LastCallSectionHeading2"
          defaultValue="Noch Fragen?"
        />
        <Field.Text
          //mt={{ base: '20 !important', md: '0' }}
          mb="8"
          as={Text}
          fontSize={{ base: 'md', lg: 'lg' }}
          lineHeight={1}
          //fontWeight="bold"
          textAlign="left"
          name="LastCallSectionSubheading1"
          defaultValue="
          Ganz normal. Ein halbstündiges Gespräch reicht, damit wir uns gegenseitig kennenlernen und feststellen können, ob wir gut zusammenarbeiten würden.
          "
        />
        <Button
          onClick={onContactClick}
        >
          Unverbindliches Gespräch vereinbaren
        </Button>
      </Box>
      <Image
        //mb="8"
        w={"500px"}
        src="/images/header-portrait-image.png"
        alt="Barbara"
      />
    </Container>
  )
}

export default LastCall

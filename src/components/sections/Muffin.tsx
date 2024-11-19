import {
    Image,
    Box,
    Container,
    Heading,
    Text,
    GridItem,
    Grid
  } from '@chakra-ui/react'
  import { Field } from 'jaen'
  
  const Muffin = () => {
    return (
      <Container
        as="section"
        maxW="4xl"
        borderRadius="2xl"
        mb={{ base: '0', lg: '16' }}
        position="relative"
        overflow={{ base: 'hidden', lg: 'visible' }}
        px={0}
        pt={40}
        zIndex={0}>
        <Image
          w={{ base: '50%', lg: 28 }}
          margin="0 auto"
          mb="8"
          src="images/svg/muffin.svg"
          alt="muffin"
        />
        <Field.Text
          as={Heading}
          variant="cursive"
          mb="8"
          size={{ base: 'md', lg: 'lg' }}
          style={{ animationDelay: '300ms' }}
          fontWeight="500"
          //textTransform="uppercase"
          lineHeight="1.5em"
          //letterSpacing="4.2px"
          textAlign="center"
          name="MuffinSectionHeading1"
          defaultValue="Gesunde Ernährung lässt sich nur nachhaltig beibehalten, wenn du dich damit wohl fühlst."
        />
      </Container>
    )
  }
  
  export default Muffin
  
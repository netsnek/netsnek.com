import React from 'react'
import {
  Box,
  Image,
  LinkBox,
  LinkOverlay,
  useBreakpointValue,
} from '@chakra-ui/react'
import Marquee from 'react-fast-marquee'

// Defining type for a single client
interface Client {
  href: string;
  name: string;
  logo: string;
}

// Defining type for the component props
interface ClientsMarqueeProps {
  clients: Client[];
}

const ClientsMarquee: React.FC<ClientsMarqueeProps> = ({ clients }) => {
  // Defaulting to a 16:9 aspect ratio
  // For TypeScript, setting explicit return types on hooks is not typically necessary due to its inference
  const boxSize = useBreakpointValue({ base: '100px', md: '180px', lg: '240px' })

  return (
    <Marquee gradient={false} speed={60}>
      <Box display="flex" gridGap="32px"> {/* Adapted for accessibility inside marquee */}
        {clients.map((client, index) => (
          <LinkBox
            key={index}
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={boxSize}
            height={boxSize}
            p="2"
            mx="16"
            overflow="hidden"
          >
            <LinkOverlay href={client.href} isExternal>
              <Image
                src={client.logo}
                alt={client.name}
                boxSize="full"
                objectFit="contain"
              />
            </LinkOverlay>
          </LinkBox>
        ))}
      </Box>
    </Marquee>
  )
}

export default ClientsMarquee
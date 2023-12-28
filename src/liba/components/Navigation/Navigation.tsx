import {Box, Stack} from '@chakra-ui/react'
import {FC} from 'react'

import {Navbar} from './Navbar'

import {useContactModal} from '../../services/contact'
import TopNav from './TopNav'
import {useAuthenticationContext} from '@atsnek/jaen'

interface INavigationProps {
  path: string
}

const Navigation: FC<INavigationProps> = ({path}) => {
  const contactModal = useContactModal()
  const {isAuthenticated} = useAuthenticationContext()
  const handleOnContactClick = () => {
    contactModal.onOpen({
      meta: {}
    })
  }

  return (
    <>
      <TopNav />
      <Box
        as="nav"
        zIndex="5"
        pos={'sticky'}
        top={(isAuthenticated ? '4rem' : '0')}
        // mt={mode === 'store' ? (isAuthenticated ? '4rem' : '0') : undefined}
        //bg="rgba(244,248,250,.8)"
        bg="rgba(255,255,255,.8)"
        //bg="rgba(186, 224, 226,.9)"
        borderBottomRadius="2xl"
        //borderBottom={'1px solid'}
        //borderColor={'brand.500'}
        backdropFilter={'blur(7px)'}>
        <Stack spacing="0">
          <Navbar
            pathname={path}
            onContactClick={handleOnContactClick}
          />
        </Stack>
      </Box>
    </>
  )
}

export default Navigation
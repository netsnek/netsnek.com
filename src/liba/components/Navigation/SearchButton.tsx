import {SearchIcon} from '@chakra-ui/icons'
import {
  Text,
  HStack,
  VisuallyHidden,
  Box,
  Button,
  IconButton,
  Kbd,
  useMediaQuery,
  Tooltip,
  ButtonProps,
  useBreakpointValue
} from '@chakra-ui/react'
import {FC} from 'react'

interface ISearchButtonProps extends ButtonProps {
  openModal: () => void
  navigate: (isUp: boolean) => void
}

/**
 * Search button component - shows a button that opens the search menu
 */
const SearchButton: FC<ISearchButtonProps> = ({openModal, navigate, ...props}) => {
  //const [isMobile] = useMediaQuery('(max-width: 900px)') // Adjust the breakpoint as needed

  const isMobile = useBreakpointValue({ base: true, lg: false })

  const onKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      openModal
    } else if (e.key === 'ArrowDown') {
      navigate(false)
    } else if (e.key === 'ArrowUp') {
      navigate(true)
    }
  }

  if (isMobile) {
    return (
      <Tooltip label="Search">
      <IconButton
        borderRadius={'full'}
        filter="drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))"
        w={{base: '100%', md: 'unset'}}
        aria-label="Search"
        fontWeight={'bold'}
        icon={<SearchIcon />}
        onClick={openModal}
        {...props}
      />
      </Tooltip>
    )
  }

  return (
    <Tooltip label="Search">
      <Button
        //size="sm"
        w="full"
        flex="1"
        type="button"
        lineHeight="1.2"
        whiteSpace="nowrap"
        alignItems="center"
        color="gray.400"
        py="3"
        px="4"
        minH="9"
        variant="outline"
        //bgColor="blackAlpha.50"
        // color="topNav.input.color"
        borderWidth="1px"
        borderStyle="solid"
        borderColor={'brand.500'}
        borderRadius={'full'}
        fontWeight="normal"
        _hover={{
          borderColor: 'topNav.input.hover.borderColor'
        }}
        _active={{
          bgColor: 'topNav.input.active.bgColor'
        }}
        onFocus={e => {
          e.currentTarget.addEventListener('keypress', onKeyPress)
        }}
        onBlur={e => {
          e.currentTarget.removeEventListener('keypress', onKeyPress)
        }}
        onClick={openModal}
        {...props}
        >
        <SearchIcon />
        <HStack w="full" mx="3" spacing="4px">
          <Text textAlign="left" flex="1">
            Finde Rezepte
          </Text>
          <HStack spacing="4px">
            <VisuallyHidden>Drücke</VisuallyHidden>
            <Kbd color="gray.500" rounded="2px">
              <Box as="abbr" title={'Strg'} textDecoration="none !important">
                {'Strg'}
              </Box>
            </Kbd>
            <VisuallyHidden>und</VisuallyHidden>
            <Kbd color="gray.500" rounded="2px">
              /
            </Kbd>
            <VisuallyHidden> zum suchen</VisuallyHidden>
          </HStack>
        </HStack>
      </Button>
    </Tooltip>
  )
}

export default SearchButton

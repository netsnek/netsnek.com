import {SearchIcon} from '@chakra-ui/icons'
import {
  Text,
  HStack,
  VisuallyHidden,
  Box,
  Button,
  IconButton,
  Kbd,
  useMediaQuery
} from '@chakra-ui/react'
import {FC} from 'react'

interface ISearchButtonProps {
  openModal: () => void
  navigate: (isUp: boolean) => void
}

/**
 * Search button component - shows a button that opens the search menu
 */
const SearchButton: FC<ISearchButtonProps> = ({openModal, navigate}) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)') // Adjust the breakpoint as needed

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
      <IconButton
        size="sm"
        variant="outline"
        bgColor="blackAlpha.50"
        color="topNav.input.color"
        borderColor="topNav.input.borderColor"
        fontWeight="normal"
        icon={<SearchIcon />}
        aria-label="Search"
        onClick={openModal}
        onKeyDown={onKeyPress}>
        <Kbd
          borderBottomWidth={1}
          background="transparent"
          borderRadius={4}
          py={0.5}
          ml={3}
          opacity={0.7}>
          /
        </Kbd>
      </IconButton>
    )
  }

  return (
    <Button
      display="flex"
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
      bgColor="blackAlpha.50"
      // color="topNav.input.color"
      borderColor="brand.500"
      borderRadius={'2xl'}
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
      onClick={openModal}>
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
  )
}

export default SearchButton

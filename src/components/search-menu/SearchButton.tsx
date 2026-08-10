import { withRedux } from 'jaen';
import { Button, ButtonProps, Kbd, chakra } from '@chakra-ui/react';
import { FC } from 'react';
import { useIntl } from 'react-intl';
import { SearchIcon } from '@chakra-ui/icons';

interface ISearchButtonProps extends ButtonProps {
  openModal: () => void;
  navigate: (isUp: boolean) => void;
}

/**
 * Search button component - shows a button that opens the search menu
 */
const SearchButton: FC<ISearchButtonProps> = withRedux(
  ({ openModal, navigate, ...props }) => {
    const intl = useIntl();
    // const [isMobile] = useMediaQuery('(max-width: 768px)'); // Adjust the breakpoint as needed

    const onKeyPress = (e: any) => {
      if (e.key === 'Enter') {
        openModal;
      } else if (e.key === 'ArrowDown') {
        navigate(false);
      } else if (e.key === 'ArrowUp') {
        navigate(true);
      }
    };

    // if (isMobile) {
    //   return (
    //     <IconButton
    //       size="sm"
    //       variant="outline"
    //       bgColor="blackAlpha.50"
    //       color="topNav.input.color"
    //       borderColor="topNav.input.borderColor"
    //       fontWeight="normal"
    //       icon={<SearchIcon />}
    //       aria-label="Search"
    //       onClick={openModal}
    //       onKeyDown={onKeyPress}
    //     >
    //       <Kbd
    //         borderBottomWidth={1}
    //         background="transparent"
    //         borderRadius={4}
    //         py={0.5}
    //         ml={3}
    //         opacity={0.7}
    //       >
    //         /
    //       </Kbd>
    //     </IconButton>
    //   );
    // }

    return (
      <Button
        display="flex"
        // Below lg the wide search field would crowd the header, so it
        // collapses to a square magnifier that sits beside the hamburger and
        // wears the same solid brand background as that button.
        mx={{ base: 0, lg: 4 }}
        ml={{ base: 4, lg: 4 }}
        w={{ base: 10, lg: 'auto' }}
        minW={{ base: 10, lg: 'auto' }}
        px={{ base: 0, lg: 4 }}
        size="sm"
        minH="10"
        variant="outline"
        borderRadius="full"
        filter={{
          base: 'drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))',
          lg: 'none'
        }}
        bgColor={{
          base: 'components.button.solid.bgColor',
          lg: 'blackAlpha.50'
        }}
        color="topNav.input.color"
        borderColor="brand.500"
        fontWeight="normal"
        _hover={{
          borderColor: 'topNav.input.hover.borderColor'
        }}
        // _active={{
        //   bgColor: 'topNav.input.active.bgColor'
        // }}
        _active={{
          bgColor: { base: 'white', md: 'transparent' }
        }}
        _focus={{
          bgColor: { base: 'white', md: 'transparent' }
        }}
        onFocus={e => {
          e.currentTarget.addEventListener('keypress', onKeyPress);
        }}
        onBlur={e => {
          e.currentTarget.removeEventListener('keypress', onKeyPress);
        }}
        onClick={openModal}
        {...props}
      >
        <SearchIcon display={{ base: 'block', lg: 'none' }} boxSize={4} />
        <Kbd
          display={{ base: 'none', lg: 'inline-block' }}
          borderBottomWidth={1}
          borderRadius={4}
          py={0.5}
          mr={2}
          //bgColor={'transparent'}
          //borderColor={'topNav.input.borderColor'}
          variant="outline"
          bgColor="blackAlpha.50"
          color="topNav.input.color"
          borderColor="topNav.input.borderColor"
          fontWeight="normal"
          _hover={{
            borderColor: 'topNav.input.hover.borderColor'
          }}
          _active={{
            bgColor: 'topNav.input.active.bgColor'
          }}
          onFocus={e => {
            e.currentTarget.addEventListener('keypress', onKeyPress);
          }}
          onBlur={e => {
            e.currentTarget.removeEventListener('keypress', onKeyPress);
          }}
          onClick={openModal}
        >
          /
        </Kbd>
        <chakra.span display={{ base: 'none', lg: 'inline' }}>
          {intl.formatMessage({
            id: 'SearchButtonLabel',
            defaultMessage: 'Suche'
          })}
        </chakra.span>
      </Button>
    );
  }
);

export default SearchButton;

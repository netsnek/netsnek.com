import {
  Input,
  InputGroup,
  Spinner,
  VStack,
  Dialog,
  Portal
} from '@chakra-ui/react';
import {
  Dispatch,
  FC,
  KeyboardEvent,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef
} from 'react';
import { useIntl } from 'react-intl';
import TbSearch from '../icons/tabler/TbSearch';

interface ISearchModalProps {
  defaultQuery?: string;
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  searchResultItems: ReactNode[];
  setSearchQuery: (query: string) => void;
  handleNavigate(isUp: boolean): void;
  openActiveItem: () => void;
}

const SearchModal: FC<ISearchModalProps> = ({
  defaultQuery,
  isLoading,
  isOpen,
  onClose,
  searchResultItems,
  setSearchQuery,
  handleNavigate,
  openActiveItem
}) => {
  const intl = useIntl();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleNavigate(false);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleNavigate(true);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      openActiveItem();
    }
  };

  return (
    <Dialog.Root
      open={isOpen}
      size="full"
      onOpenChange={e => {
        if (!e.open) {
          onClose();
        }
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            top="10px"
            m={0}
            w={{ base: '95vw', md: '75vw' }}
            h="fit-content"
            minH={0}
            borderRadius="lg"
          >
            <Dialog.Body px={4} overflow="hidden" color="shared.text.default">
              {/* InputGroup renders the start element itself and already
                  gives it pointerEvents="none", which is what the v2
                  InputLeftElement spelled out by hand. The group's own
                  size="sm" is gone with it: v3 has no size context to hand
                  down, and the Input below already carries the size. */}
              <InputGroup
                startElement={
                  isLoading ? <Spinner boxSize="3" /> : <TbSearch />
                }
              >
                <Input
                  ref={inputRef}
                  placeholder={intl.formatMessage({
                    id: 'SearchModalPlaceholder',
                    defaultMessage: 'Suche'
                  })}
                  size="sm"
                  borderRadius="lg"
                  // Back to onChange: the codemod renamed it to the
                  // onValueChange of v3's composed inputs, which the plain
                  // Input does not have, so nothing was listening.
                  onChange={e => {
                    setSearchQuery(e.target.value);
                  }}
                  defaultValue={defaultQuery}
                  onKeyDown={handleKeyDown}
                />
              </InputGroup>
              <VStack
                mt={3}
                alignItems="start"
                fontSize="sm"
                css={{
                  '& .sd-search-outer-section::-webkit-scrollbar-thumb': {
                    borderRadius: 'full',
                    backgroundColor: 'shared.scrollbar.thumb.bgColor',
                    '&:hover': {
                      backgroundColor: 'shared.scrollbar.thumb.hover.bgColor'
                    },
                    transition: 'background-color 0.2s ease-in-out'
                  },

                  '& .sd-search-outer-section::-webkit-scrollbar': {
                    width: '4px',
                    backgroundColor: 'transparent'
                  }
                }}
              >
                {!isLoading && searchResultItems}
              </VStack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default SearchModal;

import {
  Button,
  HStack,
  Image,
  Menu,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  useBreakpointValue,
  useDisclosure,
  MenuButton,
  MenuItem,
  MenuList,
  MenuButtonProps,
  Portal,
  Text
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { navigate } from 'gatsby';
import { FC, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { usePageLocale } from '../contexts/locale';
import { defaultLocale, locales } from '../locales/messages';

/**
 * Flags live in static/images/flags as 4:3 SVGs taken from the MIT-licensed
 * flag-icons set. The file is named after the LOCALE, not the country, so the
 * mapping stays in one place: en -> the British flag, ja -> the Japanese one.
 *
 * A flag is a country, not a language, so it never appears alone — every entry
 * is captioned with the language's own name.
 */
const flagSrc = (locale: string): string => `/images/flags/${locale}.svg`;

/**
 * The language's name in that language ("Deutsch", "Slovenščina", "日本語"),
 * from Intl rather than a hardcoded table, so adding a locale to the site
 * needs no edit here. Falls back to the bare code if the runtime has no data.
 */
const autonym = (locale: string): string => {
  try {
    const names = new Intl.DisplayNames([locale], { type: 'language' });
    const name = names.of(locale);

    if (!name || name === locale) return locale.toUpperCase();

    return name.charAt(0).toLocaleUpperCase(locale) + name.slice(1);
  } catch {
    return locale.toUpperCase();
  }
};

export interface LanguageSwitcherProps extends MenuButtonProps {}

/**
 * Lists the five site locales and navigates to the current page in the
 * chosen locale. The target path comes from the page context's
 * `translations`; when the current page has no translation entry the
 * switcher falls back to the locale root (`/{prefix}/`, `/` for the
 * default locale).
 */
const LanguageSwitcher: FC<LanguageSwitcherProps> = props => {
  const { locale: currentLocale, translations } = usePageLocale();
  const intl = useIntl();

  // aria-label prefix; the button itself shows a flag, which reads to a
  // screen reader as nothing at all.
  const controlLabel = intl.formatMessage({
    id: 'LanguageSwitcherLabel',
    defaultMessage: 'Sprache'
  });

  const currentBase = currentLocale.split(/[-_]/)[0]?.toLowerCase();

  const labels = useMemo(
    () => Object.fromEntries(locales.map(locale => [locale, autonym(locale)])),
    []
  );

  const pathForLocale = (locale: string): string => {
    const translation = translations.find(
      entry => entry.locale.split(/[-_]/)[0]?.toLowerCase() === locale
    );

    if (translation) {
      return translation.path;
    }

    return locale === defaultLocale ? '/' : `/${locale}/`;
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  /**
   * The trigger. On a phone it opens a dialog, so it carries no chevron:
   * that arrow promises a list unfolding right below the button, which is
   * not what happens there.
   */
  const trigger = (onClick?: () => void) => (
    <Button
      variant="solid"
      size="sm"
      minH="10"
      px={3}
      borderRadius="xl"
      filter="drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))"
      color="white"
      aria-label={`${controlLabel}: ${labels[currentBase] ?? currentBase}`}
      onClick={onClick}
      {...props}
    >
      <Image
        src={flagSrc(currentBase)}
        alt=""
        aria-hidden="true"
        width="22px"
        height="16.5px"
        borderRadius="2px"
        objectFit="cover"
        display="block"
        boxShadow="0 0 0 1px rgba(0,0,0,0.12)"
      />
    </Button>
  );

  /** One language, as a row. Shared by the menu and the dialog. */
  const row = (locale: string) => {
    const isCurrent = locale === currentBase;

    return (
      <HStack spacing={3} w="full">
        <Image
          src={flagSrc(locale)}
          alt=""
          aria-hidden="true"
          width="22px"
          height="16.5px"
          borderRadius="2px"
          objectFit="cover"
          boxShadow="0 0 0 1px rgba(0,0,0,0.12)"
        />
        <Text flex="1" textAlign="left">
          {labels[locale] ?? locale}
        </Text>
        {isCurrent ? <Text aria-hidden="true">✓</Text> : null}
      </HStack>
    );
  };

  const go = (locale: string) => {
    if (locale !== currentBase) void navigate(pathForLocale(locale));
  };

  // On a phone a dropdown opens as a small list pinned to a button in a
  // crowded header. A dialog gives the choice the whole screen, which is
  // what picking a language deserves on the device where it is hardest to
  // hit a target. The breakpoint is read with a fallback so server and
  // client agree on the first paint.
  const isMobile = useBreakpointValue(
    { base: true, lg: false },
    { fallback: 'lg' }
  );

  if (isMobile) {
    return (
      <>
        {trigger(onOpen)}
        <Modal isOpen={isOpen} onClose={onClose} size="xs" isCentered>
          <ModalOverlay />
          <ModalContent mx={4} borderRadius="xl">
            <ModalHeader fontSize="md">{controlLabel}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack spacing={1} align="stretch">
                {locales.map(locale => (
                  <Button
                    key={locale}
                    variant="ghost"
                    justifyContent="flex-start"
                    h="12"
                    borderRadius="lg"
                    fontWeight={locale === currentBase ? 'semibold' : 'normal'}
                    onClick={() => {
                      onClose();
                      go(locale);
                    }}
                  >
                    {row(locale)}
                  </Button>
                ))}
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <Menu placement="bottom-end" isLazy>
      {/* Same size, padding, radius and colour as the search control and the
          contact button beside it, so the header reads as one row of
          controls rather than three different ones. */}
      <MenuButton
        as={Button}
        variant="solid"
        size="sm"
        minH="10"
        px={3}
        borderRadius="xl"
        filter="drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))"
        color="white"
        aria-label={`${controlLabel}: ${labels[currentBase] ?? currentBase}`}
        rightIcon={<ChevronDownIcon boxSize={4} display="block" />}
        iconSpacing={1.5}
        {...props}
      >
        <Image
          src={flagSrc(currentBase)}
          alt=""
          aria-hidden="true"
          width="22px"
          height="16.5px"
          borderRadius="2px"
          objectFit="cover"
          display="block"
          boxShadow="0 0 0 1px rgba(0,0,0,0.12)"
        />
      </MenuButton>
      {/* The header rows carry their own stacking context, and an in-place
          MenuList paints underneath them. A portal lifts the list out to the
          body, above everything. */}
      <Portal>
        <MenuList color="chakra-body-text" zIndex="popover" minW="12rem">
          {locales.map(locale => (
            <MenuItem key={locale} onClick={() => go(locale)}>
              {row(locale)}
            </MenuItem>
          ))}
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default LanguageSwitcher;

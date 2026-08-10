import {
  Button,
  HStack,
  Image,
  Menu,
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

  return (
    <Menu placement="bottom-end" isLazy>
      <MenuButton
        as={Button}
        variant="ghost-hover"
        size="sm"
        px={2}
        aria-label={`${controlLabel}: ${labels[currentBase] ?? currentBase}`}
        // Brand orange by default so the control reads as a control on both
        // header rows; a call site can still override it.
        color="brand.500"
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
          {locales.map(locale => {
            const isCurrent = locale === currentBase;

            return (
              <MenuItem
                key={locale}
                fontWeight={isCurrent ? 'semibold' : 'normal'}
                onClick={() => {
                  if (!isCurrent) {
                    void navigate(pathForLocale(locale));
                  }
                }}>
                <HStack spacing={3}>
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
                  <Text>{labels[locale] ?? locale}</Text>
                  {isCurrent ? <Text aria-hidden="true">✓</Text> : null}
                </HStack>
              </MenuItem>
            );
          })}
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default LanguageSwitcher;

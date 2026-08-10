import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuButtonProps
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { navigate } from 'gatsby';
import { FC } from 'react';

import { usePageLocale } from '../contexts/locale';
import { defaultLocale, locales } from '../locales/messages';
import TbLanguage from './icons/tabler/TbLanguage';

/** aria-label prefix; the visible control is the language code itself. */
const LANGUAGE_CONTROL_LABEL = 'Language'

const LOCALE_LABELS: Record<string, string> = {
  de: 'Deutsch',
  en: 'English',
  sl: 'Slovenščina',
  it: 'Italiano',
  ja: '日本語'
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

  const currentBase = currentLocale.split(/[-_]/)[0]?.toLowerCase();

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
        // The icon alone reads as decoration and gets overlooked next to the
        // search control, so the button also names the language it is
        // currently showing.
        aria-label={`${LANGUAGE_CONTROL_LABEL}: ${
          LOCALE_LABELS[currentBase] ?? currentBase
        }`}
        leftIcon={<TbLanguage boxSize={5} display="block" />}
        rightIcon={<ChevronDownIcon boxSize={4} display="block" />}
        iconSpacing={1.5}
        {...props}
      >
        <Box as="span" fontSize="sm" fontWeight="medium" letterSpacing="wide">
          {currentBase.toUpperCase()}
        </Box>
      </MenuButton>
      <MenuList color="chakra-body-text">
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
              }}
            >
              {LOCALE_LABELS[locale] ?? locale}
              {isCurrent ? ' ✓' : ''}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default LanguageSwitcher;

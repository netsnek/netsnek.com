import {
  ChevronLeftIcon,
  ChevronRightIcon
} from '../../components/icons/chakra';
import { Flex, Spacer, Text } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useLocation } from '@reach/router';
import {
  createPageTree,
  buildActiveMenuItemIndexArray,
  getAdjacentPages
} from '../../utils/navigation';
import { useCMSManagementContext } from 'jaen';
import { useLocalizeHref, usePageLocale } from '../../contexts/locale';
import { TLinkData } from '../types';
import { TAdjacentPages } from '../../utils/navigation/types';
import { Link } from 'gatsby-plugin-jaen';

interface MainBottomNavProps {
  previousPage?: TLinkData;
  nextPage?: TLinkData;
}

const props = {
  display: 'flex',
  alignItems: 'center',
  opacity: 0.7,
  _hover: {
    color: 'main.bottomNav.linkHoverColor',
    opacity: 1
  }
};
//TODO: Re-implement commented out jsx below
/**
 * Main bottom navigation component.
 * This shows links to the respective previous and next page.
 */
const MainBottomNav: FC<MainBottomNavProps> = ({}) => {
  const manager = useCMSManagementContext();
  const pageTree = manager.tree;

  const location = useLocation();
  const { locale, prefix } = usePageLocale();
  const localizeHref = useLocalizeHref();
  const intl = useIntl();

  // createPageTree is a plain util and cannot use react-intl, so the docs
  // section label is resolved here and threaded in like localizeHref. It
  // ends up as the boxed section name inside getAdjacentPages.
  const docsSectionLabel = intl.formatMessage({
    id: 'DocsMenuSectionArticles',
    defaultMessage: 'Blog Artikel'
  });

  // Memoized adjacent pages object to navigate to previous and next page.
  // The tree is built locale-aware so the prev/next links stay inside the
  // current locale's docs subtree.
  const pages: TAdjacentPages = useMemo(() => {
    const menu = createPageTree(
      manager,
      location.pathname,
      prefix,
      localizeHref,
      docsSectionLabel
    ).menu;
    const idxArr = buildActiveMenuItemIndexArray(menu);
    return getAdjacentPages(idxArr, menu);
  }, [pageTree, location.pathname, locale, prefix, docsSectionLabel]);

  return (
    <Flex
      borderTop={pages.prev || pages.next ? '1px solid' : undefined}
      borderColor="components.separator.borderColor"
      mt={10}
      pt={5}
      pb="8px" // This is to make the nav controls align with the bottom of this nav
    >
      {pages.prev && (
        <Link to={pages.prev.href} {...props}>
          <ChevronLeftIcon mr={2} />
          <Text as="span" verticalAlign="middle">
            {pages.prev.name}
          </Text>
        </Link>
      )}
      <Spacer minW={10} />
      {pages.next && (
        <Link to={pages.next.href} {...props} textAlign="right">
          <Text as="span" verticalAlign="middle">
            {pages.next.name}
          </Text>
          <ChevronRightIcon ml={2} />
        </Link>
      )}
    </Flex>
  );
};

export default MainBottomNav;

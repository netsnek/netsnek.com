import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import React, { FC, ReactNode, useMemo } from 'react';
import { useIntl } from 'react-intl';
import TopNav from '../navigation/TopNav';
import AltTopNav from '../navigation/AltTopNav';

import { useAuth, useCMSManagementContext } from 'jaen';
import { useLocation } from '@reach/router';
import { useLocalizeHref, usePageLocale } from '../../contexts/locale';
import { MenuStructureContext } from '../../contexts/menu-structure';
import { createPageTree, stripLocalePrefix } from '../../utils/navigation';
import DocsLayout from './DocsLayout';
import Footer from './Footer';
import { ArrowPattern } from '../ArrowPattern';

interface AppLayoutProps {
  children?: React.ReactNode;
  isDocs?: boolean;
  path: string;
  footer?: FC<{ pullUp?: boolean }>;
}

/**
 * The global layout component.
 * This should not be directly used in pages, but used in gatsby.
 */
const AppLayout: FC<AppLayoutProps> = ({ children, isDocs, path, footer }) => {
  const cmsManager = useCMSManagementContext();
  const location = useLocation();
  const topNavDisclosure = useDisclosure(); // for the top nav mobile drawer
  const { isAuthenticated } = useAuth();
  const { locale, prefix } = usePageLocale();
  const localizeHref = useLocalizeHref();
  const intl = useIntl();
  const currentUserId = '1';

  // createPageTree is a plain util and cannot use react-intl, so the docs
  // section label is resolved here and threaded in like localizeHref.
  const docsSectionLabel = intl.formatMessage({
    id: 'DocsMenuSectionArticles',
    defaultMessage: 'Blog Artikel'
  });

  // This generates the menu structure from the page tree that is used over the whole app by accessing the context.
  // The locale prefix is stripped for matching and the emitted hrefs are
  // localized, so the docs menu works on prefixed locales too.
  // The hero backdrop belongs on every locale's landing page, not only on
  // the unprefixed German one.
  const isLandingPage =
    stripLocalePrefix(path ?? '', prefix).replace(/\/+$/, '') === '';

  const menuStructure = useMemo(
    () =>
      createPageTree(
        cmsManager,
        location.pathname,
        prefix,
        localizeHref,
        docsSectionLabel
      ),
    [cmsManager, path, locale, prefix, docsSectionLabel]
  );

  const FooterComp = footer ?? Footer;

  let childrenElmnt: ReactNode = null;

  if (isDocs) {
    childrenElmnt = <DocsLayout path={path}>{children}</DocsLayout>;
  } else {
    childrenElmnt = children;
  }

  return (
    <>
      <MenuStructureContext.Provider value={{ menuStructure }}>
        <Box as="main" minW="210px" h="max(100%, 100vh)" minH="100vh">
          {/* The brand backdrop belongs on every page, not just the
                landing one. Subpages get a shorter band so it stays a
                backdrop behind the header area and never sits under a long
                article. */}
          <ArrowPattern
            position="absolute"
            insetX="0"
            top="-14"
            zIndex={-10}
            h={isLandingPage ? '1000px' : '520px'}
            w="full"
            bgColor="white"
            fill="rgba(149, 156, 177, 0.1)"
            // Stroke and mask-image are not directly supported through Chakra props. Consider inline styles or additional CSS.
            sx={{
              // This demonstrates how to apply more complex styles not directly available as Chakra props:
              stroke: 'rgba(149, 156, 177, 0.1)', // example variable, adjust as necessary
              maskImage:
                'linear-gradient(to bottom left, white 40%, transparent 50%)'
            }}
            yOffset={-96}
            interactive
          />
          {!isAuthenticated && path !== '/' && <AltTopNav path={path} />}
          {!isAuthenticated && path === '/' && <AltTopNav path={path} />}
          {childrenElmnt}
        </Box>
      </MenuStructureContext.Provider>
      <FooterComp pullUp={path === '/'} />
    </>
  );
};

export default AppLayout;

import React, { FC, ReactNode, useMemo } from 'react';
import Navigation from '../../Navigation/Navigation';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import Footer from '../../Footer';
import BlogLayout from './BlogLayout';
import { useLocation } from '@reach/router';
//import { TSearchMenuStyleProps } from '../../features/search/components/SearchMenu';
import { THamburgerMenuIconStylerProps } from '../components/HamburgerMenuIcon';
import { MenuContext } from '../contexts/menu';
import { useAuthenticationContext, useCMSManagementContext } from '@atsnek/jaen';
import { createPageTree } from '../utils/navigation';
import CommunityLayout from './CommunityLayout';

interface AppLayoutProps {
  children?: React.ReactNode;
  isBlog?: boolean;
  isCommunity?: boolean;
  path?: string;
  footer?: FC;
  customTopNavDisclosure?: ReturnType<typeof useDisclosure>;
}

/**
 * The global layout component.
 * This should not be directly used in pages, but used in gatsby.
 */
const AppLayout: FC<AppLayoutProps> = ({
  children,
  isBlog,
  isCommunity,
  path,
  footer,
  customTopNavDisclosure,
}) => {
  const cmsManager = useCMSManagementContext();
  const location = useLocation();
  const topNavDisclosure = useDisclosure(); // for the top nav mobile drawer
  const { isAuthenticated } = useAuthenticationContext();

  console.log("path", path)
  // This generates the menu structure from the page tree that is used over the whole app by accessing the context.
  const menuStructure = useMemo(
    () => createPageTree(cmsManager, location.pathname),
    [cmsManager, path]
  );

  console.log('menuStructure',  menuStructure)
  const FooterComp = footer ?? Footer;

  let childrenElmnt: ReactNode = null;

  if (isBlog) {
    childrenElmnt = (
      <BlogLayout path={path} isCommunity={isCommunity}>
        {children}
      </BlogLayout>
    );
  } else if (isCommunity) {
    childrenElmnt = <CommunityLayout>{children}</CommunityLayout>;
  } else {
    childrenElmnt = children;
  }

  return (
    <>
      <MenuContext.Provider value={{ menuStructure }}>
        <Flex minW="210px" h="max(100%, 100vh)" minH="100vh" direction="column" pb={5}>
          {!isAuthenticated && (
            <Navigation path='/'/>
          )}
          <Box flex="1">{childrenElmnt}</Box>
        </Flex>
      </MenuContext.Provider>
      <FooterComp />
    </>
  );
};

export default AppLayout;

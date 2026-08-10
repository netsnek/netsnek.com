import { Box, Container, Flex, Text, VStack } from '@chakra-ui/react';
import { FaLink } from '@react-icons/all-files/fa/FaLink';
import React, { FC, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useLocalizeHref, usePageLocale } from '../../contexts/locale';
import { useMenuStructureContext } from '../../contexts/menu-structure';
import { TOCProvider } from '../../contexts/toc';
import useNavOffset from '../../hooks/use-nav-offset';
import {
  createBreadCrumbParts,
  stripLocalePrefix
} from '../../utils/navigation';
import { MainBreadcrumbPart } from '../../utils/navigation/types';
import Links from '../Links';
import TbUsers from '../icons/tabler/TbUsers';
import TbBooks from '../icons/tabler/TbBooks';
import MainBottomNav from '../navigation/MainBottomNav';
import MainBreadcrumb from '../navigation/MainBreadcrumb';
import TableOfContent from '../navigation/TableOfContent';
import PageDirectory from '../navigation/page-directory/PageDirectory';

const links: {
  name: string;
  href: string;
}[] = [
  // {
  //   name: 'Question? Give us feedback',
  //   href: '/contact'
  // },
  // {
  //   name: 'Edit this page on Jaen',
  //   href: '/cms/pages'
  // }
];

interface DocsLayoutProps {
  children?: React.ReactNode;
  path?: string;
  isCommunity?: boolean;
}

const DocsLayout: FC<DocsLayoutProps> = ({ children, path, isCommunity }) => {
  const { menuStructure } = useMenuStructureContext();
  const { locale, prefix } = usePageLocale();
  const localizeHref = useLocalizeHref();
  const intl = useIntl();

  const [isExpanded, setIsExpanded] = useState(true);

  // The incoming path may carry a locale prefix, the canonical path is
  // what the unprefixed checks below have to run against.
  const canonicalPath = stripLocalePrefix(path ?? '', prefix);

  const breadcrumbParts: MainBreadcrumbPart[] = useMemo(() => {
    return [
      {
        name: intl.formatMessage({
          id: 'DocsBreadcrumbArticles',
          defaultMessage: 'Artikel'
        }),
        isDisabled: canonicalPath === '/docs/',
        href: localizeHref('/docs')
      },
      ...createBreadCrumbParts(menuStructure)
    ];
  }, [menuStructure, canonicalPath, locale, prefix, intl]);

  const memoedChildren = useMemo(() => children, [children]);

  const MemoizedToc = React.memo(TableOfContent, () => false);

  const offset = useNavOffset();

  return (
    <Container maxW="8xl" w="full" minH="full" mt={offset}>
      <Flex minH="100dvh">
        <Box
          as="aside"
          flex="1"
          maxW={{ base: '150px', lg: '2xs' }}
          display={{
            base: 'none',
            md: 'block'
          }}
          pb="4"
        >
          <Box position="sticky" top="100px" mt="50px">
            <PageDirectory
              data={menuStructure}
              isExpanded={isExpanded}
              path={path}
              baseMenuItems={[
                {
                  name: intl.formatMessage({
                    id: 'DocsMenuSectionRecipes',
                    defaultMessage: 'Rezept Entwicklung'
                  }),
                  icon: <TbBooks />,
                  items: [
                    {
                      name: intl.formatMessage({
                        id: 'DocsMenuRecipes',
                        defaultMessage: 'Rezepte'
                      }),
                      href: localizeHref('/recipes'),
                      isActive: canonicalPath.startsWith('/recipes')
                    }
                  ]
                },
                {
                  name: intl.formatMessage({
                    id: 'DocsMenuSectionMore',
                    defaultMessage: 'Mehr'
                  }),
                  icon: <FaLink />,
                  items: [
                    {
                      name: intl.formatMessage({
                        id: 'DocsMenuHome',
                        defaultMessage: 'Hauptseite'
                      }),
                      href: localizeHref('/')
                    }
                  ]
                }
              ]}
            />
          </Box>
        </Box>

        {/* <Container maxW="3xl" mt="6">
       
        </Container> */}

        <TOCProvider>
          {isCommunity ? (
            <Box flex="1" mt="6" mx="8">
              {memoedChildren}
            </Box>
          ) : (
            <>
              <Container flex="1" mt="6" maxW="3xl">
                <MainBreadcrumb parts={breadcrumbParts} />

                {memoedChildren}

                <MainBottomNav />
              </Container>
              <Box
                as="aside"
                flex="1"
                maxW={{ base: '150px', lg: '2xs' }}
                display={{
                  base: 'none',
                  md: 'block'
                }}
                pb="4"
              >
                <Box position="sticky" top="100px" mt="50px">
                  <Flex as="nav" direction="column" mt={5}>
                    <MemoizedToc />
                  </Flex>
                  <Box
                    mt={7}
                    pt={7}
                    borderTop="1px solid"
                    borderTopColor="components.separator.borderColor"
                    fontSize="xs"
                  >
                    <VStack rowGap={1} textAlign="left">
                      <Links
                        links={links}
                        props={{
                          variant: 'right-bottom-nav',
                          w: '100%',
                          display: 'block'
                        }}
                      />
                    </VStack>
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </TOCProvider>
      </Flex>
    </Container>
  );
};

export default DocsLayout;

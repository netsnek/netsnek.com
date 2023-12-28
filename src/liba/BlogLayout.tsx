import { Box } from '@chakra-ui/react';
import React, { FC, useMemo, useState } from 'react';
import LeftNav from '../shared/containers/navigation/LeftNav';
import MainBreadcrumb from '../shared/containers/navigation/components/MainBreadcrumb';
import PageDirectory from '../shared/containers/navigation/components/page-directory/PageDirectory';
import MainGrid from '../shared/containers/components/MainGrid';
import { useMenuContext } from '../shared/contexts/menu';
import { MainBreadcrumbPart } from '../shared/types/navigation';
import { createBreadCrumbParts } from '../shared/utils/navigation';

interface BlogLayoutProps {
  children?: React.ReactNode;
  path?: string;
  isCommunity?: boolean;
}

const BlogLayout: FC<BlogLayoutProps> = ({ children, path, isCommunity }) => {
  const { menuStructure } = useMenuContext();

  const [isExpanded, setIsExpanded] = useState(true);

  const breadcrumbParts: MainBreadcrumbPart[] = useMemo(() => {
    return [
      {
        name: 'Blog',
        isDisabled: path === '/blog/',
        href: '/blog'
      },
      ...createBreadCrumbParts(menuStructure)
    ];
  }, [menuStructure]);

  const memoedChildren = useMemo(() => children, [children]);

  return (
    <MainGrid isLeftNavExpanded={isExpanded}>
      <Box display={{ base: 'none', md: 'block' }} position="sticky">
        <LeftNav isExpanded={isExpanded} setIsExpanded={setIsExpanded}>
          <Box w={isExpanded ? 'auto' : 0}>
            <PageDirectory data={menuStructure} isExpanded={isExpanded} path={path} />
          </Box>
        </LeftNav>
      </Box>

      <Box minW="full">
        {!isCommunity && (
          <Box overflow="hidden">
            <MainBreadcrumb parts={breadcrumbParts} />
          </Box>
        )}
        <Box>{memoedChildren}</Box>
      </Box>
    </MainGrid>
  );
};

export default BlogLayout;

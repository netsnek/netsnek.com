import { useAuth } from 'jaen';
import {
  Accordion,
  Box,
  HStack,
  Text,
  useBreakpointValue
} from '@chakra-ui/react';
import { FaLink } from '@react-icons/all-files/fa/FaLink';
import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { useLocalizeHref, usePageLocale } from '../../../contexts/locale';
import {
  createPageTree,
  getExpandedMenuItemIndices,
  stripLocalePrefix
} from '../../../utils/navigation';
import { NavMenuItem, NavMenuSection } from '../../../utils/navigation/types';
import TbUsers from '../../icons/tabler/TbUsers';
import { generateMenuItem } from './utils/pageDirectory';

interface PageDirectoryProps {
  data: ReturnType<typeof createPageTree>;
  baseMenuItems?: NavMenuSection[];
  isExpanded?: boolean;
  isMobile?: boolean;
  closeMobileDrawer?: () => void;
  path?: string;
}
/**
 * The page directory component that shows the documentation structure.
 */
const PageDirectory: FC<PageDirectoryProps> = ({
  data,
  baseMenuItems = [],
  isExpanded = true,
  isMobile = false,
  closeMobileDrawer,
  path
}) => {
  const { prefix } = usePageLocale();
  const localizeHref = useLocalizeHref();

  // The incoming path may carry a locale prefix, the canonical path is
  // what the unprefixed checks below have to run against.
  const canonicalPath = stripLocalePrefix(path ?? '', prefix);

  // Calculate the default expanded indices for the accordion. The numbering
  // must match the render below, so the isMobile flag goes in too.
  const defaultExpandedIdx = useMemo(() => {
    return data.menu ? getExpandedMenuItemIndices(data.menu, isMobile) : [];
  }, [data.menu, isMobile]);

  // Keep track of the items that have been expanded by the user
  const [expandedIdx, setExpandedIdx] = useState<number[]>(defaultExpandedIdx);

  // On navigation the active path changes but this component may stay
  // mounted, so the initial state never recomputes. Merge the new defaults
  // in instead of replacing, so nothing the user opened snaps shut.
  useEffect(() => {
    setExpandedIdx(prev => Array.from(new Set([...prev, ...defaultExpandedIdx])));
  }, [defaultExpandedIdx]);
  const { isAuthenticated, signinRedirect } = useAuth();
  const isSmallScreen = useBreakpointValue(
    { base: true, md: false },
    { fallback: 'false' }
  );

  const updateExpandedIdx = (idx: number, mode: 'toggle' | 'set') => {
    const isIncluded = expandedIdx.includes(idx);
    if (mode === 'toggle' && isIncluded) {
      setExpandedIdx(expandedIdx.filter(i => i !== idx));
      return;
    }
    if (!isIncluded) setExpandedIdx([...expandedIdx, idx]);
  };

  if (canonicalPath === '/') {
    baseMenuItems.unshift({
      name: 'Navigation',
      items: [
        {
          name: 'Documentation',
          href: localizeHref('/docs')
        }
      ]
    });
  }

  if (isSmallScreen && !isAuthenticated) {
    const item = {
      name: 'Sign In',
      onClick: signinRedirect
    };
    const section = baseMenuItems.find(bmi => bmi.name === 'Navigation');

    if (section) {
      section.items.unshift(item);
    } else {
      baseMenuItems.unshift({
        name: 'Navigation',
        items: [item]
      });
    }
  }

  let menuRootExpandedIdx = 0;

  return (
    <Accordion
      id="left-nav-accordion"
      visibility={isExpanded ? 'visible' : 'hidden'}
      opacity={isExpanded ? 1 : 0}
      w={isExpanded ? '100%' : 'max-content'}
      allowMultiple
      // No height animation: panels can be toggled while the nav is hidden
      // (closed mobile drawer, collapsed left nav) and framer-motion then
      // measures the open height as 0, leaving an "expanded" item with an
      // invisible panel. Plain show/hide cannot get stuck.
      reduceMotion
      css={{
        // Remove border from last accordion item
        '& .chakra-accordion__item:last-child': {
          borderBottomWidth: 0
        }
      }}
      variant="leftNav"
      transition="opacity 0.2s ease-in-out, width 0.2s ease-in-out"
      mb={isMobile ? 12 : undefined}
      index={expandedIdx}
    >
      {[...data.menu, ...baseMenuItems].map((section, i) => (
        <Fragment key={i}>
          {section.name && (
            <HStack
              key={0}
              spacing={2}
              ml={4}
              mt={i === 0 ? 0 : 9}
              fontSize="sm"
              fontWeight="bold"
              {...section.styling}
              color="components.pageDirectory.section.title.color"
              opacity={1}
            >
              <Text>{section.name}</Text>
              {section.icon}
            </HStack>
          )}
          <Box key={1}>
            {section.items?.map((item: NavMenuItem) => {
              const res = generateMenuItem(
                item,
                isMobile,
                updateExpandedIdx,
                menuRootExpandedIdx,
                closeMobileDrawer
              );
              menuRootExpandedIdx = res.idx++;
              return res.item;
            })}
          </Box>
        </Fragment>
      ))}
    </Accordion>
  );
};

export default PageDirectory;

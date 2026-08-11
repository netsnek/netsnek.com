import { useAuth } from 'jaen';
import {
  Accordion,
  Box,
  HStack,
  StackProps,
  Text,
  useBreakpointValue
} from '@chakra-ui/react';
import { FaLink } from '@react-icons/all-files/fa/FaLink';
import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useLocalizeHref, usePageLocale } from '../../../contexts/locale';
import {
  createPageTree,
  getExpandedMenuItemIndices,
  stripLocalePrefix
} from '../../../utils/navigation';
import { NavMenuItem, NavMenuSection } from '../../../utils/navigation/types';
import TbUsers from '../../icons/tabler/TbUsers';
import { generateMenuItem } from './utils/pageDirectory';

/** Stable id of the section the two branches below share. It is never
 *  rendered, so it survives the translation of the section's label. */
const NAVIGATION_SECTION_ID = 'navigation';

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
  const intl = useIntl();

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
  // mounted, so the initial state never recomputes. Replace the expansion
  // with the new page's ancestors: merging instead would accumulate every
  // section visited during the session until the whole tree stands open.
  // Sections the reader opens by hand survive until they navigate away.
  //
  // Keyed on the joined indices, not the array: the tree object is rebuilt
  // on renders that do not change the active path, and depending on its
  // identity would reset a hand-opened section on the next render.
  const defaultExpandedKey = defaultExpandedIdx.join(',');

  useEffect(() => {
    setExpandedIdx(defaultExpandedIdx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultExpandedKey]);
  const { isAuthenticated, signinRedirect } = useAuth();
  // v2 was handed the string 'false', which is not a breakpoint name, so no
  // fallback ever matched and the pre-hydration value came back undefined. v3
  // types the option and resolves an unmatched name to the widest breakpoint in
  // the map, so 'md' is what reproduces that same falsy first render.
  const isSmallScreen = useBreakpointValue(
    { base: true, md: false },
    { fallback: 'md' }
  );

  const updateExpandedIdx = (idx: number, mode: 'toggle' | 'set') => {
    const isIncluded = expandedIdx.includes(idx);
    if (mode === 'toggle' && isIncluded) {
      setExpandedIdx(expandedIdx.filter(i => i !== idx));
      return;
    }
    if (!isIncluded) setExpandedIdx([...expandedIdx, idx]);
  };

  const navigationSectionName = intl.formatMessage({
    id: 'PageDirectorySectionNavigation',
    defaultMessage: 'Navigation'
  });

  if (canonicalPath === '/') {
    baseMenuItems.unshift({
      id: NAVIGATION_SECTION_ID,
      name: navigationSectionName,
      items: [
        {
          name: intl.formatMessage({
            id: 'NavDocs',
            defaultMessage: 'Dokumentation'
          }),
          href: localizeHref('/docs')
        }
      ]
    });
  }

  if (isSmallScreen && !isAuthenticated) {
    const item = {
      name: intl.formatMessage({
        id: 'NavSignIn',
        defaultMessage: 'Anmelden'
      }),
      onClick: signinRedirect
    };
    // Match on the stable id, never on the (now translated) label.
    const section = baseMenuItems.find(bmi => bmi.id === NAVIGATION_SECTION_ID);

    if (section) {
      section.items.unshift(item);
    } else {
      baseMenuItems.unshift({
        id: NAVIGATION_SECTION_ID,
        name: navigationSectionName,
        items: [item]
      });
    }
  }

  let menuRootExpandedIdx = 0;

  return (
    <Accordion.Root
      id="left-nav-accordion"
      visibility={isExpanded ? 'visible' : 'hidden'}
      opacity={isExpanded ? 1 : 0}
      w={isExpanded ? '100%' : 'max-content'}
      multiple
      css={{
        // Remove border from last accordion item
        '& .chakra-accordion__item:last-child': {
          borderBottomWidth: 0
        }
      }}
      // leftNav comes from the site's accordion slot recipe. v3 only types the
      // variants Chakra itself ships until `chakra typegen` writes the custom
      // ones into node_modules, which no build step here does.
      variant={'leftNav' as any}
      transition="opacity 0.2s ease-in-out, width 0.2s ease-in-out"
      mb={isMobile ? 12 : undefined}
      // v2 drove the accordion by numeric `index`. v3 drives it by item value,
      // so the same numbering is carried across as strings and every item
      // stringifies the index it was handed in generateMenuItem.
      value={expandedIdx.map(String)}
    >
      {[...data.menu, ...baseMenuItems].map((section, i) => (
        <Fragment key={i}>
          {section.name && (
            <HStack
              key={0}
              gap={2}
              ml={4}
              mt={i === 0 ? 0 : 9}
              fontSize="sm"
              fontWeight="bold"
              // NavMenuSection.styling is a BoxProps, where `direction` is the
              // CSS writing direction; Stack narrows the same name to a flex
              // direction. No section supplies either, so the assertion only
              // bridges the two spellings of one prop name.
              {...(section.styling as StackProps)}
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
    </Accordion.Root>
  );
};

export default PageDirectory;

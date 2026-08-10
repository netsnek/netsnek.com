import { useCMSManagementContext } from 'jaen';
import {
  NavMenuSection,
  NavMenuItem,
  MainBreadcrumbPart,
  TAdjacentPages,
  TMenuStructure
} from './types';

/**
 * Strips the locale prefix from a path so it can be compared against the
 * canonical (unprefixed) paths the CMS manager emits. Paths that do not
 * carry the prefix pass through unchanged, so default-locale paths (which
 * are served unprefixed) are safe to feed in with any prefix value.
 * @param path  The path to strip, e.g. `/en/docs/foo`
 * @param localePrefix  The locale prefix without slashes, e.g. `en`
 * @returns  The canonical path, e.g. `/docs/foo`
 */
export function stripLocalePrefix(path: string, localePrefix?: string): string {
  if (!localePrefix) return path;
  if (path === `/${localePrefix}` || path === `/${localePrefix}/`) return '/';
  if (path.startsWith(`/${localePrefix}/`))
    return path.slice(localePrefix.length + 1);
  return path;
}

/**
 * Converts a page tree to a usable menu data structure.
 * The manager only knows canonical (unprefixed) paths, so the current path
 * is stripped of its locale prefix before matching and every emitted href
 * runs through `localizeHref` so the menu links stay in the current locale.
 * @param manager The CMS manager instance
 * @param currentPath  The current path of the page (may carry a locale prefix)
 * @param localePrefix  The locale prefix of the current page, e.g. `en`
 * @param localizeHref  Maps a canonical path to the current locale's path
 * @param sectionLabel  Display name of the docs section the tree hangs
 * under. This is a plain util, not a component, so it cannot reach
 * react-intl itself; the calling component resolves the message and threads
 * it in the same way as `localizeHref`. Required on purpose: a default would
 * be an untranslated literal that silently ships whenever a new call site
 * forgets to localize.
 * @returns  The converted menu data structure and an array of indices of expanded items
 */
export function createPageTree(
  manager: ReturnType<typeof useCMSManagementContext>,
  currentPath: string,
  localePrefix: string = '',
  localizeHref: (href: string) => string = href => href,
  sectionLabel: string
) {
  let expandedItemIdx = 0; // The next index of an possibly expanded item
  const result: TMenuStructure = {
    menu: [],
    activeIdx: []
  };

  if (!manager.tree || manager.tree.length === 0) return result;

  currentPath = stripLocalePrefix(currentPath, localePrefix); // Manager paths are canonical (unprefixed)
  if (currentPath.endsWith('/')) currentPath = currentPath.slice(0, -1); // Remove trailing slash

  // Get the page tree of the doc's root. Manager paths are canonical
  // (never locale-prefixed), so comparing against the bare /docs is right
  // for every locale.
  const docsTree = manager.tree[0].children.find(
    p => manager.pagePath(p.id) === '/docs'
  );
  if (!docsTree) return result;

  const pageMap: {
    [key: string]: ReturnType<typeof useCMSManagementContext>['tree'][0];
  } = {};

  // Since the tree is not flat, we need to index all pages by their id to be able to find them later
  const indexPages = (pages: (typeof docsTree)['children']): void => {
    pages.forEach(page => {
      pageMap[page.id] = page;
      if (page.children.length > 0) indexPages(page.children);
    });
  };
  indexPages(docsTree.children);

  // Recursively build a menu item from a page
  const buildMenuItem = (pageId: string): NavMenuItem | undefined => {
    const page = pageMap[pageId];
    if (!page) return undefined;

    const href = manager.pagePath(page.id);
    const children: NavMenuItem[] = page.children
      .map(({ id }) => {
        const item = buildMenuItem(id);
        return item;
      })
      .filter((item): item is NavMenuItem => !!item);

    // Check if any item in the current page or its children is active
    // If so, add the index of the current item to the expanded item index array
    // This is used to expand the correct items in the accordion when the page is loaded
    const hasActiveChild =
      children.length > 0 &&
      children.some((child: any) => child.isActive || child.hasActiveChild);

    return {
      href: currentPath === href ? '' : localizeHref(href),
      name: page.label,
      children,
      isActive: currentPath === href,
      hasActiveChild: hasActiveChild
    };
  };

  const menuData: NavMenuSection[] = [
    {
      name: sectionLabel,
      items: docsTree.children
        .filter((child: any) => !child.deleted)
        .map(({ id }: any) => buildMenuItem(id))
        .filter((item: any): item is NavMenuItem => !!item)
    }
  ];

  expandedItemIdx--; // Decrement the expanded item index to get correct the index
  return {
    menu: menuData,
    // Since the menu is built from the inside out, the first item is the last expanded item
    // expandedIdx: result.expandedIdx.map(idx => expandedItemIdx - idx).reverse()
    activeIdx: buildActiveMenuItemIndexArray(menuData)
  };
}

/**
 *  Builds an flat array of indices of the active menu item and its parents (outer to inner, left to right)
 * @param sections  The menu data structure
 * @returns The array of indices representing the way to the active menu item
 */
export function buildActiveMenuItemIndexArray(
  sections: NavMenuSection[]
): number[] {
  let result: number[] = [];

  // Recursively build a flat array of indices of the active menu item and its parents (outer to inner, left to right)
  const findActiveMenuItem = (menu: NavMenuItem): boolean => {
    if (menu.isActive || menu.hasActiveChild) {
      const activeChildIdx = menu.children?.findIndex(
        item => item.isActive || item.hasActiveChild
      );
      if (
        activeChildIdx === undefined ||
        activeChildIdx === -1 ||
        !menu.children
      )
        return !!menu.isActive;
      result.push(activeChildIdx);
      return findActiveMenuItem(menu.children[activeChildIdx]);
    }
    return false;
  };

  for (let i = 0; i < sections.length; i++) {
    for (let j = 0; j < sections[i].items.length; j++) {
      if (findActiveMenuItem(sections[i].items[j])) {
        // Add the index of the current section and its outermost active item to the result array
        // This is necessary because the outermost menu item is not added to the result array by the function above
        result.unshift(i, j);
        return result;
      }
    }
    result = []; // Reset the result array if no active item was found in the current section
  }
  return result;
}

/**
 * Creates the breadcrumb parts for the current page.
 * The hrefs are taken from the menu structure, so they are already
 * localized when the structure was built by `createPageTree` with a
 * localize helper.
 * @param data  The menu data structure
 * @param activeIdxArray  The array of indices of the active menu item and its parents
 * @returns  The breadcrumb parts for the current page
 */
export function createBreadCrumbParts(
  data: TMenuStructure
): MainBreadcrumbPart[] {
  const parts: MainBreadcrumbPart[] = [];

  // Recursively build the breadcrumb parts by traversing the menu data structure
  const buildBreadcrumbPart = (menuItem: NavMenuItem, idx: number): boolean => {
    const child = menuItem.children?.[data.activeIdx[idx]];
    if (!child) return false;
    parts.push({
      name: child.name,
      href: child.href ?? ''
    });

    if (!child.hasActiveChild && !child.isActive) return !!child.isActive;
    return buildBreadcrumbPart(child, idx + 1);
  };

  if (data.activeIdx.length < data.activeIdx[0]) return parts;
  const activeSection = data.menu[data.activeIdx[0]];
  if (!activeSection || activeSection.items.length < data.activeIdx[1])
    return parts;
  const activeItem = activeSection.items[data.activeIdx[1]];
  // Add the first breadcrumb part
  // This is necessary because the first breadcrumb part is not added to the result array by the function above
  parts.push({
    name: activeItem.name,
    href: activeItem.href ?? ''
  });

  buildBreadcrumbPart(activeItem, 2);
  parts[parts.length - 1].isActive = true; // The last breadcrumb part is always the active one
  return parts;
}

/**
 * Gets the names of the pages adjacent to the current page.
 * The hrefs are taken from the menu structure, so they are already
 * localized when the structure was built by `createPageTree` with a
 * localize helper.
 * @param idxArray  The array of indices of the active menu item and its parents
 * @param menu  The menu data structure
 * @returns  The data of the pages adjacent to the current page
 */
export function getAdjacentPages(
  idxArray: number[],
  menu: NavMenuSection[]
): TAdjacentPages {
  const result: TAdjacentPages = {};

  /**
   * Recursively gets the adjacent page
   * @param menuItem  The current menu item
   * @param idx  The current index in the index array
   * @param parentMenuItem  The parent menu item
   */
  const getAdjacentPage = (
    menuItem: NavMenuItem,
    idx: number,
    parentMenuItem: NavMenuItem
  ) => {
    // debugger;
    //* posIdx is undefined for the last recursive call
    const posIdx = idxArray[idx];
    const activeChild = menuItem.children?.[posIdx];
    if (activeChild) getAdjacentPage(activeChild, idx + 1, menuItem);

    if (!result.prev) {
      let prev;
      if (posIdx > 0) {
        // prev = menuItem.children?.[posIdx - 1];
        prev = menuItem;
      } else {
        // If the current item is already the most outer item, get the previous item via the section
        if (
          posIdx === undefined &&
          parentMenuItem.children &&
          idxArray[idxArray.length - 1] > 0
        ) {
          // If there's a previous sibling of the item, get the most inner child of that sibling
          const prevSibling =
            parentMenuItem.children[idxArray[idxArray.length - 1] - 1];
          let lastChild =
            prevSibling.children?.[prevSibling.children.length - 1] ??
            prevSibling;
          while (
            lastChild &&
            lastChild.children &&
            lastChild.children.length > 0
          ) {
            lastChild = lastChild.children?.[lastChild.children.length - 1];
          }
          prev = lastChild;
        } else if (idx > 2) {
          // If the current item is the first child of the parent item, just get the parent item
          // (We check for idx > 2 because the the first idx's parent is always a section)
          prev = parentMenuItem;
        }
      }
      if (prev) {
        result.prev = {
          name: prev.name,
          href: prev.href
        };
      }
    }
    if (!result.next) {
      if (
        posIdx === undefined &&
        menuItem.children &&
        menuItem.children.length > 0
      ) {
        // If the current item has children, get the first child (most inner item only)
        const firstChild = menuItem.children[0];
        result.next = {
          name: firstChild.name,
          href: firstChild.href
        };
      } else if (parentMenuItem.children) {
        // If the parent item has a next sibling, get that sibling
        const parentPosIdx = Math.max(0, idxArray[idx - 1]);
        if (parentPosIdx < parentMenuItem.children.length - 1) {
          const next = parentMenuItem.children[parentPosIdx + 1];
          if (next) {
            result.next = {
              name: next.name,
              href: next.href
            };
          }
        }
      }
    }
  };

  if (menu.length >= idxArray[0]) {
    // We box the section in an MenuItem object so we can feed the recursive function with it
    const boxedSection = {
      href: '',
      name: menu[idxArray[0]].name ?? '',
      children: menu[idxArray[0]].items
    };

    // Changed idxArray[1] to idxArray[0] and idx to 1 instead of 2
    getAdjacentPage(menu[idxArray[0]].items[idxArray[1]], 2, boxedSection);
  }
  return result;
}

/**
 * Gets the accordion indices that must be expanded so the active menu item
 * is visible.
 *
 * The numbering MUST mirror how the items render (generateMenuItem in
 * page-directory): Chakra's Accordion numbers every AccordionItem in DOM
 * order, nested ones included, and only items that render as an accordion
 * (they have expandable children) consume an index. Leaves and section
 * headers consume nothing. The previous implementation only advanced the
 * counter while descending the active path, so any sibling accordion before
 * the active one shifted every following index and the wrong item (or none)
 * expanded after navigating.
 * @param menu  The menu data structure
 * @param isMobile  Must match the render-side flag: on mobile, section
 * children count as expandable too.
 * @returns  The indices of the expanded menu items
 */
export function getExpandedMenuItemIndices(
  menu: NavMenuSection[],
  isMobile = false
): number[] {
  const expandedIdx: number[] = [];
  let idx = 0;

  const walk = (item: NavMenuItem): void => {
    const hasChildren =
      !!item.children &&
      item.children.length > 0 &&
      (isMobile || item.children.some(child => !child.isSection));

    if (!hasChildren) return;

    const myIdx = idx++;
    if (item.isActive || item.hasActiveChild) expandedIdx.push(myIdx);
    // Every expandable descendant consumes an index even inside a collapsed
    // panel (Chakra keeps panel content mounted), so always recurse.
    for (const child of item.children!) walk(child);
  };

  for (const section of menu) {
    for (const item of section.items) walk(item);
  }

  return expandedIdx;
}

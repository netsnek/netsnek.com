import { ColorMode, DarkMode, LightMode, useColorMode } from 'jaen';
import { CheckIcon, MoonIcon, SunIcon } from '../components/icons/chakra';
import {
  Button,
  ButtonProps,
  Icon,
  IconProps,
  Menu,
  MenuRootProps
} from '@chakra-ui/react';
import { FC, ReactNode, memo } from 'react';
import { useIntl } from 'react-intl';

interface IThemeChooserProps {
  menuProps?: Partial<MenuRootProps>;
  buttonProps?: Partial<ButtonProps>;
  buttonIconProps?: IconProps;
  buttonContent?: ReactNode;
  forceMenuColorMode?: ColorMode;
}

/**
 * The theme toggle component including a menu with the available theme options.
 */
const ThemeChooser: FC<IThemeChooserProps> = ({
  menuProps,
  buttonProps,
  buttonIconProps,
  buttonContent,
  forceMenuColorMode
}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const isLightColorMode = colorMode === 'light';

  const menuList = (() => {
    // No portal, as in v2. DarkMode and LightMode are DOM elements in v3, and
    // a portal would drop the list outside the one wrapping it here, which is
    // the whole of forceMenuColorMode.
    const list = (
      <Menu.Positioner>
        <Menu.Content>
          <MemoizedColorModeMenuItems
            currentColorMode={colorMode}
            toggleColorMode={toggleColorMode}
          />
        </Menu.Content>
      </Menu.Positioner>
    );
    if (!forceMenuColorMode) {
      return list;
    }

    if (forceMenuColorMode === 'dark') {
      return <DarkMode>{list}</DarkMode>;
    }
    return <LightMode>{list}</LightMode>;
  })();

  return (
    <Menu.Root
      id="navbar-color-mode-menu"
      {...menuProps}
      lazyMount
      unmountOnExit
      positioning={{
        placement: 'top'
      }}
    >
      <Menu.Trigger asChild>
        <Button
          size="sm"
          flexGrow={1}
          // ghost-hover is one of the site's own button variants
          // (styles/theme/recipes.ts). The prop only admits v3's built-in names
          // because the site does not run `chakra typegen`, so the recipe's own
          // names have to be asserted through.
          variant={'ghost-hover' as ButtonProps['variant']}
          textAlign="left"
          color="shared.text.default"
          {...buttonProps}
        >
          <Icon
            as={isLightColorMode ? SunIcon : MoonIcon}
            {...buttonIconProps}
          />
          {buttonContent}
        </Button>
      </Menu.Trigger>
      {menuList}
    </Menu.Root>
  );
};

/**
 * The selected-state check compares against the chakra color mode, so the
 * mode has to be a stable id and cannot be derived from the (translated)
 * caption any more. Label and id are therefore separate.
 */
const colorModes = [
  { id: 'light', messageId: 'ThemeLight', defaultMessage: 'Hell' },
  { id: 'dark', messageId: 'ThemeDark', defaultMessage: 'Dunkel' },
  { id: 'system', messageId: 'ThemeSystem', defaultMessage: 'System' }
] as const;
//TODO: Fix system color mode toggle (doesnt work - doesnt stay in sync with system)
/**
 * Memoized color mode menu items.
 */
const MemoizedColorModeMenuItems = memo<{
  currentColorMode: ColorMode;
  toggleColorMode: () => void;
}>(
  ({ currentColorMode, toggleColorMode }) => {
    const intl = useIntl();

    return (
      <>
        {colorModes.map((mode, i) => {
          const isCurrentColorMode = currentColorMode === mode.id;
          return (
            <Menu.Item
              key={i}
              position="relative"
              disabled={isCurrentColorMode}
              onSelect={!isCurrentColorMode ? toggleColorMode : undefined}
              value="item-0"
            >
              {intl.formatMessage({
                id: mode.messageId,
                defaultMessage: mode.defaultMessage
              })}
              {isCurrentColorMode && (
                <CheckIcon
                  position="absolute"
                  right={3}
                  top="50%"
                  transform="translateY(-50%)"
                  boxSize="10px"
                />
              )}
            </Menu.Item>
          );
        })}
      </>
    );
  },
  (prevProps, nextProps) =>
    prevProps.currentColorMode === nextProps.currentColorMode
);

export default ThemeChooser;

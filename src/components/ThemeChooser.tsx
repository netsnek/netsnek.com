import { DarkMode, LightMode, useColorMode } from 'jaen';
import { CheckIcon, MoonIcon, SunIcon } from '../components/icons/chakra';
import {
  Button,
  ButtonProps,
  ColorMode,
  Icon,
  IconProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuProps
} from '@chakra-ui/react';
import { FC, ReactNode, memo } from 'react';
import { useIntl } from 'react-intl';

interface IThemeChooserProps {
  menuProps?: Partial<MenuProps>;
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
    const list = (
      <MenuList>
        <MemoizedColorModeMenuItems
          currentColorMode={colorMode}
          toggleColorMode={toggleColorMode}
        />
      </MenuList>
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
    <Menu id="navbar-color-mode-menu" placement="top" {...menuProps} isLazy>
      <MenuButton
        as={Button}
        size="sm"
        flexGrow={1}
        variant="ghost-hover"
        textAlign="left"
        color="shared.text.default"
        {...buttonProps}
      >
        <Icon as={isLightColorMode ? SunIcon : MoonIcon} {...buttonIconProps} />
        {buttonContent}
      </MenuButton>
      {menuList}
    </Menu>
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
            <MenuItem
              key={i}
              position="relative"
              disabled={isCurrentColorMode}
              onClick={!isCurrentColorMode ? toggleColorMode : undefined}
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
            </MenuItem>
          );
        })}
      </>
    );
  },
  (prevProps, nextProps) =>
    prevProps.currentColorMode === nextProps.currentColorMode
);

export default ThemeChooser;

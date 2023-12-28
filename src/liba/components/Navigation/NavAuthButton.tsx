import {
    Button,
    ButtonProps,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Tooltip
  } from '@chakra-ui/react'
  import {Link, navigate} from 'gatsby'
  import {FaUser} from '@react-icons/all-files/fa/FaUser'
  import {useAuthenticationContext} from '@atsnek/jaen'
  import {forwardRef} from 'react'
  
  export interface NavAuthButtonProps extends ButtonProps {}
  
  export const NavAuthButton: React.FC<NavAuthButtonProps> = props => {
    const {user, openLoginModal, logout} = useAuthenticationContext()
  
    const ResponsiveButton = forwardRef(
      (props: ButtonProps, ref: React.Ref<HTMLButtonElement>) => (
        const {user, openLoginModal, logout} = useAuthenticationContext()
      )
    )
  
    if (!user) {
      return (
        <Tooltip label="Login">
          <ResponsiveButton {...props} />
        </Tooltip>
      )
    }
  
    return (
      <Menu>
        <Tooltip label="Mein Konto">
          <MenuButton as={ResponsiveButton} {...props} />
        </Tooltip>
  
        <MenuList>
          <MenuDivider />
          <MenuItem
            onClick={() => {
              void logout()
            }}>
            Abmelden
          </MenuItem>
        </MenuList>
      </Menu>
    )
  }
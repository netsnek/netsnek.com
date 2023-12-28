import { useAuthenticationContext } from "@atsnek/jaen";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Stack,
  useDisclosure,
  VStack,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { navigate } from "gatsby";
// import {Logo} from '../../common/assets/Logo'
import Logo from "../../gatsby-plugin-jaen/components/Logo";
import { useContactModal } from "../../services/contact";
// import {BottomNavLinks} from './NavLinks'

export const MobileHambuger: React.FC<{
  pathname: string;
}> = ({ pathname }) => {
  const { isOpen, onToggle } = useDisclosure();

  const contactModal = useContactModal();

  const { user, openLoginModal, logout } = useAuthenticationContext();

  return (
    <>
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onToggle}
        icon={
          isOpen ? <CloseIcon /> : <HamburgerIcon />
        }
        //variant={"ghost"}
        aria-label="Menu"
      />

      <Drawer placement="left" onClose={onToggle} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderRightRadius="lg">
          <DrawerCloseButton />
          <DrawerHeader>
            {/* <Image
                onClick={() => {
                  void navigate('/')
                }}
                h=".875rem"
                w="10rem"
                src="/images/red_logo.svg"
              /> */}
            {/* <Logo
              //maxWidth='20rem'
              //height="auto"
              height=".875rem"
              width="10rem"
              //transform="scale(0.5)"
              objectFit="contain"
              // display={mode === 'website' ? 'block' : 'none'}
              cursor="pointer"
              onClick={() => {
                void navigate('/')
              }}
              color="#E3000F"
              alt="logo"
            /> */}
          </DrawerHeader>
          <Divider />
          <DrawerBody>
            <Stack spacing="8" pt="4">
              {/* <BottomNavLinks
                pathname={pathname}
                childrenTextAlign="left"
                w="full"
                px="2"
                zIndex="5"
                spacing="6"
                fontSize="md"
                onClick={onToggle}
              /> */}

              <VStack
                direction="row"
                justify="space-between"
                align="center"
                spacing="4"
                mt="4"
              >
                <Tooltip label="Login">
                  <Button
                    w="full"
                    //variant="outline"
                    leftIcon={<FaUser />}
                    onClick={openLoginModal}
                  >
                    Anmelden
                  </Button>
                </Tooltip>
              </VStack>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

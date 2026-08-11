import {Box, BoxProps} from '@chakra-ui/react'
import {FC, MouseEventHandler} from 'react'

export type THamburgerMenuIconStylerProps = BoxProps

interface IHamburgerMenuIconProps {
  handleClick?: (isOpen: boolean) => void
  wrapperProps?: BoxProps
  iconProps?: BoxProps
}

/**
 * Component for a reactive hamburger icon.
 */
const HamburgerMenuIcon: FC<IHamburgerMenuIconProps> = ({
  handleClick,
  wrapperProps,
  iconProps
}) => {
  const props = {
    css: {
      '&.open': {
        '& > div:nth-of-type(1)': {
          top: '50%',
          transform: 'rotate(45deg)'
        },
        '& > div:nth-of-type(2)': {
          opacity: 0
        },
        '& > div:nth-of-type(3)': {
          top: '50%',
          transform: 'rotate(-45deg)'
        }
      },
      '& > div': {
        transition:
          'transform 0.2s cubic-bezier(0.68, 0, 0.27, 1), opacity 0.2s cubic-bezier(0.68, 0, 0.27, 1), top 0.2s cubic-bezier(0.68, 0, 0.27, 1), background-color 0.2s cubic-bezier(0.68, 0, 0.27, 1)'
      },
      ...wrapperProps?.css
    },
    // The trailing spread lets a caller's own css win outright over the merge
    // above instead of extending it. Same as under v2's __css; kept so the
    // rendered styles do not shift, not because it is what one would write.
    ...wrapperProps
  }

  return (
    <Box
      position="relative"
      rounded="full"
      boxSize="100%"
      //bg="brand.500"
      // _hover={{
      //   backgroundColor: 'gray.500'
      // }}
      // handleClick is declared as (isOpen: boolean) but has always been wired
      // straight to onClick, so it receives the click event, never a flag. The
      // callers ignore the argument; unwinding that is a behaviour change.
      onClick={handleClick as unknown as MouseEventHandler<HTMLDivElement>}
      {...props}
      >
      <Box
        position="absolute"
        top="34%"
        left="25%"
        w="50%"
        h="4%"
        backgroundColor="topNav.mobile.hamburger.bgColor"
        borderRadius="full"
        {...iconProps}
      />
      <Box
        position="absolute"
        top="49%"
        left="25%"
        w="50%"
        h="4%"
        backgroundColor="topNav.mobile.hamburger.bgColor"
        borderRadius="full"
        {...iconProps}
      />
      <Box
        position="absolute"
        top="64%"
        left="25%"
        w="50%"
        h="4%"
        backgroundColor="topNav.mobile.hamburger.bgColor"
        borderRadius="full"
        {...iconProps}
      />
    </Box>
  )
}

export default HamburgerMenuIcon

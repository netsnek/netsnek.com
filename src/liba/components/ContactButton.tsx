import {forwardRef, HTMLChakraProps, ThemingProps} from '@chakra-ui/system'

import {ButtonOptions} from '@chakra-ui/button'

// import { useButtonGroup } from "@chakra-ui/button/dist/button-context"
// import { ButtonOptions } from "@chakra-ui/button/dist/button-types"
// import { ButtonSpinner } from "@chakra-ui/button/dist/button-spinner"

// import { ButtonIcon } from "@chakra-ui/button/dist/button-icon"
// import { useButtonType } from "@chakra-ui/button/dist/use-button-type"

import {Button} from '@chakra-ui/react'
import { FC } from 'react';
import { useContactModal } from '../services/contact';

export interface ContactButtonProps
  extends HTMLChakraProps<'button'>,
    ButtonOptions,
    ThemingProps<'Button'> {
      inverted: boolean;
    }

/**
 * Button component is used to trigger an action or event, such as submitting a form, opening a Dialog, canceling an action, or performing a delete operation.
 *
 * @see Docs https://chakra-ui.com/docs/components/button
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/button/
 */
export const ContactButton: React.ForwardRefRenderFunction<HTMLButtonElement, ContactButtonProps> = (
   (props, ref) => {
     const { inverted, ...rest } = props;
    const contactModal = useContactModal();

  const handleOnContactClick = () => {
    contactModal.onOpen({
      meta: {}
    });
  };

  return (
    <Button
      filter="drop-shadow(1px 2px 2px rgb(0 0 0 / 0.1))"
      borderRadius="full"
      onClick={handleOnContactClick}
      fontSize="sm"
      fontWeight="semibold"
      bg={!inverted ? "brand.500" : "white"} // Conditionally setting the background color
      color={!inverted ? "white" : "black"} // Conditionally setting the text color
      _hover={{
         bg: !inverted ? undefined : 'brand.500' // Conditionally setting hover background color
      }}
      {...rest}
    >
      Kontaktiere Uns
    </Button>
  );
  }
)

export default ContactButton;
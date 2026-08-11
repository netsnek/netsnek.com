import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Flex,
  HStack,
  Heading,
  IconButton,
  Input,
  Text,
  Textarea,
  useEditableContext
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '../components/icons/chakra';
import { useIntl } from 'react-intl';

export const TextControl: React.FC<{
  text?: string;
  onSubmit: (text: string) => void;
  type: 'heading' | 'text';
  editable: boolean;
}> = props => {
  /* Here's a custom control */
  function EditableControls() {
    const intl = useIntl();
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps
    } = useEditableContext();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          {...getSubmitButtonProps()}
          // This button confirms the edit; it was mislabelled "Edit".
          aria-label={intl.formatMessage({
            id: 'EditableSubmitAriaLabel',
            defaultMessage: 'Speichern'
          })}
        >
          <CheckIcon />
        </IconButton>
        <IconButton
          variant="outline"
          {...getCancelButtonProps()}
          aria-label={intl.formatMessage({
            id: 'EditableCancelAriaLabel',
            defaultMessage: 'Abbrechen'
          })}
        >
          <CloseIcon />
        </IconButton>
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          variant="ghost"
          size="sm"
          {...getEditButtonProps()}
          aria-label={intl.formatMessage({
            id: 'EditableEditAriaLabel',
            defaultMessage: 'Bearbeiten'
          })}
        >
          <EditIcon />
        </IconButton>
      </Flex>
    );
  }

  return (
    <Editable.Root
      key={props.text}
      as={HStack}
      textAlign={'left'}
      defaultValue={props.text}
      onValueCommit={props.onSubmit}
      fontSize={props.type === 'heading' ? '2xl' : 'xl'}
      fontWeight={props.type === 'heading' ? 'bold' : '400'}
    >
      <Editable.Preview as={props.type === 'heading' ? Heading : Text} />
      {/* Here is the custom input */}
      {props.type === 'heading' ? (
        <Input as={EditableInput} fontSize="2xl" fontWeight="bold" />
      ) : (
        <Textarea
          as={EditableTextarea}
          fontSize="xl"
          color="gray.600"
          fontWeight="400"
        />
      )}
      {props.editable && <EditableControls />}
    </Editable.Root>
  );
};

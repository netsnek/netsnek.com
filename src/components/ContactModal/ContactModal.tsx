import {
  Button,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
  Field,
  Dialog,
  Portal
} from '@chakra-ui/react';
import React from 'react';
import { useIntl } from 'react-intl';
import { Controller, useForm } from 'react-hook-form';
import { CheckboxStyled } from './CheckboxStyled';
import { DialogCloseButton } from '../DialogCloseButton';

export interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;

  agreeToTerms: boolean;
}

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;

  onSubmit: (data: ContactFormValues) => Promise<void>;

  fixedValues?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };

  defaultValues?: {
    message?: string;
  };
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  fixedValues,
  defaultValues
}) => {
  const intl = useIntl();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>({});

  React.useEffect(() => {
    reset(fixedValues);
  }, [fixedValues]);

  React.useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen]);

  return (
    <Dialog.Root
      open={isOpen}
      // v2 was `size="2xl"`, and the dialog size names all shifted one step up
      // the sizes scale in v3: the recipe maps xs->sizes.sm, sm->md, md->lg,
      // lg->2xl, xl->4xl. v2's 2xl was maxW 42rem; the codemod's `xl` is
      // sizes.4xl = 56rem, 224px wider. `lg` is the size that resolves to the
      // same 42rem v2 painted.
      size="lg"
      preventScroll={false}
      onOpenChange={e => {
        if (!e.open) {
          onClose();
        }
      }}
    >
      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content>
            <form
              onSubmit={event => {
                void handleSubmit(onSubmit)(event);
              }}
            >
              {/* Was a childless <Dialog.CloseTrigger/>, which draws no X at
                  all. See DialogCloseButton for what v2 painted here. */}
              <DialogCloseButton />
              <Dialog.Body
                p={{
                  base: 4,
                  md: 8,
                  lg: 12,
                  xl: 16
                }}
              >
                <Stack gap="6">
                  <Heading
                    as="h2"
                    size={{
                      base: 'md',
                      md: 'lg'
                    }}
                  >
                    {intl.formatMessage({
                      id: 'ContactModalHeading',
                      defaultMessage: 'Kontaktieren Sie uns'
                    })}
                  </Heading>

                  {/*
                    `size="b2015"` stood here and is dropped, not translated:
                    neither the site's v2 Text theme nor Chakra's own defined
                    any Text sizes, so it resolved to nothing and the paragraph
                    has always rendered at the inherited size.
                  */}
                  <Text>
                    {intl.formatMessage({
                      id: 'ContactModalIntro',
                      defaultMessage:
                        'Wir freuen uns über Ihre Nachricht und werden uns schnellstmöglich bei Ihnen melden.'
                    })}
                  </Text>

                  <HStack>
                    <Field.Root required invalid={!!errors.firstName}>
                      <Field.Label htmlFor="firstName" fontSize="sm">
                        {intl.formatMessage({
                          id: 'ContactModalFirstNameLabel',
                          defaultMessage: 'Vorname'
                        })}
                      </Field.Label>
                      <Input
                        id="firstName"
                        placeholder={intl.formatMessage({
                          id: 'ContactModalFirstNamePlaceholder',
                          defaultMessage: 'Max'
                        })}
                        {...register('firstName', {
                          required: true
                        })}
                        disabled={!!fixedValues?.firstName}
                        _focus={{
                          borderColor: 'brand.500'
                        }}
                      />

                      <Field.ErrorText fontSize="sm">
                        {errors.firstName?.message}
                      </Field.ErrorText>
                    </Field.Root>
                    <Field.Root required invalid={!!errors.lastName}>
                      <Field.Label htmlFor="lastName" fontSize="sm">
                        {intl.formatMessage({
                          id: 'ContactModalLastNameLabel',
                          defaultMessage: 'Nachname'
                        })}
                      </Field.Label>
                      <Input
                        id="lastName"
                        placeholder={intl.formatMessage({
                          id: 'ContactModalLastNamePlaceholder',
                          defaultMessage: 'Mustermann'
                        })}
                        {...register('lastName', {
                          required: true
                        })}
                        disabled={!!fixedValues?.lastName}
                        _focus={{
                          borderColor: 'brand.500'
                        }}
                      />

                      <Field.ErrorText fontSize="sm">
                        {errors.lastName?.message}
                      </Field.ErrorText>
                    </Field.Root>
                  </HStack>
                  <HStack>
                    <Field.Root required invalid={!!errors.email}>
                      <Field.Label htmlFor="email" fontSize="sm">
                        {intl.formatMessage({
                          id: 'ContactModalEmailLabel',
                          defaultMessage: 'E-Mail'
                        })}
                      </Field.Label>
                      <Input
                        id="email"
                        placeholder={intl.formatMessage({
                          id: 'ContactModalEmailPlaceholder',
                          defaultMessage: 'max.mustermann@example.com'
                        })}
                        type="email"
                        {...register('email', {
                          required: true
                        })}
                        disabled={!!fixedValues?.email}
                        _focus={{
                          borderColor: 'brand.500'
                        }}
                      />

                      <Field.ErrorText fontSize="sm">
                        {errors.email?.message}
                      </Field.ErrorText>
                    </Field.Root>
                    <Field.Root invalid={!!errors.email}>
                      <Field.Label htmlFor="phone" fontSize="sm">
                        {intl.formatMessage({
                          id: 'ContactModalPhoneLabel',
                          defaultMessage: 'Telefonnummer'
                        })}
                      </Field.Label>
                      <Input
                        id="phone"
                        placeholder={intl.formatMessage({
                          id: 'ContactModalPhonePlaceholder',
                          defaultMessage: '+43 123 456 789'
                        })}
                        type="phone"
                        {...register('phone', {
                          required: false
                        })}
                        disabled={!!fixedValues?.phone}
                        _focus={{
                          borderColor: 'brand.500'
                        }}
                      />

                      <Field.ErrorText fontSize="sm">
                        {errors.email?.message}
                      </Field.ErrorText>
                    </Field.Root>
                  </HStack>
                  <Field.Root required invalid={!!errors.message}>
                    <Field.Label htmlFor="message" fontSize="sm">
                      {intl.formatMessage({
                        id: 'ContactModalMessageLabel',
                        defaultMessage: 'Wie können wir Ihnen helfen?'
                      })}
                    </Field.Label>
                    <Textarea
                      id="message"
                      placeholder={intl.formatMessage({
                        id: 'ContactModalMessagePlaceholder',
                        defaultMessage: 'Nachricht'
                      })}
                      defaultValue={defaultValues?.message}
                      {...register('message', { required: true })}
                      _focus={{
                        borderColor: 'brand.500'
                      }}
                    />

                    <Field.ErrorText fontSize="sm">
                      {errors.message?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  <Field.Root required invalid={!!errors.agreeToTerms}>
                    <Controller
                      render={({ field }) => (
                        <CheckboxStyled
                          ref={field.ref}
                          onBlur={field.onBlur}
                          onChange={field.onChange}
                          checked={field.value}
                          roundedFull
                        >
                          <Text
                            fontSize={{
                              base: 'xs',
                              md: 'sm'
                            }}
                          >
                            {intl.formatMessage({
                              id: 'ContactModalTerms',
                              defaultMessage:
                                'Ich bin damit einverstanden, dass meine Angaben zur Kontaktaufnahme und für Rückfragen gespeichert werden.'
                            })}
                          </Text>
                        </CheckboxStyled>
                      )}
                      name="agreeToTerms"
                      control={control}
                      rules={{
                        required: intl.formatMessage({
                          id: 'ContactModalTermsRequired',
                          defaultMessage:
                            'Bitte bestätigen Sie die Bedingungen zur Kontaktaufnahme'
                        })
                      }}
                    />
                    <Field.ErrorText fontSize="sm">
                      {errors.agreeToTerms?.message}
                    </Field.ErrorText>
                  </Field.Root>
                </Stack>
              </Dialog.Body>

              <Dialog.Footer borderTop="1px solid" color="gray.200">
                <Button
                  loading={isSubmitting}
                  type="submit"
                  // py="7 !important"
                >
                  {intl.formatMessage({
                    id: 'ContactModalSubmit',
                    defaultMessage: 'Senden'
                  })}
                </Button>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

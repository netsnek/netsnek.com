import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  Textarea
} from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { Controller, useForm } from 'react-hook-form'
import { CheckboxStyled } from './CheckboxStyled'

export interface ContactFormValues {
  firstName: string
  lastName: string
  email: string
  phone?: string
  message: string

  agreeToTerms: boolean
}

export interface ContactModalProps {
  isOpen: boolean
  onClose: () => void

  onSubmit: (data: ContactFormValues) => Promise<void>

  fixedValues?: {
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
  }

  defaultValues?: {
    message?: string
  }
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  fixedValues,
  defaultValues
}) => {
  const intl = useIntl()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>({})

  React.useEffect(() => {
    reset(fixedValues)
  }, [fixedValues])

  React.useEffect(() => {
    if (!isOpen) {
      reset()
    }
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      blockScrollOnMount={false}
    >
      <ModalOverlay />

      <ModalContent>
        <form
          onSubmit={(event) => {
            void handleSubmit(onSubmit)(event)
          }}
        >
          <ModalCloseButton />
          <ModalBody
            p={{
              base: 4,
              md: 8,
              lg: 12,
              xl: 16
            }}
          >
            <Stack spacing="6">
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

              <Text size="b2015">
                {intl.formatMessage({
                  id: 'ContactModalIntro',
                  defaultMessage:
                    'Wir freuen uns über Ihre Nachricht und werden uns schnellstmöglich bei Ihnen melden.'
                })}
              </Text>

              <HStack>
                <FormControl isRequired isInvalid={!!errors.firstName}>
                  <FormLabel htmlFor="firstName" fontSize="sm">
                    {intl.formatMessage({
                      id: 'ContactModalFirstNameLabel',
                      defaultMessage: 'Vorname'
                    })}
                  </FormLabel>
                  <Input
                    id="firstName"
                    placeholder={intl.formatMessage({
                      id: 'ContactModalFirstNamePlaceholder',
                      defaultMessage: 'Max'
                    })}
                    {...register('firstName', {
                      required: true
                    })}
                    isDisabled={!!fixedValues?.firstName}
                    focusBorderColor= "brand.500"
                    _focus={{
                      borderColor: 'brand.500'
                    }}
                  />

                  <FormErrorMessage fontSize="sm">
                    {errors.firstName?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!errors.lastName}>
                  <FormLabel htmlFor="lastName" fontSize="sm">
                    {intl.formatMessage({
                      id: 'ContactModalLastNameLabel',
                      defaultMessage: 'Nachname'
                    })}
                  </FormLabel>
                  <Input
                    id="lastName"
                    placeholder={intl.formatMessage({
                      id: 'ContactModalLastNamePlaceholder',
                      defaultMessage: 'Mustermann'
                    })}
                    {...register('lastName', {
                      required: true
                    })}
                    isDisabled={!!fixedValues?.lastName}
                    focusBorderColor= "brand.500"
                    _focus={{
                      borderColor: 'brand.500'
                    }}
                  />

                  <FormErrorMessage fontSize="sm">
                    {errors.lastName?.message}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
              <HStack>
                <FormControl isRequired isInvalid={!!errors.email}>
                  <FormLabel htmlFor="email" fontSize="sm">
                    {intl.formatMessage({
                      id: 'ContactModalEmailLabel',
                      defaultMessage: 'E-Mail'
                    })}
                  </FormLabel>
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
                    isDisabled={!!fixedValues?.email}
                    focusBorderColor= "brand.500"
                    _focus={{
                      borderColor: 'brand.500'
                    }}
                  />

                  <FormErrorMessage fontSize="sm">
                    {errors.email?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel htmlFor="phone" fontSize="sm">
                    {intl.formatMessage({
                      id: 'ContactModalPhoneLabel',
                      defaultMessage: 'Telefonnummer'
                    })}
                  </FormLabel>
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
                    isDisabled={!!fixedValues?.phone}
                    focusBorderColor= "brand.500"
                    _focus={{
                      borderColor: 'brand.500'
                    }}
                  />

                  <FormErrorMessage fontSize="sm">
                    {errors.email?.message}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
              <FormControl isRequired isInvalid={!!errors.message}>
                <FormLabel htmlFor="message" fontSize="sm">
                  {intl.formatMessage({
                    id: 'ContactModalMessageLabel',
                    defaultMessage: 'Wie können wir Ihnen helfen?'
                  })}
                </FormLabel>
                <Textarea
                  id="message"
                  placeholder={intl.formatMessage({
                    id: 'ContactModalMessagePlaceholder',
                    defaultMessage: 'Nachricht'
                  })}
                  defaultValue={defaultValues?.message}
                  {...register('message', { required: true })}
                  focusBorderColor= "brand.500"
                  _focus={{
                    borderColor: 'brand.500'
                  }}
                />

                <FormErrorMessage fontSize="sm">
                  {errors.message?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.agreeToTerms}>
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
                <FormErrorMessage fontSize="sm">
                  {errors.agreeToTerms?.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter borderTop="1px solid" color="gray.200">
            <Button
              isLoading={isSubmitting}
              type="submit"
              // py="7 !important"
            >
              {intl.formatMessage({
                id: 'ContactModalSubmit',
                defaultMessage: 'Senden'
              })}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

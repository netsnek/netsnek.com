import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container as ChakraContainer,
  Checkbox,
  CloseButton,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Progress,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Control, Controller, SubmitHandler, useForm } from 'react-hook-form';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles'; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { Container, Engine } from 'tsparticles-engine';
import Logo from '../components/Logo';
import { JaenFullLogo, Link, PasswordField } from 'gatsby-plugin-jaen';
import { FaArrowLeft } from '@react-icons/all-files/fa/FaArrowLeft';
import { FaEye } from '@react-icons/all-files/fa/FaEye';
import { FaEyeSlash } from '@react-icons/all-files/fa/FaEyeSlash';
import zxcvbn from 'zxcvbn';

import { PageConfig, PageProps } from 'jaen';
import { sq } from '@/clients/signup';

const Page: React.FC<PageProps> = () => {
  const [alert, setAlert] = useState<{
    status: 'error' | 'success' | 'info';
    message: string | JSX.Element;
    description?: string;
  } | null>(null);

  const resetAlert = () => {
    setAlert(null);
  };

  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
    // await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    []
  );

  return (
    <Box pos="relative" id="coco">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: true,
          background: {
            color: {
              value: useColorModeValue('#F6F7FA', '#F77F00')
            }
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push'
              },
              onHover: {
                enable: true,
                mode: 'repulse'
              },
              resize: true
            },
            modes: {
              push: {
                quantity: 4
              },
              repulse: {
                distance: 200,
                duration: 0.4
              }
            }
          },
          particles: {
            color: {
              value: useColorModeValue('#F77F00', '#FFFFFF')
            },
            links: {
              color: useColorModeValue('#F77F00', '#FFFFFF'),
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce'
              },
              random: false,
              speed: 1,
              straight: false
            },
            number: {
              density: {
                enable: true,
                area: 800
              },
              value: 80
            },
            opacity: {
              value: 0.5
            },
            shape: {
              type: 'circle'
            },
            size: {
              value: { min: 1, max: 5 }
            }
          },
          detectRetina: true
        }}
      />
      <Box pos="relative">
        <ChakraContainer
          maxW="2xl"
          py={{ base: '6', md: '12' }}
          px={{ base: '4', sm: '8' }}
        >
          <Stack spacing="8">
            <Stack spacing="6">
              <HStack justify="center">
                <Link as={Button} leftIcon={<FaArrowLeft />} to="/">
                  Zurück zur Webseite
                </Link>
              </HStack>
              <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                <Heading size={{ base: 'xs', md: 'sm' }}>
                  Erstelle deinen Account
                </Heading>
                <Text>
                  Bereits registriert? <Link to="/login">Anmelden</Link>
                </Text>
              </Stack>
            </Stack>
            {alert && (
              <Alert status={alert.status}>
                <AlertIcon />
                <Box w="full">
                  <AlertTitle>{alert.message}</AlertTitle>
                  <AlertDescription>{alert.description}</AlertDescription>
                </Box>
                <CloseButton
                  alignSelf="flex-start"
                  position="relative"
                  right={-1}
                  top={-1}
                  onClick={resetAlert}
                />
              </Alert>
            )}
            <Box
              py={{ base: '2', sm: '8' }}
              px={{ base: '4', sm: '10' }}
              bg="bg.surface"
              boxShadow={'md'}
              borderRadius={'xl'}
            >
              <SignupForm
                welcomeText={`Willkommen bei Netsnek!\n\nWerde Teil unseres Netzwerks und teile deine Expertise mit der Welt.`}
              />
            </Box>
            <JaenFullLogo height="12" width="auto" />
          </Stack>
        </ChakraContainer>
      </Box>
    </Box>
  );
};

interface SignupFormProps {
  welcomeText: string;
}

interface SignupFormData {
  email: string;
  password: string;
  username: string;
  details: {
    firstName: string;
    lastName: string;
  };
  terms: boolean;
}

enum SignupFormStep {
  Email,
  Password,
  Username,
  Details,
  Terms,
  Complete
}

const SignupForm: React.FC<SignupFormProps> = ({ welcomeText }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    reset,
    control,
    setFocus,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful }
  } = useForm<SignupFormData>();

  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInput, setShowInput] = useState(false);

  const [alert, setAlert] = useState<{
    status: 'error' | 'success' | 'info';
    message: string | JSX.Element;
    description?: string;
  } | null>(null);

  let timer = useRef<NodeJS.Timeout>();

  const completeTypewriterAnimation = () => {
    setDisplayText(welcomeText);
    clearTimeout(timer.current);
    setShowInput(true);
  };

  useEffect(() => {
    if (currentIndex < welcomeText.length) {
      timer.current = setTimeout(() => {
        setDisplayText(prevText => prevText + welcomeText[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 25); // Adjust the speed by changing the delay (e.g., 100ms for 10 characters per second)

      return () => clearTimeout(timer.current);
    } else {
      // Typewriter animation is complete
      completeTypewriterAnimation();
    }
  }, [currentIndex, welcomeText]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        // End of typewriter animation
        completeTypewriterAnimation();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const [step, setStep] = useState<SignupFormStep>(SignupFormStep.Email);

  // Validation rules for the email field

  const emailValidationRules = {
    required: 'Bitte fülle dieses Feld aus.',

    pattern: {
      value: /^\S+@\S+$/i,

      message: 'Bitte gib eine gültige E-Mail-Adresse ein, die ein "@" enthält.'
    },

    validate: (value: string) => {
      const disallowedSymbols = [
        '*',
        '!',
        '#',
        '$',
        '%',
        '^',
        '&',
        '(',
        ')',
        '=',
        '+',
        '{',
        '}',
        '[',
        ']',
        ':',
        ';',
        '"',
        "'",
        '<',
        '>',
        ',',
        '?',
        '/',
        '\\',
        '|'
      ];

      for (const symbol of disallowedSymbols) {
        if (value.includes(symbol)) {
          return `Die E-Mail-Adresse darf das Symbol "${symbol}" nicht enthalten.`;
        }
      }

      return true;
    }
  };

  const onSubmit = async (data: SignupFormData) => {
    console.log(data);
    // Validation based on step
    let shouldJumpToNextStep = true;

    if (step === SignupFormStep.Email) {
      const [isUnique] = await sq.query(q =>
        q.getIsUnique({ loginName: data.email })
      );

      // Check if user exists
      if (!isUnique) {
        setError('email', {
          type: 'manual',
          message: 'Die E-Mail-Adresse ist bereits registriert'
        });

        shouldJumpToNextStep = false;
      }
    } else if (step === SignupFormStep.Username) {
      const [isUnique] = await sq.query(q =>
        q.getIsUnique({ loginName: data.username })
      );

      // Check if user exists
      if (!isUnique) {
        setError('username', {
          type: 'manual',
          message: 'Der Benutzername ist bereits vergeben'
        });

        shouldJumpToNextStep = false;
      }
    } else if (step === SignupFormStep.Complete) {
      const [_, errors] = await sq.mutate(m =>
        m.userCreate({
          createProfile: true,
          values: {
            password: data.password,
            username: data.username,
            emailAddress: data.email,
            details: {
              firstName: data.details.firstName,
              lastName: data.details.lastName
            }
          },
          organizationId: __JAEN_ZITADEL__.organizationId
        })
      );

      if (errors?.length > 0) {
        setAlert({
          status: 'error',
          message: `Registrierung fehlgeschlagen.`,
          description: errors[0].message
        });
      } else {
        setAlert({
          status: 'success',
          message: `Registrierung erfolgreich.`,
          description: `Bitte überprüfe deine E-Mail für einen Bestätigungslink.`
        });
      }

      shouldJumpToNextStep = false;
    }

    if (shouldJumpToNextStep) {
      const nextStep = step + 1;
      setStep(nextStep);
    }
  };

  useEffect(() => {
    if (step === SignupFormStep.Email) {
      setFocus('email');
    } else if (step === SignupFormStep.Password) {
      setFocus('password');
    } else if (step === SignupFormStep.Username) {
      setFocus('username');
    } else if (step === SignupFormStep.Details) {
      setFocus('details.firstName');
    } else if (step === SignupFormStep.Terms) {
      setFocus('terms');
    }
  }, [step, setFocus]);

  useEffect(() => {
    const submittedData = getValues();

    if (isSubmitSuccessful) {
      reset({ ...submittedData });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Stack spacing="4">
      {alert && (
        <Alert status={alert.status}>
          <AlertIcon />
          <Box w="full">
            <AlertTitle>{alert.message}</AlertTitle>
            <AlertDescription>{alert.description}</AlertDescription>
          </Box>
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
            onClick={() => setAlert(null)}
          />
        </Alert>
      )}
      <Text whiteSpace="pre-wrap" fontFamily="monospace" fontSize="md">
        {displayText}
      </Text>
      {showInput && (
        <Stack as="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            isInvalid={!!errors.email}
            isRequired
            id="login_form_email"
          >
            <FormLabel fontSize="md" fontFamily="monospace" fontWeight="bold">
              Gib deine E-Mail Adresse ein
            </FormLabel>
            <HStack>
              <Input
                autoFocus
                type="email"
                {...register('email', emailValidationRules)}
              />
              {step === 0 && (
                <Button type="submit" isLoading={isSubmitting}>
                  Weiter
                </Button>
              )}
            </HStack>
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          {step > 0 && (
            <FormControl
              isInvalid={!!errors.password}
              isRequired
              id="login_form_password"
            >
              <FormLabel fontSize="md" fontFamily="monospace" fontWeight="bold">
                Gib dein Passwort ein
              </FormLabel>
              <HStack>
                <PasswordInput
                  control={control}
                  inputRightElement={
                    step === 1 ? (
                      <Button type="submit" isLoading={isSubmitting}>
                        Weiter
                      </Button>
                    ) : undefined
                  }
                />
              </HStack>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
          )}
          {step > 1 && (
            // username
            <FormControl
              isInvalid={!!errors.username}
              isRequired
              id="login_form_username"
            >
              <FormLabel fontSize="md" fontFamily="monospace" fontWeight="bold">
                Gib deinen Benutzernamen ein
              </FormLabel>
              <HStack>
                <Input
                  type="text"
                  {...register('username', {
                    required: 'Benutzername ist erforderlich'
                  })}
                />
                {step === 2 && (
                  <Button type="submit" isLoading={isSubmitting}>
                    Weiter
                  </Button>
                )}
              </HStack>
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>
          )}
          {step > 2 && (
            // first and last name
            <FormControl
              isInvalid={!!errors.details}
              isRequired
              id="login_form_details"
            >
              <FormLabel fontSize="md" fontFamily="monospace" fontWeight="bold">
                Gib deinen Vor- und Nachnamen ein
              </FormLabel>
              <HStack>
                <HStack w="full">
                  <Input
                    {...register('details.firstName', {
                      required: 'Vorname ist erforderlich'
                    })}
                  />

                  <Input
                    {...register('details.lastName', {
                      required: 'Nachname ist erforderlich'
                    })}
                  />
                </HStack>
                {step === 3 && (
                  <Button type="submit" isLoading={isSubmitting}>
                    Weiter
                  </Button>
                )}
              </HStack>
              <FormErrorMessage>{errors.details?.message}</FormErrorMessage>
            </FormControl>
          )}

          {step > 3 && (
            <FormControl
              isInvalid={!!errors.terms}
              isRequired
              id="login_form_terms"
            >
              <FormLabel fontSize="md" fontFamily="monospace" fontWeight="bold">
                Nutzungsbedingungen
              </FormLabel>
              <Controller
                control={control}
                name="terms"
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    onChange={e => {
                      onChange(e.target.checked);

                      if (e.target.checked) {
                        setStep(step + 1);
                      } else {
                        setStep(step - 1);
                      }
                    }}
                    checked={value}
                  >
                    Ich akzeptiere die Nutzungsbedingungen
                  </Checkbox>
                )}
              />
            </FormControl>
          )}

          {step > 4 && (
            <Button
              mt="4"
              type="submit"
              isLoading={isSubmitting}
              isDisabled={isSubmitted}
            >
              Melde dich bei Netsnek an
            </Button>
          )}
        </Stack>
      )}
    </Stack>
  );
};

interface PasswordInput {
  control: Control<any>;
  isInvalid?: FormControlProps['isInvalid'];
  errorMessage?: string;
  inputRightElement?: JSX.Element;
}

const PasswordInput: React.FC<PasswordInput> = ({
  control,
  isInvalid,
  errorMessage,
  inputRightElement
}) => {
  const [passwordStrength, setPasswordStrength] = useState<number | null>(null);
  const [passwordSuggestions, setPasswordSuggestions] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  const checkPasswordStrength = (password: string) => {
    const result = zxcvbn(password);
    setPasswordStrength(result.score);
    setPasswordSuggestions(result.feedback.suggestions);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === null) {
      return 'gray';
    }
    // Define color codes for different password strengths
    const colors = ['red', 'orange', 'yellow', 'green', 'teal'];
    // Map the password strength score (0-4) to the colors
    return colors[passwordStrength];
  };

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel htmlFor="newPassword">Passwort</FormLabel>
      <Controller
        name="password"
        control={control}
        rules={{
          required: 'Passwort ist erforderlich',
          validate: value => {
            // Custom validation for password strength
            const strengthResult = zxcvbn(value);
            if (strengthResult.score < 2) {
              return 'Passwortstärke ist unzureichend';
            }
            return true;
          }
        }}
        render={({ field }) => (
          <Stack>
            <HStack>
              <InputGroup>
                <Input
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  onChange={e => {
                    field.onChange(e);

                    checkPasswordStrength(e.target.value);
                  }}
                  autoComplete="current-password"
                />
                <InputRightElement>
                  <IconButton
                    aria-label="Show password"
                    icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                    size="xs"
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </InputRightElement>
              </InputGroup>
              {inputRightElement}
            </HStack>
            <Progress
              value={
                passwordStrength === null ? 0 : (passwordStrength + 1) * 25
              }
              colorScheme={getPasswordStrengthColor()}
              size="sm"
              isAnimated
            />
          </Stack>
        )}
      />
      {passwordSuggestions.length > 0 && (
        <FormHelperText color="red">
          Vorschläge: {passwordSuggestions.join(' ')}
        </FormHelperText>
      )}
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default Page;

export const pageConfig: PageConfig = {
  label: 'Signup',
  withoutJaenFrame: true,
  layout: {
    name: 'jaen',
    type: 'full'
  }
};

export { Head } from 'jaen';

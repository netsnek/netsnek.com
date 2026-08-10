import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    BoxProps,
    Center,
    Heading,
    Link,
    Spinner,
    Text,
    chakra
  } from '@chakra-ui/react'
  import {useCookieConsentContext} from 'jaen'
  import {useEffect, useState} from 'react'
  import {useIntl} from 'react-intl'
  // import {useCookieConsent} from '@jaenjs/jaen'
  
  export interface GoogleMapsProps extends BoxProps {
    src: string
  }
  
  export const GoogleMaps = ({src, ...props}: GoogleMapsProps) => {
    const [isMounted, setIsMounted] = useState(false)

    const intl = useIntl()
    const cc = useCookieConsentContext()
  
    useEffect(() => {
      setIsMounted(true)
    }, [])
  
    const handleAccept = () => {
      if (!cc) throw new Error('CookieConsentContext is not initialized')
  
      cc.accept('analytics')
  
      setMapsEnabled(true)
    }
  
    const [mapsEnabled, setMapsEnabled] = useState(false)
  
    useEffect(() => {
      if (cc) {
        const analyticsEnabled = cc.allowedCategory('analytics')
  
        setMapsEnabled(analyticsEnabled)
      }
    }, [cc])
  
    if (!isMounted) {
      return (
        <Center boxSize="full" bg="gray.200">
          <Spinner />
        </Center>
      )
    }
  
    if (mapsEnabled === false) {
      return (
        <Alert
          h="full"
          status="warning"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center">
          <Spinner />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            {intl.formatMessage({
              id: 'MapsUnavailableTitle',
              defaultMessage: 'Google Maps ist nicht verfügbar'
            })}
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            {intl.formatMessage({
              id: 'MapsUnavailableText',
              defaultMessage:
                'Bitte aktivieren Sie Cookies, um Google Maps anzuzeigen.'
            })}{' '}
            <Link onClick={handleAccept} variant="link">
              {intl.formatMessage({
                id: 'MapsEnableCookiesAction',
                defaultMessage: 'Analyse Cookies aktivieren'
              })}
            </Link>
          </AlertDescription>
        </Alert>
      )
    }
  
    return (
      <Box {...props} bg="gray.200" overflow={"hidden"}>
        <chakra.iframe
          src={src}
          w="calc(100% + 4px)"
          h="600"
          m="-2px"
        />
      </Box>
    )
  }
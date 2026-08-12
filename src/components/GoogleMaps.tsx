import {
  Alert,
  Box,
  BoxProps,
  Center,
  Link,
  Spinner,
  chakra
} from '@chakra-ui/react';
import { useCookieConsentCategory, useCookieConsentContext } from 'jaen';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

export interface GoogleMapsProps extends BoxProps {
  src: string;
}

export const GoogleMaps = ({ src, ...props }: GoogleMapsProps) => {
  const [isMounted, setIsMounted] = useState(false);

  const intl = useIntl();
  const cc = useCookieConsentContext();

  // Reads the category and re-reads it on every consent change, so
  // accepting through the global banner mounts the map right away. The
  // plugin instance itself never changes identity, an effect keyed on it
  // would only ever run once.
  const mapsEnabled = useCookieConsentCategory('analytics');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // The map's own accept button. It only writes the consent; the state
  // comes back through the same event as the banner's.
  const handleAccept = () => {
    cc?.accept('analytics');
  };

  if (!isMounted) {
    return (
      <Center boxSize="full" bg="gray.200">
        <Spinner />
      </Center>
    );
  }

  if (!mapsEnabled) {
    return (
      <Alert.Root
        h="full"
        status="warning"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Spinner />
        <Alert.Title mt={4} mb={1} fontSize="lg">
          {intl.formatMessage({
            id: 'MapsUnavailableTitle',
            defaultMessage: 'Google Maps ist nicht verfügbar'
          })}
        </Alert.Title>
        <Alert.Description maxWidth="sm">
          {intl.formatMessage({
            id: 'MapsUnavailableText',
            defaultMessage:
              'Bitte aktivieren Sie Cookies, um Google Maps anzuzeigen.'
          })}{' '}
          {/* variant="link" named a Button variant, not a Link one, so v2
              matched nothing and drew the bare link. v3's default `plain` is
              that same look here: brand has no `fg` token, so the colour it
              sets is an unresolvable var and the text keeps inheriting from
              the description, and the hover underline is v2's baseStyle. */}
          <Link onClick={handleAccept}>
            {intl.formatMessage({
              id: 'MapsEnableCookiesAction',
              defaultMessage: 'Analyse Cookies aktivieren'
            })}
          </Link>
        </Alert.Description>
      </Alert.Root>
    );
  }

  return (
    <Box {...props} bg="gray.200" overflow={'hidden'}>
      {/* 600px, spelled out. v2 appended the unit to any bare number that was
          not a scale key; v3 passes it through, and `height: 600` is invalid,
          so the iframe collapsed to the height of its own content. */}
      <chakra.iframe src={src} w="calc(100% + 4px)" h="600px" m="-2px" />
    </Box>
  );
};

import { ExternalLinkIcon } from '../../../../components/icons/chakra';
import { Alert, Box, Link, Stack, Text } from '@chakra-ui/react';
import { useLocation } from '@reach/router';
import { FC, isValidElement, ReactNode } from 'react';

import { usePageLocale } from '../../../../contexts/locale';
import { stripLocalePrefix } from '../../../../utils/navigation';

const PHOTONQ_DOCS_URL = 'https://photonq.org/docs';
const LOCAL_DOCS_PREFIX = '/docs/photonq';

export interface IQASMPlaygroundProps {
  /** QASM source the MDX element wraps, arrives already rendered to nodes. */
  children?: ReactNode;
  /** PhotonQ playground toggle, accepted so imported content keeps parsing. */
  withoutTranslate?: boolean | string;
  /** PhotonQ playground toggle, accepted so imported content keeps parsing. */
  withoutSimulate?: boolean | string;
}

/**
 * Collects the plain text of an already rendered MDX subtree. The mdast
 * wraps the QASM source in a paragraph, so by the time it reaches this
 * component it is a React element and not a string anymore.
 */
const extractText = (node: ReactNode): string => {
  if (node === null || node === undefined || typeof node === 'boolean')
    return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (isValidElement<{ children?: ReactNode }>(node))
    return extractText(node.props.children);
  return '';
};

/**
 * Maps the current docs page back to its PhotonQ counterpart. The imported
 * pages live under /docs/photonq while photonq.org serves them under /docs,
 * so the extra path segment is dropped. Pages outside the imported tree
 * fall back to the PhotonQ docs root.
 */
const usePhotonqDocsHref = (): string => {
  const { prefix } = usePageLocale();
  const location = useLocation();

  const canonicalPath = stripLocalePrefix(location?.pathname ?? '', prefix);

  if (
    canonicalPath === LOCAL_DOCS_PREFIX ||
    canonicalPath.startsWith(`${LOCAL_DOCS_PREFIX}/`)
  ) {
    return `${PHOTONQ_DOCS_URL}${canonicalPath.slice(LOCAL_DOCS_PREFIX.length)}`;
  }

  return PHOTONQ_DOCS_URL;
};

/**
 * Placeholder for the interactive QASM playground of the imported PhotonQ
 * docs. The circuit source is kept visible as a read-only snippet and the
 * interactive part is linked out to the original page on photonq.org.
 * Renders without any client-only API so SSR stays safe.
 */
const QASMPlayground: FC<IQASMPlaygroundProps> = ({ children }) => {
  const href = usePhotonqDocsHref();
  const code = extractText(children).trim();

  return (
    <Box mt={8}>
      {code && (
        <Box
          overflow="hidden"
          border="1px solid"
          borderColor="components.codeSnippet.borderColor"
          borderRadius="xl"
        >
          <Stack
            bgColor="components.codeSnippet.header.bgColor"
            color="components.codeSnippet.header.text.color"
            p={3}
            flexDir={{ base: 'column', md: 'row' }}
          >
            <Text fontSize="xs" my="auto">
              OpenQASM
            </Text>
          </Stack>
          <Box
            as="pre"
            fontFamily="monospace"
            fontSize="sm"
            p={4}
            m={0}
            overflowX="auto"
            whiteSpace="pre"
          >
            {code}
          </Box>
        </Box>
      )}
      <Alert.Root variant="info" borderRadius="lg" p={4} mt={code ? 4 : 0}>
        <Alert.Indicator />
        <Text mt="0 !important">
          Der interaktive QASM-Playground ist auf PhotonQ verfügbar.{' '}
          <Link
            href={href}
            fontWeight="semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            Diesen Abschnitt auf PhotonQ öffnen{' '}
            <ExternalLinkIcon mb="3px" boxSize="0.85em" />
          </Link>
        </Text>
      </Alert.Root>
    </Box>
  );
};

export default QASMPlayground;

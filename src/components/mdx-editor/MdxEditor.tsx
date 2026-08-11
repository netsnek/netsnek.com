import {
  Button,
  ButtonGroup,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  List
} from '@chakra-ui/react';
import { FC } from 'react';

// Insertable custom components (via Jaen)

import {
  checkUserRoles,
  useAuth,
  useAuthUser,
  useContentManagement,
  usePageContext
} from 'jaen';
import { MdxField, MdxFieldProps } from 'jaen-fields-mdx';
import { EditIcon, SettingsIcon } from '../../components/icons/chakra';
import { Link } from 'gatsby-plugin-jaen';

import Heading from '../main-content/heading/components/Heading';
import Callout from '../main-content/callout/components/Callouts';
import CodeSnippet from '../main-content/code-snippet/components/CodeSnippet';
import DocsIndex from '../main-content/docs-index/components/DocsIndex';
import Filesystem from '../main-content/filesystem/components/Filesystem';
import IconCard from '../main-content/icon-card/components/IconCard';
import ImageCard from '../main-content/image-card/components/ImageCard';
import QASMPlayground from '../main-content/qasm-playground/components/QASMPlayground';
import JaenImage from '../JaenImage';

interface IMdxEditorProps {
  hideHeadingHash?: boolean;
  onMdast: (mdast: any) => void;
}

export const mdxEditorComponents: MdxFieldProps['components'] = {
  // TEXT
  p: props => <Text id={props.id} children={props.children} />,
  // LIST
  ul: (props: any) => (
    <List.Root as="ul" id={props.id} children={props.children}></List.Root>
  ),
  ol: (props: any) => (
    <List.Root as="ol" id={props.id} children={props.children}></List.Root>
  ),
  li: (props: any) => (
    <List.Item id={props.id} children={props.children}></List.Item>
  ),
  // TABLE
  table: (props: any) => (
    <Table.Root
      id={props.id}
      variant="striped"
      w="fit-content"
      children={props.children}
    />
  ),
  thead: (props: any) => (
    <Table.Header id={props.id} children={props.children} />
  ),
  tbody: (props: any) => <Table.Body id={props.id} children={props.children} />,
  tr: (props: any) => <Table.Row id={props.id} children={props.children} />,
  th: (props: any) => (
    <Table.ColumnHeader id={props.id} children={props.children} />
  ),
  td: (props: any) => <Table.Cell id={props.id} children={props.children} />,
  // MISC
  code: ({
    className,
    ...props
  }: {
    className?: string;
    children?: string;
    headerText?: string;
  }) => {
    const lang = className?.replace('language-', '') || 'text';

    return (
      <CodeSnippet
        language={lang}
        children={props.children}
        headerText={props.headerText}
      />
    );
  },
  img: JaenImage,
  Image: JaenImage,
  // CUSTOM COMPONENTS
  Filesystem,
  ImageCard,
  Callout,
  IconCard,
  DocsIndex,
  QASMPlayground
};

const MdxEditor: FC<IMdxEditorProps> = ({ hideHeadingHash, onMdast }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const { isEditing, toggleIsEditing } = useContentManagement();
  const { jaenPage } = usePageContext();

  const canEdit = isAuthenticated && checkUserRoles(user, ['jaen:admin']);

  return (
    <Stack
      gap={4}
      css={{
        '& .cm-editor': {
          height: '60dvh'
        }
      }}
    >
      {canEdit && isLoading === false && (
        <ButtonGroup>
          <Button
            variant="outline"
            colorPalette={isEditing ? 'red' : undefined}
            onClick={() => toggleIsEditing()}
          >
            <EditIcon />
            {isEditing ? 'Stop Editing' : 'Edit'}
          </Button>

          <Link
            leftIcon={<SettingsIcon />}
            variant="outline"
            as={Button}
            to={`/cms/pages/#${btoa(jaenPage.id)}`}
          >
            Page Settings
          </Link>
        </ButtonGroup>
      )}

      <div>
        <MdxField
          key={jaenPage.id}
          name="documentation"
          components={{
            // TEXT
            h1: props => (
              <Heading variant="h1" {...props} noAnchor={hideHeadingHash} />
            ),
            h2: props => (
              <Heading variant="h2" {...props} noAnchor={hideHeadingHash} />
            ),
            h3: props => (
              <Heading variant="h3" {...props} noAnchor={hideHeadingHash} />
            ),
            h4: props => (
              <Heading variant="h4" {...props} noAnchor={hideHeadingHash} />
            ),
            h5: props => (
              <Heading variant="h5" {...props} noAnchor={hideHeadingHash} />
            ),
            h6: props => (
              <Heading variant="h6" {...props} noAnchor={hideHeadingHash} />
            ),
            wrapper: ({ children }) => <Stack>{children}</Stack>,
            ...mdxEditorComponents
          }}
          onMdast={onMdast}
        />
      </div>
    </Stack>
  );
};

export default MdxEditor;

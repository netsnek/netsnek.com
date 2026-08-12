import { Box, Button } from '@chakra-ui/react';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import CodeSnippet, {
  ICodeSnippetProps
} from '../../code-snippet/components/CodeSnippet';
import CodeResultPreview from '../../code-result-preview/components/CodeResultPreview';

interface ICodePlaygroundProps {
  children?: string;
  codeEditorProps?: Exclude<ICodeSnippetProps, 'children'>;
  onCodeChange?: (code: string) => void;
  toolbar?: ReactNode;
}
/**
 * Component for showing a code editor and (live) preview.
 * This component uses the CodeSnippet component to display and edit the code.
 */
const CodePlayground: FC<ICodePlaygroundProps> = ({
  children,
  codeEditorProps,
  toolbar,
  onCodeChange
}) => {
  const intl = useIntl();

  // The defaults used to live in defaultProps, which cannot reach
  // react-intl. They are resolved here instead, keeping the previous
  // semantics: codeEditorProps is replaced wholesale, never merged.
  const editorProps: Exclude<ICodeSnippetProps, 'children'> =
    codeEditorProps ?? {
      headerText: intl.formatMessage({
        id: 'CodePlaygroundEditorHeader',
        defaultMessage: 'Bearbeitbarer Code'
      }),
      language: 'javascript'
    };

  const [code, setCode] = useState<string>(
    children ??
      intl.formatMessage({
        id: 'CodePlaygroundPlaceholderCode',
        defaultMessage: 'Das ist eine Code-Spielwiese'
      })
  );

  useEffect(() => {
    if (onCodeChange) onCodeChange(code);
  }, [code]);

  return (
    <>
      <Box
        mt="8"
        border="1px solid"
        borderRadius="xl"
        borderColor="components.codeSnippet.borderColor"
        h="fit-content"
        overflow="hidden"
      >
        <CodeSnippet
          children={code}
          {...editorProps}
          containerProps={{
            border: 'none',
            borderBottomRadius: 'none'
          }}
          isStandalone={false}
          toolbar={toolbar}
          onChange={setCode}
          // isEditable={true}
        />
      </Box>
      <CodeResultPreview
        isStandalone
        headerText={intl.formatMessage({
          id: 'CodePlaygroundPreviewHeader',
          defaultMessage: 'Code-Vorschau'
        })}
        // isExecuting={isExecuting}
        // result={result}
      />
    </>
  );
};

export default CodePlayground;

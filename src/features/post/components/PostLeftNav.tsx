import { FC } from 'react';
import { TPost } from '../types/post';
import {
  Box,
  Divider,
  Heading,
  Input,
  Tag,
  Text,
  Textarea,
  VStack
} from '@chakra-ui/react';
import TbEdit from '../../../shared/components/icons/tabler/TbEdit';
import LeftNav from '../../../shared/containers/navigation/LeftNav';
import { useNavOffset } from '../../../shared/hooks/use-nav-offset';
import Image from '../../../shared/components/image/Image';
import LeftNavPostReaderSkeleton from '../reader/components/LeftNavPostReaderSkeleton';
import { useAuthenticationContext } from '@atsnek/jaen';

interface IPostLeftNavProps {
  post?: TPost;
  canEdit?: boolean;
  handleTitleChange: (title: string) => void;
  handleSummaryChange: (summary: string) => void;
  setPostPreviewImage: (src: File) => void;
  isPostPreviewImageUploading: boolean;
}

/**
 * Left navigation for reading/editing a post.
 */
const PostLeftNav: FC<IPostLeftNavProps> = ({
  post,
  canEdit,
  handleTitleChange,
  handleSummaryChange,
  setPostPreviewImage,
  isPostPreviewImageUploading
}) => {
  const navOffset = useNavOffset();

  const isAuthenticated = useAuthenticationContext().user !== null;

  if (!post) return <LeftNavPostReaderSkeleton />;

  const isPublic = post?.privacy === 'public';

  return (
    <LeftNav
      minW="250px"
      w="max-content"
      isExpanded={true}
      display={{ base: 'none', md: 'flex' }}
      top={isAuthenticated ? `${navOffset}` : '75px'}
      h={`calc(100vh - 100px  - ${navOffset})`}
      mr={10}
    >
      <VStack
        spacing={2}
        __css={{
          '& img': {
            // We need this to force the image to be a square
            h: 'auto',
            aspectRatio: '1 / 1',
            objectPosition: 'top'
          }
        }}
      >
        <Box overflow="hidden" borderRadius="full">
          <Image
            src={post?.avatarUrl ?? 'https://api.dicebear.com/7.x/shapes/svg'}
            w={{ base: '50%', md: 'full' }}
            maxW="120px"
            h="max-content"
            _hover={{
              transform: 'scale(1.05)'
            }}
            transition="transform 0.2s cubic-bezier(.17,.67,.83,.67)"
            handleImageChange={setPostPreviewImage}
            editable={canEdit}
            isUploading={isPostPreviewImageUploading}
          />
        </Box>
        <Box
          position="relative"
          __css={{
            '&:hover': {
              '& #editor-left-nav-edit-title-icon': {
                opacity: 1
              }
            }
          }}
        >
          {canEdit ? (
            <>
              <Input
                variant="ghost"
                size="sm"
                placeholder="My Post"
                defaultValue={post.title ?? 'My Post'}
                textAlign="center"
                px={8}
                fontWeight="semibold"
                borderRadius="md"
                onBlur={e => handleTitleChange(e.target.value)}
              />
              <TbEdit
                id="editor-left-nav-edit-title-icon"
                position="absolute"
                top={0}
                right={2}
                bottom={0}
                margin="auto 0"
                opacity={0}
                transition="opacity 0.2s ease-in-out"
              />
            </>
          ) : (
            <Text size="sm" fontWeight="semibold" px={8}>
              {post.title}
            </Text>
          )}
        </Box>
        {canEdit && (
          <>
            <Tag size="sm" colorScheme={isPublic ? 'green' : 'yellow'}>
              {isPublic ? 'public' : 'private'}
            </Tag>
            <Divider mt={8} mb={3} />
          </>
        )}
        {post.summary && canEdit && (
          <Heading
            as="h6"
            fontSize="sm"
            color="gray.500"
            mb={1}
            fontWeight="medium"
          >
            Post Summary
          </Heading>
        )}
        {canEdit ? (
          <Textarea
            defaultValue={post.summary ?? 'Short summary of your post'}
            placeholder="Short summary of your post"
            size="sm"
            borderRadius="lg"
            textAlign="center"
            variant="ghost"
            maxH="300px"
            onBlur={e => handleSummaryChange(e.target.value)}
          />
        ) : (
          <Text size="sm" color="pages.singlePost.leftNav.summary.color">
            {post.summary}
          </Text>
        )}
      </VStack>
    </LeftNav>
  );
};

export default PostLeftNav;
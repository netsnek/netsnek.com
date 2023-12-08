import { PageConfig } from '@atsnek/jaen';
import { PageProps, graphql } from 'gatsby';
import * as React from 'react';
import { BlogContent } from '../components/contents/BlogContent';

const BlogPage: React.FC<PageProps> = props => {
  return <BlogContent />;
};

export default BlogPage;

export { Head } from '@atsnek/jaen';

export const pageConfig: PageConfig = {
  label: 'BlogPage',
  childTemplates: ['BlogPage']
};

export const query = graphql`
  query ($jaenPageId: String!) {
    jaenPage(id: { eq: $jaenPageId }) {
      ...JaenPageData
    }
    allJaenPage(filter: { id: { eq: "JaenPage /blog/" } }) {
      nodes {
        id
        childPages {
          ...JaenPageChildrenData
        }
      }
    }
  }
`;
import { PageConfig } from '@atsnek/jaen';
import { PageProps, graphql } from 'gatsby';
import * as React from 'react';
import { DocContent } from '../components/contents/DocContent';

const BlogPage: React.FC<PageProps> = props => {
  return <DocContent />;
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
    allJaenPage(filter: { id: { eq: "JaenPage /docs/" } }) {
      nodes {
        id
        childPages {
          ...JaenPageChildrenData
        }
      }
    }
  }
`;
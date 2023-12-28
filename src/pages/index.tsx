import {Field, PageConfig, PageProps, snekResourceId} from '@atsnek/jaen'

import {Box, Button} from '@chakra-ui/react'
import {graphql} from 'gatsby'
import * as React from 'react'
import HeroSection from '../liba/components/Hero'
import ContentSection from '../liba/components/Content'

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Box as="main">
      <HeroSection />
      <ContentSection/>
    </Box>
  )
}

export default IndexPage

export const pageConfig: PageConfig = {
  label: 'Home Page',
  icon: 'FaHome',
  childTemplates: ['BlogPage'],
  menu: {
    type: 'app'
  }
}

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
    allJaenPage {
      nodes {
        ...JaenPageData
        children {
          ...JaenPageData
        }
      }
    }
  }
`

export {Head} from '@atsnek/jaen'

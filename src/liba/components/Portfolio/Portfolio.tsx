import {Box, Text, Image, chakra} from '@chakra-ui/react'
import {FC} from 'react'
import {useNewsPages} from '../../hooks/useNewsPages'
import PortfolioGrid from './PortfolioGrid'
import PortfolioSlider from './PortfolioSlider'

interface INewsSlidesProps {
  showNewsTitle?: boolean
}

const NewsSlider: FC<INewsSlidesProps> = ({showNewsTitle}) => {
  const index = useNewsPages()

  return (
    <Box as="section">
      <PortfolioGrid
        index={index}
        display={{base: 'none', sm: 'grid'}}
        mt="16"
      />

      {/* Form mobile */}
      <PortfolioSlider index={index} display={{base: 'block', sm: 'none'}} />
    </Box>
  )
}
export default NewsSlider

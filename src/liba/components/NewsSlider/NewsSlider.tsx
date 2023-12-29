import {Box, Text, Image, chakra} from '@chakra-ui/react'
import {FC} from 'react'
import {useNewsPages} from '../../hooks/useNewsPages'
import WhiteDesktopSlider from './WhiteDesktopSlider'
import WhiteMobileSlider from './WhiteMobileSlider'

interface INewsSlidesProps {
  showNewsTitle?: boolean
}

const NewsSlider: FC<INewsSlidesProps> = ({showNewsTitle}) => {
  const index = useNewsPages()

  return (
    <>
      <WhiteDesktopSlider showTitle={showNewsTitle} index={index} />

      {/* Form mobile */}
      <WhiteMobileSlider index={index} />
    </>
  )
}
export default NewsSlider

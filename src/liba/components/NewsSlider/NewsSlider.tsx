import {Box, Text, Image, chakra} from '@chakra-ui/react'
import {FC} from 'react'
import {useNewsPages} from '../../hooks/useNewsPages'
import DesktopSlider from './DesktopSlider'
import MobileSlider from './MobileSlider'

interface INewsSlidesProps {
  showNewsTitle?: boolean
}

const NewsSlider: FC<INewsSlidesProps> = ({showNewsTitle}) => {
  const index = useNewsPages()

  return (
    <>
      <DesktopSlider showTitle={showNewsTitle} index={index} />

      {/* Form mobile */}
      <MobileSlider index={index} />
    </>
  )
}
export default NewsSlider

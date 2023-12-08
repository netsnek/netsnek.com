import {Box, Grid, GridItem} from '@chakra-ui/react'
import {Field, PhotoProvider} from '@atsnek/jaen'
import React, {FC, useCallback, useState} from 'react'

interface IImaginationBottomSectionProps {}

const Images = React.memo<{
  defaultImages: string[]
}>(
  ({defaultImages}) => {
    return (
      <PhotoProvider maskOpacity={0.8}>
        <Grid
          width="100%"
          px="4"
          gridGap={{base: '2', md: '4'}}
          gridTemplateAreas={{
            base: `
             "I1 I2"
             "I3 I3"
             "I4 I5"
             "I6 I7"
           `,
            md: `
           "I1 I1 I2 I3"
           "I1 I1 I2 I4"
           "I5 I5 I5 I5"
           "I5 I5 I5 I5"
           "I6 I6 I7 I7"
           `
          }}
          // w="100%"
          gridAutoRows="minmax(200px, 350px)"
          gridAutoColumns="1fr"
          // h={CONTAINER_MAX_WIDTH}
        >
          {new Array(defaultImages.length).fill('').map((_, i) => {
            const imageFieldName = `imaginationBottomImage${i}`

            return (
              <GridItem gridArea={`I${i + 1}`} key={i} cursor="pointer">
                <Box
                  _hover={{
                    transition: 'all 0.2s ease',
                    transform: {
                      md: 'scale(1.02) ',
                      lg: 'scale(1.02) '
                    }
                  }}
                  transition="ease-in 0.2s"
                  boxShadow="dark"
                  borderRadius="xl"
                  w="full"
                  h="full"
                  overflow="hidden">
                  <Field.Image name={imageFieldName} lightbox lightboxGroup />
                </Box>
              </GridItem>
            )
          })}
        </Grid>
      </PhotoProvider>
    )
  },
  () => {
    return true
  }
)
const Gallery: FC<IImaginationBottomSectionProps> = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const desktopImages = [
    '/images/home/imagination/gallary1.png',
    '/images/home/imagination/gallary2.png',
    '/images/home/imagination/gallary3.png',
    '/images/home/imagination/gallary4.png',
    '/images/home/imagination/gallary5.png',
    '/images/home/imagination/gallary6.png',
    '/images/home/imagination/gallary7.png'
  ]

  const [loadedImages, setLoadedImages] = useState<string[]>([])

  const openImageViewer = useCallback((url: number) => {
    setCurrentImage(url)
    setIsViewerOpen(true)
  }, [])

  const closeImageViewer = () => {
    setCurrentImage(0)
    setIsViewerOpen(false)
  }

  return (
    <>
      {' '}
      <>
        <Images defaultImages={desktopImages} />
      </>
    </>
  )
}
export default Gallery
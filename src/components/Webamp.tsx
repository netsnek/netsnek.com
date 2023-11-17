import {Box} from '@chakra-ui/react'
import React, {useEffect, useRef} from 'react'

const WebampComponent = ({songUrl}: {songUrl: string}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initWebamp = async () => {
      // Await import Webamp
      const Webamp = (await import('webamp')).default

      // Instantiate Webamp only on the client-side
      if (typeof window === 'undefined' || !containerRef.current) {
        return
      }

      // Instantiate and render Webamp
      const webamp = new Webamp({
        initialTracks: [
          {
            metaData: {
              artist: 'Unknown Artist',
              title: 'Unknown Title'
            },
            url: songUrl
          }
        ]
      })

      // Mount Webamp inside the container element
      webamp.renderWhenReady(containerRef.current).then(() => {
        // Webamp has rendered
        // remove all draggable classes from webamp
        const draggableElements = document.querySelectorAll('.draggable')
        draggableElements.forEach(el => {
          el.classList.remove('draggable')
        })
        // move #webamp into #webamp-react
        const webampContainer = document.querySelector('#webamp')
        const webampReactContainer = document.querySelector('#webamp-react')
        if (webampContainer && webampReactContainer) {
          webampReactContainer.appendChild(webampContainer)
        }
        //webamp.play();
      })

      // Optional: Cleanup on unmount
      return () => {
        webamp.dispose()
      }
    }

    initWebamp()
  }, [])

  return (
    <Box
      ref={containerRef}
      id="webamp-react"
      h="200px"
      w="300px"
      sx={{
        '#webamp': {
          '.playlist-top': {
            pointerEvents: 'none'
          },
          '.equalizer-top': {
            pointerEvents: 'none'
          },
          '#title-bar': {
            pointerEvents: 'none'
          },
          // '#option-context': {
          //   pointerEvents: 'initial'
          // }
        }
      }}
    />
  )
}

export default WebampComponent

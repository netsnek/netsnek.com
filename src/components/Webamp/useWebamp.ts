import {useEffect, useRef, useCallback} from 'react'
import type WebampCI from 'webamp'
import type { Options, Track, URLTrack } from "webamp";

type Webamp = {
  initWebamp: (containerElement: HTMLDivElement, options: Options) => void
  webampCI?: WebampCI
}

const useWebamp = (): Webamp => {
  const webampCI = useRef<any>()

  const initWebamp = useCallback(
    (containerElement: HTMLDivElement, options: Options) => {
      // Await import Webamp
      const Webamp = require('webamp')

      // Instantiate Webamp only on the client-side
      if (typeof window === 'undefined' || !containerElement) {
        return
      }

      const webamp = new Webamp({...options})

      const absolute = false;
      const positions = {
        main: {x: 0, y: 0},
        playlist: {x: 100, y: 100},
        equalizer: {x: 200, y: 200},
      }
      //webamp.store.dispatch({ type: "UPDATE_WINDOW_POSITIONS", positions, absolute });
      webamp.store.dispatch({
        size: [0, 2],
        type: "WINDOW_SIZE_CHANGED",
        windowId: "playlist",
      });


      // Create temporary #temp-webamp element in body position absolute top left
      const tempElement = document.createElement('div')
      tempElement.id = 'temp-webamp'
      tempElement.style.position = 'absolute'
      tempElement.style.top = '0px'
      tempElement.style.left = '0px'
      tempElement.style.width = '0px'
      tempElement.style.height = '0px'

      // Create a reference for body
      const body = document.querySelector('body')
      if(body){
        body.appendChild(tempElement)
      }

      webamp.renderWhenReady(tempElement).then(() => {
        // Add any custom logic here

        // Webamp has rendered
        // remove all draggable classes from webamp
        // const draggableElements = document.querySelectorAll('.draggable')
        // draggableElements.forEach(el => {
        //   el.classList.remove('draggable')
        // })
        // move #webamp into #webamp-react
        const webampContainer = document.querySelector('#webamp')
        if (webampContainer) {
          containerElement.appendChild(webampContainer)
        }

        // disable draggable pointer events on webamp
        webampContainer?.querySelector('.playlist-top')?.setAttribute('style', 'pointer-events: none')
        webampContainer?.querySelector('.equalizer-top')?.setAttribute('style', 'pointer-events: none')
        webampContainer?.querySelector('#title-bar')?.setAttribute('style', 'pointer-events: none')
        // webampContainer?.querySelector('#option-context')?.setAttribute('style', 'pointer-events: initial')

        // remove tempElement
        tempElement.remove()

        webampCI.current = webamp
      })
    },
    []
  )

  useEffect(() => {
    return () => {
      webampCI.current?.destroy()
    }
  }, [])

  return {
    initWebamp,
    webampCI: webampCI.current
  }
}

export default useWebamp

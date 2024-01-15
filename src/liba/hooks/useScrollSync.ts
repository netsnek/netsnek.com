import React from 'react'
import {useRef, useEffect, useState} from 'react'

export const useScrollSync = (
  offset: number = 0,
  offsetTop?: number,
  noScroll?: boolean,
  speed?: number,
  sectionRef?: React.RefObject<HTMLDivElement>
) => {
  const [scrollTop, setScrollTop] = useState(0)

  const ref: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScrollHandler = (e: Event) => {
      const target = e.target as Document

      setScrollTop(target.documentElement.scrollTop)
      if(sectionRef && !offsetTop){
        offsetTop = sectionRef.current!.offsetTop
        //alert(offsetTop)
      }

      if (ref.current) {
        ref.current!.scrollTop =
        (target.documentElement.scrollTop -
        (offsetTop ? offsetTop : ref.current!.offsetTop) -
        (noScroll ? 999999999 : offset))/(1/(speed ? speed : 1))
      }
    }
    
    window.addEventListener('scroll', onScrollHandler)

    return () => window.removeEventListener('scroll', onScrollHandler)
  }, [scrollTop])

  return {
    scrollTop,
    ref
  }
}

export const useScrollShow = (
  offset: number = 0,
  offsetTop?: number,
  noScroll?: boolean,
  sectionRef?: React.RefObject<HTMLDivElement>
) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [display, setDisplay] = useState(false); // new display state

  const ref: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScrollHandler = (e: Event) => {
      const target = e.target as Document;

      setScrollTop(target.documentElement.scrollTop);
      if(sectionRef && !offsetTop){
        offsetTop = sectionRef.current!.offsetTop;
      }

      const scrollPositionRelativeToRef =
        (target.documentElement.scrollTop -
        (offsetTop ? offsetTop : ref.current!.offsetTop) -
        (noScroll ? 999999999 : offset));

      if (!display && scrollPositionRelativeToRef >= 0) {
        setDisplay(true); // update display status based on the condition
      }
    }
    
    window.addEventListener('scroll', onScrollHandler);

    return () => window.removeEventListener('scroll', onScrollHandler);
  }, [scrollTop]); // remove display from the dependency array

  return {
    scrollTop,
    ref,
    display // return display status
  }
}

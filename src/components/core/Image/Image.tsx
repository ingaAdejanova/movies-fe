import { useState, useRef, useEffect } from 'react'
import './Image.scss'

type ImageProps = {
  src: string | null
  alt: string
  rootMargin?: string
  threshold?: number
  fallbackSrc?: string
}

const FALLBACK_SRC = 'https://via.placeholder.com/200x300?text=No+Image'

export const Image = ({ src, alt, rootMargin = '0px', threshold = 0.1, fallbackSrc = FALLBACK_SRC }: ImageProps) => {
  const [shouldLoad, setShouldLoad] = useState(false)
  const placeholderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!shouldLoad && placeholderRef.current) {
      const observer = new IntersectionObserver(
        ([{ intersectionRatio }]) => {
          if (intersectionRatio > 0) {
            setShouldLoad(true)
          }
        },
        {
          rootMargin,
          threshold,
        },
      )
      observer.observe(placeholderRef.current)
      return () => observer.disconnect()
    }
  }, [shouldLoad, rootMargin, threshold])

  const imageSrc = src || fallbackSrc

  return shouldLoad ? (
    <img className="image" src={imageSrc} alt={alt} />
  ) : (
    <div className="placeholder" ref={placeholderRef} />
  )
}

import React, { useState, useRef, useEffect } from 'react';

type ImageProps = {
  src: string | null; // Allow src to be null or undefined
  alt: string;
  rootMargin?: string;
  threshold?: number;
  placeholder?: React.ReactNode;
  fallbackSrc?: string; // New prop for fallback image if src is null or undefined
  className?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  rootMargin = '0px',
  threshold = 0.1,
  placeholder = <div style={{ backgroundColor: '#1c1c1c', width: '100%', height: '100%' }} />, // Default placeholder styling
  fallbackSrc = 'https://via.placeholder.com/200x300?text=No+Image', // Fallback image for missing src
  className = '',
  ...imageProps
}) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const placeholderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!shouldLoad && placeholderRef.current) {
      const observer = new IntersectionObserver(
        ([{ intersectionRatio }]) => {
          if (intersectionRatio > 0) {
            setShouldLoad(true);
          }
        },
        {
          rootMargin, // Customizable root margin (e.g., load image earlier or later)
          threshold,  // Threshold controls how much of the element is visible before loading
        }
      );
      observer.observe(placeholderRef.current);
      return () => observer.disconnect();
    }
  }, [shouldLoad, rootMargin, threshold]);

  // Check if src is null or undefined and use fallback image instead
  const imageSrc = src || fallbackSrc;

  return (
    shouldLoad ? (
      <img className={className} src={imageSrc} alt={alt} {...imageProps} /> 
    ) : (
      <div className={className} ref={placeholderRef}>
        {placeholder}
      </div>
    )
  );
};

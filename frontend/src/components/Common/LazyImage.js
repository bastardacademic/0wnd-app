import React, { useEffect, useRef, useState } from 'react';

const LazyImage = ({ src, alt, className }) => {
  const imgRef = useRef();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        imgRef.current.src = src;
        setLoaded(true);
        observer.disconnect();
      }
    });

    if (imgRef.current) observer.observe(imgRef.current);
  }, [src]);

  return <img ref={imgRef} alt={alt} className={className} style={{ opacity: loaded ? 1 : 0.3 }} />;
};

export default LazyImage;

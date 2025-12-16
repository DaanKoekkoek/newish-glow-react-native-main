import { useRef, useEffect, useState } from "react";
import type { ImageProps } from "../Image.types";
import { ImageBackground } from "../ImageBackground";

/* NOTE: Should only be used if you want to provide background-image images
 * with lazy loading through intersectionObserver.
 */
export const ImageLazy = ({
  src,
  localSrc,
  alt,
  resizeMode,
  position = "center",
  className,
  children,
  testID,
  ratioClass,
  rootMargin = "200px",
}: Omit<ImageProps, "ratio"> & { ratioClass: string; rootMargin?: string }) => {
  const url = src || localSrc;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <ImageBackground
      src={url}
      alt={alt}
      resizeMode={resizeMode}
      position={position}
      visible={visible}
      ref={ref}
      className={className}
      testID={testID}
      ratioClass={ratioClass}
    >
      {children}
    </ImageBackground>
  );
};

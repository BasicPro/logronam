import React from "react";
import { cn } from "../../lib/utils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className,
  ...props
}) => {
  const [imageSrc, setImageSrc] = React.useState(src);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        src={imageSrc}
        alt={alt}
        className={"w-full h-full object-cover transition-opacity duration-300"}
        {...props}
      />
    </div>
  );
};

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
  fallback = "/images/placeholder.jpg",
  className,
  ...props
}) => {
  const [imageSrc, setImageSrc] = React.useState(src);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  const handleError = () => {
    setHasError(true);
    setImageSrc(fallback);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          hasError && "opacity-50"
        )}
        {...props}
      />
    </div>
  );
};

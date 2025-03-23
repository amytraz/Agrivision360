
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholderUrl?: string;
}

export function BlurImage({
  src,
  alt,
  className,
  placeholderUrl,
  ...props
}: BlurImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Reset loading state when src changes
    setIsLoaded(false);
    
    // Preload the image
    if (src) {
      const img = new Image();
      img.src = src as string;
      img.onload = () => {
        setIsLoaded(true);
      };
    }
  }, [src]);

  return (
    <div className="relative overflow-hidden">
      {!isLoaded && placeholderUrl && (
        <img
          src={placeholderUrl}
          alt="Loading placeholder"
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 scale-105 blur-lg",
            className
          )}
          {...props}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-all duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  );
}

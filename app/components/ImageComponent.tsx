// ImageComponent.tsx

import React from 'react';

interface ImageComponentProps {
  src: string;
  alt?: string;
  className?: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt = "Image", className }) => {
  const isValidImageUrl = (url: string): boolean => {
    const imageUrlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i;
    return imageUrlPattern.test(url);
  };

  return (
    <div className={`relative ${className}`}>
      {isValidImageUrl(src) && (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-md" // Ensures the image covers the given dimensions
        />
      )}
    </div>
  );
};

export default ImageComponent;

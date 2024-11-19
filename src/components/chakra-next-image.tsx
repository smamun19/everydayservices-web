import { Image as ChakraImage, ImageProps } from '@chakra-ui/react';
import NextImage from 'next/image';

interface ChakraNextImageProps extends ImageProps {
  src: string;
  alt: string;
  width: number;
  aspectRatio?: number;
}

export const ChakraNextImage = ({ src, alt, width, aspectRatio, ...rest }: ChakraNextImageProps) => {
  const height = aspectRatio ? width / aspectRatio : width;
  return (
    <ChakraImage asChild {...rest}>
      <NextImage src={src} alt={alt} width={width} height={height} />
    </ChakraImage>
  );
};

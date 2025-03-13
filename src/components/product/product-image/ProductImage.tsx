import Image from 'next/image';
import { type StyleHTMLAttributes } from 'react';

interface Props {
  src?: string;
  alt: string;
  className?: StyleHTMLAttributes<HTMLImageElement>['className'];
  width: number;
  height: number;
  style?: StyleHTMLAttributes<HTMLImageElement>['style'];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const ProductImage = ({
  src,
  alt,
  className,
  width,
  height,
  style,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  const fullSrc = src
    ? src.startsWith('http')
      ? src
      : `/products/${src}`
    : `/imgs/placeholder.jpg`;

  return (
    <>
      <Image
        src={fullSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </>
  );
};

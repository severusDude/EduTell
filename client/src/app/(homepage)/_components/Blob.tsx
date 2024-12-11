import Image, { ImageProps } from "next/image";
import React from "react";

interface BlobProps extends React.HTMLProps<HTMLDivElement> {
  url: string;
  width?: number;
  height?: number;
}

const Blob = ({ url, height, width, ...props }: BlobProps) => {
  return (
    <Image
      className={`absolute -z-10 ${props.className}`}
      src={url}
      alt="blob-1"
      width={width || 300}
      height={height || 350}
    />
  );
};

export default Blob;

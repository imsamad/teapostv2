import { Box } from "@radix-ui/themes";
import React, { ChangeEvent, useRef, useState } from "react";
import { TbUpload } from "react-icons/tb";

const PosterImage = () => {
  const [image, setImage] = useState<any>();

  const imageUploadRef = useRef<HTMLInputElement>();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file);
  };

  return (
    <Box
      className="w-40 h-40 border-2 border-gray-600 mb-2 grid place-items-center overflow-hidden"
      onClick={() => {
        imageUploadRef.current?.click();
      }}
    >
      {image ? (
        // @ts-ignore
        <img src={URL.createObjectURL(image)} width="100%" height="100%" />
      ) : (
        <TbUpload size="50" />
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        // @ts-ignore
        ref={imageUploadRef}
        onChange={handleImageChange}
      />
    </Box>
  );
};

export default PosterImage;

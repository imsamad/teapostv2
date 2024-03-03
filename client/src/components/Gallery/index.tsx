import React from "react";

const Gallery = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <ImageTab /> <ImageTab /> <ImageTab />
    </div>
  );
};

export default Gallery;

const ImageTab = () => {
  return (
    <img
      className="h-auto max-w-full rounded-lg"
      src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
      alt=""
    />
  );
};

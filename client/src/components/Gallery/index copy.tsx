import React from "react";

const Gallery1 = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="grid gap-4">
        <div>
          <ImageTab />{" "}
        </div>
        <div>
          <ImageTab />{" "}
        </div>
        <div>
          <ImageTab />{" "}
        </div>
      </div>
      <div className="grid gap-4">
        <div>
          <ImageTab />{" "}
        </div>
        <div>
          <ImageTab />{" "}
        </div>
        <div>
          <ImageTab />{" "}
        </div>
      </div>
      <div className="grid gap-4">
        <div>
          <ImageTab />{" "}
        </div>
        <div>
          <ImageTab />{" "}
        </div>
        <div>
          <ImageTab />{" "}
        </div>
      </div>
      <div className="grid gap-4">
        <div>
          <ImageTab />{" "}
        </div>
        <div>
          <ImageTab />{" "}
        </div>
        <div>
          <ImageTab />{" "}
        </div>
      </div>
    </div>
  );
};

export default Gallery1;

const ImageTab = () => {
  return (
    <img
      className="h-auto max-w-full rounded-lg"
      src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
      alt=""
    />
  );
};

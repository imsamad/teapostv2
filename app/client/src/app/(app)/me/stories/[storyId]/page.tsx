import React from "react";

const page = ({ params: { storyId } }: { params: { storyId: string } }) => {
  return <div>page: {storyId}</div>;
};

export default page;

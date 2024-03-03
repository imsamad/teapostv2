import React from "react";

const AuthorStories = ({
  params: { username },
}: {
  params: { username: string };
}) => {
  return <div>{username}</div>;
};

export default AuthorStories;

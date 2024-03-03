"use client";
import LoginToast from "@/components/LoginToast";
import fetchClient from "@/lib/fetchClient";
import { updateProfileLocalStorage } from "@/lib/profileLocalStorageClient";
import { TStorySchema } from "@/shared-lib";
import { TProfileSchema } from "@/shared-lib/endpoints/profile";
import { Button } from "@radix-ui/themes";
import React, { useState } from "react";

import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
const LikeDislike = ({
  story,
  profile,
}: {
  story: TStorySchema;
  profile: TProfileSchema | null;
}) => {
  const [wasLikedByMe, setWasLikedByMe] = useState(
    !profile ? false : profile.likeStories.includes(story.id)
  );

  const [wasDisLikedByMe, setWasDisLikedByMe] = useState(
    !profile ? false : profile.dislikeStories.includes(story.id)
  );

  const [likes, setLikes] = useState(story.noOfLikes);
  const [dislikes, setDislikes] = useState(story.noOfDislikes);
  const [isLoading, setIsLoading] = useState(false);
  const [loginToast, setLoginToast] = useState(false);

  const handleClick = async (isLike: boolean) => {
    if (!profile) {
      setLoginToast(true);
      return;
    }

    if ((wasLikedByMe && isLike) || (wasDisLikedByMe && !isLike)) return;
    let url = `/grade`;
    url += isLike ? "/like" : "/dislike";
    url += `/${story.id}`;
    console.log(url);
    setIsLoading(true);
    fetchClient(url, {
      method: "PUT",
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw data;

        updateProfileLocalStorage({ isLike, storyId: story.id });
        setDislikes((p) => data.dislikedBy.length);
        setLikes((p) => data.likedBy.length);

        // @ts-ignore
        setWasLikedByMe(data.likedBy.includes(profile!._id));
        // @ts-ignore
        setWasDisLikedByMe(data.dislikedBy.includes(profile!._id));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <LoginToast open={loginToast} toggleOpen={(val) => setLoginToast(val)} />
      <Button
        size="1"
        variant="ghost"
        disabled={isLoading}
        aria-disabled
        onClick={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await handleClick(true);
        }}
      >
        {wasLikedByMe}
        {/* @ts-ignore */}
        {wasLikedByMe ? <AiFillLike /> : <AiOutlineLike />} {likes}
      </Button>
      <Button
        size="1"
        variant="ghost"
        disabled={isLoading}
        onClick={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await handleClick(false);
        }}
      >
        {wasDisLikedByMe ? <AiFillDislike /> : <AiOutlineDislike />} {dislikes}
      </Button>
    </>
  );
};

export default LikeDislike;

"use client";
import { Box, Container, ScrollArea } from "@radix-ui/themes";
import React, { useEffect, useRef, useState } from "react";

import fetchClient from "@/lib/fetchClient";
import { TStorySchema } from "@/shared-lib";
import { GetResponse } from "@/shared-lib/endpoints/main";
import StoryCard from "./StoryCard";
import { TProfileSchema } from "@/shared-lib/endpoints/profile";

const getStories = async (setStories: any, crtState: any) => {
  try {
    crtState.current.isFetching = true;

    const page = crtState.current.page + 1;
    const res = await fetchClient(
      `/stories?page=${page}&limit=50&select=-description&populate=author,tags`,
      {},
      false
    );
    console.log("page: ", page);
    const { data: stories }: GetResponse<TStorySchema[]> = await res.json();
    if (!stories.length) {
      crtState.current.hasNoMore = true;
      return;
    }
    // console.log("stories: ", stories);
    setStories((p: any) => {
      if (!p.length) {
        console.log("one");
        return stories;
      }
      console.log("two: ");
      return [...p, ...stories];
    });
    crtState.current.page = page;
  } catch {
  } finally {
    crtState.current.isFetching = false;
  }
};

const StoryCards = () => {
  const [stories, setStories] = useState<TStorySchema[]>([]);
  const crtState = useRef({
    page: 0,
    hasNoMore: false,
    isFetching: false,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await getStories(setStories, crtState);
      } catch {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const scrollRef = useRef<HTMLDivElement>();

  const handleScroll = async (e: any) => {
    if (
      !scrollRef.current ||
      loading ||
      crtState.current.isFetching ||
      crtState.current.hasNoMore
    )
      return;

    const triggerHeight =
      // @ts-ignore
      scrollRef.current.scrollTop + scrollRef.current.offsetHeight;

    if (
      triggerHeight + 300 >=
      // @ts-ignore
      scrollRef.current.scrollHeight
    ) {
      console.log("first");
      await getStories(setStories, crtState);
    }
  };
  return (
    <ScrollArea
      type="auto"
      scrollbars="vertical"
      size="2"
      style={{
        height: "100%",
      }}
      //   @ts-ignore
      ref={scrollRef}
      onScroll={handleScroll}
    >
      <Container size="2">
        <Box className="flex flex-col gap-2 pt-4">
          {stories.map((story, index) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </Box>
      </Container>
    </ScrollArea>
  );
};

export default StoryCards;

'use client';
import { TStorySchema } from '@/shared-lib';
import { Container, ScrollArea } from '@radix-ui/themes';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import StoryCard from '../_StoryCards/StoryCard';
import fetchClient from '@/lib/fetchClient';
import { GetResponse } from '@/shared-lib/endpoints/main';

const getStories = async (
  page: number,
  limit?: number,
  cb?: (x: GetResponse<TStorySchema>) => void
) => {
  const res = await fetchClient(
    `/stories?page=${page}&limit=${limit}&select=-description&populate=author,tags`,
    {},
    false
  );

  const data: GetResponse<TStorySchema> = await res.json();
  if (cb) cb(data);
  return data;
};

const StoryRenderer = ({ containerHeight }: { containerHeight: number }) => {
  const [stories, setStories] = useState<TStorySchema[]>([]);

  const fetchRef = useRef({
    nextPage: 2,
    isFetching: false,
  });

  const itemHeight = 132;

  const [scrollTop, setScrollTop] = useState(0);

  const noOfItemsinView = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + noOfItemsinView, stories.length);

  const limit = noOfItemsinView * 4;

  const visibleItems = stories.slice(startIndex, endIndex);
  const [hasNoMore, setHasNoMore] = useState(false);

  // intial fetch
  useEffect(() => {
    if (!limit) return;
    (async () => {
      try {
        await getStories(1, limit, (data: any) => {
          setStories((p) => (p.length ? [...p, ...data.data] : data.data));
          fetchRef.current.nextPage = data.pagination.next;
        });
      } catch (err) {}
    })();
  }, [limit]);

  const containerRef = useRef<any>();

  const handleScroll = useCallback(() => {
    setScrollTop(containerRef.current.scrollTop);
    if (hasNoMore) return;
    const triggerHeight =
      containerRef.current.scrollTop + containerRef.current.offsetHeight;

    if (
      !fetchRef.current.isFetching &&
      triggerHeight + 100 >= containerRef.current.scrollHeight
    ) {
      fetchRef.current.isFetching = true;
      getStories(fetchRef.current.nextPage, limit, (data: any) => {
        setStories((p) => [...p, ...data.data]);
        if (!data.pagination.next) setHasNoMore(true);
        fetchRef.current.nextPage = data.pagination.next;
        fetchRef.current.isFetching = false;
      });
    }
  }, [hasNoMore, limit]);

  const invisibleItemsHeight =
    (startIndex + visibleItems.length - endIndex) * itemHeight;

  const throttle = useRef<boolean>(false);
  const throttleTimeoutRef = useRef<number>();
  useEffect(() => {
    // @ts-ignore
    throttleTimeoutRef.current = setInterval(() => {
      if (throttle.current) handleScroll();
      throttle.current = false;
    }, 500);
    return () => {
      clearTimeout(throttleTimeoutRef.current);
    };
  }, [handleScroll]);

  const throttleHandleScroll = () => {
    throttle.current = true;
  };

  useEffect(() => {
    const conatinerDiv = containerRef.current;
    conatinerDiv.addEventListener('scroll', throttleHandleScroll);
    return () => {
      conatinerDiv?.removeEventListener('scroll', throttleHandleScroll);
    };
  }, []);

  return (
    <ScrollArea
      ref={containerRef}
      style={{
        height: containerHeight,
      }}
      scrollbars="vertical"
      size="3"
    >
      <Container size="3">
        <div
          style={{
            height: `${stories.length * itemHeight}px`,
          }}
        >
          <div
            style={{
              position: 'relative',
              height: `${visibleItems.length * itemHeight}px`,
              width: `100%`,
              top: `${startIndex * itemHeight}px`,
            }}
          >
            {visibleItems.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
          <div style={{ height: `${invisibleItemsHeight}px` }} />

          <small className="text-center italic block relative bottom-0">
            {hasNoMore ? 'The End' : 'Loading...'}
          </small>
        </div>
      </Container>
    </ScrollArea>
  );
};

export default StoryRenderer;

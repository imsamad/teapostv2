'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import StoryRenderer from './Renderer';

const Wrapper = () => {
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const containerRef = useRef<any>();

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    setContainerHeight(containerRef.current.offsetHeight);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute top-0 right-0 bottom-0 left-0 overflow-hidden"
    >
      {!containerHeight ? (
        ''
      ) : (
        <StoryRenderer containerHeight={containerHeight} />
      )}
    </div>
  );
};

export default Wrapper;

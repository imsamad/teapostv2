export const readingTime = (content: string) => {
  const words = content.trim().split(/\s+/).length;
  const wpm = 200;
  const time = Math.ceil(words / wpm);
  return time;
};

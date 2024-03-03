export const readingTime = (content: string) => {
  const words = content.trim().split(/\s+/).length;
  const wpm = 200;
  const time = Math.ceil(words / wpm);
  return time;
};
export function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// takes data as UNIX timestamp seconds
export const isXWeeksAgo = date => {
  const seconds = Math.floor(new Date() / 1000 - date);
  const weeks = Math.floor(seconds / 60 / 60 / 24 / 7);
  return weeks;
};

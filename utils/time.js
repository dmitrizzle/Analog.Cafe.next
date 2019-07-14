// takes data as UNIX timestamp seconds
export const isXWeeksAgo = date => {
  const seconds = Math.floor(new Date() / 1000 - date);
  const weeks = Math.floor(seconds / 60 / 60 / 24 / 7);
  return weeks;
};

export const getHumanDatestamp = (unix, short) => {
  const m = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = new Date(unix * 1000);
  let year = date.getFullYear();
  let month = short ? m[date.getMonth()].slice(0, 3) : m[date.getMonth()];
  let day = date.getDate();
  return month + " " + day + ", " + year;
};

export const getLunarDatestamp = unix => {
  let date = new Date(unix * 1000);
  return date.getDate() + "☾" + (date.getMonth() + 1);
};

export const getISODatestamp = unix => {
  let date = new Date(unix * 1000);
  return date.toISOString();
};

export const dateFromUnix = unix => {
  return {
    unix,
    iso: getISODatestamp(unix),
    human: getHumanDatestamp(unix),
  };
};

// takes number of words and images to compile reading time
export const readingTime = stats =>
  stats ? Math.ceil(stats.words / 250 + stats.images * 0.25) : 0;

export const readType = (images, readingTime) => {
  const longRead = readingTime > 4 ? true : false;
  const wellIllustrated = images / readingTime > 1 ? true : false;
  const inDepth = wellIllustrated && longRead ? true : false;

  if (wellIllustrated) return "a well-illustrated";
  if (longRead) return "an in-depth";
  if (inDepth) return "an in-depth, well-illustrated";
  return "a short";
};

// takes data as UNIX timestamp seconds
export const isXWeeksAgo = date => {
  const seconds = Math.floor(new Date() / 1000 - date);
  const weeks = Math.floor(seconds / 60 / 60 / 24 / 7);
  return weeks;
};

export const getHumanDatestamp = (unix, short) => {
  const m = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let date = new Date(unix * 1000);
  let year = date.getFullYear();
  let month = short ? m[date.getMonth()].slice(0, 3) : m[date.getMonth()];
  let day = date.getDate();
  return month + " " + day + ", " + year;
};

// takes number of words and images to compile reading time
export const readingTime = stats =>
  Math.ceil(stats.words / 250 + stats.images * 0.25);

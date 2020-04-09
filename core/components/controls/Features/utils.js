export const centerFeaturedPoster = ({ activeCollection }) => {
  // center featured poster
  let posterElement;
  let left;

  if (activeCollection)
    posterElement = document.getElementById(`poster-${activeCollection}`);

  const wallElement = document.getElementById("feature-wall");
  const windowWidth = window.innerWidth;

  left = 0;
  if (posterElement)
    left =
      posterElement.offsetLeft -
      windowWidth / 2 +
      posterElement.offsetWidth / 2;

  wallElement.scrollTo && wallElement.scrollTo({ left, behavior: "smooth" });
};

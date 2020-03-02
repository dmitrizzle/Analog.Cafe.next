export const centerFeaturedPoster = ({ activeCollection }) => {
  // center featured poster
  if (!activeCollection) return;

  const posterElement = document.getElementById(`poster-${activeCollection}`);
  const wallElement = document.getElementById("feature-wall");
  const windowWidth = window.innerWidth;

  const left =
    posterElement.offsetLeft - windowWidth / 2 + posterElement.offsetWidth / 2;

  if (!left) return;
  wallElement.scrollTo({ left, behavior: "smooth" });
};

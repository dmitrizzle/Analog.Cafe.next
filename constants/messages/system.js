export const NAME = "Analog.Cafe";
export const DESCRIPTION_SHORT = "A Film Photography Magazine";

export const ROUTE_MESSAGES = {
  // defaults
  "/": {
    title: `“${DESCRIPTION_SHORT}”`,
    description: `Created by film photographers, artists, and writers of the internet. Published weekly. Maintained as an open-source project by Dmitri.`,
    designation: "homepage",
  },
  default: {
    title: `“${DESCRIPTION_SHORT}”`,
  },

  // sections/topics
  "/photo-essays": {
    title: "Photo Essays",
    description:
      "A collection of abstract photography, thought-provoking essays, observations, travel, culture, and items of interest.",
  },
  "/film-photography": {
    title: "Film Photography",
    description:
      "Articles, reviews, and guides on film photography and the stories of its influence on art and culture.",
  },
  "/editorials": {
    title: "Editorials",
    description: "",
  },
  "/collaborations": {
    title: "Collaborations",
    description: "",
  },
  "/solo-projects": {
    title: "Solo Projects",
    description: "",
  },

  // user
  "/submitssions": {
    title: "Your submissions to Analog.Cafe",
  },
  "/u/*": {
    title: "Published work",
    description:
      "All published works by the author, including images and text published in collaboration with other authors.",
  },
  "/favourites": {
    title: "Your favourites",
    description: "Articles you favourited and added to your list.",
  },
};

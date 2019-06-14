import { DESCRIPTION_SHORT } from "../../../../constants/messages/app";

export const STATUS = {
  pending: "In Queue",
  rejected: "Not Published",
  unpublished: "Unpublished",
  scheduled: "Scheduled",
  published: "Published",
};

export const ROUTE_TAGS = {
  "/submissions": "",
  "/photo-essays": "photo-essay",
  "/film-photography": "film-photography",
  "/editorials": "editorial",
  "/": "",
};
export const ROUTE_FILTERS = {
  "/collaborations": "collaboration",
  "/solo-projects": "solo",
};

export const ROUTE_LABELS = {
  "/": {
    title: `“${DESCRIPTION_SHORT}”`,
    description: `Created by film photographers, artists, and writers of the internet. Published weekly. Maintained as an open-source project by Dmitri.`,
    designation: "homepage",
  },
  default: {
    title: `“${DESCRIPTION_SHORT}”`,
  },
  "/photo-essays": {
    title: "Photo Essays",
    description:
      "A collection of abstract photography, thought-provoking essays, observations, travel, culture, and items of interest.",
    width: "7em",
  },
  "/film-photography": {
    title: "Film Photography",
    description:
      "Articles, reviews, and guides on film photography and the stories of its influence on art and culture.",
    width: "9em",
  },
  "/editorials": {
    title: "Editorials",
    description: "",
    width: "5.5em",
  },
  "/collaborations": {
    title: "Collaborations",
    description: "",
    width: "8em",
  },
  "/solo-projects": {
    title: "Solo Projects",
    description: "",
  },
  "/submissions": {
    title: "Your submissions to Analog.Cafe",
  },
  "/is/*": {
    title: "Published work",
    description:
      "All published works by the author, including images and text published in collaboration with other authors.",
  },
  "/favourites": {
    title: "Your favourites",
    description: "Articles you favourited and added to your list.",
  },
};

export const PLACEHOLDER = [
  {
    type: "placeholder",
    tag: "////////",
    title: "//////// ////// //",
    subtitle: "////// /// /////////// //",
    id: "0000000",
    author: {
      name: "//////",
    },
    summary: "/ //////// ////// //// //// ////////// //// //////////////// //",
  },
  {
    type: "placeholder",
    tag: "////",
    title: "//////// /// /////////",
    subtitle: "// //// /// //// /////////",
    id: "0000001",
    author: {
      name: "/////",
    },
    summary: "///// //////////// //////// /// /////////// //////////////////",
  },
  {
    type: "placeholder",
    tag: "/////////",
    title: "// ////// ////// ///////",
    subtitle: "////// /// // ///////////",
    id: "0000002",
    author: {
      name: "// ////",
    },
    summary: "/ ////////// ////// ////// /////////// /// /////////// /////////",
  },
];

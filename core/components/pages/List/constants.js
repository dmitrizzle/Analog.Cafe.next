import { DESCRIPTION_SHORT } from "../../../../constants/messages/app";
import { DOMAIN } from "../../../../constants/routes";

const mode = process.env.NODE_ENV.toUpperCase();
export const API = {
  LIST: DOMAIN.PROTOCOL[mode] + DOMAIN.API[mode] + "/list",
  SUBMISSIONS: DOMAIN.PROTOCOL[mode] + DOMAIN.API[mode] + "/submissions",
  FAVOURITES: DOMAIN.PROTOCOL[mode] + DOMAIN.API[mode] + "/favourites",
  AUTHORS: DOMAIN.PROTOCOL[mode] + DOMAIN.API[mode] + "/authors",
  ARTICLES: DOMAIN.PROTOCOL[mode] + DOMAIN.API[mode] + "/articles",
};

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

import { NAME } from "../../../../constants/messages/system";

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
  "/apps-and-downloads": "download",
  "/": "",
};
export const ROUTE_FILTERS = {
  "/collaborations": "collaboration",
  "/solo-projects": "solo",
};

export const ROUTE_LABELS = {
  "/": {
    title: NAME,
    description: `Created by film photographers, artists, and writers of the internet. Published weekly. Maintained as an open-source project by Dmitri.`,
    designation: "homepage",
    width: "6.2em",
  },
  default: {
    title: NAME,
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
    description:
      "Annoucements and community letters from Analog.Cafe editorial staff.",
    width: "5.5em",
  },
  "/apps-and-downloads": {
    title: "Apps & Downloads",
    description:
      "Downloadable reads (in PDF format) for offline reading and app downloads.",
    width: "9.5em",
  },
  "/collaborations": {
    title: "Collaborations",
    description: "Reads written by more than one author and/or photographer.",
    width: "8em",
  },
  "/solo-projects": {
    title: "Solo Projects",
    description: "",
    width: "7em",
  },
  "/submissions": {
    title: "Your submissions to Analog.Cafe",
  },
  "/u/*": {
    title: "Published work",
    description:
      "All published works by the author, including images and text published in collaboration with other authors.",
  },
};

export const PLACEHOLDER = [
  {
    type: "placeholder",
    tag: "",
    title: "",
    subtitle: "",
    id: "0000000",
    author: {
      name: "",
    },
    summary: "",
  },
  {
    type: "placeholder",
    tag: "",
    title: "",
    subtitle: "",
    id: "0000001",
    author: {
      name: "",
    },
    summary: "",
  },
  {
    type: "placeholder",
    tag: "",
    title: "",
    subtitle: "",
    id: "0000002",
    author: {
      name: "",
    },
    summary: "",
  },
];

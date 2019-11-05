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
  "/printables-and-downloads": "link",
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
    title: "Stories, Essays, Opinions",
    description:
      "A collection of abstract photography, thought-provoking essays, observations, travel, culture, and items of interest.",
    width: "12.25em",
  },
  "/film-photography": {
    title: "Film, Photography, Cameras",
    description:
      "Articles, reviews, and guides on film photography and the stories of its influence on art and culture.",
    width: "7.75em",
  },
  "/editorials": {
    title: "Letters & Editorials",
    description:
      "Annoucements and community letters from Analog.Cafe editorial staff.",
    width: "9.5em",
  },
  "/printables-and-downloads": {
    title: "Printable Guides & Downloads",
    description:
      "Downloadable reads (in PDF format) for offline reading, links, and apps.",
    width: "13em",
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
  "/account/all-submissions": {
    title: "Your Submissions",
    width: "9em",
  },
  "/account": {
    title: "Bookmarks",
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

import React from "react";

import { NAME } from "../../../../constants/messages/system";
import { rewrites } from "../../../../constants/router/transformations";
import Save from "../../icons/Save";

export const STATUS = {
  pending: "In Queue",
  rejected: "Not Published",
  unpublished: "Unpublished",
  scheduled: "Scheduled",
  published: "Published",
};

export const ROUTE_COLLECTIONS = (() => {
  let collections = {};
  rewrites
    .filter(rewrite => rewrite.params && rewrite.params.collection)
    .forEach(rewrite => {
      collections[rewrite.url] = rewrite.params.collection;
    });
  return collections;
})();
export const ROUTE_TAGS = {
  "/film-photography": "film-photography",
  "/photo-essays": "photo-essay",
  "/editorials": "editorial",
  "/apps-and-downloads": "link",

  "/account": "account",
  "/submissions": "",
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
  },
  default: {
    title: NAME,
  },
  "/photo-essays": {
    title: "Photo Essays",
    poster: "image-froth_1000000_BJu3vB9Hr",
    description:
      "Find new places, stories, and thought/creative experiments. Indie photo essays are a great way to explore niche talent and learn inspiring ideas from around the world.",
  },
  "/film-photography": {
    poster: "image-froth_1502090_DFYNZWIO",
    title: "Film Photography",
    description:
      "Read photography tips, experiences, stories, guides, and gear reviews. If you shoot or thinking of shooting film, these reads are for you. Discover the bliss that is creating analogue images!",
  },
  "/editorials": {
    poster: "image-froth_1600000_HkIXPnUer",
    title: "Letters and Editorials",
    description:
      "Catch up on industry news and community announcements via expansive monthly “letters,” published here and sent monthly to everyone who’s got a free Analog.Cafe account.",
  },
  "/apps-and-downloads": {
    poster: "image-froth_1502090_DFYNZWIO",
    title: "Apps and Downloads",
    description:
      "Download film photography guides to print, save, or read offline. Interactive calculators, tools, and references can also be found here. Note that you may need to sign in to use some of these items.",
  },
  "/collaborations": {
    title: "Collaborations",
    description: "Reads written by more than one author and/or photographer.",
  },
  "/solo-projects": {
    title: "Solo Projects",
    description: "",
  },
  "/account/all-submissions": {
    title: "Your Submissions",
  },
  "/account": {
    title: "Your Account",
    description:
      "Articles, apps, and downloads that you “bookmark” are stored with your Analog.Cafe account and can be found here. Create and quickly access your own collection of reads and references.",
  },
  "/account/bookmarks": {
    title: (
      <>
        <Save style={{ height: ".65em", marginTop: "-.15em" }} /> Bookmarks
      </>
    ),
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

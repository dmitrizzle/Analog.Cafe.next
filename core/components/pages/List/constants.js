import React from "react";

import { NAME } from "../../../../constants/messages/system";
import { rewrites } from "../../../../constants/router/transformations";
import Bookmark from "../../icons/Bookmark";

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
  "/apps-and-downloads": "link",
  "/editorials": "editorial",
  "/film-photography": "film-photography",
  "/photo-essays": "photo-essay",
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
    description: `Weekly photo essays on art, travel, and culture. Aarticles on analogue cameras, film, history, and techniques.`,
    designation: "homepage",
  },
  default: {
    title: NAME,
  },
  "/photo-essays": {
    title: "All Photo Essays",
    poster: "image-froth_1502065_X1aQSPxF",
    description:
      "Find new places, stories, and thought/creative experiments. Indie photo essays are a great way to explore niche talent and learn inspiring ideas from around the world.",
  },
  "/film-photography": {
    poster: "image-froth_1250000_HJW92rwFm",
    title: "All Film Photography Articles",
    description:
      "Read photography tips, experiences, stories, guides, and gear reviews. If you shoot or thinking of shooting film, these reads are for you. Discover the bliss that is creating analogue images!",
  },
  "/editorials": {
    poster: "image-froth_1000000_Gprk5EvLS",
    title: "Community Letters",
    description:
      "Catch up on industry news and community announcements via expansive monthly “Community Letters,” published here and sent monthly to everyone who’s got a free Analog.Cafe account.",
  },
  "/apps-and-downloads": {
    poster: "image-froth_915090_05378814ac7d4b9b9352b603f2d944de",
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
        <Bookmark style={{ height: ".65em", marginTop: "-.15em" }} />
        Bookmarks
      </>
    ),
  },
  "/account/subscriptions": {
    title: "Subscriptions",
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
    title: "Loading items…",
    subtitle: "Please wait.",
    status: "Loading",
    id: "0000000",
    author: {
      name: "",
    },
    summary: "",
  },
];

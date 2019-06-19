import React from "react";

import { ROUTE_MESSAGES } from "../../../constants/messages";
import { buttonMaker } from "./utils";
import Cube from "../../icons/Cube";
import topics from "../Topics";

export const MENU_BUTTONS = props => [
  {
    hidden: true,
    to: "/nav/topics",
    onClick: event => {
      event.preventDefault();
      event.stopPropagation();
      props.setModal(topics(props.router.asPath));
    },
    text: "Topics",
    keywords:
      "topics,sections,magazine,call for entries,Get Featured,Write for Analog.Cafe,publish,guest blog, submit, contribute",
  },
  // {
  //   to: "/favourites",
  //   text: (
  //     <span>
  //       <Heart style={props.iconStyles} /> Favourites
  //     </span>
  //   ),
  //   keywords: "likes, saved, favourite"
  // },
  // {
  //   to: "/submissions",
  //   text: "Submissions",
  //   keywords: "contribute, guest, upload, submissions",
  //   memberOnly: true,
  // },
  {
    to: "/submit",
    text: "Submissions",
    keywords: "contribute, guest, upload,submissions",
    visitorOnly: true,
  },
  // {
  //   to: "/submit/compose",
  //   text: "",
  //   //  loadTextContent().length > 0 ? "Edit Submission Draft" : "New Submission",
  //   keywords:
  //     "compose, submit, write, upload, send, cntribute, edit, submission, draft",
  //   hidden: true,
  //   // hidden: loadTextContent().length === 0
  // },
  // {
  //   to: `/profile/edit`,
  //   text: (
  //     <span>
  //       <RHCP style={props.iconStyles} /> Profile & Settings
  //     </span>
  //   ),
  //   keywords: "account, avatar, link, bio, profile, settings",
  //   memberOnly: true,
  // },

  buttonMaker("/sign-out", {
    keywords: "log out, exit",
    attributes: {
      memberOnly: true,
    },
  }),

  buttonMaker("/sign-in", {
    keywords: "sign up, create account, password",
    attributes: {
      visitorOnly: true,
    },
  }),
  { divider: true },
  {
    to: "/features",
    hidden: true,
    text: (
      <span>
        <Cube style={props.iconStyles} /> Features
      </span>
    ),
    keywords:
      "photography,podcast,audio,downloads,guides,reference,price,reviews,features,resources,must,reads",
  },

  buttonMaker("/about", {
    keywords: "about,who,what,where,how,authors,editors,contact,backers",
    attributes: { mobile: "on" },
  }),

  buttonMaker("/film-photography", {
    keywords: "science, camera, emulsion",
    attributes: { hidden: true },
  }),
  buttonMaker("/photo-essays", {
    keywords: "art, photography",
    attributes: { hidden: true },
  }),
  buttonMaker("/editorials", { attributes: { hidden: true } }),
  buttonMaker("/solo-projects", { attributes: { hidden: true } }),
  {
    to: "/collaborations",
    text: "Collaborations",
    keywords:
      ROUTE_MESSAGES["/collaborations"].title +
      ROUTE_MESSAGES["/collaborations"].description,
    hidden: true,
  },
  { to: "/submit/rules", text: "Rules", keywords: "rules,terms,conditions" },
  { to: "/privacy-policy", text: "Privacy", keywords: "privacy policy" },
  {
    to: "https://www.etsy.com/ca/shop/AnalogCafeShop",
    text: (
      <span>
        <span style={{ color: "#ed236e" }}>Etsy</span> Shop
      </span>
    ),
    keywords: "etsy,store,buy,shop,camera",
  },
];

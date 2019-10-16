import React from "react";

import { ROUTE_LABELS } from "../../pages/List/constants";
import { buttonMaker } from "./utils";
import Save from "../../icons/Save";
import topics from "../Topics";

export const MENU_BUTTONS = props => [
  { divider: true },
  {
    hidden: true,
    to: "/nav/topics",
    onClick: event => {
      if (props.router) {
        // if no router present in props, most likely the menu is to be displayed
        // as a sandalone page on /nav/menu - so none of the below actions are helpful
        event.preventDefault();
        event.stopPropagation();
        props.setModal(topics(props.router.asPath));
      }
    },
    text: "Topics",
    keywords:
      "topics,sections,magazine,call for entries,Get Featured,Write for Analog.Cafe,publish,guest blog, submit, contribute",
  },

  {
    to: "/account",
    text: (
      <>
        <Save style={{ width: "1em", marginTop: "-.4em" }} stroke="none" /> Your
        Account
      </>
    ),
    keywords: "sign up, sign in, create account, password",
  },
  {
    to: "/account/all-submissions",
    text: "Your Submissions",
    keywords: "contribute, guest, upload, submissions",
    memberOnly: true,
  },
  {
    to: "/submit",
    text: "Submissions",
    keywords: "contribute, guest, upload,submissions",
    visitorOnly: true,
  },

  {
    to: "/submit/draft",
    text: "Composer App",
    keywords: "compose, composer, draft, submit, create, edit, write, upload",
  },

  buttonMaker("/sign-out", {
    keywords: "log out, exit",
    attributes: {
      memberOnly: true,
    },
  }),

  { divider: true },
  {
    to: "/links-and-downloads",
    hidden: true,
    text: "Links & Downloads",
    keywords:
      "App,PDF,offline,photography,podcast,audio,downloads,guides,reference,price,reviews,features,resources,must,reads",
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
      ROUTE_LABELS["/collaborations"].title +
      ROUTE_LABELS["/collaborations"].description,
    hidden: true,
  },
  { to: "/submit/rules", text: "Rules", keywords: "rules,terms,conditions" },
  { to: "/privacy-policy", text: "Privacy", keywords: "privacy policy" },
  {
    to: "https://www.etsy.com/shop/FilmBase",
    text: (
      <span>
        <span style={{ color: "#ed236e" }}>Etsy</span> Shop
      </span>
    ),
    keywords:
      "etsy,store,buy,shop,camera,filmbase,film,base,cameras,sale,purchase",
  },
];

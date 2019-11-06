import React from "react";

import { ROUTE_LABELS } from "../../pages/List/constants";
import { buttonMaker } from "./utils";
import User from "../../icons/User";
import menu from "../Menu";

export const MENU_BUTTONS = props => [
  {
    to: "/film-photography",
    text: "Film, Photography, Cameras",
    keywords: "science, camera, emulsion",
  },
  {
    to: "/photo-essays",
    text: "Stories, Essays, Opinions",
    keywords: "art, photography",
  },
  {
    to: "/editorials",
    text: "Letters & Editorials",
    keywords: "release,email,new",
  },
  {
    to: "/printables-and-downloads",
    text: "Printable Guides & Downloads",
    keywords:
      "App,PDF,offline,photography,podcast,audio,downloads,guides,reference,price,reviews,features,resources,must,reads",
  },

  {
    hidden: true,
    to: "/nav/menu",
    onClick: event => {
      if (props.router) {
        // if no router present in props, most likely the menu is to be displayed
        // as a sandalone page on /nav/menu - so none of the below actions are helpful
        event.preventDefault();
        event.stopPropagation();
        props.setModal(menu(props.router.asPath));
      }
    },
    text: "Menu",
    keywords: "About,composer,submit,sign,rules,privacy,store",
  },

  {
    hidden: true,
    to: "/account",
    text: "Your Account",
    keywords: "sign up, sign in, create account, password, bookmarks, saved",
  },
  {
    hidden: true,
    to: "/account/all-submissions",
    text: "Your Submissions",
    keywords: "contribute, guest, upload, submissions",
    memberOnly: true,
  },
  {
    hidden: true,
    to: "/submit",
    text: "Submissions",
    keywords: "contribute, guest, upload,submissions",
    visitorOnly: true,
  },

  {
    hidden: true,
    to: "/submit/draft",
    text: "Composer App",
    keywords: "compose, composer, draft, submit, create, edit, write, upload",
  },

  buttonMaker("/sign-out", {
    keywords: "log out, exit",
    attributes: {
      memberOnly: true,
      hidden: true,
    },
  }),

  buttonMaker("/about", {
    attributes: { hidden: true },
    keywords: "about,who,what,where,how,authors,editors,contact,backers",
  }),

  buttonMaker("/solo-projects", { attributes: { hidden: true } }),
  {
    to: "/collaborations",
    text: "Collaborations",
    keywords:
      ROUTE_LABELS["/collaborations"].title +
      ROUTE_LABELS["/collaborations"].description,
    hidden: true,
  },
  {
    hidden: true,
    to: "/submit/rules",
    text: "Rules",
    keywords: "rules,terms,conditions",
  },
  {
    hidden: true,
    to: "/privacy-policy",
    text: "Privacy",
    keywords: "privacy policy",
  },
  {
    hidden: true,
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

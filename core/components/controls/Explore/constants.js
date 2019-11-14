import React from "react";

import { ROUTE_LABELS } from "../../pages/List/constants";
import { buttonMaker } from "./utils";
import menu from "../Menu";
import Burger from "../../icons/Burger";

export const MENU_BUTTONS = props => [
  {
    to: "/film-photography",
    text: "Film, Photography",
    keywords: "science, camera, emulsion",
  },
  {
    to: "/photo-essays",
    text: "Essays, Stories",
    keywords: "art, photography",
  },
  {
    to: "/printables-and-downloads",
    text: "Downloads",
    keywords:
      "App,PDF,offline,photography,podcast,audio,downloads,guides,reference,price,reviews,features,resources,must,reads",
  },
  {
    to: "/editorials",
    text: "Letters, Editorials",
    keywords: "release,email,new",
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
    keywords: "contribute, guest, upload, submissions, write",
    memberOnly: true,
  },
  {
    hidden: true,
    to: "/write",
    text: "Submissions",
    keywords: "contribute, guest, upload,submissions",
    visitorOnly: true,
  },

  {
    hidden: true,
    to: "/write/draft",
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
    to: "/write/rules",
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
  {
    hidden: true,
    to: "/",
    text: "Analog.Cafe Homepage",
    keywords: "home,index,all,newest,about,main",
  },
  {
    mobile: "on",
    to: "/nav/menu",
    onClick: event => {
      if (props.router) {
        // if no router present in props, most likely the menu is to be displayed
        // as a sandalone page on /nav/menu - so none of the below actions are helpful
        event.preventDefault();
        event.stopPropagation();
        props.setModal(menu(props));
      }
    },
    inverse: true,
    text: (
      <>
        <Burger /> Menu
      </>
    ),
    keywords: "menu,About,composer,submit,sign,rules,privacy,store",
  },
];

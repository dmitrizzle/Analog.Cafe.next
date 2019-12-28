import React from "react";

import { ETSY_DISCOUNTS } from "../Nav/constants";
import { ROUTE_LABELS } from "../../pages/List/constants";
import { buttonMaker } from "./utils";
import Save from "../../icons/Save";

export const MENU_BUTTONS = props => {
  return [
    {
      to: "/",
      text: "Front Page",
      keywords: "home,index,all,newest,about,main,Analog.Cafe",
    },
    {
      to: "/film-photography",
      text: "Film, Photography",
      keywords: "science, camera, emulsion",
    },

    {
      to: "/editorials",
      text: "Letters, Editorials",
      keywords: "release,email,new",
    },
    {
      to: "/photo-essays",
      text: "Essays, Stories",
      keywords: "art, photography",
    },
    {
      to: "/apps-and-downloads",
      text: "Apps & Downloads",
      keywords:
        "App,PDF,offline,photography,podcast,audio,downloads,guides,reference,price,reviews,features,resources,must,reads",
    },
    { divider: true },
    buttonMaker("/about", {
      attributes: { mobile: "on" },
      keywords: "about,who,what,where,how,authors,editors,contact,backers",
    }),

    {
      to: "/account",
      text: "Your Account",
      keywords: "sign up, sign in, create account, password, bookmarks, saved",
    },
    {
      to: "/account#bookmarks",
      text: (
        <>
          <Save style={{ height: "1em" }} /> Bookmarks
        </>
      ),
      memberOnly: true,
      keywords: "sign up, sign in, create account, password, bookmarks, saved",
    },

    {
      to: "/account/profile",
      text: "Profile & Settings",
      keywords: "sign up, sign in, create account, password, bookmarks, saved",
      memberOnly: true,
    },
    {
      to: "/account/all-submissions",
      text: "Your Submissions",
      keywords: "contribute, guest, upload, submissions, write",
      memberOnly: true,
    },

    {
      to: "/write/draft",
      text: props.composer.header.title
        ? "❡ Edit Submission Draft"
        : "+ Start New Submission",
      keywords: "compose, composer, draft, submit, create, edit, write, upload",
      memberOnly: true,
    },

    {
      to: "/write",
      text: "Submissions",
      keywords: "contribute, guest, upload,submissions",
      visitorOnly: true,
    },

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
      to: "/tos",
      text: "Terms and Conditions",
      keywords: "rules,terms,conditions",
    },
    {
      hidden: true,
      to: "/privacy-policy",
      text: "Privacy",
      keywords: "privacy policy",
    },

    {
      to: "/privacy-settings",
      text: "Privacy Settings",
      keywords: "privacy settings",
    },

    {
      hidden: true,
      to: "/disclaimer",
      text: "Disclaimer",
      keywords: "Disclaimer",
    },
    {
      hidden: true,
      to: "/cookie-poicy",
      text: "Cookie Policy",
      keywords: "Cookie Policy",
    },
    {
      hidden: true,
      to: "/acceptable-use-policy",
      text: "Acceptable Use Policy",
      keywords: "Acceptable Use Policy",
    },

    {
      mobile: "on",
      to: "https://www.etsy.com/shop/FilmBase",
      onClick: event => {
        if (props.user && props.user.status !== "ok") {
          event.preventDefault();
          window.requestAnimationFrame(() => props.setModal(ETSY_DISCOUNTS));
        }
      },
      text: (
        <>
          Etsy <span style={{ color: "#ed236e" }}>Shop</span>
        </>
      ),
      keywords:
        "etsy,store,buy,shop,camera,filmbase,film,base,cameras,sale,purchase",
    },
    buttonMaker("/sign-out", {
      keywords: "log out, exit",
      attributes: {
        memberOnly: true,
      },
    }),

    { socialButtons: true },

    { divider: true },
    // {
    //   mobile: "on",
    //   to: "/nav/your-account",
    //   onClick: event => {
    //     if (props.router) {
    //       // if no router present in props, most likely the menu is to be displayed
    //       // as a sandalone page on /nav/your-account - so none of the below actions are helpful
    //       event.preventDefault();
    //       event.stopPropagation();
    //       props.setModal(menu(props));
    //     }
    //   },
    //
    //   text: (
    //     <>
    //       <Burger /> Menu
    //     </>
    //   ),
    //   keywords: "menu,About,composer,submit,sign,rules,privacy,store",
    // },
  ];
};

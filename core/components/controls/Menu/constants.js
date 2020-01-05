import React from "react";

import { ROUTE_LABELS } from "../../pages/List/constants";
import { buttonMaker } from "./utils";
import { c_red } from "../../../../constants/styles/colors";
import Save from "../../icons/Save";

export const MENU_BUTTONS = props => {
  return [
    {
      to: "/shop",

      text: <span style={{ color: c_red }}>Shop</span>,
      keywords:
        "etsy,store,buy,shop,camera,filmbase,film,base,cameras,sale,purchase",
    },
    {
      to: "/",
      text: "Front Page",
      keywords: "home,index,all,newest,about,main,Analog.Cafe",
    },
    {
      to: "/apps-and-downloads",
      text: "Apps & Downloads",
      keywords:
        "App,PDF,offline,photography,podcast,audio,downloads,guides,reference,price,reviews,features,resources,must,reads",
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
      to:
        props.user && props.user.status !== "ok"
          ? "/sign-in"
          : "/account/bookmarks",
      text: (
        <>
          <Save style={{ height: "1em" }} /> Bookmarks
        </>
      ),
      keywords: "sign up, sign in, create account, password, bookmarks, saved",
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
      to: "/account/profile",
      text: "Profile & Settings",
      keywords: "sign up, sign in, create account, password, bookmarks, saved",
      memberOnly: true,
    },

    {
      to: "/write/draft",
      text: localStorage.getItem("composer-content-text")
        ? "❡ Edit | Submission Composer"
        : "+ New | Submission Composer",
      keywords: "compose, composer, draft, submit, create, edit, write, upload",
      memberOnly: true,
    },

    {
      to: "/write",
      text: "Submissions",
      keywords: "contribute, guest, upload,submissions",
      visitorOnly: true,
    },
    {
      to: "/account/all-submissions",
      text: "Your Submissions",
      keywords: "contribute, guest, upload, submissions, write",
      memberOnly: true,
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

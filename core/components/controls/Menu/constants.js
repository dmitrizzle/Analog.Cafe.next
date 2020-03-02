import React from "react";

import { ROUTE_LABELS } from "../../pages/List/constants";
import { buttonMaker } from "./utils";
import { c_red } from "../../../../constants/styles/colors";
import Save from "../../icons/Save";
import ls from "../../../../utils/storage/ls";

export const MENU_BUTTONS = props => {
  return [
    {
      to: "/",
      text: "Home",
      keywords: "front,page,home,index,all,newest,about,main,Analog.Cafe",
      hidden: true,
    },
    {
      to: "/film-photography",
      text: "Film Photography",
      keywords: "science, camera, emulsion",
      hidden: true,
    },
    {
      to: "/photo-essays",
      text: "Photo Essays",
      keywords: "art, photography",
      hidden: true,
    },

    {
      to: "/editorials",
      text: "Letters, Editorials",
      keywords: "release,email,new",
      hidden: true,
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
      to: "/account/bookmarks",
      text: (
        <span
          style={{
            display: "inline-block",
            marginLeft: "-1.25em",
          }}
        >
          <Save style={{ height: "1em" }} /> Bookmarks
        </span>
      ),
      keywords: "sign up, sign in, create account, password, bookmarks, saved",
      memberOnly: true,
    },
    {
      to: "/shop",
      text: "Shop Deals & Recos",
      keywords:
        "etsy,store,buy,shop,camera,filmbase,film,base,cameras,sale,purchase",
      memberOnly: true,
    },
    {
      to: "/apps-and-downloads",
      text: "Apps, Downloads",
      keywords:
        "App,PDF,offline,photography,podcast,audio,downloads,guides,reference,price,reviews,features,resources,must,reads",
      memberOnly: true,
    },
    { divider: true },

    // {
    //   to: "/account",
    //   text: "Your Account",
    //   keywords: "sign up, sign in, create account, password, bookmarks, saved",
    //   hidden: true,
    // },
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
      to: "/write/draft",
      text: ls.getItem("composer-content-text")
        ? "Edit Article Draft"
        : "Submit Article to Get Featured",
      keywords: "compose, composer, draft, submit, create, edit, write, upload",
      memberOnly: true,
    },

    {
      to: "/account/profile",
      text: "Profile and Settings",
      keywords: "sign up, sign in, create account, password, bookmarks, saved",
      memberOnly: true,
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
      to: "/privacy-tools",
      text: "Privacy Tools",
      keywords: "privacy settings",
      hidden: true,
    },
    {
      hidden: true,
      to: "/disclaimer",
      text: "Disclaimer",
      keywords: "Disclaimer",
    },
    {
      hidden: true,
      to: "/cookie-policy",
      text: "Cookie Policy",
      keywords: "Cookie Policy",
    },
    {
      hidden: true,
      to: "/acceptable-use-policy",
      text: "Acceptable Use Policy",
      keywords: "Acceptable Use Policy",
    },

    buttonMaker("/about", {
      keywords: "about,who,what,where,how,authors,editors,contact,backers",
      attributes: {
        visitorOnly: true,
      },
    }),

    {
      to: "/sign-in?ref=menu",
      text: "Sign In",
      keywords: "sign in, sign-in, account",
      visitorOnly: true,
    },
    buttonMaker("/sign-out", {
      keywords: "log out, exit",
      attributes: {
        memberOnly: true,
      },
    }),
    { socialButtons: true },

    { divider: true },
  ];
};

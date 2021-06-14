import React from "react";
import lscache from "lscache";
import styled from "styled-components";

import { ROUTE_LABELS } from "../../pages/List/constants";
import { bookmarksModal } from "../Features/components/PosterBookmarks";
import { buttonMaker } from "./utils";
import { capitalizeFirstLetter } from "../../../../utils/string";
import { setModal } from "../../../store/actions-modal";
import { toggleTheme } from "../../../store/actions-theme";
import Bookmark from "../../icons/Bookmark";
import Moon from "../../icons/Moon";

export const DarkModeWrap = styled.span`
  display: inline-block;
  margin-left: -1.25em;
  svg {
    height: 0.75em;
    transform: translate(0em, -0.1em);
    overflow: visible;
    path {
      stroke: transparent;
    }
  }
`;

export const MENU_BUTTONS = (dispatch, theme) => {
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
      text: "Community Letters",
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
      to: "/shop",
      text: "Shop",
      keywords:
        "etsy,store,buy,shop,camera,filmbase,film,base,cameras,sale,purchase",
      mobile: "on",
    },
    {
      to: "/account/bookmarks",
      onClick: event => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(setModal(bookmarksModal));
      },
      text: (
        <span
          style={{
            display: "inline-block",
            marginLeft: "-1.25em",
          }}
        >
          <Bookmark style={{ height: "1em" }} /> Bookmarks
        </span>
      ),
      keywords: "sign up, sign in, create account, password, bookmarks, saved",
      memberOnly: true,
    },
    {
      to: "/apps-and-downloads",
      text: "Apps and Downloads",
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
      text: lscache.get("composer-content-text")
        ? "Edit Article Draft"
        : "Write/Submit Your Article",
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
      to: "#dark-mode",
      onClick: event => {
        event.preventDefault();
        event.stopPropagation();
        event.target.blur();
        dispatch(toggleTheme());
      },
      text: (
        <DarkModeWrap mode={theme}>
          <Moon /> Theme: {capitalizeFirstLetter(theme)}
        </DarkModeWrap>
      ),
      keyworkds: "darkmode,dark,mode,theme,nightshift,night,day",
    },
    {
      to: "/account?ref=menu",
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
  ];
};

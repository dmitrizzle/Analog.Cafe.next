import React from "react";

import {
  CLOUDINARY_BASE,
  CLOUDINARY_TRANSFORM,
} from "../../../../../constants/cloudinary";
import { addSessionInfo } from "../../../../../user/store/actions-user";
import Poster from "./Poster";
import Save from "../../../icons/Save";
import ga from "../../../../../utils/data/ga";

export default ({
  activeCollection,
  withinArticle,
  status,
  dispatch,
  setActivePoster,
  setCollectionDescription,
}) => (
  <Poster
    scroll={false}
    collection
    active={"bookmarks" === activeCollection}
    className="feature-poster"
    key={0}
    to={`/account${status === "ok" ? "/bookmarks" : ""}`}
    id={"poster-bookmarks"}
    withinArticle={withinArticle ? 1 : 0}
    onClick={() => {
      ga("event", {
        category: "nav",
        action:
          "bookmarks" === activeCollection
            ? "list.feature.return"
            : "list.feature",
        label: `/account${status === "ok" ? "/bookmarks" : ""}`,
      });

      // send user to bookmarks after login
      if (status !== "ok") {
        dispatch(
          addSessionInfo({
            loginAction: `/account/bookmarks`,
          })
        );
      }

      if ("bookmarks" !== activeCollection) {
        setActivePoster(0);
        setCollectionDescription("Bookmarks");
      }
      if ("bookmarks" === activeCollection) {
        setCollectionDescription();
        setActivePoster();
      }
    }}
    style={{
      background: `url(${CLOUDINARY_BASE +
        CLOUDINARY_TRANSFORM(200, 200) +
        "image-froth_689358_61DGsh_e"}.jpg)`,
    }}
  >
    <Save
      style={{
        height: ".8em",
        padding: "0 0 .25em .175em",
      }}
    />
    Bookmarks
  </Poster>
);

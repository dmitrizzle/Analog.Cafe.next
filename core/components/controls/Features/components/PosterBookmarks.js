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
  setCollectionDescription,
}) => {
  return (
    <Poster
      scroll={withinArticle ? true : false}
      collection
      tag
      active={"bookmarks" === activeCollection}
      className="feature-poster"
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

        setCollectionDescription("Bookmarks");
      }}
    >
      <div>
        <div
          style={{
            background: `url(${CLOUDINARY_BASE +
              CLOUDINARY_TRANSFORM(200, 200) +
              "image-froth_689358_61DGsh_e"}.jpg)`,
          }}
        />
      </div>
      <em>
        <Save
          style={{
            height: ".83em",
            padding: "0 0 .25em .175em",
          }}
        />
        Bookmarks
      </em>
    </Poster>
  );
};

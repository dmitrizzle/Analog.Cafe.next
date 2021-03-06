import React from "react";

import { c_red } from "../../../../../constants/styles/themes";
import { setModal } from "../../../../store/actions-modal";
import Bookmark from "../../../icons/Bookmark";
import Poster from "./Poster";
import ga from "../../../../../utils/data/ga";

export const bookmarksModal = {
  status: "ok",
  info: {
    title: (
      <>
        <Bookmark style={{ height: "1em" }} fill={c_red} /> Bookmarks
      </>
    ),
    bookmarks: true,
  },
};

const PosterBookmarks = ({
  activeCollection,
  withinArticle,
  status,
  dispatch,
  setCollectionDescription,
}) => {
  return (
    <Poster
      collection={1}
      scroll={withinArticle ? true : false}
      className="feature-poster"
      to="/account/bookmarks"
      id={"poster-bookmark"}
      withinArticle={withinArticle ? 1 : 0}
      status={status}
      onClick={event => {
        event.preventDefault();

        dispatch(setModal(bookmarksModal));

        ga("event", {
          category: "nav",
          action:
            "bookmarks" === activeCollection
              ? "list.feature.return"
              : "list.feature",
          label: `/account/bookmarks`,
        });

        setCollectionDescription("Bookmarks");
      }}
    >
      <figure>
        <div>
          <Bookmark />
        </div>
      </figure>
      <h4>Bookmarks</h4>
    </Poster>
  );
};

export default PosterBookmarks;

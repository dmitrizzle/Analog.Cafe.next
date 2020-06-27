import React from "react";

import { addSessionInfo } from "../../../../../user/store/actions-user";
import { setModal } from "../../../../store/actions-modal";
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
      onClick={event => {
        event.preventDefault();

        status === "ok" &&
          dispatch(
            setModal({
              status: "ok",
              info: {
                title: (
                  <>
                    <Save style={{ height: "1em" }} /> Bookmarks
                  </>
                ),
                bookmarks: true,
              },
            })
          );

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
          <Save />
        </div>
      </figure>
      <h4>Bookmarks</h4>
    </Poster>
  );
};

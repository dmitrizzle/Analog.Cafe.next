import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";

import { CardSpinner } from "../Card";
import { fetchBookmarks } from "../../../store/actions-bookmarks";
import { getListMeta } from "../../pages/List/utils";
import { makeFroth } from "../../../../utils/froth";
import { turnicateSentence } from "../../../../utils/author-credits";
import { withRedux } from "../../../../utils/with-redux";
import CardButton from "../Card/components/CardButton";
import CardSearchItem from "../Card/components/CardSearchItem";
import Spinner from "../../icons/Spinner";

export const Bookmarks = props => {
  const { status } = useSelector(state => state.user);
  const bookmarks = useSelector(state => state.bookmarks);
  const dispatch = useDispatch();

  const { request } = getListMeta("/account");

  useState(() => {
    if (bookmarks.status === "initializing")
      dispatch(fetchBookmarks(request, false));
  });

  return (
    <>
      {bookmarks.status !== "ok" && !bookmarks.items.length && <CardSpinner />}
      {bookmarks.items.map(item => (
        <CardSearchItem to={`/r/${item.slug}`} key={item.id}>
          <div>{item.title + (item.subtitle ? ": " + item.subtitle : "")}</div>
          <figure
            style={{
              backgroundImage: `url(${
                makeFroth({ src: item.poster, size: "s" }).src
              })`,
            }}
          />
          <em>{turnicateSentence(item.summary, 100)}</em>
        </CardSearchItem>
      ))}
      {bookmarks.items.length < bookmarks.page["items-total"] && (
        <CardButton
          branded
          onClick={event => {
            event.stopPropagation();
            dispatch(
              fetchBookmarks(
                {
                  ...request,
                  params: {
                    ...request.params,
                    page: parseInt(bookmarks.page.current) + 1,
                  },
                },
                true
              )
            );
          }}
        >
          Load More
          <Spinner style={bookmarks.status !== "ok" ? null : { width: 0 }} />
        </CardButton>
      )}
    </>
  );
};

export default withRedux(Bookmarks);

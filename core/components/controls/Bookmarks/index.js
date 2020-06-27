import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";

import { fetchBookmarks } from "../../../store/actions-bookmarks";
import { getListMeta } from "../../pages/List/utils";
import { makeFroth } from "../../../../utils/froth";
import { turnicateSentence } from "../../../../utils/author-credits";
import { withRedux } from "../../../../utils/with-redux";
import CardSearchItem from "../Card/components/CardSearchItem";

export const Bookmarks = props => {
  const { status } = useSelector(state => state.user);
  const bookmarks = useSelector(state => state.bookmarks);
  const dispatch = useDispatch();

  useState(() => {
    dispatch(fetchBookmarks(getListMeta("/account").request, false));
  });

  return bookmarks.items.map(item => {
    return (
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
    );
  });
};

export default withRedux(Bookmarks);

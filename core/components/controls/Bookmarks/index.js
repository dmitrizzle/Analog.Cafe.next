import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";

import { fetchBookmarks } from "../../../store/actions-bookmarks";
import { getListMeta } from "../../pages/List/utils";
import { makeFroth } from "../../../../utils/froth";
import { withRedux } from "../../../../utils/with-redux";
import CardSearchItem from "../Card/components/CardSearchItem";

export const Bookmarks = props => {
  const { status } = useSelector(state => state.user);
  const bookmarks = useSelector(state => state.bookmarks);
  const dispatch = useDispatch();

  useState(() => {
    dispatch(fetchBookmarks(getListMeta("/account").request, false));
  });

  const item = {};

  return bookmarks.items.map(item => (
    <CardSearchItem to={`/r/${item.slug}`} key={item.id}>
      <div>{item.title}</div>
      <em>{item.subtitle}</em>

      <figure>
        <img
          src={makeFroth({ src: item.poster, size: "m" }).src}
          loading="lazy"
        />
      </figure>
    </CardSearchItem>
  ));
};

export default withRedux(Bookmarks);

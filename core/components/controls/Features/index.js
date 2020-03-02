import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";

import { Spacer } from "./components/Poster";
import { centerFeaturedPoster } from "./utils";
import { withRedux } from "../../../../utils/with-redux";
import PosterBookmarks from "./components/PosterBookmarks";
import PostersFeatures from "./components/PostersFeatures";
import PostersTags from "./components/PostersTags";
import Wall from "./components/Wall";

const Features = ({
  listFeatures,
  activeCollection,
  activeArticle,
  withinArticle,
  isSsr,
}) => {
  // redux
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const list = useSelector(state => state.list);
  const { sessionInfo, status } = user;

  const [activePoster, setActivePoster] = useState();
  const [
    isInitialCollectionDescriptionSet,
    markIsInitialCollectionDescripitonSet,
  ] = useState(false);

  const [collectionDescription, setCollectionDescription] = useState();

  const featuredCollections = listFeatures?.items.filter(({ collection }) =>
    collection ? true : false
  );
  const featuredArticles = listFeatures?.items.filter(({ collection }) =>
    collection ? false : true
  );

  const [mountEvent, setMountEvent] = useState(false);
  useEffect(() => {
    setMountEvent(true);
  });

  const posterFeaturesProps = {
    items: listFeatures.items,
    activeCollection,
    activeArticle,
    activePoster,
    setActivePoster,
    markIsInitialCollectionDescripitonSet,
    isInitialCollectionDescriptionSet,
    setCollectionDescription,
    collectionDescription,
    withinArticle,
    mountEvent,
  };

  return (
    <Wall id="feature-wall" withinArticle={withinArticle ? 1 : 0}>
      <PosterBookmarks
        {...{
          activeCollection,
          withinArticle,
          status,
          dispatch,
          setActivePoster,
          setCollectionDescription,
        }}
      />
      <PostersTags
        {...{
          activeTag: !activeCollection && list?.filter?.tags[0],
          activeCollection,
          withinArticle,
          dispatch,
          setActivePoster,
          setCollectionDescription,
          startIndex: 1,
          mountEvent,
        }}
      />{" "}
      <PostersFeatures
        {...{
          ...posterFeaturesProps,
          items: featuredCollections,
          startIndex: 2 + 4 + 0,
        }}
      />
      <PostersFeatures
        {...{
          ...posterFeaturesProps,
          items: featuredArticles,
          startIndex: 2 + 4 + featuredCollections.length,
        }}
      />
      <Spacer />
    </Wall>
  );
};

export default withRedux(Features);

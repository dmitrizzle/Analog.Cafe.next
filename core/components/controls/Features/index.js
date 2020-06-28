import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";

import { Spacer } from "./components/Poster";
import { centerFeaturedPoster } from "./utils";
import { withRedux } from "../../../../utils/with-redux";
import PostersFeatures from "./components/PostersFeatures";
import PostersTags, { items as tagItems } from "./components/PostersTags";
import Wall from "./components/Wall";

const PosterBookmarks = dynamic(() => import("./components/PosterBookmarks"), {
  ssr: false,
});

const Features = ({
  listFeatures,
  activeCollection,
  activeArticle,
  withinArticle,
}) => {
  // redux
  const dispatch = useDispatch();
  const list = useSelector(state => state.list);
  const { status } = useSelector(state => state.user);

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

  const [cPath, setCPath] = useState(Router?.router?.asPath.replace("/", ""));
  useEffect(() => {
    const activeCollection = featuredCollections.filter(
      ({ url }) => url === cPath
    )[0]?.collection;
    const activeTag = tagItems.filter(({ url }) => url === "/" + cPath)[0]?.tag;

    // const centerDelay = setTimeout(
    //   () => {
    //     clearTimeout(centerDelay);
    centerFeaturedPoster({
      activeCollection: activeCollection || activeTag,
    });
    //   },
    //   activeCollection || activeTag ? 950 : 0
    // );
  }, [cPath]);

  Router.events.on("routeChangeComplete", path =>
    setCPath(path.replace("/", ""))
  );

  const posterFeaturesProps = {
    items: listFeatures.items,
    activeCollection,
    activeArticle,
    markIsInitialCollectionDescripitonSet,
    isInitialCollectionDescriptionSet,
    setCollectionDescription,
    collectionDescription,
    withinArticle,
  };

  return (
    <Wall id="feature-wall" withinArticle={withinArticle ? 1 : 0}>
      <PosterBookmarks
        {...{
          activeCollection,
          withinArticle,
          status,
          dispatch,
          setCollectionDescription,
        }}
      />

      <PostersFeatures
        {...{
          ...posterFeaturesProps,
          items: featuredCollections,
          startIndex: 2 + 4 + 0,
        }}
      />
      <PostersTags
        {...{
          activeTag: !activeCollection && list?.filter?.tags[0],
          activeCollection,
          withinArticle,
          dispatch,
          setCollectionDescription,
          startIndex: 1,
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

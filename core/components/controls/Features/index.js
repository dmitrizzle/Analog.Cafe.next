import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import Router from "next/router";

import { Spacer } from "./components/Poster";
import { centerFeaturedPoster } from "./utils";
import { toggleTheme as toggleThemeAction } from "../../../store/actions-theme";
import { withRedux } from "../../../../utils/with-redux";
import PosterBookmarks from "./components/PosterBookmarks";
import PosterDownloads from "./components/PosterDownloads";
import PosterEditorials from "./components/PosterEditorials";
import PosterSubmissions from "./components/PosterSubmissions";
import PosterTheme from "./components/PosterTheme";
import PostersFeatures from "./components/PostersFeatures";
import PostersTags, { items as tagItems } from "./components/PostersTags";
import Wall from "./components/Wall";

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

  const theme = useSelector(state => state.theme);
  const toggleTheme = () => dispatch(toggleThemeAction());

  const [
    isInitialCollectionDescriptionSet,
    markIsInitialCollectionDescripitonSet,
  ] = useState(false);

  const [collectionDescription, setCollectionDescription] = useState();

  const featuredCollections = listFeatures?.items.filter(({ collection }) =>
    collection ? true : false
  );

  // const featuredArticles = listFeatures?.items.filter(({ collection }) =>
  //   collection ? false : true
  // );

  const [cPath, setCPath] = useState(Router?.router?.asPath.replace("/", ""));
  useEffect(() => {
    const activeCollection = featuredCollections.filter(
      ({ url }) => url === cPath
    )[0]?.collection;
    const activeTag = tagItems.filter(({ url }) => url === "/" + cPath)[0]?.tag;

    centerFeaturedPoster({
      activeCollection: activeCollection || activeTag,
    });
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
      <PosterTheme
        {...{
          activeCollection,
          withinArticle,
          status,
          dispatch,
          setCollectionDescription,
          theme,
          toggleTheme,
        }}
      />
      <PosterBookmarks
        {...{
          activeCollection,
          withinArticle,
          status,
          dispatch,
          setCollectionDescription,
        }}
      />
      <Spacer />
      <PosterSubmissions
        {...{
          withinArticle,
          status,
          dispatch,
          setCollectionDescription,
          activeTag: !activeCollection && list?.filter?.tags[0],
        }}
      />

      <PosterDownloads
        {...{
          withinArticle,
          status,
          dispatch,
          setCollectionDescription,
          activeTag: !activeCollection && list?.filter?.tags[0],
        }}
      />
      <PosterEditorials
        {...{
          withinArticle,
          status,
          dispatch,
          setCollectionDescription,
          activeTag: !activeCollection && list?.filter?.tags[0],
        }}
      />
      <Spacer />
      <PostersFeatures
        {...{
          ...posterFeaturesProps,
          items: featuredCollections,
          startIndex: 2 + 4 + 0,
        }}
      />
      <Spacer />
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
      {/* <PostersFeatures
        {...{
          ...posterFeaturesProps,
          items: featuredArticles,
          startIndex: 2 + 4 + featuredCollections.length,
        }}
      /> */}
      <Spacer />
    </Wall>
  );
};

export default withRedux(Features);

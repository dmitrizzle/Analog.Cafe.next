import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";

import {
  CLOUDINARY_BASE,
  CLOUDINARY_TRANSFORM,
} from "../../../../constants/cloudinary";
import { withRedux } from "../../../../utils/with-redux";
import Poster, { Spacer } from "./components/Poster";
import PosterBookmarks from "./components/PosterBookmarks";
import Wall from "./components/Wall";
import ga from "../../../../utils/data/ga";

const Features = ({
  listFeatures,
  activeCollection,
  activeArticle,
  withinArticle,
}) => {
  // redux
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { sessionInfo, status } = user;

  // mount the component, then:
  useEffect(() => {
    if (!process.browser) return;

    // // fetch saved preferences
    // window.setTimeout(() => !sessionInfo && dispatch(getSessionInfo()), 5000);

    // get html elements
    // const posters = [].slice.call(document.querySelectorAll(".feature-poster"));
    const wallElement = document.getElementById("feature-wall");

    if (!activeCollection) return;

    // reset active poster
    setActivePoster();

    // center featured poster
    const posterElement = document.getElementById(`poster-${activeCollection}`);
    const windowWidth = window.innerWidth;
    const centerDelay = setTimeout(() => {
      clearTimeout(centerDelay);
      wallElement.scrollTo({
        left:
          posterElement.offsetLeft -
          windowWidth / 2 +
          posterElement.offsetWidth / 2,
        behavior: "smooth",
      });
    }, 750);
  }, [activeCollection, sessionInfo]);

  const [activePoster, setActivePoster] = useState();
  const [
    isInitialCollectionDescriptionSet,
    markIsInitialCollectionDescripitonSet,
  ] = useState(false);

  const [collectionDescription, setCollectionDescription] = useState();

  return (
    <Wall id="feature-wall" withinArticle={withinArticle ? 1 : 0}>
      {/* bookmarks feature */}
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

      {listFeatures?.items.map((item, iterable) => {
        const isActive =
          (item.collection && item.collection === activeCollection) ||
          (item.slug && item.slug === activeArticle);

        if (
          !isInitialCollectionDescriptionSet &&
          (isActive ||
            (activePoster === iterable + 1 &&
              collectionDescription !== item.description &&
              item.description))
        ) {
          markIsInitialCollectionDescripitonSet(true);
          setCollectionDescription(item.description);
        }

        //
        let to = item.slug ? `/r/${item.slug}` : "/" + item.url;
        if (item.collection && isActive) to = "/" + item.tag;

        return (
          <Poster
            scroll={!item.collection || withinArticle ? true : false}
            collection={item.collection}
            active={isActive || activePoster === iterable + 1}
            className="feature-poster"
            key={iterable + 1}
            to={to}
            id={"poster-" + (item.collection || item.id)}
            withinArticle={withinArticle ? 1 : 0}
            onClick={() => {
              ga("event", {
                category: "nav",
                action:
                  item.collection && isActive
                    ? `${withinArticle ? "article" : "list"}.feature.return`
                    : `${withinArticle ? "article" : "list"}.feature`,
                label: to,
              });

              if (item.collection && !isActive) {
                setActivePoster(iterable + 1);
                setCollectionDescription(item.description);
              }
              if (isActive) {
                setCollectionDescription();
                setActivePoster();
              }
            }}
            style={{
              background: `url(${CLOUDINARY_BASE +
                CLOUDINARY_TRANSFORM(200, 200) +
                item.poster}.jpg)`,
            }}
          >
            {item.title}
          </Poster>
        );
      })}
      <Spacer />
    </Wall>
  );
};

export default withRedux(Features);

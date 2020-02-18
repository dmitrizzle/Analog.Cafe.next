import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";

import { addSessionInfo } from "../../../../user/store/actions-user";
import { withRedux } from "../../../../utils/with-redux";
import ArticleSection from "../../pages/Article/components/ArticleSection";
import BreadCrumbs from "./components/BreadCrumbs";
import Poster, { Spacer } from "./components/Poster";
import Save from "../../icons/Save";
import Wall from "./components/Wall";
import ga from "../../../../utils/data/ga";

// generate fitted poster
const cloudinaryBase = "https://res.cloudinary.com/analog-cafe/image/upload/";
const cloudinaryTransform = "c_fill,fl_progressive,h_200,w_200/";

export const Features = ({
  listTag,
  listFeatures,
  activeCollection /*, isActiveTag*/,
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
    <>
      <Wall id="feature-wall">
        {/* bookmarks feature */}
        <Poster
          scroll={false}
          collection
          active={"bookmarks" === activeCollection}
          className="feature-poster"
          key={0}
          to={`/account${status === "ok" ? "/bookmarks" : ""}`}
          id={"poster-bookmarks"}
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

            if ("bookmarks" !== activeCollection) {
              setActivePoster(0);
              setCollectionDescription("Bookmarks");
            }
            if ("bookmarks" === activeCollection) {
              setCollectionDescription();
              setActivePoster();
            }
          }}
          style={{
            background: `url(${cloudinaryBase +
              cloudinaryTransform +
              "image-froth_689358_61DGsh_e"}.jpg)`,
          }}
        >
          <h4>
            <span>
              <span>
                <Save
                  style={{
                    height: ".8em",
                    padding: "0 0 .25em .175em",
                  }}
                />{" "}
                Your Bookmarks
              </span>
            </span>
          </h4>
        </Poster>

        {listFeatures?.items.map((item, iterable) => {
          const isActive =
            item.collection && item.collection === activeCollection;

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
              scroll={!item.collection}
              collection={item.collection}
              active={isActive || activePoster === iterable + 1}
              className="feature-poster"
              key={iterable + 1}
              to={to}
              id={"poster-" + (item.collection || item.id)}
              onClick={() => {
                ga("event", {
                  category: "nav",
                  action:
                    item.collection && isActive
                      ? "list.feature.return"
                      : "list.feature",
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
                background: `url(${cloudinaryBase +
                  cloudinaryTransform +
                  item.poster}.jpg)`,
              }}
            >
              <h4>
                <span>
                  <span>{item.title}</span>
                </span>
              </h4>
            </Poster>
          );
        })}
        <Spacer />
      </Wall>

      <ArticleSection>
        <BreadCrumbs activeCollection={activeCollection} listTag={listTag} />
      </ArticleSection>
    </>
  );
};

export default withRedux(Features);

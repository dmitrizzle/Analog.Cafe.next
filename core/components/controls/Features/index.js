import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";

import { ROUTE_LABELS, ROUTE_TAGS } from "../../pages/List/constants";
import { addSessionInfo } from "../../../../user/store/actions-user";
import { c_blue, c_grey_dark } from "../../../../constants/styles/colors";
import { withRedux } from "../../../../utils/with-redux";
import ArticleSection from "../../pages/Article/components/ArticleSection";
import Label from "../../vignettes/Label";
import Link from "../Link";
import Poster, { Spacer } from "./components/Poster";
import Save from "../../icons/Save";
import TagDescription from "./components/TagDescription";
import Wall, {
  BreadcrumbsWrap,
  CollectionDescription,
} from "./components/Wall";
import ga from "../../../../utils/data/ga";

// generate fitted poster
const cloudinaryBase = "https://res.cloudinary.com/analog-cafe/image/upload/";
const cloudinaryTransform = "c_fill,fl_progressive,h_200,w_200/";

export const Features = ({
  listTag,
  listFeatures,
  activeCollection /*, isActiveTag*/,
}) => {
  // function to add background iamge
  // const paintPoster = element => {
  //   try {
  //     const src = element.getAttribute("data-src");
  //     element.style.backgroundImage = `url(${src})`;
  //   } catch {
  //     // eslint-disable-next-line
  //     console.log("getAttribute not available in this browser");
  //   }
  // };

  // redux
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  // mount the component, then:
  useEffect(() => {
    if (!process.browser) return;

    // get html elements
    // const posters = [].slice.call(document.querySelectorAll(".feature-poster"));
    const wallElement = document.getElementById("feature-wall");

    // // supported browsers
    // if ("IntersectionObserver" in window) {
    //   const observer = new IntersectionObserver(
    //     entries => {
    //       entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //           paintPoster(entry.target);
    //         }
    //       });
    //     },
    //     { wallElement }
    //   );
    //
    //   posters.forEach(poster => {
    //     observer.observe(poster);
    //   });
    // }
    //
    // // fallback
    // else {
    //   posters.forEach(poster => {
    //     paintPoster(poster.target);
    //   });
    // }

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
  }, [activeCollection]);

  const [activePoster, setActivePoster] = useState();
  const [collectionDescription, setCollectionDescription] = useState();
  const [
    isInitialCollectionDescriptionSet,
    markIsInitialCollectionDescripitonSet,
  ] = useState(false);

  const getTagAttributes = tag => {
    const position = Object.values(ROUTE_TAGS).indexOf(tag);
    const url = Object.keys(ROUTE_TAGS)[position];
    const title = ROUTE_LABELS[url].title;

    return { url, title };
  };

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
          to={`/account${user.status === "ok" ? "/bookmarks" : ""}`}
          id={"poster-bookmarks"}
          onClick={() => {
            ga("event", {
              category: "nav",
              action:
                "bookmarks" === activeCollection
                  ? "list.feature.return"
                  : "list.feature",
              label: `/account${user.status === "ok" ? "/bookmarks" : ""}`,
            });

            // send user to bookmarks after login
            if (user.status !== "ok") {
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
                    height: ".9em",
                  }}
                />{" "}
                Bookmarks
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
        <div>
          <CollectionDescription id="collection-description">
            {collectionDescription && activeCollection ? (
              collectionDescription
            ) : (
              <TagDescription tag={listTag} />
            )}

            <BreadcrumbsWrap>
              <Link
                to="/"
                scroll={false}
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
              >
                <Label>Front Page</Label>
              </Link>
              {listTag && (
                <Link to={getTagAttributes(listTag).url} scroll={false}>
                  <span style={{ color: c_grey_dark }}> »</span>
                  <Label
                    style={listTag === "link" ? { background: c_blue } : {}}
                  >
                    {getTagAttributes(listTag).title}
                  </Label>
                </Link>
              )}

              {activeCollection && (
                <>
                  <span style={{ color: c_grey_dark }}> »</span>
                  <Link onClick={event => event.preventDefault()}>
                    <Label>
                      {activeCollection[0].toUpperCase() +
                        activeCollection.slice(1)}
                    </Label>
                  </Link>
                </>
              )}
            </BreadcrumbsWrap>
          </CollectionDescription>
        </div>
        <p style={{ textAlign: "center" }}>⇣</p>
      </ArticleSection>
    </>
  );
};

export default withRedux(Features);

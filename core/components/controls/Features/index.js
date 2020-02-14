import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { ROUTE_TAGS } from "../../pages/List/constants";
import {
  c_white,
  c_black,
  c_red,
  c_grey_med,
} from "../../../../constants/styles/colors";
import { fadeIn } from "../../../../constants/styles/animation";
import { title } from "../../../../constants/styles/typography";
import ArticleSection from "../../pages/Article/components/ArticleSection";
import Link from "../Link";
import Point from "../../icons/Point";
import TagDescription from "./components/TagDescription";
import ga from "../../../../utils/data/ga";

const Wall = styled.div`
  /* this allows better position for scrollbars */
  height: 8em;
  transition: height 250ms;

  padding-top: 3em;
  padding-bottom: 0.75em;

  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translateZ(0);
`;

const activeCss = css`
  box-shadow: 0 0 0 1px ${c_white}, 0 0 0 7px ${c_red};
  ::after {
    border-top: 0.75em solid ${c_red};
  }
  h4 {
    background: none;
  }
`;

const Poster = styled(Link)`
  animation: ${fadeIn} 250ms forwards;

  position: relative;
  display: flex;
  align-items: stretch;
  text-decoration: none;

  transition: height 250ms;

  width: 7em;
  height: 7em;
  border-radius: 7em;

  background: ${c_black};
  margin-left: 1em;
  flex-shrink: 0;

  transform: translateZ(0);

  background-size: cover !important;
  background-position: center !important;

  ${props =>
    props.collection &&
    css`
      box-shadow: 0 0 0 1px ${c_white}, 0 0 0 7px ${c_grey_med};
      text-transform: uppercase;
      ::after {
        content: "";
        display: block;
        width: 0;
        height: 0;
        border-left: 0.75em solid transparent;
        border-right: 0.75em solid transparent;
        border-top: 0.75em solid ${c_grey_med};
        position: absolute;
        bottom: -0.85em;
        left: calc(50% - 0.75em);
      }
    `}

  &:first-child {
    margin-left: 1.5em;
  }

  h4 {
    ${title}
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 7em;
    overflow: hidden;

    text-align: center;
    bottom: 0;
    right: 0;
    color: ${c_white};
    line-height: 1em !important;
    overflow: hidden;
    background: rgba(44, 44, 44, 0.8);
    > span {
      padding: 0.5em 0.4em 0.5em 0.6em;
      white-space: break-spaces;
      display: block;
      width: calc(100% - 1em);
      text-align: center;
      font-size: 0.8em;
      ${props => !props.collection && `font-size: .8em`}
    }
  }
  ${props => props.active && activeCss};
  :active,
  :focus {
    ${activeCss}
    h4 > span > span {
      background: ${c_black};
    }
  }
`;
const Spacer = styled.div`
  height: 16em;
  width: 1.5em;
  flex-shrink: 0;
`;

const CollectionDescription = styled.blockquote`
  margin: 1.5em auto  !important;
  /* border-top: 6px solid ${c_red} !important;
  border-bottom: 6px solid ${c_red} !important; */
`;

// generate fitted poster
const cloudinaryBase = "https://res.cloudinary.com/analog-cafe/image/upload/";
const cloudinaryTransform = "/c_fill,fl_progressive,h_480,w_320/";

export default ({
  listTag,
  listFeatures,
  activeCollection /*, isActiveTag*/,
}) => {
  // function to add background iamge
  const paintPoster = element => {
    try {
      const src = element.getAttribute("data-src");
      element.style.backgroundImage = `url(${src})`;
    } catch {
      // eslint-disable-next-line
      console.log("getAttribute not available in this browser");
    }
  };

  // mount the component, then:
  useEffect(() => {
    if (!process.browser) return;

    // get html elements
    const posters = [].slice.call(document.querySelectorAll(".feature-poster"));
    const wallElement = document.getElementById("feature-wall");

    // supported browsers
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              paintPoster(entry.target);
            }
          });
        },
        { wallElement }
      );

      posters.forEach(poster => {
        observer.observe(poster);
      });
    }

    // fallback
    else {
      posters.forEach(poster => {
        paintPoster(poster.target);
      });
    }

    if (!activeCollection) return;

    // reset active poster
    setActivePoster();

    // scroll down a bit if the user hasn't
    // const scrollDelay = setTimeout(() => {
    //   clearTimeout(scrollDelay);
    //   if (
    //     typeof window.pageYOffset === "undefined" ||
    //     window.pageYOffset > 10000 / window.innerHeight
    //   )
    //     return;
    //
    //   window.scrollTo({
    //     top: 85000 / window.innerHeight,
    //     behavior: "smooth",
    //   });
    // }, 300);

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

  return (
    <>
      <Wall
        id="feature-wall"
        // style={{
        //   height: /* activeCollection || isActiveTag */ true
        //     ? "11em"
        //     : undefined,
        // }}
      >
        {listFeatures?.items.map((item, iterable) => {
          const isActive =
            item.collection && item.collection === activeCollection;

          if (
            !isInitialCollectionDescriptionSet &&
            (isActive ||
              (activePoster === iterable &&
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
              active={isActive || activePoster === iterable}
              className="feature-poster"
              key={iterable}
              to={to}
              id={"poster-" + (item.collection || item.id)}
              // style={{
              //   height: /* activeCollection || isActiveTag */ true
              //     ? "10em"
              //     : undefined,
              // }}
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
                  setActivePoster(iterable);
                  setCollectionDescription(item.description);
                }
                if (isActive) {
                  setCollectionDescription();
                  setActivePoster();
                }
              }}
              data-src={`${cloudinaryBase +
                cloudinaryTransform +
                item.poster}.jpg`}
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
              <>
                {collectionDescription}{" "}
                <Link
                  to={
                    Object.keys(ROUTE_TAGS)[
                      Object.values(ROUTE_TAGS).indexOf(listTag)
                    ]
                  }
                  scroll={false}
                >
                  <Point style={{ height: "1em", marginTop: "-.25em" }} />
                </Link>{" "}
                <strong>
                  <Link
                    to={
                      Object.keys(ROUTE_TAGS)[
                        Object.values(ROUTE_TAGS).indexOf(listTag)
                      ]
                    }
                    scroll={false}
                  >
                    up.
                  </Link>
                </strong>
              </>
            ) : (
              <TagDescription tag={listTag} />
            )}
          </CollectionDescription>
        </div>
        <p style={{ textAlign: "center" }}>⇣</p>
      </ArticleSection>
    </>
  );
};

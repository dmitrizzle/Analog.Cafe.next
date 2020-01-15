import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { ROUTE_LABELS, ROUTE_TAGS } from "../../pages/List/constants";
import {
  c_white,
  c_black,
  c_red,
  c_grey_med,
  c_grey_dark,
  c_yellow,
} from "../../../../constants/styles/colors";
import { fadeIn } from "../../../../constants/styles/animation";
import {
  m_radius,
  m_radius_sm,
  b_tablet,
} from "../../../../constants/styles/measurements";
import { title } from "../../../../constants/styles/typography";
import ArticleSection from "../../pages/Article/components/ArticleSection";
import Label from "../../vignettes/Label";
import Link from "../Link";
import ga from "../../../../utils/data/ga";

const Wall = styled.div`
  /* this allows better position for scrollbars */
  height: 17em;
  transition: height 250ms;

  margin-bottom: calc(1.5em + 7px);
  padding-top: calc(7px);
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
`;

const Poster = styled(Link)`
  animation: ${fadeIn} 250ms forwards;

  position: relative;
  display: block;
  text-decoration: none;

  transition: height 250ms;

  width: 10em;
  height: 16em;
  background: ${c_red};
  margin-left: 1em;
  flex-shrink: 0;

  transform: translateZ(0);

  background-size: cover !important;
  background-position: center !important;
  border-radius: ${m_radius};
  @media (min-width: ${b_tablet}) {
    border-radius: ${m_radius_sm};
  }

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
  ${props => props.active && activeCss};

  &:first-child {
    margin-left: 1.5em;
  }

  h4 {
    ${title}
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 0.5em;
    /* padding: 0.085em 0 0.05em; */
    text-align: left;
    color: ${c_white};
    line-height: 1.75em !important;
    width: calc(100% - 1.25em);
    border-left: 0.25em solid ${c_black};
    overflow: hidden;
    span {
      background-color: ${c_black};
      padding: 0.33em 0.25em 0.33em 0;
      white-space: break-spaces;
    }
  }
`;
const Spacer = styled.div`
  height: 16em;
  width: 1.5em;
  flex-shrink: 0;
`;

const CollectionDescription = styled.blockquote`
  margin: 0 auto 1.5em !important;
  /* border-top: 6px solid ${c_red} !important;
  border-bottom: 6px solid ${c_red} !important; */
`;

// generate fitted poster
const cloudinaryBase = "https://res.cloudinary.com/analog-cafe/image/upload/";
const cloudinaryTransform = "/c_fill,fl_progressive,h_480,w_320/";

export default ({ listFeatures, activeCollection, isActiveTag }) => {
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
    if (typeof window === "undefined") return;

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

    if (activeCollection) {
      setActivePoster();

      // scroll down a bit if the user hasn't
      if (
        typeof window.pageYOffset !== "undefined" &&
        window.pageYOffset < 10000 / window.innerHeight &&
        lastClickedPoster
      ) {
        const scrollDelay = setTimeout(() => {
          clearTimeout(scrollDelay);

          window.scrollTo({
            top: 100000 / window.innerHeight,
            behavior: "smooth",
          });
          // const element = document.getElementById("collection-description");
          // element &&
          //   element.scrollIntoView({
          //     behavior: "smooth",
          //     block: "nearest",
          //   });
        }, 300);
      }

      // center featured poster
      const posterElement = document.getElementById(
        `poster-${activeCollection}`
      );
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

      // document.getElementById(lastClickedPoster).scrollIntoView({
      //   behavior: "smooth",
      //   inline: "nearest",
      // });
    }
  }, [activeCollection]);

  const [activePoster, setActivePoster] = useState();
  const [collectionDescription, setCollectionDescription] = useState();
  const [
    isInitialCollectionDescriptionSet,
    markIsInitialCollectionDescripitonSet,
  ] = useState(false);

  const [lastClickedPoster, setLastClickedPoster] = useState();

  return (
    <>
      <Wall
        id="feature-wall"
        style={{
          height: activeCollection || isActiveTag ? "12em" : undefined,
        }}
      >
        {listFeatures.items.map((item, iterable) => {
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
              style={{
                height: activeCollection || isActiveTag ? "10em" : undefined,
              }}
              onClick={() => {
                ga("event", {
                  category: "Navigation",
                  action:
                    item.collection && isActive
                      ? "List.feature.return"
                      : "List.feature",
                  label: to,
                });

                //
                //
                //
                //
                //
                if (item.collection && !isActive) {
                  setActivePoster(iterable);
                  setCollectionDescription(item.description);
                  setLastClickedPoster(
                    "poster-" + (item.collection || item.id)
                  );

                  //
                  //
                  //
                  //
                  //
                  //
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
                <span>{item.title}</span>
              </h4>
            </Poster>
          );
        })}
        <Spacer />
      </Wall>

      {collectionDescription && activeCollection && (
        <ArticleSection>
          <div>
            <CollectionDescription id="collection-description">
              {collectionDescription}
            </CollectionDescription>
          </div>
          <p style={{ textAlign: "center" }}>⇣</p>
        </ArticleSection>
      )}
    </>
  );
};

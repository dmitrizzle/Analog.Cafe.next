import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { LabelWrap } from "../Docket";
import { ROUTE_LABELS, ROUTE_TAGS } from "../../pages/List/constants";
import {
  c_black,
  c_blue,
  c_grey_dark,
  c_grey_med,
  c_red,
  c_white,
} from "../../../../constants/styles/colors";
import { fadeIn } from "../../../../constants/styles/animation";
import { title } from "../../../../constants/styles/typography";
import ArticleSection from "../../pages/Article/components/ArticleSection";
import Label from "../../vignettes/Label";
import Link from "../Link";
import Poster, { Spacer } from "./components/Poster";
import TagDescription from "./components/TagDescription";
import Wall, {
  BreadcrumbsWrap,
  CollectionDescription,
} from "./components/Wall";
import ga from "../../../../utils/data/ga";

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
      <Wall id="feature-wall">
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
                <Link
                  to={
                    Object.keys(ROUTE_TAGS)[
                      Object.values(ROUTE_TAGS).indexOf(listTag)
                    ]
                  }
                  scroll={false}
                >
                  <span style={{ color: c_grey_dark }}> »</span>
                  <Label
                    style={listTag === "link" ? { background: c_blue } : {}}
                  >
                    {
                      ROUTE_LABELS[
                        Object.keys(ROUTE_TAGS)[
                          Object.values(ROUTE_TAGS).indexOf(listTag)
                        ]
                      ].title
                    }
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

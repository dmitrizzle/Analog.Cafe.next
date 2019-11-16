import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Label from "../../vignettes/Label";

import {
  c_white,
  c_black,
  c_red,
  c_grey_med,
} from "../../../../constants/styles/colors";
import ga from "../../../../utils/data/ga";
import {
  m_radius,
  m_radius_sm,
  b_tablet,
} from "../../../../constants/styles/measurements";
import { title } from "../../../../constants/styles/typography";
import Link from "../Link";

const Wall = styled.div`
  /* this allows better position for scrollbars */
  height: 17em;

  margin-bottom: calc(0.5em + 7px);
  padding-top: 7px;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translateZ(0);
`;

const activeCss = css`
  box-shadow: 0 0 0 1px ${c_white}, 0 0 0 7px ${c_red};
  ::after {
    background: ${c_red};
  }
`;
const Poster = styled(Link)`
  position: relative;
  display: block;
  text-decoration: none;

  width: 10em;
  height: 16em;
  background: ${c_red};
  margin-left: 1em;
  flex-shrink: 0;

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
        width: 0.75em;
        height: 0.75em;
        background: ${c_grey_med};
        position: absolute;
        bottom: -0.65em;
        left: calc(50% - 0.5em);
        transform: rotate(45deg);
        z-index: -1;
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
    padding: 2.5px 0 2px;
    text-align: left;
    color: ${c_white};
    line-height: 1.75em !important;
    width: calc(100% - 1.25em);
    border-left: 0.25em solid ${c_black};
    span {
      background-color: ${c_black};
      padding: 0.33em 0.25em 0.33em 0;
      white-space: break-spaces;
    }
  }

  label {
    float: right;
    margin: 0.5em;
  }
`;
const Spacer = styled.div`
  height: 16em;
  width: 1.5em;
  flex-shrink: 0;
`;

// generate fitted poster
const cloudinaryBase = "https://res.cloudinary.com/analog-cafe/image/upload/";
const cloudinaryTransform = "/c_fill,fl_progressive,h_480,w_320/";

export default ({ listFeatures, activeCollection }) => {
  // function to add background iamge
  const paintPoster = element => {
    const src = element.getAttribute("data-src");
    element.style.backgroundImage = `url(${src})`;
  };

  // mount the component, then:
  useEffect(() => {
    if (typeof window === "undefined") return;

    // get html elements
    const posters = [].slice.call(document.querySelectorAll(".feature-poster"));
    const root = document.querySelector("#feature-wall");

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
        { root }
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

    activeCollection && setActivePoster();
  });

  const [activePoster, setActivePoster] = useState();

  return (
    <Wall id="feature-wall">
      {listFeatures.items.map((item, iterable) => {
        const isActive =
          item.collection && item.collection === activeCollection;

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
            onClick={() => {
              ga("event", {
                category: "Navigation",
                action:
                  item.collection && isActive
                    ? "List.feature.return"
                    : "List.feature",
                label: to,
              });

              if (item.collection && !isActive) {
                setActivePoster(iterable);
                const scrollDelay = setTimeout(() => {
                  // conditionally load smooth scroll polyfillDelay
                  clearTimeout(scrollDelay);
                  window.scrollTo({ top: 150, behavior: "smooth" });
                }, 750);
              }
              if (isActive) setActivePoster();
            }}
            data-src={`${cloudinaryBase +
              cloudinaryTransform +
              item.poster}.jpg`}
          >
            {item.collection && <Label branded>Collection</Label>}
            <h4>
              <span>{item.title}</span>
            </h4>
          </Poster>
        );
      })}
      <Spacer />
    </Wall>
  );
};

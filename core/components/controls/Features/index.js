import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import Label from "../../vignettes/Label";

import {
  c_white,
  c_black_a5,
  c_yellow_a5,
  c_grey_light,
  c_black,
  c_red,
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

  margin-bottom: calc(0.5em + 9px);
  padding-top: 9px;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translateZ(0);
`;
const Poster = styled(Link)`
  position: relative;
  display: block;
  overflow: hidden;
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

  box-shadow: 0 0 0 1px ${c_white}, 0 0 0 9px rgba(44, 44, 44, 0.05);

  &:active,
  &:focus {
    box-shadow: 0 0 0 1px ${c_white}, 0 0 0 9px ${c_red};
  }
  ${props =>
    props.active &&
    css`
      box-shadow: 0 0 0 1px ${c_white}, 0 0 0 9px ${c_red};
    `}

  &:first-child {
    margin-left: 1.5em;
  }

  h4 {
    ${title}
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 0.5em;
    padding: 1.5px 0;
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
  });

  console.log("activeCollection", activeCollection);

  return (
    <Wall id="feature-wall">
      {listFeatures.items.map((item, iterable) => {
        return (
          <Poster
            active={item.collection && item.collection === activeCollection}
            className="feature-poster"
            key={iterable}
            to={item.slug ? `/r/${item.slug}` : "/" + item.url}
            onClick={() =>
              ga("event", {
                category: "Navigation",
                action: "List.feature",
                label: item.slug ? `/r/${item.slug}` : "/" + item.url,
              })
            }
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

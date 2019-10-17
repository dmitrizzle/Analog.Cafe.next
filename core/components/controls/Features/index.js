import React, { useEffect } from "react";
import styled from "styled-components";

import {
  c_white,
  c_black_a5,
  c_grey_light,
} from "../../../../constants/styles/colors";
import { eventGA } from "../../../../utils/data/ga";
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

  margin-bottom: 0.5em;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
`;
const Poster = styled(Link)`
  position: relative;
  display: block;
  overflow: hidden;

  width: 10em;
  height: 16em;
  background: ${c_grey_light};
  margin-left: 1em;
  flex-shrink: 0;

  background-size: cover !important;
  background-position: center !important;
  border-radius: ${m_radius};
  @media (min-width: ${b_tablet}) {
    border-radius: ${m_radius_sm};
  }

  &:first-child {
    margin-left: 1.5em;
  }

  h4 {
    ${title}
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.5em;
    text-align: right;
    color: ${c_white};

    background: ${c_black_a5};
    box-shadow: 0 0 4em 4em ${c_black_a5};
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

export default ({ listFeatures }) => {
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

  return (
    <Wall id="feature-wall">
      {listFeatures.items.map((item, iterable) => {
        return (
          <Poster
            className="feature-poster"
            key={iterable}
            to={`/r/${item.slug}`}
            onClick={() =>
              eventGA({
                category: "Navigation",
                action: "List.feature",
                label: `/r/${item.slug}`,
              })
            }
            data-src={`${cloudinaryBase +
              cloudinaryTransform +
              item.poster}.jpg`}
          >
            <h4>{item.title}</h4>
          </Poster>
        );
      })}
      <Spacer />
    </Wall>
  );
};

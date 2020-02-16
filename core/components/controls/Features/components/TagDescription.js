import React from "react";
import styled from "styled-components";

import { ROUTE_LABELS, ROUTE_TAGS } from "../../../pages/List/constants";
import { unstyledLinks } from "./Wall";
import Label from "../../../vignettes/Label";
import Link from "../../Link";
import ga from "../../../../../utils/data/ga";

const QuoteLabel = styled(Label)`
  font-style: normal;
  display: inline-block;
  line-height: 1.25em;
`;
const UnstyledLink = styled(Link)`
  ${unstyledLinks}
`;

export default ({ tag }) => {
  const route = Object.keys(ROUTE_TAGS)[Object.values(ROUTE_TAGS).indexOf(tag)];
  const description = ROUTE_LABELS[route]?.description;

  const defaultDescription = (
    <>
      Read all about film and cameras in{" "}
      <UnstyledLink
        to="/film-photography"
        scroll={false}
        onClick={() =>
          ga("event", {
            category: "nav",
            action: "list.description.link",
            label: "/film-photography",
          })
        }
      >
        <QuoteLabel inverse>Film, Photography</QuoteLabel>
      </UnstyledLink>
      . Find all photo essays in
      <UnstyledLink
        to="/photo-essays"
        scroll={false}
        onClick={() =>
          ga("event", {
            category: "nav",
            action: "list.description.link",
            label: "/photo-essays",
          })
        }
      >
        <QuoteLabel inverse>Essays, Stories</QuoteLabel>
      </UnstyledLink>
      . Download all printable guides, and use interactive tools in
      <UnstyledLink
        to="/apps-and-downloads"
        scroll={false}
        onClick={() =>
          ga("event", {
            category: "nav",
            action: "list.description.link",
            label: "/apps-and-downloads",
          })
        }
      >
        <QuoteLabel blue>Apps & Downloads</QuoteLabel>
      </UnstyledLink>
      . Catch up on all industry news and community announcements with
      <UnstyledLink
        to="/editorials"
        scroll={false}
        onClick={() =>
          ga("event", {
            category: "nav",
            action: "list.description.link",
            label: "/editorials",
          })
        }
      >
        <QuoteLabel inverse>Letters, Editorials.</QuoteLabel>
      </UnstyledLink>
      . Above are featured topics and articles.
    </>
  );

  if (route === "/") return defaultDescription;
  if (description) return description;
  return defaultDescription;
};

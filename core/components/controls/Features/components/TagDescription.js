import React from "react";

import { ROUTE_LABELS, ROUTE_TAGS } from "../../../pages/List/constants";
import Label from "../../../vignettes/Label";
import Link from "../../Link";
import ga from "../../../../../utils/data/ga";

export default ({ tag }) => {
  const route = Object.keys(ROUTE_TAGS)[Object.values(ROUTE_TAGS).indexOf(tag)];
  const description = ROUTE_LABELS[route]?.description;

  const defaultDescription = (
    <>
      Read about film and cameras in{" "}
      <Link
        to="/film-photography"
        scroll={false}
        onClick={() =>
          ga("event", {
            category: "nav",
            action: "list.description.link",
            label: "/film-photography",
          })
        }
        style={{ textDecoration: "none", background: "0 0" }}
      >
        <Label inverse style={{ fontStyle: "normal", display: "inline-block" }}>
          Film, Photography
        </Label>
      </Link>
      . Find photo essays in
      <Link
        to="/photo-essays"
        scroll={false}
        onClick={() =>
          ga("event", {
            category: "nav",
            action: "list.description.link",
            label: "/photo-essays",
          })
        }
        style={{ textDecoration: "none", background: "0 0" }}
      >
        <Label inverse style={{ fontStyle: "normal", display: "inline-block" }}>
          Essays, Stories
        </Label>
      </Link>
      . Download printable guides, and use interactive tools in
      <Link
        to="/apps-and-downloads"
        scroll={false}
        onClick={() =>
          ga("event", {
            category: "nav",
            action: "list.description.link",
            label: "/apps-and-downloads",
          })
        }
        style={{ textDecoration: "none", background: "0 0" }}
      >
        <Label inverse style={{ fontStyle: "normal", display: "inline-block" }}>
          Apps & Downloads
        </Label>
      </Link>
      . Catch up on industry news and community announcements in
      <Link
        to="/editorials"
        scroll={false}
        onClick={() =>
          ga("event", {
            category: "nav",
            action: "list.description.link",
            label: "/editorials",
          })
        }
        style={{ textDecoration: "none", background: "0 0" }}
      >
        <Label inverse style={{ fontStyle: "normal", display: "inline-block" }}>
          Letters, Editorials.
        </Label>
      </Link>
      .
    </>
  );

  if (route === "/") return defaultDescription;
  if (description) return description;
  return defaultDescription;
};

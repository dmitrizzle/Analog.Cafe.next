import React from "react";

import { ROUTE_LABELS, ROUTE_TAGS } from "../../../pages/List/constants";
import Link from "../../Link";
import Point from "../../../icons/Point";
import ga from "../../../../../utils/data/ga";

export default ({ tag }) => {
  const route = Object.keys(ROUTE_TAGS)[Object.values(ROUTE_TAGS).indexOf(tag)];
  const description = ROUTE_LABELS[route]?.description;

  const defaultDescription = (
    <>
      Read about film and cameras in{" "}
      <strong>
        “
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
        >
          Film, Photography.
        </Link>
        ”
      </strong>{" "}
      Find photo essays in{" "}
      <strong>
        “
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
        >
          Essays, Stories.
        </Link>
        ”
      </strong>{" "}
      Download printable guides, and use interactive tools in{" "}
      <strong>
        “
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
        >
          Apps & Downloads.
        </Link>
        ”
      </strong>{" "}
      Catch up on industry news and community announcements in{" "}
      <strong>
        “
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
        >
          Letters, Editorials.
        </Link>
        ”
      </strong>{" "}
    </>
  );

  if (route === "/") return defaultDescription;
  if (description)
    return (
      <>
        {description}{" "}
        <Link to="/" scroll={false}>
          <Point style={{ height: "1em", marginTop: "-.25em" }} />
        </Link>{" "}
        <strong>
          <Link to="/" scroll={false}>
            up.
          </Link>
        </strong>
      </>
    );
  return defaultDescription;
};

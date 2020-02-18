import React from "react";
import Router from "next/router";
import styled from "styled-components";

import { LabelWrap } from "../../Docket";
import { NAME } from "../../../../../constants/messages/system";
import { ROUTE_LABELS, ROUTE_TAGS } from "../../../pages/List/constants";
import {
  c_black,
  c_blue,
  c_grey_dark,
  c_red,
  c_white,
} from "../../../../../constants/styles/colors";
import { unstyledLinks } from "./Wall";
import APP from "../../../../../pages/_app";
import Label from "../../../vignettes/Label";
import Link from "../../Link";

export const BreadcrumbsWrap = styled(LabelWrap)`
  position: relative;
  font-size: 0.8em;
  font-style: normal;
  width: auto;
  height: 2em;
  ${unstyledLinks};
  label {
    line-height: 1.25em;
  }
  a:last-child {
    label {
      background: ${c_black};
      color: ${c_white};
    }
  }
`;
export default props => {
  const { listTag, activeCollection } = props;
  const getTagAttributes = tag => {
    const position = Object.values(ROUTE_TAGS).indexOf(tag);
    const url = Object.keys(ROUTE_TAGS)[position];
    const title = ROUTE_LABELS[url].title;

    return { url, title };
  };

  return (
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
        <Label
          style={
            Router.router?.asPath === "/"
              ? { background: c_red, color: c_white }
              : {}
          }
        >
          {NAME}
        </Label>
      </Link>
      {listTag && (
        <Link to={getTagAttributes(listTag).url} scroll={false}>
          <span style={{ color: c_grey_dark }}> »</span>
          <Label style={listTag === "link" ? { background: c_blue } : {}}>
            {getTagAttributes(listTag).title}
          </Label>
        </Link>
      )}

      {activeCollection && (
        <>
          <span style={{ color: c_grey_dark }}> »</span>
          <Link onClick={event => event.preventDefault()}>
            <Label>
              {activeCollection[0].toUpperCase() + activeCollection.slice(1)}
            </Label>
          </Link>
        </>
      )}
    </BreadcrumbsWrap>
  );
};

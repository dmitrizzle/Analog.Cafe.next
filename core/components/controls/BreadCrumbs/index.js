import { useSelector } from "react-redux";
import { withRouter } from "next/router";
import React from "react";
import styled, { css } from "styled-components";

import { NAME } from "../../../../constants/messages/system";
import { ROUTE_LABELS, ROUTE_TAGS } from "../../pages/List/constants";
import {
  c_black,
  c_blue,
  c_grey_dark,
  c_red,
  c_white,
} from "../../../../constants/styles/colors";
import { withRedux } from "../../../../utils/with-redux";
import Label from "../../vignettes/Label";
import Link from "../Link";

export const unstyledLinks = css``;
export const BreadcrumbsWrap = styled.div`
  font-size: 0.8em;
  margin: 1.5em auto -1.5em;
  text-align: center;
  height: 3em;

  transition: opacity 250ms;
  ${props => props.hide && `opacity: 0;`}

  a {
    background: ${c_white} !important;
    padding: 0 !important;

    :active,
    :focus {
      background: 0 0;
    }
    label {
      cursor: pointer;
      line-height: 1.25em;
      margin: 0;
    }
    :last-child {
      label {
        background: ${c_black};
        color: ${c_white};
      }
    }
  }
`;

export default withRouter(
  withRedux(({ router }) => {
    const { filter } = useSelector(state => state.list);

    const getTagAttributes = tag => {
      const position = Object.values(ROUTE_TAGS).indexOf(tag);
      const url = Object.keys(ROUTE_TAGS)[position];
      const title = ROUTE_LABELS[url]?.title;

      return { url, title };
    };
    const tag = getTagAttributes(filter.tags[0]);

    return (
      <BreadcrumbsWrap hide={!filter && !ROUTE_LABELS[router.asPath]?.title}>
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
              router?.asPath === "/"
                ? { background: c_red, color: c_white }
                : {}
            }
          >
            {NAME}
          </Label>
        </Link>
        {tag?.title && (
          <Link to={tag.url} scroll={false}>
            <span style={{ color: c_grey_dark }}> » </span>
            <Label style={tag === "link" ? { background: c_blue } : {}}>
              {tag.title}
            </Label>
          </Link>
        )}
      </BreadcrumbsWrap>
    );
  })
);

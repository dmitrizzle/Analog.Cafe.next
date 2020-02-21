import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import Router, { withRouter } from "next/router";
import styled from "styled-components";

import { NAME } from "../../../../constants/messages/system";
import {
  ROUTE_FILTERS,
  ROUTE_LABELS,
  ROUTE_TAGS,
} from "../../pages/List/constants";
import { articleInitialState } from "../../../store/reducers-article";
import {
  b_phablet,
  b_tablet,
  m_column,
} from "../../../../constants/styles/measurements";
import {
  c_blue,
  c_grey_dark,
  c_grey_light,
  c_grey_med,
  c_white,
} from "../../../../constants/styles/colors";
import { withRedux } from "../../../../utils/with-redux";
import Label from "../../vignettes/Label";
import Link from "../Link";

export const BreadcrumbsWrap = styled.div`
  font-size: 0.8em;
  text-align: right;
  width: calc(100vw);
  top: 0;

  position: absolute;
  max-width: ${m_column};

  transition: opacity 250ms;
  right: 0.5em;

  @media (min-width: ${b_tablet}) {
    left: calc((100vw - ${m_column}) / 2);
    right: 0;
  }

  ${props => props.hide && `opacity: 0;`}
  > span {
    color: ${c_grey_med};
  }

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
      margin: -0.5em 0;
      background: ${c_grey_light};
      color: #c1c1c1;

      display: inline-block;
      max-width: 9em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    :last-child {
      label {
        color: ${c_grey_dark};
      }
    }
  }
`;

const getTagAttributes = tag => {
  const position = Object.values(ROUTE_TAGS).indexOf(tag);
  const url = Object.keys(ROUTE_TAGS)[position];
  const title = ROUTE_LABELS[url]?.title;

  return { url, title };
};

const BreadCrumbs = props => {
  const { pathname, query, filter, title } = props;
  const { asPath } = props.router;

  const article = useSelector(state => state.article);

  const collection = query?.collection;

  let tag;

  const listRoutes = [
    ...Object.keys(ROUTE_TAGS).filter(key => key !== "/"),
    ...Object.keys(ROUTE_FILTERS),
  ];
  listRoutes.forEach(path => {
    if (filter?.tags && asPath.includes(path)) {
      tag = getTagAttributes(filter.tags[0]);
      return;
    }
  });

  if (asPath.includes("/r/")) {
    tag = getTagAttributes(filter);
  }
  if (asPath.includes("/account")) {
    tag = {
      ...getTagAttributes("account"),
      url: "/account/profile",
    };
  }

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
        <Label>{NAME}</Label>
      </Link>
      {tag?.title && (
        <>
          <span>↬</span>
          <Link to={tag.url} scroll={false}>
            <Label style={tag === "link" ? { background: c_blue } : {}}>
              {tag.title}
            </Label>
          </Link>
        </>
      )}
      {collection && (
        <>
          <span>↬</span>
          <Link onClick={event => event.preventDefault()}>
            <Label>{collection[0].toUpperCase() + collection.slice(1)}</Label>
          </Link>
        </>
      )}
      {asPath.includes("/account/submission/") && (
        <>
          <span>↬</span>
          <Link to="/account/all-submissions">
            <Label>Submissions</Label>
          </Link>
        </>
      )}
      {title && title !== articleInitialState.title && (
        <>
          <span>↬</span>
          <Link onClick={event => event.preventDefault()}>
            <Label>{title}</Label>
          </Link>
        </>
      )}
    </BreadcrumbsWrap>
  );
};

export default withRouter(withRedux(BreadCrumbs));

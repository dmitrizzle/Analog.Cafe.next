import { BreadcrumbJsonLd } from "next-seo";
import { withRouter } from "next/router";
import React from "react";
import styled from "styled-components";

import { DOMAIN } from "../../../../constants/router/defaults";
import { NAME } from "../../../../constants/messages/system";
import {
  ROUTE_FILTERS,
  ROUTE_LABELS,
  ROUTE_TAGS,
} from "../../pages/List/constants";
import { articleInitialState } from "../../../store/reducers-article";
import { c_blue } from "../../../../constants/styles/themes";
import { withRedux } from "../../../../utils/with-redux";
import Label from "../../vignettes/Label";
import Link from "../Link";

export const BreadcrumbsWrap = styled.div`
  @media print {
    display: none;
  }
  font-size: 0.8em;
  text-align: center;

  position: relative;
  transition: opacity 250ms;
  margin-top: 0;
  margin-bottom: 1.5em;

  ${({ hide }) => hide && `opacity: 0;`}
  > small {
    color: ${({ theme }) => theme.grey_med};
  }

  a {
    padding: 0 !important;

    label {
      cursor: pointer;
      line-height: 1.25em;
      margin: -0.5em 0;
      background: transparent;
      color: #c1c1c1;

      display: inline-block;
      max-width: 10em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      font-variation-settings: "wght" 400;
    }
  }
  > a:active {
    background: transparent !important;
  }
`;

const getTagAttributes = tag => {
  const position = Object.values(ROUTE_TAGS).indexOf(tag);
  const url = Object.keys(ROUTE_TAGS)[position];
  const title = ROUTE_LABELS[url]?.title;

  return { url, title };
};

const BreadCrumbs = props => {
  const { query, filter, title } = props;
  const { asPath } = props.router;

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

  if (filter && (asPath.includes("/r/") || asPath.includes("/app/"))) {
    tag = getTagAttributes(filter);
  }
  if (asPath.includes("/account")) {
    tag = {
      ...getTagAttributes("account"),
      url: "/account/profile",
    };
  }

  let breadCrumbsList = [];
  const base = DOMAIN.PROTOCOL.PRODUCTION + DOMAIN.APP.PRODUCTION;
  if (tag?.title)
    breadCrumbsList.push({
      name: tag.title,
      item: base + tag.url,
    });
  if (collection)
    breadCrumbsList.push({
      name: collection[0].toUpperCase() + collection.slice(1),
      item: base + tag.url + "/" + collection,
    });
  if (title && title !== articleInitialState.title)
    breadCrumbsList.push({
      name: title,
      item: base + asPath,
    });
  breadCrumbsList = breadCrumbsList.map((crumb, iterable) => {
    return {
      ...crumb,
      position: iterable + 1,
    };
  });

  return (
    <BreadcrumbsWrap>
      {breadCrumbsList.length > 0 && (
        <BreadcrumbJsonLd itemListElements={breadCrumbsList} />
      )}
      <Link
        to="/"
        scroll={false}
        onClick={() =>
          window.scrollTo &&
          window.scrollTo({
            top: 0,
          })
        }
      >
        <Label
          blackFont={asPath === "/" ? true : false}
          style={{
            fontSize: asPath === "/" ? ".85em" : undefined,
          }}
        >
          {NAME}
        </Label>
      </Link>
      {tag?.title && (
        <>
          <small>›</small>
          <Link to={tag.url} scroll={false}>
            <Label style={tag === "link" ? { background: c_blue } : {}}>
              {tag.title}
            </Label>
          </Link>
        </>
      )}
      {collection && (
        <>
          <small>›</small>
          <Link onClick={event => event.preventDefault()}>
            <Label>{collection[0].toUpperCase() + collection.slice(1)}</Label>
          </Link>
        </>
      )}
      {asPath.includes("/account/submission") && (
        <>
          <small>›</small>
          <Link to="/account/all-submissions">
            <Label>Submissions</Label>
          </Link>
        </>
      )}
      {asPath.includes("/account/subscriptions") && (
        <>
          <small>›</small>
          <Link to="/account/subscriptions">
            <Label>Subscriptions</Label>
          </Link>
        </>
      )}
      {title && title !== articleInitialState.title && (
        <>
          <small>›</small>
          <Link onClick={event => event.preventDefault()}>
            <Label>{title}</Label>
          </Link>
        </>
      )}
    </BreadcrumbsWrap>
  );
};

export default withRouter(withRedux(BreadCrumbs));

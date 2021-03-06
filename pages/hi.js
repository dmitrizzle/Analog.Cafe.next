import { LogoJsonLd, NextSeo } from "next-seo";
import React from "react";
import styled from "styled-components";

import { DESCRIPTION_LONG, NAME } from "../constants/messages/system";
import { DOMAIN } from "../constants/router/defaults";
import {
  b_mobile,
  b_phablet,
  b_tablet,
} from "../constants/styles/measurements";
import { fetchListPage } from "../core/store/actions-list";
import { getFirstNameFromFull } from "../utils/author-credits";
import { getListMeta } from "../core/components/pages/List/utils";
import { withRedux } from "../utils/with-redux";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import CardCaption from "../core/components/controls/Card/components/CardCaption";
import CardFigure from "../core/components/controls/Card/components/CardFigure";
import CardIntegrated from "../core/components/controls/Card/components/CardIntegrated";
import HeaderSubtitle from "../core/components/vignettes/HeaderLarge/components/HeaderSubtitle";
import HeaderTitle from "../core/components/vignettes/HeaderLarge/components/HeaderTitle";
import HeaderWrapper from "../core/components/vignettes/HeaderLarge/components/HeaderWrapper";
import Link from "../core/components/controls/Link";
import Main from "../core/components/layouts/Main";

const ColumnWrapper = styled.div`
  column-width: ${b_mobile};
  @media (max-width: 710px) and (min-width: 411px) {
    column-width: calc(50vw - 2em);
  }
`;

const Hi = ({ list }) => {
  const seo = {
    title: `Weclcome to ${NAME}!`,
    description: DESCRIPTION_LONG,
  };
  console.log("list", list);

  return (
    <>
      <NextSeo
        title={seo.title}
        description={seo.description}
        openGraph={{
          type: "website",
        }}
      />
      <LogoJsonLd
        logo={
          DOMAIN.PROTOCOL.PRODUCTION +
          DOMAIN.APP.PRODUCTION +
          "/static/logo-1764x1764.png"
        }
        url={DOMAIN.PROTOCOL.PRODUCTION + DOMAIN.APP.PRODUCTION}
      />
      <Main title={seo.title}>
        <ArticleWrapper>
          <HeaderWrapper>
            <HeaderSubtitle>Welcome to</HeaderSubtitle>
            <HeaderTitle>{NAME}!</HeaderTitle>
          </HeaderWrapper>

          <ArticleSection>
            <h3>Latest articles.</h3>

            <ColumnWrapper>
              {list?.items.slice(0, 4).map((item, count) => (
                <Link to={`/r/${item.slug}`}>
                  <CardIntegrated
                    withOutline
                    style={{
                      width: "100%",
                      display: "inline-block",
                      columnBreakInside: "avoid",
                      margin: "0 0 .5em",
                    }}
                  >
                    <CardFigure image={item.poster} />
                    <CardCaption>
                      <strong>“{item.title}”</strong> by{" "}
                      {getFirstNameFromFull(item.submittedBy.name)}.
                    </CardCaption>
                  </CardIntegrated>
                </Link>
              ))}
            </ColumnWrapper>
            <h3>Shop.</h3>
            <h3>Submissions.</h3>
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
};

Hi.getInitialProps = async ({ reduxStore }) => {
  const listRequest = getListMeta("/", 1).request;
  await reduxStore.dispatch(fetchListPage(listRequest));
  const { list } = reduxStore.getState();
  return {
    list,
  };
};

export default withRedux(Hi);

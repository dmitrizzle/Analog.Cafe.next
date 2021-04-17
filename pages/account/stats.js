import { NextSeo } from "next-seo";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import styled from "styled-components";

import { blockSmall } from "../../core/components/vignettes/Blocks";
import {
  fetchAuthorsList,
  fetchMemberList,
} from "../../user/store/actions-community";
import { interpretTheme } from "../../core/components/controls/Theme/utils";
import { withRedux } from "../../utils/with-redux";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import Main from "../../core/components/layouts/Main";

const GraphBar = styled.div`
  ${blockSmall};
  align-items: "flex-end";
`;
const GraphBarLabel = styled.h4`
  font-size: 1em !important;
  padding: 0 !important;
  text-align: center;
`;

const Stats = () => {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  const community = useSelector(store => store.community);
  const theme = interpretTheme(useSelector(({ theme }) => theme));

  community.authorsList.status === "loading" &&
    dispatch(fetchAuthorsList({ itemsPerPage: 350 }));

  community.memberList.status === "loading" && dispatch(fetchMemberList());

  const isDataPending = () => {
    if (user.status === "pending" || user.status === "fetching") return true;
    if (community.authorsList.status === "loading") return true;
    if (community.memberList.status === "loading") return true;
  };

  if (isDataPending()) {
    return (
      <>
        <NextSeo title={"Stats"} />
        <ClientLoader />
      </>
    );
  }

  if (user?.info?.role !== "admin")
    return (
      <Main>
        <ArticleWrapper>
          <ArticleSection>
            <p style={{ textAlign: "center" }}>
              This feature is not yet available.
            </p>
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    );

  return (
    <>
      <NextSeo title={"Stats"} />
      <Main title={"Stats"}>
        <ArticleWrapper>
          <HeaderLarge pageTitle={"Stats"} />
          <ArticleSection>
            <h3>Daily new members.</h3>{" "}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                flexDirection: "row-reverse",
                height: "10em",
                width: "18.85em",
              }}
            >
              {community.memberList?.stats?.step24hr?.map((count, step) => {
                const LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
                const now = Math.floor(+new Date() / 1000);
                const stepDay = new Date(
                  (now - (step + 1) * 60 * 60 * 24) * 1000
                );
                const day = stepDay.getDay();

                const statsArray = community.memberList?.stats?.step24hr;
                let largest = statsArray[0];
                for (var i = 0; i < statsArray.length; i++) {
                  if (largest < statsArray[i]) {
                    largest = statsArray[i];
                  }
                }

                return (
                  <div>
                    <GraphBar
                      style={{
                        height: `calc(${(count / largest) * 7}em + 20px)`,
                      }}
                    >
                      {count}
                    </GraphBar>
                    <GraphBarLabel>{LABELS[day]}</GraphBarLabel>
                  </div>
                );
              })}
            </div>
            <h4
              style={{
                fontSize: "1em",
                paddingTop: "2em",
              }}
            >
              Total: {community.memberList?.page["items-total"]}.
            </h4>
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
};

export default withRedux(Stats);

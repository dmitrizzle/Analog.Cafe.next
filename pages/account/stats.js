import { NextSeo } from "next-seo";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import styled from "styled-components";

import { blockSmall } from "../../core/components/vignettes/Blocks";
import {
  fetchAuthorsList,
  fetchMemberList,
} from "../../user/store/actions-community";
import { withRedux } from "../../utils/with-redux";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import Main from "../../core/components/layouts/Main";

const GraphBar = styled.div`
  ${blockSmall};
  align-items: flex-end;
`;
const GraphBarLabel = styled.h4`
  font-size: 1em !important;
  padding: 0 !important;
  text-align: center;
`;
const GraphWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: row-reverse;
  height: 10em;
  width: 18.85em;
`;
const GraphWrapperScroll = styled.div`
  width: 100%;
  overflow-x: scroll;
`;

const Stats = () => {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  const community = useSelector(store => store.community);

  community.authorsList.status === "loading" &&
    dispatch(fetchAuthorsList({ itemsPerPage: 350 }));

  community.memberList.status === "loading" && dispatch(fetchMemberList());

  const isDataPending = () => {
    if (user.status === "pending" || user.status === "fetching") return true;
    if (community.authorsList.status === "loading") return true;
    if (community.memberList.status === "loading") return true;
  };

  let monthlyTrends = React.createRef();
  useEffect(() => {
    if (!isDataPending())
      monthlyTrends?.current?.scrollTo({ left: 1000, behavior: "smooth" });
  }, [user, community]);

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
          <HeaderLarge
            pageTitle={`Members: ${community.memberList?.page["items-total"]}`}
          />
          <ArticleSection>
            <h3>Daily new members.</h3>{" "}
            <GraphWrapper>
              {community.memberList?.stats?.step24hr?.map((count, step) => {
                const LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
                const now = Math.floor(+new Date() / 1000);
                const stepDay = new Date(
                  (now - (step + 1) * 60 * 60 * 24) * 1000
                );
                const day = stepDay.getUTCDay();

                const statsArray = community.memberList?.stats?.step24hr;
                let largest = statsArray[0];
                for (var i = 0; i < statsArray.length; i++) {
                  if (largest < statsArray[i]) {
                    largest = statsArray[i];
                  }
                }

                return (
                  <div key={step}>
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
            </GraphWrapper>
            <h3 style={{ marginTop: "2em" }}>
              2-year month-segment growth trends.
            </h3>
            <p style={{ marginTop: "-.25em" }}>
              <small
                style={{
                  lineHeight: "1.25em",
                  display: "block",
                  maxWidth: "40em",
                }}
              >
                <em>
                  Ending with the current month’s total. A month segment is an
                  average monthly days inc. leap years: 30.4375 per month.
                </em>
              </small>
            </p>
            <GraphWrapperScroll ref={monthlyTrends}>
              <GraphWrapper style={{ width: "66.25em" }}>
                {community.memberList?.stats?.step30d?.map((count, step) => {
                  const MONTHS = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ];
                  const LABELS = [...MONTHS, ...MONTHS];

                  const date = new Date();
                  const thisMonthsFirst =
                    +new Date(date.getFullYear(), date.getMonth(), 1) / 1000;

                  const currentMonth = new Date(
                    thisMonthsFirst * 1000
                  ).getMonth();
                  let month = currentMonth - step;
                  if (month < 0) {
                    month = currentMonth + 12 - step;
                  }
                  if (month < 0) {
                    month = currentMonth + 24 - step;
                  }

                  const statsArray = community.memberList?.stats?.step30d;
                  let largest = statsArray[0];
                  for (var i = 0; i < statsArray.length; i++) {
                    if (largest < statsArray[i]) {
                      largest = statsArray[i];
                    }
                  }

                  return (
                    <React.Fragment key={step}>
                      <div>
                        <GraphBar
                          style={{
                            height: `calc(${(count / largest) * 7}em + 20px)`,
                          }}
                        >
                          {count}
                        </GraphBar>

                        <GraphBarLabel>{LABELS[month]}</GraphBarLabel>
                      </div>
                      {!month && <div style={{ padding: ".25em" }} />}
                    </React.Fragment>
                  );
                })}
              </GraphWrapper>
            </GraphWrapperScroll>
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
};

export default withRedux(Stats);

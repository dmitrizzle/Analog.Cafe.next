import { NextSeo } from "next-seo";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

import {
  fetchAuthorsList,
  fetchMemberList,
} from "../../user/store/actions-community";
import { interpretTheme } from "../../core/components/controls/Theme/utils";
import { makeFroth } from "../../utils/froth";
import { themeOptions } from "../../constants/styles/themes";
import { withRedux } from "../../utils/with-redux";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import AuthorsBanner, {
  AuthorIcon,
  Authors,
} from "../../core/components/pages/About/components/AuthorsBanner";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import Main from "../../core/components/layouts/Main";

const LATEST_MEMBERS_DEFAULT_SAMPLE_SIZE = 100;
const Community = () => {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  const community = useSelector(store => store.community);
  const theme = interpretTheme(useSelector(({ theme }) => theme));

  community.authorsList.status === "loading" &&
    dispatch(fetchAuthorsList({ itemsPerPage: 350 }));

  community.memberList.status === "loading" &&
    dispatch(
      fetchMemberList({ itemsPerPage: LATEST_MEMBERS_DEFAULT_SAMPLE_SIZE })
    );

  const isDataPending = () => {
    if (user.status === "pending" || user.status === "fetching") return true;
    if (community.authorsList.status === "loading") return true;
    if (community.memberList.status === "loading") return true;
  };

  if (isDataPending()) {
    return (
      <>
        <NextSeo title={"Community"} />
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
      <NextSeo title={"Community"} />
      <Main title={"Community"}>
        <ArticleWrapper>
          <HeaderLarge pageTitle={"Community"} />
          <ArticleSection>
            <h3>Authors.</h3>
            <AuthorsBanner overflow={1}>
              <Authors>
                {community.authorsList.items.map((item, index) => {
                  const image = makeFroth({ src: item.image, size: "t" }).src;
                  return (
                    <div title={item.title} key={index}>
                      <AuthorIcon
                        style={{ backgroundImage: `url(${image})` }}
                        to={`/u/${item.id}`}
                      >
                        {!item.image && item.title?.substring(0, 2)}
                      </AuthorIcon>
                    </div>
                  );
                })}
              </Authors>
            </AuthorsBanner>
            <h3>New members.</h3>
            <AuthorsBanner overflow={1}>
              <Authors>
                {community.memberList.items.map((item, index) => {
                  const image = makeFroth({ src: item.image, size: "t" }).src;
                  return (
                    <div title={item.title} key={index}>
                      <AuthorIcon
                        style={{ backgroundImage: `url(${image})` }}
                        to={`/u/${item.id}`}
                      >
                        {!item.image && item.title?.substring(0, 2)}
                      </AuthorIcon>
                    </div>
                  );
                })}
                <AuthorIcon
                  style={{ background: "0 0" }}
                  onClick={event => event.preventDefault()}
                >
                  <small
                    style={{
                      width: "100%",
                      overflowWrap: "break-word",
                      lineHeight: "1em",
                      color: themeOptions[theme].fg,
                    }}
                  >
                    {parseInt(community.memberList.page["items-total"]) -
                      LATEST_MEMBERS_DEFAULT_SAMPLE_SIZE}
                  </small>
                </AuthorIcon>
              </Authors>
            </AuthorsBanner>
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
};

export default withRedux(Community);

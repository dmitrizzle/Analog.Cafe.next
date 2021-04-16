import { NextSeo } from "next-seo";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

import {
  fetchAuthorsList,
  fetchMemberList,
} from "../../user/store/actions-community";
import { makeFroth } from "../../utils/froth";
import { withRedux } from "../../utils/with-redux";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import AuthorsBanner, {
  AuthorIcon,
  Authors,
} from "../../core/components/pages/About/components/AuthorsBanner";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import Main from "../../core/components/layouts/Main";

const About = () => {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  const community = useSelector(store => store.community);

  community.authorsList.status === "loading" &&
    dispatch(fetchAuthorsList({ itemsPerPage: 350 }));

  community.memberList.status === "loading" &&
    dispatch(fetchMemberList({ itemsPerPage: 350 }));

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
                    <AuthorIcon
                      style={{ backgroundImage: `url(${image})` }}
                      to={`/u/${item.id}`}
                      key={index}
                    />
                  );
                })}
              </Authors>
            </AuthorsBanner>
            <h3>New members.</h3>
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
};

export default withRedux(About);

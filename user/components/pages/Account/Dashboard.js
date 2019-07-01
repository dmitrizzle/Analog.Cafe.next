import { connect } from "react-redux";
import React, { useEffect } from "react";

import { getUserInfo } from "../../../store/actions-user";
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper";
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge";
import Main from "../../../../core/components/layouts/Main";

const Dashboard = props => {
  const { info } = props.user;
  useEffect(() => {
    props.user.status === "forbidden" && process.browser && props.getUserInfo();
  });
  return (
    <Main>
      <ArticleWrapper>
        <HeaderLarge
          pageTitle="Your Account"
          pageSubtitle={
            info && info.title
              ? `Hi ${info.title}!`
              : "Verifying Your Identity…"
          }
        />
        <ArticleSection>hi</ArticleSection>
      </ArticleWrapper>
    </Main>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: () => {
      dispatch(getUserInfo());
    },
  };
};
export default connect(
  ({ user }) => {
    return { user };
  },
  mapDispatchToProps
)(Dashboard);

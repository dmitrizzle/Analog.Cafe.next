import React from "react";

import { TEXT_EMOJIS } from "../constants/messages/emojis";
import { fetchListPage } from "../core/store/actions-list";
import { getListMeta } from "../core/components/pages/List/utils";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import CardColumns from "../core/components/controls/Card/components/CardColumns";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import List from "../core/components/pages/List";
import Main from "../core/components/layouts/Main";
import ProfileInfo from "../user/components/vignettes/Profile/components/ProfileInfo";
import ProfilePicture from "../user/components/vignettes/Profile/components/ProfilePicture";
import ErrorPage from "next/error";

const userRoleMap = {
  admin: "Managing Editor",
  member: "Member",
  contributor: "Contributing Author",
};
const layerUp = { zIndex: 11, position: "relative" };
const doesAuthorHaveLink = author =>
  author.buttons && author.buttons[1] && author.buttons[1].text;

const UserProfile = props => {
  if (!props.list) return <ErrorPage statusCode={props.error} />;
  return (
    <Main>
      <ArticleWrapper>
        <HeaderLarge
          style={layerUp}
          noTitleCase
          pageTitle={props.list.author.title}
          pageSubtitle={userRoleMap[props.list.author.role]}
        />
        <ArticleSection style={layerUp}>
          <CardColumns>
            {props.list.author.image && <ProfilePicture {...props} />}
            {(props.list.author.text ||
              doesAuthorHaveLink(props.list.author)) && (
              <ProfileInfo
                doesAuthorHaveLink={doesAuthorHaveLink(props.list.author)}
                {...props}
              />
            )}
          </CardColumns>
        </ArticleSection>
      </ArticleWrapper>
      <List list={props.list} />
    </Main>
  );
};

UserProfile.getInitialProps = async ({ reduxStore, query, res }) => {
  await reduxStore.dispatch(
    fetchListPage(getListMeta("/u/" + query.id, 1).request)
  );
  const list = reduxStore.getState().list;
  if (list.message === "Author not found") {
    const error = 404;
    if (res) res.statusCode = error;
    return { error };
  }
  return { list };
};

export default UserProfile;

import React from "react";

import { fetchListPage } from "../core/store/actions-list";
import { getListMeta } from "../core/components/pages/List/utils";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import CardColumns from "../core/components/controls/Card/components/CardColumns";
import Error from "./_error";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import List from "../core/components/pages/List";
import Main from "../core/components/layouts/Main";
import ProfileInfo from "../user/components/vignettes/Profile/components/ProfileInfo";
import ProfilePicture from "../user/components/vignettes/Profile/components/ProfilePicture";

const userRoleMap = {
  admin: "Managing Editor",
  member: "Member",
  contributor: "Contributing Author",
};
const layerUp = { zIndex: 11, position: "relative" };
const doesAuthorHaveLink = author =>
  author.buttons && author.buttons[1] && author.buttons[1].text;

const UserProfile = props => {
  const { error } = props;

  if (error && error.code == 404) return <Error statusCode={error.code} />;

  const author = props.list ? props.list.author : undefined;
  const profileProps = author
    ? {
        title: author.title,
        subtitle: author.title !== "Unknown" ? userRoleMap[author.role] : "",
        image: author.title !== "Unknown" ? author.image : "",
        text: author.text,
        buttons: author.buttons || [],
      }
    : {
        title: "Not Listed",
        subtitle: "This person is not listed on Analog.Cafe",
        image: false,
        text: "",
        buttons: [],
      };

  const { title, subtitle, image, text, buttons } = profileProps;

  return (
    <Main>
      <ArticleWrapper>
        <HeaderLarge
          style={layerUp}
          noTitleCase
          pageTitle={title}
          pageSubtitle={subtitle}
        />
        <ArticleSection style={layerUp}>
          {!author && (
            <p>
              You may have ended up on this page because you followed a credit
              link to an author. Unfortunately, we do not have a profile for
              this person on the database.
            </p>
          )}
          <CardColumns>
            {image && <ProfilePicture {...props} />}
            {(text ||
              doesAuthorHaveLink({
                ...author,
                buttons: author ? author.buttons : [],
              })) && (
              <ProfileInfo
                doesAuthorHaveLink={doesAuthorHaveLink({
                  ...author,
                  buttons: author.buttons || [],
                })}
                {...props}
              />
            )}
          </CardColumns>
        </ArticleSection>
      </ArticleWrapper>
      {author && <List list={props.list} />}
    </Main>
  );
};

UserProfile.getInitialProps = async ({ reduxStore, query, res }) => {
  // author undefined
  if (query.id === "not-listed") {
    return { error: { message: "Undefined Author" } };
  }

  await reduxStore.dispatch(
    fetchListPage(getListMeta("/u/" + query.id, 1).request)
  );
  const list = reduxStore.getState().list;

  // 404
  if (list.message === "Author not found") {
    const statusCode = 404;
    if (res) res.statusCode = statusCode;
    return { error: { message: list.message }, code: 404 };
  }

  // successful
  return { list };
};

export default UserProfile;

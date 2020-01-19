import { NextSeo } from "next-seo";
import React from "react";

import { fetchListPage } from "../core/store/actions-list";
import { getListMeta } from "../core/components/pages/List/utils";
import { withRedux } from "../utils/with-redux";
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

  if (error && error.code && !error.code === "204")
    return <Error statusCode={error.code} />;

  const author = props.list ? props.list.author : undefined;
  let profileProps;

  // profile props adjusted for existing and non-existing authors
  if (author)
    profileProps = {
      title: author.title,
      subtitle: author.title !== "Unknown" ? userRoleMap[author.role] : "",
      image: author.title !== "Unknown" ? author.image : "",
      text: author.text,
      buttons: author.buttons || [],
    };
  else
    profileProps = {
      title: "Not Listed",
      subtitle: "This person is not listed on Analog.Cafe",
      image: false,
      text: "",
      buttons: [],
    };

  // suspended authors don't 404 but their info does not get to be visible
  if (author && author.suspend)
    profileProps = {
      title: "Locked Account",
      subtitle: "This user has been suspended",
      image: false,
      text: "",
      buttons: [],
    };

  const { title, subtitle, image } = profileProps;

  const seo = {
    title: "Not Listed",
    description:
      "Unfortunately, we do not have a profile for this person in the database.",
  };

  return (
    <>
      <NextSeo title={seo.title} description={seo.description} />
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
                link to an author. {seo.description}
              </p>
            )}
            <CardColumns style={{ paddingBottom: "1.5em" }}>
              <ProfilePicture image={image} title={title} />

              <ProfileInfo
                doesAuthorHaveLink={doesAuthorHaveLink({
                  ...author,
                  buttons: (author && author.buttons) || [],
                })}
                {...props}
              />
            </CardColumns>
          </ArticleSection>
        </ArticleWrapper>
        {author && author.id !== "unknown" && author.id && (
          <List list={props.list} />
        )}
      </Main>
    </>
  );
};

UserProfile.getInitialProps = async ({ reduxStore, query, res }) => {
  // get page number from get params (for SSR paths)
  const page = query.page || 1;

  await reduxStore.dispatch(
    fetchListPage(getListMeta("/u/" + query.id, page).request)
  );
  const list = await reduxStore.getState().list;

  // author undefined
  if (query.id === "not-listed") {
    return { error: { message: list.message, code: "204" } };
  }

  // 404
  if (list.message === "Author not found" || (res && res.statusCode === 404)) {
    if (res) res.statusCode = 404;
    return { error: { message: list.message, code: 404 } };
  }

  // 500
  if (list.status === "error" || (res && res.statusCode === 500)) {
    if (res) res.statusCode = 500;
    return { error: { code: 500 } };
  }

  // successful
  return { list };
};

export default withRedux(UserProfile);

import { NextSeo } from "next-seo";
import React from "react";
import lscache from "lscache";

import { API } from "../constants/router/defaults";
import { fetchListPage } from "../core/store/actions-list";
import { getListMeta } from "../core/components/pages/List/utils";
import { requestKey, responseCache } from "../utils/storage/ls-cache";
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

  console.log(error);

  if (error?.code && !error.code === "204")
    return <Error statusCode={error.code} />;

  const author = props.list?.author;
  let profileProps;

  console.log("author", author);

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
  if (author?.suspend)
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

  const { isSsr } = props;
  if (isSsr) {
    // refresh cache for list data
    console.log(0, requestKey({ url: `${API.AUTHORS}/${author.id}` }));
    responseCache.remove({ url: `${API.AUTHORS}/${author.id}` });
    !error && responseCache.set(props.requests.list, props.list);

    // clear old cache for seen pages beyond 1
    const requestWithoutPage = {
      ...props.requests.list,
      params: {
        ...props.requests.list.params,
        page: undefined,
      },
    };
    const listPagesSeen = lscache.get(
      `${requestKey(requestWithoutPage)}-pages`
    );
    for (let page = 1; page < listPagesSeen + 1; page++) {
      responseCache.remove({
        ...requestWithoutPage,
        params: { ...requestWithoutPage.params, page },
      });
    }
  }

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

UserProfile.getInitialProps = async ({ reduxStore, query, res, req }) => {
  // get page number from get params (for SSR paths)
  const page = query.page || 1;

  const listRequest = getListMeta("/u/" + query.id, page).request;
  await reduxStore.dispatch(fetchListPage(listRequest));
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
  console.log("list", list);
  return { list, isSsr: !!req, requests: { list: listRequest } };
};

export default withRedux(UserProfile);

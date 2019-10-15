import { NextSeo, ArticleJsonLd } from "next-seo";
import { connect } from "react-redux";
import LazyLoad from "react-lazyload";
import React from "react";
import Reader from "@roast-cms/french-press-editor/dist/components/vignettes/Reader";
import Router from "next/router";

import { AuthorsPrinted } from "./AuthorsPrinted";
import { DOMAIN } from "../../../../../constants/router/defaults";
import {
  DocketResponsive,
  DocketResponsiveImage,
  DocketResponsiveInfo,
} from "../../List/components/DocketResponsive";
import { LabelWrap } from "../../../controls/Docket";
import { NAME } from "../../../../../constants/messages/system";
import { addSessionInfo } from "../../../../../user/store/actions-user";
import { c_grey_dark } from "../../../../../constants/styles/colors";
import { eventGA } from "../../../../../utils/data/ga";
import { makeFroth } from "../../../../../utils/froth";
import { readingTime } from "../../../../../utils/time";
import ArticleCoffee from "./ArticleCoffee";
import ArticleFooter from "./ArticleFooter";
import ArticleNav from "./ArticleNav";
import ArticleSection from "./ArticleSection";
import ArticleWrapper from "./ArticleWrapper";
import HeaderLarge from "../../../vignettes/HeaderLarge";
import Label from "../../../vignettes/Label";
import Link from "../../../controls/Link";
import LinkButton from "../../../controls/Button/components/LinkButton";
import Main from "../../../layouts/Main";
import Picture from "../../../vignettes/Picture";

export const ArticleBlock = props => {
  const isDownload = props.article.tag === "link";
  let downloadLink = "/account";
  let loginAction = downloadLink;
  let downloadClick = () => {
    eventGA({
      category: "Download",
      action: "Download.button",
      label: downloadLink,
    });
  };
  let userStatus = props.user.status;

  // source the link for download (it'll grab the first link in the content)
  // pagagraph > link
  // download link directs user to sign-in page if they aren't logged in
  if (isDownload) {
    const { nodes } = props.article.content.raw.document;
    nodes.forEach(node => {
      if (node.type === "paragraph") {
        node.nodes.forEach(subNode => {
          if (subNode.type === "link") {
            downloadLink = subNode.data.href;
            return;
          }
        });
        return;
      }
    });
  }

  // set post-login action to display download link
  if (isDownload && userStatus !== "ok") {
    loginAction = downloadLink;
    downloadLink = "/account";
    downloadClick = () => {
      props.addSessionInfo({ loginAction });
      eventGA({
        category: "Download",
        action: "Download.button.signIn",
        label: loginAction,
      });
      Router.router.push(downloadLink);
    };
  }

  const seo = {
    title:
      props.article.title +
      (props.article.subtitle ? ": " + props.article.subtitle : ""),
    description: props.article.summary,
    image: makeFroth({ src: props.article.poster, size: "m" }).src,
    published: props.article.date
      ? new Date(props.article.date.published * 1000)
      : undefined,
    modified: props.article.date
      ? new Date(props.article.date.updated * 1000)
      : undefined,
    submittedBy: props.article.submittedBy
      ? props.article.submittedBy.name
      : undefined,
    canonical:
      DOMAIN.PROTOCOL.PRODUCTION +
      DOMAIN.APP.PRODUCTION +
      "/r/" +
      props.article.slug,
  };

  const leadAuthor = props.article.authors
    ? props.article.authors.filter(author => author.authorship === "article")[0]
    : {};
  const leadAuthorButton = leadAuthor.buttons
    ? leadAuthor.buttons[1]
    : { text: "" };
  const coffeeForLeadAuthor = leadAuthorButton.text.includes("Coffee");

  return (
    <>
      <NextSeo
        title={seo.title}
        description={seo.description}
        openGraph={{
          type: "article",
          title: seo.title,
          images: [{ url: seo.image }],
          publishedTime: seo.published,
          modifiedTime: seo.modified,
        }}
      />
      <ArticleJsonLd
        url={seo.canonical}
        title={seo.title}
        description={seo.description}
        images={[seo.image]}
        datePublished={seo.published}
        dateModified={seo.modified}
        authorName={seo.submittedBy}
        publisherName={NAME}
        publisherLogo={
          DOMAIN.PROTOCOL.PRODUCTION +
          DOMAIN.APP.PRODUCTION +
          "/static/logo-1764x1764.png"
        }
      />
      <Main>
        <ArticleNav
          article={{
            ...props.article,
            isSubmission: props.isSubmission,
          }}
        />
        <ArticleWrapper>
          {!isDownload ? (
            <HeaderLarge
              pageTitle={props.article.title}
              pageSubtitle={props.article.subtitle}
            >
              <em style={{ display: "block", color: c_grey_dark }}>
                <small>
                  {readingTime(props.article.stats)} min read by{" "}
                  <AuthorsPrinted authors={props.article.authors} shouldLink />.
                </small>
              </em>
            </HeaderLarge>
          ) : (
            <HeaderLarge
              pageTitle={
                userStatus === "ok" ? "Your Link is Ready" : "Please Sign In"
              }
            />
          )}
          {coffeeForLeadAuthor && !isDownload && (
            <ArticleCoffee name={leadAuthor.title} link={leadAuthorButton.to} />
          )}
          <ArticleSection>
            {!isDownload ? (
              <Reader
                value={props.article.content.raw}
                components={{ Picture, Link }}
              />
            ) : (
              <>
                <div style={{ display: "flex", paddingTop: "1.5em" }}>
                  <DocketResponsive
                    to={downloadLink}
                    onClick={downloadClick}
                    style={{
                      maxWidth: "32em",
                      margin: "0 auto",
                    }}
                  >
                    <DocketResponsiveImage src={props.article.poster} />
                    <DocketResponsiveInfo>
                      <h4>{props.article.title}</h4>
                      <small>
                        <em>{props.article.summary}</em>
                      </small>
                    </DocketResponsiveInfo>
                    <LabelWrap>
                      <Label blue>Link / Download</Label>
                    </LabelWrap>
                  </DocketResponsive>
                </div>
                <LinkButton branded to={downloadLink} onClick={downloadClick}>
                  {userStatus === "ok" ? "Get It Now" : "Sign In to Download"}
                </LinkButton>
                <small style={{ textAlign: "center", display: "block" }}>
                  <em>
                    Free, 5 seconds to create,{" "}
                    <Link to="/privacy-policy" target="_blank">
                      no spam
                    </Link>
                    .
                  </em>
                </small>
              </>
            )}
            {!isDownload ? (
              <LazyLoad once offset={300} height={"100%"}>
                <ArticleFooter
                  article={props.article}
                  nextArticle={props.article.next}
                  thisArticle={props.article.slug}
                  thisArticlePostDate={
                    props.article.date && props.article.date.published
                  }
                  thisArticleEditDate={
                    props.article.date && props.article.date.updated
                  }
                />
              </LazyLoad>
            ) : null}
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
};

// default export uses front-end user status fetching
export default connect(
  ({ user }) => {
    return { user };
  },
  dispatch => {
    return {
      addSessionInfo: sessionInfo => dispatch(addSessionInfo(sessionInfo)),
    };
  }
)(ArticleBlock);

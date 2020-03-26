import { NextSeo, ArticleJsonLd } from "next-seo";
import { useDispatch, useSelector } from "react-redux";
import LazyLoad from "react-lazyload";
import React from "react";
import Reader from "@roast-cms/french-press-editor/dist/components/vignettes/Reader";
import Router from "next/router";
import dynamic from "next/dynamic";

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
import { makeFroth } from "../../../../../utils/froth";
import { readingTime } from "../../../../../utils/time";
import { withRedux } from "../../../../../utils/with-redux";
import ArticleSection from "./ArticleSection";
import ArticleWrapper from "./ArticleWrapper";
import HeaderLarge from "../../../vignettes/HeaderLarge";
import Label from "../../../vignettes/Label";
import Link from "../../../controls/Link";
import LinkButton from "../../../controls/Button/components/LinkButton";
import Main from "../../../layouts/Main";
import Picture from "../../../vignettes/Picture";
import ga from "../../../../../utils/data/ga";

const ArticleFooter = dynamic(() => import("./ArticleFooter"), {
  ssr: false,
});

export const ArticleBlock = props => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const isDownload = props.article.tag === "link";
  let downloadLink = "/account";
  let loginAction = downloadLink;
  let downloadClick = () => {
    ga("event", {
      category: "auth",
      action: "download",
      label: downloadLink,
    });
  };

  const ArticleNav = dynamic(() => import("./ArticleNav"), {
    ssr: false,
    loading: () => (
      <div style={isDownload ? { height: "2.5em", width: "100%" } : {}} />
    ),
  });

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
  if (isDownload && user.status !== "ok") {
    loginAction = downloadLink;
    downloadLink = "/account";
    downloadClick = () => {
      dispatch(addSessionInfo({ loginAction }));
      ga("event", {
        category: "auth",
        action: "download.signin",
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
  const coffeeForLeadAuthor = leadAuthorButton?.text.includes("Coffee");

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
      <Main filter={props.article.tag} title={props.article.title}>
        <ArticleNav
          article={{
            ...props.article,
            isSubmission: props.isSubmission,
          }}
          coffee={coffeeForLeadAuthor && !isDownload}
          leadAuthorButton={leadAuthorButton}
          leadAuthor={leadAuthor}
        />
        <ArticleWrapper>
          {!isDownload ? (
            <HeaderLarge
              pageTitle={props.article.title}
              pageSubtitle={props.article.subtitle}
            >
              <em
                style={{
                  display: "block",

                  lineHeight: "1em",
                  paddingTop: ".5em",
                }}
              >
                <small>
                  <span style={{ fontStyle: "normal" }}>
                    {readingTime(props.article.stats)}
                  </span>{" "}
                  min read by{" "}
                  <AuthorsPrinted authors={props.article.authors} shouldLink />.
                </small>
              </em>
            </HeaderLarge>
          ) : (
            <HeaderLarge pageTitle={props.article.title} />
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
                    <DocketResponsiveImage
                      tag={props.article.tag}
                      src={props.article.poster}
                    />
                    <DocketResponsiveInfo>
                      <h4>{props.article.title}</h4>
                      <small>
                        <em>{props.article.summary}</em>
                      </small>
                    </DocketResponsiveInfo>
                    <LabelWrap>
                      <Label blue>Download</Label>
                    </LabelWrap>
                  </DocketResponsive>
                </div>
                <LinkButton branded to={downloadLink} onClick={downloadClick}>
                  {user.status === "ok" ? "Get It" : "Continue to Sign In"}
                </LinkButton>
                {user.status !== "ok" && (
                  <small style={{ textAlign: "center", display: "block" }}>
                    <em>
                      Free, 5 seconds to create,{" "}
                      <Link to="/privacy-policy" target="_blank">
                        no spam
                      </Link>
                      .
                    </em>
                  </small>
                )}
              </>
            )}
          </ArticleSection>
        </ArticleWrapper>
        {!isDownload ? (
          <LazyLoad once offset={300} height={"100%"}>
            <ArticleFooter
              isSsr={props.isSsr}
              leadAuthorButton={leadAuthorButton}
              leadAuthor={leadAuthor}
              coffeeForLeadAuthor={coffeeForLeadAuthor}
              article={props.article}
              nextArticle={props.article.next}
              thisArticle={props.article.slug}
              thisArticlePostDate={
                props.article.date && props.article.date.published
              }
              thisArticleEditDate={
                props.article.date && props.article.date.updated
              }
            ></ArticleFooter>
          </LazyLoad>
        ) : null}
      </Main>
    </>
  );
};

// default export uses front-end user status fetching
export default withRedux(ArticleBlock);

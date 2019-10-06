import { connect } from "react-redux";
import LazyLoad from "react-lazyload";
import React from "react";
import Reader from "@roast-cms/french-press-editor/dist/components/vignettes/Reader";

import { AuthorsPrinted } from "./AuthorsPrinted";
import {
  DocketResponsive,
  DocketResponsiveImage,
  DocketResponsiveInfo,
} from "../../List/components/DocketResponsive";
import { LabelWrap } from "../../../controls/Docket";
import { addSessionInfo } from "../../../../../user/store/actions-user";
import { c_grey_dark } from "../../../../../constants/styles/colors";
import { readingTime } from "../../../../../utils/time";
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
  const isDownload = props.article.tag === "download";
  let downloadLink = "/account";
  let loginAction = downloadLink;
  let downloadClick = () => {};
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
    };
  }

  return (
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
              userStatus === "ok" ? "Your Download is Ready" : "Please Sign In"
            }
          />
        )}

        <ArticleSection>
          {!isDownload ? (
            <LazyLoad once offset={300} height={"100%"}>
              <Reader
                value={props.article.content.raw}
                components={{ Picture, Link }}
              />
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
                    <Label blue>download</Label>
                  </LabelWrap>
                </DocketResponsive>
              </div>
              <LinkButton branded to={downloadLink} onClick={downloadClick}>
                Download Now
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
        </ArticleSection>
      </ArticleWrapper>
    </Main>
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

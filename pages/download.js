import { connect } from "react-redux";
import { withRouter } from "next/router";
import React from "react";
import styled from "styled-components";

import {
  DocketResponsive,
  DocketResponsiveImage,
  DocketResponsiveInfo,
} from "../core/components/pages/List/components/DocketResponsive";
import { LabelWrap } from "../core/components/controls/Docket";
import { MUST_READS_CONTENT } from "../core/components/pages/Features/constants";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import Cube from "../core/components/icons/Cube";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Label from "../core/components/vignettes/Label";
import Link from "../core/components/controls/Link";
import LinkButton from "../core/components/controls/Button/components/LinkButton";
import Main from "../core/components/layouts/Main";

const iconStyles = { height: ".75em", paddingBottom: ".15em" };
Cube;

export const Code = styled.code`
  background: #f7f7f7;
  padding: 0.25em 0.5em;
  border-radius: 0.3em;
`;

export const Download = props => {
  const filename = props.router.query.file;
  const destination = `https://s3.ca-central-1.amazonaws.com/analog.cafe/downloads/${filename}`;

  // get file meta
  const fileList_1 = MUST_READS_CONTENT["download-guides"];
  const fileList_2 = MUST_READS_CONTENT["download-essays"];
  const fileList = [...fileList_1, ...fileList_2];
  const fileData = fileList.filter(
    download => download.to === "/download/" + filename
  )[0];

  const hasPermission = props.user.status === "ok";

  // ╰( ⁰ ਊ ⁰ )━☆ﾟ.*･｡ﾟ

  return (
    <Main>
      <ArticleWrapper>
        {/* <MetaTags metaTitle="Your Download is Ready" /> */}
        <HeaderLarge
          pageTitle={
            fileData
              ? hasPermission
                ? `Your Download is ready`
                : "Please Sign In"
              : "Can’t Find the Download"
          }
        />
        <ArticleSection>
          {fileData && (
            <div style={{ display: "flex" }}>
              <DocketResponsive
                style={{ margin: "1.5em auto" }}
                to={hasPermission ? destination : "/sign-in"}
                onClick={() => {
                  !hasPermission &&
                    props.addSessionInfo({
                      loginSuccess: `/download/${filename}`,
                    });
                }}
              >
                <DocketResponsiveImage src={fileData.poster} />
                <DocketResponsiveInfo>
                  <h4>
                    {fileData.type &&
                      fileData.type === "↯ PDF Download" &&
                      "DOWNLOAD: "}
                    {fileData.title}
                  </h4>
                  <small>
                    <em>{fileData.text}</em>
                  </small>
                </DocketResponsiveInfo>

                {fileData.type && (
                  <LabelWrap>
                    <Label branded>{fileData.type.replace("_", " ")}</Label>
                  </LabelWrap>
                )}
              </DocketResponsive>
            </div>
          )}

          {fileData && hasPermission && (
            <>
              <LinkButton
                to={destination}
                branded
                onClick={
                  () => {}
                  // GA.event({
                  //   category: "Download",
                  //   action: "Download.button",
                  //   label: destination
                  // })
                }
              >
                <span>
                  <Cube style={iconStyles} /> Download Now
                </span>
              </LinkButton>
            </>
          )}
          {!hasPermission && fileData && (
            <React.Fragment>
              <LinkButton
                to="/sign-in"
                branded
                onClick={() => {
                  fileData &&
                    props.addSessionInfo({
                      loginSuccess: `/download/${filename}`,
                    });
                }}
                style={{ marginBottom: 0 }}
              >
                Sign In to Download
              </LinkButton>
              <p style={{ textAlign: "center", marginTop: 0 }}>
                <small>
                  <em>
                    Free, 5 seconds to create,{" "}
                    <Link to="/privacy-policy">no spam</Link>.
                  </em>
                </small>
              </p>
            </React.Fragment>
          )}
          {!fileData && (
            <p>
              <strong>Could not find file</strong>{" "}
              <small>
                <Code>{filename}</Code>
              </small>
            </p>
          )}
        </ArticleSection>
      </ArticleWrapper>
    </Main>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addSessionInfo: sessionInfo => {
      // dispatch(addSessionInfo(sessionInfo))
    },
  };
};
const mapStateToProps = ({ user }) => {
  return {
    user: {},
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Download)
);

// https://s3.ca-central-1.amazonaws.com/analog.cafe/downloads

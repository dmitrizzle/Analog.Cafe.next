import { connect } from "react-redux";
import { withRouter } from "next/router";
import React from "react";
import styled from "styled-components";

import { MUST_READS_CONTENT } from "../core/components/pages/Features/constants";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import Cube from "../core/components/icons/Cube";
import GridButton from "../core/components/controls/Button/components/GridButton";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Link from "../core/components/controls/Link";
import LinkButton from "../core/components/controls/Button/components/LinkButton";
import Main from "../core/components/layouts/Main";
import Minimal from "../core/components/layouts/Minimal";
import Posters, {
  Poster,
  PosterImage,
  PosterInfo,
} from "../core/components/pages/Features/components/Posters";

const iconStyles = { height: ".75em", paddingBottom: ".15em" };
Cube;

export const Code = styled.code`
  background: #f7f7f7;
  padding: 0.25em 0.5em;
  border-radius: 0.3em;
`;

const Wrapper = props =>
  props.hasPermission ? (
    <Main {...props}>{props.children}</Main>
  ) : (
    <Minimal {...props}>{props.children}</Minimal>
  );

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
    <Wrapper>
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
            <Posters
              style={{
                margin: 0,
              }}
            >
              <div>
                <Poster
                  to={hasPermission ? destination : "/sign-in"}
                  onClick={() => {
                    !hasPermission &&
                      props.addSessionInfo({
                        loginSuccess: `/download/${filename}`,
                      });
                  }}
                >
                  <PosterImage src={fileData.poster} />
                  <PosterInfo>
                    <h4>
                      {fileData.type &&
                        fileData.type === "↯ PDF Download" &&
                        "DOWNLOAD: "}
                      {fileData.title}
                    </h4>
                    <small>
                      <em>{fileData.text}</em>
                    </small>
                  </PosterInfo>

                  {fileData.type && (
                    <GridButton style={{ margin: "13.25em 0 0 .5em" }} branded>
                      {fileData.type.replace("_", " ")}
                    </GridButton>
                  )}
                </Poster>
              </div>
            </Posters>
          )}

          {fileData && hasPermission && (
            <React.Fragment>
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
            </React.Fragment>
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
    </Wrapper>
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

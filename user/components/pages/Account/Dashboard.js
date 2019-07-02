import { connect } from "react-redux";
import React, { useEffect, useState } from "react";

import { LabelWrap } from "../../../../core/components/controls/Docket";
import {
  addSessionInfo,
  getSessionInfo,
  getUserInfo,
} from "../../../store/actions-user";
import { loadHeader } from "../../../../utils/storage";
import { makeFroth } from "../../../../utils/froth";
import { turnicateSentence } from "../../../../utils/author-credits";
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper";
import CardCaption from "../../../../core/components/controls/Card/components/CardCaption";
import CardColumns, {
  CardIntegratedForColumns,
} from "../../../../core/components/controls/Card/components/CardColumns";
import CardHeader from "../../../../core/components/controls/Card/components/CardHeader";
import CardWithDockets, {
  CardWithDocketsImage,
  CardWithDocketsInfo,
} from "../../../../core/components/controls/Card/components/CardWithDockets";
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge";
import Label from "../../../../core/components/vignettes/Label";
import Link from "../../../../core/components/controls/Link";
import LinkButton from "../../../../core/components/controls/Button/components/LinkButton";
import Main from "../../../../core/components/layouts/Main";

const Dashboard = props => {
  const { info } = props.user;

  // draft data
  const draftBody = localStorage.getItem("composer-content-text");
  const draftTitle = loadHeader().title;

  // show/hide boxes
  const [showSubmissions, setShowSubmissions] = useState(true);
  const [showDraft, setShowDraft] = useState(true);

  useEffect(() => {
    // show/hide boxes
    const {
      dashboardShowSubmissions,
      dashboardShowDraft,
    } = props.user.sessionInfo;
    props.getSessionInfo();
    setShowSubmissions(dashboardShowSubmissions);
    setShowDraft(dashboardShowDraft);

    // get user data
    props.user.status === "forbidden" && process.browser && props.getUserInfo();
  }, [props.user.status]);

  return (
    <Main>
      <ArticleWrapper>
        <HeaderLarge
          pageTitle="Your Account"
          pageSubtitle={
            info && info.title ? "Welcome Back!" : "Verifying Your Identity…"
          }
        />
        <div style={{ minHeight: "28em" }}>
          {props.user.status === "ok" && (
            <ArticleSection>
              {/* Profile and promo boxes */}
              <CardColumns>
                <CardIntegratedForColumns>
                  <CardWithDockets href={`/u/${info.id}`}>
                    <CardWithDocketsImage
                      src={makeFroth({ src: info.image, size: "m" }).src}
                    >
                      <LabelWrap>
                        <Label branded>{info.role}</Label>
                      </LabelWrap>
                    </CardWithDocketsImage>
                    <CardWithDocketsInfo>
                      <h4>{info.title}</h4>
                      <small>
                        <em>{info.text && turnicateSentence(info.text, 40)}</em>
                      </small>
                    </CardWithDocketsInfo>
                  </CardWithDockets>
                  <LinkButton href="/account/profile">
                    Edit Your Profile
                  </LinkButton>
                </CardIntegratedForColumns>
                <CardIntegratedForColumns>
                  <Link to="/submit">
                    <figure
                      style={{
                        background: `url(${
                          makeFroth({
                            src: "image-froth_1499794_BkFUA89IV",
                            size: "s",
                          }).src
                        }) top right`,
                        height: "13.155em",
                        backgroundSize: "cover",
                      }}
                    ></figure>
                  </Link>
                </CardIntegratedForColumns>
              </CardColumns>

              {/* Submissions and composer draft boxes */}
              <CardColumns>
                <CardIntegratedForColumns
                  style={!showSubmissions ? { margin: "0 auto 1em" } : {}}
                >
                  <div
                    onClick={event => {
                      event.stopPropagation();
                      setShowSubmissions(!showSubmissions);
                      props.addSessionInfo({
                        dashboardShowSubmissions: !showSubmissions,
                      });
                    }}
                  >
                    <CardHeader
                      buttons={
                        !showSubmissions
                          ? [<a href="#open">⇣</a>, 0]
                          : undefined
                      }
                      stubborn
                      noStar
                      title="Your Recent Submissions"
                    />
                  </div>
                  {showSubmissions && (
                    <>
                      <CardWithDocketsInfo
                        style={{ float: "none", width: "calc(100% - 1em)" }}
                      >
                        <small>
                          <em>Submissions</em>
                        </small>
                      </CardWithDocketsInfo>

                      <LinkButton to="/account/submissions">
                        View All
                      </LinkButton>
                    </>
                  )}
                </CardIntegratedForColumns>

                <CardIntegratedForColumns
                  style={!showDraft ? { margin: "0 auto 1em" } : {}}
                >
                  <div
                    onClick={event => {
                      event.stopPropagation();
                      setShowDraft(!showDraft);
                      props.addSessionInfo({
                        dashboardShowDraft: !showDraft,
                      });
                    }}
                  >
                    <CardHeader
                      stubborn
                      buttons={
                        !showDraft ? [<a href="#open">⇣</a>, 0] : undefined
                      }
                      noStar
                      title="Your Working Draft"
                    />
                  </div>

                  {showDraft && (
                    <>
                      {draftTitle && draftBody ? (
                        <CardWithDocketsInfo
                          style={{
                            float: "none",
                            width: "calc(100% - 1em)",
                            lineHeight: "1em",
                          }}
                        >
                          <h4>{draftTitle}</h4>
                          <small>
                            <em>{turnicateSentence(draftBody, 120)}</em>
                          </small>
                        </CardWithDocketsInfo>
                      ) : (
                        <CardCaption>
                          Compose a new article or essay to get featured on
                          Analog.Cafe. <Link to="/submit">Learn more</Link>.
                        </CardCaption>
                      )}

                      <LinkButton branded to="/submit/draft">
                        {draftTitle && draftBody
                          ? "Edit Draft"
                          : "Compose New Draft"}
                      </LinkButton>
                    </>
                  )}
                </CardIntegratedForColumns>
              </CardColumns>
            </ArticleSection>
          )}
        </div>
      </ArticleWrapper>
    </Main>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: () => {
      dispatch(getUserInfo());
    },
    getSessionInfo: () => {
      dispatch(getSessionInfo());
    },
    addSessionInfo: sessionInfo => {
      dispatch(addSessionInfo(sessionInfo));
    },
  };
};
export default connect(
  ({ user }) => {
    return { user };
  },
  mapDispatchToProps
)(Dashboard);

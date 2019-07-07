import { connect } from "react-redux";
import React, { useEffect, useState } from "react";

import { LabelWrap } from "../../../../core/components/controls/Docket";
import {
  addSessionInfo,
  getSessionInfo,
  getUserInfo,
} from "../../../store/actions-user";
import { c_grey_dark, c_red } from "../../../../constants/styles/colors";
import { fetchListPage } from "../../../../core/store/actions-list";
import { getListMeta } from "../../../../core/components/pages/List/utils";
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
import Heart from "../../../../core/components/icons/Heart";
import Label from "../../../../core/components/vignettes/Label";
import Link from "../../../../core/components/controls/Link";
import LinkButton from "../../../../core/components/controls/Button/components/LinkButton";
import List from "../../../../core/components/pages/List";
import Main from "../../../../core/components/layouts/Main";

const Dashboard = props => {
  const { info, status } = props.user;

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
    status === "pending" && process.browser && props.getUserInfo();

    // get favourites
    status === "ok" &&
      props.fetchListPage(getListMeta("/favourites").request, true);
  }, [status]);

  const pageSubtitle =
    info && info.title
      ? "Welcome Back!"
      : status === "pending"
      ? "Verifying Your Identity…"
      : "Something Went Wrong – Pleas Try Again";

  return (
    <Main>
      <ArticleWrapper>
        <HeaderLarge pageTitle="Your Account" {...{ pageSubtitle }} />
        <div style={{ minHeight: "24em" }}>
          {status === "ok" && (
            <ArticleSection>
              {/* line */}
              <CardColumns>
                {/* profile */}
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

                {/* exclusives */}
                <CardIntegratedForColumns>
                  <CardHeader
                    buttons={[0]}
                    stubborn
                    noStar
                    title="Downloads and Printables"
                  />
                  <CardWithDocketsInfo
                    style={{
                      float: "none",
                      width: "calc(100% - 1em)",
                      height: "8.5em",
                    }}
                  >
                    <small>
                      <em>Downloads & Printables</em>
                    </small>
                  </CardWithDocketsInfo>

                  <LinkButton to="/account/submissions">View All</LinkButton>
                </CardIntegratedForColumns>
              </CardColumns>

              {/* line */}
              <CardColumns>
                {/* submissions short list */}
                <CardIntegratedForColumns>
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

                {/* working draft */}
                <CardIntegratedForColumns>
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
                      {draftBody ? (
                        <CardWithDocketsInfo
                          style={{
                            float: "none",
                            width: "calc(100% - 1em)",
                            lineHeight: "1em",
                          }}
                        >
                          <h4>{draftTitle || "Untitled"}</h4>
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
              <h3 style={{ textAlign: "center", marginBottom: ".5em" }}>
                Your Favourites{" "}
                <Heart style={{ height: ".65em", color: c_red }} />
              </h3>
            </ArticleSection>
          )}
        </div>
      </ArticleWrapper>
      {status === "ok" && <List list={props.list} />}
      {props.list.items.length === 0 && (
        <ArticleSection>
          <p style={{ textAlign: "center", color: c_grey_dark }}>
            <em>
              Whenever your hit the{" "}
              <strong style={{ fontStyle: "normal" }}>
                <Heart style={{ height: ".75em" }} /> save
              </strong>{" "}
              on an article, it’ll appear here.
            </em>
          </p>
        </ArticleSection>
      )}
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
    fetchListPage: request => {
      dispatch(fetchListPage(request));
    },
  };
};
export default connect(
  ({ user, list }) => {
    return { user, list };
  },
  mapDispatchToProps
)(Dashboard);

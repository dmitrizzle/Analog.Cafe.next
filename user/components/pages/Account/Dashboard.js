import { connect } from "react-redux";
import React, { useEffect, useState } from "react";

import { CardWithDocketsInfo } from "../../../../core/components/controls/Card/components/CardWithDockets";
import {
  addSessionInfo,
  getSessionInfo,
  getUserInfo,
} from "../../../store/actions-user";
import { c_grey_dark, c_red } from "../../../../constants/styles/colors";
import { fetchListPage } from "../../../../core/store/actions-list";
import { getListMeta } from "../../../../core/components/pages/List/utils";
import { loadHeader } from "../../../../utils/storage";
import { turnicateSentence } from "../../../../utils/author-credits";
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper";
import CardCaption from "../../../../core/components/controls/Card/components/CardCaption";
import CardColumns, {
  CardIntegratedForColumns,
} from "../../../../core/components/controls/Card/components/CardColumns";
import CardDownloads from "./components/CardDownloads";
import CardDrafts from "./components/CardDrafts";
import CardHeader from "../../../../core/components/controls/Card/components/CardHeader";
import CardProfile from "./components/CardProfile";
import CardSubmissions from "./components/CardSubmissions";
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge";
import Heart from "../../../../core/components/icons/Heart";
import Link from "../../../../core/components/controls/Link";
import LinkButton from "../../../../core/components/controls/Button/components/LinkButton";
import List from "../../../../core/components/pages/List";
import Main from "../../../../core/components/layouts/Main";

const Dashboard = props => {
  const { info, status } = props.user;
  console.log(0);

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
    setShowSubmissions(
      typeof dashboardShowSubmissions === "undefined"
        ? true
        : dashboardShowSubmissions
    );
    setShowDraft(
      typeof dashboardShowDraft === "undefined" ? true : dashboardShowDraft
    );

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
                <CardProfile {...info} />
                <CardDownloads />
              </CardColumns>

              {/* line */}
              <CardColumns>
                {/* submissions short list */}
                <CardSubmissions
                  {...{
                    setShowSubmissions,
                    showSubmissions,
                    addSessionInfo: props.addSessionInfo,
                  }}
                />

                {/* working draft */}
                <CardDrafts
                  {...{
                    setShowDraft,
                    addSessionInfo: props.addSessionInfo,
                    showDraft,
                    draftTitle,
                    draftBody,
                  }}
                />
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

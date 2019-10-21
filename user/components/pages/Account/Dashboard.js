import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import Router from "next/router";

import {
  acceptUserInfo,
  addSessionInfo,
  getSessionInfo,
  getUserInfo,
} from "../../../store/actions-user";
import { c_grey_dark } from "../../../../constants/styles/colors";
import { fetchListPage } from "../../../../core/store/actions-list";
import { getListMeta } from "../../../../core/components/pages/List/utils";
import { loadHeader } from "../../../../utils/storage/ls-composer";
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper";
import CardColumns from "../../../../core/components/controls/Card/components/CardColumns";
import CardDrafts from "./components/CardDrafts";
import CardOffers from "./components/CardOffers";
import CardProfile from "./components/CardProfile";
import CardSubmissions from "./components/CardSubmissions";
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge";
import List from "../../../../core/components/pages/List";
import Main from "../../../../core/components/layouts/Main";
import Save from "../../../../core/components/icons/Save";

const Dashboard = props => {
  const { info, status, sessionInfo } = props.user;

  // draft data
  const draftBody = localStorage.getItem("composer-content-text");
  const draftTitle = loadHeader().title;

  // show/hide boxes
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [showDraft, setShowDraft] = useState(false);

  useEffect(() => {
    const { loginAction } = sessionInfo || {};

    if (loginAction) {
      // notify user that download is ready
      if (loginAction.includes("analog.cafe/downloads/")) {
        props.addSessionInfo({
          notification: {
            text: `Your link is ready! ${
              process.browser && "ontouchstart" in document.documentElement
                ? "Tap"
                : "Click"
            } here to get it.`,
            to: loginAction,
          },
          loginAction: undefined,
        });
      }

      // redirect user to submission upload page
      if (loginAction.includes("/submit/upload")) {
        props.addSessionInfo({
          loginAction: undefined,
        });
        Router.push("/submit/upload");
      }
    }

    // receive account updates & set user status to "ok"
    if (status === "updated") {
      props.acceptUserInfo();
      // props.getUserInfo();
    }

    // show/hide boxes
    const { dashboardShowSubmissions, dashboardShowDraft } = sessionInfo || {};
    props.getSessionInfo();
    setShowSubmissions(
      typeof dashboardShowSubmissions === "undefined"
        ? false
        : dashboardShowSubmissions
    );
    setShowDraft(
      typeof dashboardShowDraft === "undefined" ? false : dashboardShowDraft
    );

    // get favourites
    status === "ok" &&
      props.fetchListPage(getListMeta("/account").request, true);
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
                <CardOffers />
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
                <Save style={{ height: ".65em", marginTop: "-.15em" }} />{" "}
                Bookmarks
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
                <Save style={{ height: ".75em", marginTop: "-.15em" }} /> Save
                For Later
              </strong>{" "}
              button on an article, it appears here.
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
    acceptUserInfo: () => {
      dispatch(acceptUserInfo());
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

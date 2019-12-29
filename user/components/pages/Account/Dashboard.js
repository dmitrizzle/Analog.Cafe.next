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
import { setModal } from "../../../../core/store/actions-modal";
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper";
import CardColumns from "../../../../core/components/controls/Card/components/CardColumns";
import CardDrafts from "./components/CardDrafts";
import CardOffers from "./components/CardOffers";
import CardProfile from "./components/CardProfile";
import CardSubmissions from "./components/CardSubmissions";
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge";
import Link from "../../../../core/components/controls/Link";
import List from "../../../../core/components/pages/List";
import Main from "../../../../core/components/layouts/Main";
import Save from "../../../../core/components/icons/Save";
import ga from "../../../../utils/data/ga";

const Dashboard = props => {
  const { info, status, sessionInfo } = props.user;

  // draft data
  const draftBody = localStorage.getItem("composer-content-text");
  const draftTitle = loadHeader().title;

  // show/hide boxes
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [showDraft, setShowDraft] = useState(false);

  useEffect(() => {
    !sessionInfo && props.getSessionInfo();
    const { loginAction } = sessionInfo || {};

    if (loginAction) {
      // take user to download page
      if (loginAction.includes("analog.cafe/apps-downloads/")) {
        props.setModal({
          status: "ok",
          info: {
            title: "Your Link is Ready",
            image: "image-froth_1000000_fLvFYg5x",
            text:
              "The link/download you’ve requested is ready. Click the button below to get it.",
            buttons: [
              {
                to: loginAction,
                onClick: () => {
                  ga("event", {
                    category: "Download",
                    action: "Account.signIn.modal",
                    label: loginAction,
                  });
                },
                text: "Get It",
                branded: true,
              },
            ],
          },
        });
        props.addSessionInfo({
          loginAction: undefined,
        });
        return;
      }

      // redirect user to submission upload page
      if (loginAction.includes("/write/upload")) {
        props.addSessionInfo({
          loginAction: undefined,
        });
        Router.push("/write/upload");
        return;
      }

      // redirect user back to the article
      if (loginAction.includes("/r/")) {
        props.addSessionInfo({
          loginAction: undefined,
        });
        Router.push(loginAction);
        return;
      }
    }

    // receive account updates & set user status to "ok"
    if (status === "updated") {
      props.acceptUserInfo();
    }

    // show/hide boxes
    const { dashboardShowSubmissions, dashboardShowDraft } = sessionInfo || {};

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
  }, [status, sessionInfo, window.location.hash]);

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
              <div style={{ position: "relative" }}>
                <Link
                  to="/account/bookmarks"
                  style={{ textDecoration: "none" }}
                >
                  <h3
                    style={{ textAlign: "center", marginBottom: ".5em" }}
                    id="bookmarks"
                  >
                    <Save style={{ height: ".65em", marginTop: "-.15em" }} />{" "}
                    Bookmarks{" "}
                  </h3>
                </Link>
              </div>
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
    setModal: (info, request) => {
      dispatch(setModal(info, request));
    },
  };
};
export default connect(({ user, list }) => {
  return { user, list };
}, mapDispatchToProps)(Dashboard);

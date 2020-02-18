import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Router from "next/router";

import {
  acceptUserInfo,
  addSessionInfo,
  getSessionInfo,
} from "../../../store/actions-user";
import { c_grey_dark } from "../../../../constants/styles/colors";
import { loadHeader } from "../../../../utils/storage/ls-composer";
import { setModal } from "../../../../core/store/actions-modal";
import { withRedux } from "../../../../utils/with-redux";
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
import ls from "../../../../utils/storage/ls";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const list = useSelector(state => state.list);

  const { info, status, sessionInfo } = user;

  // draft data
  const draftBody = ls.getItem("composer-content-text");
  const draftTitle = loadHeader().title;

  // show/hide boxes
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [showDraft, setShowDraft] = useState(false);

  useEffect(() => {
    // receive account updates & set user status to "ok"
    if (status === "updated") {
      dispatch(acceptUserInfo());
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
    if (status === "ok") {
      //  dispatch(fetchListPage(getListMeta("/account").request, true));
    }
  }, [status, sessionInfo]);

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
                    addSessionInfo: sessionInfo =>
                      dispatch(addSessionInfo(sessionInfo)),
                  }}
                />

                {/* working draft */}
                <CardDrafts
                  {...{
                    setShowDraft,
                    addSessionInfo: sessionInfo =>
                      dispatch(addSessionInfo(sessionInfo)),
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
      {status === "ok" && <List list={list} />}
      {list.items.length === 0 && (
        <ArticleSection>
          <p style={{ textAlign: "center", color: c_grey_dark }}>
            <em>
              Whenever your hit the{" "}
              <strong style={{ fontStyle: "normal" }}>
                <Save style={{ height: ".75em", marginTop: "-.15em" }} /> Save
                To Bookmarks
              </strong>{" "}
              button on an article, it appears here.
            </em>
          </p>
        </ArticleSection>
      )}
    </Main>
  );
};

export default withRedux(Dashboard);

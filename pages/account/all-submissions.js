import { useDispatch, useSelector } from "react-redux";
import React from "react";
import styled from "styled-components";

import { initListPage } from "../../core/store/actions-list";
import { withRedux } from "../../utils/with-redux";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import Error from "../_error";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import LinkButton from "../../core/components/controls/Button/components/LinkButton";
import List from "../../core/components/pages/List";
import Main from "../../core/components/layouts/Main";
import ls from "../../utils/storage/ls";

const ComposerButton = styled(LinkButton)`
  @media (max-width: 488px) {
    display: none;
  }
`;

const Submissions = () => {
  const { status } = useSelector(state => state.user);
  const list = useSelector(state => state.list);
  const dispatch = useDispatch();

  if (
    !process.browser ||
    list.status === "initializing" ||
    status === "fetching" ||
    status === "pending"
  ) {
    list.status !== "loading" && dispatch(initListPage());
    return <ClientLoader />;
  }

  return status !== "ok" && status !== "pending" ? (
    <Error statusCode={403} />
  ) : (
    <Main title="Submissions">
      <ArticleWrapper style={{ height: "9.75em" }}>
        <HeaderLarge pageTitle="Your Submissions" />
        <ComposerButton to="/write/draft">
          {ls.getItem("composer-content-text")
            ? "Edit Article Draft"
            : "Write/Submit Your Article"}
        </ComposerButton>
      </ArticleWrapper>
      <List private={true} />
    </Main>
  );
};

// client connects to store directly
export default withRedux(Submissions);

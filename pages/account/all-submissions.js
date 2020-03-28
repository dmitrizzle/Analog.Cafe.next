import { useSelector } from "react-redux";
import React from "react";

import { withRedux } from "../../utils/with-redux";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import Error from "../_error";
import List from "../../core/components/pages/List";
import Main from "../../core/components/layouts/Main";

const Submissions = () => {
  const { status } = useSelector(state => state.user);
  const list = useSelector(state => state.list);

  if (
    !process.browser ||
    list.status === "initializing" ||
    status === "fetching"
  )
    return <ClientLoader />;

  return status !== "ok" && status !== "pending" ? (
    <Error statusCode={403} />
  ) : (
    <Main title="Submissions">
      <List private={true} />
    </Main>
  );
};

// client connects to store directly
export default withRedux(Submissions);

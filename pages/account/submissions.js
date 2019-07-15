import { connect } from "react-redux";
import React, { useEffect, useState } from "react";

import { fetchListPage } from "../../core/store/actions-list";
import { getListMeta } from "../../core/components/pages/List/utils";
import Error from "../_error";
import List from "../../core/components/pages/List";
import Main from "../../core/components/layouts/Main";

const Submissions = props => {
  const { status } = props.user;
  const { url } = props.list.requested || { url: undefined };

  // limit renders to once per mount
  const [load, pingload] = useState(0);
  useEffect(() => {
    if (status === "ok") {
      props.fetchListPage(getListMeta("/account/submissions").request, true);
    }
  }, [load]);

  return status !== "ok" ? (
    <Error statusCode={403} />
  ) : (
    <Main>
      <List list={props.list} private={true} />
    </Main>
  );
};

// client connects to store directly
const mapDispatchToProps = dispatch => {
  return {
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
)(Submissions);

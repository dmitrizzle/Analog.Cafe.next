import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import { fetchListPage } from "../../core/store/actions-list";
import { getListMeta } from "../../core/components/pages/List/utils";
import { getUserInfo } from "../../user/store/actions-user";
import { withRedux } from "../../utils/with-redux";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import Error from "../_error";
import List from "../../core/components/pages/List";
import user from "../../core/components/icons/User";

const Submissions = props => {
  const { status } = useSelector(state => state.user);
  const { author } = useSelector(state => state.list);
  const dispatch = useDispatch();

  if (!process.browser || !author) return <ClientLoader />;

  useEffect(() => {
    dispatch(getUserInfo());
    !author &&
      dispatch(
        fetchListPage(getListMeta("/account/all-submissions").request, true)
      );
  }, [status, author]);

  return status !== "ok" && status !== "pending" ? (
    <Error statusCode={403} />
  ) : (
    <List private={true} />
  );
};

// client connects to store directly
export default withRedux(Submissions);

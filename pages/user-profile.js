import React from "react";

import { fetchListPage } from "../core/store/actions-list";
import { getListMeta } from "../core/components/pages/List/utils";
import { masks } from "../constants/server-urls";
import List from "../core/components/pages/List";
import Main from "../core/components/layouts/Main";

const UserProfile = props => (
  <Main>
    <List list={props.list} />
  </Main>
);

UserProfile.getInitialProps = async ({ reduxStore, query }) => {
  await reduxStore.dispatch(
    fetchListPage(getListMeta("/u/" + query.id, 1).request)
  );

  console.log(reduxStore.getState().list.author);

  return { list: reduxStore.getState().list };
};

export default UserProfile;

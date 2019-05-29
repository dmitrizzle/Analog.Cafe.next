import React from "react";

import { fetchListPage } from "../core/store/actions-list";
import { getListMeta } from "../core/components/pages/List/utils";
import List from "../core/components/pages/List";
import Main from "../core/components/layouts/Main";

const Index = props => (
  <Main showBrandName>
    <List list={props.list} />
  </Main>
);

Index.getInitialProps = async ({ reduxStore, pathname }) => {
  await reduxStore.dispatch(fetchListPage(getListMeta(pathname, 1).request));
  return { list: reduxStore.getState().list };
};

export default Index;

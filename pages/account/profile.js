import { connect } from "react-redux";
import React, { useEffect, useState } from "react";

import { getUserInfo } from "../../user/store/actions-user";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import Error from "../_error";
import Main from "../../core/components/layouts/Main";

const Profile = props => {
  if (!process.browser) return <ClientLoader />;

  // limit renders to once per mount
  const [load, pingload] = useState(0);
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      props.getUserInfo(localStorage.getItem("token"));
    }
  }, [load]);

  return (
    <Main>
      {props.user.status !== "ok" ? <Error statusCode={403} /> : <div>hi</div>}
    </Main>
  );
};

// client connects to store directly
const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: token => {
      dispatch(getUserInfo(token));
    },
  };
};
export default connect(
  ({ user }) => {
    return { user };
  },
  mapDispatchToProps
)(Profile);

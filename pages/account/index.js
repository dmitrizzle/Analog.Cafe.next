import { connect } from "react-redux";
import React, { useEffect } from "react";

import { getUserInfo } from "../../user/store/actions-user";
import Dashboard from "../../user/components/pages/Account/Dashboard";
import SignIn from "../../user/components/pages/Account/SignIn";

const Account = props => {
  useEffect(() => {
    props.getUserInfo();
  }, [props.user.status]);

  return props.user.status !== "ok" ? <SignIn /> : <Dashboard />;
};

const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: () => {
      dispatch(getUserInfo());
    },
  };
};

export default connect(
  ({ user }) => {
    return { user };
  },
  mapDispatchToProps
)(Account);

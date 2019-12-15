import { connect } from "react-redux";
import React from "react";

import { getSessionInfo } from "../../../../store/actions-user";
import Link from "../../../../../core/components/controls/Link";

const Help = props => {
  const { sessionInfo } = props;
  return (
    <span>
      {sessionInfo && sessionInfo.loginMethod && (
        <>
          <strong>Hint:</strong> last time you used {sessionInfo.loginEmail}{" "}
          {sessionInfo.loginMethod} to sign in.
          <br />
          <br />
        </>
      )}
      Your account is created automatically whenever you click either Twitter or
      Facebook buttons – or complete the email form.
      <br />
      <br />
      You don’t need to remember or type any passwords.
      <br />
      <br />
      If you already have an account, simply use the same method to sign in as
      you did before – we’ll take you to where you left off.
      <br />
      <br />
      All accounts are secure and adhere to our strict{" "}
      <Link to="/privacy-policy">privacy policy</Link>.
    </span>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getSessionInfo: () => {
      dispatch(getSessionInfo());
    },
  };
};
export default connect(({ user }) => user, mapDispatchToProps)(Help);

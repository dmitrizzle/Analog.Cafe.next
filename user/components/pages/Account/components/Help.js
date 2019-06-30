import { connect } from "react-redux";
import React from "react";

import Link from "../../../../../core/components/controls/Link";

const Help = props => (
  <span>
    {props.sessionInfo.hasLoggedIn && props.sessionInfo.loginMethodHint && (
      <>
        <strong>Hint:</strong> last time you used {props.sessionInfo.loginEmail}{" "}
        {props.sessionInfo.loginMethod}.
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
    If you already have an account, simply use the same method to sign in as you
    did before – we’ll take you to where you left off.
    <br />
    <br />
    All accounts are secure and adhere to our strict{" "}
    <Link to="/privacy-policy">privacy policy</Link>.
  </span>
);

export default connect(
  ({ user }) => user,
  null
)(Help);

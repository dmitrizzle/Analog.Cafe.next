import React from "react";

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
      <strong>
        If you already have an account, simply use the same method to sign in as
        you did before – we’ll take you to where you left off.
      </strong>
      <br />
      <br />
      All accounts are secure and adhere to our strict{" "}
      <Link to="/privacy-policy">privacy policy</Link>.
    </span>
  );
};

export default Help;

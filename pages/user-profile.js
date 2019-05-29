import React from "react";
import { withRouter } from "next/router";

import Link from "../core/components/controls/Link";
import Main from "../core/components/layouts/Main";

const About = props => (
  <Main>
    <p>
      About <Link href="/">{props.router.query.id}</Link>
    </p>
    <p>
      <Link to="https://google.com">Google</Link>
    </p>
  </Main>
);
export default withRouter(About);

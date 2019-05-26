import React from "react";

import Link from "../components/core/controls/Link";
import Main from "../components/core/layouts/Main";

const About = () => (
  <Main>
    <p>
      About <Link href="/">Home</Link>
    </p>
    <p>
      <Link to="https://google.com">Google</Link>
    </p>
  </Main>
);
export default About;

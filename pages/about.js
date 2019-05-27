import React from "react";

import Link from "../core/components/controls/Link";
import Main from "../core/components/layouts/Main";

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

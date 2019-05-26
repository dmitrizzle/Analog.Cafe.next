import Link from "next/link";
import React from "react";

import Main from "../components/core/layouts/Main";

const About = () => (
  <Main>
    <p>
      About{" "}
      <Link href="/">
        <a>Home</a>
      </Link>
    </p>
  </Main>
);
export default About;

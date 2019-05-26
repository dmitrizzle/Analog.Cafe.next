import Link from "next/link";
import React from "react";

import Main from "../components/core/layouts/Main";

const Index = () => (
  <Main>
    <p>
      Analog.Cafe{" "}
      <Link href="/about">
        <button>About</button>
      </Link>
    </p>
  </Main>
);
export default Index;

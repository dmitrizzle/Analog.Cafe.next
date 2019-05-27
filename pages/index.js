import Link from "next/link";
import React from "react";

import Main from "../core/components/layouts/Main";

const Index = () => (
  <Main showBrandName>
    <p>
      Analog.Cafe{" "}
      <Link href="/about">
        <button>About</button>
      </Link>
    </p>
  </Main>
);
export default Index;

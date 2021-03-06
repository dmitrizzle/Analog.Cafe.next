import React from "react";

import { c_blue, c_red } from "../../../constants/styles/themes";
import Link from "../../../core/components/controls/Link";

const AboutThisApp = () => (
  <>
    <h3>What is this?</h3>
    <p>
      <strong>Film Prices</strong> is a searchable database of popular 35mm film
      stocks with average price listings in multiple currencies. Use this web
      app to save money and discover new film to shoot that’s right for your
      budget.
    </p>{" "}
    <p>
      This app has helped many people, including myself, understand what a
      “fair”/market/average price of a film is and what kind of result to expect
      from it. Particularly useful when you’re looking to buy something that you
      don’t shoot every day.
    </p>
    <h3>How does it work?</h3>
    <p>
      First, select your preferred currency (
      <Link to="#search-film">above</Link>). You can then scroll through the
      entire list (<Link to="#cinestill--800t">below</Link>) or search for a
      particular brand or name (<Link to="#search-film">above</Link>).
    </p>
    <p>
      Each entry will show film name, its historical price graph,{" "}
      <strong>
        <span style={{ color: c_red }}>current market average price</span>
      </strong>
      , and{" "}
      <strong>
        <span style={{ color: c_blue }}>
          amount change since the last time checked
        </span>
      </strong>
      , along with other useful insights. You can use this information to
      understand whether the shop you’re at is giving a steal of a deal or is
      charging a bit extra.
    </p>
    <p>
      And if you’ve never tried a particular film or would like to see a few
      more sample scans and a mini-review,{" "}
      <strong>
        click the title to reveal the corresponding film review and sample
        scans.
      </strong>
    </p>
    <p>
      Finally, don’t forget to subscribe for the (roughly) semiannual
      hand-crafted email report on the evolving film photography market:
    </p>
  </>
);
export default AboutThisApp;

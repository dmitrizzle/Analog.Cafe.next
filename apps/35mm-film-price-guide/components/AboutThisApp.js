import React from "react";

import Email from "../../../core/components/vignettes/Email";
import Link from "../../../core/components/controls/Link";

export default () => (
  <>
    <h3>What is this?</h3>
    <p>
      <strong>35mm DB</strong> is a searcheable database of popular 35mm film
      stocks with samples, prices ($, €, £, ¥, ฿), and mini-reviews. Use this
      web app to save money and get better results from your 35mm film
      photography.
    </p>
    <h3>How does it work?</h3>
    <p>
      I’ve been maintaining this database of popular 35mm film prices, samples,
      and mini-reviews since 2018. This web app makes it searcheable and easy to
      read. It has helped many people, including myself, to understand what a
      “fair” price of a film is and what kind of result to expect from it.
    </p>
    <p>
      35mm DB was designed to work as a fast <em>price guide</em> reference to
      make sneaky pricechecks while shopping at physical stores. It works just
      as well while shopping online.{" "}
      <strong>
        To get started, simply type the film stock name you’re looking for
        above, or scroll down to see the full list.
      </strong>
    </p>
    <p>
      To view film samples, read mini-reviews, and see additional stats click on
      the film name or the grey <strong>info▾</strong> link next to it.
    </p>
    <p>
      Film prices change often. Sometimes new stocks appear and old ones get
      discontinued. If you’d like to get the gist of all the changes as I update
      this app (currently about twice a year) — make sure to{" "}
      <strong>
        <Link to="/account/subscriptions?add=price_updates_35#price_updates_35">
          subscribe to the email newsletter
        </Link>
      </strong>
      .
    </p>
  </>
);

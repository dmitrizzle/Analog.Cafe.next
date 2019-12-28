import React from "react";

import Email from "../../../core/components/vignettes/Email";
import Link from "../../../core/components/controls/Link";

export default () => (
  <>
    <h3>About this app.</h3>
    <p>
      <strong>How much does 35mm film cost? How does it perform?</strong>{" "}
      Shopping for new film can be challenging. Especially if it’s something
      novel and you are looking to get a good deal. Sticker prices for the fresh
      stock can range anywhere between two and a hundred dollars per roll. And
      there’re plenty of choices to get lost in.
    </p>
    <p>
      There is no simple logic to this either. Amazon <em>Canada</em>, for
      example, sells lots of film but the deals there are much worse than the
      market average, last time I checked.
    </p>
    <p>
      <strong>
        This interactive guide will give you a solid idea on what a roll of film
        should cost and what it can do for you.
      </strong>{" "}
      To get a quick answer, search for your film brand and make, above, or
      scroll down to see the complete list.
    </p>
    <p>
      <strong>
        All film listings include an overview, most with sample images
      </strong>{" "}
      – just click the title to expand the details. The prices are sourced and
      averaged from multiple online retailers in US, Canada, and Europe. In
      blue, you’ll notice a value the film price has gone up/down by, in your
      currency, since an earlier survey.
    </p>
    <p>
      Many of the sample images are uploaded by Analog.Cafe’s{" "}
      <Link to="/about">community</Link> authors – you can see their credentials
      when you click/tap an image.
    </p>
    <p>
      <strong>
        ☞ <em>Help me make this guide better:</em>
      </strong>{" "}
      <em>
        Should you find any inaccuracies, have something to add, or have a
        question about this app, please <Email />.
      </em>
    </p>
  </>
);

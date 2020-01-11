import React from "react";

import Email from "../../../core/components/vignettes/Email";

export default () => (
  <>
    <h3>About this guide.</h3>
    <p>
      Shopping for new film can be challenging. Especially if it’s something
      novel and you are looking to get a good deal. Sticker prices for the fresh
      stock may range anywhere between one and one hundred dollars per roll. And
      there’re plenty of choices to get lost in.
    </p>

    <p>
      This interactive guide will give you a solid idea of what a roll of 35mm
      film should cost and how the results may look. A blue label indicates the
      amount by which the price has gone up or down in the selected currency.{" "}
      <strong>
        Click the film names to get a descriptive summary, shopping options, and
        sample images.
      </strong>
    </p>
    <p>
      <em>
        Should you find any inaccuracies, have something to add, or have a
        question about this app, please <Email />.
      </em>
    </p>
  </>
);

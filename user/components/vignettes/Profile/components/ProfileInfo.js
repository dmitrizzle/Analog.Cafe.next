import React from "react";

import { CardIntegratedForColumns } from "../../../../../core/components/controls/Card/components/CardColumns";
import CardButton from "../../../../../core/components/controls/Card/components/CardButton";
import CardCaption from "../../../../../core/components/controls/Card/components/CardCaption";

export default props => (
  <CardIntegratedForColumns>
    {props.list.author.text && (
      <figcaption>
        <CardCaption>{props.list.author.text}</CardCaption>
      </figcaption>
    )}
    {props.doesAuthorHaveLink && (
      <CardButton
        to={props.list.author.buttons[1].to}
        branded
        onClick={event => {
          //   GA.event({
          //     category: "Campaign",
          //     action: "Profile.author_cta"
          //   })
          event.target.blur();
        }}
      >
        {props.list.author.buttons[1].text}
      </CardButton>
    )}
  </CardIntegratedForColumns>
);

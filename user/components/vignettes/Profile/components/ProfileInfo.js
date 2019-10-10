import React from "react";

import { CardIntegratedForColumns } from "../../../../../core/components/controls/Card/components/CardColumns";
import CardButton from "../../../../../core/components/controls/Card/components/CardButton";
import CardCaption from "../../../../../core/components/controls/Card/components/CardCaption";
import Coffee from "../../../../../core/components/icons/Coffee";

export default props => {
  const { author } = props.list;
  const buttonText =
    author.buttons && author.buttons[1] ? author.buttons[1].text : "";
  const isCoffee = buttonText.includes("Coffee");
  const isForbidden = isCoffee && author.role && author.role === "member";

  return (
    <CardIntegratedForColumns>
      {author.text && (
        <figcaption>
          <CardCaption>{author.text}</CardCaption>
        </figcaption>
      )}
      {!isForbidden && props.doesAuthorHaveLink && (
        <CardButton
          to={author.buttons[1].to}
          branded
          onClick={event => {
            //   GA.event({
            //     category: "Campaign",
            //     action: "Profile.author_cta"
            //   })
            event.target.blur();
          }}
        >
          {buttonText}
          {isCoffee ? (
            <Coffee
              style={{
                display: "inline-block",
                margin: "-.5em 0 0 .33em",
                height: "1em",
              }}
            />
          ) : (
            ""
          )}
        </CardButton>
      )}
    </CardIntegratedForColumns>
  );
};

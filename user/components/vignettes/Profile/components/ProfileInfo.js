import React from "react";

import { CardIntegratedForColumns } from "../../../../../core/components/controls/Card/components/CardColumns";
import { CoffeeInline } from "../../../../../core/components/icons/Coffee";
import { eventGA } from "../../../../../utils/data/ga";
import CardButton from "../../../../../core/components/controls/Card/components/CardButton";
import CardCaption from "../../../../../core/components/controls/Card/components/CardCaption";

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
            eventGA({
              category: "Campaign",
              action: isCoffee
                ? "Profile.author_cta_coffee"
                : "Profile.author_cta",
            });
            event.target.blur();
          }}
        >
          {buttonText}
          {isCoffee ? <CoffeeInline /> : ""}
        </CardButton>
      )}
    </CardIntegratedForColumns>
  );
};

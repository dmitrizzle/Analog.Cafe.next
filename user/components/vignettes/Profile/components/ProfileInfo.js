import React from "react";
import styled from "styled-components";

import { CardIntegratedForColumns } from "../../../../../core/components/controls/Card/components/CardColumns";
import { CoffeeInline } from "../../../../../core/components/icons/Coffee";
import ga from "../../../../../utils/data/ga";
import CardButton, {
  styles,
} from "../../../../../core/components/controls/Card/components/CardButton";
import CardCaption from "../../../../../core/components/controls/Card/components/CardCaption";
import Email from "../../../../../core/components/vignettes/Email";

export default props => {
  const author = props.list && props.list.author ? props.list.author : null;
  if (!author) return null;

  const buttonText =
    author.buttons && author.buttons[1] ? author.buttons[1].text : "";
  const buttonLink =
    author.buttons && author.buttons[1] && author.buttons[1].to;
  const isCoffee = buttonText.includes("Coffee");
  const isForbidden = isCoffee && author.role && author.role === "member";

  const Wrapper = styled.div`
    button {
      ${styles}
      font-size: 1em;
    }
  `;

  return (
    <CardIntegratedForColumns>
      <figcaption>
        <CardCaption>
          {author.text
            ? author.text
            : `${author.title} hasn’t shared their story yet.`}
        </CardCaption>
      </figcaption>

      {!isForbidden &&
        props.doesAuthorHaveLink &&
        (buttonLink.includes("mailto:") ? (
          <Wrapper>
            <Email to={buttonLink} element="Button" branded>
              {buttonText}
            </Email>
          </Wrapper>
        ) : (
          <CardButton
            to={buttonLink}
            branded
            onClick={event => {
              ga("event", {
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
        ))}
    </CardIntegratedForColumns>
  );
};

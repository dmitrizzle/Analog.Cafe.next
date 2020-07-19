import React from "react";
import styled from "styled-components";

import { CardIntegratedForColumns } from "../../../../../core/components/controls/Card/components/CardColumns";
import { HeartInline } from "../../../../../core/components/icons/Heart";
import CardButton, {
  styles,
} from "../../../../../core/components/controls/Card/components/CardButton";
import CardCaption from "../../../../../core/components/controls/Card/components/CardCaption";
import Email from "../../../../../core/components/vignettes/Email";
import ga from "../../../../../utils/data/ga";

const Wrapper = styled.div`
  button {
    ${styles}
    font-size: 1em;
  }
`;
export default props => {
  const author = props.list && props.list.author ? props.list.author : null;
  if (!author) return null;

  const buttonText =
    author.buttons && author.buttons[1] ? author.buttons[1].text : "";
  const buttonLink =
    author.buttons && author.buttons[1] && author.buttons[1].to;
  const isCoffee = buttonText.includes("Coffee");
  const isForbidden = isCoffee && author.role && author.role === "member";

  return (
    <CardIntegratedForColumns withOutline>
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
                category: "out",
                action: isCoffee ? "profile.coffee" : "profile.cta",
              });
              event.target.blur();
            }}
          >
            {buttonText}
            {isCoffee && (
              <>
                {" "}
                <small>
                  <HeartInline />
                </small>
              </>
            )}
          </CardButton>
        ))}
    </CardIntegratedForColumns>
  );
};

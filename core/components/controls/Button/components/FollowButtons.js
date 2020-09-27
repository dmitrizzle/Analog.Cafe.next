import React from "react";
import styled, { css } from "styled-components";

import Feedly from "../../../icons/Feedly";
import Instagram from "../../../icons/Instagram";
import LinkButton from "./LinkButton";
import Twitter from "../../../icons/Twitter";
import ga from "../../../../../utils/data/ga";

export const FollowButtonsWrapper = styled.div`
  text-align: center;
  background: ${({ theme }) => theme.bg};
  padding: 0.5em 0 0;

  box-shadow: 0 0 0 1px ${({ theme }) => theme.grey_med};

  svg {
    height: 2em;
  }
`;
export const FollowButton = css`
  padding: 0;
  box-shadow: none;
  margin: 0;
  display: inline-block;
  background: transparent;
  width: 3em;
  height: 2em;
  &:active,
  &:focus {
    background: transparent !important;
  }
  svg path {
    fill: #999 !important;
    stroke: transparent;
  }
`;
const FeedlyButton = styled(LinkButton)`
  ${FollowButton};
`;
const TwitterButton = styled(LinkButton)`
  ${FollowButton} svg {
    height: 2.65em;
    margin-top: -0.3em;
  }
`;
const InstagramButton = styled(LinkButton)`
  ${FollowButton} svg {
    height: 1.4em;
    margin: -0.4em 0 0 0.2em;
  }
`;

const FollowButtons = () => {
  return (
    <FollowButtonsWrapper>
      <FeedlyButton
        to="http://bit.ly/FeedAnalog"
        onClick={() => {
          ga("event", {
            category: "out",
            action: "menu.feedly",
          });
        }}
      >
        <Feedly />
      </FeedlyButton>
      <TwitterButton
        to="https://twitter.com/analog_cafe"
        onClick={() => {
          ga("event", {
            category: "out",
            action: "menu.twitter",
          });
        }}
      >
        <Twitter />
      </TwitterButton>
      <InstagramButton
        to="https://instagram.com/analog_cafe"
        onClick={() => {
          ga("event", {
            category: "out",
            action: "menu.instagram",
          });
        }}
      >
        <Instagram />
      </InstagramButton>
    </FollowButtonsWrapper>
  );
};

export default FollowButtons;

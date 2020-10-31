import styled, { css } from "styled-components";

import {
  b_mobile,
  m_radius_sm,
} from "../../../../../constants/styles/measurements";
import { c_charcoal } from "../../../../../constants/styles/themes";
import {
  fadeIn,
  notificationDismiss,
  notificationShow,
} from "../../../../../constants/styles/animation";
import { title } from "../../../../../constants/styles/typography";

export const NotificationsWrapper = styled.aside`
  display: block;
  position: fixed;
  z-index: 31;
  width: 100%;
  top: 0;
  left: 0;
  padding: ${({ isMini }) => (isMini ? 0 : 0.25)}em 0 0;
  cursor: pointer;
  transform: scale(0, 0) translateZ(0);
  animation: ${({ messageDismissed, targetMatch, prevTargetMatch }) => {
      if (messageDismissed === false && targetMatch === true)
        return notificationShow;
      if (messageDismissed === true) return notificationDismiss;
      if (
        targetMatch === false &&
        messageDismissed === false &&
        prevTargetMatch === true
      )
        return notificationDismiss;
      return "none";
    }}
    500ms ease forwards;

  > div {
    display: flex;
    align-items: center;

    margin: 0 auto;

    background: ${({ theme }) => theme.brand};
    border-radius: ${m_radius_sm};

    ${({ isMini }) => {
      if (isMini)
        return css`
          height: 1.33em;
          border-radius: 0;
          max-width: 100%;
          box-shadow: 0 0 0 0 ${c_charcoal};
          justify-content: center;
        `;
      return css`
        height: 2.775em;
        border-radius: ${m_radius_sm};
        max-width: ${b_mobile};
        box-shadow: 0 0 0 1px ${c_charcoal};
        justify-content: start;
      `;
    }}
    transition: all 250ms;

    > div {
      opacity: 0;
      animation: ${fadeIn} 500ms 500ms ease forwards;
      transition: all 250ms;

      color: ${({ theme }) => theme.bg};

      font-size: 0.8em;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      margin: 0 0.5em;
      ${({ isMini }) => {
        if (isMini)
          return css`
            margin: 0 0;
            padding: 0 0.5em;
          `;
      }}

      line-height: 1.25em;
      > span {
        ${title};
      }
    }
    > figure {
      ${({ isMini }) => {
        if (isMini)
          return css`
            width: 0;
            height: 0;
            margin: 0;
          `;
        return css`
          width: 2em;
          height: 2em;
          margin: 0em 0 0 0.35em;
        `;
      }}
      transition: all 150ms;

      overflow: hidden;
      border-radius: ${m_radius_sm};

      img {
        width: 100%;
      }
    }
  }
`;

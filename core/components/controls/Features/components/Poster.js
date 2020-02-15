import styled, { css } from "styled-components";

import {
  c_black,
  c_grey_med,
  c_red,
  c_white,
} from "../../../../../constants/styles/colors";
import { fadeIn } from "../../../../../constants/styles/animation";
import { title } from "../../../../../constants/styles/typography";
import Link from "../../Link";

const activeCss = css`
  h4 {
    background: none;
    span span {
      background: #2c2c2c;
    }
  }
`;
export default styled(Link)`
  animation: ${fadeIn} 250ms forwards;

  position: relative;
  display: flex;
  align-items: stretch;
  text-decoration: none;

  transition: height 250ms;

  width: 7em;
  height: 7em;
  border-radius: 7em;

  background: ${c_black};
  margin-left: 1em;
  flex-shrink: 0;

  transform: translateZ(0);

  background-size: cover !important;
  background-position: center !important;

  ${props =>
    props.collection &&
    css`
      box-shadow: 0 0 0 1px ${c_white}, 0 0 0 7px ${c_grey_med};
      text-transform: uppercase;
      ::after {
        content: "";
        display: block;
        width: 0;
        height: 0;
        border-left: 0.75em solid transparent;
        border-right: 0.75em solid transparent;
        border-top: 0.75em solid ${c_grey_med};
        position: absolute;
        bottom: -0.85em;
        left: calc(50% - 0.75em);
      }
    `}

  &:first-child {
    margin-left: 1.5em;
  }

  h4 {
    ${title}
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 7em;
    overflow: hidden;

    text-align: center;
    bottom: 0;
    right: 0;
    color: ${c_white};
    line-height: 1em !important;
    overflow: hidden;
    background: rgba(44, 44, 44, 0.8);
    > span {
      padding: 0.5em 0.4em 0.5em 0.6em;
      white-space: break-spaces;
      display: block;
      width: calc(100% - 1em);
      text-align: center;
      font-size: 0.8em;
      ${props => !props.collection && `font-size: .8em;`}
    }
  }
  ${props =>
    props.active &&
    `
    ::after {
      border-top: 0.75em solid ${c_red};
    }
    box-shadow: 0 0 0 1px ${c_white}, 0 0 0 7px ${c_red};
    ${activeCss};
    `}
  :active, :focus, .touch &:hover ${props => !props.collection && `, :hover`} {
    ${activeCss};
  }
`;
export const Spacer = styled.div`
  height: 16em;
  width: 1.5em;
  flex-shrink: 0;
`;

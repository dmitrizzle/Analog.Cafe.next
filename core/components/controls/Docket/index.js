import styled from "styled-components";

import { m_radius } from "../../../../constants/styles/measurements";
import { title } from "../../../../constants/styles/typography";
import Link from "../Link";

export default styled(Link)`
  height: 12em;
  width: 26em;

  margin: 0 ${1 * 0.5}em 0 0;
  position: relative;
  flex-shrink: 0;
  overflow: hidden;

  text-decoration: none;
  line-height: ${1 * 1.15}em;

  box-shadow: 0 0 0 1px ${({ theme }) => theme.grey_med};
  :active,
  :focus,
  .touch &:hover {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.fg};
  }

  border-radius: ${m_radius};
`;
export const LabelWrap = styled.div`
  text-align: right;
  position: absolute;
  bottom: ${props => (props.list ? 1.35 : 0.5)}em;
  right: 0.5em;
`;

export const DocketInfo = styled.div`
  position: absolute;
  top: 0;
  right: 0.5em;
  left: calc(8em + 1em);
  bottom: 0;

  h4 {
    font-size: 1em !important;
    padding-top: 1em;
    margin-bottom: 0.25em;
    ${title}
  }
`;

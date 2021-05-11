import styled from "styled-components";

import { paragraph } from "../../../../../constants/styles/typography";
import LinkButton from "../../Button/components/LinkButton";

const CardSearchItem = styled(LinkButton)`
  padding: 0 0 2em;
  ${paragraph};
  :active,
  :focus,
  .touch &:not(.card-button):hover {
    background: ${({ theme }) => theme.highlight} !important;
    color: ${({ theme }) => theme.fg} !important;
  }
`;

export default CardSearchItem;

import styled from "styled-components";

import Modal from "../../Modal";

export const NotificationsOptions = styled(Modal)`
  text-decoration: none;
  position: absolute;
  display: block;
  top: 0.66em;
  right: -1.75em;
  height: 0.5em;
  line-height: 0.5em;
  padding: 0.25em 0.5em 0.75em;
  width: 1em;
  text-align: center;

  &,
  &:active {
    color: ${({ theme }) => theme.heading};
    background: 0 0;
  }
`;

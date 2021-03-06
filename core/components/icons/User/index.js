import styled, { css } from "styled-components";

import { makeFroth } from "../../../../utils/froth";

export default styled.div`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 1em;
  background: ${({ theme }) => theme.brand};
  background-size: cover;
  margin: 0 0 0 0.15em;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.bg},
    0 0 0 2px ${({ theme }) => theme.brand};

  ${({ user }) =>
    user.status === "ok" &&
    user.info &&
    user.info.image &&
    css`
      background-image: url(${makeFroth({
        src: user.info.image,
        size: "i",
      }).src});
    `}
`;

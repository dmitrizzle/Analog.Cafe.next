import { css } from "styled-components";

import { m_radius_sm } from "../../../../constants/styles/measurements";
import { title } from "../../../../constants/styles/typography";

export const blockSmall = css`
  display: flex;
  width: 2.225em;
  height: 2.225em;
  margin: ${1 / 4}em;
  overflow: hidden;
  border-radius: ${m_radius_sm};

  ${title};
  color: ${({ theme }) => theme.bg};
  text-decoration: none;
  justify-content: center;
  align-items: center;

  background-size: cover !important;
  background-color: ${({ theme }) => theme.brand};
`;

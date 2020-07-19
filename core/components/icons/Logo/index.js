import React from "react";
import styled from "styled-components";

import { m_radius } from "../../../../constants/styles/measurements";

const size = "3em";
const padding = "0.5em";
const Logo = styled.div`
  width: ${size};
  height: ${size};
  overflow: hidden;
  margin: 0 auto;
  padding: ${padding};
  border-radius: ${m_radius};
  transform: rotate(45deg);
  svg {
    transform: rotate(-45deg);
    height: 100%;
    width: 100%;
    path {
      fill: ${({ theme }) => theme.bg};
    }
  }
`;
export const LogoSvg = ({ style }) => (
  <svg style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 475 200">
    <path d="M475 200h-35c-25 0-60-20-60-60V65c0-25-20-45-45-45h-70c-25 0-45 20-45 45v135h-20V60c0-40 37-60 60-60h80c40 0 60 35 60 60v75c0 25 20 45 45 45h30v20zM0 0v140c0 40 35 60 60 60h120v-20H65c-25 0-45-20-45-45V0H0zm230 180h140v20H230v-20z" />
  </svg>
);
export default props => {
  return (
    <Logo {...props}>
      <LogoSvg />
    </Logo>
  );
};

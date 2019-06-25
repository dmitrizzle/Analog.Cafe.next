import React from "react";
import Textarea from "react-textarea-autosize";
import styled, { css } from "styled-components";

import { c_grey_dark } from "../../../../../constants/styles/colors";
import { headerSubtitleStyles } from "../../../../../core/components/vignettes/HeaderLarge/components/HeaderSubtitle";
import { headerTitleStyles } from "../../../../../core/components/vignettes/HeaderLarge/components/HeaderTitle";
import { paragraph } from "../../../../../constants/styles/typography";
import { reset } from "../../../forms/SubtitleInput";
import HeaderWrapper from "../../../../../core/components/vignettes/HeaderLarge/components/HeaderWrapper";
import Link from "../../../../../core/components/controls/Link";

const headerInputStyles = css`
  ${reset};
  text-align: center;
  overflow: hidden;
`;
const HeaderTitleInput = styled(Textarea)`
  ${headerTitleStyles};
  ${headerInputStyles}
`;
const HeaderSubtitleInput = styled(Textarea)`
  ${headerSubtitleStyles};
  ${headerInputStyles}
`;
const BylineInput = styled.input`
  ${headerInputStyles};
  ${paragraph};
  font-size: 0.8em;
  font-style: italic;
  color: ${c_grey_dark};
  text-decoration: underline;
`;
export default props => (
  <HeaderWrapper>
    <HeaderTitleInput placeholder="Title" />
    <HeaderSubtitleInput placeholder="Subtitle" />
    <BylineInput placeholder="Your Name" />
  </HeaderWrapper>
);

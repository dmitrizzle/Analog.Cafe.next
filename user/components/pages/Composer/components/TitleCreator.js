import React, { useState } from "react";
import Textarea from "react-textarea-autosize";
import styled, { css } from "styled-components";
import toTitleCase from "titlecase";
import keycode from "keycode";

import {
  INPUT_SUBTITLE_LIMIT,
  INPUT_TITLE_LIMIT,
} from "../../../../constants/slate-document-rules";
import { c_grey_dark } from "../../../../../constants/styles/colors";
import { headerSubtitleStyles } from "../../../../../core/components/vignettes/HeaderLarge/components/HeaderSubtitle";
import { headerTitleStyles } from "../../../../../core/components/vignettes/HeaderLarge/components/HeaderTitle";
import { inputAutoFormat } from "../../../../../utils/text-input";
import { paragraph } from "../../../../../constants/styles/typography";
import { reset } from "../../../forms/SubtitleInput";
import HeaderWrapper from "../../../../../core/components/vignettes/HeaderLarge/components/HeaderWrapper";

const headerInputStyles = css`
  ${reset};
  text-align: center;
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
export default props => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const handleEnterKey = event => {
    if (keycode(event.which) === "enter") event.preventDefault();
  };
  return (
    <HeaderWrapper>
      <HeaderTitleInput
        placeholder="Title"
        onChange={event =>
          setTitle(inputAutoFormat(toTitleCase(event.target.value)))
        }
        onKeyPress={handleEnterKey}
        value={title}
        maxLength={INPUT_TITLE_LIMIT}
      />
      <HeaderSubtitleInput
        placeholder="Subtitle"
        onChange={event =>
          setSubtitle(inputAutoFormat(toTitleCase(event.target.value)))
        }
        onKeyPress={handleEnterKey}
        value={subtitle}
        maxLength={INPUT_SUBTITLE_LIMIT}
      />
      <BylineInput placeholder="Your Name" maxLength={INPUT_SUBTITLE_LIMIT} />
    </HeaderWrapper>
  );
};

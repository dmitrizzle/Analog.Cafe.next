import React, { useState, useEffect } from "react";
import Textarea from "react-textarea-autosize";
import keycode from "keycode";
import styled, { css } from "styled-components";
import toTitleCase from "titlecase";

import {
  INPUT_SUBTITLE_LIMIT,
  INPUT_TITLE_LIMIT,
} from "../../../../../constants/composer";
import { c_grey_dark } from "../../../../../constants/styles/colors";
import { headerSubtitleStyles } from "../../../../../core/components/vignettes/HeaderLarge/components/HeaderSubtitle";
import { headerTitleStyles } from "../../../../../core/components/vignettes/HeaderLarge/components/HeaderTitle";
import { inputAutoFormat } from "../../../../../utils/text-input";
import { paragraph } from "../../../../../constants/styles/typography";
import { reset } from "../../../forms/SubtitleInput";
import { saveHeader, loadHeader } from "../../../../../utils/storage";
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
  const headerData = loadHeader();
  const [title, setTitle] = useState(headerData.title || "");
  const [subtitle, setSubtitle] = useState(headerData.subtitle || "");

  const handleEnterKey = event => {
    if (keycode(event.which) === "enter") event.preventDefault();
  };

  const handleTitleTextChange = text => {
    setTitle(text);
    saveHeader({ title, subtitle });
    //     this.props.setComposerHeader(header)
  };
  const handleSubtitleTextChange = text => {
    setSubtitle(text);
    saveHeader({ title, subtitle });
    //     this.props.setComposerHeader(header)
  };

  // ensures that the last letter in typed word is not skipped
  useEffect(() => saveHeader({ title, subtitle }));

  return (
    <HeaderWrapper>
      <HeaderTitleInput
        placeholder="Title"
        onChange={event =>
          handleTitleTextChange(
            inputAutoFormat(toTitleCase(event.target.value))
          )
        }
        onKeyPress={handleEnterKey}
        value={title}
        maxLength={INPUT_TITLE_LIMIT}
        autoFocus
      />
      <HeaderSubtitleInput
        placeholder="Subtitle"
        onChange={event =>
          handleSubtitleTextChange(
            inputAutoFormat(toTitleCase(event.target.value))
          )
        }
        onKeyPress={handleEnterKey}
        value={subtitle}
        maxLength={INPUT_SUBTITLE_LIMIT}
      />
      <BylineInput placeholder="Your Name" maxLength={INPUT_SUBTITLE_LIMIT} />
    </HeaderWrapper>
  );
};

import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import Textarea from "react-textarea-autosize";
import keycode from "keycode";
import styled, { css } from "styled-components";
import toTitleCase from "titlecase";

import { AuthorsPrinted } from "../../../../../core/components/pages/Article/components/AuthorsPrinted";
import {
  INPUT_SUBTITLE_LIMIT,
  INPUT_TITLE_LIMIT,
} from "../../../../../constants/composer";
import { c_grey_dark } from "../../../../../constants/styles/colors";
import {
  getLocalSessionInfo,
  loadHeader,
  saveHeader,
} from "../../../../../utils/storage";
import { headerSubtitleStyles } from "../../../../../core/components/vignettes/HeaderLarge/components/HeaderSubtitle";
import { headerTitleStyles } from "../../../../../core/components/vignettes/HeaderLarge/components/HeaderTitle";
import { inputAutoFormat } from "../../../../../utils/text-input";
import { reset } from "../../../forms/SubtitleInput";
import {
  setComposerHeader,
  setSubmissionId,
} from "../../../../store/actions-composer";
import HeaderWrapper from "../../../../../core/components/vignettes/HeaderLarge/components/HeaderWrapper";
import Link from "../../../../../core/components/controls/Link";

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
// const BylineInput = styled.input`
//   ${headerInputStyles};
//   ${paragraph};
//   font-size: 0.8em;
//   font-style: italic;
//   color: ${c_grey_dark};
//   text-decoration: underline;
// `;

const sessionInfo = getLocalSessionInfo() || {};

const TitleCreator = props => {
  const handleEnterKey = event => {
    if (keycode(event.which) === "enter") event.preventDefault();
  };

  // header text
  const headerData = loadHeader();
  const [title, setTitle] = useState(headerData.title || "");
  const [subtitle, setSubtitle] = useState(headerData.subtitle || "");
  const handleTitleTextChange = text => {
    setTitle(text);
    saveHeader({ title, subtitle });
    props.setComposerHeader({ title, subtitle });
  };
  const handleSubtitleTextChange = text => {
    setSubtitle(text);
    saveHeader({ title, subtitle });
    props.setComposerHeader({ title, subtitle });
  };

  const [userName, setUserName] = useState(
    (props.user.info && props.user.info.title) || ""
  );

  // ensures that the last letter in typed word is not skipped
  useEffect(() => {
    saveHeader({ title, subtitle });
  }, [title, subtitle]);

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
      <em style={{ display: "block", color: c_grey_dark }}>
        <small>
          A draft by{" "}
          {props.user.info && props.user.info.id ? (
            <AuthorsPrinted
              authors={[
                {
                  name: props.user.info && props.user.info.title,
                  id: props.user.info && props.user.info.id,
                  authorship: "article",
                },
              ]}
              shouldLink
            />
          ) : (
            <Link to="/account">anonymous</Link>
          )}
          .
          {props.composer.submissionId && (
            <>
              {" "}
              This will edit your submission ({props.composer.submissionId}).
              You can{" "}
              <Link
                to="#duplicate"
                onClick={event => {
                  event.preventDefault();
                  props.setSubmissionId(undefined);
                }}
              >
                duplicate
              </Link>{" "}
              it instead.
            </>
          )}
        </small>
      </em>
    </HeaderWrapper>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setComposerHeader: header => {
      dispatch(setComposerHeader(header));
    },
    setSubmissionId: id => {
      dispatch(setSubmissionId(id));
    },
  };
};

export default connect(
  ({ user, composer }) => {
    return { user, composer };
  },
  mapDispatchToProps
)(TitleCreator);

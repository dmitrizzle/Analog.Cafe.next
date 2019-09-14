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
import { headerSubtitleStyles } from "../../../../../core/components/vignettes/HeaderLarge/components/HeaderSubtitle";
import { headerTitleStyles } from "../../../../../core/components/vignettes/HeaderLarge/components/HeaderTitle";
import { inputAutoFormat } from "../../../../../utils/text-input";
import {
  loadHeader,
  loadSubmissionId,
  saveHeader,
} from "../../../../../utils/storage";
import { reset } from "../../../forms/SubtitleInput";
import {
  setComposerHeader,
  setComposerSubmissionId,
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

  // determine if there's submission under edit
  const submissionId = loadSubmissionId();

  // ensures that the last letter in typed word is not skipped
  useEffect(() => {
    // upload localstorage with header data
    saveHeader({ title, subtitle });

    // update redux state with submission id
    submissionId !== props.composer.submissionId &&
      props.setComposerSubmissionId(submissionId);
  }, [title, subtitle, submissionId]);

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
          {!props.composer.submissionId ? (
            <>
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
            </>
          ) : (
            <>
              {" "}
              You are editing submission id{" "}
              <strong>{props.composer.submissionId}</strong> by .
              {console.log(props)}
              <Link
                to="#duplicate"
                onClick={event => {
                  event.preventDefault();
                  props.setComposerSubmissionId(undefined);
                }}
              >
                Replicate
              </Link>
              .
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
    setComposerSubmissionId: id => {
      dispatch(setComposerSubmissionId(id));
    },
  };
};

export default connect(
  ({ user, composer }) => {
    return { user, composer };
  },
  mapDispatchToProps
)(TitleCreator);

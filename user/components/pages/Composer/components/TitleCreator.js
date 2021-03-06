import { useDispatch, useSelector } from "react-redux";
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
import {
  addComposerData,
  resetComposerData,
  setComposerHeader,
} from "../../../../store/actions-composer";
import { headerSubtitleStyles } from "../../../../../core/components/vignettes/HeaderLarge/components/HeaderSubtitle";
import { headerTitleStyles } from "../../../../../core/components/vignettes/HeaderLarge/components/HeaderTitle";
import { inputAutoFormat } from "../../../../../utils/text-input";
import {
  loadComposerData,
  loadHeader,
  saveHeader,
} from "../../../../../utils/storage/ls-composer";
import { reset } from "../../../forms/SubtitleInput";
import { withRedux } from "../../../../../utils/with-redux";
import HeaderWrapper from "../../../../../core/components/vignettes/HeaderLarge/components/HeaderWrapper";
import Label from "../../../../../core/components/vignettes/Label";
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
const Unlink = styled(Label)`
  font-style: normal;
  color: ${({ theme }) => theme.fg};
  cursor: pointer;
  position: absolute;
  bottom: 0.15em;
  width: 10.5em;
`;

const TitleCreator = () => {
  const composer = useSelector(state => state.composer);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

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
    dispatch(setComposerHeader({ title, subtitle }));
  };
  const handleSubtitleTextChange = text => {
    setSubtitle(text);
    saveHeader({ title, subtitle });
    dispatch(setComposerHeader({ title, subtitle }));
  };

  // ensures that the last letter in typed word is not skipped
  useEffect(() => {
    // upload localstorage with header data
    saveHeader({ title, subtitle });
    // initial load for compser data
    dispatch(addComposerData(loadComposerData()));
  }, [title, subtitle, composer.data.id]);

  return (
    <HeaderWrapper>
      <HeaderTitleInput
        data-cy="HeaderTitleInput"
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
        data-cy="HeaderSubtitleInput"
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
      <em
        css={css`
          display: block;
          color: ${({ theme }) => theme.grey_dark};
        `}
      >
        <small>
          {!composer.data.id ? (
            <>
              A draft by{" "}
              {user.info?.id ? (
                <AuthorsPrinted
                  authors={[
                    {
                      name: user.info?.title,
                      id: user.info?.id,
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
              You are editing submission #
              <Link to={`/account/submission/${composer.data.slug}`}>
                {composer.data.id}
              </Link>
              , attributed to{" "}
              <Link
                to={
                  user.info?.id === composer.data.submittedBy.id
                    ? "/account/profile#edit"
                    : `/u/${composer.data.submittedBy.id}`
                }
              >
                {composer.data.submittedBy.name}
              </Link>{" "}
              <span style={{ fontStyle: "normal" }}>∙</span>{" "}
              <Link
                style={{ textDecoration: "none", position: "relative" }}
                to="#replicate"
                onClick={event => {
                  event.preventDefault();
                  dispatch(resetComposerData());
                }}
              >
                <Unlink>Unlink and Clear Info</Unlink>
              </Link>
            </>
          )}
        </small>
      </em>
    </HeaderWrapper>
  );
};

export default withRedux(TitleCreator);

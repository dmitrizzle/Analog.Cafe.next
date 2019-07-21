import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import Textarea from "react-textarea-autosize";
import styled from "styled-components";

import { INPUT_SUMMARY_LIMIT } from "../../constants/composer";
import { c_grey_light } from "../../constants/styles/colors";
import { getUserInfo } from "../../user/store/actions-user";
import { paragraph } from "../../constants/styles/typography";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import CardCaption from "../../core/components/controls/Card/components/CardCaption";
import CardFigure from "../../core/components/controls/Card/components/CardFigure";
import CardHeader from "../../core/components/controls/Card/components/CardHeader";
import CardIntegrated from "../../core/components/controls/Card/components/CardIntegrated";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import Error from "../_error";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import LinkButton from "../../core/components/controls/Button/components/LinkButton";
import Main from "../../core/components/layouts/Main";
import SubtitleInput from "../../user/components/forms/SubtitleInput";

const ProfileBioInput = styled(Textarea)`
  ${paragraph}
  font-size: .8em;
  width: calc(100% - 0.9em);
  margin-bottom: -0.75em;
  min-height: 4em;
  background: ${c_grey_light};
  border: none;
  padding: 0.5em !important;
  font-style: italic;
`;

const Profile = props => {
  if (!process.browser) return <ClientLoader />;

  // limit renders to once per mount
  const [load, pingload] = useState(0);
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      props.getUserInfo(localStorage.getItem("token"));
    }
  }, [load]);

  const { info } = props.user;
  const { image, buttons } = info;

  const [title, setTitle] = useState(info.title);
  const [text, setText] = useState(info.text);

  return (
    <Main>
      {props.user.status !== "ok" ? (
        <Error statusCode={403} />
      ) : (
        <ArticleWrapper>
          <HeaderLarge
            pageTitle="Edit Your Profile"
            pageSubtitle="And Settings"
          />

          <ArticleSection>
            <CardIntegrated>
              <CardHeader
                buttons={[0]}
                stubborn
                noStar
                title="Profile Picture:"
              />
              <CardFigure image={image} />
              <LinkButton>Select New Picture</LinkButton>
            </CardIntegrated>

            <CardIntegrated>
              <CardHeader buttons={[0]} stubborn noStar title="Name:" />
              <SubtitleInput
                placeholder={"Your Name"}
                value={title}
                onChange={event => setTitle(event.target.value)}
              />
            </CardIntegrated>

            <CardIntegrated>
              <CardHeader buttons={[0]} stubborn noStar title="Mini Bio:" />
              <ProfileBioInput
                maxLength={INPUT_SUMMARY_LIMIT}
                placeholder="Please introduce yourself in 30 words or less."
                value={text}
                onChange={event => setText(event.target.value)}
              />
            </CardIntegrated>

            <CardIntegrated>
              <CardHeader
                buttons={[0]}
                stubborn
                noStar
                title="Website Link or Email:"
              />
              <SubtitleInput
                placeholder={"www.your.link"}
                value={buttons[1] && buttons[1].to}
              />
            </CardIntegrated>
          </ArticleSection>
        </ArticleWrapper>
      )}
    </Main>
  );
};

// client connects to store directly
const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: token => {
      dispatch(getUserInfo(token));
    },
  };
};
export default connect(
  ({ user }) => {
    return { user };
  },
  mapDispatchToProps
)(Profile);

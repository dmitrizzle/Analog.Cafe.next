import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import Textarea from "react-textarea-autosize";
import styled from "styled-components";

import { API } from "../../constants/router/defaults";
import { CARD_ERRORS } from "../../constants/messages/errors";
import { INPUT_SUMMARY_LIMIT } from "../../constants/composer";
import { c_grey_light } from "../../constants/styles/colors";
import { getUserInfo, setUserInfo } from "../../user/store/actions-user";
import { paragraph } from "../../constants/styles/typography";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import Button from "../../core/components/controls/Button";
import CardFigure from "../../core/components/controls/Card/components/CardFigure";
import CardHeader from "../../core/components/controls/Card/components/CardHeader";
import CardIntegrated from "../../core/components/controls/Card/components/CardIntegrated";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import Error from "../_error";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
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
  const { buttons } = info;

  const [image, setImage] = useState(info.image);
  let fileInput = React.createRef();
  const handleFileUpload = event => {
    const file = event.target.files[0];
    import("@roast-cms/french-press-editor/dist/utils/image").then(
      actionsImage => {
        actionsImage
          .forceImageRestrictions(file.size, file.type, 5)
          .then(() => uploadRequest(file))
          .catch(() => {
            props.setModal(
              {
                status: "ok",
                info: CARD_ERRORS.IMAGE_SIZE(5),
              },
              { url: "errors/upload" }
            );
          });
      }
    );
  };
  const uploadRequest = file => {
    const reader = new FileReader();
    reader.addEventListener("load", () => setImage(reader.result));
    reader.readAsDataURL(file);
  };

  const [title, setTitle] = useState(info.title);
  const [text, setText] = useState(info.text);

  const handleSave = () => {
    const data = new FormData();
    data.append("title", title || info.id.split("-", 1)[0]);
    data.append("text", text || "");
    fileInput.current.value && data.append("image", fileInput.current.files[0]);
    const request = {
      method: "put",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "JWT " + localStorage.getItem("token"),
      },
      data,
      url: API.PROFILE,
    };
    props.setUserInfo(request);
  };

  return (
    <Main>
      {props.user.status !== "ok" && props.user.status !== "updated" ? (
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
              <CardFigure
                image={image}
                onClick={event => {
                  event.preventDefault();
                  fileInput.current.click();
                }}
              />
              <input
                type="file"
                accept="image/x-png,image/jpeg"
                style={{ display: "none" }}
                ref={fileInput}
                onChange={handleFileUpload}
              />
              <Button
                style={{ fontSize: "1em" }}
                onClick={event => {
                  event.preventDefault();
                  fileInput.current.click();
                }}
              >
                Select New Picture
              </Button>
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
            <Button style={{ fontSize: "1em" }} branded onClick={handleSave}>
              Save
            </Button>
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
    setUserInfo: user => {
      dispatch(setUserInfo(user));
    },
  };
};
export default connect(
  ({ user }) => {
    return { user };
  },
  mapDispatchToProps
)(Profile);

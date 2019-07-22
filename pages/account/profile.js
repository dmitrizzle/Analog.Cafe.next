import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import Router from "next/router";

import { API } from "../../constants/router/defaults";
import { CARD_ERRORS } from "../../constants/messages/errors";
import { INPUT_SUMMARY_LIMIT } from "../../constants/composer";
import { getUserInfo, setUserInfo } from "../../user/store/actions-user";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import Button from "../../core/components/controls/Button";
import CardCaption from "../../core/components/controls/Card/components/CardCaption";
import CardFigure from "../../core/components/controls/Card/components/CardFigure";
import CardHeader from "../../core/components/controls/Card/components/CardHeader";
import CardIntegrated from "../../core/components/controls/Card/components/CardIntegrated";
import CardParagraphInput from "../../user/components/forms/CardParagraphInput";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import Error from "../_error";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import Link from "../../core/components/controls/Link";
import Main from "../../core/components/layouts/Main";
import SubtitleInput from "../../user/components/forms/SubtitleInput";
import linkToLabel, { fixLinks } from "../../utils/link-to-label";

const Profile = props => {
  if (!process.browser) return <ClientLoader />;

  const { info } = props.user;

  // image select and upload tool
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

  // controls for title (name) and text (mini bio)
  const [title, setTitle] = useState(info.title);
  const [text, setText] = useState(info.text);

  // controls for link button
  const [button, setButton] = useState(
    info.buttons ? info.buttons[1] : { to: "", text: "" }
  );

  // control for saving profile
  const handleSave = () => {
    const data = new FormData();
    data.append("title", title || info.id.split("-", 1)[0]);
    data.append("text", text || "");
    data.append("buttons", JSON.stringify([info.buttons[0], button]));
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
    Router.push("/account");
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      props.getUserInfo(localStorage.getItem("token"));
    }
  }, [props.user.status]);

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
                Select a New Picture
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
              <CardParagraphInput
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
                title="Website or Email:"
              />
              <SubtitleInput
                placeholder={"www.your.link"}
                value={button.to}
                onChange={event =>
                  setButton({ ...button, to: event.target.value })
                }
                onBlur={event => {
                  setButton({
                    text: linkToLabel(event.target.value),
                    to: fixLinks(event.target.value),
                  });
                }}
              />
              {button.text && (
                <CardCaption>
                  Will appear as “<Link href={button.to}>{button.text}</Link>”.
                </CardCaption>
              )}
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

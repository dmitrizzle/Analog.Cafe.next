import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { API } from "../../constants/router/defaults";
import { CARD_ERRORS } from "../../constants/messages/errors";
import { INPUT_SUMMARY_LIMIT } from "../../constants/composer";
import { b_mobile } from "../../constants/styles/measurements";
import { getFirstNameFromFull } from "../../utils/author-credits";
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
import Coffee from "../../core/components/icons/Coffee";
import Email from "../../core/components/vignettes/Email";
import Error from "../_error";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import Link from "../../core/components/controls/Link";
import Main from "../../core/components/layouts/Main";
import Modal from "../../core/components/controls/Modal";
import Spinner from "../../core/components/icons/Spinner";
import SubtitleInput from "../../user/components/forms/SubtitleInput";
import linkToLabel, { LINK_LABELS, fixLinks } from "../../utils/link-to-label";

const ArticleSectionSlim = styled(ArticleSection)`
  max-width: ${b_mobile};
  & > div {
    margin-right: 0;
  }
`;
const Profile = props => {
  if (!process.browser) return <ClientLoader />;

  const { info, status } = props.user;

  // image select and upload tool
  const [image, setImage] = useState("");
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
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  // controls for link button
  const buttonDefaults = { to: "", text: "" };
  const [button, setButton] = useState(buttonDefaults);

  // control for saving profile
  const [isProfileSaving, setProfileSaveStatus] = useState(false);
  const handleSave = () => {
    setProfileSaveStatus(true);
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
    props.setUserInfo(request, () => {
      window.location = "/account";
    });
  };

  // ensure that intial values are loaded
  // without this useEffect block profile page draws blanks on refresh
  useEffect(() => {
    setTitle(info.title);
    setText(info.text);
    setButton(info.buttons ? info.buttons[1] : buttonDefaults);
    setImage(info.image);
    setProfileSaveStatus(false);
  }, [info.title]);

  const authorFirstName = getFirstNameFromFull(info.title || "");

  return (
    <Main>
      {status !== "ok" ? (
        <Error statusCode={403} />
      ) : (
        <ArticleWrapper>
          <HeaderLarge
            pageTitle="Edit Your Profile"
            pageSubtitle="And Settings"
          />

          <ArticleSectionSlim>
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
                  event.stopPropagation();
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
                value={title || ""}
                onChange={event => setTitle(event.target.value)}
              />
            </CardIntegrated>

            <CardIntegrated>
              <CardHeader buttons={[0]} stubborn noStar title="Mini Bio:" />
              <CardParagraphInput
                maxLength={INPUT_SUMMARY_LIMIT}
                placeholder="Please introduce yourself in 30 words or less."
                value={text || ""}
                onChange={event => setText(event.target.value)}
              />
            </CardIntegrated>

            <CardIntegrated>
              <CardHeader buttons={[0]} stubborn noStar title="Magic Link:" />
              <SubtitleInput
                placeholder={"www.your.link"}
                value={button && button.to ? button.to : ""}
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

              <CardCaption>
                <strong>Promote yourself or get paid.</strong> Add a link to
                your website, social profile or a “coffee” fund.{" "}
                <Modal
                  with={{
                    info: {
                      title: "About Magic Links",
                      text: (
                        <span>
                          <strong>
                            You can collect funds from willing, satisfied
                            readers
                          </strong>{" "}
                          using a link to your{" "}
                          <Link to="https://www.buymeacoffee.com">
                            Buy Me A Coffee
                          </Link>{" "}
                          or <Link to="https://ko-fi.com">Ko-Fi</Link> profile.
                          This feature is only available to contributing
                          authors.
                          <br />
                          <br />
                          Other links like Etsy, YouTube, Twitter, Instagram, or
                          email addresses will also turn into neat buttons.
                          <br />
                          <br />
                          <strong>Some examples:</strong>
                        </span>
                      ),
                      buttons: [
                        {
                          to: "#example-1",
                          branded: true,
                          text: (
                            <>
                              Buy {authorFirstName} a Coffee{" "}
                              <Coffee
                                style={{
                                  display: "inline-block",
                                  margin: "-.5em 0 0 .33em",
                                  height: "1em",
                                }}
                              />
                            </>
                          ),
                        },
                        {
                          to: "#example-2",
                          text: LINK_LABELS.etsy.replace(
                            "My",
                            authorFirstName + "’s"
                          ),
                        },
                        {
                          to: "#example-3",
                          text: LINK_LABELS.twitter.replace(
                            "Me",
                            authorFirstName
                          ),
                        },
                        {
                          to: "#example-4",
                          text: LINK_LABELS.website.replace(
                            "My",
                            authorFirstName + "’s"
                          ),
                        },
                      ],
                    },
                    id: "help/magic-links",
                  }}
                >
                  Learn more
                </Modal>
                .
              </CardCaption>
            </CardIntegrated>
            <Button style={{ fontSize: "1em" }} branded onClick={handleSave}>
              Save{isProfileSaving && " "}
              <Spinner style={isProfileSaving ? null : { width: 0 }} />
            </Button>
            <p style={{ textAlign: "center" }}>
              <small>
                <em>
                  Your public profile can be viewed{" "}
                  <strong>
                    <Link to={`/u/${info.id}`}>here</Link>
                  </strong>
                  .<br />
                  If you want to delete your account, please <Email /> Dmitri.
                </em>
              </small>
            </p>
          </ArticleSectionSlim>
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
    setUserInfo: (user, next) => {
      dispatch(setUserInfo(user, next));
    },
  };
};
export default connect(
  ({ user }) => {
    return { user };
  },
  mapDispatchToProps
)(Profile);

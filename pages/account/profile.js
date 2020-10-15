import { NextSeo } from "next-seo";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import lscache from "lscache";
import styled from "styled-components";

import { API } from "../../constants/router/defaults";
import { AccountSeo } from "./";
import { CARD_COMMUNITY_REFERRAL } from "../../constants/messages/affiliate";
import { CARD_ERRORS } from "../../constants/messages/errors";
import { HeartInline } from "../../core/components/icons/Heart";
import { INPUT_SUMMARY_LIMIT } from "../../constants/composer";
import { b_mobile, m_radius } from "../../constants/styles/measurements";
import { bookmarksModal } from "../../core/components/controls/Features/components/PosterBookmarks";
import { getFirstNameFromFull } from "../../utils/author-credits";
import { getUserInfo, setUserInfo } from "../../user/store/actions-user";
import { setModal } from "../../core/store/actions-modal";
import { withRedux } from "../../utils/with-redux";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import Bookmark from "../../core/components/icons/Bookmark";
import Button from "../../core/components/controls/Button";
import ButtonGroupDivider from "../../core/components/controls/Button/components/ButtonGroupDivider";
import CardButton from "../../core/components/controls/Card/components/CardButton";
import CardCaption from "../../core/components/controls/Card/components/CardCaption";
import CardFigure from "../../core/components/controls/Card/components/CardFigure";
import CardHeader from "../../core/components/controls/Card/components/CardHeader";
import CardIntegrated from "../../core/components/controls/Card/components/CardIntegrated";
import CardParagraphInput from "../../user/components/forms/CardParagraphInput";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import Email from "../../core/components/vignettes/Email";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import Link from "../../core/components/controls/Link";
import Main from "../../core/components/layouts/Main";
import Modal from "../../core/components/controls/Modal";
import SignIn from "../../user/components/pages/Account/SignIn";
import Spinner from "../../core/components/icons/Spinner";
import SubtitleInput from "../../user/components/forms/SubtitleInput";
import linkToLabel, { LINK_LABELS, fixLinks } from "../../utils/link-to-label";

const Slim = styled.div`
  & > section {
    max-width: ${b_mobile};
    & > div {
      margin-right: 0;
    }
  }
`;
const Profile = () => {
  if (!process.browser) return <ClientLoader />;

  const dispatch = useDispatch();
  const { info, status, sessionInfo } = useSelector(store => store.user);

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
            dispatch(
              setModal(
                {
                  status: "ok",
                  info: CARD_ERRORS.IMAGE_SIZE(5),
                },
                { url: "errors/upload" }
              )
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
    if (!process.browser) return;

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
        Authorization: "JWT " + lscache.get("token"),
      },
      data,
      url: API.PROFILE,
    };
    dispatch(
      setUserInfo(request, () => {
        dispatch(getUserInfo());
        Router.push("/account/profile");
        window.scrollTo &&
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
      })
    );
  };

  // ensure that intial values are loaded
  // without this useEffect block profile page draws blanks on refresh
  useEffect(() => {
    setTitle(info.title);
    setText(info.text);
    setButton(info.buttons ? info.buttons[1] : buttonDefaults);
    setImage(info.image);
    setProfileSaveStatus(false);

    status === "pending" && dispatch(getUserInfo());
  }, [info.title, sessionInfo]);

  const authorFirstName = getFirstNameFromFull(info.title || "");
  const pageTitle = "Profile and Settings";

  useEffect(() => {
    if (status === "pending" || status === "fetching") return;
    if (window.location.hash !== "#edit") return;
    const editScreen = document.getElementById("edit");
    if (!editScreen) return;
    window.scrollTo &&
      window.scrollTo({
        top: editScreen.getBoundingClientRect().top - 40,
        behavior: "smooth",
      });
  }, [status]);

  if (status === "pending" || status === "fetching")
    return (
      <>
        <NextSeo title={pageTitle} />
        <ClientLoader />
      </>
    );

  return (
    <>
      <NextSeo title={pageTitle} />
      {status !== "ok" ? (
        <>
          <AccountSeo />
          <SignIn loginAction="/account/profile" />
        </>
      ) : (
        <Main title={pageTitle}>
          <ArticleWrapper>
            <HeaderLarge pageTitle={`Hey ${title || "there"}!`} />

            <Slim>
              <ArticleSection>
                <CardIntegrated withOutline>
                  <CardButton to="/shop">Shop</CardButton>
                  <CardButton
                    to="/account/bookmarks"
                    onClick={event => {
                      event.preventDefault();
                      dispatch(setModal(bookmarksModal));
                    }}
                  >
                    <Bookmark
                      style={{
                        height: "1em",
                        padding: "0 0 0 .175em",
                      }}
                    />{" "}
                    Bookmarks
                  </CardButton>
                  <CardButton to="/apps-and-downloads">
                    Apps & Downloads
                  </CardButton>
                  <ButtonGroupDivider />
                  <CardButton to="/write/draft">
                    {lscache.get("composer-content-text")
                      ? "Edit Article Draft"
                      : "Write/Submit Your Article"}
                  </CardButton>
                  <CardButton to="/account/all-submissions">
                    Your Submissions
                  </CardButton>

                  <CardButton to="/r/open-call-g99w">Open Call</CardButton>
                </CardIntegrated>

                <h3 id="edit" style={{ textAlign: "center" }}>
                  Edit Your Profile
                </h3>
                <p style={{ textAlign: "center", marginTop: "-.5em" }}>
                  <small>
                    <em>
                      View and share your{" "}
                      <strong>
                        <Link to={`/u/${info.id}`}>public profile page</Link>
                      </strong>
                      .
                    </em>
                  </small>
                </p>

                <CardIntegrated withOutline>
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
                    style={{ borderRadius: m_radius }}
                    placeholder={"Your Name"}
                    value={title || ""}
                    onChange={event => setTitle(event.target.value)}
                  />
                </CardIntegrated>

                <CardIntegrated>
                  <CardHeader buttons={[0]} stubborn noStar title="Mini Bio:" />
                  <CardParagraphInput
                    style={{ borderRadius: m_radius }}
                    maxLength={INPUT_SUMMARY_LIMIT}
                    placeholder="Please introduce yourself in 30 words or less."
                    value={text || ""}
                    onChange={event => setText(event.target.value)}
                  />
                </CardIntegrated>

                <CardIntegrated>
                  <CardHeader
                    buttons={[0]}
                    stubborn
                    noStar
                    title="Magic Link:"
                  />
                  <SubtitleInput
                    style={{ borderRadius: m_radius, width: "99%" }}
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
                    Add a link to your website, social profile or a “coffee”
                    fund.{" "}
                    <Modal
                      with={{
                        info: {
                          title: "About Magic Links",
                          text: (
                            <>
                              <strong>
                                Collect funds from satisfied readers
                              </strong>{" "}
                              using a link to your{" "}
                              <Link to="https://buymeacoff.ee/?via=dmitrizzle">
                                Buy Me a Coffee
                              </Link>
                              {"|"}
                              <em>
                                <Modal
                                  with={CARD_COMMUNITY_REFERRAL(
                                    "Buy Me a Coffee"
                                  )}
                                >
                                  cr
                                </Modal>
                              </em>{" "}
                              or <Link to="https://ko-fi.com">Ko-Fi</Link>{" "}
                              profiles. This feature is only available to
                              contributing authors.
                              <br />
                              <br />
                              Etsy, YouTube, Twitter, and Instagram links as
                              well as email addresses will turn into neat
                              buttons. <strong>Examples:</strong>
                            </>
                          ),
                          buttons: [
                            {
                              to: "#example-1",
                              branded: true,
                              text: (
                                <>
                                  Buy {authorFirstName} a Coffee{" "}
                                  <small>
                                    <HeartInline />
                                  </small>
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
                <Button
                  style={{ fontSize: "1em" }}
                  branded
                  onClick={handleSave}
                >
                  Save{isProfileSaving && " "}
                  <Spinner style={isProfileSaving ? null : { width: 0 }} />
                </Button>

                <p style={{ textAlign: "center" }}>
                  <small>
                    <em>
                      If you want to delete your account, please <Email />{" "}
                      Dmitri.
                    </em>
                  </small>
                </p>
              </ArticleSection>
            </Slim>
          </ArticleWrapper>
        </Main>
      )}
    </>
  );
};

export default withRedux(Profile);

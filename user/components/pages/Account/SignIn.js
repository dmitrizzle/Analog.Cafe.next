import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Link from "../../../../core/components/controls/Link";

import { API } from "../../../../constants/router/defaults";
import {
  EmailForm,
  FacebookButton,
  TwitterButton,
} from "./components/FormElements";
import { b_movie, b_mobile } from "../../../../constants/styles/measurements";
import { c_grey_dark } from "../../../../constants/styles/colors";
import ga from "../../../../utils/data/ga";
import {
  loginWithEmail,
  addSessionInfo,
  getSessionInfo,
} from "../../../store/actions-user";
import { validateEmail } from "../../../../utils/email";
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper";
import Button from "../../../../core/components/controls/Button";
import ButtonGroup from "../../../../core/components/controls/Button/components/ButtonGroup";
import CardIntegrated from "../../../../core/components/controls/Card/components/CardIntegrated";
import Facebook from "../../../../core/components/icons/Facebook";
import Features from "./components/Features";
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge";
import Help from "./components/Help";
import Main from "../../../../core/components/layouts/Main";
import Modal from "../../../../core/components/controls/Modal";
import SubtitleInput from "../../forms/SubtitleInput";
import Twitter from "../../../../core/components/icons/Twitter";

const CardIntegratedOneColumn = styled(CardIntegrated)`
  margin: 1.5em auto;
  max-width: 320px;
  @media (min-width: ${b_movie}) {
    max-width: 380px;
  }
`;

const SignIn = props => {
  const [emailError, setEmailError] = useState(false);
  const [emailText, setEmailText] = useState("");
  const handleEmailChange = event => {
    setEmailText(event.target.value);
    setEmailError(false);
  };

  // if login action passed via props, use that, otherwise, default to store
  const { sessionInfo } = props.user;
  const [loginAction, setLoginAction] = useState();
  useEffect(() => {
    !sessionInfo && props.getSessionInfo();
    const loginAction =
      (props && props.loginAction) ||
      (props.user.sessionInfo ? props.user.sessionInfo.loginAction : undefined);
    setLoginAction(loginAction);
  }, [props.user.sessionInfo]);

  const handleSubmitEmail = event => {
    event.stopPropagation();
    event.preventDefault();
    event.target.blur();

    props.addSessionInfo({
      loginMethod: "email",
      loginAction,
    });

    if (!validateEmail(emailText)) return setEmailError(true);

    ga("event", {
      category: "User",
      action: "SignIn",
      label: "Email",
    });

    props.loginWithEmail(emailText.toLowerCase());
  };

  return (
    <Main>
      <ArticleWrapper>
        <HeaderLarge
          pageTitle="Sign In"
          pageSubtitle="Or Create Free Account"
        />
        <ArticleSection>
          <ButtonGroup>
            <TwitterButton
              onClick={event => {
                event.target.blur();
                props.addSessionInfo({
                  loginMethod: "twitter",
                  loginAction,
                });
                ga("event", {
                  category: "User",
                  action: "SignIn",
                  label: "Twitter",
                });
              }}
              inverse
              to={API.AUTH.VIA_TWITTER}
              target="_parent"
            >
              <Twitter />
              Continue with Twitter
            </TwitterButton>
            <FacebookButton
              onClick={event => {
                event.target.blur();
                props.addSessionInfo({
                  loginMethod: "facebook",
                  loginAction,
                });
                ga("event", {
                  category: "User",
                  action: "SignIn",
                  label: "Facebook",
                });
              }}
              inverse
              to={API.AUTH.VIA_FACEBOOK}
              target="_parent"
            >
              <Facebook /> Continue with Facebook
            </FacebookButton>
            <CardIntegratedOneColumn rigid>
              <EmailForm onSubmit={handleSubmitEmail}>
                <SubtitleInput
                  placeholder={"Your @ Email"}
                  error={emailError}
                  onChange={handleEmailChange}
                  value={emailText}
                />
                <Button style={{ fontSize: "1em" }} onClick={handleSubmitEmail}>
                  Continue
                </Button>
              </EmailForm>
            </CardIntegratedOneColumn>
            <em>
              <small
                style={{
                  maxWidth: b_mobile,
                  color: c_grey_dark,
                  display: "block",
                  margin: "-1em auto",
                }}
              >
                By creating and using an account you agree to{" "}
                <Link to="/write/rules">Rules</Link> and{" "}
                <Link to="/privacy-policy">Privacy Policy</Link>.
              </small>
            </em>
            <br />
            <Modal
              element="a"
              unmarked
              with={{
                info: {
                  title: "Help With Signing In",
                  text: <Help />,
                  id: "help/signing-in",
                },
              }}
            >
              <em>Help</em>
            </Modal>
          </ButtonGroup>
          <Features />
        </ArticleSection>
      </ArticleWrapper>
    </Main>
  );
};

export default connect(
  ({ user }) => {
    return { user };
  },
  dispatch => {
    return {
      loginWithEmail: validatedEmail => {
        dispatch(loginWithEmail(validatedEmail));
      },
      addSessionInfo: sessionInfo => {
        dispatch(addSessionInfo(sessionInfo));
      },
      getSessionInfo: () => {
        dispatch(getSessionInfo());
      },
    };
  }
)(SignIn);

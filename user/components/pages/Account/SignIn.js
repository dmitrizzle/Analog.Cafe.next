import { connect } from "react-redux";
import React, { useState } from "react";
import styled from "styled-components";

import { API } from "../../../../constants/router/defaults";
import {
  EmailForm,
  FacebookButton,
  TwitterButton,
} from "./components/FormElements";
import { b_mobile, b_movie } from "../../../../constants/styles/measurements";

import { loginWithEmail } from "../../../store/actions-user";
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

const SignIn = props => {
  const [emailError, setEmailError] = useState(false);
  const [emailText, setEmailText] = useState("");
  const handleEmailChange = event => {
    setEmailText(event.target.value);
    setEmailError(false);
  };

  const handleSubmitEmail = event => {
    event.stopPropagation();
    event.preventDefault();
    event.target.blur();

    if (!validateEmail(emailText)) return setEmailError(true);

    // GA.event({
    //   category: "User",
    //   action: "Sign In",
    //   label: "Email"
    // })

    props.loginWithEmail(emailText.toLowerCase());
  };

  const CardIntegratedOneColumn = styled(CardIntegrated)`
    margin: 1.5em auto;
    max-width: 320px;
    @media (min-width: ${b_movie}) {
      max-width: 380px;
    }
  `;

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
              onClick={event => event.target.blur()}
              inverse
              to={API.AUTH.VIA_TWITTER}
              target="_parent"
            >
              <Twitter />
              Continue with Twitter
            </TwitterButton>
            <FacebookButton
              onClick={event => event.target.blur()}
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
            <Modal
              element="a"
              unmarked
              with={{
                info: {
                  title: "Help With Signing In",
                  text: <Help />,
                  id: "hints/help/signing-in",
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

const mapDispatchToProps = dispatch => {
  return {
    loginWithEmail: validatedEmail => {
      dispatch(loginWithEmail(validatedEmail));
    },
  };
};
export default connect(
  null,
  mapDispatchToProps
)(SignIn);

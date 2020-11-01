import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import { API } from "../../../../../constants/router/defaults";
import { EmailForm, FacebookButton, TwitterButton } from "./FormElements";
import {
  addSessionInfo,
  getSessionInfo,
  loginWithEmail,
} from "../../../../store/actions-user";
import {
  b_mobile,
  b_movie,
} from "../../../../../constants/styles/measurements";
import { setModal } from "../../../../../core/store/actions-modal";
import { validateEmail } from "../../../../../utils/email";
import { withRedux } from "../../../../../utils/with-redux";
import Button from "../../../../../core/components/controls/Button";
import CardIntegrated from "../../../../../core/components/controls/Card/components/CardIntegrated";
import Facebook from "../../../../../core/components/icons/Facebook";
import SubtitleInput from "../../../forms/SubtitleInput";
import Twitter from "../../../../../core/components/icons/Twitter";
import ga from "../../../../../utils/data/ga";

const CardIntegratedOneColumn = styled(CardIntegrated)`
  margin: 1.5em auto;
  max-width: 320px;
  @media (min-width: ${b_movie}) {
    max-width: 380px;
  }
  ${props =>
    props.form &&
    css`
      box-shadow: 0 0 0 1px ${({ theme }) => theme.grey_med};
      @media (max-width: ${b_mobile}) {
        margin-left: -1.5em !important;
      }
    `}
`;

const EmailSignin = ({
  handleSubmitEmail,
  emailError,
  handleEmailChange,
  emailText,
}) => {
  return (
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
  );
};

export const SignInElements = withRedux(props => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [emailError, setEmailError] = useState(false);
  const [emailText, setEmailText] = useState("");
  const handleEmailChange = event => {
    setEmailText(event.target.value);
    setEmailError(false);
  };

  // if login action passed via props, use that, otherwise, default to store
  const { sessionInfo } = user;
  const [loginAction, setLoginAction] = useState();
  useEffect(() => {
    !sessionInfo && dispatch(getSessionInfo());
    const loginAction =
      (props && props.loginAction) ||
      (user.sessionInfo ? user.sessionInfo.loginAction : undefined);

    setLoginAction(loginAction);
  }, [user.sessionInfo]);

  const handleSubmitEmail = event => {
    event.stopPropagation();
    event.preventDefault();
    event.target.blur();

    dispatch(
      addSessionInfo({
        loginMethod: "email",
        loginAction,
      })
    );

    if (!validateEmail(emailText)) return setEmailError(true);

    const useEmail = () => {
      ga("event", {
        category: "auth",
        action: "signin.email",
      });

      dispatch(loginWithEmail(emailText.toLowerCase()));
    };

    let isProblemDomain = false;
    ["@hotmail.com", "@live.com", "@outlook.com", "@msn.com"].forEach(
      domain => {
        if (emailText.includes(domain)) {
          return (isProblemDomain = true);
        }
      }
    );
    if (isProblemDomain) {
      return dispatch(
        setModal(
          {
            status: "ok",
            info: {
              title: "Warning",
              text: (
                <>
                  <p>
                    Microsoft email servers may have trouble receiving messages
                    from Analog.Cafe. You may not be able to sign in using this
                    email address.
                    <br />
                    <br />
                    Please consider using a different email address.
                  </p>
                </>
              ),
              buttons: [
                {
                  text: "Proceed Anyway",
                  onClick: event => {
                    event.preventDefault();
                    useEmail();
                  },
                  to: "#proceed",
                },
                {
                  text: "Use Different Email",
                  branded: true,
                  onClick: event => {
                    event.preventDefault();
                  },
                  to: "#cancel",
                },
              ],
            },
          },
          { url: "errors/hotmail" }
        )
      );
    }

    useEmail();
  };

  if (props.emailOnly)
    return (
      <EmailSignin
        {...{
          handleSubmitEmail,
          emailError,
          handleEmailChange,
          emailText,
        }}
      />
    );

  return (
    <>
      <TwitterButton
        onClick={event => {
          event.target.blur();
          dispatch(
            addSessionInfo({
              loginMethod: "twitter",
              loginAction,
            })
          );
          ga("event", {
            category: "auth",
            action: "signin.twitter",
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
          dispatch(
            addSessionInfo({
              loginMethod: "facebook",
              loginAction,
            })
          );
          ga("event", {
            category: "auth",
            action: "signin.facebook",
          });
        }}
        inverse
        to={API.AUTH.VIA_FACEBOOK}
        target="_parent"
      >
        <Facebook /> Continue with Facebook
      </FacebookButton>
      {props.socialOnly ? null : (
        <CardIntegratedOneColumn rigid form={1}>
          <EmailSignin
            {...{
              handleSubmitEmail,
              emailError,
              handleEmailChange,
              emailText,
            }}
          />
        </CardIntegratedOneColumn>
      )}
    </>
  );
});

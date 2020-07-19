import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import { API } from "../../../../constants/router/defaults";
import { CONTACT_EMAIL } from "../../../../constants/messages/system";
import {
  EmailForm,
  FacebookButton,
  TwitterButton,
} from "./components/FormElements";
import { b_mobile, b_movie } from "../../../../constants/styles/measurements";
import {
  loginWithEmail,
  addSessionInfo,
  getSessionInfo,
} from "../../../store/actions-user";
import { setModal } from "../../../../core/store/actions-modal";
import { validateEmail } from "../../../../utils/email";
import { withRedux } from "../../../../utils/with-redux";
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper";
import Button from "../../../../core/components/controls/Button";
import ButtonGroup from "../../../../core/components/controls/Button/components/ButtonGroup";
import CardIntegrated from "../../../../core/components/controls/Card/components/CardIntegrated";
import Facebook from "../../../../core/components/icons/Facebook";
import Features from "./components/Features";
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge";
import Help from "./components/Help";
import Link from "../../../../core/components/controls/Link";
import Main from "../../../../core/components/layouts/Main";
import Modal from "../../../../core/components/controls/Modal";
import SubtitleInput from "../../forms/SubtitleInput";
import Twitter from "../../../../core/components/icons/Twitter";
import ga from "../../../../utils/data/ga";

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

const SignIn = props => {
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

  return (
    <Main>
      <ArticleWrapper>
        <HeaderLarge
          pageTitle="Sign In"
          pageSubtitle="Create Your Free Analog.Cafe Account"
        />
        <ArticleSection>
          <ButtonGroup>
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
            <CardIntegratedOneColumn rigid form={1}>
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
                css={css`
                  max-width: ${b_mobile};
                  color: ${({ theme }) => theme.grey_dark};
                  display: block;
                  margin: -1.5em auto;
                  font-size: 0.65em;
                `}
              >
                By creating and using an account you agree to{" "}
                <Link to="/tos">Terms</Link>,{" "}
                <Link to="/acceptable-use-policy">Use</Link>, and{" "}
                <Link to="/privacy-policy">Privacy</Link> Policies.
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
                  buttons: [
                    {
                      to: `mailto:${CONTACT_EMAIL}`,
                      text: "Email for Support",
                      onClick: () =>
                        ga("event", {
                          category: "nav",
                          action: "signin.email",
                        }),
                    },
                  ],
                },
              }}
            >
              Sign In Help
            </Modal>
          </ButtonGroup>
          <div style={{ margin: "0 auto 3em", maxWidth: `${b_mobile}` }}>
            <p style={{ lineHeight: ".8em", textAlign: "center" }}>
              <small>
                When you sign up for your free account, you instantly get access
                to:
              </small>
            </p>

            <Features />
          </div>
        </ArticleSection>
      </ArticleWrapper>
    </Main>
  );
};

export default withRedux(SignIn);

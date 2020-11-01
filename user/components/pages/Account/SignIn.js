import { css } from "styled-components";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";

import { CONTACT_EMAIL } from "../../../../constants/messages/system";
import { SignInElements } from "./components/SignInElements";
import { b_mobile } from "../../../../constants/styles/measurements";
import { hideModal } from "../../../../core/store/actions-modal";
import { withRedux } from "../../../../utils/with-redux";
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper";
import ButtonGroup from "../../../../core/components/controls/Button/components/ButtonGroup";
import Features from "./components/Features";
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge";
import Help from "./components/Help";
import Link from "../../../../core/components/controls/Link";
import Main from "../../../../core/components/layouts/Main";
import Modal from "../../../../core/components/controls/Modal";
import ga from "../../../../utils/data/ga";

const SignInPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hideModal());
  }, []);
  return (
    <Main>
      <ArticleWrapper>
        <HeaderLarge
          pageTitle="Sign In"
          pageSubtitle="Create Your Free Analog.Cafe Account"
        />
        <ArticleSection>
          <ButtonGroup>
            <SignInElements />
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
                When you sign in to your free account, you instantly get access
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

export default withRedux(SignInPage);

import React from "react";

import {
  EmailForm,
  FacebookButton,
  TwitterButton,
} from "../../user/components/pages/Account/components/FormElements";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import Button from "../../core/components/controls/Button";
import ButtonGroup from "../../core/components/controls/Button/components/ButtonGroup";
import CardIntegrated from "../../core/components/controls/Card/components/CardIntegrated";
import Facebook from "../../core/components/icons/Facebook";
import Features from "../../user/components/pages/Account/components/Features";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import Help from "../../user/components/pages/Account/components/Help";
import Main from "../../core/components/layouts/Main";
import Modal from "../../core/components/controls/Modal";
import SubtitleInput from "../../user/components/forms/SubtitleInput";
import Twitter from "../../core/components/icons/Twitter";

export default () => {
  return (
    <Main>
      <ArticleWrapper>
        <HeaderLarge
          pageTitle="Sign In"
          pageSubtitle="Or Create Free Account"
        />
        <ArticleSection>
          <ButtonGroup>
            <TwitterButton inverse>
              <Twitter />
              Continue with Twitter
            </TwitterButton>
            <FacebookButton inverse>
              <Facebook /> Continue with Facebook
            </FacebookButton>
            <CardIntegrated>
              <EmailForm>
                <SubtitleInput placeholder={"Your @ Email"} />
                <Button style={{ fontSize: "1em" }}>Continue</Button>
              </EmailForm>
            </CardIntegrated>
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

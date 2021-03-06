import { LogoJsonLd, NextSeo } from "next-seo";
import React from "react";
import styled from "styled-components";

import {
  ColumnWrapper,
  Divider,
} from "../core/components/pages/Article/components/ArticleCardColumns";
import { DESCRIPTION_LONG, NAME } from "../constants/messages/system";
import { DOMAIN } from "../constants/router/defaults";
import { b_mobile } from "../constants/styles/measurements";
import { fetchListPage } from "../core/store/actions-list";
import { getListMeta } from "../core/components/pages/List/utils";
import { makeFroth } from "../utils/froth";
import { withRedux } from "../utils/with-redux";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import CardCaption from "../core/components/controls/Card/components/CardCaption";
import CardFigure from "../core/components/controls/Card/components/CardFigure";
import CardIntegrated from "../core/components/controls/Card/components/CardIntegrated";
import Footer from "../core/components/layouts/Main/components/Footer";
import HeaderSubtitle from "../core/components/vignettes/HeaderLarge/components/HeaderSubtitle";
import HeaderTitle from "../core/components/vignettes/HeaderLarge/components/HeaderTitle";
import HeaderWrapper from "../core/components/vignettes/HeaderLarge/components/HeaderWrapper";
import Link from "../core/components/controls/Link";
import Main from "../core/components/layouts/Main";
import Menu from "../core/components/controls/Menu";
import Modal from "../core/components/controls/Modal";
import ga from "../utils/data/ga";

const profileImage = "image-froth_1004016_oofNm_-lQ";
const WelcomeAvatar = styled.div`
  width: 4em;
  height: 4em;
  border-radius: 4em;
  background: url(${makeFroth({ src: profileImage, size: "t" }).src});
  background-size: cover;
  margin: 0 auto;
`;

const Hi = ({ list }) => {
  const seo = {
    title: `Weclcome to ${NAME}!`,
    description: DESCRIPTION_LONG,
    image: makeFroth({ src: profileImage, size: "l" }).src,
  };

  return (
    <>
      <NextSeo
        title={seo.title}
        description={seo.description}
        openGraph={{
          type: "website",
          images: [{ url: seo.image }],
          url: DOMAIN.PROTOCOL.PRODUCTION + DOMAIN.APP.PRODUCTION + "/hi",
        }}
      />
      <LogoJsonLd
        logo={
          DOMAIN.PROTOCOL.PRODUCTION +
          DOMAIN.APP.PRODUCTION +
          "/static/logo-1764x1764.png"
        }
        url={DOMAIN.PROTOCOL.PRODUCTION + DOMAIN.APP.PRODUCTION}
      />
      <Main title={seo.title}>
        <ArticleWrapper>
          <Modal
            onClick={() =>
              ga("event", {
                category: "nav",
                action: "hi.avatar",
              })
            }
            unmarked
            element="a"
            with={{
              info: {
                image: profileImage,
                title: "Hello 👋",
                text: "My name is Dmitri. I edit and manage Analog.Cafe.",
                buttons: [
                  { to: "/u/dmitrizzle", text: "My Profile" },
                  { to: "/about#contact", text: "Contact Me" },
                  { to: "/about", text: "About This Website" },
                ],
              },
              id: "u/dmitrizzle",
            }}
          >
            <WelcomeAvatar />
          </Modal>

          <HeaderWrapper>
            <HeaderSubtitle>Welcome to</HeaderSubtitle>
            <HeaderTitle>{NAME}!</HeaderTitle>
          </HeaderWrapper>

          <ArticleSection>
            <p>{DESCRIPTION_LONG}</p>
            <h3>Latest articles.</h3>

            <ColumnWrapper>
              {list?.items.slice(0, 4).map(item => (
                <Link
                  key={item.id}
                  to={`/r/${item.slug}`}
                  onClick={() =>
                    ga("event", {
                      category: "nav",
                      action: "hi.latest",
                      label: `/r/${item.slug}`,
                    })
                  }
                  style={{ textDecoration: "none" }}
                >
                  <CardIntegrated withOutline>
                    <CardFigure image={item.poster} />
                    <CardCaption>
                      <h4
                        style={{
                          fontSize: "1.25em",
                          fontStyle: "normal",
                        }}
                      >
                        {item.title}
                      </h4>
                      <span>{item.summary}</span>
                    </CardCaption>
                  </CardIntegrated>
                </Link>
              ))}
            </ColumnWrapper>
            <Divider />
          </ArticleSection>

          <ArticleSection style={{ maxWidth: b_mobile, padding: "0 0 3em" }}>
            <CardIntegrated withOutline>
              <Menu searchOnly noAutoFocus />
            </CardIntegrated>
          </ArticleSection>

          <ArticleSection>
            <h3>Shop.</h3>
            <p>
              Check out the latest books, magazines, film cameras, and other
              offerings at the{" "}
              <strong>
                <Link
                  to="/shop"
                  onClick={() =>
                    ga("event", {
                      category: "nav",
                      action: "hi.shop",
                    })
                  }
                >
                  Analog.Cafe Shop
                </Link>
                !
              </strong>
            </p>
            <h3>Submissions.</h3>
            <p>
              Do you shoot film? Have you got a story to tell or something
              valuable to teach? Head over to{" "}
              <strong>
                <Link
                  to="/write"
                  onClick={() =>
                    ga("event", {
                      category: "nav",
                      action: "hi.submissions",
                    })
                  }
                >
                  Submissions
                </Link>
              </strong>{" "}
              to get your work featured on the website, as well as Analog.Cafe’s
              Instagram, Twitter, and our{" "}
              <Link
                to="/editorials"
                onClick={() =>
                  ga("event", {
                    category: "nav",
                    action: "hi.editorial",
                  })
                }
              >
                <em>Community Newsletter</em>
              </Link>
              , sent monthly to thousands of happy subscribers.
            </p>
          </ArticleSection>
        </ArticleWrapper>
        <Footer />
      </Main>
    </>
  );
};

Hi.getInitialProps = async ({ reduxStore }) => {
  const listRequest = getListMeta("/", 1).request;
  await reduxStore.dispatch(fetchListPage(listRequest));
  const { list } = reduxStore.getState();
  return {
    list,
  };
};

export default withRedux(Hi);

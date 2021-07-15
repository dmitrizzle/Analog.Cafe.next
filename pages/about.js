import { NextSeo, LogoJsonLd } from "next-seo";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import styled from "styled-components";

import {
  DESCRIPTION_LONG,
  DESCRIPTION_MED,
  DESCRIPTION_SHORT,
  NAME,
} from "../constants/messages/system";
import { DOMAIN } from "../constants/router/defaults";
import { SIGN_IN_MODAL } from "../core/components/layouts/Main/constants";
import { b_mobile } from "../constants/styles/measurements";
import { fetchAuthorsList } from "../user/store/actions-community";
import { makeFroth } from "../utils/froth";
import { setModal } from "../core/store/actions-modal";
import { withRedux } from "../utils/with-redux";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import AuthorsBanner, {
  AuthorIcon,
  Authors,
} from "../core/components/pages/About/components/AuthorsBanner";
import Email from "../core/components/vignettes/Email";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Link from "../core/components/controls/Link";
import LinkButton from "../core/components/controls/Button/components/LinkButton";
import Main from "../core/components/layouts/Main";
import ThankYouList from "../core/components/pages/About/components/ThankYouList";
import ga from "../utils/data/ga";

const ContactPersonWrapper = styled.div`
  a {
    margin: 0.25em 1em 0.25em 0;
    float: left;
    width: 9em;
    height: 9em;
    @media (max-width: ${b_mobile}) {
      margin: 0 auto 1em;
      float: initial;
    }
  }
`;

const About = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  props.community.authorsList.status === "loading" &&
    props.fetchAuthorsList({ itemsPerPage: 350 });

  const seo = {
    title: "About Analog.Cafe",
    description: DESCRIPTION_LONG,
    images: [
      {
        url: makeFroth({ src: "image-froth_977297_5IAighcYV", size: "m" }).src,
      },
    ],
  };

  return (
    <>
      <NextSeo
        title={seo.title}
        description={seo.description}
        openGraph={{
          type: "website",
          images: seo.images,
          url: DOMAIN.PROTOCOL.PRODUCTION + DOMAIN.APP.PRODUCTION + "/about",
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
          <HeaderLarge pageTitle={NAME} pageSubtitle={DESCRIPTION_SHORT} />
          <ArticleSection>
            <p>{DESCRIPTION_MED}</p>
            <p>
              Analog.Cafe is a group effort from{" "}
              <strong>
                {props.community.authorsList.items.length} contributing writers,
                artists, and photographers
              </strong>
              , maintained by{" "}
              <strong>
                <Link to="#contact">Dmitri</Link>
              </strong>
              . 👋
            </p>

            <AuthorsBanner overflow={1}>
              <Authors>
                {props.community.authorsList.items.map((item, index) => {
                  const image = makeFroth({ src: item.image, size: "t" }).src;
                  return (
                    <div title={item.title} key={index}>
                      <AuthorIcon
                        to={`/u/${item.id}`}
                        style={{ backgroundImage: `url(${image})` }}
                      >
                        {!item.image && item.title.substring(0, 2)}
                      </AuthorIcon>
                    </div>
                  );
                })}
              </Authors>
            </AuthorsBanner>

            {user.status !== "ok" && (
              <>
                <p>
                  Our articles are enjoyed by thousands of readers every week,
                  many of whom make use of their{" "}
                  <strong>
                    free Analog.Cafe account for exclusive access to dozens of
                    apps
                  </strong>
                  , <strong>downloads</strong>,{" "}
                  <strong>special website features</strong>, and{" "}
                  <strong>a monthly community letter</strong>. You should
                  totally
                </p>
                <LinkButton
                  to={"/account"}
                  branded
                  with={SIGN_IN_MODAL}
                  onClick={event => {
                    event.preventDefault();
                    dispatch(setModal(SIGN_IN_MODAL));
                    ga("event", {
                      category: "auth",
                      action: "about.button",
                      label: "Sign up!",
                    });
                  }}
                >
                  Sign Up
                </LinkButton>
                <p style={{ textAlign: "center", marginTop: "-1em" }}>
                  <small>
                    <em>— for a free Analog.Cafe account</em>.
                  </small>
                </p>
              </>
            )}

            <h3 id="contact">Contact Info.</h3>

            <p id="contact" style={{ hyphens: "auto" }}>
              <ContactPersonWrapper>
                <AuthorIcon
                  to={`/u/dmitrizzle`}
                  style={{
                    backgroundImage: `url(${
                      makeFroth({
                        src: "image-froth_1004016_oofNm_-lQ",
                        size: "t",
                      }).src
                    })`,
                  }}
                ></AuthorIcon>
              </ContactPersonWrapper>
              If you have questions about the content, contributions, need
              technical support, or just want to chat about film photography,
              please{" "}
              <strong>
                <Email />
              </strong>
              .
            </p>
            <p>
              You can also @ me on{" "}
              <strong>
                <Link to="https://twitter.com/analog_cafe">Twitter</Link>
              </strong>{" "}
              (my pref. social network),{" "}
              <Link to="https://pinterest.com/analog_cafe">Pinterest</Link>, and{" "}
              <Link to="https://instagram.com/analog_cafe">Instagram</Link>. 🤙
            </p>

            <h3>Thank you, project backers!</h3>
            <ThankYouList>
              Thayanantha Thevanayagam
              <br />
              Betty Dai
              <br />
              Kevin Kethcart
              <br />
              Fernando Lavin (@film.lav)
              <br />
              Lee Webb
              <br />
              Lewis Phan
              <br />
              Genester
              <br />
              Jose Altamirano (josekasek)
              <br />
              Marianne Oliver
              <br />
              Michael Jones
              <br />
              Tim Dobbs
              <br />
              James Cockroft
              <br />
              faultyflipflap
              <br />
              Jennifer Precious Finch
              <br />
              Denise
              <br />
              Frank Russo
              <br />
              Domenico Stefani
              <br />
              Stephen King
              <br />
              Arjun Mohan
              <br />
              Kevin Aungle
              <br />
              Jack Yu
              <br />
              Stephen Dowling
              <br />
              Anonymous
              <br />
              Joey Pasco
              <br />
              Kanoa Mulling
              <br />
              BVH
              <br />
              Jacob Michael Hanania
              <br />
              Rob James Davie
              <br />
              Joey Santiago
              <br />
              Danielle Cardoz
              <br />
              Francisco M<br />
              Jonathan Zobro
              <br />
              Matthew Stollmeyer
              <br />
              Ishtiaq Rahman
              <br />
              Lu Yu
              <br />
              Jan Ian Chow
              <br />
              Olga Tcherbadji
              <br />
              Andreea Cojocaru
              <br />
              Jeff Santos
              <br />
              Arjan Wiertz
              <br />
              Stepan Cherbadzhi
              <br />
              Jackie Wong
              <br />
              Vivian Qiu
              <br />
              Ben Yee
              <br />
              Ashley Taylor
              <br />
              Anonymous
              <br />
              Anonymous
              <br />
              Geraldine Pontius
              <br />
              Larry Treadway
              <br />
              Hakan (@haknization)
              <br />
              Ben Cairns
            </ThankYouList>
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
};

About.getInitialProps = async ({ reduxStore }) => {
  await reduxStore.dispatch(fetchAuthorsList({ itemsPerPage: 350 }));
  const { community } = reduxStore.getState();
  return { community };
};

export default withRedux(About);

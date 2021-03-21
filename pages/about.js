import { NextSeo, LogoJsonLd } from "next-seo";
import { useDispatch } from "react-redux";
import React from "react";

import {
  DESCRIPTION_LONG,
  DESCRIPTION_MED,
  DESCRIPTION_SHORT,
  NAME,
} from "../constants/messages/system";
import { DOMAIN } from "../constants/router/defaults";
import { HeartInline } from "../core/components/icons/Heart";
import { SIGN_IN_MODAL } from "../core/components/layouts/Main/constants";
import { c_red } from "../constants/styles/themes";
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
import Figure from "../core/components/vignettes/Picture/components/Figure";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Link from "../core/components/controls/Link";
import LinkButton from "../core/components/controls/Button/components/LinkButton";
import Main from "../core/components/layouts/Main";
import Modal from "../core/components/controls/Modal";
import ThankYouList from "../core/components/pages/About/components/ThankYouList";
import ga from "../utils/data/ga";

const About = props => {
  const dispatch = useDispatch();

  props.community.authorsList.status === "loading" &&
    props.fetchAuthorsList({ itemsPerPage: 350 });

  const seo = {
    title: "About",
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
              , maintained by <Link to="/u/dmitrizzle">Dmitri</Link>. 👋
            </p>

            <AuthorsBanner overflow={1}>
              <Authors>
                {props.community.authorsList.items.map((item, index) => {
                  const image = makeFroth({ src: item.image, size: "t" }).src;
                  return (
                    <AuthorIcon
                      style={{ backgroundImage: `url(${image})` }}
                      to={`/u/${item.id}`}
                      key={index}
                    />
                  );
                })}
              </Authors>
            </AuthorsBanner>
            <p>
              Our articles are enjoyed by thousands of readers every week, many
              of whom make use of their{" "}
              <strong>
                free Analog.Cafe account for exclusive access to dozens of apps
              </strong>
              , <strong>downloads</strong>,{" "}
              <strong>special website features</strong>, and{" "}
              <strong>a monthly community letter</strong>.
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
              Sign up!
            </LinkButton>
            <p style={{ textAlign: "center", marginTop: "-1em" }}>
              <small>
                <em>— for a free Analog.Cafe account</em>.
              </small>
            </p>

            <h3 id="contact">Contact Info.</h3>

            <p id="contact">
              If you have questions about the content, contributions, or need
              technical support, please <Email />.
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

import { NextSeo, LogoJsonLd } from "next-seo";
import React from "react";

import { HeartInline } from "../core/components/icons/Heart";
import {
  DESCRIPTION_LONG,
  DESCRIPTION_SHORT,
  NAME,
} from "../constants/messages/system";
import { DOMAIN } from "../constants/router/defaults";
import { c_red } from "../constants/styles/colors";
import { fetchAuthorsList } from "../user/store/actions-community";
import { makeFroth } from "../utils/froth";
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
import Main from "../core/components/layouts/Main";
import Modal from "../core/components/controls/Modal";
import ThankYouList from "../core/components/pages/About/components/ThankYouList";

const About = props => {
  props.community.authorsList.status === "loading" &&
    props.fetchAuthorsList({ itemsPerPage: 100 });

  const seo = {
    title: "About",
    description: DESCRIPTION_LONG,
    images: [
      {
        url: makeFroth({ src: "image-froth_1206996_r1CqlUwRm", size: "m" }).src,
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
            <p>
              Weekly photo essays on art, travel, and culture. Analogue cameras,
              film, history, and techniques.
            </p>
            <p>
              Analog.Cafe is a group effort from{" "}
              <strong>
                {props.community.authorsList.items.length} contributing writers,
                artists, and photographers
              </strong>{" "}
              to educate and entertain our growing creatively-inclined audience.
            </p>
            <p>
              Among us are thousands of member readers with exclusive access to{" "}
              <strong>
                downloads, special discounts, and a monthly community newsletter
              </strong>
              .
            </p>
            <p>
              <strong style={{ color: c_red }}>
                <Link to="/account">Join us!</Link>
              </strong>{" "}
              <em>It’s free</em>.
            </p>

            <AuthorsBanner src="image-froth_1533636_rygH__d9kQ">
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

            <h3 id="history">A brief history.</h3>
            <p>
              This project began in 2017 as an idea for a community publishing
              platform.
            </p>
            <p>
              Analog.Cafe got funded via Kickstarter on May 5<sup>th</sup>. The
              website went live on{" "}
              <Link to="/r/analog-cafe-e8tr">
                July 27<sup>th</sup>, 2017
              </Link>
              .
            </p>
            <p>
              Today it’s maintained by <Link to="/u/dmitrizzle">Dmitri</Link> –
              hello! 👋
            </p>
            <p>
              My wife, <Link to="/u/betty">Betty</Link>, has been a tremendous
              help in setting the tone, quality, and consistency of the
              articles. None of this would make sense without her help and the
              fantastic people who supported me along this journey.
            </p>

            <p>
              Almost every image on this website is shot on film. There could be{" "}
              a book written on{" "}
              <Link to="/r/a-beginners-guide-to-film-photography-zq0f#why-shoot-film-in-2020">
                why
              </Link>{" "}
              we haven’t given up this medium. The gist: it comes with a unique
              look, process, and memories.
            </p>

            <h3>Analog.Cafe, and you.</h3>
            <p>
              If you like what you see, consider getting your{" "}
              <Link to="/account">
                <strong>free account</strong>
              </Link>{" "}
              – it takes one click. Or you can{" "}
              <Link to="/r/your-account-racl">learn more</Link> about it first.
            </p>
            <Modal
              unmarked
              element="a"
              with={{
                info: {
                  image: "image-froth_1206996_r1CqlUwRm",
                  title: "Voigtländer Vitessa L",
                  text: (
                    <span>
                      <strong>Voigtländer Vitessa</strong> is a German 35mm film
                      rangefinder camera, manufactured in the mid-1950s. The
                      camera is uniquely-built, with a lot of thought and care
                      put into the manufacturing process.
                    </span>
                  ),
                  buttons: [
                    {
                      to: "/r/voigtlander-vitessa-l-fzyi",
                      text: "Learn More",
                    },
                  ],
                },
                id: "help/vitessa-l",
              }}
            >
              <Figure src="image-froth_1206996_r1CqlUwRm" />
            </Modal>
            <p>
              You can also thank the authors for their time and effort. Look for
              the{" "}
              <em>
                “Thank the Author
                <small>
                  <HeartInline branded />
                </small>
                ”
              </em>{" "}
              buttons on article pages. It will take you to a page, like{" "}
              <Link to="https://www.buymeacoffee.com/dmitrizzle">this one</Link>
              , where you can send a little bit of money as a token of your
              appreciation.
            </p>
            <p>
              If you’d like to publish your article on Analog.Cafe, head over to
              the{" "}
              <strong>
                <Link to="/write">Submit</Link>
              </strong>{" "}
              page.
            </p>
            <p>
              For aesthetic and privacy reasons, we do not use ad networks to
              sponsor our content. Instead, we aim to provide value with special
              offers and discounts from businesses and individuals we trust and
              recommend. Please consider making your next purchase via{" "}
              <strong>
                <Link to="/shop">Analog.Cafe Shop</Link>
              </strong>{" "}
              if you’d like to support this project. You will not be
              disappointed.
            </p>

            <h3 id="contact">Contact Info.</h3>

            <p>
              You can usually find authors’ contact info in the bio, referenced
              in every article on Analog.Cafe.
            </p>
            <p>
              If you have questions about the content, contributions, or need
              technical support, please <Email /> me (Dmitri).
            </p>
            <hr />
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
  await reduxStore.dispatch(fetchAuthorsList({ itemsPerPage: 100 }));
  const { community } = reduxStore.getState();
  return { community };
};

export default withRedux(About);

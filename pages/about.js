import { connect } from "react-redux";
import React from "react";

import { DESCRIPTION_SHORT, NAME } from "../constants/messages/app";
import { makeFroth } from "../utils/froth";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Link from "../core/components/controls/Link";
import Main from "../core/components/layouts/Main";
import Modal from "../core/components/controls/Modal";

const CountUp = props => <>{props.children}</>;
const Authors = props => <>{props.children}</>;
const AuthorsBanner = props => <>{props.children}</>;
const AuthorIcon = props => <>{props.children}</>;
const Figure = props => <>{props.children}</>;

const About = props => (
  <Main>
    <ArticleWrapper>
      <HeaderLarge pageTitle={NAME} pageSubtitle={DESCRIPTION_SHORT} />
      <ArticleSection>
        <p>
          Weekly photo essays on art, travel, and culture. Analogue cameras,
          film, history, and techniques.
        </p>
        <p>
          This web site is a (growing) group effort, with{" "}
          <CountUp
            end={props.community.authorsList.items.length}
            duration={5}
            start={Math.floor(props.community.authorsList.items.length - 10)}
            delay={2}
          />{" "}
          contributing authors.{" "}
          <strong>
            <Link to="/sign-in">Join us!</Link>
          </strong>
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

        <h3>A brief history.</h3>
        <p>
          This project budded in 2017 as an idea for a community publishing
          platform.
        </p>
        <p>
          Analog.Cafe got funded via Kickstarter on May 5<sup>th</sup>. The
          website went live on{" "}
          <Link to="/r/analog-cafe-e8tr">July 27, 2017</Link>. Today it’s
          maintained by <Link to="/u/dmitrizzle">Dmitri</Link> – hello! 👋
        </p>
        <p>
          My wife, <Link to="/u/betty">Betty</Link>, has been a tremendous help
          in setting the tone, quality, and consistency of the articles. None of
          this would make sense without her help and the fantastic people who
          supported me along this journey.
        </p>

        <p>
          Almost every image on this website is shot on film. There could be a
          book written on why we haven’t given up this medium. The gist: it
          comes with a unique look, process, and memories.{" "}
          <Link to="/r/a-beginners-guide-to-film-photography-zq0f">
            Give it a try
          </Link>{" "}
          if you haven’t already.
        </p>

        <h3>How to reach us.</h3>
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
                  rangefinder camera, manufactured in the mid-1950s. The camera
                  is uniquely-built, with a lot of thought and care put into the
                  manufacturing process.
                </span>
              ),
              buttons: [
                {
                  to: "/zine/vitessa-fzyi",
                  text: "Learn More"
                }
              ]
            },
            id: "hints/vitessa-l"
          }}
        >
          <Figure src="image-froth_1206996_r1CqlUwRm" />a
        </Modal>
      </ArticleSection>
    </ArticleWrapper>
  </Main>
);

const mapDispatchToProps = dispatch => {
  return {
    fetchAuthorsList: (options, page) => {
      // dispatch(fetchAuthorsList(options, page))
    }
  };
};
const mapStateToProps = state => {
  return {
    community: {
      authorsList: {
        items: []
      }
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);

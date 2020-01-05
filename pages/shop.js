import { NextSeo } from "next-seo";
import React from "react";

import { makeFroth } from "../utils/froth";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import CardButton from "../core/components/controls/Card/components/CardButton";
import CardCaption from "../core/components/controls/Card/components/CardCaption";
import CardColumns, {
  CardIntegratedForColumns,
} from "../core/components/controls/Card/components/CardColumns";
import CardFigure from "../core/components/controls/Card/components/CardFigure";
import CardHeader from "../core/components/controls/Card/components/CardHeader";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Link from "../core/components/controls/Link";
import Main from "../core/components/layouts/Main";

const Shop = props => {
  const seo = {
    title: "Shop",
    description:
      "Shop magazines, film, cameras, and more hand-picked items selected by Analog.Cafe magazine editors.",
    images: [
      {
        url: makeFroth({ src: "image-froth_4000000__1HY-WAi", size: "l" }).src,
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
      <Main>
        <ArticleWrapper>
          <HeaderLarge
            pageTitle={seo.title}
            pageSubtitle={"Hand-picked selections for Analog.Cafe readers"}
          />
          <ArticleSection>
            <p>
              <strong>
                ✪ <em>Note:</em>
              </strong>{" "}
              <em>
                not everything listed here can be bought direcly from
                Analog.Cafe. Most items are affiliate links to our vetted
                retailers. Everything listed here is tried, tested, and highly
                recommended – at no extra cost to you. All prices in USD.
              </em>
            </p>
            <CardColumns>
              <CardIntegratedForColumns>
                <CardHeader
                  buttons={[0]}
                  stubborn
                  noStar
                  title="PhotoKlassik Magazine"
                />
                <Link to="https://photoklassik-international.com/shop/ref/29/">
                  <CardFigure image="image-froth_1000000_Xnar7C0l" />
                </Link>
                <CardCaption>
                  <p>
                    PhotoKlassik is a one-of-a-kind magazine that reports
                    exclusively on film photography.
                  </p>

                  <p>
                    It’s released quarterly on 100 pages of thick photo paper.
                    Every run, currently at 10,000 copies per issue, is
                    professionally colour graded and bound at a reputable German
                    press facility.{" "}
                    <Link to="/r/photoklassik-international-quarterly-magazine-review-ycy3">
                      Read full review
                    </Link>
                    .
                  </p>

                  <p>
                    <strong>
                      You will be buying directly from PhotoKlassik website.
                    </strong>{" "}
                    There you’ll be able to select your issue or subscription
                    option.
                  </p>
                </CardCaption>
                <CardButton
                  branded
                  to="https://photoklassik-international.com/shop/ref/29/"
                >
                  Buy Magazine <small style={{ fontSize: ".5em" }}>from</small>{" "}
                  $20
                </CardButton>
              </CardIntegratedForColumns>
              <CardIntegratedForColumns>
                <CardHeader
                  buttons={[0]}
                  stubborn
                  noStar
                  title="Foldable Polaroid Triptych"
                />
                <Link to="https://www.etsy.com/ca/listing/758445219/one-of-a-kind-foldable-polaroid-mini-art">
                  <CardFigure image="image-froth_1333926_0fO8tEXE" />
                </Link>
                <CardCaption>
                  <p>
                    A mini art installation. Stunning and delicate in-person,
                    never to be duplicated.
                  </p>
                  <p>
                    The photographs are the original Polaroid prints. The
                    cardstock paper is hand-cut and folded to the original
                    design for maximum stability that the material would allow.
                  </p>
                  <p>
                    <strong>
                      You will be buying directly from Analog.Cafe through our
                      Etsy store, “FilmBase.”
                    </strong>
                  </p>
                </CardCaption>
                <CardButton
                  branded
                  to="https://www.etsy.com/ca/listing/758445219/one-of-a-kind-foldable-polaroid-mini-art"
                >
                  Foldable Polaroid Triptych $46
                </CardButton>
              </CardIntegratedForColumns>
            </CardColumns>
            <CardColumns>
              <CardIntegratedForColumns>
                <CardHeader
                  buttons={[0]}
                  stubborn
                  noStar
                  title="Polaroid OneStep Express, Film Tested"
                />
                <Link to="https://www.etsy.com/ca/listing/721087168/polaroid-onestep-express-film-tested">
                  <CardFigure image="image-froth_1078072_ninBOGFq" />
                </Link>
                <CardCaption>
                  <p>
                    Film tested, in great working condition, this is a Polaroid
                    OneStep Express camera that takes Polaroid Originals 600
                    film. This is one of the best ways to get into Polaroid film
                    photography.
                  </p>
                  <p>
                    <strong>
                      You will be buying directly from Analog.Cafe through our
                      Etsy store, “FilmBase.”
                    </strong>
                  </p>
                </CardCaption>
                <CardButton
                  branded
                  to="https://www.etsy.com/ca/listing/721087168/polaroid-onestep-express-film-tested"
                >
                  Buy Polaroid OneStep $54
                </CardButton>
              </CardIntegratedForColumns>

              <CardIntegratedForColumns style={{ opacity: 0 }} />
            </CardColumns>
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
};

export default Shop;

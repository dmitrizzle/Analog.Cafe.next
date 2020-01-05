import { NextSeo } from "next-seo";
import React from "react";

import { SHOP_INVENTORY } from "../core/components/pages/Shop/constants";
import { makeFroth } from "../utils/froth";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import CardButton from "../core/components/controls/Card/components/CardButton";
import CardCaption from "../core/components/controls/Card/components/CardCaption";
import CardFigure from "../core/components/controls/Card/components/CardFigure";
import CardHeader from "../core/components/controls/Card/components/CardHeader";
import CardMason, {
  CardIntegratedForMason,
} from "../core/components/controls/Card/components/CardMason";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Link from "../core/components/controls/Link";
import Main from "../core/components/layouts/Main";
import Modal from "../core/components/controls/Modal";

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
                most items here are curated selections from our vetted community
                retailers. Clicking them will take you{" "}
                <Modal
                  with={{
                    info: {
                      title: "Referral Product Links",
                      text:
                        "Analog.Cafe made a few direct relationships with small businesses that create quality products and services for people like you. If you choose to purchase, a small percentage of a sale will come back to Analog.Cafe. Your support is appreciated!",
                    },
                    id: "help/affiliate",
                  }}
                >
                  directly
                </Modal>{" "}
                to their store – at no extra cost to you. Everything listed here
                is tested and highly recommended. All prices are in USD.
              </em>
            </p>
            <CardMason style={{ paddingTop: "1.5em" }}>
              {SHOP_INVENTORY.map(product => (
                <CardIntegratedForMason>
                  <CardHeader
                    key={product.referral}
                    buttons={[0]}
                    stubborn
                    noStar
                    title={product.title}
                  />
                  <Link to={product.referral}>
                    <CardFigure image={product.poster} />
                  </Link>
                  <CardCaption>{product.description}</CardCaption>
                  {product.buttons.map(button => (
                    <CardButton
                      to={
                        button.to === "REFERRAL" ? product.referral : button.to
                      }
                      branded={button.to === "REFERRAL" || button.branded}
                    >
                      {button.text}
                    </CardButton>
                  ))}
                </CardIntegratedForMason>
              ))}
            </CardMason>
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
};

export default Shop;

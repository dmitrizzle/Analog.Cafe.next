import React from "react";
import styled from "styled-components";

import { UnorderedList } from "../../../../../core/components/pages/Article/components/ArticleSection";
import Link from "../../../../../core/components/controls/Link";
import Modal from "../../../../../core/components/controls/Modal";

const FeatureList = styled(UnorderedList)`
  max-width: 18em;
  margin: 0 auto 3em !important;
`;

export default () => (
  <FeatureList>
    <li>
      Access Free{" "}
      <Modal
        element="a"
        with={{
          info: {
            image: "image-froth_1600000_Syhl_hUlS",
            title: "Free PDF Downloads",
            text:
              "Download anything you like from our collection of articles and guides on film photography techniques and theory.",
            buttons: [
              {
                to: "/links-and-downloads",
                text: "Links & Downloads",
              },
            ],
          },
          id: "help/downloads",
        }}
      >
        downloads
      </Modal>
      .
    </li>
    <li>
      Monthly community{" "}
      <Modal
        element="a"
        with={{
          info: {
            image: "image-froth_1600000_HkIXPnUer",
            title: "Monthly Community Letters",
            text: (
              <span>
                A monthly summary of the latest events in film photography
                community with a personal touch from Analog.Cafe’s{" "}
                <Link to="/u/dmitrizzle">managing editor</Link>.
              </span>
            ),
            buttons: [
              {
                to: "/privacy-policy",
                text: "Privacy Policy",
              },
              {
                to: "/editorials",
                text: "Browse Community Letters",
              },
            ],
          },
          id: "help/letter",
        }}
      >
        letters
      </Modal>
      .
    </li>
    <li>
      Exclusive{" "}
      <Modal
        element="a"
        with={{
          info: {
            title: "Offers and Discounts",
            text:
              "Deals on film & cameras from Analog.Cafe editorial staff and our partners in crime!",
          },
          id: "help/offers-and-discounts",
        }}
      >
        offers and discounts
      </Modal>
      .
    </li>
    <li>
      +
      <Modal
        element="a"
        unmarked
        with={{
          info: {
            title: "Analog.Cafe Account Features",
            text: (
              <div>
                <UnorderedList style={{ paddingLeft: "1em" }}>
                  <li>Free downloads.</li>
                  <li>Monthly community letters.</li>
                  <li>Exclusive offers and discounts.</li>
                </UnorderedList>
                <br />
                <strong>Plus:</strong>
                <UnorderedList style={{ paddingLeft: "1em" }}>
                  <li>Save your favourite reads for later.</li>
                  <li>
                    Promote your website, social, or contact info with a{" "}
                    <Link to="/u/dmitrizzle">public profile</Link> on
                    Analog.Cafe.
                  </li>
                  <li>
                    <Link to="/submit">Submit</Link> your work and get featured.
                  </li>
                </UnorderedList>
              </div>
            ),
            id: "help/all-account-features",
          },
        }}
      >
        more
      </Modal>
      .
    </li>
  </FeatureList>
);

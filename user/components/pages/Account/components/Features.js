import React from "react";
import styled from "styled-components";

import { UnorderedList } from "../../../../../core/components/pages/Article/components/ArticleSection";
import Link from "../../../../../core/components/controls/Link";
import Modal from "../../../../../core/components/controls/Modal";

const FeatureList = styled(UnorderedList)`
  font-size: 0.8em;
  font-style: italic;
`;

const Features = () => (
  <FeatureList>
    <li>
      <Modal
        element="a"
        with={{
          info: {
            image: "image-froth_1600000_Syhl_hUlS",
            title: "Free PDF Downloads",
            text:
              "Download anything you like and use our collection of growing apps and guides on film photography techniques and theory.",
            buttons: [
              {
                to: "/apps-and-downloads",
                text: "Apps and Downloads",
              },
            ],
          },
          id: "help/downloads",
        }}
      >
        Downloads
      </Modal>
    </li>
    <li>
      <Modal
        element="a"
        with={{
          info: {
            image: "image-froth_1600000_rv1Kd1ty",
            title: "Community Letters 🎞",
            text: (
              <>
                <p style={{ paddingBottom: "1.5em" }}>
                  <strong>
                    Science, history, art, film, and cameras: monthly news from
                    the film photography community.
                  </strong>{" "}
                  Summarized by Analog.Cafe’s managing editor,{" "}
                  <Link to="/u/dmitrizzle">Dmitri</Link>.
                </p>
                <p>Get it first on the last Tuesday of every month.</p>
              </>
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
        Community Letters
      </Modal>
    </li>
    <li>
      <Modal
        element="a"
        with={{
          info: {
            title: "Account Features",
            text: (
              <div>
                <UnorderedList style={{ paddingLeft: "1em" }}>
                  <li>Free downloads.</li>
                  <li>Monthly Community Letters.</li>
                  <li>Exclusive offers and discounts.</li>
                  <li>
                    Save your favourite reads for later with{" "}
                    <strong>Bookmarks</strong>.
                  </li>
                  <li>
                    <Link to="/write">Submit</Link> your work and get featured.
                  </li>
                </UnorderedList>
              </div>
            ),
            id: "help/all-account-features",
            buttons: [
              {
                to: "/r/your-account-racl",
                text: "Learn More",
              },
            ],
          },
        }}
      >
        + More
      </Modal>
    </li>
  </FeatureList>
);

export default Features;

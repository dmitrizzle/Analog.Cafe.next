import React from "react";
import styled from "styled-components";

import { UnorderedList } from "../../../../../core/components/pages/Article/components/ArticleSection";
import Link from "../../../../../core/components/controls/Link";
import Modal from "../../../../../core/components/controls/Modal";

const FeatureList = styled(UnorderedList)`
  font-size: 0.8em;
  font-style: italic;
`;

export default () => (
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
      .
    </li>
    <li>
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
        Community Letters Monthly
      </Modal>
      .
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
                  <li>Save your favourite reads for later.</li>
                  <li>
                    Promote your website, social, or contact info with a{" "}
                    <Link to="/u/dmitrizzle">public profile</Link> on
                    Analog.Cafe.
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
        And all of this
      </Modal>
      .
    </li>
  </FeatureList>
);

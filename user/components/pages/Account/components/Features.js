import React from "react";
import styled from "styled-components";

import { UnorderedList } from "../../../../../core/components/pages/Article/components/ArticleSection";
import {
  b_laptop,
  b_mobile,
} from "../../../../../constants/styles/measurements";
import Link from "../../../../../core/components/controls/Link";
import Modal from "../../../../../core/components/controls/Modal";

const FeatureList = styled(UnorderedList)`
  max-width: 18em;
  margin: 0 auto 3em !important;
`;

export default () => (
  <FeatureList>
    <li>
      Free{" "}
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
                to: "/features",
                text: "Downloads & Features",
              },
            ],
          },
          id: "hints/downloads",
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
            title: "Monthly Community Newsletter",
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
                to: "/r/june-19-community-letter-qi48",
                text: "Read June ‘19 Community Letter",
              },
            ],
          },
          id: "hints/newsletter",
        }}
      >
        newsletter
      </Modal>
      .
    </li>
    <li>
      Submit your work and get{" "}
      <Modal
        element="a"
        with={{
          info: {
            image: "image-froth_1499794_BkFUA89IV",
            title: "Call for Entries",
            text:
              "Submit your film photography with 200+ words on any topic. No fees, no deadlines, super-easy & fast. Free editorial reviews (to make you sound good) and a rapidly growing readership.",
            buttons: [
              {
                to: "/submit",
                text: "Submissions Overview",
              },
            ],
          },
          id: "hints/submissions",
        }}
      >
        featured
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
                  <li>Monthly community newsletter.</li>
                  <li>Submit your work and get featured.</li>
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
                  <li>Apps & exclusive deals comming soon.</li>
                </UnorderedList>
              </div>
            ),
            id: "hints/all-account-features",
          },
        }}
      >
        more
      </Modal>
      .
    </li>
  </FeatureList>
);

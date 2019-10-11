import styled from "styled-components";

import { b_laptop } from "../../../../../constants/styles/measurements";
import {
  c_black,
  c_red,
  c_white,
} from "../../../../../constants/styles/colors";
import { title } from "../../../../../constants/styles/typography";

export default styled.article`
  overflow-x: hidden;

  @media print {
    width: 100%;
    margin: 0;
    float: none;
    figure,
    h3,
    blockquote {
      page-break-inside: avoid;
      page-break-after: avoid;
    }
    figure {
      > div {
        padding: 0;
        height: auto !important;
        picture {
          max-height: 45em;
          overflow: hidden;
          position: relative !important;
          source,
          img {
            width: 100%;
          }
        }
      }
    }
    p {
      font-size: 0.85em;
      line-height: 1.5em;
    }
  }

  a.article-coffee-header {
    display: block;
    text-decoration: none;
    background: ${c_red};
    position: relative;
    margin: -8px 0 0;
    z-index: 11;

    @media (min-width: ${b_laptop}) {
      margin-bottom: -1em;
    }

    :active,
    :visited {
      background: ${c_black} !important;
    }

    > div {
      ${title}
      padding: 0.5em;
      color: ${c_white};
      text-align: center;
    }
  }
`;

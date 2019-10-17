import styled from "styled-components";

import { c_black, c_white } from "../../../../../constants/styles/colors";
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
`;

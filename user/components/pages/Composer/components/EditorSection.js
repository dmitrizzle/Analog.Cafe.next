import styled from "styled-components";

import { b_phablet } from "../../../../../constants/styles/measurements";
import { title } from "../../../../../constants/styles/typography";
import ArticleSection from "../../../../../core/components/pages/Article/components/ArticleSection";

export default styled(ArticleSection)`
  .fpe-menu {
    z-index: 21;
    margin-left: 3.25em;
    ::after {
      margin-left: calc(50% - 3.25em);
    }
    &:active::after {
      margin-top: -5px;
    }
    @media (max-width: ${b_phablet}) {
      margin-left: 5em !important;
      ::after {
        margin-left: calc(50% - 5em) !important;
      }
    }
  }
  button,
  .fpe-menu button {
    ${title}
    letter-spacing: 0.025em;
    line-height: 1.75em;
    margin: 0;

    background: ${({ theme }) => theme.brand};
    color: ${({ theme }) => theme.bg};
    padding: 0.1em 0.45em 0.15em;
  }
  button:active,
  button.active {
    background: ${({ theme }) => theme.fg};
  }

  .fpe-unquote {
    top: 3em;
    right: 0.5em;
  }
  .fpe-undo-heading {
    border-radius: 0.25em;
    margin-left: -6em !important;
  }
`;

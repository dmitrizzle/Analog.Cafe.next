import styled from "styled-components";

import { c_red, c_white } from "../../../../../constants/styles/colors";
import { title } from "../../../../../constants/styles/typography";
import ArticleSection from "../../../../../core/components/pages/Article/components/ArticleSection";

export default styled(ArticleSection)`
  .fpe-menu {
    z-index: 21;
  }
  button,
  .fpe-menu button {
    ${title}
    letter-spacing: 0.025em;
    line-height: 1.75em;
    margin: 0;

    background: ${c_red};
    color: ${c_white};
    padding: 0.1em 0.45em 0.15em;
  }
  button:active,
  button.active {
  }

  .fpe-unquote {
    top: 3em;
    right: 0.5em;
  }
`;

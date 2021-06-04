import styled from "styled-components";

import { makeFroth } from "../../../../../utils/froth";

const Placeholder = styled.div`
  padding-bottom: ${({ frothId }) =>
    makeFroth({ src: frothId }).ratio
      ? Math.round(100 / makeFroth({ src: frothId }).ratio, 3)
      : 0}%;
  background: ${({ theme }) => theme.grey_light};
  height: ${({ frothId }) =>
    makeFroth({ src: frothId }).ratio ? "0 !important" : "initial"};
  position: relative !important;
  display: ${({ frothId, preserve }) =>
    !preserve && (frothId ? "block" : "none")};

  & > :first-child {
    width: 100%;
    height: ${({ frothId }) =>
      makeFroth({ src: frothId }).ratio ? "100%" : "initial"};
    display: block;
    position: ${({ frothId }) =>
      makeFroth({ src: frothId }).ratio ? "absolute" : "static"};
  }
`;

export default Placeholder;

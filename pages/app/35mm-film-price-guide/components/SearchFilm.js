import styled from "styled-components";

import { c_grey_med } from "../../../../constants/styles/colors";
import { headerTitleStyles } from "../../../../core/components/vignettes/HeaderLarge/components/HeaderTitle";
import { reset } from "../../../../user/components/forms/SubtitleInput";

export default styled.input`
  ${reset};
  ${headerTitleStyles};
  padding: 0.5em 0 0.15em;
  border-bottom: 1px solid ${c_grey_med};
  margin-bottom: 0.5em;
`;

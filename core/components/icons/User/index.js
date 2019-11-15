import { connect } from "react-redux";
import styled, { css } from "styled-components";

import {
  c_black,
  c_red,
  c_grey_light,
} from "../../../../constants/styles/colors";
import { makeFroth } from "../../../../utils/froth";

const Icon = styled.div`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 1em;
  background: ${c_red};
  background-size: cover;
  margin: 0 0 0 0.15em;
  box-shadow: 0 0 0 1px ${c_grey_light}, 0 0 0 2px ${c_black};
  ${props =>
    props.user.status === "ok" &&
    props.user.info &&
    props.user.info.image &&
    css`
      background-image: url(${makeFroth({
        src: props.user.info.image,
        size: "i",
      }).src});
    `}
`;

// redux to be connected on client side for favourites button
const mapStateToProps = ({ user }) => {
  return { user };
};
export default connect(
  mapStateToProps,
  null
)(Icon);

import styled from "styled-components";

export default styled.li`
  display: block;
  text-align: center;
  width: 10em;

  ${props => props.mobile && `display: none`};
  ${props => props.narrow && `display: none`};

  @media (max-width: 48em) {
    ${props => !props.prime && `display: none`};
    ${props => props.mobile && `display: block`};

    ${props => props.prime && props.center && `order: 1`};
    ${props => props.prime && props.left && `order: 0`};
    ${props => props.prime && props.right && `order: 2`};
  }
  @media (max-width: 1080px) {
    width: 8em;
    ${props => props.wide && `display: none`};
    ${props => props.narrow && `display: inline`};
  }
`;

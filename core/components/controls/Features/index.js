import styled from "styled-components";

import { title } from "../../../../constants/styles/typography";
import {
  c_white,
  c_black_a5,
  c_grey_light,
} from "../../../../constants/styles/colors";
import {
  m_radius,
  m_radius_sm,
  b_tablet,
} from "../../../../constants/styles/measurements";
import { makeFroth } from "../../../../utils/froth";
import Link from "../Link";

const Wall = styled.div`
  height: 17em; /* this allows better position for scrollbars */
  margin-bottom: 0.5em;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
`;
const Poster = styled(Link)`
  position: relative;
  display: block;
  overflow: hidden;

  width: 10em;
  height: 16em;
  background: ${c_grey_light};
  margin-left: 1em;
  flex-shrink: 0;

  background-size: cover !important;
  background-position: center !important;
  border-radius: ${m_radius};
  @media (min-width: ${b_tablet}) {
    border-radius: ${m_radius_sm};
  }

  &:first-child {
    margin-left: 1.5em;
  }

  h4 {
    ${title}
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.5em;
    text-align: right;
    color: ${c_white};

    background: ${c_black_a5};
    box-shadow: 0 0 4em 4em ${c_black_a5};
  }
`;
const Spacer = styled.div`
  height: 16em;
  width: 1.5em;
  flex-shrink: 0;
`;

export default ({ listFeatures }) => {
  return (
    <Wall>
      {listFeatures.items.map(item => {
        return (
          <Poster
            key={item.id}
            to={`/r/${item.slug}`}
            style={{
              backgroundImage: `url(${
                makeFroth({
                  src: item.poster,
                  size: "m",
                }).src
              })`,
            }}
          >
            <h4>{item.title}</h4>
          </Poster>
        );
      })}
      <Spacer />
    </Wall>
  );
};
import styled from "styled-components";

import {title} from "../../../../constants/styles/typography"
import {c_white} from "../../../../constants/styles/colors"
import { makeFroth } from "../../../../utils/froth";
import Link from "../Link"


const Wall = styled.div`
  height: 16em;
  margin-bottom: 1.5em;
  display: flex;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
`;
const Poster = styled(Link)`
  position: relative;
  display: block;

  width: 10em;
  height: 16em;
  background: #eee;
  border-radius: 0.25em;
  margin-left: 1em;
  flex-shrink: 0;
  background-size: cover !important;
  background-position: center !important;

  &:first-child {
    margin-left: 1.5em;
  }

  h4 {
    ${title}
    position: absolute;
    bottom: 0;
    right: 0;
    padding: .5em;
    text-align: right;
    color: ${c_white};
  }
`;
const Spacer = styled.div`
  height: 16em;
  width: 1.5em;
  flex-shrink: 0;
`;

export default () => (
  <Wall>
    <Poster to="/r/where-to-develop-film-in-vancouver-qrww" style={{backgroundImage: `url(${makeFroth({
      src: "image-froth_1502233_rk5xNfD-H",
      size: "m",
    }).src})`}}><h4>Where to Develop Film in Vancouver</h4></Poster>
    <Poster to="/r/june-19-community-letter-qi48" style={{backgroundImage:`url(${makeFroth({
      src: "image-froth_1424197_HkHi_M4-r",
      size: "m",
    }).src})`}}><h4>June ‘19 Community Letter</h4></Poster>
    <Poster to="/r/the-monobath-experience-ynpg" style={{backgroundImage:`url(${makeFroth({
      src: "image-froth_1586967_ryAWgQxA4",
      size: "m",
    }).src})`}} ><h4>The Monobath Experience</h4></Poster>
    <Poster to="/r/film-photography-costs-and-prices-kd5j" style={{backgroundImage:`url(${makeFroth({
      src: "image-froth_1523727_SJoQ3JD9X",
      size: "m"
    }).src})`}}><h4>Film Photography Costs and Prices</h4></Poster>
    <Poster />
    <Poster />
    <Poster />
    <Spacer />
  </Wall>
);

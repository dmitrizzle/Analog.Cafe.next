import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import styled, { css } from "styled-components";

import {
  b_laptop,
  b_mobile,
  b_movie,
  b_tablet,
  m_radius_sm,
  m_column
} from "../../../../../constants/styles/measurements";
import {
  c_black,
  c_grey_light,
  c_grey_med,
  c_white
} from "../../../../../constants/styles/colors";
import ZigZag from "../../../icons/ZigZag";

// import { sectionTitle } from "../../Article/components/ArticleSection"
// import { subtitleStyles } from "../../../vignettes/HeaderLarge/components/HeaderSubtitle"

const sectionTitle = ``;
const subtitleStyles = ``;

// change colour of mask if changing website background color:
const zigZagSVG = encodeURIComponent(
  renderToStaticMarkup(<ZigZag fill={c_white} />)
);
const zigZagDataUri = `url("data:image/svg+xml,${zigZagSVG}")`;

const posterDimensions = css`
  width: 5.5em;
  height: 9.33em;
`;
const zigzagWidthShim = css`
  width: calc(33% + 0px);
`;
const zigzagFill = css`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
`;
const zigzagDimensions = css`
  ${zigzagWidthShim} ${zigzagFill} display: block;
  content: "";
  z-index: 10;
  pointer-events: none;
  @media (max-width: ${b_laptop}) {
    display: none !important;
  }
`;

export default styled.ul`
	${
    "" /* ${props =>
    props.status === "loading" && `opacity: ` + props.theme.opacity.least + `;`} */
  }

    ${
      "" /* ${props => props.status === "loading" && props.author && `opacity: 0;`} */
    }


	position: 			relative;
	max-width: 			${b_movie};
	margin: 				0 auto;
	padding: 				0;
	&::after {
		${zigzagDimensions}
		background-size: 		4em 16em;
		background-image: 	${zigZagDataUri};
		background-repeat: 	repeat-y;
	}
	li {
		display: 			block;
		list-style: 	none;
		overflow: 		hidden;
		position: 		relative;

		& > a {
			display: 					flex;
			width: 						100%;
			text-decoration: 	none;

			&:active {
				background: 0 0;
				section figure {
					box-shadow:	none;
					border-bottom-color: #000;
				}
        > div {
            box-shadow: -8px 0px 0 0px #000 inset;
        }
			}
		}
		section {
			position: 				relative;
      width:            100%;
			max-width: 				61.5%;
			padding: 					calc(1em * 6) 1.5em 1em 1.5em;

      @media(max-width: ${b_laptop}){
        max-width: 	100% !important;
        overflow: 	hidden;
        padding-top: calc(1.5em * 3);

      }
			& > figure {
				${posterDimensions}
        @media(max-width: ${b_mobile}){ width: 100%; }

				float: 			left;
				margin: 		0 1em 0 0;
				overflow:		hidden;

				${"" /* styles borrowed from Picture component */}
				box-shadow: 0 0 .5em rgba(44,44,44,.125);

        @media(max-width: ${b_tablet}){
          border-radius:	${m_radius_sm};
          margin-top: calc(1em / 2 + 0.1em);
          margin-bottom: 0;
        }
				& > div {
					width: 								100%;
					height: 							100%;
					z-index: 							-1;
					position: 						relative;
					background-size: 			cover;
					background-position: 	center;
				}
				background-color: ${c_grey_light};
				border-bottom: 8px solid ${c_black}
			}
			h2 {
				${sectionTitle}
        ${props => props.status === "loading" && `color: ${c_grey_med};`}
        padding: 0;
        margin: 0
			}
      h3 {
        ${subtitleStyles}
        ${props => props.status === "loading" && `color: ${c_grey_light};`}
        font-size: 1.15em;
      }
			${props => props.status === "loading" && `word-break: break-all;`}
			& > div {
				float: left;
        width: calc(100% - 6.5em);
        max-width: ${m_column};

        @media(max-width: ${b_laptop}){
          min-width: 280px;
        }

        & > div {
          padding-top: .35em;
        }
			}

		}
	}
	&:first-child li:first-child {
		padding-top: ${props => (props.author ? 17 : 12)}em;
		:before { display: none; }
	}
`;

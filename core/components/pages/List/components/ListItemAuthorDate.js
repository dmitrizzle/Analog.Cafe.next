import React from "react";
import styled from "styled-components";

import {
  c_black,
  c_red,
  c_white,
} from "../../../../../constants/styles/colors";
import { getAuthorListStringFromArray } from "../../../../../utils/author-credits";
import { getHumanDatestamp } from "../../../../../utils/time";

export const AuthorAndDate = styled.em`
  line-height: 1em;
  display: block;
  & > small {
    display: inline-block;
  }
`;

export const Sticker = styled.span`
  background: ${props => (props.inverse ? c_black : c_red)};
  color: ${props => c_white};
  padding: 0.25em;
  display: inline-block;
  margin-top: 0.25em;
  font-size: 0.8em;
`;

export default props => (
  <AuthorAndDate>
    {!props.private || props.isAdmin
      ? `${
          props.item.type !== "placeholder" ? "By " : ""
        }${getAuthorListStringFromArray(props.item.authors, {
          trim: true,
        })} `
      : null}
    {props.item.type !== "placeholder" && (
      <React.Fragment>
        <small style={{ opacity: 0.35 }}>
          {getHumanDatestamp(props.item.date.published, true)}
        </small>{" "}
        {(props.isNew || props.isNewlyEdited) && !props.read && (
          <Sticker
            inverse={props.isOldAndNewlyEdited}
            title={getHumanDatestamp(props.item.date.updated)}
          >
            <em>{props.isOldAndNewlyEdited ? "Recently updated" : "New!"}</em>
          </Sticker>
        )}
      </React.Fragment>
    )}
  </AuthorAndDate>
);

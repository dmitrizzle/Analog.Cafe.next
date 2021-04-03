import React from "react";
import styled from "styled-components";

import { b_phablet } from "../../../constants/styles/measurements";
import { c_white } from "../../../constants/styles/themes";
import { headerTitleStyles } from "../../../core/components/vignettes/HeaderLarge/components/HeaderTitle";
import { reset } from "../../../user/components/forms/SubtitleInput";
import Link from "../../../core/components/controls/Link";

const SearchField = styled.input`
  ${reset};
  ${headerTitleStyles};
  padding: 0.05em 0 0.15em;
  border-bottom: 1px solid ${({ theme }) => theme.grey_med};
  margin-bottom: 0.5em;

  -webkit-appearance: none;

  padding-left: 0.25em;
  border-radius: 0.075em;
  background: rgb(44, 44, 44, 0.85);

  color: ${c_white};

  ::placeholder {
    @media (max-width: ${b_phablet}) {
      font-size: 0.75em;
    }
    @media (max-width: 430px) {
      font-size: 0.5em;
    }
  }
`;
const Cancel = styled(Link)`
  ${headerTitleStyles};
  display: ${props => (props.hidden ? "none" : "block")};
  text-decoration: none;
  width: 1em;
  height: calc(1em + 1px);
  position: absolute;
  top: 0;
  right: 0;
  font-size: 2em;
  background: ${({ theme }) => theme.bg};
  padding: 0.5em;
  text-align: center;
  border-radius: 0 0.1em 0.1em 0;
  line-height: 1em;
`;
const Wrapper = styled.form`
  position: relative;
`;

const SearchFilm = props => {
  return (
    <Wrapper
      onSubmit={event => {
        event.preventDefault();
        document.getElementById("input-search-film").blur();
      }}
    >
      <SearchField {...props} id="input-search-film" type="search" />
      <Cancel
        to="#cancel"
        hidden={props.value === ""}
        onClick={event => {
          event.preventDefault();
          props.setFilmSearchTerm("");
        }}
      >
        ✕
      </Cancel>
    </Wrapper>
  );
};

export default SearchFilm;

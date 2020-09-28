import React, { useState, useEffect } from "react";
import Router from "next/router";

import Button from "../../Button";
import Form from "../../../../../user/components/forms/Form";
import Search from "../../../icons/Search";
import SearchButtonIcon from "./SearchButtonIcon";
import SearchInput from "./SearchInput";
import Spinner from "../../../icons/Spinner";
import ga from "../../../../../utils/data/ga";

const SearchForm = props => {
  const [query, setQuery] = useState("");
  const [warning, setWarning] = useState(false);

  const handleSearchChange = event => {
    setQuery(event.target.value || "");
    setWarning(false);
    props.searchText(event.target.value);
  };

  const handleSubmit = event => {
    event.stopPropagation();
    event.preventDefault();
    if (props.searchOnly) {
      Router.router.push(`/nav/search?for=${query}`);
    }
    props.submitCallback && props.submitCallback(query);
    !props.searchOnly && ga("pageview", { url: `/nav/search?for=${query}` });
  };

  const handleInputClick = event => {
    event.stopPropagation();
  };
  useEffect(() => {
    const term = Router.router?.query?.for;
    if (Router.router?.query?.for) {
      props.submitCallback(term);
      props.searchText(props.searchOnly && Router.router?.query?.for);
    }
  }, [Router.router?.query]);

  return (
    <Form style={props.style || null} withinGroup={props.withinGroup}>
      <SearchInput
        onChange={handleSearchChange}
        value={props.searhTextValue}
        warning={warning}
        autoFocus={props.autoFocus}
        onClick={handleInputClick}
        searchOnly={props.searchOnly}
      >
        <Spinner style={props.loading ? null : { width: 0 }} />
      </SearchInput>
      {(props.searchOnly || query) && (
        <Button branded style={{ fontSize: "1em" }} onClick={handleSubmit}>
          {props.searchOnly ? "Search Analog.Cafe" : "Find More Results"}{" "}
          <SearchButtonIcon inverse>
            <Search />
          </SearchButtonIcon>
        </Button>
      )}
    </Form>
  );
};

export default SearchForm;

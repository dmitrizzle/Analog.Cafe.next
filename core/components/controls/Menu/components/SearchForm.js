import React, { useState } from "react";

import Button from "../../Button";
import Form from "../../../../../user/components/forms/Form";
import Search from "../../../icons/Search";
import SearchButtonIcon from "./SearchButtonIcon";
import SearchInput from "./SearchInput";
import Spinner from "../../../icons/Spinner";
import ga from "../../../../../utils/data/ga";

export default props => {
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
    props.submitCallback && props.submitCallback(query);
    ga("pageview", { url: `/nav/search?for=${query}` });
  };

  const handleInputClick = event => {
    event.stopPropagation();
  };

  return (
    <Form style={props.style || null} withinGroup={props.withinGroup}>
      <SearchInput
        onChange={handleSearchChange}
        value={props.searhTextValue}
        warning={warning}
        autoFocus={props.autoFocus}
        onClick={handleInputClick}
      >
        <Spinner style={props.loading ? null : { width: 0 }} />
      </SearchInput>
      {query && (
        <Button branded style={{ fontSize: "1em" }} onClick={handleSubmit}>
          Find More Results{" "}
          <SearchButtonIcon inverse>
            <Search />
          </SearchButtonIcon>
        </Button>
      )}
    </Form>
  );
};

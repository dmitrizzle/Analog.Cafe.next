import React, { useState } from "react";

import ga from "../../../../../utils/data/ga";
import Button from "../../Button";
import Form from "../../../../../user/components/forms/Form";
import SearchInput from "./SearchInput";
import Spinner from "../../../icons/Spinner";

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
    ga("modalview", { url: `/search?for=${query}` });
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
          More Results ⏎
        </Button>
      )}
    </Form>
  );
};
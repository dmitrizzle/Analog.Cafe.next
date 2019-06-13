import React, { useState } from "react";

import Button from "../../Button";
import Form from "../../../../../user/components/forms/Form";
import Search from "../../../icons/Search";
import SearchButtonIcon from "./SearchButtonIcon";
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
    // GA.modalview(`/search?for=${this.state.query}`)
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
      />
      <Button style={{ fontSize: "1em" }} branded onClick={handleSubmit}>
        <SearchButtonIcon inverse>
          Search <Spinner style={props.loading ? null : { width: 0 }} />
          <Search
            style={
              !props.loading
                ? { transition: "width 250ms" }
                : { width: 0, transition: "width 250ms" }
            }
          />
        </SearchButtonIcon>
      </Button>
    </Form>
  );
};

import React from "react";

import Button from "../../Button";
import Form from "../../../../../user/components/forms/Form";
import Search from "../../../icons/Search";
import SearchButtonIcon from "./SearchButtonIcon";
import SearchInput from "./SearchInput";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      warning: false
    };
  }
  handleSearchChange = event => {
    this.setState({ query: event.target.value || "", warning: false });
    this.props.searchText(event.target.value);
  };
  handleSubmit = event => {
    event.stopPropagation();
    event.preventDefault();
    this.props.submitCallback && this.props.submitCallback(this.state.query);
    // GA.modalview(`/search?for=${this.state.query}`)
  };
  handleInputClick = event => {
    event.stopPropagation();
  };
  render = () => {
    return (
      <Form
        style={this.props.style || null}
        withinGroup={this.props.withinGroup}
      >
        <SearchInput
          onChange={this.handleSearchChange}
          value={this.props.searhTextValue}
          warning={this.state.warning}
          autoFocus={this.props.autoFocus}
          onClick={this.handleInputClick}
        />
        <Button
          style={{ fontSize: "1em" }}
          branded
          onClick={event => {
            this.handleSubmit(event);
          }}
          loading={this.props.loading}
        >
          <SearchButtonIcon inverse>
            Search <Search />
          </SearchButtonIcon>
        </Button>
      </Form>
    );
  };
}

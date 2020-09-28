import React from "react";

import SubtitleInput from "../../../../../user/components/forms/SubtitleInput";

const SearchInput = props => {
  return (
    <SubtitleInput
      data-cy="NavSearch"
      placeholder={props.searchOnly ? "Keywords…" : "Search…"}
      onChange={props.onChange}
      onClick={props.onClick}
      required
      autoFocus={props.autoFocus}
      maxLength="600"
      warning={props.warning}
      type="text"
      value={props.value}
      title="Type your keywords and hit Enter"
    />
  );
};

export default SearchInput;

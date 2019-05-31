import { connect } from "react-redux";
import { withRouter } from "next/router";
import React from "react";

import { MENU_BUTTONS } from "./constants";
import { getSearchResults } from "../../../store/actions-search";
import { setModal } from "../../../store/actions-modal";
import ButtonGroupDivider from "../../controls/Button/components/ButtonGroupDivider";
import CardButton from "../../controls/Card/components/CardButton";
import CardSearchItem from "../Card/components/CardSearchItem";
import SearchForm from "./components/SearchForm";

const iconStyles = { height: ".75em", paddingBottom: ".15em" };

export class Search extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchForm: false,
      hideSearchResults: false,
      searchText: "",
    };
  }
  handleSubmitCallback = query => {
    this.props.getSearchResults(query);
  };
  handleClearSearch = event => {
    event.stopPropagation();
    this.props.getSearchResults("");
    this.setState({ searchText: "" });
  };
  handleSearchText = text => {
    this.props.searchText(text);
    text === ""
      ? this.setState({ hideSearchResults: true, searchText: text })
      : this.setState({ hideSearchResults: false, searchText: text });
  };
  render = () => {
    const haveSearchResults =
      !this.state.hideSearchResults &&
      this.props.search.data.items &&
      this.props.search.data.items.length > 0;

    const isNotFound =
      this.props.search.data.queries.request &&
      this.props.search.data.queries.request[0].searchTerms &&
      this.props.search.data.queries.request[0].searchTerms.length > 1;

    const isInstantSearch =
      this.state.searchText !== "" && !haveSearchResults && !isNotFound;

    return (
      <>
        <SearchForm
          formLocation={this.props.formLocation}
          autoFocus={"ontouchstart" in document.documentElement ? false : true}
          submitCallback={this.handleSubmitCallback}
          searchText={this.handleSearchText}
          searhTextValue={this.state.searchText}
          loading={this.props.search.isFetching}
          style={{ zIndex: 1, position: "relative" }}
        />
        {(haveSearchResults || isNotFound) && (
          <CardButton inverse onClick={this.handleClearSearch}>
            Clear ✕
          </CardButton>
        )}
        <>
          {haveSearchResults &&
            this.props.search.data.items.map(item => (
              <React.Fragment key={item.link}>
                <CardSearchItem
                  to={item.link}
                  image={
                    item.pagemap.cse_image
                      ? item.pagemap.cse_image[0].src
                      : null
                  }
                >
                  <div>{item.title}</div>
                  <em>{item.snippet}</em>
                </CardSearchItem>
                <ButtonGroupDivider
                  style={{ zIndex: 1, position: "relative" }}
                />
              </React.Fragment>
            ))}
          {isNotFound && !this.props.search.data.items && (
            <>
              <CardSearchItem to="/subscribe">
                <div>Not Found</div>
                <em>
                  We publish new content every week. <strong>Subscribe</strong>{" "}
                  to our weekly newsletter to get notified when the new articles
                  get published.
                </em>
              </CardSearchItem>
              <ButtonGroupDivider style={{ zIndex: 1, position: "relative" }} />
            </>
          )}
        </>

        {MENU_BUTTONS({ ...this.props, iconStyles }).map(button => {
          if (isInstantSearch) {
            // FUZZY SEARCH
            if (!button.keywords || !button.text) return null;

            // keywords in the button:
            const titleKywords =
              typeof button.text === "string" ? button.text : "";
            const metaKeywords = button.keywords || "";
            const buttonKeywords = metaKeywords + titleKywords;
            const parsedButtonKeywords = buttonKeywords
              .toLowerCase()
              .split(/[ ,]+/)
              .filter(keyword => keyword.length > 0);

            // keywords in search field
            const parsedTypedKeywords = this.state.searchText
              .toLowerCase()
              .split(/[ ,]+/)
              .filter(keyword => keyword.length > 0)
              .slice(0, 5);

            // find
            let notFound = true;
            parsedTypedKeywords.forEach(typedKyword => {
              parsedButtonKeywords.forEach(buttonKeyword => {
                buttonKeyword.includes(typedKyword) && (notFound = false);
              });
            });

            if (notFound) return null;
          }

          // hidden buttons which appear only for fuzzy search
          if (button.hidden && !isInstantSearch) return null;

          // buttons requiring logged in users aren't shown in search for visitors
          if (button.memberOnly && this.props.user.status !== "ok") return null;

          // buttons only for visitors/signed-out users
          if (button.visitorOnly && this.props.user.status === "ok")
            return null;

          return button.divider ? (
            <ButtonGroupDivider key={`div_${Math.random()}`} />
          ) : (
            <CardButton
              onClick={button.onClick}
              to={button.to}
              key={`div_${button.to || button.onClick || Math.random()}`}
              inverse={button.inverse}
              mobile={button.mobile}
            >
              {button.text}
            </CardButton>
          );
        })}
      </>
    );
  };
}

const mapStateToProps = state => {
  return {
    search: state.search,
    user: {}, //state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getSearchResults: query => {
      dispatch(getSearchResults(query));
    },
    setModal: (info, request) => {
      dispatch(setModal(info, request));
    },
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search)
);

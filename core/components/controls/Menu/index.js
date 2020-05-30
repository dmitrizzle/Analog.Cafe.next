import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";
import React, { useState } from "react";

import { MENU_BUTTONS } from "./constants";
import { getSearchResults } from "../../../store/actions-search";
import { withRedux } from "../../../../utils/with-redux";
import ButtonGroupDivider from "../../controls/Button/components/ButtonGroupDivider";
import CardButton from "../../controls/Card/components/CardButton";
import CardSearchItem from "../Card/components/CardSearchItem";
import FollowButtons from "../../controls/Button/components/FollowButtons";
import SearchForm from "./components/SearchForm";

export const iconStyles = { height: ".75em", paddingBottom: ".15em" };

export const Search = props => {
  const search = useSelector(state => state.search);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState({
    searchForm: false,
    hideSearchResults: false,
  });
  const [searchText, setSearchText] = useState("");

  const handleClearSearch = event => {
    event.stopPropagation();
    dispatch(getSearchResults(""));
    setSearchText("");
  };

  const handleSearchText = text => {
    setSearchText(text);
    setVisibility({ ...visibility, hideSearchResults: text === "" });
  };

  const { items, queries } = search.data || {
    items: [],
    queries: [],
  };
  const haveSearchResults =
    !visibility.hideSearchResults && items && items.length > 0;
  const isNotFound =
    queries.request &&
    queries.request[0].searchTerms &&
    queries.request[0].searchTerms.length > 1;
  const isInstantSearch =
    searchText !== "" && !haveSearchResults && !isNotFound;

  return (
    <>
      <SearchForm
        formLocation={props.formLocation}
        autoFocus={"ontouchstart" in document.documentElement ? false : true}
        submitCallback={query => dispatch(getSearchResults(query))}
        searchText={handleSearchText}
        searhTextValue={searchText}
        loading={search.isFetching}
        style={{ zIndex: 1, position: "relative" }}
      />
      {(haveSearchResults || isNotFound) && (
        <CardButton inverse onClick={handleClearSearch}>
          Clear ✕
        </CardButton>
      )}
      <>
        {haveSearchResults &&
          search.data.items.map(item => (
            <React.Fragment key={item.link}>
              <CardSearchItem to={item.link}>
                <div>{item.title}</div>
                <em>{item.snippet}</em>

                {item.pagemap.cse_image[0]?.src && (
                  <figure>
                    <img src={item.pagemap.cse_image[0].src} />
                  </figure>
                )}
              </CardSearchItem>
              <ButtonGroupDivider style={{ zIndex: 1, position: "relative" }} />
            </React.Fragment>
          ))}
        {isNotFound && !search.data.items && (
          <>
            <CardSearchItem to="/account">
              <div>Not Found</div>
              <em>
                We publish new content every week. <strong>Subscribe</strong> to
                our weekly newsletter to get notified when the new articles get
                published.
              </em>
            </CardSearchItem>
            <ButtonGroupDivider style={{ zIndex: 1, position: "relative" }} />
          </>
        )}
      </>

      {MENU_BUTTONS({ ...props, iconStyles }).map(button => {
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
          const parsedTypedKeywords = searchText
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
        if (button.socialButtons) return <FollowButtons key="FollowButtons" />;

        // hidden buttons which appear only for fuzzy search
        if (button.hidden && !isInstantSearch) return null;

        // buttons requiring logged in users aren't shown in search for visitors
        if (button.memberOnly && user.status !== "ok") return null;

        // buttons only for visitors/signed-out users
        if (button.visitorOnly && user.status === "ok") return null;

        return button.divider ? (
          <ButtonGroupDivider key={`div_${Math.random()}`} />
        ) : (
          <CardButton
            onClick={button.onClick}
            to={button.to}
            key={`div_${button.to || button.onClick || Math.random()}`}
            branded={button.branded}
            inverse={
              button.inverse ||
              window.location.pathname + window.location.hash === button.to
            }
            mobile={button.mobile}
          >
            {button.text}
          </CardButton>
        );
      })}
    </>
  );
};

export default withRouter(withRedux(Search));

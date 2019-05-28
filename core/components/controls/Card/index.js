import React from "react";

import ButtonGroupDivider from "../Button/components/ButtonGroupDivider";
import CardButton from "./components/CardButton";
import CardHeader from "./components/CardHeader";
import CardPopup from "./components/CardPopup";
import Menu from "../Menu";

const ButtonKeyword = () => <span />;
const CardFigure = props => <div>{props.children}</div>;
const FollowButtons = props => <div>{props.children}</div>;
const Spinner = props => <div>{props.children}</div>;

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };
  }
  handleSearchText = searchText => {
    this.setState({ searchText });
  };

  render = () => (
    <CardPopup style={this.props.style} id={this.props.id}>
      {!this.props.headless && (
        <CardHeader
          error={this.props.error}
          stubborn={this.props.stubborn}
          buttons={this.props.buttons}
          title={this.props.title}
          noStar={this.props.menu}
        />
      )}
      <CardFigure image={this.props.image} text={this.props.text} />
      {this.props.menu && (
        <Menu
          onClick={event => event.stopPropagation()}
          formLocation={this.props.searchFormLocation}
          key="search"
          searchText={this.handleSearchText}
        />
      )}
      {this.props.buttons &&
        Object.keys(this.props.buttons).length !== 0 &&
        this.props.buttons.map(function(button, i) {
          let keyword, buttonText;
          if (button && button.text && typeof button.text === "string") {
            const keywordMatch = button.text.match(/\[(.*?)\]/);
            keyword = keywordMatch ? keywordMatch[1] : null;
            buttonText = button.text.replace(`[${keyword}]`, "");
          }
          if (button && button.text && React.isValidElement(button.text)) {
            buttonText = button.text;
          }
          return button && button.to && button.text ? (
            <CardButton
              to={button.to}
              key={button.to}
              onClick={button.onClick}
              branded={button.branded ? true : null}
              inverse={button.inverse ? true : null}
              mobile={button.mobile ? button.mobile : null}
              animationUnfold={button.animationUnfold}
            >
              {button.loading && <Spinner />}
              {buttonText}
              {keyword && (
                <ButtonKeyword
                  branded={button.branded}
                  inverse={button.inverse}
                >
                  {keyword}
                </ButtonKeyword>
              )}
            </CardButton>
          ) : button && button.divider ? (
            <ButtonGroupDivider key={i} />
          ) : null;
        })}
      {this.props.socialButtons && <FollowButtons />}
    </CardPopup>
  );
}

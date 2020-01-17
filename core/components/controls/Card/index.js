import React, { useState } from "react";

import ButtonGroupDivider from "../Button/components/ButtonGroupDivider";
import ButtonKeyword from "../Button/components/ButtonKeyword";
import CardButton from "./components/CardButton";
import CardFigure from "./components/CardFigure";
import CardHeader from "./components/CardHeader";
import CardPopup from "./components/CardPopup";
import Menu from "../Menu";
import Spinner from "../../icons/Spinner";

export default props => {
  const [searchText, setSearchText] = useState("");

  return (
    <CardPopup style={props.style} id={props.id}>
      {!props.headless && (
        <CardHeader
          error={props.error}
          stubborn={props.stubborn}
          buttons={props.buttons}
          title={props.title}
          noStar={props.menu || props.noStar}
        />
      )}
      <CardFigure image={props.image} text={props.text} />
      {props.menu && (
        <Menu
          onClick={event => event.stopPropagation()}
          formLocation={props.searchFormLocation}
          key="search"
          searchText={setSearchText}
        />
      )}
      {props.buttons &&
        Object.keys(props.buttons).length !== 0 &&
        props.buttons.map(function(button, i) {
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
              {button.active && (
                <span
                  style={{
                    margin: "0 .5em 0 -1.575em",
                    display: "inline-block",
                  }}
                >
                  ➢{" "}
                </span>
              )}
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
            <ButtonGroupDivider
              key={i}
              mobile={button.mobile ? button.mobile : null}
            />
          ) : null;
        })}
    </CardPopup>
  );
};

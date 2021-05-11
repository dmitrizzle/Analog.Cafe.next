import { useSelector } from "react-redux";
import { withRouter } from "next/router";
import React from "react";
import dynamic from "next/dynamic";

import { DarkModeWrap } from "../Menu/constants";
import { SignInElements } from "../../../../user/components/pages/Account/components/SignInElements";
import { capitalizeFirstLetter } from "../../../../utils/string";
import { withRedux } from "../../../../utils/with-redux";
import ButtonGroupDivider from "../Button/components/ButtonGroupDivider";
import ButtonKeyword from "../Button/components/ButtonKeyword";
import CardButton from "./components/CardButton";
import CardCaption from "./components/CardCaption";
import CardFigure from "./components/CardFigure";
import CardHeader from "./components/CardHeader";
import CardPopup from "./components/CardPopup";
import Moon from "../../icons/Moon";
import Spinner from "../../icons/Spinner";

export const CardLoading = () => (
  <CardCaption>
    <p style={{ textAlign: "center" }}>Loading…</p>
  </CardCaption>
);
export const Menu = dynamic(() => import("../Menu"), {
  ssr: false,
  loading: CardLoading,
});
export const Bookmarks = dynamic(() => import("../Bookmarks"), {
  ssr: false,
  loading: CardLoading,
});

const Index = props => {
  const theme = useSelector(({ theme }) => theme);
  return (
    <CardPopup style={props.style} id={props.id}>
      {!props.headless && (
        <CardHeader
          error={props.error}
          stubborn={props.stubborn}
          buttons={props.buttons}
          title={props.title}
          noStar={props.menu || props.bookmarks || props.noStar}
        />
      )}
      <CardFigure image={props.image} text={props.text} />
      {props.menu && (
        <Menu
          onClick={event => event.stopPropagation()}
          formLocation={props.searchFormLocation}
          key="search"
        />
      )}
      {props.bookmarks && (
        <Bookmarks onClick={event => event.stopPropagation()} key="bookmarks" />
      )}
      {props.signInWithSocial && (
        <SignInElements
          inModal={1}
          socialOnly={1}
          loginAction={props.router?.asPath}
        />
      )}
      {props.signinWithEmail && (
        <SignInElements
          inModal={1}
          emailOnly={1}
          loginAction={props.router?.asPath}
        />
      )}
      {props.buttons &&
        Object.keys(props.buttons).length !== 0 &&
        props.buttons.map(function (button, i) {
          let keyword, buttonText;
          if (button && button.text && typeof button.text === "string") {
            const keywordMatch = button.text.match(/\[(.*?)\]/);
            keyword = keywordMatch ? keywordMatch[1] : null;
            buttonText = button.text.replace(`[${keyword}]`, "");
          }
          if (button && button.text && React.isValidElement(button.text)) {
            buttonText = button.text;
          }

          if (buttonText === "RENDER_DARK_MODE_SWITCHER")
            buttonText = (
              <DarkModeWrap mode={theme}>
                <Moon /> Theme: {capitalizeFirstLetter(theme)}
              </DarkModeWrap>
            );

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

export default withRedux(withRouter(Index));

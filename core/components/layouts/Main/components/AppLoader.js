import { withRouter } from "next/router";
import React from "react";

import { TEXT_EMOJIS } from "../../../../../constants/messages/emojis";
import AppStatusWrapper, { AnimatedCharacter } from "./AppStatusWrapper";

class AppLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "ok",
    };
  }

  componentDidMount = () => {
    // transmit router loading events
    const routerEvents = this.props.router.events;
    routerEvents.on("routeChangeStart", nextUrl => {
      this.setState({
        status: `☆ﾟ.*･｡ﾟLoading...`,
        url: this.props.router.pathname,
        nextUrl,
      });
    });
    routerEvents.on("routeChangeComplete", nextUrl => {
      this.setState({
        status: "ok",
        url: this.props.router.pathname,
        nextUrl,
      });
    });
    // routerEvents.on("routeChangeError", nextUrl => {
    //   this.setState({
    //     status: "Error!",
    //     url: this.props.router.pathname,
    //     nextUrl,
    //   });
    // });
  };
  componentWillUnmount() {
    this._ismounted = false;
  }

  render = () => {
    return this.state.status === "ok" ? null : (
      <AppStatusWrapper>
        {this.state.status.split("").map((char, index) => (
          <AnimatedCharacter order={index} key={index}>
            {char}
          </AnimatedCharacter>
        ))}
      </AppStatusWrapper>
    );
  };
}

export default withRouter(AppLoader);

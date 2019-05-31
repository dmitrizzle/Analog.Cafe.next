import { withRouter } from "next/router";
import React from "react";

import AppStatusWrapper, { AnimatedCharacter } from "./AppStatusWrapper";

class AppLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "ok",
    };
  }

  setStatusLoading = (url, nextUrl) => {
    this.setState({
      status: `☆ﾟ.*･｡ﾟLoading...`,
      url,
      nextUrl,
    });
  };
  setStatusOk = (url, nextUrl) => {
    this.setState({
      status: "ok",
      url,
      nextUrl,
    });
  };
  componentDidMount = () => {
    // transmit router loading events
    const routerEvents = this.props.router.events;
    routerEvents.on("routeChangeStart", nextUrl =>
      this.setStatusLoading(this.props.router.pathname, nextUrl)
    );
    routerEvents.on("routeChangeComplete", nextUrl => {
      this.setStatusOk(this.props.router.pathname, nextUrl);
    });

    // routerEvents.on("routeChangeError", nextUrl => {});
  };

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

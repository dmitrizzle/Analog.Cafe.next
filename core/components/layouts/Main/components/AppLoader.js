import { connect } from "react-redux";
import { withRouter } from "next/router";
import React from "react";

import AppStatusWrapper, { AnimatedCharacter } from "./AppStatusWrapper";

const mapStatusToMessage = {
  ok: "╰(◕ᗜ◕)╯Done!",
  loading: `☆ﾟ.*･｡ﾟLoading...`,
};

// NOTE: make animated transition

class AppLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "ok",
    };
  }

  setStatusLoading = (url, nextUrl) => {
    this.setState({
      status: "loading",
      url,
      nextUrl: nextUrl || url,
    });
  };
  setStatusOk = (url, nextUrl) => {
    this.setState({
      status: "ok",
      url,
      nextUrl: nextUrl || url,
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

  componentWillReceiveProps = nextProps => {
    if (nextProps.modal.status === "initializing") {
      this.setStatusLoading(nextProps.router.pathname);
    } else this.setStatusOk(nextProps.router.pathname);
  };

  render = () => {
    return (
      <AppStatusWrapper isInert={this.state.status === "ok"}>
        {mapStatusToMessage[this.state.status].split("").map((char, index) => (
          <AnimatedCharacter order={index} key={index}>
            {char}
          </AnimatedCharacter>
        ))}
      </AppStatusWrapper>
    );
  };
}

const mapStateToProps = ({ modal }) => {
  return {
    modal,
  };
};
export default connect(
  mapStateToProps,
  null
)(withRouter(AppLoader));

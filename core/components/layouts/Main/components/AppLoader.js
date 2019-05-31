import { connect } from "react-redux";
import { withRouter } from "next/router";
import React from "react";

import AppStatusWrapper, { AnimatedCharacter } from "./AppStatusWrapper";

const mapStatusToMessage = {
  ok: "╰(◕ᗜ◕)╯Done!",
  loading: `☆ﾟ.*･｡ﾟLoading...`,
  dismissed: `ʕ⊙ᴥ⊙ʔBye.`,
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
  setStatusDismissed = (url, nextUrl) => {
    this.setState({
      status: "dismissed",
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

  componentWillReceiveProps = nextProps => {
    if (nextProps.modal.status === "initializing") {
      this.setStatusLoading(nextProps.router.pathname);
    } else this.setStatusOk(nextProps.router.pathname);
  };

  render = () => {
    const { status } = this.state;
    return (
      <AppStatusWrapper
        isInert={status === "ok" || status === "dismissed"}
        onClick={() => this.setStatusDismissed(this.props.router.pathname)}
      >
        {mapStatusToMessage[status].split("").map((char, index) => (
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

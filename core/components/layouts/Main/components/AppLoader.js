import { connect } from "react-redux";
import { withRouter } from "next/router";
import React from "react";

import AppStatusWrapper, {
  AnimatedCharacter,
  AnimatedProgress,
} from "./AppStatusWrapper";

// NOTE: this is notification message code
// const mapStatusToMessage = {
//   ok: "Done!",
//   loading: `☆ﾟ.*･｡ﾟLoading...`,
//   dismissed: `Dismissed.`,
// };
/* <AppStatusWrapper
  isInert={status === "ok" || status === "dismissed"}
  onClick={() => this.setStatusDismissed(this.props.router.pathname)}
>
  {mapStatusToMessage[status].split("").map((char, index) => (
    <AnimatedCharacter order={index} key={index}>
      {char}
    </AnimatedCharacter>
  ))}
</AppStatusWrapper> */

// NOTE: make animated transition

class AppLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "ok",
    };
  }

  componentWillUnmount = () => {
    this.isComponentMounted = false;
  };
  setStatusLoading = (url, nextUrl) => {
    this.isComponentMounted &&
      this.setState({
        status: "loading",
        url,
        nextUrl,
      });
  };
  setStatusOk = (url, nextUrl) => {
    this.isComponentMounted &&
      this.setState({
        status: "ok",
        url,
        nextUrl,
      });
  };
  setStatusDismissed = (url, nextUrl) => {
    this.isComponentMounted &&
      this.setState({
        status: "dismissed",
        url,
        nextUrl,
      });
  };
  componentDidMount = () => {
    this.isComponentMounted = true;

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
    const { modal, article, list, router } = nextProps;
    const { pathname } = router;
    const statuses = [modal.status, article.status, list.status];

    let isLoading = false;
    statuses.forEach(status => {
      if (status === "loading") isLoading = true;
    });
    isLoading ? this.setStatusLoading(pathname) : this.setStatusOk(pathname);
  };

  render = () => {
    const { status } = this.state;
    return (
      <AnimatedProgress isInert={status === "ok" || status === "dismissed"} />
    );
  };
}

const mapStateToProps = ({ modal, list, article }) => {
  return { modal, list, article };
};
export default connect(
  mapStateToProps,
  null
)(withRouter(AppLoader));

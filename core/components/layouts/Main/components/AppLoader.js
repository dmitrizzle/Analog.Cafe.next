import { connect } from "react-redux";
import { withRouter } from "next/router";
import React from "react";

import { AnimatedProgress } from "./AppStatusWrapper";

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

    const { sessionInfo } = this.props.user;
    return <AnimatedProgress />;
  };
}

const mapStateToProps = ({ modal, list, article, user }) => {
  return { modal, list, article, user };
};
export default connect(
  mapStateToProps,
  null
)(withRouter(AppLoader));

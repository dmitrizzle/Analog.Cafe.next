import { connect } from "react-redux";
import { withRouter } from "next/router";
import React from "react";

import { getListMeta } from "./utils";
import Button from "../../controls/Button";
import ListBlock from "./components/ListBlock";

// import { GA } from "../../../../utils"
// import { fetchListPage, initListPage } from "../../../store/actions-list"
// import { getListMeta } from "../../../utils/messages-list"

// const ListAugmented = Loadable({
//   loader: () => import("../../../../user/components/pages/ListAugmented"),
//   loading: () => (
//     <ArticleWrapper>
//       <HeaderLarge pageTitle=" " />
//     </ArticleWrapper>
//   )
// })
const ListAugmented = props => <>{props.children}</>;

const ArticleWrapper = props => <>{props.children}</>;
const HeaderLarge = props => <>{props.children}</>;
const ListDescription = props => <>{props.children}</>;

const MetaTags = props => <>{props.children}</>;

const fetchListPage = () => {
  return null;
};
const initListPage = () => {
  return null;
};

class List extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loadMorePending: false
    };
  }
  fetchNewList = () => {
    // NOTE:

    const request = getListMeta(this.props.router.pathname, 1).request;
    // this.props.fetchListPage(request);
  };
  handleLoadMore = event => {
    event.preventDefault();
    const request = getListMeta(
      this.props.router.pathname,
      parseInt(this.props.list.page.current, 0) + 1
    ).request;

    // NOTE:

    // this.props.fetchListPage(request, true);
    this.setState({
      loadMorePending: true
    });
    // GA.event({
    //   category: "Navigation",
    //   action: "List.load_more"
    // })
  };
  componentWillReceiveProps = () => {
    this.setState({
      loadMorePending: false
    });
  };
  componentDidMount = () => {
    // NOTE:
    //this.props.initListPage();
    this.fetchNewList();
    // this.unlisten = this.props.history.listen(this.fetchNewList);
  };
  componentWillUnmount = () => {
    // this.unlisten();
  };
  render = () => {
    const renderedListMeta = getListMeta(this.props.router.pathname).meta;
    const renderedListTitle =
      renderedListMeta.title +
      (this.props.list.filter.author && this.props.list.filter.author.name
        ? " by " + this.props.list.filter.author.name
        : "");

    const isUserDashboard = this.props.me;
    const isUserFavourites = this.props.favourites;
    const isProfilePage =
      this.props.router.pathname.includes("/u/") ||
      isUserDashboard ||
      isUserFavourites;

    let profileImage;
    if (this.props.list.author) {
      profileImage =
        this.props.list.author.image || "image-froth_1000000_SJKoyDgUV";
      if (!isUserDashboard && !this.props.list.author.image)
        profileImage = null;
    }

    const doesAuthorHaveLink =
      this.props.list.author &&
      this.props.list.author.buttons[1] &&
      this.props.list.author.buttons[1].text;

    const listAugmentedProps = {
      isProfilePage,
      isUserDashboard,
      isUserFavourites,
      profileImage,
      doesAuthorHaveLink
    };

    return (
      <div>
        <MetaTags
          metaTitle={renderedListTitle}
          metaDescription={renderedListMeta.description}
        />
        {!isProfilePage && (
          <ListDescription
            user={this.props.user}
            list={this.props.list}
            renderedListMeta={renderedListMeta}
            location={this.props.location}
          />
        )}
        <React.Fragment>
          {isProfilePage && (
            <ListAugmented {...this.props} {...listAugmentedProps} />
          )}
          <ListBlock
            status={this.props.list.status}
            items={this.props.list.items}
            author={isProfilePage}
            private={this.props.private}
            isAdmin={this.props.isAdmin}
            // userIntent={this.handleUserIntent}
            article={this.props.article}
            readReceipts={this.props.user.sessionInfo.readReceipts}
            noNegativeMargin={
              !this.props.list.items ||
              this.props.list.items.length === 0 ||
              this.props.list.items[0].type === "placeholder"
            }
            {...listAugmentedProps}
          />
        </React.Fragment>
        {parseInt(this.props.list.page.total, 0) > 1 &&
        parseInt(this.props.list.page.total, 0) >
          parseInt(this.props.list.page.current, 0) ? (
          <Button
            branded
            onClick={this.handleLoadMore}
            loading={this.state.loadMorePending ? true : false}
          >
            Load More
          </Button>
        ) : null}
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    list: state.list,
    user: {
      sessionInfo: {
        readReceipts: []
      }
    },
    article: {}
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchListPage: (request, appendItems) => {
      dispatch(fetchListPage(request, appendItems));
    },
    initListPage: state => {
      dispatch(initListPage(state));
    }
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(List)
);

import { NextSeo } from "next-seo";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import React from "react";

import { DESCRIPTION_SHORT, NAME } from "../../../../constants/messages/system";
import { fetchListPage } from "../../../store/actions-list";
import { getListMeta } from "./utils";
import { makeFroth } from "../../../../utils/froth";
import ArticleSection from "../Article/components/ArticleSection";
import LinkButton from "../../controls/Button/components/LinkButton";
import ListBlock from "./components/ListBlock";
import Spinner from "../../icons/Spinner";

// import { GA } from "../../../../utils"

// const MetaTags = props => <>{props.children}</>;

class List extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loadMorePending: false,
    };
  }
  handleLoadMore = event => {
    event.preventDefault();
    event.target.blur();

    const request = getListMeta(
      // NOTE: this strips all query params
      this.props.router.asPath.split("?")[0],
      parseInt(this.props.list.page.current, 0) + 1
    ).request;

    this.props.fetchListPage(request, true);
    this.setState({
      loadMorePending: true,
    });
    // GA.event({
    //   category: "Navigation",
    //   action: "List.load_more"
    // })
  };
  componentWillReceiveProps = () => {
    this.setState({ loadMorePending: false });
  };
  componentDidMount = () => {
    // if the list type does not match, fetch again
    const requestExpected = getListMeta(this.props.router.asPath.split("?")[0])
      .request;
    const requestMade = this.props.list.requested;
    if (
      requestExpected.url !== requestMade.url ||
      requestMade.url === "" ||
      (this.props.list.items[0] &&
        this.props.list.items[0].type === "placeholder")
    ) {
      this.props.fetchListPage(requestExpected);
    }
  };

  render = () => {
    // const renderedListMeta = getListMeta(this.props.router.pathname).meta;
    // const renderedListTitle =
    //   renderedListMeta.title +
    //   (this.props.list.filter.author && this.props.list.filter.author.name
    //     ? " by " + this.props.list.filter.author.name
    //     : "");

    const isUserDashboard = this.props.me;
    const isUserFavourites = this.props.favourites;
    const isProfilePage =
      this.props.router.pathname.includes("/u/") ||
      isUserDashboard ||
      isUserFavourites;

    // let profileImage;
    // if (this.props.list.author) {
    //   profileImage =
    //     this.props.list.author.image || "image-froth_1000000_SJKoyDgUV";
    //   if (!isUserDashboard && !this.props.list.author.image)
    //     profileImage = null;
    // }

    const pageTitle = getListMeta(this.props.router.asPath).meta.title;
    const seo = {
      title: pageTitle === NAME ? DESCRIPTION_SHORT : pageTitle,
      description: getListMeta(this.props.router.asPath).meta.description,
      images: this.props.list.items
        .map((item, iterable) => {
          if (item.poster && iterable < 3)
            return {
              url: makeFroth({ src: item.poster, size: "m" }).src,
              alt: item.title,
            };
        })
        // remove null and undefined from array
        .filter(item => item),
      // canonical:
      //   DOMAIN.PROTOCOL.PRODUCTION +
      //   DOMAIN.APP.PRODUCTION +
      //   "/r/" +
      //   props.article.slug,
    };

    // console.log(seo);

    return (
      <>
        <NextSeo
          title={seo.title}
          description={seo.description}
          openGraph={{
            type: "website",
            images: seo.images,
          }}
        />
        <ArticleSection>
          {/* <MetaTags
          metaTitle={renderedListTitle}
          metaDescription={renderedListMeta.description}
        /> */}
          <>
            <ListBlock
              status={this.props.list.status}
              items={this.props.list.items}
              author={isProfilePage}
              private={this.props.private}
              isAdmin={this.props.isAdmin}
              article={this.props.article}
              readReceipts={this.props.user.sessionInfo.readReceipts}
              noNegativeMargin={
                !this.props.list.items ||
                this.props.list.items.length === 0 ||
                this.props.list.items[0].type === "placeholder"
              }
            />
          </>
          {/* Empty submissions list */
          this.props.list.items.length === 0 &&
            this.props.router.asPath
              .split("?")[0]
              .includes("/account/all-submissions") && (
              <>
                <p>
                  You haven’t submitted any photo essay or articles to get
                  featured on Analog.Cafe. But you could!
                </p>
                <LinkButton to="/submit" branded>
                  How to Submit
                </LinkButton>
              </>
            )

          /**/
          }
          {parseInt(this.props.list.page.total, 0) > 1 &&
          parseInt(this.props.list.page.total, 0) >
            parseInt(this.props.list.page.current, 0) ? (
            <LinkButton
              style={{ fontSize: "1em" }}
              branded
              onClick={this.handleLoadMore}
              href={
                // NOTE: this strips all query params
                this.props.router.asPath.split("?")[0] +
                "?page=" +
                (parseInt(this.props.list.page.current) + 1)
              }
            >
              Load More{this.state.loadMorePending && " "}
              <Spinner
                style={this.state.loadMorePending ? null : { width: 0 }}
              />
            </LinkButton>
          ) : null}
        </ArticleSection>
      </>
    );
  };
}

const mapStateToProps = ({ list, article }) => {
  return {
    list,
    user: {
      sessionInfo: {
        readReceipts: [],
      },
    },
    article,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchListPage: (request, appendItems) => {
      dispatch(fetchListPage(request, appendItems));
    },
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(List)
);

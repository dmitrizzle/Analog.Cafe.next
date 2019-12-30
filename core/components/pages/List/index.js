import { NextSeo } from "next-seo";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import React from "react";

import { DESCRIPTION_SHORT, NAME } from "../../../../constants/messages/system";
import { fetchListPage, initListPage } from "../../../store/actions-list";
import { getFirstNameFromFull } from "../../../../utils/author-credits";
import { getListMeta } from "./utils";
import { makeFroth } from "../../../../utils/froth";
import ArticleSection from "../Article/components/ArticleSection";
import Link from "../../controls/Link";
import LinkButton from "../../controls/Button/components/LinkButton";
import ListBlock from "./components/ListBlock";
import Spinner from "../../icons/Spinner";
import ga from "../../../../utils/data/ga";

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
    ga("event", {
      category: "Navigation",
      action: "List.load_more",
    });
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
      this.props.initListPage();
      this.props.fetchListPage(requestExpected);
    }
  };

  render = () => {
    const isUserDashboard = this.props.me;
    const isUserFavourites = this.props.favourites;
    const isProfilePage =
      (this.props.list.author && this.props.router.asPath.includes("/u/")) ||
      isUserDashboard ||
      isUserFavourites;

    // author profile image
    let profileImage;
    if (this.props.list.author) {
      profileImage = makeFroth({
        src: this.props.list.author.image || "image-froth_1000000_SJKoyDgUV",
        size: "m",
      }).src;
      if (!isUserDashboard && !this.props.list.author.image)
        profileImage = null;
    }
    const pageTitle = isProfilePage
      ? this.props.list.filter.author.name
      : getListMeta(this.props.router.asPath).meta.title;
    const pageDescription = isProfilePage
      ? this.props.list.author.text
      : getListMeta(this.props.router.asPath).meta.description;

    // title for collection list
    let collectionTitle;
    let collectionDescription;

    if (this.props.listFeatures && this.props.router.query.collection) {
      const matchingCollectionFeature = this.props.listFeatures.items.filter(
        item => {
          return item.collection === this.props.router.query.collection;
        }
      )[0];

      if (matchingCollectionFeature) {
        collectionTitle = matchingCollectionFeature.title;
        collectionDescription = matchingCollectionFeature.description;
      }
    }

    const seo = {
      title: collectionTitle
        ? collectionTitle
        : pageTitle === NAME
        ? DESCRIPTION_SHORT
        : pageTitle,
      description: collectionDescription || pageDescription,
      images: isProfilePage
        ? [{ url: profileImage }]
        : this.props.list.items
            .map((item, iterable) => {
              if (item.poster && iterable < 3)
                return {
                  url: makeFroth({ src: item.poster, size: "m" }).src,
                };
            })
            // remove null and undefined from array
            .filter(item => item)
            // ensures that the first image is the one that catches on twitter
            // (requires having it as a last one in the array of 3, as the last tag overwrites previous ones)
            .reverse(),
    };

    return (
      <>
        <NextSeo
          title={seo.title}
          description={seo.description}
          openGraph={{
            type: isProfilePage ? "profile" : "website",
            images: seo.images,
            profile: isProfilePage
              ? {
                  firstName: getFirstNameFromFull(
                    this.props.list.filter.author.name
                  ),
                  username: this.props.list.filter.author.id,
                }
              : undefined,
          }}
        />
        <ArticleSection>
          {/* <MetaTags
          metaTitle={renderedListTitle}
          metaDescription={renderedListMeta.description}
        /> */}
          <>
            <ListBlock
              router={this.props.router}
              status={this.props.list.status}
              items={this.props.list.items}
              author={isProfilePage}
              private={this.props.private}
              bookmarks={this.props.bookmarks}
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
                <LinkButton to="/write" branded>
                  How to Submit
                </LinkButton>
              </>
            )

          /**/
          }
          {/* Empty bookmarks list */
          this.props.list.items.length === 0 && this.props.bookmarks && (
            <>
              <p>
                You haven’t bookmarked anything yet. Use this space to save your
                favourite <Link to="/photo-essays">essays</Link>,{" "}
                <Link to="/film-photography">guides</Link>,{" "}
                <Link to="/apps-and-downloads">apps</Link>, and{" "}
                <Link to="/apps-and-downloads">downloads</Link>.
              </p>
              <LinkButton to="/" branded>
                Find Your Next Bookmark
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
              data-cy="LinkButton"
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
    fetchListPage: (request, appendItems) =>
      dispatch(fetchListPage(request, appendItems)),
    initListPage: state => dispatch(initListPage(state)),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));

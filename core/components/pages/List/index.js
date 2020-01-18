import { NextSeo } from "next-seo";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";
import React, { useState, useEffect } from "react";

import { DESCRIPTION_SHORT, NAME } from "../../../../constants/messages/system";
import { fetchListPage, initListPage } from "../../../store/actions-list";
import { getFirstNameFromFull } from "../../../../utils/author-credits";
import { getListMeta } from "./utils";
import { makeFroth } from "../../../../utils/froth";
import { withRedux } from "../../../../utils/with-redux";
import ArticleSection from "../Article/components/ArticleSection";
import Link from "../../controls/Link";
import LinkButton from "../../controls/Button/components/LinkButton";
import ListBlock from "./components/ListBlock";
import Spinner from "../../icons/Spinner";
import ga from "../../../../utils/data/ga";

const List = props => {
  const dispatch = useDispatch();

  const list = props.list;
  // list = useSelector(state => state.list);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const handleLoadMore = event => {
    event.preventDefault();
    event.target.blur();

    const request = getListMeta(
      // NOTE: this strips all query params
      props.router.asPath.split("?")[0],
      parseInt(list.page.current, 0) + 1
    ).request;

    setIsLoadingMore(true);
    dispatch(
      fetchListPage(request, true, () => {
        setIsLoadingMore(false);
      })
    );
    ga("event", {
      category: "Navigation",
      action: "List.load_more",
    });
  };

  useEffect(() => {
    // if the list type does not match, fetch again
    const requestExpected = getListMeta(props.router.asPath.split("?")[0])
      .request;
    const requestMade = list.requested;
    if (
      requestExpected.url !== requestMade.url ||
      requestMade.url === "" ||
      (list.items[0] && list.items[0].type === "placeholder")
    ) {
      dispatch(initListPage(props.list));
      dispatch(fetchListPage(requestExpected));
    }
  }, []);

  const isUserDashboard = props.me;
  const isUserFavourites = props.favourites;
  const isProfilePage =
    (list.author && props.router.asPath.includes("/u/")) ||
    isUserDashboard ||
    isUserFavourites;

  // author profile image
  let profileImage;
  if (list.author) {
    profileImage = makeFroth({
      src: list.author.image || "image-froth_1000000_SJKoyDgUV",
      size: "m",
    }).src;
    if (!isUserDashboard && !list.author.image) profileImage = null;
  }
  const pageTitle = isProfilePage
    ? list.filter.author.name
    : getListMeta(props.router.asPath).meta.title;
  const pageDescription = isProfilePage
    ? list.author.text
    : getListMeta(props.router.asPath).meta.description;

  // title for collection list
  let collectionTitle;
  let collectionDescription;

  if (props.listFeatures && props.router.query.collection) {
    const matchingCollectionFeature = props.listFeatures.items.filter(item => {
      return item.collection === props.router.query.collection;
    })[0];

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
      : list.items
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
                firstName: getFirstNameFromFull(list.filter.author.name),
                username: list.filter.author.id,
              }
            : undefined,
        }}
      />
      <ArticleSection>
        <>
          <ListBlock
            router={props.router}
            status={list.status}
            items={list.items}
            author={isProfilePage}
            private={props.private}
            bookmarks={props.bookmarks}
            isAdmin={props.isAdmin}
            noNegativeMargin={
              !list.items ||
              list.items.length === 0 ||
              list.items[0].type === "placeholder"
            }
          />
        </>
        {/* Empty submissions list */
        list.items.length === 0 &&
          props.router.asPath
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
        list.items.length === 0 && props.bookmarks && (
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
        {parseInt(list.page.total, 0) > 1 &&
        parseInt(list.page.total, 0) > parseInt(list.page.current, 0) ? (
          <LinkButton
            style={{ fontSize: "1em" }}
            branded
            onClick={handleLoadMore}
            href={
              // NOTE: this strips all query params
              props.router.asPath.split("?")[0] +
              "?page=" +
              (parseInt(list.page.current) + 1)
            }
            data-cy="LinkButton"
          >
            Load More{isLoadingMore && " "}
            <Spinner style={isLoadingMore ? null : { width: 0 }} />
          </LinkButton>
        ) : null}
      </ArticleSection>
    </>
  );
};

export default withRouter(withRedux(List));

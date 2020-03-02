import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Router from "next/router";

import { CardCaptionIntegrated } from "../../../controls/Card/components/CardIntegrated";
import { LabelWrap } from "../../../controls/Docket";
import {
  addFavourite,
  deleteFavourite,
  isFavourite as isFavouriteSync,
} from "../../../../../user/store/actions-favourites";
import { addSessionInfo } from "../../../../../user/store/actions-user";
import { fetchListFeatures } from "../../../../store/actions-list-features";
import { fetchListPage, initListPage } from "../../../../store/actions-list";
import {
  getFirstNameFromFull,
  turnicateSentence,
} from "../../../../../utils/author-credits";
import { getListMeta } from "../../List/utils";
import { isXWeeksAgo } from "../../../../../utils/time";
import { makeFroth } from "../../../../../utils/froth";
import { setArticlePage } from "../../../../store/actions-article";
import { setModal } from "../../../../store/actions-modal";
import { withRedux } from "../../../../../utils/with-redux";
import ArticleSection from "./ArticleSection";
import CardCaption from "../../../controls/Card/components/CardCaption";
import CardHeader from "../../../controls/Card/components/CardHeader";
import CardMason, {
  CardIntegratedForMason,
} from "../../../controls/Card/components/CardMason";
import CardWithDockets, {
  CardWithDocketsImage,
  CardWithDocketsInfo,
} from "../../../controls/Card/components/CardWithDockets";
import DatePublished from "./DatePublished";
import Features from "../../../controls/Features";
import Label from "../../../vignettes/Label";
import Link from "../../../controls/Link";
import LinkButton from "../../../controls/Button/components/LinkButton";
import Placeholder from "../../../vignettes/Picture/components/Placeholder";
import SuggestionSave from "./SuggestionSave";
import ga from "../../../../../utils/data/ga";

const Suggestions = props => {
  const favourites = useSelector(state => state.favourites);
  const user = useSelector(state => state.user);
  const listNewest = useSelector(state => state.list);

  const listFeatures = useSelector(state => state.listFeatures);

  const dispatch = useDispatch();

  // fill article store from props if not available/published
  const article = useSelector(state => state.article);
  if (article.status !== "published") {
    dispatch(setArticlePage(props.article));
  }

  //parse data for author list
  const { authors } = article;
  const contributionLabelMap = {
    photography: "Illustrations",
    article: "Author",
  };

  const coffeeLink = props.leadAuthorButton.to;
  const isKoFi = coffeeLink.includes("ko-fi");
  const isBuyMeACoffee = coffeeLink.includes("buymeacoff");

  // determine favourite status\
  const [isFavourite, setFavouriteStatus] = useState();
  const thisFavourite = favourites[article.id];

  const previously = {
    status: article?.next?.slug ? "ok" : "error",
    ...article.next,
  };

  // a random value that changes only once per mount
  // this is so that we can produce random selection for suggestions
  // but not alter it every time component updates
  // const [randomFactor, setRandomFactor] = useState(0);

  useEffect(() => {
    // setRandomFactor(Math.random());

    // favourirites
    if (typeof thisFavourite === "undefined")
      dispatch(isFavouriteSync(article.id));
    else setFavouriteStatus(thisFavourite && thisFavourite.user > 0);

    // fetch list
    const { requested } = listNewest;
    if (
      // empty, or
      listNewest.status !== "ok" ||
      // not homepage
      requested.params.tag !== "" ||
      requested.params.authorship !== ""
    ) {
      dispatch(initListPage());
      dispatch(fetchListPage(getListMeta("/").request));
    }

    // fetch features
    dispatch(fetchListFeatures());
  }, [favourites, article.slug]);

  // take action on favourite button
  const handleFavourite = event => {
    event.preventDefault();

    if (user.status !== "ok") {
      ga("event", {
        category: "auth",
        action: "article.suggestions.fav.signin",
        label: `/r/${article.slug}`,
      });
      dispatch(
        addSessionInfo({
          loginAction: `/r/${article.slug}`,
        })
      );
      Router.router.push("/sign-in");
      return;
    }

    event.target.blur();

    isFavourite
      ? dispatch(
          setModal({
            status: "ok",
            info: {
              title: "Bookmarked",
              buttons: [
                {
                  to: "/account/bookmarks",
                  text: "See All Your Bookmarks",
                },
                {
                  to: "#",
                  onClick: event => {
                    event.preventDefault();
                    setFavouriteStatus(!isFavourite);
                    dispatch(deleteFavourite(props.article.id));
                  },
                  text: "Remove from Bookmarks",
                  branded: true,
                },
              ],
            },
          })
        )
      : dispatch(
          addFavourite({
            id: article.id,
            slug: article.slug,
          })
        );

    ga("event", {
      category: "auth",
      action: isFavourite
        ? "article.suggestions.fav.undo"
        : "article.suggestions.fav",
      label: `/r/${article.slug}`,
    });
  };

  const listedAuthors = authors
    ? authors.filter(
        author => author?.id !== "unknown" && author.id !== "not-listed"
      )
    : [];

  const havelistedAuthorsAfterCoffeeProfile = !(
    props.coffeeForLeadAuthor && listedAuthors.length < 2
  );
  const cardMaxWidth = "388px";
  const cardCenterMargin = "1.5em auto 1em";
  return (
    <>
      <ArticleSection>
        {/* date */}
        {props.thisArticlePostDate && <DatePublished {...props} />}
      </ArticleSection>
      <Features
        isSsr={props.isSsr}
        withinArticle
        listFeatures={listFeatures}
        activeArticle={article.slug}
      />

      <ArticleSection>
        <CardMason>
          {/* coffee */}
          {props.coffeeForLeadAuthor && (
            <CardIntegratedForMason
              style={{
                maxWidth: !havelistedAuthorsAfterCoffeeProfile
                  ? cardMaxWidth
                  : undefined,
                margin: !havelistedAuthorsAfterCoffeeProfile
                  ? cardCenterMargin
                  : undefined,
              }}
              shadow
            >
              <CardHeader
                stubborn
                buttons={[0]}
                noStar
                title=" the Author"
                titlePrefix="Thank"
                inverse
              />
              <figure>
                <Link
                  to={coffeeLink}
                  onClick={() => {
                    ga("event", {
                      category: "out",
                      action: "article.suggestions.coffee",
                      label: coffeeLink,
                    });
                  }}
                >
                  <Placeholder frothId={props.leadAuthor.image}>
                    <img
                      src={
                        makeFroth({ src: props.leadAuthor.image, size: "s" })
                          .src
                      }
                      alt={props.leadAuthor.title}
                    />
                  </Placeholder>
                </Link>
              </figure>
              <CardCaption>
                <strong>
                  If you like the read, you can thank its author with a
                  “coffee.”
                </strong>
                <br />
                <br />
                This button will take you to{" "}
                <Link to={`/u/${props.leadAuthor.id}`}>
                  {props.leadAuthor.title}
                </Link>
                ’s {isKoFi && <Link to="https://ko-fi.com">Ko-fi</Link>}
                {isBuyMeACoffee && (
                  <Link to="https://www.buymeacoffee.com">Buy Me A Coffee</Link>
                )}{" "}
                page where you can send a quick buck with PayPal, ApplePay, or a
                credit card.
              </CardCaption>
              <LinkButton
                branded
                to={coffeeLink}
                onClick={() => {
                  ga("event", {
                    category: "out",
                    action: "article.suggestions.coffee",
                    label: coffeeLink,
                  });
                }}
              >
                Buy {props.leadAuthor.title} a Coffee
              </LinkButton>
            </CardIntegratedForMason>
          )}

          {/* contributors */}
          {havelistedAuthorsAfterCoffeeProfile && (
            <CardIntegratedForMason
              style={{
                margin: props.coffeeForLeadAuthor
                  ? undefined
                  : cardCenterMargin,
                maxWidth: cardMaxWidth,
              }}
              shadow={!props.coffeeForLeadAuthor}
            >
              <CardHeader
                inverse
                stubborn
                buttons={[0]}
                noStar
                titlePrefix={"About"}
                title={
                  " the " +
                  (listedAuthors.filter(
                    author =>
                      !(
                        author.authorship === "article" &&
                        props.coffeeForLeadAuthor
                      )
                  ).length > 1
                    ? "Contributors"
                    : listedAuthors.length > 1
                    ? "Contributor"
                    : "Author")
                }
              />
              <CardCaptionIntegrated style={{ padding: 0 }}>
                {listedAuthors.map((author, index) => {
                  // move authors with coffe profile out of author list
                  if (
                    author.authorship === "article" &&
                    props.coffeeForLeadAuthor
                  )
                    return null;

                  return (
                    <CardWithDockets
                      href={`/u/${author.id ? author.id : "not-listed"}`}
                      key={author.id || index}
                      data-cy="Autor__CardWithDockets"
                    >
                      <CardWithDocketsImage
                        src={makeFroth({ src: author.image, size: "m" }).src}
                      >
                        <LabelWrap>
                          <Label
                            branded={author.authorship === "article"}
                            inverse={author.authorship !== "article"}
                          >
                            {contributionLabelMap[author.authorship]}
                          </Label>
                        </LabelWrap>
                      </CardWithDocketsImage>
                      <CardWithDocketsInfo>
                        <h4>{getFirstNameFromFull(author.title)}</h4>
                        <small>
                          <em>
                            {author.text && turnicateSentence(author.text, 40)}
                          </em>
                        </small>
                      </CardWithDocketsInfo>
                    </CardWithDockets>
                  );
                })}
              </CardCaptionIntegrated>
            </CardIntegratedForMason>
          )}

          {/* save */}
          <CardIntegratedForMason>
            <SuggestionSave
              handleFavourite={handleFavourite}
              isFavourite={isFavourite}
              title={article?.title}
              coffeeForLeadAuthor={props.coffeeForLeadAuthor}
            />
          </CardIntegratedForMason>

          {/* features */}
          <CardIntegratedForMason>
            <CardHeader
              stubborn
              buttons={[0]}
              noStar
              title={"More from Analog.Cafe:"}
            />
            <CardCaptionIntegrated style={{ padding: 0 }}>
              {(() => {
                // const relevanceGroup = [
                //   "film-photography",
                //   "link",
                //   "editorial",
                // ];

                // only relevant recommendations
                // const isRelevant = item => {
                //   const remotelyRelevant =
                //     relevanceGroup.indexOf(article.tag) > -1 &&
                //     relevanceGroup.indexOf(item.tag) > -1;
                //
                //   if (
                //     ROUTE_TAGS["/" + item.tag] !== article.tag &&
                //     !remotelyRelevant &&
                //     // exceptions:
                //     !item.previously &&
                //     !item.newest
                //   )
                //     return false;
                //   return true;
                // };

                const list = [
                  { ...listNewest.items[0], newest: true },
                  previously.slug
                    ? {
                        slug: previously.slug,
                        poster: previously.poster,
                        title: previously.title,
                        subtitle: previously.subtitle,
                        tag: previously.tag,
                        previously: true,
                      }
                    : null,
                ].filter(item => item);

                return list.map((item, iterable) => {
                  // dont self-recommend
                  if (item.slug === article.slug) return;

                  const to = item.slug ? "/r/" + item.slug : "/" + item.url;

                  const type =
                    item.tag?.indexOf("photo-essay") > -1
                      ? "photo essay"
                      : item.tag?.indexOf("link") > -1
                      ? ""
                      : "article";

                  const isNew =
                    item.date && isXWeeksAgo(item.date.published) === 0;

                  return (
                    <CardWithDockets
                      href={to}
                      key={iterable}
                      onClick={() => {
                        ga("event", {
                          category: "nav",
                          action: "article.suggestions.feature",
                          label: to,
                        });
                      }}
                    >
                      <CardWithDocketsImage
                        src={makeFroth({ src: item.poster, size: "s" }).src}
                        alt={item.title}
                      >
                        {isNew && (
                          <LabelWrap>
                            <Label branded>New!</Label>
                          </LabelWrap>
                        )}
                      </CardWithDocketsImage>
                      <CardWithDocketsInfo>
                        <h4></h4>
                        <small>
                          <em>
                            {item.newest &&
                              (item.title ? (
                                <>
                                  Latest {type} on Analog.Cafe:{" "}
                                  <strong>“{item.title}.”</strong>
                                </>
                              ) : (
                                <>Loading…</>
                              ))}

                            {item.previously && (
                              <>
                                Previously on Analog.Cafe:{" "}
                                <strong>“{item.title}.”</strong>
                              </>
                            )}
                          </em>
                        </small>
                      </CardWithDocketsInfo>
                    </CardWithDockets>
                  );
                });
              })()}
            </CardCaptionIntegrated>
          </CardIntegratedForMason>
        </CardMason>
      </ArticleSection>
    </>
  );
};

export default withRedux(Suggestions);

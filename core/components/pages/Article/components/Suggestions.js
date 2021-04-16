import { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Router from "next/router";

import { CardCaptionIntegrated } from "../../../controls/Card/components/CardIntegrated";
import { HeartInline } from "../../../icons/Heart";
import { LabelWrap } from "../../../controls/Docket";
import { ShareButtonText, shareModal } from "../../../../../utils/share-modal";
import {
  addFavourite,
  deleteFavourite,
  isFavourite as isFavouriteSync,
} from "../../../../../user/store/actions-favourites";
import { addSessionInfo } from "../../../../../user/store/actions-user";
import { bookmarksModal } from "../../../controls/Features/components/PosterBookmarks";
import { fetchListFeatures } from "../../../../store/actions-list-features";
import { fetchListPage, initListPage } from "../../../../store/actions-list";
import {
  getFirstNameFromFull,
  turnicateSentence,
} from "../../../../../utils/author-credits";
import { getListMeta } from "../../List/utils";
import { interpretTheme } from "../../../controls/Theme/utils";
import { isXWeeksAgo } from "../../../../../utils/time";
import { m_radius } from "../../../../../constants/styles/measurements";
import { makeFroth } from "../../../../../utils/froth";
import { setArticlePage } from "../../../../store/actions-article";
import { setModal } from "../../../../store/actions-modal";
import { themeOptions } from "../../../../../constants/styles/themes";
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
import LinkButton from "../../../controls/Button/components/LinkButton";
import Placeholder from "../../../vignettes/Picture/components/Placeholder";
import SuggestionSave from "./SuggestionSave";
import ThankTheAuthor from "./ThankTheAuthor";
import ga from "../../../../../utils/data/ga";

const Suggestions = props => {
  const favourites = useSelector(state => state.favourites);
  const user = useSelector(state => state.user);
  const listNewest = useSelector(state => state.list);
  const theme = interpretTheme(useSelector(({ theme }) => theme));

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

  const coffeeLink = props.leadAuthorButton?.to;
  const isKoFi = coffeeLink ? coffeeLink.includes("ko-fi") : false;
  const isBuyMeACoffee = coffeeLink ? coffeeLink.includes("buymeacoff") : false;

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
                  text: "See All Bookmarks",
                  onClick: event => {
                    event.preventDefault();
                    event.stopPropagation();
                    dispatch(setModal(bookmarksModal));
                  },
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

  const SaveToBookmarks = () => (
    <CardIntegratedForMason buttonContainer>
      <CardHeader stubborn buttons={[0]} noStar title={"Interactive:"} />
      <SuggestionSave
        handleFavourite={handleFavourite}
        isFavourite={isFavourite}
        title={article?.title}
        coffeeForLeadAuthor={props.coffeeForLeadAuthor}
      />
      <LinkButton
        to={`https://www.analog.cafe/r/${article.slug}`}
        onClick={event => {
          event.preventDefault();
          dispatch(
            setModal(
              shareModal({
                url: `https://www.analog.cafe/r/${article.slug}`,
                title: article?.title,
                subtitle: article?.subtitle,
                authorName: article?.submittedBy.name,
                id: article.slug,
              })
            )
          );
        }}
      >
        <ShareButtonText />
      </LinkButton>
    </CardIntegratedForMason>
  );

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
            >
              <CardHeader
                stubborn
                buttons={[0]}
                noStar
                titlePrefix={"Thank the author:"}
                title={""}
              />
              <div
                css={css`
                  border-radius: ${m_radius};
                  box-shadow: 0 0 0 1px ${({ theme }) => theme.grey_med};
                  margin: 1em 1px 1px 1px;
                `}
              >
                <figure
                  css={css`
                    border-radius: ${m_radius} ${m_radius} 0 0;
                    overflow: hidden;
                  `}
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
                </figure>
                <CardCaption>
                  <ThankTheAuthor
                    authorName={props.leadAuthor.title}
                    isKoFi={isKoFi}
                    isBuyMeACoffee={isBuyMeACoffee}
                  />
                </CardCaption>
                <LinkButton
                  style={{
                    margin: "1em 0 0",
                    maxWidth: "100%",
                    borderRadius: 0,
                  }}
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
                  Buy {getFirstNameFromFull(props.leadAuthor.title)} a Coffee{" "}
                  <small>
                    <HeartInline />
                  </small>
                </LinkButton>
              </div>
            </CardIntegratedForMason>
          )}

          {/* save */}
          {props.coffeeForLeadAuthor && <SaveToBookmarks />}

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
                stubborn
                buttons={[0]}
                noStar
                title={
                  "About the " +
                  (listedAuthors.filter(
                    author =>
                      !(
                        author.authorship === "article" &&
                        props.coffeeForLeadAuthor
                      )
                  ).length > 1
                    ? "contributors"
                    : listedAuthors.length > 1
                    ? "contributor"
                    : "author") +
                  ":"
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
                        style={{
                          background: !author.image
                            ? themeOptions[theme].grey_light
                            : undefined,
                        }}
                      >
                        {!author.image && (
                          <h3
                            style={{
                              height: "100%",
                              padding: 0,
                              margin: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span
                              style={{
                                display: "inline",
                              }}
                            >
                              {author.title.substring(0, 2)}
                            </span>
                          </h3>
                        )}
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
          {!props.coffeeForLeadAuthor && <SaveToBookmarks />}

          {/* features */}
          <CardIntegratedForMason>
            <CardHeader
              stubborn
              buttons={[0]}
              noStar
              title={"Relevant reads:"}
            />
            <CardCaptionIntegrated style={{ padding: 0, boxShadow: "none" }}>
              {(() => {
                let uniqueSlugs = [];

                const listNewestPick = listNewest.items.filter(item => {
                  // ensure no repeat recommendations
                  if (uniqueSlugs.find(element => element === item.slug))
                    return false;
                  if (item.slug === previously.slug) return false;

                  // dont self-recommend
                  if (item.slug === article.slug) return;

                  uniqueSlugs.push(item.slug);
                  return true;
                });

                const list = [
                  { ...listNewestPick[0], newest: true },
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

                  // const type =
                  //   item.tag?.indexOf("photo-essay") > -1
                  //     ? "photo essay"
                  //     : item.tag?.indexOf("link") > -1
                  //     ? ""
                  //     : "article";

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
                                  You may also like:{" "}
                                  <strong>“{item.title}.”</strong>
                                </>
                              ) : (
                                <>Loading…</>
                              ))}

                            {item.previously && (
                              <>
                                Previously on Analog.Cafe:{" "}
                                <strong>
                                  “
                                  {item.title.length > 35
                                    ? item.title.substr(0, 34) + "…"
                                    : item.title + "."}
                                  ”
                                </strong>
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

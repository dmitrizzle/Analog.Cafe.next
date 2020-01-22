import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Router from "next/router";

import { CardCaptionIntegrated } from "../../../controls/Card/components/CardIntegrated";
import { LabelWrap } from "../../../controls/Docket";
import { ROUTE_TAGS } from "../../List/constants";
import {
  addFavourite,
  deleteFavourite,
  isFavourite as isFavouriteSync,
} from "../../../../../user/store/actions-favourites";
import { addSessionInfo } from "../../../../../user/store/actions-user";
import { fetchListFeatures } from "../../../../store/actions-list-features";
import { fetchListPage } from "../../../../store/actions-list";
import {
  getFirstNameFromFull,
  turnicateSentence,
} from "../../../../../utils/author-credits";
import { getListMeta } from "../../List/utils";
import { makeFroth } from "../../../../../utils/froth";
import { withRedux } from "../../../../../utils/with-redux";
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
import Label from "../../../vignettes/Label";
import Link from "../../../controls/Link";
import LinkButton from "../../../controls/Button/components/LinkButton";
import Placeholder from "../../../vignettes/Picture/components/Placeholder";
import Save from "../../../icons/Save";
import document from "../../../../../pages/_document";
import ga from "../../../../../utils/data/ga";

export const SaveToBookmarks = ({ handleFavourite, isFavourite }) => (
  <LinkButton onClick={handleFavourite} inverse={isFavourite}>
    {!isFavourite && (
      <Save
        style={{
          width: "1em",
          marginTop: "-.35em",
        }}
      />
    )}{" "}
    {!isFavourite ? "Save to Bookmarks" : "Saved to Bookmarks"}
  </LinkButton>
);

const Suggestions = props => {
  const article = useSelector(state => state.article);
  const favourites = useSelector(state => state.favourites);
  const user = useSelector(state => state.user);
  const listFeatures = useSelector(state => state.listFeatures);
  const listNewest = useSelector(state => state.list);

  const dispatch = useDispatch();

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

  useEffect(() => {
    // favourirites
    if (typeof thisFavourite === "undefined")
      dispatch(isFavouriteSync(article.id));
    else setFavouriteStatus(thisFavourite && thisFavourite.user > 0);

    // fetch list
    if (listNewest.status !== "ok")
      dispatch(fetchListPage(getListMeta("/").request));

    // get feature list
    if (listFeatures.status !== "ok") dispatch(fetchListFeatures());
  }, [favourites]);

  // take action on favourite button
  const handleFavourite = event => {
    event.preventDefault();

    if (user.status !== "ok") {
      ga("event", {
        category: "User",
        action: "Favourite.SignIn",
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

    setFavouriteStatus(!isFavourite);
    isFavourite
      ? dispatch(deleteFavourite(article.id))
      : dispatch(
          addFavourite({
            id: article.id,
            slug: article.slug,
          })
        );

    ga("event", {
      category: "User",
      action: isFavourite ? "UnFavourite" : "Favourite",
      label: `/r/${article.slug}`,
    });
  };

  const listedAuthors = authors
    ? authors.filter(
        author =>
          author.id && author.id !== "unknown" && author.id !== "not-listed"
      )
    : [];

  const havelistedAuthorsAfterCoffeeProfile = !(
    props.coffeeForLeadAuthor && listedAuthors.length < 2
  );
  const cardMaxWidth = "388px";
  const cardCenterMargin = "1.5em auto 1em";
  return (
    <>
      {/* date */}
      {props.thisArticlePostDate && <DatePublished {...props} />}

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
                    category: "Campaign",
                    action: "Article.Suggestions.author_cta_coffee_picture",
                    label: coffeeLink,
                  });
                }}
              >
                <Placeholder frothId={props.leadAuthor.image}>
                  <img
                    src={
                      makeFroth({ src: props.leadAuthor.image, size: "s" }).src
                    }
                    alt={props.leadAuthor.title}
                  />
                </Placeholder>
              </Link>
            </figure>
            <CardCaption>
              <strong>
                If you like the read, you can thank its author with a “coffee.”
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
                  category: "Campaign",
                  action: "Article.Suggestions.author_cta_coffee",
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
              margin: props.coffeeForLeadAuthor ? undefined : cardCenterMargin,
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
          <CardHeader
            stubborn
            buttons={[0]}
            noStar
            title={isFavourite ? "Saved" : "Save for Later"}
          />

          <CardCaption>
            {isFavourite ? (
              <>
                You can find this article again in{" "}
                <Link to="/account/bookmarks">Bookmarks</Link>.{" "}
                {document &&
                document.documentElement &&
                "ontouchstart" in document.documentElement
                  ? "Tap"
                  : "Click"}{" "}
                the button again to remove.
              </>
            ) : (
              <>
                Things that you bookmark (like this article) will appear in{" "}
                <strong>
                  <Link to="/account/bookmarks">Bookmarks</Link>
                </strong>
                .
              </>
            )}
          </CardCaption>
          <SaveToBookmarks
            handleFavourite={handleFavourite}
            isFavourite={isFavourite}
          />
        </CardIntegratedForMason>

        {/* features */}
        <CardIntegratedForMason>
          <CardHeader
            stubborn
            buttons={[0]}
            noStar
            title={"More from Analog.Cafe"}
          />
          <CardCaptionIntegrated style={{ padding: 0 }}>
            {(() => {
              const relevanceGroup = ["film-photography", "link", "editorial"];
              const remotelyRelevant =
                relevanceGroup.indexOf(article.tag) > -1 &&
                relevanceGroup.indexOf(item.tag) > -1;

              // only relevant recommendations
              const isRelevant = item => {
                if (
                  ROUTE_TAGS["/" + item.tag] !== article.tag &&
                  !remotelyRelevant &&
                  // exceptions:
                  !item.previously &&
                  !item.newest
                )
                  return false;
                return true;
              };

              // create a list of all possible recommendations
              const collections = listFeatures.items
                .filter(item => item.collection)
                .filter(item => isRelevant(item));
              const randomCollection =
                collections[Math.floor(Math.random() * collections.length)];

              const list = [
                { ...listNewest.items[0], newest: true },
                randomCollection,
                {
                  slug: previously.slug,
                  poster: previously.poster,
                  title: previously.title,
                  subtitle: previously.subtitle,
                  tag: previously.tag,
                  previously: true,
                },
              ].filter(item => item);

              return list.map((item, iterable) => {
                // dont self-recommend
                if (item.slug === article.slug) return;

                const to = item.slug ? "/r/" + item.slug : "/" + item.url;

                const type =
                  item.tag.indexOf("photo-essay") > -1
                    ? "photo essay"
                    : "article";
                return (
                  <CardWithDockets href={to} key={iterable}>
                    <CardWithDocketsImage
                      src={makeFroth({ src: item.poster, size: "s" }).src}
                      alt={item.title}
                    ></CardWithDocketsImage>
                    <CardWithDocketsInfo>
                      <h4></h4>
                      <small>
                        <em>
                          {item.newest && (
                            <>
                              Latest {type} on Analog.Cafe:{" "}
                              <strong>“{item.title}.”</strong>
                            </>
                          )}
                          {item.collection && (
                            <>
                              More of the same: a collection of {type}
                              s, titled <strong>“{item.title}.”</strong>
                            </>
                          )}
                          {item.previously && (
                            <>
                              Older read: <strong>“{item.title}.”</strong>
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
    </>
  );
};

export default withRedux(Suggestions);

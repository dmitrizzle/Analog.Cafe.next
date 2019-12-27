import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import { AuthorsPrinted } from "./AuthorsPrinted";
import { TAGS } from "../constants";
import { fetchListFeatures } from "../../../../store/actions-list-features";
import { getListMeta } from "../../List/utils";

import { CardCaptionIntegrated } from "../../../controls/Card/components/CardIntegrated";
import { CoffeeInline } from "../../../icons/Coffee";
import { LabelWrap } from "../../../controls/Docket";
import {
  addFavourite,
  deleteFavourite,
  isFavourite,
} from "../../../../../user/store/actions-favourites";
import { addSessionInfo } from "../../../../../user/store/actions-user";
import ga from "../../../../../utils/data/ga";
import {
  getFirstNameFromFull,
  turnicateSentence,
} from "../../../../../utils/author-credits";

import { makeFroth } from "../../../../../utils/froth";
import CardCaption from "../../../controls/Card/components/CardCaption";
import CardMason, {
  CardIntegratedForMason,
} from "../../../controls/Card/components/CardMason";
import CardHeader from "../../../controls/Card/components/CardHeader";
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
  // parse data for next article
  const previously = {
    status: props.nextArticle && props.nextArticle.slug ? "ok" : "error",
    ...props.nextArticle,
  };

  //parse data for author list
  const { authors } = props.article;
  const contributionLabelMap = {
    photography: "Illustrations",
    article: "Author",
  };

  const coffeeLink = props.leadAuthorButton.to;
  const isKoFi = coffeeLink.includes("ko-fi");
  const isBuyMeACoffee = coffeeLink.includes("buymeacoff");

  // determine favourite status\
  const [isFavourite, setFavouriteStatus] = useState();
  const thisFavourite = props.favourites[props.article.id];

  useEffect(() => {
    // favourirites
    if (typeof thisFavourite === "undefined")
      props.isFavourite(props.article.id);
    else setFavouriteStatus(thisFavourite && thisFavourite.user > 0);

    // get feature list
    if (props.listFeatures.status !== "ok")
      props.fetchListFeatures(getListMeta("/").request);
  }, [thisFavourite]);

  // take action on favourite button
  const handleFavourite = event => {
    event.preventDefault();

    if (props.user.status !== "ok") {
      ga("event", {
        category: "User",
        action: "Favourite.SignIn",
        label: `/r/${props.article.slug}`,
      });
      props.addSessionInfo({
        loginAction: `/r/${props.article.slug}`,
      });
      Router.router.push("/sign-in");
      return;
    }

    event.target.blur();

    setFavouriteStatus(!isFavourite);
    isFavourite
      ? props.deleteFavourite(props.article.id)
      : props.addFavourite({
          id: props.article.id,
          slug: props.article.slug,
        });

    ga("event", {
      category: "User",
      action: isFavourite ? "UnFavourite" : "Favourite",
      label: `/r/${props.article.slug}`,
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
              <CoffeeInline />
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
            shadow
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
        <CardIntegratedForMason shadow>
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
                <Link to="/account#bookmarks">Bookmarks</Link>.{" "}
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
                  <Link to="/account#bookmarks">Bookmarks</Link>
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
        {props.listFeatures.items.map((item, iterable) => {
          // recommend only articles in the same tag space
          if (
            !(
              // apps and downloads features appear for film-photography articles
              (item.tag === "link" && props.article.tag === "film-photography")
            ) &&
            !item.collection &&
            (item.tag !== props.article.tag || item.slug === props.article.slug)
          )
            return;

          const to = item.slug ? "/r/" + item.slug : "/" + item.url;
          return (
            <CardIntegratedForMason key={iterable}>
              <CardHeader
                stubborn
                buttons={[0]}
                noStar
                title={
                  item.collection
                    ? "Collection: " + item.title
                    : "Recommended for You"
                }
              />

              <figure>
                <Link
                  to={to}
                  onClick={() => {
                    ga("event", {
                      category: "Navigation",
                      action: "ActionsCard.feature",
                      label: to,
                    });
                  }}
                >
                  <Placeholder frothId={item.poster}>
                    <img
                      src={makeFroth({ src: item.poster, size: "s" }).src}
                      alt={item.title}
                    />
                  </Placeholder>
                </Link>
              </figure>

              <CardCaption>
                {item.description ? (
                  item.description
                ) : (
                  <>
                    <strong>
                      “{item.title}
                      {item.subtitle ? ": " + item.subtitle : ""}”
                    </strong>{" "}
                    by <AuthorsPrinted authors={item.authors} />
                    {item.tag && (
                      <>
                        . Published in{" "}
                        <Link to={TAGS[item.tag].link}>
                          {TAGS[item.tag].title}
                        </Link>
                      </>
                    )}
                    .
                  </>
                )}
              </CardCaption>

              <LinkButton
                to={to}
                onClick={() => {
                  ga("event", {
                    category: "Navigation",
                    action: "ActionsCard.feature_button",
                    label: to,
                  });
                }}
              >
                {item.collection ? "Browse Collection" : "Read"}
              </LinkButton>
            </CardIntegratedForMason>
          );
        })}

        {/* read next */}
        {previously.status === "ok" && (
          <CardIntegratedForMason>
            <CardHeader
              stubborn
              buttons={[0]}
              noStar
              title="Previously on Analog.Cafe"
            />
            <figure>
              <Link
                to={"/r/" + previously.slug}
                onClick={() => {
                  ga("event", {
                    category: "Navigation",
                    action: "ActionsCard.next_article_picture",
                  });
                }}
              >
                <Placeholder frothId={previously.poster}>
                  <img
                    src={makeFroth({ src: previously.poster, size: "s" }).src}
                    alt={previously.title}
                  />
                </Placeholder>
              </Link>
            </figure>
            <CardCaption>
              <strong>
                “{previously.title}
                {previously.subtitle ? ": " + previously.subtitle : ""}”
              </strong>{" "}
              by <AuthorsPrinted authors={previously.authors} />; published in{" "}
              <Link to={TAGS[previously.tag].link}>
                {TAGS[previously.tag].title}
              </Link>
              .
            </CardCaption>
            <LinkButton
              to={"/r/" + previously.slug}
              onClick={() => {
                ga("event", {
                  category: "Navigation",
                  action: "ActionsCard.next_article_button",
                });
              }}
            >
              Read
            </LinkButton>
          </CardIntegratedForMason>
        )}
      </CardMason>
    </>
  );
};

const mapStateToProps = ({ article, favourites, user, listFeatures }) => {
  return { article, favourites, user, listFeatures };
};
export default connect(mapStateToProps, dispatch => {
  return {
    isFavourite: article => {
      dispatch(isFavourite(article));
    },
    addFavourite: favourite => {
      dispatch(addFavourite(favourite));
    },
    addSessionInfo: sessionInfo => {
      dispatch(addSessionInfo(sessionInfo));
    },
    deleteFavourite: id => {
      dispatch(deleteFavourite(id));
    },
    fetchListFeatures: request => {
      dispatch(fetchListFeatures(request));
    },
  };
})(Suggestions);

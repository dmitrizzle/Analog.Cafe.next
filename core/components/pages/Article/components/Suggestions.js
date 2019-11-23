import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import styled from "styled-components";
import { c_white, c_black } from "../../../../../constants/styles/colors";
import { AuthorsPrinted } from "./AuthorsPrinted";
import { TAGS } from "../constants";

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
import { isXWeeksAgo } from "../../../../../utils/time";
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

const PREFIX_NEW = "Just Published: ";
const PREFIX_NEXT = "Next: ";

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

const SaveWatermark = styled.div`
  svg {
    width: 6em;
    position: absolute;
    z-index: 1;
    left: calc(50% - 3em);
    top: 26%;
    path {
      fill: ${c_white};
    }
  }
`;

const Suggestions = props => {
  console.log(props);
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
    if (typeof thisFavourite === "undefined")
      props.isFavourite(props.article.id);
    setFavouriteStatus(thisFavourite && thisFavourite.user > 0);
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
        {havelistedAuthorsAfterCoffeeProfile && (
          <CardIntegratedForMason
            style={{
              margin: props.coffeeForLeadAuthor ? undefined : cardCenterMargin,
              maxWidth: cardMaxWidth,
            }}
          >
            <CardHeader stubborn buttons={[0]} noStar title={"Due Credit"} />
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
            <LinkButton
              to={"/write"}
              onClick={() => {
                ga("event", {
                  category: "Campaign",
                  action: "ActionsCard.submit_button",
                });
              }}
            >
              Write for Analog.Cafe
            </LinkButton>
          </CardIntegratedForMason>
        )}

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
              title="Thank the Author"
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

        {/* save */}
        <CardIntegratedForMason>
          <CardHeader
            stubborn
            buttons={[0]}
            noStar
            title={isFavourite ? "Saved" : "Save for Later"}
          />
          {!isFavourite && (
            <figure>
              <Link to="/account" onClick={handleFavourite}>
                <SaveWatermark>
                  <Save />
                </SaveWatermark>
                <Placeholder
                  frothId={props.article.poster}
                  style={{ background: c_black }}
                >
                  <img
                    style={{ opacity: 0.5 }}
                    src={
                      makeFroth({ src: props.article.poster, size: "s" }).src
                    }
                    alt={props.article.title}
                  />
                </Placeholder>
              </Link>
            </figure>
          )}

          <CardCaption>
            {isFavourite ? (
              <>
                You can find this article again in{" "}
                <Link to="/account">Your Account</Link>.{" "}
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
                  <Link to="/account">Your Account</Link>
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

        {/* read next */}
        {previously.status === "ok" && (
          <CardIntegratedForMason style={{ marginBottom: 0, paddingBottom: 1 }}>
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
                    label:
                      previously.titlePrefix === PREFIX_NEW ? "new" : undefined,
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
                “
                <Link to={"/r/" + previously.slug}>
                  {previously.title}
                  {previously.subtitle ? ": " + previously.subtitle : ""}
                </Link>
                ”
              </strong>{" "}
              by <AuthorsPrinted authors={previously.authors} />; published in{" "}
              <Link to={TAGS[previously.tag].link}>
                {TAGS[previously.tag].title}
              </Link>
              .
            </CardCaption>
          </CardIntegratedForMason>
        )}
      </CardMason>
    </>
  );
};

const mapStateToProps = ({ article, favourites, user }) => {
  return { article, favourites, user };
};
export default connect(
  mapStateToProps,
  dispatch => {
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
    };
  }
)(Suggestions);

import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import Router from "next/router";

import { CardCaptionIntegrated } from "../../../controls/Card/components/CardIntegrated";
import { CoffeeInline } from "../../../icons/Coffee";
import { LabelWrap } from "../../../controls/Docket";
import {
  addFavourite,
  deleteFavourite,
  isFavourite,
} from "../../../../../user/store/actions-favourites";
import { c_black } from "../../../../../constants/styles/colors";
import { eventGA } from "../../../../../utils/data/ga";
import {
  getFirstNameFromFull,
  turnicateSentence,
} from "../../../../../utils/author-credits";
import { isXWeeksAgo } from "../../../../../utils/time";
import { makeFroth } from "../../../../../utils/froth";
import CardCaption from "../../../controls/Card/components/CardCaption";
import CardColumns, {
  CardIntegratedForColumns,
} from "../../../controls/Card/components/CardColumns";
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
const Suggestions = props => {
  // parse data for next article
  let readNext;
  const readReceipts =
    props.user && props.user.sessionInfo
      ? props.user.sessionInfo.readReceipts
      : null;
  const newArticleDate = props.list && props.list.items[0].date;
  const read =
    readReceipts && newArticleDate
      ? readReceipts.filter(
          receipt =>
            receipt.articleId === props.list.items[0].id &&
            receipt.readOn > newArticleDate.published
        ).length > 0
      : null;
  if (
    !read &&
    newArticleDate &&
    isXWeeksAgo(props.list.items[0].date.published) === 0 &&
    props.article.id !== props.list.items[0].id
  ) {
    readNext = {
      status: props.list.status,
      title: props.list.items[0].title,
      titlePrefix: PREFIX_NEW,
      cta: (
        <>
          Read Now <span>➢</span>
        </>
      ),
      slug: props.list.items[0].slug,
      poster: props.list.items[0].poster,
    };
  } else {
    readNext = {
      status: props.nextArticle && props.nextArticle.slug ? "ok" : "error",
      titlePrefix: PREFIX_NEXT,
      cta: (
        <>
          Read Next <span>➢</span>
        </>
      ),
      ...props.nextArticle,
    };
  }

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
      eventGA({
        category: "User",
        action: "Favourite.SignIn",
        label: `/zine/${props.article.slug}`,
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

    eventGA({
      category: "User",
      action: isFavourite ? "UnFavourite" : "Favourite",
      label: `/zine/${props.article.slug}`,
    });
  };

  return (
    <>
      <CardColumns>
        <CardIntegratedForColumns
          style={{
            maxWidth: "360px",
            margin: props.coffeeForLeadAuthor ? undefined : "1.5em auto 1em",
          }}
        >
          <CardCaption>
            Things that you save (like this article) will appear on{" "}
            <strong>
              <Link to="/account">Your Account</Link>
            </strong>{" "}
            page.
          </CardCaption>
          <LinkButton onClick={handleFavourite}>
            <Save
              style={{
                width: "1em",
                marginTop: "-.35em",
                color: c_black,
                filter: "drop-shadow(1px 1px 0px white)",
              }}
              stroke={c_black}
            />{" "}
            {!isFavourite ? "Save For Later" : "Saved"}
          </LinkButton>
        </CardIntegratedForColumns>
        {props.coffeeForLeadAuthor && (
          <CardIntegratedForColumns>
            <CardHeader
              stubborn
              buttons={[0]}
              noStar
              title="If You Like This Article…"
            />
            <CardCaption>
              <strong>…Consider buying its author a “coffee.”</strong> This
              button will take you to {props.leadAuthor.title}’s{" "}
              {isKoFi && <Link to="https://ko-fi.com">Ko-fi</Link>}
              {isBuyMeACoffee && (
                <Link to="https://www.buymeacoffee.com">Buy Me A Coffee</Link>
              )}{" "}
              page where you can send a quick buck with PayPal, ApplePay, or a
              credit card.
            </CardCaption>
            <LinkButton
              to={coffeeLink}
              onClick={() => {
                eventGA({
                  category: "Campaign",
                  action: "Article.Suggestions.author_cta_coffee",
                  label: coffeeLink,
                });
              }}
              branded
            >
              <CoffeeInline /> Thank {props.leadAuthor.title}
            </LinkButton>
          </CardIntegratedForColumns>
        )}
      </CardColumns>
      {props.thisArticlePostDate && <DatePublished {...props} />}
      <CardColumns
        style={{
          display: props.nextArticle ? undefined : "block",
        }}
      >
        <CardIntegratedForColumns
          style={{
            maxWidth: "360px",
            margin: readNext.status === "ok" ? undefined : "1.5em auto 1em",
          }}
        >
          <CardCaptionIntegrated style={{ padding: 0 }}>
            {authors &&
              authors.map((author, index) =>
                author.id ? (
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
                ) : null
              )}
          </CardCaptionIntegrated>
          <LinkButton
            to={"/submit"}
            onClick={() => {
              eventGA({
                category: "Campaign",
                action: "ActionsCard.submit_button",
              });
            }}
          >
            Write for Analog.Cafe
          </LinkButton>
        </CardIntegratedForColumns>

        {readNext.status === "ok" && (
          <CardIntegratedForColumns>
            <CardHeader
              stubborn
              buttons={[0]}
              noStar
              title={readNext.title}
              titlePrefix={readNext.titlePrefix}
            />
            <figure style={{ borderBottom: `8px solid ${c_black}` }}>
              <Link
                to={"/r/" + readNext.slug}
                onClick={() => {
                  eventGA({
                    category: "Navigation",
                    action: "ActionsCard.next_article_picture",
                    label:
                      readNext.titlePrefix === PREFIX_NEW ? "new" : undefined,
                  });
                }}
              >
                <Placeholder frothId={readNext.poster}>
                  <img
                    src={makeFroth({ src: readNext.poster, size: "s" }).src}
                    alt={readNext.title}
                  />
                </Placeholder>
              </Link>
            </figure>
            <LinkButton
              style={{ margin: 0 }}
              to={"/r/" + readNext.slug}
              onClick={() => {
                eventGA({
                  category: "Navigation",
                  action: "ActionsCard.next_article_button",
                  label:
                    readNext.titlePrefix === PREFIX_NEW ? "new" : undefined,
                });
              }}
            >
              {readNext.cta}
            </LinkButton>
          </CardIntegratedForColumns>
        )}
      </CardColumns>
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
      deleteFavourite: id => {
        dispatch(deleteFavourite(id));
      },
    };
  }
)(Suggestions);

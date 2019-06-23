import { connect } from "react-redux";
import React from "react";

import { CardCaptionIntegrated } from "../../../controls/Card/components/CardIntegrated";
import { LabelWrap } from "../../../controls/Docket";
import { c_black } from "../../../../../constants/styles/colors";
import {
  getFirstNameFromFull,
  turnicateSentence,
} from "../../../../../utils/author-credits";
import { isXWeeksAgo } from "../../../../../utils/time";
import { makeFroth } from "../../../../../utils/froth";
import CardColumns, {
  CardIntegratedForColumns,
} from "../../../controls/Card/components/CardColumns";
import CardHeader from "../../../controls/Card/components/CardHeader";
import CardWithDockets, {
  CardWithDocketsImage,
  CardWithDocketsInfo,
} from "../../../controls/Card/components/CardWithDockets";
import Label from "../../../vignettes/Label";
import Link from "../../../controls/Link";
import LinkButton from "../../../controls/Button/components/LinkButton";
import Placeholder from "../../../vignettes/Picture/components/Placeholder";

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
  return (
    <CardColumns
      style={{
        display: props.nextArticle ? undefined : "block",
      }}
    >
      <CardIntegratedForColumns>
        <CardCaptionIntegrated style={{ padding: 0 }}>
          {authors.map((author, index) => (
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
                  <em>{author.text && turnicateSentence(author.text, 40)}</em>
                  {!author.id && (
                    <em>
                      Unfortunately, {getFirstNameFromFull(author.title)} has no
                      profile with Analog.Cafe.
                    </em>
                  )}
                </small>
              </CardWithDocketsInfo>
            </CardWithDockets>
          ))}
        </CardCaptionIntegrated>
        <LinkButton
          to={"/submit"}
          // onClick={() => {
          //   GA.event({
          //     category: "Campaign",
          //     action: "ActionsCard.submit_button"
          //   })
          // }}
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
              prefetch
              onClick={() => {
                // GA.event({
                //   category: "Navigation",
                //   action: "ActionsCard.next_article_picture",
                //   label: readNext.titlePrefix === PREFIX_NEW ? "new" : undefined
                // })
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
              // GA.event({
              //   category: "Navigation",
              //   action: "ActionsCard.next_article_button",
              //   label: readNext.titlePrefix === PREFIX_NEW ? "new" : undefined
              // })
            }}
          >
            {readNext.cta}
          </LinkButton>
        </CardIntegratedForColumns>
      )}
    </CardColumns>
  );
};

const mapStateToProps = ({ article }) => article;
export default connect(
  mapStateToProps,
  null
)(Suggestions);

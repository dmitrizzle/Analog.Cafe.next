import React from "react";

import { CardCaptionIntegrated } from "../../../controls/Card/components/CardIntegrated";
import { isXWeeksAgo } from "../../../../../utils/time";
import { makeFroth } from "../../../../../utils/froth";
import CardColumns, {
  CardIntegratedForColumns,
} from "../../../controls/Card/components/CardColumns";
import CardHeader from "../../../controls/Card/components/CardHeader";
import Link from "../../../controls/Link";
import LinkButton from "../../../controls/Button/components/LinkButton";
import Placeholder from "../../../vignettes/Picture/components/Placeholder";

const PREFIX_NEW = "Just Published: ";
const PREFIX_NEXT = "Next: ";
export default props => {
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
  return (
    <CardColumns
      style={{
        display: props.nextArticle ? undefined : "block",
      }}
    >
      {props.nextArticle && (
        <CardIntegratedForColumns>
          <CardHeader stubborn buttons={[0]} noStar title="Get Featured" />
          <CardCaptionIntegrated>
            Do you shoot film? Get your work reviewed and published on
            Analog.Cafe.
          </CardCaptionIntegrated>
          <LinkButton
            inverse
            to={props.userStatus === "ok" ? "/submit/compose" : "/submit"}
            // onClick={() => {
            //   GA.event({
            //     category: "Campaign",
            //     action: "ActionsCard.submit_button"
            //   })
            // }}
          >
            Submit Your Photography
          </LinkButton>
        </CardIntegratedForColumns>
      )}
      {readNext.status === "ok" && (
        <CardIntegratedForColumns>
          <CardHeader
            stubborn
            buttons={[0]}
            noStar
            title={readNext.title}
            titlePrefix={readNext.titlePrefix}
          />
          <figure>
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

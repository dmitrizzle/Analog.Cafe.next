import React from "react";
import Reader from "@roast-cms/french-press-editor/dist/components/vignettes/Reader";

import { AuthorsPrinted } from "./AuthorsPrinted";
import { c_grey_dark } from "../../../../../constants/styles/colors";
import { readingTime } from "../../../../../utils/time";
import ArticleFooter from "./ArticleFooter";
import ArticleNav from "./ArticleNav";
import ArticleSection from "./ArticleSection";
import ArticleWrapper from "./ArticleWrapper";
import HeaderLarge from "../../../vignettes/HeaderLarge";
import Link from "../../../controls/Link";
import Main from "../../../layouts/Main";
import Picture from "../../../vignettes/Picture";

export const ArticleBlock = props => (
  <Main>
    <ArticleNav
      article={{
        id: props.article.id,
        slug: props.article.slug,
        submittedBy: props.article.submittedBy,
        title: props.article.title,
        status: props.article.status,
      }}
    />
    <ArticleWrapper>
      <HeaderLarge
        pageTitle={props.article.title}
        pageSubtitle={props.article.subtitle}
      >
        <em style={{ display: "block", color: c_grey_dark }}>
          <small>
            {readingTime(props.article.stats)} min read by{" "}
            <AuthorsPrinted authors={props.article.authors} shouldLink />.
          </small>
        </em>
      </HeaderLarge>
      <ArticleSection>
        <Reader
          value={props.article.content.raw}
          components={{ Picture, Link }}
        />
        <ArticleFooter
          article={props.article}
          nextArticle={props.article.next}
          thisArticle={props.article.slug}
          thisArticlePostDate={
            props.article.date && props.article.date.published
          }
          thisArticleEditDate={props.article.date && props.article.date.updated}
        />
      </ArticleSection>
    </ArticleWrapper>
  </Main>
);

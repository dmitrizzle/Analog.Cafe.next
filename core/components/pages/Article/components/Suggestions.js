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
import { makeFroth } from "../../../../../utils/froth";
import { setArticlePage } from "../../../../store/actions-article";
import { setModal } from "../../../../store/actions-modal";
import { themeOptions } from "../../../../../constants/styles/themes";
import { withRedux } from "../../../../../utils/with-redux";
import ArticleSection from "./ArticleSection";
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
import ga from "../../../../../utils/data/ga";

const Suggestions = props => {
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
    photography: "Images",
    article: "Author",
  };

  const previously = {
    status: article?.next?.slug ? "ok" : "error",
    ...article.next,
  };

  useEffect(() => {
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
  }, [article.slug]);

  const listedAuthors = authors
    ? authors.filter(
        author => author?.id !== "unknown" && !author.id.includes("not-listed")
      )
    : [];
  // move article author to the top
  listedAuthors.sort((a, b) =>
    a.authorship === "article" ? -1 : b == "article" ? 1 : 0
  );

  return (
    <>
      <ArticleSection>
        {/* date */}
        {props.thisArticlePostDate && <DatePublished {...props} />}

        {/* contributors */}
        <CardCaptionIntegrated middle>
          {listedAuthors.map((author, index) => (
            <CardWithDockets
              style={{ marginTop: 0, marginBottom: ".5em" }}
              href={`/u/${author.id ? author.id : "not-listed"}`}
              key={author.id || index}
              data-cy="Autor__CardWithDockets"
              onClick={() => {
                ga("event", {
                  category: "nav",
                  action: "article.suggestions.author",
                  label: `/u/${author.id ? author.id : "not-listed"}`,
                });
              }}
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
                  <em>{author.text && turnicateSentence(author.text, 40)}</em>
                </small>
              </CardWithDocketsInfo>
            </CardWithDockets>
          ))}
        </CardCaptionIntegrated>

        {/* support */}
        <div style={{ margin: "0 auto 6em", maxWidth: "360px" }}>
          <h3>Support this blog.</h3>
          <p>
            If you found this blog interesting or helpful, please consider
            supporting it via{" "}
            <strong>
              “
              <Link
                to="https://buymeacoff.ee/dmitrizzle"
                onClick={() => {
                  ga("event", {
                    category: "nav",
                    action: "article.support.coffee",
                    label: `/r/${article.slug}`,
                  });
                }}
              >
                Buy Me a Coffee
              </Link>
              ”
            </strong>
            . Thank you! 🙌
          </p>
        </div>
      </ArticleSection>

      <Features
        isSsr={props.isSsr}
        withinArticle
        listFeatures={listFeatures}
        activeArticle={article.slug}
        onClick={() => {
          ga("event", {
            category: "nav",
            action: "article.features.hit",
            label: `/r/${article.slug}`,
          });
        }}
      />
    </>
  );
};

export default withRedux(Suggestions);

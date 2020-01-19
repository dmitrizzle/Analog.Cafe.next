import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";
import React, { useEffect } from "react";

import { API } from "../../constants/router/defaults";
import { Edits } from "../../user/components/pages/Submission";
import { fetchArticlePage } from "../../core/store/actions-article";
import { withRedux } from "../../utils/with-redux";
import ArticleBlock from "../../core/components/pages/Article/components/ArticleBlock";
import Error from "../_error";

const Article = props => {
  const article = useSelector(state => state.article);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage?.getItem("token");
    dispatch(
      fetchArticlePage(
        {
          url: `${API.SUBMISSIONS}/${props.router.asPath.replace(
            "/account/submission/",
            ""
          )}`,
        },
        token
      )
    );
  }, []);

  if (!article || article.error) return <Error statusCode={props.error} />;

  return (
    <>
      <ArticleBlock article={article} isSubmission={true} />
      <Edits article={article} />
    </>
  );
};

export default withRouter(withRedux(Article));

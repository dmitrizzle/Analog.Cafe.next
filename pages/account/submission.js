import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";
import React, { useEffect } from "react";
import lscache from "lscache";

import { API } from "../../constants/router/defaults";
import { Edits } from "../../user/components/pages/Submission";
import { fetchArticlePage } from "../../core/store/actions-article";
import { getUserInfo } from "../../user/store/actions-user";
import { withRedux } from "../../utils/with-redux";
import ArticleBlock from "../../core/components/pages/Article/components/ArticleBlock";
import Error from "../_error";
import Footer from "../../core/components/layouts/Main/components/Footer";

const Article = props => {
  const article = useSelector(state => state.article);
  const { status } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = lscache.get("token");
    token &&
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

    status === "pending" && dispatch(getUserInfo());
  }, []);

  if (!article || article.error) return <Error statusCode={props.error} />;
  if (status === "forbidden") return <Error statusCode={403} />;

  return (
    <>
      <ArticleBlock article={article} isSubmission={true} />
      <Edits article={article} />
      <Footer />
    </>
  );
};

export default withRouter(withRedux(Article));

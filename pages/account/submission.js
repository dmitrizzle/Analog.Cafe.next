import { connect } from "react-redux";
import React, { useEffect, useState } from "react";

import { API } from "../../constants/router/defaults";
import { ArticleBlock } from "../../core/components/pages/Article/components/ArticleBlock";
import { fetchArticlePage } from "../../core/store/actions-article";

const Article = props => {
  if (!props.article) return <Error statusCode={props.error} />;

  // limit renders to once per mount
  const [load, pingload] = useState(0);
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      props.fetchArticlePage(
        {
          url: `${API.SUBMISSIONS}/${window.location.pathname.replace(
            "/account/submission/",
            ""
          )}`,
        },
        localStorage.getItem("token")
      );
    }
  }, [load]);

  return props.article.error ? (
    <Error statusCode={403} />
  ) : (
    <ArticleBlock {...props} />
  );
};

// client connects to store directly
const mapDispatchToProps = dispatch => {
  return {
    fetchArticlePage: (request, token) => {
      dispatch(fetchArticlePage(request, token));
    },
  };
};
export default connect(
  ({ user, article }) => {
    return { user, article };
  },
  mapDispatchToProps
)(Article);

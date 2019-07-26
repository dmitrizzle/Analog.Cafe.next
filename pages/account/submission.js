import { connect } from "react-redux";
import React, { useEffect, useState } from "react";

import { API } from "../../constants/router/defaults";
import { ArticleBlock } from "../../core/components/pages/Article/components/ArticleBlock";
import { fetchArticlePage } from "../../core/store/actions-article";
import Error from "../_error";

const Article = props => {
  if (!props.article || props.article.error)
    return <Error statusCode={props.error} />;

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

  return <ArticleBlock {...props} isSubmission={true} />;
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

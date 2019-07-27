import { connect } from "react-redux";
import React, { useEffect, useState } from "react";

import { API } from "../../constants/router/defaults";
import { ArticleBlock } from "../../core/components/pages/Article/components/ArticleBlock";
import { Edits } from "../../user/components/pages/Submission";
import { c_grey_med } from "../../constants/styles/colors";
import { fetchArticlePage } from "../../core/store/actions-article";
import {
  getHumanDatestamp,
  getISODatestamp,
  getLunarDatestamp,
} from "../../utils/time";
import Error from "../_error";
import Link from "../../core/components/controls/Link";

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

  return (
    <>
      <ArticleBlock {...props} isSubmission={true} />
      <Edits article={props.article} />
    </>
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

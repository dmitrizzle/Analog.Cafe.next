import React from "react";

import { dateFromUnix } from "../../../../../utils/time";
import DatePublished from "./DatePublished";
import Link from "../../../controls/Link";

const ArticleActionsWrapper = props => <>{props.children}</>;
const Favourite = props => <>{props.children}</>;
const Options = props => <>{props.children}</>;

export default props => {
  return (
    <ArticleActionsWrapper>
      <Favourite />
      {props.user &&
        props.user.status === "ok" &&
        (props.user.info.role === "admin" ||
          props.article.submittedBy.id === props.user.info.id) &&
        props.article.edits !== undefined &&
        props.article.edits.length > 0 && (
          <div style={{ lineHeight: "1em" }}>
            <strong>Edit History</strong>
            <br />
            {props.article.edits.map(edit => {
              const unix = new Date(edit.date * 1000);

              return (
                <React.Fragment key={edit.date}>
                  <small style={{ opacity: 0.5 }}>
                    {dateFromUnix(edit.date).human +
                      " " +
                      unix.getHours() +
                      ":" +
                      unix.getMinutes()}{" "}
                    – <Link to={`/is/${edit.id}`}>{edit.name}</Link>
                  </small>
                  <br />
                </React.Fragment>
              );
            })}
          </div>
        )}

      {props.article &&
        props.article.status === "published" &&
        typeof props.article.scheduledOrder === "undefined" && (
          <Options {...props} />
        )}
      {props.thisArticlePostDate && <DatePublished {...props} />}
    </ArticleActionsWrapper>
  );
};

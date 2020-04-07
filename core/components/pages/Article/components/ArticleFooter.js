import React from "react";
import styled from "styled-components";

import { dateFromUnix } from "../../../../../utils/time";
import Link from "../../../controls/Link";
import Suggestions from "./Suggestions";
import { c_white } from "../../../../../constants/styles/colors";

const SuggestionsWrapper = styled.div`
  clear: both;
  @media print {
    display: none;
  }
  background: ${c_white};
  z-index: 11;
  position: relative;

  margin: 0;
`;

export default props => {
  return (
    <SuggestionsWrapper>
      {props.children}
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
          <Suggestions {...props} />
        )}
    </SuggestionsWrapper>
  );
};

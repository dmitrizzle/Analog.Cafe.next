import React from "react";

import { CardIntegratedForColumns } from "../../../../../core/components/controls/Card/components/CardColumns";
import { CardWithDocketsInfo } from "../../../../../core/components/controls/Card/components/CardWithDockets";
import { turnicateSentence } from "../../../../../utils/author-credits";
import CardCaption from "../../../../../core/components/controls/Card/components/CardCaption";
import CardHeader from "../../../../../core/components/controls/Card/components/CardHeader";
import Link from "../../../../../core/components/controls/Link";
import LinkButton from "../../../../../core/components/controls/Button/components/LinkButton";

export default props => {
  const {
    setShowDraft,
    addSessionInfo,
    dashboardShowDraft,
    showDraft,
    draftTitle,
    draftBody,
  } = props;
  return (
    <CardIntegratedForColumns>
      <div
        onClick={event => {
          event.stopPropagation();
          setShowDraft(!showDraft);
          addSessionInfo({
            dashboardShowDraft: !showDraft,
          });
        }}
      >
        <CardHeader
          stubborn
          buttons={!showDraft ? [<a href="#open">⇣</a>, 0] : undefined}
          noStar
          title="Your Working Draft"
        />
      </div>

      {showDraft && (
        <>
          {draftBody ? (
            <CardWithDocketsInfo
              style={{
                float: "none",
                width: "calc(100% - 1em)",
                lineHeight: "1em",
              }}
            >
              <h4>{draftTitle || "Untitled"}</h4>
              <small>
                <em>{turnicateSentence(draftBody, 120)}</em>
              </small>
            </CardWithDocketsInfo>
          ) : (
            <CardCaption>
              Compose a new article or essay to get featured on Analog.Cafe.{" "}
              <Link to="/submit">Learn more</Link>.
            </CardCaption>
          )}

          <LinkButton branded to="/submit/draft">
            {draftBody ? "Edit Draft" : "Compose New Draft"}
          </LinkButton>
        </>
      )}
    </CardIntegratedForColumns>
  );
};

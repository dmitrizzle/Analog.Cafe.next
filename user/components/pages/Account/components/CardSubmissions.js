import React, { useEffect, useState } from "react";
import throttle from "lodash/throttle";

import { API } from "../../../../../constants/router/defaults";
import { CardIntegratedForColumns } from "../../../../../core/components/controls/Card/components/CardColumns";
import { CardWithDocketsInfo } from "../../../../../core/components/controls/Card/components/CardWithDockets";
import CardHeader from "../../../../../core/components/controls/Card/components/CardHeader";
import LinkButton from "../../../../../core/components/controls/Button/components/LinkButton";
import puppy from "../../../../../utils/puppy";

export default props => {
  if (typeof localStorage === "undefined") return;
  const request = {
    url: API.SUBMISSIONS,
    headers: {
      Authorization: "JWT " + localStorage.getItem("token"),
    },
  };

  // limit renders to once per mount
  const [load, pingload] = useState(0);
  useEffect(() => {
    puppy(request)
      .then(r => r.json())
      .then(response => {
        console.log(response);
      });
  }, [load]);
  return (
    <CardIntegratedForColumns>
      <div
        onClick={event => {
          event.stopPropagation();
          props.setShowSubmissions(!props.showSubmissions);
          props.addSessionInfo({
            dashboardShowSubmissions: !props.showSubmissions,
          });
        }}
      >
        <CardHeader
          buttons={
            !props.showSubmissions ? [<a href="#open">⇣</a>, 0] : undefined
          }
          stubborn
          noStar
          title="Your Recent Submissions"
        />
      </div>
      {props.showSubmissions && (
        <>
          <CardWithDocketsInfo
            style={{ float: "none", width: "calc(100% - 1em)" }}
          >
            <small>
              <em>Submissions</em>
            </small>
          </CardWithDocketsInfo>

          <LinkButton to="/account/submissions">View All</LinkButton>
        </>
      )}
    </CardIntegratedForColumns>
  );
};

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { API } from "../../../../../constants/router/defaults";
import { CardIntegratedForColumns } from "../../../../../core/components/controls/Card/components/CardColumns";
import { CardWithDocketsInfo } from "../../../../../core/components/controls/Card/components/CardWithDockets";
import { getSublist } from "../../../../store/actions-sublists";
import { withRedux } from "../../../../../utils/with-redux";
import CardCaption from "../../../../../core/components/controls/Card/components/CardCaption";
import CardHeader from "../../../../../core/components/controls/Card/components/CardHeader";
import Link from "../../../../../core/components/controls/Link";
import LinkButton from "../../../../../core/components/controls/Button/components/LinkButton";

const SubList = styled.ul`
  margin: 0 !important;
  li {
    padding-bottom: 0 !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const CardSubmissions = props => {
  if (typeof localStorage === "undefined") return;

  const sublists = useSelector(state => state.sublists);
  const dispatch = useDispatch();

  // limit renders to once per mount
  // eslint-disable-next-line
  const [load, pingload] = useState(0);
  useEffect(() => {
    dispatch(
      getSublist(
        {
          url: API.SUBMISSIONS,
        },
        "submissions"
      )
    );
  }, [load]);

  const submissionItems = sublists.submissions.items;

  return (
    <CardIntegratedForColumns
      style={
        submissionItems.length === 0 && props.showSubmissions
          ? { height: "8.615em" }
          : {}
      }
    >
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
            !props.showSubmissions
              ? [
                  <a href="#open" key={1}>
                    ⇣
                  </a>,
                  0,
                ]
              : undefined
          }
          stubborn
          noStar
          title="Your Submissions"
        />
      </div>

      {props.showSubmissions && (
        <>
          <CardWithDocketsInfo
            style={{ float: "none", width: "calc(100% - 1em)" }}
          >
            {submissionItems.length > 0 ? (
              <SubList>
                {submissionItems.map((item, index) => {
                  if (index > 4) return;
                  return (
                    <li key={index}>
                      <small>
                        <em>
                          <Link to={`/account/submission/${item.slug}`}>
                            {item.title}
                          </Link>
                        </em>
                      </small>
                    </li>
                  );
                })}
              </SubList>
            ) : (
              <CardCaption>
                After you submit your first draft for review, it will appear
                here.
              </CardCaption>
            )}
          </CardWithDocketsInfo>

          {submissionItems.length > 0 && (
            <LinkButton to="/account/all-submissions">View All</LinkButton>
          )}
        </>
      )}
    </CardIntegratedForColumns>
  );
};

export default withRedux(CardSubmissions);

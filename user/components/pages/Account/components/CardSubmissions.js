import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { API } from "../../../../../constants/router/defaults";
import { CardIntegratedForColumns } from "../../../../../core/components/controls/Card/components/CardColumns";
import { CardWithDocketsInfo } from "../../../../../core/components/controls/Card/components/CardWithDockets";
import { getSublist } from "../../../../store/actions-sublists";
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

  // limit renders to once per mount
  const [load, pingload] = useState(0);
  useEffect(() => {
    props.getSublist(
      {
        url: API.SUBMISSIONS,
      },
      "submissions"
    );
  }, [load]);

  const submissionItems = props.sublists.submissions.items;

  return (
    <CardIntegratedForColumns
      style={submissionItems.length === 0 ? { height: "8.615em" } : {}}
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
            <LinkButton to="/account/submissions">View All</LinkButton>
          )}
        </>
      )}
    </CardIntegratedForColumns>
  );
};

const mapStateToProps = ({ sublists }) => {
  return {
    sublists,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getSublist: (request, name) => {
      dispatch(getSublist(request, name));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardSubmissions);

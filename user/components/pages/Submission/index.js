import React from "react";
import styled from "styled-components";

import { c_grey_dark, c_grey_light } from "../../../../constants/styles/colors";
import { dateFromUnix } from "../../../../utils/time";
import CardHeader from "../../../../core/components/controls/Card/components/CardHeader";
import CardIntegrated from "../../../../core/components/controls/Card/components/CardIntegrated";
import Link from "../../../../core/components/controls/Link";

const Table = styled.table`
  color: ${c_grey_dark};
  width: 100%;
  border-radius: 0.25em;
  overflow: hidden;
  tr:nth-child(even) {
    background: ${c_grey_light};
  }
`;

const TableCell = styled.td`
  font-size: 0.8em;
  line-height: 1em;
  padding: 0.5em 1em;
`;
const TableCellDate = styled(TableCell)`
  width: 13em;
`;

export const Edits = ({ article }) => {
  return article && article.edits ? (
    <CardIntegrated>
      <CardHeader stubborn buttons={[0]} noStar title="Edit History" />
      <Table>
        <tbody>
          {article.edits.map(edit => {
            const unix = new Date(edit.date * 1000);

            return (
              <tr key={edit.date}>
                <TableCellDate>
                  {dateFromUnix(edit.date).human +
                    " " +
                    unix.getHours() +
                    ":" +
                    unix.getMinutes()}
                </TableCellDate>
                <TableCell>
                  <Link to={`/u/${edit.id}`}>{edit.name}</Link>
                </TableCell>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </CardIntegrated>
  ) : null;
};

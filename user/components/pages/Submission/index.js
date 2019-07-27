import React from "react";
import styled from "styled-components";

import { c_grey_dark } from "../../../../constants/styles/colors";
import { dateFromUnix } from "../../../../utils/time";
import { title } from "../../../../constants/styles/typography";
import Link from "../../../../core/components/controls/Link";

const Table = styled.table`
  color: ${c_grey_dark};
  margin: 0 auto;
`;
const TableHeader = styled.th`
  ${title}
`;
const TableCell = styled.td`
  font-size: 0.8em;
  line-height: 1em;
  padding: 0.25em 0.5em;
`;
const TableCellDate = styled(TableCell)`
  width: 10em;
`;

export const Edits = ({ article }) => {
  return article && article.edits ? (
    <Table>
      <tbody>
        <tr>
          <TableHeader colSpan="2">Edit History</TableHeader>
        </tr>
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
  ) : null;
};

import React from "react";

import { Table, TableCell, TableRow } from "../../vignettes/Table";
import { dateFromUnix } from "../../../../utils/time";
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection";
import Link from "../../../../core/components/controls/Link";

export const Edits = ({ article }) => {
  return article && article.edits ? (
    <ArticleSection>
      <Table header="Edit History">
        {article.edits.map(edit => {
          const unix = new Date(edit.date * 1000);
          return (
            <TableRow key={edit.date}>
              <TableCell>
                {dateFromUnix(edit.date).human +
                  " " +
                  unix.getHours() +
                  ":" +
                  unix.getMinutes()}
              </TableCell>
              <TableCell>
                <Link to={`/u/${edit.id}`}>{edit.name}</Link>
              </TableCell>
            </TableRow>
          );
        })}
      </Table>
    </ArticleSection>
  ) : null;
};

import React from "react";
import styled from "styled-components";

import CardHeader from "../../../../core/components/controls/Card/components/CardHeader";
import CardIntegrated from "../../../../core/components/controls/Card/components/CardIntegrated";

const TableStyled = styled.table`
  color: ${({ theme }) => theme.grey_dark};
  width: 100%;
  border-radius: 0.25em;
  overflow: hidden;
  tr:nth-child(even) {
    background: ${({ theme }) => theme.grey_light};
  }
`;

export const TableRow = styled.tr``;
export const TableCell = styled.td`
  font-size: 0.8em;
  line-height: 1em;
  padding: 0.5em 1em;
`;

export const Table = ({ header, children }) => {
  return (
    <CardIntegrated style={{ maxWidth: "100%" }}>
      <CardHeader stubborn buttons={[0]} noStar title={header} />
      <TableStyled>
        <tbody>{children}</tbody>
      </TableStyled>
    </CardIntegrated>
  );
};

import React from "react";
import styled from "styled-components";

import { b_mobile } from "../../../../constants/styles/measurements";
import { c_grey_dark, c_grey_light } from "../../../../constants/styles/colors";
import CardHeader from "../../../../core/components/controls/Card/components/CardHeader";
import CardIntegrated from "../../../../core/components/controls/Card/components/CardIntegrated";

const TableStyled = styled.table`
  color: ${c_grey_dark};
  width: 100%;
  border-radius: 0.25em;
  overflow: hidden;
  tr:nth-child(even) {
    background: ${c_grey_light};
  }
`;
const TableWrapper = styled(CardIntegrated)`
  max-width: 100%;
  width: 100%;
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

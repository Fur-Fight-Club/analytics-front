"use client";

import { Badge, Card, Table } from "@nextui-org/react";
import * as React from "react";

interface AverageTimeSpentTableProps {
  data: {
    page: string;
    averageTimeSpent: number;
    readableTimeSpent: string;
  }[];
}

export const AverageTimeSpentTable: React.FunctionComponent<
  AverageTimeSpentTableProps
> = ({ data }) => {
  return (
    <Card>
      <Table
        aria-label="Example table with static content"
        striped
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column>Route</Table.Column>
          <Table.Column>Temp passé</Table.Column>
        </Table.Header>
        <Table.Body>
          {data.map((timeSpent, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <Badge color="primary">{timeSpent.page}</Badge>
              </Table.Cell>
              <Table.Cell>{timeSpent.readableTimeSpent}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Pagination
          shadow
          noMargin
          align="center"
          rowsPerPage={5}
          onPageChange={(page) => null}
        />
      </Table>
    </Card>
  );
};

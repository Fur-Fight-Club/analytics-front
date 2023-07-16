"use client";

import { Badge, Button, Card, Table } from "@nextui-org/react";
import * as React from "react";
import { ButtonClickEvent } from "src/store/application/constants";

interface ClickEventTableProps {
  data: {
    event: string;
    content?: string;
    count: number;
  }[];
}

export const ClickEventTable: React.FunctionComponent<ClickEventTableProps> = ({
  data,
}) => {
  return (
    <Card>
      <Table
        aria-label="Unique button events"
        id="unique-button-events"
        striped
        css={{
          height: "50vh",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column allowsResizing>ID évènement</Table.Column>
          <Table.Column allowsResizing>Prévisualisation</Table.Column>
          <Table.Column allowsSorting allowsResizing>
            # de clics
          </Table.Column>
        </Table.Header>
        <Table.Body>
          {data.map((ubc, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <Badge color="primary">{ubc.event}</Badge>
              </Table.Cell>
              <Table.Cell>
                <Button auto disabled>
                  {ubc.content}
                </Button>
              </Table.Cell>
              <Table.Cell>{ubc.count}</Table.Cell>
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

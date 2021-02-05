import React, { Fragment } from "react";
import { Table } from "semantic-ui-react";

const GRNListItemHeader = () => {
  return (
    <Fragment>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>No</Table.HeaderCell>
          <Table.HeaderCell>PO Number</Table.HeaderCell>
          <Table.HeaderCell>Invoice</Table.HeaderCell>
          <Table.HeaderCell>Payment</Table.HeaderCell>
          <Table.HeaderCell>NBT %</Table.HeaderCell>
          <Table.HeaderCell>VAT %</Table.HeaderCell>
          <Table.HeaderCell>Discount %</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Approval By</Table.HeaderCell>
          <Table.HeaderCell>Approval Date</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    </Fragment>
  );
};

export default GRNListItemHeader;

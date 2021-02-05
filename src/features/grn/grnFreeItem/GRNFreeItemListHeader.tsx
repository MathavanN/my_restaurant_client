import React, { Fragment } from "react";
import { Table } from "semantic-ui-react";

const GRNFreeItemListHeader = () => {
  return (
    <Fragment>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>No</Table.HeaderCell>
          <Table.HeaderCell>Item Name</Table.HeaderCell>
          <Table.HeaderCell>Item Unit</Table.HeaderCell>
          <Table.HeaderCell>Unit Price</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
          <Table.HeaderCell>NBT %</Table.HeaderCell>
          <Table.HeaderCell>VAT %</Table.HeaderCell>
          <Table.HeaderCell>Discount %</Table.HeaderCell>
          <Table.HeaderCell>Amount</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    </Fragment>
  );
};

export default GRNFreeItemListHeader;

import React, { FC, Fragment } from "react";
import { Table } from "semantic-ui-react";
interface IProps {
  displayColumn: boolean;
}

const GRNListItemHeader: FC<IProps> = ({ displayColumn }) => {
  return (
    <Fragment>
      <Table.Header>
        <Table.Row>
          {displayColumn && <Table.HeaderCell>No</Table.HeaderCell>}
          <Table.HeaderCell>PO Number</Table.HeaderCell>
          <Table.HeaderCell>Invoice</Table.HeaderCell>
          <Table.HeaderCell>Payment</Table.HeaderCell>
          <Table.HeaderCell>NBT %</Table.HeaderCell>
          <Table.HeaderCell>VAT %</Table.HeaderCell>
          <Table.HeaderCell>Discount %</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          {displayColumn && <Table.HeaderCell>Approval By</Table.HeaderCell>}
          {displayColumn && <Table.HeaderCell>Approval Date</Table.HeaderCell>}
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    </Fragment>
  );
};

export default GRNListItemHeader;

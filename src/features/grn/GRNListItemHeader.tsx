import { FC, Fragment, useContext } from "react";
import { Table } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
interface IProps {
  displayColumn: boolean;
}

const GRNListItemHeader: FC<IProps> = ({ displayColumn }) => {
  const rootStore = useContext(RootStoreContext);
  const { isSuperAdminUser } = rootStore.userStore;

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
          {isSuperAdminUser && <Table.HeaderCell>Action</Table.HeaderCell>}
        </Table.Row>
      </Table.Header>
    </Fragment>
  );
};

export default GRNListItemHeader;

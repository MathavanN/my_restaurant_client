import React, { FC, useContext } from "react";
import { Button, Icon, Table } from "semantic-ui-react";
import {
  IPurchaseOrder,
  PurchaseOrderFormValues,
} from "../../app/models/purchaseOrder";
import { format, isEqual } from "date-fns";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import CreatePurchaseOrder from "./AddPurchaseOrder";

interface IProps {
  orders: [string, IPurchaseOrder][];
  displayColumn: boolean;
  displayView: boolean;
  displayEdit: boolean;
}
const PurchaseOrderListItem: FC<IProps> = ({
  orders,
  displayColumn,
  displayView,
  displayEdit,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { openModal, closeModal } = rootStore.modalStore;
  return (
    <Table compact celled>
      <Table.Header>
        <Table.Row>
          {displayColumn && <Table.HeaderCell>No</Table.HeaderCell>}
          <Table.HeaderCell>Order Number</Table.HeaderCell>
          <Table.HeaderCell>Supplier Name</Table.HeaderCell>
          <Table.HeaderCell>Requested By</Table.HeaderCell>
          <Table.HeaderCell>Requested Date</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          {displayColumn && <Table.HeaderCell>Approval By</Table.HeaderCell>}
          {displayColumn && <Table.HeaderCell>Approval Date</Table.HeaderCell>}
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {orders.map(([group, order]) => (
          <Table.Row key={order.id}>
            {displayColumn && <Table.Cell>{group}</Table.Cell>}
            <Table.Cell>{order.orderNumber}</Table.Cell>
            <Table.Cell>{order.supplierName}</Table.Cell>
            <Table.Cell>{order.requestedBy}</Table.Cell>
            <Table.Cell>
              {format(new Date(order.requestedDate), "yyyy-MM-dd'T'HH:mm")}
            </Table.Cell>
            <Table.Cell>{order.approvalStatus}</Table.Cell>
            {displayColumn && <Table.Cell>{order.approvedBy}</Table.Cell>}
            {displayColumn && (
              <Table.Cell>
                {!isEqual(
                  new Date(order.approvedDate),
                  new Date("0001-01-01T00:00:00")
                ) && format(new Date(order.approvedDate), "yyyy-MM-dd'T'HH:mm")}
              </Table.Cell>
            )}
            {displayView && (
              <Table.Cell>
                <Button
                  content="View"
                  color="blue"
                  as={Link}
                  to={`/purchase/view/${order.id}`}
                />
              </Table.Cell>
            )}
            {displayEdit && (
              <Table.Cell>
                <Button
                  animated="vertical"
                  color="orange"
                  onClick={() =>
                    openModal(
                      <CreatePurchaseOrder
                        formData={new PurchaseOrderFormValues(order)}
                        header="Modify purchase order"
                        handleCancel={closeModal}
                      />
                    )
                  }
                >
                  <Button.Content hidden>Edit</Button.Content>
                  <Button.Content visible>
                    <Icon name="edit" />
                  </Button.Content>
                </Button>
              </Table.Cell>
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default PurchaseOrderListItem;
